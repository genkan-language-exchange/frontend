<template>
  <div class="wrapper">
    <div class="avatar" @click="userInfo(chat.user_to)">
      <img src="@/assets/usure.png" alt="avatar" draggable="false">
    </div>
    <div class="info" @click="selectChat(chat.chat_id)" >
      <div class="to-time">
        <h4>{{chat.user_to}}</h4>
        <p>{{chat.time}}</p>
      </div>
      <p>{{textTruncate(chat.latest_msg, 50)}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      chat: Object
    },
    methods: {
      textTruncate(str, maxlen) {
        return str.length > maxlen ? `${str.substring(0, maxlen)}...` : str
      },
      userInfo(user_id) {
        this.$emit('info', user_id)
      },
      selectChat(chat_id) {
        this.$emit('selectChat', chat_id)
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  h4 {
    font-weight: bold;
    font-size: 1.4rem;
    margin: 0;
    padding: 0;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }

  .info { width: 100%; }

  .to-time {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .avatar {
    min-height: 50px;
    height: 50px;
    max-height: 50px;
    min-width: 50px;
    width: 50px;
    max-width: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
  }

  .avatar img {
    height: 100%;
    width: 100%;
  }

  h4, p, .no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
</style>