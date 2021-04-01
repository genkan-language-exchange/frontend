<template>
  <div id="app">
    <template>
      <TheSidebar v-if="isMobile"/>
      <TheNavbar v-else />
    </template>
    <router-view />
  </div>
</template>

<script>
import './assets/index.css'
import './assets/transitions.css'
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'

export default {
  name: 'Main',
  components: {
    TheNavbar,
    TheSidebar,
  },
  created() {
    this.$store.dispatch('tryRefreshAuth')
  },
  provide() {
    return {
      isMobile: this.isMobile
    }
  },
  data() {
    return {
      isMobile: window.innerWidth < 959,
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      return this.isMobile = window.innerWidth < 900
    }
  },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  background-color: var(--bg-color-main);
}

#app {
  font-family: 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--off-white-main);
  /* position: relative; */
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

/* font-feature-settings: 'tnum'; */
/* font-variant-numeric: 'tabular-nums'; */
</style>
