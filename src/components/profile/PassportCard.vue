<template>
<div id="profile-container">
  <div id="passport-left">
    <h1>Passport</h1>
    <div id="avatar">
      <img ref="avatar" src='@/assets/avatar1.png' alt="user avatar" draggable="false">
    </div>
    <h2>{{user_name}}{{user_identifier}}</h2>
  </div>
  <div id="passport-right">
    <div class="section user-loc">
      <p>From: {{user_from}}</p>
      <p>Lives in: {{user_lives}}</p> <!-- hide "Lives in" based on privacy settings -->
    </div>
    <div class="section">
      <p>Learning: <span :key="user_learns[lang]" v-for="lang in user_learns">{{lang}}</span></p>
      <p>Speaks: <span :key="user_speaks[lang]" v-for="lang in user_speaks">{{lang}}</span></p>
    </div>
    <div class="section">
      <p>Introduction:<br />{{user_intro}}</p>
    </div>
    <div class="section">
      <p>Language Goal: {{user_goal}}<br /></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    avatar: String,
    user_name: String,
    user_identifier: String,
    user_from: String,
    user_lives: String,
    user_learns: Array,
    user_speaks: Array,
    user_intro: String,
    user_goal: String,
  },
  mounted() {
    // prevent avatars from being saved by others
    document.addEventListener('copy', e => e.preventDefault())
    this.$refs.avatar.addEventListener('contextmenu', e => e.preventDefault())
  },
  unmounted() {
    document.removeEventListener('copy', e => e.preventDefault())
  }
}
</script>

<style scoped>
#profile-container {
  box-sizing: border-box;
  height: 600px;
  width: 900px;
  background-color: #718093;
  box-shadow: 0 0 10px 10px rgba(0,0,0,0.3), 0 0 5px 5px #353b48;
  border-radius: 15px;
  display: flex;
  font-size: 1.8rem;
  font-family: 'Sriracha', sans-serif;
}

#passport-left, #passport-right {
  width: 50%;
  padding: 50px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

#passport-left {
  border-right: 1px solid #dcdde1;
  justify-content: space-between;
  align-items: center;
}

#passport-left h1 {
  font-size: 4rem;
}

#passport-right {
  border-left: 1px solid #dcdde1;
  padding: 10px 15px;
  align-items: flex-start;
  text-align: left;
  /* overflow-y: scroll; */
}

#avatar {
  width: 150px;
  height: 150px;
  border: 2px solid #dcdde1;
  border-radius: 50%;
  overflow: hidden;
}

#avatar img {
  height: 100%;
  width: 100%;
}

.user-loc {
  display: flex;
  justify-content: space-around;
}

.section {
  width: 100%;
  border-bottom: 2px solid #dcdde1;
}

.section p span::after {
  content:', '
}

.section p span:last-child:after {
  content:''
}

.section:last-child {
  border-bottom: 0;
}

h1, h2, p, span .no-select {
-webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}
</style>