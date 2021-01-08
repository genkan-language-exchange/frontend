<template>
  <div>
    <ChatCard :chats=chats />
  </div>
</template>

<script>
import moment from 'moment'
import ChatCard from '@/components/ChatCard.vue'

export default {
  name: 'Chat',
  components: {
    ChatCard
  },
  data() {
    return {
      chats: [
        {
          chat_id: 1,
          user_to: 'pikamee',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, ea.',
          time: moment().format('LT')
        },
        {
          chat_id: 2,
          user_to: 'iceman',
          latest_msg: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus consequatur porro nulla!',
          time: moment().format('LT')
        },
        {
          chat_id: 3,
          user_to: 'robsice',
          latest_msg: 'Lorem ipsum dolor sit.',
          time: moment().format('LT')
        },
        {
          chat_id: 4,
          user_to: 'tomo',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          time: moment().format('LT')
        }
      ] // end chats array
    } // end return
  } // end data()
}
</script>

<style scoped>
  div {
    height: 100vh;
    margin: auto 0;
    display: flex;
    justify-content: center;
  }
</style>