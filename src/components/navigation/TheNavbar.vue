<template>
  <div id="nav" v-if="isAuth">
    <ul>
      <!-- <li><router-link to="/chat"><i class="fas fa-comments"></i></router-link></li> -->
      <li><router-link to="/stories"><i class="fas fa-book-open"></i></router-link></li>
      <li><router-link to="/lessons"><i class="fas fa-language"></i></router-link></li>
      <li><router-link to="/search"><i class="fas fa-globe"></i></router-link></li>
      <li><router-link to="/passport"><i class="fas fa-user-circle"></i></router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentUser', 'isAuth', 'hasRole']),
    canViewLink() {
      return this.hasRole === "admin" || this.hasRole === "owner"
    }
  },
}
</script>

<style scoped>
#nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid var(--theme-color-main);
  background-color: var(--bg-color-secondary);
  padding-top: 10px;
  z-index: 50;
}
h1 {
  font-family: 'Sriracha', cursive;
  font-size: 2.4rem;
  text-decoration: none;
  color: var(--theme-color-main);
}
ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
li {
  list-style: none;
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
.router-link-active, .router-link-exact-active {
  color: var(--theme-color-main);
}
</style>