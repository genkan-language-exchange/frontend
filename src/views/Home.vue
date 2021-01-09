<template>
  <div class="home">
    <template v-if="!isBrowserOnline">
      <div class="warn">
        <h2>Your browser is not connected to the internet.</h2>
      </div>
    </template>
    <h1>言語交換へようこそ</h1>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      isBrowserOnline: navigator.onLine
    }
  }
}
</script>

<style scoped>
  .home {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 3rem;
    font-family: 'Kosugi Maru', sans-serif;
  }

  .warn {
    font-size: 1.2rem;
    font-family: 'Kosugi Maru', sans-serif;
    color: #fbc531 ;
    border: 2px #fbc531 solid;
    border-radius: 5px;
    width: 30%;
    margin: 20px 0 0;
  }
</style>
