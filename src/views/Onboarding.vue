<template>
  <div>
    <TheLanguageDropdown />
    <TheCountryDropdown />
  </div>
</template>

<script>
  import TheLanguageDropdown from '../components/TheLanguageDropdown'
  import TheCountryDropdown from '../components/TheCountryDropdown'
  export default {
    name: 'Onboarding',
    components: {
      TheLanguageDropdown,
      TheCountryDropdown,
    }
  }
</script>

<style scoped>
  div {
    margin: 75px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  select {
    width: 20%;
  }
</style>