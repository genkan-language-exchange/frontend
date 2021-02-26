<template>
<div id="app">
  <NavBar />
  <router-view />
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
name: 'Main',
components: {
  NavBar
},
data () {
  return {
    isMobile: true,
  }
},
methods: {
  checkWidth() {
    this.isMobile = window.innerWidth < 1100
  }
},
mounted() {
  window.addEventListener('resize', () => this.checkWidth())
},
beforeUnmount() {
  window.removeEventListener('resize', () => this.checkWidth())
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

.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

/* @media (prefers-color-scheme: light) {
  html, body {
    background-color: #f5f6fa;
  }
} */
</style>
