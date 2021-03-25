import { loginWithEmailPassword, registerUser } from '../../api/userApi'

const defaultState = {
  currentUser: 'guest.4649',
  didAutoLogout: false,
  isAuth: false,
  role: 'guest',
  userInfo: {},
}

export default {
  state () {
    return {
      currentUser: 'guest.4649',
      isAuth: false,
      role: 'guest',
      userInfo: {},
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
          const newUser = response.data.newUser
          const d = new Date()
          d.setTime(d.getTime() + (1000 * 60 * 60 * 24))
          const expires = d.toUTCString()

          localStorage.setItem('userId', `${newUser.name}.${newUser.identifier}`)
          localStorage.setItem('genkan-token', response.token)
          localStorage.setItem('sessionExpires', expires)
          // send response to mutation
          ctx.commit('setUser', newUser)
          return response
        } else {
          return response
        }
      // **********
      // LOGIN //
      // **********
      } else if (mode === 'login') {
        const { email, password } = payload;
        // send login information from payload to api
        const response = await loginWithEmailPassword(email, password)
        console.log(response);

        if (response.status === "success") {
          const user = response.data.user
          // TODO: add session expiration date to response
          const d = new Date()
          d.setTime(d.getTime() + (1000 * 60 * 60 * 24))
          const expires = d.toUTCString()

          localStorage.setItem('userId', `${user.name}.${user.identifier}`)
          localStorage.setItem('genkan-token', response.token)
          localStorage.setItem('sessionExpires', expires)
          // send response to mutation
          ctx.commit('setUser', user)
        }
      }
    },
    async tryRefreshAuth(ctx) {
      const expires = localStorage.getItem('sessionExpires')
      let d = new Date()
      d = d.toUTCString()
      
      if (expires < d) {
        const _id = localStorage.getItem('_id')
        const userId = localStorage.getItem('userId')

        if (userId) {
          const name = userId.split('.')[0]
          const identifier = userId.split('.')[1]
          const payload = { name, identifier, active: true, _id, }
          ctx.commit('setUser', payload)
        }
      } else {
        ctx.dispatch('logout')
      }

    },
  },
  getters: {
    currentUser: state => state.currentUser,
    isAuth: state => state.isAuth,
  },
}