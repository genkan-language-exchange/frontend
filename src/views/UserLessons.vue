<template>
  <div class="container">
    <div>
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
        <LessonCardsListView v-if="languagesKnow.length" :languages="languagesKnow" :mini="false" :handleLessonNavigation="handleCreateLessonNavigation" >
          Create a lesson
        </LessonCardsListView>
        <div class="spacer"></div>
        <LessonCardsListView :languages="languagesOther" :mini="true" :handleLessonNavigation="handleLessonNavigation" >
          More languages
        </LessonCardsListView>
      </template>
    </div>
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
    },
    mapToList(arr) { // take array of Object<language, level> and return an array of language
      const result = []
      for (const obj of arr) {
        if (obj) result.push(obj.language)
      }
      return result
    }
  },
  computed: {
    languagesKnow() {
      const _languagesKnow = this.getLanguagesKnow()
      if (!_languagesKnow.length) return

      return this.mapToList(_languagesKnow.filter(l => l != null && l.level > 2))
    },
    languagesLearn() {
      const _languagesLearn = this.getLanguagesLearn()
      if (!_languagesLearn.length) return
      return this.mapToList(_languagesLearn)

    },
    languagesOther() {
      const allLanguages = langPopular.concat(langAll).filter(lang => lang.name !== "Undecided")
      let _languages = []

      const _userLanguages = this.getLanguages()
      const _userLangsAsList = this.mapToList(_userLanguages)

      allLanguages.forEach(lang => {
        if (!_userLangsAsList.includes(lang.name)) _languages.push(lang)
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
  margin: 0 auto;
  font-size: 1.8rem;
}
.spacer {
  margin: 65px 0 0;
}
.container>div {
  margin-top: 60px;
}
@media (min-width: 959px) {
  .container {
    width: 60%;
    margin: 0 auto;
    overflow-x: hidden;
  }
  .container>div {
    margin-top: 100px;
  }
}
</style>
