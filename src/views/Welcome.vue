<template>
  <div id="welcome">
    <div v-if="skip < 3">
      <transition name="cards" mode="out-in">
        <TheLanguageDropdown v-if="onboardStep === 0" @next="next" />
        <TheCountryDropdown v-else-if="onboardStep === 1" />
      </transition>
    </div>

    <div id="skip-group">
      <transition-group name="skip-setup" mode="out-in">
        <div id="skip" v-if="skip < 3">
          <button v-if="!skip" @click="skipSetup(1)">Skip Setup <i class="fas fa-forward"></i></button>
          <div v-else>
            <h3>Are you sure?</h3>
            <button @click="skipSetup(0)">Cancel</button>&nbsp;
            <button @click="skipSetup(2)">Yes</button>
          </div>
        </div>

        <div v-else id="loading">
          <p v-if="popupMessage">{{message}}</p>
          <TheLoadSpinner v-else />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import TheCountryDropdown from '../components/welcome/TheCountryDropdown'
  import TheLanguageDropdown from '../components/welcome/TheLanguageDropdown'
  import TheLoadSpinner from '../components/TheLoadSpinner'

  export default {
    name: 'Welcome',
    data() {
      return {
        onboardStep: 0,
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
        message: '',
        popupMessage: false,
        skip: 0,
      }
    },
    components: {
      TheCountryDropdown,
      TheLanguageDropdown,
      TheLoadSpinner
    },
    methods: {
      ...mapActions({
        signup: 'signup'
      }),
      next() {
        this.onboardStep++
      },
      skipSetup(num) {
        this.skip = num
        if (num === 2) {
          this.skip = 3
          this.fastSignUp()
        }
      },
      async fastSignUp() {
        const response = await this.signup({ name: this.name, email: this.email, password: this.password, passwordConfirm: this.passwordConfirm })
        if (response.status === "success") {
          this.popupMessage = true
          this.message = "Looks good!"
          setTimeout(() => {
            this.popupMessage = false
            this.message = ""
            this.$router.push('/stories')
          }, 3000)
        }
        if (response.status === "fail") {
          this.popupMessage = true
          this.message = "Email address already in use"
          setTimeout(() => {
            this.popupMessage = false
            this.message = ""
            this.skipSetup(0)
          }, 5000)
        }
      }
    },
    mounted() {
      this.email = this.$route.params.email
      this.name = this.$route.params.name
      this.password = this.$route.params.password
      this.passwordConfirm = this.$route.params.passwordConfirm
      if (!this.$route.params.email || !this.$route.params.name || !this.$route.params.password || !this.$route.params.passwordConfirm) this.$router.push('/login')
    },
  }
</script>

<style scoped>
#welcome {
  font-size: 1.4rem;
  margin: 60px auto 0;
  padding: 40px 0 150px;
  overflow-x: hidden;
}
#welcome>div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
select {
  width: 20%;
}
#loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
#skip-group {
  position: relative;
}
#skip {
  margin-top: 25px;
}
#skip button {
  border: none;
  outline: none;
  padding: 8px 12px;
  border-radius: 5px;
  color: white;
  background-color: var(--theme-color-main);
  cursor: pointer;
  font-size: 1.6rem;
  font-family: 'Roboto';
  transition: all 0.2s ease-out;
}
#skip button:hover,
#skip button:active {
  color: var(--theme-color-main);
  background-color: white;
}
.cards-enter-from {
  opacity: 0;
  transform: translateX(700px) rotate(15deg);
}
.cards-enter-active {
  transition: all 0.3s ease-out;
}
.cards-enter-to {
  opacity: 1;
  transform: translateX(0) rotate(0deg);
}
.cards-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.cards-leave-active {
  transition: all 0.3s ease-out;
}
.cards-leave-to {
  opacity: 0;
  transform: translateX(-700px) rotate(-15deg);
}

.skip-setup-enter-from {
  opacity: 0;
  transform: translateY(-100px) rotate(15deg);
}
.skip-setup-enter-active {
  transition: all 0.5s ease-out;
  position: absolute;
}
.skip-setup-enter-to {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}
.skip-setup-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.skip-setup-leave-active {
  transition: all 0.2s ease-out;
  position: absolute;
}
.skip-setup-leave-to {
  opacity: 0;
  transform: translateY(-100px) rotate(-15deg);
}

</style>