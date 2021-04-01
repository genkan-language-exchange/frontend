<template>
  <div id="login-outer">
    <transition name="fade-drop" mode="out-in">
      <LoginForm
        v-if="isLogin"
        @changeMode="setMode"
        @togglePasswordVisibility="togglePasswordVisibility"
        @setLoading="setLoading"
        :loading="loading"
        :passwordVisible="passwordVisible"
      />
      <RegistrationForm
        v-else-if="!isLogin"
        @changeMode="setMode"
        @togglePasswordVisibility="togglePasswordVisibility"
        @setLoading="setLoading"
        :loading="loading"
        :passwordVisible="passwordVisible"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from '@/components/authentication/LoginForm.vue'
import RegistrationForm from '@/components/authentication/RegistrationForm.vue'
  export default {
    data() {
      return {
        isLogin: true,
        loading: false,
        passwordVisible: false,
      }
    },
    components: {
      LoginForm,
      RegistrationForm,
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
      setMode() {
        this.isLogin = !this.isLogin
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