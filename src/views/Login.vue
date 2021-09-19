<template>
  <div id="login-outer">
    <transition name="fade-drop" mode="out-in">
      <LoginForm
        v-if="!forgotPassword && isLogin"
        @changeMode="setMode"
        @forgotPassword="setForgotPassword"
        @togglePasswordVisibility="togglePasswordVisibility"
        @setLoading="setLoading"
        :loading="loading"
        :passwordVisible="passwordVisible"
      />
      <RegistrationForm
        v-else-if="!forgotPassword && !isLogin"
        @changeMode="setMode"
        @togglePasswordVisibility="togglePasswordVisibility"
        @setLoading="setLoading"
        :loading="loading"
        :passwordVisible="passwordVisible"
      />
      <PasswordResetRequestForm
        v-else
        :loading="loading"
        @setLoading="setLoading"
        @forgotPassword="setForgotPassword"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from '@/components/authentication/LoginForm.vue'
import RegistrationForm from '@/components/authentication/RegistrationForm.vue'
import PasswordResetRequestForm from '@/components/authentication/PasswordResetRequestForm.vue'

export default {
  data() {
    return {
      isLogin: true,
      forgotPassword: false,
      loading: false,
      passwordVisible: false,
    }
  },
  components: {
    LoginForm,
    RegistrationForm,
    PasswordResetRequestForm,
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    setMode() {
      this.isLogin = !this.isLogin
    },
    setForgotPassword() {
      this.forgotPassword = !this.forgotPassword
    },
    setLoading(val) {
      this.loading = !!val
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    },
  },
}
</script>

<style scoped>

</style>