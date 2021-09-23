<template>
  <div id="side-nav" v-if="isAuth">
    <div class="pseudo-mobile-top-bar">
      <button class="fa-icon-button menu-toggle-button-in" @click="sidenavOpen = true"><i class="fas fa-bars"></i></button>
    </div>

    <div v-if="sidenavOpen" id="obscured" @click="sidenavOpen = false"></div>
    <transition name="slide-in-left" mode="out-in">
      <div v-if="sidenavOpen" class="side-menu">
        <button class="fa-icon-button menu-toggle-button-out" v-if="sidenavOpen" @click="sidenavOpen = false"><i class="fas fa-times"></i></button>
        <h1>Genkan</h1>
        <ul>
          <!-- <li>
            <router-link to="/chat" @click="sidenavOpen = false">
              <i class="fas fa-comments"></i><span>Chat</span>
            </router-link>
          </li> -->
          <li>
            <router-link to="/stories" @click="sidenavOpen = false">
              <i class="fas fa-book-open"></i><span>Stories</span>
            </router-link>
          </li>
          <li>
            <router-link to="/lessons" @click="sidenavOpen = false">
              <i class="fas fa-language"></i><span>Lessons</span>
            </router-link>
          </li>
          <li>
            <router-link to="/search" @click="sidenavOpen = false">
              <i class="fas fa-globe"></i><span>Search</span>
            </router-link>
            </li>
          <li>
            <router-link to="/passport" @click="sidenavOpen = false">
              <i class="fas fa-user-circle"></i><span>Passport</span>
            </router-link>
          </li>
          <li>
            <button class="signout-button" type="button" @click.prevent="logMeOut">
              <span><i class="fas fa-sign-out-alt"></i></span>Sign out
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentUser', 'isAuth']),
  },
  data() {
    return {
      sidenavOpen: false,
    }
  },
  methods: {
    ...mapActions(['logout']),
    logMeOut() {
      this.sidenavOpen = false
      this.logout()
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
#obscured {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 190;
  background-color: rgba(0,0,0,0.7);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
}
.side-menu {
  position: fixed;
  top: 0;
  width: 75%;
  height: 100%;
  border-right: 2px solid var(--theme-color-main);
  background-color: var(--bg-color-secondary);
  z-index: 200;
}
.pseudo-mobile-top-bar {
  position: fixed;
  z-index: 180;
  top: 0;
  height: 55px;
  width: 100%;
  background-color: var(--bg-color-secondary);
}
.menu-toggle-button-in,
.menu-toggle-button-out {
  position: fixed;
  top: 8px;
  left: 5px;
}
.menu-toggle-button-in { z-index: 190; }
.menu-toggle-button-out { z-index: 200; }
.signout-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
}
h1 {
  font-family: 'Sriracha', cursive;
  text-decoration: none;
  color: var(--theme-color-main);
  margin: 8px 0;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  margin-top: 50px;
  height: 80%;
}
li {
  box-sizing: border-box;
  list-style: none;
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
}

a {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  font-size: 2.6rem;
  font-weight: bold;
  color: var(--off-white-main);
  text-decoration-line: none;
  outline: none;
}
a:hover {
  color: var(--theme-color-main);
}
a span { margin-left: 15px; }
button span { margin-right: 15px; }
.router-link { width: 100%; }
li:last-child { margin: auto -20px 50px 20px; }
.router-link-active, .router-link-exact-active { color: var(--theme-color-main); }
</style>