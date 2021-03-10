<template>
  <div id="base-view">
    <!-- <ChatCard :chats="chats" /> -->
    <div id="mobile-view" v-if="isMobile">
      <p>heck</p>
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
  import moment from 'moment'
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
  data() {
    return {
      chats: [
        {
          chat_id: 1,
          user_to: 'pikamee',
          latest_msg: 'big yabai',
          time: moment().format('LT')
        },
        {
          chat_id: 2,
          user_to: 'test',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, quod esse animi, accusamus consequatur beatae quaerat quasi sed ut dignissimos voluptates, nobis illo. Corporis, eos.',
          time: moment().format('LT')
        },
        {
          chat_id: 3,
          user_to: 'tester',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ut omnis aliquid totam non ipsa eum, voluptate odio quo dolorem, a quod. Hic, ex distinctio.',
          time: moment().format('LT')
        },
        {
          chat_id: 4,
          user_to: 'testerer',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, vero.',
          time: moment().format('LT')
        }
      ], // end chats array
      isMobile: window.innerWidth < 959,
    } // end return
  }, // end data()
  watch: {
    isMobile(val) {
      return val < 959
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      return this.isMobile = window.innerWidth < 900
    }
  }
}
</script>

<style scoped>
#base-view {
  height: 100vh;
  font-size: 1.6rem;
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
  border-right: #8c7ae6 2px solid;
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