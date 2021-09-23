import { getUserByNameIdentifierCombo, loginWithEmailPassword, registerUser, requestPasswordToken, pingServer, resetPassword } from '../../api/userApi'

const defaultState = {
  currentUser: '',
  isAuth: false,
  role: 'guest',
  token: '',
  verified: false,
}

export default {
  state () {
    return {
      currentUser: '',
      isAuth: false,
      role: 'guest',
      token: '',
      verified: false,
    }
  },
  mutations: {
    setUser(state, payload) {
      // if the user's account is active
      if (payload.active) {
        // apply payload to state
        state.currentUser = `${payload.name}.${payload.identifier}`
        state.role = payload.role
        // set auth
        state.isAuth = true
        state.token = payload.token
        state.verified = payload.verified
      }
      // TODO: otherwise ask if they want to reactivate
    },
    unsetUser(state) {
      state.isAuth = false // have to explicitly state this so computed properties update
      state = defaultState
    },
  },
  actions: {
    async login(ctx, payload) {
      return ctx.dispatch('auth', {
        ...payload,
        mode: 'login'
      })      
    },
    async signup(ctx, payload) {
      return ctx.dispatch('auth', {
        ...payload,
        mode: 'signup'
      })      
    },
    async requestPasswordToken(_, payload) {
      const { email } = payload
      const response = await requestPasswordToken(email)
      return response
    },
    async resetPassword(ctx, payload) {
      const { resetToken, password, passwordConfirm } = payload
      try {
        const response = await resetPassword(resetToken, password, passwordConfirm)
        const { data: { user }, status, token } = response.data

        if (status === "success") {
          console.log("password reset successful, logging in...")
          const d = new Date()
          const expires = d.setTime(d.getTime() + (1000 * 60 * 60 * 24))

          localStorage.setItem('userId', `${user.name}.${user.identifier}`)
          localStorage.setItem('genkan-token', token)
          localStorage.setItem('sessionExpires', expires)

          user.token = token
          // send response to mutation
          ctx.commit('setUser', user)
          return true
        } else return false
      } catch (error) {
        return false
      }
    },
    async pingThatServer(ctx) {
      if (!ctx.getters.isAuth) return false
      return pingServer(ctx.getters.token)
    },
    async getUserInfo(_, payload) {
      const response = await getUserByNameIdentifierCombo(payload.name, payload.identifier)
      return response.data[0]
    },
    async logout(ctx) {
      localStorage.removeItem('userId')
      localStorage.removeItem('genkan-token')
      localStorage.removeItem('sessionExpires')
      ctx.commit('unsetUser')
    },
    async auth(ctx, payload) {
      const mode = payload.mode
      // **********
      // SIGN UP //
      // **********
      if (mode === 'signup') {
        const { name, email, password, passwordConfirm, matchSettings } = payload;
        const response = await registerUser(name, email, password, passwordConfirm, matchSettings )

        if (response.status === "success") {
          const newUser = response.data.user
          const d = new Date()
          d.setTime(d.getTime() + (1000 * 60 * 60 * 24))
          const expires = d.toUTCString()

          localStorage.setItem('userId', `${newUser.name}.${newUser.identifier}`)
          localStorage.setItem('genkan-token', response.token)
          localStorage.setItem('sessionExpires', expires)
          newUser.token = response.token
          // send response to mutation
          ctx.commit('setUser', newUser)
          return response
        }
        return response
      // **********
      // LOGIN //
      // **********
      } else if (mode === 'login') {
        const { email, password } = payload;
        // send login information from payload to api
        const response = await loginWithEmailPassword(email, password)

        if (response.status === "success") {
          const user = response.data.user
          // TODO: add session expiration date to response
          const d = new Date()
          const expires = d.setTime(d.getTime() + (1000 * 60 * 60 * 24))

          localStorage.setItem('userId', `${user.name}.${user.identifier}`)
          localStorage.setItem('genkan-token', response.token)
          localStorage.setItem('sessionExpires', expires)

          user.token = response.token
          user.verified = user.accountStatus

          // send response to mutation
          ctx.commit('setUser', user)
        }
        return response
      }
    },
    async tryRefreshAuth(ctx) {
      const expires = localStorage.getItem('sessionExpires')
      if (!expires) {
        console.log("no token; not refreshing auth")
        return ctx.dispatch('logout')
      }

      const today = new Date().getTime()
      const tokenIsNotExpired = today <= +expires

      // expires - if future date, continue
      // expires - else logout
      if (expires != null && tokenIsNotExpired) {
        const userId = localStorage.getItem('userId')
        const token = localStorage.getItem('genkan-token')

        if (token && userId) {
          const name = userId.split('.')[0]
          const identifier = userId.split('.')[1]
          const payload = { name, identifier, active: true }
          payload.token = token

          const response = await ctx.dispatch('getUserInfo', { name, identifier })
          payload.verified = response.accountStatus
          payload.role = response.role

          ctx.commit('setUser', payload)
          return
        }
      } else {
        ctx.dispatch('logout')
      }

    },
  },
  getters: {
    currentUser: state => state.currentUser,
    isAuth: state => state.isAuth,
    token: state => state.token,
    isVerified: state => state.verified,
    hasRole: state => state.role,
  },
}