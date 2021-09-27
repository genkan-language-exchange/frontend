<template>
  <div id="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import './assets/index.css'
import './assets/transitions.css'
import './assets/animations.css'
import Navigation from '@/components/navigation/Navigation'
import { mapActions } from 'vuex'

export default {
  name: 'Main',
  components: {
    Navigation,
  },
  data() {
    return {
      pingInterval: null
    }
  },
  methods: {
    ...mapActions(['pingThatServer']),
    setPingInterval() {
      if (this.pingInterval != null) clearInterval(this.pingInterval)
      
      this.pingInterval = setInterval(() => {
        this.ping()
      }, 900000)
    },
    async ping() {
      const response = await this.pingThatServer()
      console.log(response)
    }
  },
  created() {
    this.$store.dispatch('tryRefreshAuth')
  },
  mounted() {
    this.setPingInterval()
  },
  beforeUnmount() {
    clearInterval(this.pingInterval)
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-size: 62.5%;
  background-color: var(--bg-color-main);
}

@font-face {
  font-family: "Roboto";
  src: local("Roboto"), url(./assets/fonts/Roboto-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Dot Gothic";
  src: local("Dot Gothic"), url(./assets/fonts/DotGothic16-Regular.ttf) format("truetype");
}
/* Japanese */
@font-face {
  font-family: "Noto Sans JP";
  src: local("Noto Sans JP"), url(./assets/fonts/NotoSansJP-Regular.otf) format("opentype");
}

#app {
  font-family: 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--gk-font-color);
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
