<template>
  <div id="base" v-if="user._id">
    <template v-if="!user.avatar">
      <div id="avatar" :style="newUser ? { border: '2px solid #8c7ae6' } : { border: '2px solid white' }">
        <img
          v-if="true"
          ref="avatar"
          src='@/assets/avatar1.png'
          alt="User"
          draggable="false"
        >
        <form v-else>
          <input
            type="file"
            style="display: none"
            name="userAvatar"
            @change="onFileSelected"
            ref="fileInput"
          >
          <button type="button" @click.prevent="$refs.fileInput.click()">Pick File</button>
          <template v-if="file">
            <p>{{file.name}}</p>
            <button type="button" @click.prevent="onFileSubmit">Upload</button>
          </template>
        </form>
      </div>
    </template>
    <section id="head">
      <div id="user-name-age">
        <h2>{{user.name}} <span v-if="isSelf">#{{user.identifier}}</span></h2>
        <p>{{user.matchSettings.age}} years old</p>
      </div>
      <div id="user-lang">
        <p><span>Speaks: </span>{{user.matchSettings.languageKnow.join(', ')}}</p>
        <p><span>Learns: </span>{{user.matchSettings.languageLearn.join(', ')}}</p>
      </div>
    </section>
    <!-- TODO: add stories list view tab -->
    
    <section id="toggle-view">
      <div @click="() => viewingProfile = true" class="tab-profile" :class="viewingProfile && 'active'">
        <p>Profile</p>
      </div>
      <div @click="() => viewingProfile = false"  class="tab-moments" :class="!viewingProfile && 'active'">
        <p>Stories</p>
      </div>
    </section>
    
    <transition-group name="fade-in" mode="out-in">
      <template v-if="viewingProfile">
        <TheAboutSection
          :about="user.profile.about"
          :languageGoal="user.profile.languageGoal"
          :interests="user.profile.interests"
          key="about"
        />

        <TheFilters
          v-if="isSelf"
          :filterSettings="user.filterSettings"
          :role="user.role"
          key="filters"
        />
      </template>
      <template v-else>
        <TheUserStories :user="user" />
      </template>
    </transition-group>


    <!-- <section v-if="isSelf" id="blocked">
      <h3>Manage Blocked Users</h3>
    </section> -->
    
    <TheFooter :isSelf="isSelf" @logMeOut="logMeOut" />
  </div>
</template>

<script>
import axios from 'axios'

import { mapActions, mapGetters } from 'vuex'
import checkAccountAge from '@/util/checkAccountAge.js'

import TheAboutSection from './TheAboutSection'
import TheUserStories from './UserStories/TheUserStories'
import TheFilters from './TheFilters'
import TheFooter from './TheFooter'
export default {
  components: {
    TheAboutSection,
    TheUserStories,
    TheFilters,
    TheFooter,
  },
  props: {
    user: Object
  },
  data() {
    return {
      viewingProfile: true,
      changeAvatar: false,
      file: null,
    }
  },
  methods: {
    ...mapGetters(['currentUser', 'token']),
    ...mapActions(['logout']),
    logMeOut() {
      this.logout()
      this.$router.replace('/login')
    },
    setChangeAvatar(val) {
      this.changeAvatar = val
    },
    onFileSelected(event) {
      console.log(event.target.files[0])
      this.file = event.target.files[0]
    },
    onFileSubmit() {
      console.log(this.token())
      if (this.file.type.slice(0,5) !== "image") return
      const config = {
        headers: { authorization: `Bearer ${this.token()}` }
      }

      const fd = new FormData()
      fd.append('image', this.file, this.file.name)
      axios.post(`${process.env.VUE_APP_API_URL}/api/v1/users/setAvatar`, fd, config)
        
      //   onUploadProgress: (uploadEvent) => {
      //       console.log('progress:')
      //       console.log(Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
      //     }
      // })
      .then(req => {
        this.file = null
        console.log(req)
      })
      .catch(err => console.error(err))
    }
  },
  computed: {
    isSelf() {
      return this.currentUser() === `${this.user.name}.${this.user.identifier}`
    },
    newUser() {
      return checkAccountAge(this.user.matchSettings.accountCreated)
    },
  },
  mounted() {
    // window.addEventListener('resize', this.checkWidth)
    // prevent avatars from being saved by others
    // document.addEventListener('copy', e => e.preventDefault())
    this.$refs.avatar.addEventListener('contextmenu', e => e.preventDefault())
  },
  // beforeUnmount() {
  //   window.removeEventListener('resize', this.checkWidth)
  //   document.removeEventListener('copy', e => e.preventDefault())
  // },
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
  max-width: 400px;
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
#head, #about, #blocked, #toggle-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid var(--theme-color-main);
}
#head {
  border: none;
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
#about {
  gap: 30px;
}
#blocked h3 {
  color: var(--off-white-main);
}
#genders {
  text-transform: capitalize;
}
#toggle-view {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0;
  overflow: hidden;
}
#toggle-view>div {
  width: 50%;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  color: var(--off-white-main);
  background-color: var(--bg-color-main);
  border: none;
  outline: none;
  width: 100%;
  cursor: pointer;
}
#toggle-view>div:hover {
  background-color: var(--theme-color-secondary);
}
#toggle-view .active {
  background-color: var(--theme-color-main);
}
form p {
  color: var(--bg-color-main);
}

@media (min-width: 959px) {
  #avatar {
    width: 300px;
  }
  section {
    max-width: 60%;
  }
  #toggle-view {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
}
</style>