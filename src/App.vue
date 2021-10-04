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
// import { io } from 'socket.io-client'
export default {
  name: 'Main',
  components: {
    Navigation,
  },
  data() {
    return {
      pingInterval: null,
      socket: null,
    }
  },
  methods: {
    ...mapActions(['pingThatServer', 'getNotifications']),
    setPingInterval() {
      if (this.pingInterval != null) clearInterval(this.pingInterval)
      
      this.pingInterval = setInterval(() => {
        this.ping()
      }, 300000)
    },
    ping() {
      this.pingThatServer()
      this.getNotifications()
    },
  },
  created() {
    this.$store.dispatch('tryRefreshAuth')
    
    // this.socket = io(process.env.VUE_APP_API_URL)
    
    // this.socket.on("connect", () => {
    //   console.log("connected to socket")
    // })

    // this.socket.on("disconnect", (reason) => {
    //   console.log("disconnected from socket")
    //   console.log(reason)
    // })
  },
  mounted() {
    this.setPingInterval()
    this.getNotifications()
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
  font-family: "Noto Sans JP", 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  src: local("Noto Sans JP"), url(./assets/fonts/NotoSansJP-Regular.otf) format("opentype");
}

#app {
  position: relative;
  font-family: 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--gk-font-color);
  width: 100vw;
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

/* font-feature-settings: 'tnum'; */
/* font-variant-numeric: 'tabular-nums'; */
</style>
