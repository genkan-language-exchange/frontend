<template>
  <div v-if="chatData != null">
    <div id="conversation-header">
      <p id="close" @click="closeChat()">&times;</p>
      <div v-for="chatuser in chatData.members" :key="chatuser">
        <h4 v-if="chatuser !== user" @click="userInfo(chatuser)">{{chatuser}}</h4>
      </div>
    </div> <!-- end conversation-header -->
    <div id="conversation-box" ref="messages">
      <div v-for="(message, index) in chatData.messages" :key="message.message_id">

        <div v-if="message.from == user" class="message right">
          <p><span class="the-time">{{message.time}}</span>{{message.content}}</p>
        </div>  <!-- end v-if -->

        <div v-else class="message left">
          <div
            class="avatar"
            v-if="index === 0 || index > 0 && chatData.messages[index - 1].from !== chatData.messages[index].from"
          >
            <img src="@/assets/usure.png" alt="">
          </div>
          <p><span class="the-time">{{message.time}}</span>{{message.content}}</p>
        </div>  <!-- end v-else -->

      </div> <!-- end v-for -->
    </div> <!-- end conversation-box -->
    <form id="user-input" action="" @submit.prevent="sendMessage">
      <textarea v-model="enteredMessage" />
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import chats from '@/data/chats.js'
export default {
  props: {
    selectedChat: Number,      
  },
  // emits: ['close','info'],
  emits: {
    'close': () => true,
    'info': (id) => {
      if (id) return true;
      else {
        console.warn('no id found')
        return false;
      }
    },
  },
  data() {
    return {
      chatData: null,
      user: 'germ',
      enteredMessage: '',
    }
  },
  methods: {
    findChat() {
      const chatData = chats.filter(chat => chat.chat_id === this.selectedChat)
      if (!chatData) return
      this.chatData = chatData[0]
    },
    scrollToBottom() {
      this.$nextTick(() => {
        // use next tick so the chat has time to load its full height
        if (this.$refs.messages == undefined) return
        const el = this.$refs.messages
        el.scrollTop = el.scrollHeight
      })
    },
    closeChat() {
      this.$emit('close')
    },
    userInfo(user_id) {
      this.$emit('info', user_id)
      console.log('help')
    },
    sendMessage() {
      this.chatData.messages.push({
        message_id: 1,
        from: 'germ',
        content: this.enteredMessage.trim(),
        time: moment().format('LT')
      })
      this.scrollToBottom()
      this.enteredMessage = ''
    }
  },
  mounted() {
    this.findChat()
    this.scrollToBottom()
  },
  watch: {
    selectedChat: function() {
      this.findChat()
      this.scrollToBottom()
    }
  }
}
</script>

<style scoped>
#conversation-header {
  position: relative;
  border-bottom: 2px solid #7f8fa6;
}

#conversation-header h4 {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

#conversation-header h4:hover {
  cursor: pointer;
}

p {
  color: white;
  font-size: 1.4rem;
}

.avatar {
  min-width: 50px;
  width: 50px;
  min-height: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
}

#conversation-box {
  min-height: 450px;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #2f3640 #f5f6fa;
}
#conversation-left::-webkit-scrollbar { width: thin; }
#conversation-left::-webkit-track { background: #f5f6fa; }
#conversation-left::-webkit-thumb { background: #2f3640; }

.message {
  position: relative;
  box-sizing: border-box;
  padding: 0 15px;
  margin: 0;
}

.the-time {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  top: 4px;
  right: 4px;
  color: #dcdde1;
  font-weight: bold;
  font-size: 1.2rem;
  transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
}

.message:hover .the-time {
  opacity: 1;
  visibility: visible;
}

.left, .right {
  display: flex;
  flex-direction: row;
}

.left {
  padding: 5px 15px;
  background-color: #7f8fa6;
  text-align: left;
}

.left p {
  margin: auto 30px;
}

.right {
  padding: 5px 15px;
  margin-left: 80px;
  text-align: left;
}

.right p {
  margin: 15px 10px 15px auto;
}

#close {
  font-size: 1.8rem;
  position: absolute;
  top: -30px;
  right: 15px;
}

#close:hover {
  cursor: pointer;
  color: #2f3640;
}

#user-input {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 0 1 auto;
}

#user-input textarea {
  box-sizing: border-box;
  background-color: #dcdde1;
  min-width: 90%;
  min-height: 80px;
  max-height: 80px;
  padding: 7px;
  border: 0;
}

#user-input input[type='submit'] {
  box-sizing: border-box;
  background-color: #dcdde1;
  min-width: 10%;
  padding: 7px;
  border: 0;
  margin: 1px 0;
}

#user-input input[type='submit']:hover {
  background-color: #f5f6fa;
  cursor: pointer;
}
</style>