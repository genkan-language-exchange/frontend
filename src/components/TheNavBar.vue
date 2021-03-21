<template>
  <div id="nav">
    <template v-if="isAuth">
      <ul>
        <li><router-link to="/"><i class="fas fa-comments"></i></router-link></li>
        <li><router-link to="/stories"><i class="fas fa-book-open"></i></router-link></li>
        <li><router-link to="/search"><i class="fas fa-globe"></i></router-link></li>
        <li><router-link :to="{ name: 'Passport', params: { id: currentUser } } "><i class="fas fa-user-circle"></i></router-link></li>
      </ul>
    </template>
    <template v-else>
      <ul>
        <li><router-link to="/login"><i class="fas fa-sign-in-alt"></i></router-link></li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['currentUser', 'isAuth']),
  }
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
  z-index: 100;
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
/* li:last-child {
  position: absolute;
  bottom: 0;
} */
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
/* a:last-child {
  margin-top: auto !important;
} */
.router-link-active, .router-link-exact-active {
  color: var(--theme-color-main);
}
</style>