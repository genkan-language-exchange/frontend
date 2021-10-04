<template>
  <div id="nav" v-if="isAuth">
    <ul>
      <li v-if="canViewLink"><router-link to="/chat"><i class="fas fa-envelope"></i></router-link></li>
      <!-- <li><router-link to="/chat"><i class="fas fa-comments"></i></router-link></li> -->
      <li><router-link to="/stories"><i class="fas fa-book-open"></i></router-link></li>
      <li><router-link to="/lessons"><i class="fas fa-language"></i></router-link></li>
      <li><router-link to="/search"><i class="fas fa-globe"></i></router-link></li>
      <li><router-link to="/passport"><i class="fas fa-user-circle"></i></router-link></li>
      <li class="no-select"><i @click="handleViewNotifications" class="notifications fas fa-bell"><span v-if="unreadNotifications.length">{{ unreadNotifications.length }}</span></i></li>
    </ul>
  </div>
  <transition :appear="true" name="notification" mode="out-in">
    <NotificationPopup v-if="viewingNotifications" :viewingNotifications="viewingNotifications" />
  </transition>
</template>

<script>
// <i class="fas fa-envelope-open-text"></i> // user has new mail
// <i class="fas fa-envelope"></i>           // user has no new mail
import { mapGetters } from 'vuex'
import NotificationPopup from '@/components/notifications/NotificationPopup'
export default {
  components: {
    NotificationPopup
  },
  data() {
    return {
      viewingNotifications: false
    }
  },
  methods: {
    handleViewNotifications() {
      this.viewingNotifications = !this.viewingNotifications
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuth', 'hasRole', 'notifications']),
    canViewLink() {
      return this.hasRole === "admin" || this.hasRole === "owner"
    },
    unreadNotifications() {
      if (!this.notifications.length) return []
      return this.notifications.filter(noti => !noti.read)
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
.notifications {
  font-size: 2.6rem;
  margin: 0 2rem;
  cursor: pointer;
  position: relative;
}
.notifications span {
  position: absolute;
  top: -8px;
  right: -10px;
  font-size: 1.6rem;
  color: var(--off-white-main);
  background-color: var(--red);
  min-width: 13px;
  padding: 2px;
  height: 13px;
  border-radius: 10px;
  border: 2px solid var(--red);
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Arial, Helvetica, sans-serif;
  font-feature-settings: 'tnum';
  font-variant-numeric: 'tabular-nums';
}
a:hover, .notifications:hover {
  color: var(--theme-color-main);
}
.router-link-active, .router-link-exact-active {
  color: var(--theme-color-main);
}
</style>