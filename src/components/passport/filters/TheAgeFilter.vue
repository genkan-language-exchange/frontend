<template>
  <div id="min-max-slider">
    <input id="min" ref="min" type="range" min="18" max="150" v-model="min">
    <input id="max" ref="max" type="range" min="18" max="150" v-model="max">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        min: 18,
        max: 150,
      }
    }
  }
</script>

<style scoped>
  #min-max-slider {
    margin: 30px 0;
  }
  input {
    margin: -1px;
  }
</style>