<template>
  <div id="base" v-if="user._id">
    <div id="avatar" :style="newUser && { border: '2px solid var(--green)' }">
      <img
        v-if="true"
        ref="avatar"
        :src="user.gravatar"
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
          <p>{{ file.name }}</p>
          <button type="button" @click.prevent="onFileSubmit">Upload</button>
        </template>
      </form>
    </div>
    
    <section>
      <div id="user-name-age">
        <h2>{{ user.name }} <span v-if="isSelf">#{{ user.identifier }}</span></h2>
        <p>{{ user.matchSettings.age }} years old</p>
      </div>
      <div id="user-lang">
        <div>
          <h4>Speaks</h4>
          <LanguageLevel :language="user.matchSettings.languageKnow1" :level="user.matchSettings.languageKnow1Level" />
          <LanguageLevel v-if="user.matchSettings.languageKnow2" :language="user.matchSettings.languageKnow2" :level="user.matchSettings.languageKnow2Level" />
          <LanguageLevel v-if="user.matchSettings.languageKnow3" :language="user.matchSettings.languageKnow3" :level="user.matchSettings.languageKnow3Level" />
        </div>
        <div>
          <h4>Learns</h4>
          <LanguageLevel :language="user.matchSettings.languageLearn1" :level="user.matchSettings.languageLearn1Level" />
          <LanguageLevel v-if="user.matchSettings.languageLearn2" :language="user.matchSettings.languageLearn2" :level="user.matchSettings.languageLearn2Level" />
          <LanguageLevel v-if="user.matchSettings.languageLearn3" :language="user.matchSettings.languageLearn3" :level="user.matchSettings.languageLearn3Level" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

import checkAccountAge from '@/util/checkAccountAge.js'
import LanguageLevel from './LanguageLevel'


export default {
  components: {
    LanguageLevel,
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
  color: #555;
  font-size: 1.4rem;
}
#base {
  width: 100%;
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  padding: 20px 0 30px;
}
#avatar {
  display: flex;
  align-items: center;
  min-width: 200px;
  max-width: 200px;
  min-height: 200px;
  max-height: 200px;
  margin-right: 20px;
  border: 2px solid var(--off-white-main);
  background-color: var(--off-white-main);
  overflow: hidden;
  border-radius: 15px;
  box-sizing: border-box;
  margin-right: 40px;
}
#avatar img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
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
  font-size: 1.8rem;
}
#user-name-age {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
}
#user-lang {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
form p {
  color: var(--bg-color-main);
}

</style>