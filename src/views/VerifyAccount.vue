<template>
  <div>
    <p v-if="success && !error">Looks good!</p>
    <p v-if="error">Something went wrong validating your account, please try again.</p>
  </div>
</template>

<script>
  import { validateAccount } from '@/api/userApi'
  export default {
    data() {
      return {
        success: false,
        error: ''
      }
    },
    methods: {
      setError(val) {
        this.error = val
      },
      async tryValidate() {
        const token = this.$route.params.token
        if (!token) return this.setError("403")
        const response = await validateAccount(token).then(res => {
          res.message === "success" ? this.success = true : this.setError("404")
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(() => {
          this.setError("500")
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        if (response == undefined) this.setError()
      },
    },
    mounted() {
      this.tryValidate()
    }
  }
</script>

<style scoped>
  div {
    margin-top: 125px;
    font-size: 1.8rem;
  }
</style>