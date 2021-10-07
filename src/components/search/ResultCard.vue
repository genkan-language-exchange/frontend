<template>
  <div
    class="card"
    @click.prevent="() => goToPassport(user.name, user.identifier)"
  >
    <div class="head">
      <div class="status"
        :style="user.role === 'vip' ? 'border-color: var(--vip-gold);' : (
          newUser ? 'border-color: var(--theme-color-main);' : ''
        )"
        :class="onlineRecently ? 'online' : 'offline'"
      ></div>
      <div
        class="avatar no-select"
        :style="user.role === 'vip' ? 'border-color: var(--vip-gold);' : (
          newUser ? 'border-color: var(--theme-color-main);' : ''
        )"
      >
        <template v-if="user.gravatar">
          <img :src="user.gravatar" class="no-select" draggable="false" />
        </template>
        <template v-else>
          {{ user.name[0].toUpperCase() }}
        </template>
      </div>
    </div>

    <div class="info">
      <div>
        <h3>
          <span v-if="newUser" class="material-icons no-select">fiber_new</span>
          {{ user.name }}
        </h3>
      </div>
      <div>
        <div>
          <p>Speaks:</p>
          <LanguageLevel :language="user.matchSettings.languageKnow1" :level="user.matchSettings.languageKnow1Level" />
          <LanguageLevel v-if="user.matchSettings.languageKnow2" :language="user.matchSettings.languageKnow2" :level="user.matchSettings.languageKnow2Level" />
          <LanguageLevel v-if="user.matchSettings.languageKnow3" :language="user.matchSettings.languageKnow3" :level="user.matchSettings.languageKnow3Level" />
        </div>

        <div>
          <p>Learns:</p>
          <LanguageLevel :language="user.matchSettings.languageLearn1" :level="user.matchSettings.languageLearn1Level" />
          <LanguageLevel v-if="user.matchSettings.languageLearn2" :language="user.matchSettings.languageLearn2" :level="user.matchSettings.languageLearn2Level" />
          <LanguageLevel v-if="user.matchSettings.languageLearn3" :language="user.matchSettings.languageLearn3" :level="user.matchSettings.languageLearn3Level" />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import checkAccountAge from '@/util/checkAccountAge.js'
import checkLastOnline from '@/util/checkLastOnline.js'
import LanguageLevel from '@/components/passport/LanguageLevel'
export default {
  components: {
    LanguageLevel
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToPassport(name, identifier) {
      this.$router.push({ name: 'Passport', params: { id: `${name}.${identifier}` } })
    }
  },
  computed: {    
    newUser() {
      return checkAccountAge(this.user.matchSettings.accountCreated)
    },
    onlineRecently() {
      return checkLastOnline(this.user.matchSettings.lastSeen)
    }
  },
}
</script>

<style scoped>
.card {
  height: 150px;
  width: 90%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  margin: 35px auto;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.card:hover {
  background-color: var(--bg-color-secondary);
}
.head {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.status {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 3px;
  left: 3px;
  border-radius: 50%;
  border: 3px solid var(--bg-color-main);
}
.online {
  background-color: chartreuse;
}
.offline {
  background-color: var(--bg-color-secondary);
}
.avatar {
  width: 75px;
  height: 75px;
  background-color: var(--bg-color-secondary);
  border-radius: 50%;
  font-size: 3rem;
  display: flex;
  line-height: 1;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--bg-color-main);
  overflow: hidden;
}
h3 {
  font-size: 1.6rem;
  font-weight: 600;
}
h3 span {
  font-size: 1.8rem;
  color: var(--theme-color-main);
  vertical-align: middle;
}
.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.info p {
  font-size: 1.4rem;
  text-align: left;
  margin: 10px 4px 5px 0;
  padding: 0;
}
.info>div>div {
  display: flex;
}
/* font-feature-settings: 'tnum'; */
/* font-variant-numeric: 'tabular-nums'; */
@media (min-width: 959px) {
  .card {
    width: 50%;
  }
}
</style>