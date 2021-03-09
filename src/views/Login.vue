<template>
  <transition name="forms" mode="out-in">
    <LoginForm
      v-if="isLogin"
      @changeMode="setMode"
      @togglePasswordVisibility="togglePasswordVisibility"
      :loading="loading"
      :passwordVisible="passwordVisible"
    />
    <RegistrationForm
      v-else-if="!isLogin"
      @changeMode="setMode"
      @togglePasswordVisibility="togglePasswordVisibility"
      :loading="loading"
      :passwordVisible="passwordVisible"
    />
  </transition>
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
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible
      },
    },
  }
</script>

<style scoped>
.forms-enter-from {
  opacity: 0;
  transform: translateY(-50px) scale(1.1);
}
.forms-enter-active {
  transition: all 0.3s ease-out;
}
.forms-enter-to {
  opacity: 1;
  transform: translateY(0) rotate(0deg) scale(1);
}

.forms-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.forms-leave-active {
  transition: all 0.3s ease-out;
}
.forms-leave-to {
  opacity: 0;
  transform: translateY(200px) scale(0.7);
}
</style>