<template>
  <div id="app">
    <TheNavBar />
    <router-view />
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar.vue'

export default {
  name: 'Main',
  components: {
    TheNavBar
  },
  created() {
    this.$store.dispatch('tryRefreshAuth')
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  background-color: #2f3640;
}

#app {
  font-family: 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f5f6fa;
  /*
  font-family: 'Roboto', sans-serif;
  font-family: 'Sriracha', cursive;
  font-family: 'Kosugi Maru', sans-serif;
  */
}
#loading {
  margin-top: 150px;
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

/* .route-enter-from {
  opacity: 0;
}
.route-enter-to {
  opacity: 1;
}
.route-enter-active {
  animation: slide 0.4s ease-out;
}
.route-leave-active {
  animation: slide 0.4s ease-in;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(-45px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
} */

/* @media (prefers-color-scheme: light) {
  html, body {
    background-color: #f5f6fa;
  }
} */
</style>
