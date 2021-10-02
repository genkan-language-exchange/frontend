<template>
  <form @submit.prevent="callLogin">
    <div class="error-message">
      <h2>{{ error && error }}</h2>
    </div>
    <fieldset :disabled="loading" :aria-busy="loading">
      <label for="email" key="email">Email Address
        <input id="email" name="email" v-model.trim="email" type="email" aria-errormessage="Missing email address" required placeholder="Enter your email address" />
      </label>
      <label for="password" key="password">Password
        <input id="password" name="password" v-model.trim="password" :type="passwordVisible ? 'text' : 'password' " aria-errormessage="Missing password" required placeholder="Enter your password" />
      </label>

      <div key="password-visibility">
        <button
          type="button"
          @click.prevent="$emit('togglePasswordVisibility')"
          class="password-visibility"
          aria-name="toggle password visibility"
        >
          <i :class="passwordVisible ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </button>
      </div>

      <div id="finalize" key="finalize">
        <p><span @click="$emit('forgotPassword')">Forgot your password?</span></p>
        <p><span @click="$emit('changeMode')">Don't have an account yet?</span></p>
        <button type="submit" @click.prevent="callLogin" :disabled="password.length < 8">Login</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'LoginForm',
    emits: ['changeMode', 'forgotPassword', 'setLoading', 'togglePasswordVisibility',],
    props: ['loading', 'passwordVisible'],
    data() {
      return {
        error: null,
        email: '',
        password: '',
      }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
      callLogin() {
        if (this.password.length < 8) return this.error = "Password too short"
        if (this.email === '' || this.password === '') return this.error = "Please fill out the fields"

        this.$emit('setLoading', true)
        this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/')
        })
        .catch(err => {
          console.error(err)
          this.error = "Could not login"
          this.$emit('setLoading', false)
        })
      }
    },
  }
</script>

<style scoped>
.error-message {
  padding: 20px;
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
fieldset {
  border: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 15px;
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
    margin: 150px auto 0;
  }
  input, button {
    font-size: 1.4rem;
  }
}
</style>