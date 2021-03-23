<template>
  <form @submit.prevent="goToOnboarding">
    <h2>{{ error && error }}</h2>
    <fieldset :disabled="loading" :aria-busy="loading">
      <label for="email" key="email">Email Address
        <input id="email" name="email" type="email" v-model.trim="email" required placeholder="Enter your email address" />
      </label>
      <label for="username" key="username">Username
        <input id="username" name="username" type="username" v-model.trim="username" required placeholder="Enter your username" />
      </label>
      <label for="password" key="password">Password
        <input id="password" name="password" :type="passwordVisible ? 'text' : 'password' " v-model.trim="password" required placeholder="Enter your password" />
      </label>
      <label for="confirm-password" key="confirm-password">Confirm Password
        <input id="confirm-password" name="confirm-password" :type="passwordVisible ? 'text' : 'password' " v-model.trim="passwordConfirm" required placeholder="Confirm your password" />
      </label>

      <div key="password-visibility">
        <div class="password-visibility" v-if="passwordVisible">
          <i @click="$emit('togglePasswordVisibility')" class="fas fa-eye"></i>
        </div>
        <div class="password-visibility" v-else>
          <i @click="$emit('togglePasswordVisibility')" class="fas fa-eye-slash"></i>
        </div>
      </div>

      <div id="finalize" key="finalize">
        <p>Already have an account? Click <span @click="$emit('changeMode')">here</span></p>
        <button type="submit">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
  export default {
    name: 'RegistrationForm',
    emits: ['changeMode', 'togglePasswordVisibility'],
    props: ['loading', 'passwordVisible'],
    data() {
      return {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        error: '',
      }
    },
    methods: {
      goToOnboarding() {
        if (!this.email.length || !this.password.length || this.password !== this.passwordConfirm) return this.error = "Please fill out the fields"

        this.$router.push({ name: 'Welcome', params: { email: this.email, name: this.username, password: this.password, passwordConfirm: this.passwordConfirm } })
      },
    }
  }
</script>

<style scoped>
form {
  width: 90%;
  margin: 150px auto;
  font-size: 1.6rem;
  position: relative;
  background-color: var(--bg-color-secondary);
  border-radius: 15px;
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
}
fieldset p {
  font-size: 1.2rem;
}
p span {
  text-decoration: underline;
  cursor: pointer;
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
}
button:hover {
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
}
.password-visibility {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  height: 30px;
  width: 30px;
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
    margin: 150px 75px 0 auto;
  }
}
</style>