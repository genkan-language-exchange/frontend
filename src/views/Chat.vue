<template>
  <div id="base-view">
    <!-- <ChatCard :chats="chats" /> -->
    <div id="mobile-view" v-if="isMobile">
      <PlaceholderContacts />
    </div>
    <div id="web-view" v-else>
      <div id="contacts-list">
        <!-- placeholders -->
        <PlaceholderContacts />
        <!-- if have data -->
      </div>
      <div id="chats-list">
        <TheLoadSpinner />
      </div>
    </div>
  </div>
</template>

<script>
  import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
  import PlaceholderContacts from '../components/chat/PlaceholderContacts.vue'
  // import ChatCard from '@/components/chat/ChatCard.vue'

  export default {
  name: 'Chat',
  components: {
    // ChatCard
    PlaceholderContacts,
    TheLoadSpinner,
  },
  inject: ['isMobile']
}
</script>

<style scoped>
#base-view {
  height: 100vh;
  font-size: 1.6rem;
}
#mobile-view {
  margin: 75px auto 0;
} 
#web-view {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
}
#contacts-list {
  padding-top: 70px;
  box-sizing: border-box;
  width: 350px;
  min-width: 350px;
  border-right: 2px solid var(--theme-color-main);
}
#chats-list {
  padding-top: 70px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>