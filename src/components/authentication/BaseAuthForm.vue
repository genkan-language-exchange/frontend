<template>
  <form @submit.prevent="callLogin">
    <fieldset :disabled="loading" :aria-busy="loading">
      <slot name="fields"></slot>

      <div key="password-visibility">
        <button
          type="button"
          @click.prevent="$emit('togglePasswordVisibility')"
          class="password-visibility"
          aria-name="toggle password visibility"
          v-if="passwordVisible"
        >
          <i class="fas fa-eye"></i>
        </button>

        <button
          type="button"
          @click.prevent="$emit('togglePasswordVisibility')"
          aria-name="toggle password visibility"
          class="password-visibility"
          v-else
        >
          <i class="fas fa-eye-slash"></i>
        </button>
      </div>

      <slot name="foot"></slot>
    </fieldset>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'LoginForm',
    emits: ['changeMode', 'togglePasswordVisibility'],
    props: ['loading', 'passwordVisible'],
    data() {
      return {
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        error: null,
      }
    },
    methods: {
      ...mapActions({
        login: 'login'
      }),
      async callLogin() {
        if (this.email === '' || this.password === '') return this.error = "Please fill out the fields"
        await this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/')
        })
        .catch(err => console.error(err))
      },
      goToOnboarding() {
        if (!this.email.length || !this.password.length || this.password !== this.passwordConfirm) return this.error = "Please fill out the fields"

        this.$router.push({ name: 'Welcome', params: { email: this.email, name: this.username, password: this.password, passwordConfirm: this.passwordConfirm } })
      },
    },
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
    margin: 150px 75px 0 auto;
  }
}
</style>