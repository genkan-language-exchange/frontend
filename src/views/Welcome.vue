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
  import TheLanguageDropdown from '../components/TheLanguageDropdown'
  import TheCountryDropdown from '../components/TheCountryDropdown'
  export default {
    name: 'Welcome',
    data() {
      return {
        onboardStep: 0
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
    }
  }
</script>

<style scoped>
#welcome {
  height: 70vh;
  font-size: 1.4rem;
  margin: 100px auto;
  overflow: hidden;
}
#welcome>div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
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