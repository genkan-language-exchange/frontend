<template>
  <BaseRadio :items="genders">
    <template v-slot:title>What gender do you identify as?</template>
  </BaseRadio>
</template>

<script>
  import BaseRadio from './BaseRadio'
  export default {
    name: "GenderSelection",
    components: {
      BaseRadio,
    },
    props: ['genders']    
  }
</script>

<style scoped>

</style>