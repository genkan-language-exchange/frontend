<template>
  <div class="container">
    
    <section>
      <transition-group name="fade-in" mode="out-in">
        <h2 class="title">Culture</h2>
        <p v-if="!loading">{{ cultureLessons }} lesson{{ cultureLessons === 1 ? '' : 's'}}</p>
      </transition-group>
    </section>

    <section>
      <transition-group name="fade-in" mode="out-in">
        <h2 class="title">Language</h2>
        <p v-if="!loading">{{ languageLessons }} lesson{{ languageLessons === 1 ? '' : 's'}}</p>
      </transition-group>
    </section>

  </div>
</template>

<script>
import { getLessonCount } from '@/api/lessonsApi.js'
export default {
  data() {
    return {
      loading: true,
      cultureLessons: 0,
      languageLessons: 0,
    }
  },
  methods: {
    async fetchLessons() {
      const language = this.$route.params.language
      
      const languageResponse = await getLessonCount(language, 'language')
      const cultureResponse = await getLessonCount(language, 'culture')

      console.log(languageResponse.lesson_count)
      console.log(cultureResponse.lesson_count)

      this.languageLessons = languageResponse.lesson_count
      this.cultureLessons = cultureResponse.lesson_count
      this.loading = false
    },
  },
  created() {
    this.fetchLessons()
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  display: flex;
  padding-top: 55px;
  height: calc(100vh - 55px);
  font-size: 1.8rem;
}
.container section:first-child {
  border-right: 1px solid var(--theme-color-main);
}
.container section:nth-child(2) {
  border-left: 1px solid var(--theme-color-main);
}
section {
  border-top: 2px solid var(--theme-color-main);
  padding-top: 5px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in;
}
section:hover, section:active {
  background-color: var(--theme-color-main);
}
@media (min-width: 959px) {
  h2.title {
    font-size: 4rem;
  }
}
</style>