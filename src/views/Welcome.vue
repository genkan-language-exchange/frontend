<template>
  <div id="welcome">

    <div v-if="skip < 3">
      <transition name="cards" mode="out-in">
        <TheLanguageDropdown v-if="onboardStep === 0" @next="next">What language(s) do you speak?</TheLanguageDropdown>
        <TheLanguageDropdown v-else-if="onboardStep === 1" @next="next" :languageKnow="matchSettings.languageKnow">What language(s) are you interested in?</TheLanguageDropdown>
        <TheCountryDropdown v-else-if="onboardStep === 2" @next="next">Where are you from?</TheCountryDropdown>
        <TheCountryDropdown v-else-if="onboardStep === 3" @next="next">Where do you live?</TheCountryDropdown>
        <TheGenderSelection v-else-if="onboardStep === 4" @next="next" :items="genders" />
        <div v-else-if="onboardStep === 5">
          <DatePicker @next="next" />
          <h3>You're all set!</h3>
          <ul>
            <li><span>Language(s) spoken:</span> {{ matchSettings.languageKnow.join(', ') }}</li>
            <li><span>Language(s) learning:</span> {{ matchSettings.languageLearn.join(', ') }}</li>
            <li><span>From:</span> {{ matchSettings.nationality }}</li>
            <li><span>Lives in:</span> {{ matchSettings.residence }}</li>
            <li><span>Gender:</span> {{ matchSettings.gender }}</li>
          </ul>
        </div>
      </transition>
    </div>

    <div id="skip-group" v-if="onboardStep < 5">
      <transition-group name="skip-setup" mode="out-in">
        <div id="skip" v-if="skip < 3">
          <button v-if="!skip" @click="skipSetup(1)">Skip Setup <i class="fas fa-forward"></i></button>
          <div v-else>
            <h3>Are you sure?</h3>
            <button @click="skipSetup(0)">Cancel</button>&nbsp;
            <button @click="skipSetup(2)">Yes</button>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-if="popupMessage">
      <div v-if="!error" class="congrats">
        <h3>Looks good!</h3>
        <i class="fas fa-fire-alt"></i>
        <TheLoadSpinner />
      </div>
      <div class="uncongrats" v-else>
        <h3>Whoops! Email address already in use 🤯</h3>
        <p>Click <a href="/login">here</a> if you want to try logging in.</p>
        <form id="try-new-email" @submit.prevent="finalizeSignUp">
          <label for="email">...or try a new email address</label>
          <div id="email-input">
            <input type="text" name="email" id="email" v-model="email" placeholder="Email address">
            <button type="submit"><i class="far fa-edit"></i></button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import DatePicker from '../components/welcome/DatePicker'
  import TheGenderSelection from '../components/welcome/TheGenderSelection'
  import TheCountryDropdown from '../components/welcome/TheCountryDropdown'
  import TheLanguageDropdown from '../components/welcome/TheLanguageDropdown'
  import TheLoadSpinner from '../components/TheLoadSpinner'

  export default {
    name: 'Welcome',
    components: {
      DatePicker,
      TheGenderSelection,
      TheCountryDropdown,
      TheLanguageDropdown,
      TheLoadSpinner
    },
    data() {
      return {
        onboardStep: 0,
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
        matchSettings: null,
        error: false,
        popupMessage: false,
        skip: 0,
        genders: ['Male', 'Female', 'Non-binary']
      }
    },
    methods: {
      ...mapActions({
        signup: 'signup'
      }),
      matchSettingsBuilder(val) {
        let newKeyVal = {};
        switch (this.onboardStep) {
          case 0:
            newKeyVal = { "languageKnow": val }
            break;
          case 1:
            newKeyVal = { "languageLearn": val }
            break;
          case 2:
            newKeyVal = { "nationality": val }
            break;
          case 3:
            newKeyVal = { "residence": val }
            break;
          case 4:
            newKeyVal = { "gender": val[0].toString() }
            break;
          case 5:
            console.log(val)
            newKeyVal = { "birthday": val }
            break;
          default:
            newKeyVal = undefined
            break;
        }
        this.matchSettings = { ...this.matchSettings, ...newKeyVal }
      },
      next(val) {
        this.matchSettingsBuilder(val)
        if (this.onboardStep < 6) this.onboardStep++
        if (this.onboardStep === 6) this.finalizeSignUp()
      },
      skipSetup(num) {
        this.skip = num
        if (num === 2) {
          this.skip = 3
          this.finalizeSignUp()
        }
      },
      async finalizeSignUp() {
        this.error = false
        this.popupMessage = true
        const response = await this.signup({ name: this.name, email: this.email, password: this.password, passwordConfirm: this.passwordConfirm, matchSettings: this.matchSettings })
        if (response.status === "success") {
          setTimeout(() => {
            this.$router.push('/stories')
          }, 3000)
        }
        if (response.status === "fail") {
          console.log(response)
          this.error = true
          this.popupMessage = true
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
ul li {
  text-align: left;
  text-decoration: none;
}
ul li span {
  font-weight: 600;
}
.congrats {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.congrats h3 {
  font-size: 2.4rem;
}
.congrats i {
  font-size: 4rem;
  color: orange;
  margin-bottom: 60px;
}

.uncongrats h3 {
  font-size: 2.4rem;
  font-family: "Sriracha", sans-serif;
}
.uncongrats p, .uncongrats label {
  font-size: 1.6rem;
  margin: 0;
}
.uncongrats a:active,
.uncongrats a:visited {
  color: white;
}
.uncongrats a:hover {
  color: var(--theme-color-main);
}
.uncongrats div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#email-input {
  display: 'flex';
  flex-direction: row;
  align-items: flex-end;
}
#email-input input {
  width: 100%;
  margin: 0;
  margin-top: 3px;
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 8px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
#email-input button {
  margin: 0;
  border: none;
  outline: none;
  padding: 8px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
  cursor: pointer;
}
#email-input button:hover,
#email-input button:active {
  color: var(--theme-color-main);
  background-color: var(--off-white-main);
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