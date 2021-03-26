<template>
  <div id="base" v-if="user._id">
    <template v-if="!user.avatar">
      <div id="avatar" :style="newUser ? { border: '2px solid #8c7ae6' } : { border: '2px solid white' }">
        <img ref="avatar" src='@/assets/avatar1.png' alt="User" draggable="false">
      </div>
    </template>
    <section id="head">
      <div id="user-name-age">
        <p v-if="newUser" class="material-icons new-icon">fiber_new</p>
        <h2>{{user.name}} <span>#{{user.identifier}}</span></h2>
        <p>{{user.matchSettings.age}} years old</p>
      </div>
      <div id="user-lang">
        <p><span>Speaks: </span>{{user.matchSettings.languageKnow.join(', ')}}</p>
        <p><span>Learns: </span>{{user.matchSettings.languageLearn.join(', ')}}</p>
      </div>
    </section>

    <section id="about">
      <div>
        <h3>About:</h3><p>{{user.profile.about}}</p>
      </div>
      <div>
        <h3>Language Goal:</h3><p>{{user.profile.languageGoal}}</p>
      </div>
      <div>
        <h3>Interests:</h3><p>{{user.profile.interests.join(', ')}}</p>
      </div>
    </section>

    <section id="filters" v-if="isSelf">
      <div>
        <h3>My Privacy Filters:</h3>
        <p>These settings change who can find you and who you can find</p>
      </div>

      <div class="filter">
        <h4>Age Range</h4>
        <p>{{user.filterSettings.ages.join(' - ')}}</p>
      </div>

      <div class="filter">
        <h4>I want to meet</h4>
        <p id="genders" v-if="user.filterSettings.genders.length > 2">everyone</p>
        <p id="genders" v-else>{{user.filterSettings.genders.join(', ')}}</p>
        <span>from</span>
        <p v-if="user.filterSettings.length > 0">
          {{user.filterSettings.resides.join(', ')}}
        </p>
        <p>everywhere</p>
      </div>

      <div class="filter">
        <h4>My ideal friend speaks</h4>
        <p v-if="user.filterSettings.languagesKnow?.length">{{user.filterSettings.languagesKnow.join(', ')}}</p>
        <p v-else>any language</p>
        <h4>and studies</h4>
        <p v-if="user.filterSettings.languagesSpeak?.length">{{user.filterSettings.languagesSpeak.join(', ')}}</p>
        <p v-else>any language</p>
      </div>

      <div class="filter">
        <h4>Show my age</h4>
        <p v-if="user.filterSettings.showOwnAge">Yes</p>
        <p v-else>No</p>
      </div>

      <div class="filter">
        <h4>Show my online status</h4>
        <p v-if="user.filterSettings.showOnlineStatus">Yes</p>
        <p v-else>No</p>
      </div>
      
      <div class="filter">
        <h4>Show my profile picture before matching</h4>
        <p v-if="user.filterSettings.blurBeforeMatch">Yes</p>
        <p v-else>No</p>
      </div>
    </section>
    
    <section v-if="isSelf" id="blocked">
      <h3>Manage Blocked Users</h3>
    </section>
    
    <footer>
      <section v-if="isSelf" id="foot">
        <button type="button" @click.prevent="logMeOut"><span><i class="fas fa-sign-out-alt"></i></span>Sign out</button>
      </section>
    </footer>
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
    window.addEventListener('resize', this.checkWidth)
    // prevent avatars from being saved by others
    document.addEventListener('copy', e => e.preventDefault())
    this.$refs.avatar.addEventListener('contextmenu', e => e.preventDefault())
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWidth)
    document.removeEventListener('copy', e => e.preventDefault())
  },
}
</script>

<style scoped>
h1, h2, h3, h4, p, a, ul, li { margin: 0; }
h2, h3, h4, #user-lang span { color: var(--theme-color-main); }
h2 span {
  color: gray;
  font-size: 1.4rem;
}
#base {
  width: 100%;
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  text-align: left;
}
#avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto 25px;
  border: 2px solid var(--theme-color-main);
  background-color: var(--off-white-main);
  overflow: hidden;
  border-radius: 5px;
  box-sizing: border-box;
}
#avatar img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
#head, #about, #filters, #blocked {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid var(--theme-color-main);
}
.new-icon {
  color: var(--theme-color-main);
  font-size: 5rem;
  display: flex;
  align-items: center;
  padding: 0;
  margin: -40px 0 0;
  text-align: center;
}
#user-name-age {
  margin-bottom: 15px;
}
#user-name-age h2 {
  /* overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  font-size: 1.8rem;
}
#user-name-age, #user-lang {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
#about, #filters {
  gap: 30px;
}
#blocked h3 {
  color: var(--off-white-main);
}
.filter p {
  text-decoration: underline;
  cursor: pointer;
}
.filter p:hover {
  color: var(--theme-color-main);
}
#genders {
  text-transform: capitalize;
}
#foot {
  float: right;
}
#foot button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  color: var(--theme-color-main);
  background-color: var(--off-white-main);
  cursor: pointer;
  transition: all 0.3s ease-in;
}
#foot button:hover {
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
}
#foot button span {
  margin-right: 10px;
}
footer {
  position: fixed;
  bottom: 0;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--bg-color-secondary);
  border-top: 2px solid var(--theme-color-main);
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
@media (min-width: 959px) {
  #avatar {
    width: 300px;
  }
  section {
    max-width: 40%;
  }
}
</style>