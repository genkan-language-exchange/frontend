<template>
  <div id="notifications">
    <template v-if="notifications.length">
      <div
        v-for="n in notifications"
        :key="n._id"
        :class="`${n.read && 'read'} ${selectedNotification != null && selectedNotification._id === n._id && 'selected'}`"
        class="no-select"
        @click="handleSelectNotification(n)"  
      >
        <p><i class="fas" :class="n.read ? ' fa-envelope-open' : ' fa-envelope'"></i>{{ n.title }}</p>
      </div>
    </template>
    <template v-else>
      <div class="no-select no-hover">
        <p>No notifications!</p>
      </div>
    </template>
    <teleport to="#app">
      <NotificationModal
        v-if="selectedNotification != null"
        @closeModal="closeModal"
        :notification="selectedNotification"
      />
    </teleport>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NotificationModal from './NotificationModal'
export default {
  props: ['viewingNotifications'],
  components: {
    NotificationModal
  },
  data() {
    return {
      selectedNotification: null
    }
  },
  methods: {
    ...mapActions(['toggleNotificationRead']),
    handleSelectNotification (notification) {
      if (this.selectedNotification?._id === notification._id) return this.selectedNotification = null
      if (!notification.read) {
        this.toggleNotificationRead({ id: notification._id })
      }
      this.selectedNotification = notification
    },
    closeModal() {
      this.selectedNotification = null
    }
  },
  computed: {
    ...mapGetters(['notifications'])
  },
}
</script>

<style scoped>
#notifications {
  position: fixed;
  top: 60px;
  right: 0;
  max-height: 300px;
  width: 300px;
  z-index: 99;

  background-color: var(--bg-color-secondary);
  border-bottom-left-radius: 15px;
  border: 2px solid var(--theme-color-main);
  border-top: 2px dashed var(--theme-color-main);
  border-right-color: transparent;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
}
#notifications>div {
  cursor: pointer;
  padding: 5px;
}
#notifications>div:hover,
.selected {
  background-color: var(--theme-color-main);
  border-radius: 5px;
}
.no-hover {
  cursor: default !important;
}
.no-hover:hover {
  background-color: transparent !important;
}
.read {
  color: #838da4 !important;
}
.read:hover,
.selected {
  background-color: #525b6f !important;
}
p {
  font-size: 2rem;
  padding: 0;
  margin: 0;
}
p i {
  margin-right: 18px;
}

</style>