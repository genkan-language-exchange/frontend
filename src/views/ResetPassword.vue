<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h2 v-if="!success">Reset Your Password</h2>
      <template v-if="success">
        <h3 class="success-message">Password reset!</h3>
        <h4 class="success-message">You are now logged in. You will be redirected in {{ countdownFrom10 }} seconds.</h4>
        <button @click="cancelTimeoutAndRedirect">OK</button>
      </template>
      <h3 class="error-message" v-if="!!error.length">{{ error }}</h3>
      <fieldset :disabled="!!error">
        <div>
          <label for="password">New password</label>
          <input :type="passwordVisible ? 'text' : 'password' " v-model.trim="password" autofocus minlength="8" required placeholder="Enter a new password (min. 8 characters)">
        </div>
        <div>
          <label for="password-confirm">Confirm new password</label>
          <input :type="passwordVisible ? 'text' : 'password' " v-model.trim="passwordConfirm" minlength="8" required placeholder="Confirm your new password">
        </div>

        <div key="password-visibility">
          <button
            type="button"
            @click.prevent="togglePasswordVisibility"
            class="password-visibility"
            aria-name="toggle password visibility"
          >
            <i :class="passwordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
          </button>
        </div>

        <div id="finalize" key="finalize">
          <button type="submit" :disabled="password.length < 8 || password !== passwordConfirm">Submit</button>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { testResetPasswordToken } from '@/api/userApi'
export default {
  name: "ResetPassword",
  data() {
    return {
      error: "",
      password: "",
      passwordConfirm: "",
      passwordVisible: false,
      success: false,
      redirect: null,
      timer: null,
      countdownFrom10: 10,
    }
  },
  methods: {
    ...mapActions({
      resetPassword: 'resetPassword'
    }),
    cancelTimeoutAndRedirect() {
      clearTimeout(this.redirect)
      clearInterval(this.timer)
      this.countdownFrom10 = 0
      this.$router.push('/')
    },
    async testToken() {
      const token = this.$route.params.token
      try {
        await testResetPasswordToken(token)
      } catch (error) {
        this.error = "Password reset token has expired."
      }
    },
    async handleSubmit() {
      const resetToken = this.$route.params.token
      
      const response = await this.resetPassword({resetToken, password: this.password, passwordConfirm: this.passwordConfirm})
       
      if (response) {
        this.success = true
        this.countdownFrom10 = 10

        this.redirect = setTimeout(() => {
          this.$router.push('/')
        }, 10000)
        this.timer = setInterval(() => {
          --this.countdownFrom10
          if (this.countdownFrom10 <= 0) clearInterval(this.timer)
        }, 1000)
      }
      else this.error = "Unable to reset password; try getting a new token."
    },  
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible
    }
  },
  mounted () {
    this.testToken()
  }
}
</script>

<style scoped>
.container {
  margin: 60px 0;
  font-size: 1.8rem;
}
.error-message {
  padding: 20px;
  color: var(--red);
}
h3.success-message {
  color: var(--green);
}
form {
  width: 90%;
  margin: 150px auto;
  position: relative;
  background-color: var(--bg-color-secondary);
  border-radius: 15px;
}
form, input, button {
   font-size: 1.6rem;
}
form h2 {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 30px;
}
fieldset {
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 0 16px 16px;
  border-radius: 15px;
}
fieldset div {
  width: 100%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
}
label {
  width: 100%;
  margin: 20px 0 10px;
  text-align: left;
}
input {
  width: 100%;
  margin-top: 3px;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 8px;
  border-radius: 5px;
  font-size: 1.6rem;
}
fieldset p {
  font-size: 1.2rem;
}
p span {
  text-decoration: underline;
  cursor: pointer;
}
p span:hover {
  color: var(--theme-color-main);
}
#finalize {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
}
button {
  margin: 15px 0 10px;
  padding: 8px 12px;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
}
button:hover {
  color: var(--theme-color-main);
  background-color: var(--off-white-main);
}
button:disabled,
button:disabled:hover {
  cursor: default;
  color: gray;
  background-color: white;
}
.password-visibility {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  height: 30px;
  width: 30px;
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
  border-radius: 5px;
  transition: all 0.2s ease-out;
  cursor: pointer;
}
.password-visibility:hover {
  color: var(--theme-color-main);
  background-color: var(--off-white-main);
}

@media (min-width: 959px) {
  form {
    width: 500px;
    margin: 150px auto;
  }
  input, button {
    font-size: 1.4rem;
  }
}
</style>
