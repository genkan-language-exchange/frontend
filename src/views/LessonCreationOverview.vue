<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="error">
      Whoops!
    </template>
    <template v-else>
      <h3 class="error" v-if="error_draftExists">You may only have one draft in progress at a time!</h3>
      <CreateNewLessonCard :loading="loading" :createNewLesson="createNewLesson" />
      <h2 class="title">Your created lessons</h2>
      <LessonCardDeck
        :createdLessons="createdLessons"
        :navigateToLessonCreation="navigateToLessonCreation"
      />
    </template>
  </div>
</template>

<script>

import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import LessonCardDeck from '@/components/lessons/LessonCardDeck.vue'
import CreateNewLessonCard from '@/components/lessons/CreateNewLessonCard.vue'

import { getMyLessons, createLesson } from '@/api/lessonsApi.js'

export default {
  name: "LessonCreationOverview",
  components: {
    TheLoadSpinner,
    LessonCardDeck,
    CreateNewLessonCard
  },
  data() {
    return {
      loading: true,
      error: false,
      error_draftExists: false,
      createdLessons: [],
    }
  },
  methods: {
    async fetchLessons() {
      this.loading = true
      const language = this.$route.params.language
      const response = await getMyLessons(language)
      this.createdLessons = response.data
      this.loading = false
    },
    async createNewLesson() {
      if (this.loading) return
      this.loading = true
      const language = this.$route.params.language
      const response = await createLesson(language)
      if (response.success) {
        this.fetchLessons()
      } else {
        if (response.message === "DRAFT_EXISTS") {
          this.error_draftExists = true
        }
        this.loading = false
      }
    },
    navigateToLessonCreation(id) {
      this.$router.push({ name: 'LessonCreator', params: { id } })
    }
  },
  mounted() {
    this.fetchLessons()
  }
}
</script>

<style scoped>
.container {
  margin-top: 82px;
  font-size: 1.8rem;
}
h2 {
  margin: 20px auto;
  padding: 0;
}
.error {
  color: var(--red);
  margin: 0 auto 20px;
}
button {
  margin-top: 55px;
}
</style>
