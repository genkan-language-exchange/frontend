<template>
  <div id="base" v-if="user._id">
    <div id="head">
      <template v-if="!user.avatar">
        <div id="avatar-outer">
          <span v-if="newUser" class="material-icons new-icon">fiber_new</span>
          <div id="avatar" :style="newUser ? { border: '2px solid #8c7ae6' } : { border: '2px solid white' }">
            <img ref="avatar" src='@/assets/avatar1.png' alt="User" draggable="false">
          </div>
        </div>
      </template>
      <div>
        <div id="user-name-age">
          <h2 :style="isMobile ? {} : { width: '300px' }">{{user.name}} <span>#{{user.identifier}}</span></h2>
          <p>{{user.matchSettings.age}} years old</p>
        </div>
        <div id="user-lang">
          <p>Speaks: {{user.matchSettings.languageKnow.join(', ')}}</p>
          <p>Learns: {{user.matchSettings.languageLearn.join(', ')}}</p>
        </div>
      </div>
    </div>

    <div v-if="isSelf" id="foot">
      <button type="button" @click.prevent="logMeOut"><span><i class="fas fa-sign-out-alt"></i></span>Sign out</button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import checkAccountAge from '../../util/checkAccountAge.js'
export default {
  props: {
    user: Object
  },
  data() {
    return {
      isMobile: Boolean
    }
  },
  methods: {
    ...mapGetters(['currentUser']),
    ...mapActions(['logout']),
    checkWidth() {
      this.isMobile = window.innerWidth < 1100
    },
    logMeOut() {
      this.logout()
      this.$router.replace('/login')
    }
  },
  computed: {
    isSelf() {
      return this.currentUser() === this.$route.params.id
    },
    newUser() {
      return checkAccountAge(this.user.matchSettings.accountCreated)
    },
  },
  mounted() {
    window.addEventListener('resize', () => this.checkWidth())
    // prevent avatars from being saved by others
    document.addEventListener('copy', e => e.preventDefault())
    this.$refs.avatar.addEventListener('contextmenu', e => e.preventDefault())
  },
  beforeUnmount() {
    window.removeEventListener('resize', () => this.checkWidth())
    document.removeEventListener('copy', e => e.preventDefault())
  },
}
</script>

<style scoped>
h1, h2, h3, p, a, ul, li { margin: 0; }
#base {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: left;
}
#head {
  width: 100%;
  display: flex;
  justify-content: center;
}
#avatar-outer { position: relative; }
#avatar {
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  margin-right: 10px;
  border: 1px solid var(--off-white-main);
  background-color: var(--off-white-main);
  overflow: hidden;
  border-radius: 0 50% 50% 50%;
  box-sizing: border-box;
}
#avatar img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}
.new-icon {
  position: absolute;
  top: 0;
  left: 0;
  color: var(--theme-color-main);
  background-color: rgba(255,255,255,0.75);
  border-radius: 0 0 5px 0;
  font-size: 3rem;
}
#user-name-age {
  width: 200px;
  margin-bottom: 15px;
}
#user-name-age h2 {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.8rem;
}
#user-name-age h2 span {
  opacity: 0.2;
  font-size: 1.4rem;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}
#user-name-age, #user-lang {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
#foot {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
#foot>button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
#foot>button:hover {
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
}
#foot>button>span {
  margin-right: 10px;
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