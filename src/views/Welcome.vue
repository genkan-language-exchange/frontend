<template>
  <div id="welcome">
    <div>
      <transition name="cards" mode="out-in">
        <TheLanguageDropdown v-if="onboardStep === 0" @next="next" />
        <TheCountryDropdown v-else-if="onboardStep === 1" />
      </transition>
    </div>
  </div>
</template>

<script>
  import TheLanguageDropdown from '../components/welcome/TheLanguageDropdown'
  import TheCountryDropdown from '../components/welcome/TheCountryDropdown'

  export default {
    name: 'Welcome',
    data() {
      return {
        onboardStep: 0,
        email: '',
        password: '',
      }
    },
    components: {
      TheLanguageDropdown,
      TheCountryDropdown,
    },
    methods: {
      next() {
        this.onboardStep++
      }
    },
    mounted() {
      this.email = this.$route.params.email || ''
      this.password = this.$route.params.password || ''
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

</style>