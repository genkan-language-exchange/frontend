<template>
  <form>
    <fieldset>
      <button
        type='button'
        :class="activeFilter === 0 ? 'active' : ''"
        @click="handleClick(0)"
      >
        All
      </button>
      <button
        type='button'
        v-for="l in languagesLearn"
        :key="l.language"
        :value="l.language"
        :class="activeFilter === l.language ? 'active' : ''"
        @click="handleClick(l.language)"
      >
        {{ l.language }}
      </button>
    </fieldset>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SearchBar',
  emits: ['triggerSearch'],
  data() {
    return {
      loading: true,
      partnerType: 'learn'
      // learn = partner should speak one of user's learning languages
      // teach = partner learns one of user's known languages
    }
  },
  methods: {
    ...mapActions(['getOwnUserInfo']),
    ...mapMutations(['setActiveFilter']),
    ...mapGetters(['getLanguagesLearn', 'getLanguagesKnow']),
    handleClick(value) {
      this.setActiveFilter({ value })
      this.$emit("triggerSearch", this.partnerType)
    },
  },
  computed: {
    ...mapGetters(['activeFilter']),
    languagesLearn() {
      const _languagesLearn = this.getLanguagesLearn()
      if (!_languagesLearn.length) return []
      return _languagesLearn.filter(lang => lang != null)
    },
    languagesKnow() {
      const _languagesKnow = this.getLanguagesKnow()
      if (!_languagesKnow.length) return []
      return _languagesKnow.filter(lang => lang != null)
    },
  },
  mounted() {
    this.getOwnUserInfo()
      .then(() => this.loading = false)
      .catch(() => {
        this.loading = false
        this.error = true
      })
  }
}
</script>

<style scoped>
form {
  position: sticky;
  top: 50px;
  margin: 0 auto;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: var(--bg-color-secondary);
  z-index: 50;
}
fieldset {
  border: none;
}
button {
  width: 20%;
  box-sizing: border-box;
  padding: 8px;
  margin: 0 5px;
  border: none;
  color: var(--off-white-main);
  background-color: var(--bg-color-secondary);
  border-radius: 5px;
  outline: none;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
}
button:hover, button:focus {
  background-color: var(--theme-color-main);
  color: var(--off-white-main);
}
.active {
  background-color: var(--theme-color-main);
}
@media (min-width: 959px) {
  form {
    top: 62px;
    width: 60%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>