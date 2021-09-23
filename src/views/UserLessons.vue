<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="error">
      <div>
        Whoops! Something went wrong.
      </div>
    </template>
    <template v-else>
      <LessonCardsListView :languages="languagesLearn" :mini="false" :handleLessonNavigation="handleLessonNavigation" >
        Languages you study
      </LessonCardsListView>
      <div class="spacer"></div>
      <LessonCardsListView :languages="languagesKnow" :mini="false" :handleLessonNavigation="handleCreateLessonNavigation" >
        Create a lesson
      </LessonCardsListView>
      <div class="spacer"></div>
      <LessonCardsListView :languages="languagesOther" :mini="true" :handleLessonNavigation="handleLessonNavigation" >
        More languages
      </LessonCardsListView>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { langPopular, langAll } from '@/data/languages'

import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import LessonCardsListView from '@/components/lessons/LessonCardsListView.vue'

export default {
  name: "UserLessons",
  components: {
    TheLoadSpinner,
    LessonCardsListView,
  },
  data() {
    return {
      loading: true,
      error: false,
    }
  },
  methods: {
    ...mapActions(["getOwnUserInfo"]),
    ...mapGetters(["getLanguagesKnow", "getLanguagesLearn", "getLanguages"]),
    handleLessonNavigation(language) {
      this.$router.push({ name: 'LessonsOverview', params: { language: language.split(" ").join("_").toLowerCase() } })
    },
    handleCreateLessonNavigation(language) {
      this.$router.push({ name: 'LessonCreationOverview', params: { language: language.split(" ").join("_").toLowerCase() } })
    }
  },
  computed: {
    languagesKnow() {
      return this.getLanguagesKnow().filter(lang => lang[1] > 0).map(lang => lang[0])
    },
    languagesLearn() {
      return this.getLanguagesLearn().map(lang => lang[0])
    },
    languagesOther() {
      const allLanguages = langPopular.concat(langAll).filter(lang => lang.name !== "Undecided")
      let _languages = []

      allLanguages.forEach(lang => {
        if (!this.getLanguages().map(lang => lang[0]).includes(lang.name)) _languages.push(lang)
      })

      _languages = _languages.sort((a, b) => a.name > b.name)

      return _languages
    }
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
.container {
  margin: 62px 0 0;
  font-size: 1.8rem;
}
.spacer {
  margin: 65px 0 0;
}
@media (min-width: 959px) {
  .container {
    width: 60%;
    margin: 102px auto 0;
    overflow-x: hidden;
  }
}
</style>
