<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="!loading && !lesson.hasOwnProperty('_id')">
      <h2>Whoops! Something went wrong!</h2>
    </template>
    <template v-else>
      <div id="lesson-view">
        <header>
          <h2 class="title">{{ lesson.title }}</h2>
        </header>
        <WidgetsRenderer
          :canEdit="false"
          :lesson="lesson"
          :widgets="lesson.widgets"
        />
      </div>
    </template>
  </div>
</template>

<script>

import { getSingleLesson } from '@/api/lessonsApi.js'
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import WidgetsRenderer from '@/components/lessons/widgets/WidgetsRenderer.vue'

export default {
  name: "LessonPage",
  components: {
    TheLoadSpinner,
    WidgetsRenderer
  },
  data() {
    return {
      loading: true,
      lesson: {}
    }
  },
  methods: {
    async fetchLesson() {
      const response = await getSingleLesson(this.$route.params.id)
      if (response.status === 'success') {
        this.lesson = response.data
      }
      this.loading = false
    }
  },
  created() {
    this.fetchLesson()
  }
}
</script>

<style scoped>
  .container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 75%;
    font-size: 1.8rem;
  }
  #lesson-view {
    min-height: calc(100vh - 20px);
    padding: 10px;
    background-color: var(--bg-color-main);
    text-align: left;
    transition: all 0.15s ease-in;
  }
  @media (min-width: 968px) {
    h2.title, header div {
      margin-left: 10%;
    }
    #lesson-view {
      width: 60%;
      border-left: 2px solid var(--theme-color-main);
      border-right: 2px solid var(--theme-color-main);
    }
  }
  @media (min-width: 1800px) {
    #lesson-view {
      width: 45%;
    }
  }
</style>