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
          latest_msg: 'big yabai',
          time: moment().format('LT')
        },
        {
          chat_id: 2,
          user_to: 'kazunori',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, quod esse animi, accusamus consequatur beatae quaerat quasi sed ut dignissimos voluptates, nobis illo. Corporis, eos.',
          time: moment().format('LT')
        },
        {
          chat_id: 3,
          user_to: 'jiyoung',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ut omnis aliquid totam non ipsa eum, voluptate odio quo dolorem, a quod. Hic, ex distinctio.',
          time: moment().format('LT')
        },
        {
          chat_id: 4,
          user_to: 'tomoyo',
          latest_msg: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, vero.',
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