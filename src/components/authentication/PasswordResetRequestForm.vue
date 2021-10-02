<template>
  <form @submit.prevent="submitRequestPasswordForm" v-if="!requestSuccess">
    <div v-if="error" class="error-message">
      <h2>Please enter your email address</h2>
    </div>
    <fieldset :disabled="loading" :aria-busy="loading">
      <label for="email" key="email">Email Address
        <input id="email" name="email" v-model.trim="email" type="email" aria-errormessage="Missing email address" required placeholder="Enter your email address" />
      </label>

      <div id="finalize" key="finalize">
        <p><span @click="$emit('forgotPassword')">I remembered my password</span></p>
        <button>Request New Password</button>
      </div>
    </fieldset>
  </form>
  <div class="success-message" v-else>
    <h2>Check your inbox for an email from <span>support@genkan.app</span>!</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "PasswordResetRequestForm.vue",
  emits: ["forgotPassword"],
  props: ['loading'],
  data() {
    return {
      error: false,
      email: "",
      requestSuccess: false,
    }
  },
  methods: {
    ...mapActions({
      requestPasswordToken: 'requestPasswordToken'
    }),
    async submitRequestPasswordForm() {
      this.$emit('setLoading', true)
      this.error = false
      if (this.email === '') return this.error = true

      const response = await this.requestPasswordToken({ email: this.email })
      
      if (response.status === 200) {
        this.email = ""
        this.requestSuccess = true
      } else {
        this.error = "Could not fulfill request"
      }

      this.$emit('setLoading', false)
    }
  }
}
</script>

<style scoped>
.error-message {
  padding: 20px;
}
.success-message {
  padding: 20px;
}
h2 { margin: 0; }
h2 span {
  color: var(--theme-color-main);
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