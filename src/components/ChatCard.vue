<template>
  <div id='chat-container'>
    <div id='passport-left'>
      <div id='chat-search'>
        <input type="text" placeholder="Search for chats..." v-model="searchString">
      </div>
      <template v-if="filteredChats.length > 0">
        <div :key="chat.chat_id" v-for="chat in filteredChats" class="chat-link">
          <ChatLink :chat=chat @selectChat='selectChat' @info='findUserInfo' />
        </div>
      </template>
      <div v-else :key="chat.chat_id" v-for="chat in chats" class="chat-link">
        <ChatLink :chat=chat @selectChat='selectChat' @info='findUserInfo' />
      </div> <!-- end chat-link -->
    </div> <!-- end passport-left -->
    <div id="passport-right">
      <div id="placeholder" v-if="selectedChat === 0">
        <div id="genkan">
          <img src="@/assets/gengokoukan.svg" alt="" draggable="false">
        </div>
        <p class='no-select'>Start a new conversation!</p>
      </div> <!-- end v-if -->
      <div v-else>
        <Chatroom :selectedChat=selectedChat @close='closeChat' @info='findUserInfo' />
      </div> <!-- end v-else -->
    </div> <!-- end passport-right -->
  </div> <!-- end chat-container -->
</template>

<script>
  import ChatLink from './ChatLink.vue'
  import Chatroom from './Chatroom.vue'

  export default {
    components: {
      ChatLink,
      Chatroom,
    },
    props: {
      chats: Array,
    },
    data() {
      return {
        selectedChat: 0,
        searchString: '',
        filteredChats: []
      }
    },
    methods: {
      selectChat(chat) {
        this.selectedChat = chat
      },
      closeChat() {
        this.selectedChat = 0
      },
      searchForChat() {
        !this.chats ? [] : this.filteredChats = this.chats.filter(chat => chat.user_to.toLowerCase().includes(this.searchString.trim().toLowerCase()))
      },
      findUserInfo(val) {
        console.log(val)
      }
    },
    watch: {
      searchString: function() {
        if (!this.searchString.length) return this.filteredChats = []
        const len = this.searchString.trim().length
        !len || len < 3 ? this.filteredChats = [] : this.searchForChat()
      }
    },
    mounted() {
      document.addEventListener('keyup', (e) => {
        if (this.selectedChat > 0) {
          if (e.key === 'Escape' || e.keyCode === 27) return this.closeChat()
        }
      })
    },
    unmounted() {
      document.removeEventListener('keyup', (e) => {
        if (this.selectedChat > 0) {
          if (e.key === 'Escape' || e.keyCode === 27) return this.closeChat()
        }
      })
    }
  }
</script>

<style scoped>
  #chat-container {
    box-sizing: border-box;
    height: 600px;
    width: 900px;
    min-width: 300px;
    min-height: 200px;
    background-color: #718093;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.3), 0 0 5px 5px #353b48;
    border-radius: 15px;
    display: flex;
    font-size: 1.8rem;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  #passport-left, #passport-right {
    width: 50%;
    padding: 50px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  #passport-left {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #2f3640 #f5f6fa;
  }
  #passport-left::-webkit-scrollbar { width: thin; }
  #passport-left::-webkit-track { background: #f5f6fa; }
  #passport-left::-webkit-thumb { background: #8c7ae6; }

  .chat-link {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: none;
    transition: 0.2s background-color ease-out;
  }

  .chat-link:hover {
    background-color: #7f8fa6;
    cursor: pointer;
  }
  
  #passport-right {
    border-left: 1px solid #f5f6fa;
    margin: 0;
    padding: 0;
  }

  #placeholder {
    margin: auto;
    color: #333;
    filter: opacity(0.2);
  }

  #genkan {
    display: inline-block;
    height: 200px;
    width: 200px;
    margin-bottom: 10px;
  }

  #chat-search {
    width: 100%;
    margin: -2px -2px 0 -2px;
  }

  #chat-search input {
    width: 100%;
    padding: 10px 0 10px 15px;
    background-color: #718093;
    border: 0;
    border-bottom: 2px solid #dcdde1;
    color: #dcdde1;
  }

  .no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
</style>