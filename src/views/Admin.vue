<template>
  <div class="container">
    <section>
      <button class="genkan-button" :class="view === 'notifications' && 'active'" @click="handleChangeView('notifications')">User Notification Creator</button>
      <button class="genkan-button" :class="view === 'gnotifications' && 'active'" @click="handleChangeView('gnotifications')">Global Notification Creator</button>
    </section>

    <section>
      <NotificationCreator v-if="view === 'notifications'" :notificationType="'user'" />
      <NotificationCreator v-if="view === 'gnotifications'" :notificationType="'global'" />
    </section>
  </div>
</template>

<script>
import NotificationCreator from '@/components/admin/NotificationCreator'
export default {
  components: {
    NotificationCreator
  },
  data() {
    return {
      view: null
    }
  },
  methods: {
    handleChangeView(id) {
      this.view = id
    }
  }
}
</script>

<style scoped>
  .container {
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    text-align: left;
    height: auto; 
  }
  section {
    height: auto;
    padding: 10px;
    box-sizing: border-box;
  }
  section:first-child {
    border-right: 2px solid var(--yellow);
    
  }
  section:first-child button {
    width: auto;
    margin: 8px 0;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 2px;
  }
  .active {
    background-color: var(--yellow);
    border-color: var(--yellow);
    color: var(--bg-color-main);
  }
  section:last-child {
    
  }

  @media (min-width: 968px) {
    .container {
      flex-direction: row;
      height: calc(100vh - 55px);
    }
    section {
      height: 100%;
    }
    section:first-child {
      width: 20%;
    }
    section:first-child button {
      width: 100%;
    }
    section:last-child {
      width: 80%;
    }
  }
</style>