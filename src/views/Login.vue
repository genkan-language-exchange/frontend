<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/authentication/LoginForm.vue'
  export default {
    components: {
      LoginForm,
    }
  }
</script>

<style scoped>
  div {
    margin: 100px auto 0;
  }
</style>