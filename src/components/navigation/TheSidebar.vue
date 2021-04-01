<template>
  <div id="side-nav" v-if="isAuth">
    <button class="fa-icon-button menu-toggle-button-in" @click="sidenavOpen = true"><i class="fas fa-bars"></i></button>
    <transition name="slide-in-left" mode="out-in">
      <div v-if="sidenavOpen" class="side-menu">
        <button class="fa-icon-button menu-toggle-button-out" v-if="sidenavOpen" @click="sidenavOpen = false"><i class="fas fa-times"></i></button>
        <h1>Genkan</h1>
        <ul>
          <li>
            <router-link to="/" @click="sidenavOpen = false">
              <i class="fas fa-comments"></i><span>Chat</span>
            </router-link>
          </li>
          <li>
            <router-link to="/stories" @click="sidenavOpen = false">
              <i class="fas fa-book-open"></i><span>Stories</span>
            </router-link>
          </li>
          <li>
            <router-link to="/search" @click="sidenavOpen = false">
              <i class="fas fa-globe"></i><span>Search</span>
            </router-link>
            </li>
          <li>
            <router-link :to="{ name: 'Passport', params: { id: currentUser } } " @click="sidenavOpen = false">
              <i class="fas fa-user-circle"></i><span>Passport</span>
            </router-link>
          </li>
          <li>
            <button class="signout-button" type="button" @click.prevent="$emit('logMeOut')">
              <span><i class="fas fa-sign-out-alt"></i></span>Sign out
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentUser', 'isAuth']),
  },
  data() {
    return {
      sidenavOpen: false,
    }
  },
}
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  width: 75%;
  height: 100%;
  border-right: 2px solid var(--theme-color-main);
  background-color: var(--bg-color-secondary);
  z-index: 110;
}
.menu-toggle-button-in,
.menu-toggle-button-out {
  position: absolute;
  top: 15px;
  left: 12px;
}
.menu-toggle-button-in { z-index: 100; }
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
  gap: 50px;
  margin: 0;
  padding: 0;
  margin-top: 50px;
  height: 80%;
}
li {
  list-style: none;
  width: 100%;
  text-align: left;
}

a {
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
a span {
  margin-left: 15px;
}
.router-link {
  width: 100%;
}
li:last-child {
  margin: auto 0 50px 20px;
}
.router-link-active, .router-link-exact-active {
  color: var(--theme-color-main);
}
</style>