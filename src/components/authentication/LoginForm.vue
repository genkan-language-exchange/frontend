<template>
  <form>
    <fieldset>
      <label for="email">Email Address
        <input id="email" name="email" ref="email" type="email" required placeholder="Enter your email address...">
      </label>
      <label for="password">Password
        <input id="password" name="password" ref="password" type="password" required placeholder="Enter a password...">
      </label>
      <div>
        <template v-if="isLogin">
          <p>Don't have an account? Click <span @click="isLogin = false">here</span></p>
          <button type="button">Login</button>
        </template>
        <template v-else>
          <p>Have an account? Click <span @click="isLogin = true">here</span></p>
          <button type="button" @click="goToOnboarding">Register</button>
        </template>
      </div>
    </fieldset>
  </form>
</template>

<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        isLogin: true
      }
    },
    methods: {
      goToOnboarding() {
        this.$router.push('/welcome')
      }
    }
  }
</script>

<style scoped>
  form {
    width: 90%;
    margin: 0 auto;
    font-size: 1.6rem;
    background-color: #353b48;
    border-radius: 15px;
  }
  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  label {
    margin: 20px 0 10px;
  }
  input {
    margin-left: 5px;
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 8px;
    border-radius: 5px;
  }
  fieldset div {
    display: flex;
    align-items: flex-end;
  }
  fieldset div p {
    font-size: 1.2rem;
    margin-right: 10px;
  }
  p span {
    text-decoration: underline;
    cursor: pointer;
  }
  button {
    margin: 10px 0;
  }
</style>