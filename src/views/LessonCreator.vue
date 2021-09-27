<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="error">
      Whoops!
    </template>
    <template v-else>
      <div id="lesson-view">
        <h2 class="title">{{ lesson?.title }}</h2>
        <WidgetsRenderer
          :canEdit="true"
          :widgets="lesson.widgets"
          :addWidgetToLesson="addWidgetToLesson"
          :editWidgetContent="editWidgetContent"
        />
      </div>
    </template>
  </div>
</template>

<script>

import { getSingleLesson, addWidget, editWidget } from '@/api/lessonsApi.js'

import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import WidgetsRenderer from '@/components/lessons/widgets/WidgetsRenderer.vue'
export default {
  name: "LessonCreator",
  components: {
    TheLoadSpinner,
    WidgetsRenderer
  },
  data() {
    return {
      busy: false,
      error: false,
      loading: true,
      lesson: {}
    }
  },
  methods: {
    async fetchLesson() {
      const id = this.$route.params.id
      const response = await getSingleLesson(id)
      this.lesson = response.data
      this.loading = false
    },
    async addWidgetToLesson(type) {
      if (this.loading) return
      this.loading = true
      const id = this.$route.params.id
      const response = await addWidget(id, type)
      this.fetchLesson()
    },
    async editWidgetContent(widget_id, payload, onLoadEnd) {
      if (this.busy) return
      this.busy = true
      await editWidget(widget_id, payload)
      await this.fetchLesson()
      onLoadEnd()
      this.busy = false
    }
  },
  mounted() {
    this.fetchLesson()
  },
}
</script>

<style scoped>
.container {
  margin-top: 55px;
  font-size: 1.8rem;
}
#lesson-view {
  width: 90%;
  min-height: calc(100vh - 75px);
  margin: 0 auto;
  padding: 10px;
  background-color: var(--bg-color-main);
  text-align: left;
  transition: all 0.15s ease-in;
}
h2.title {
  margin-left: 10px;
  margin-bottom: 30px;
}

@media (min-width: 968px) {
  h2.title {
    margin-left: 10%;
  }
  #lesson-view {
    width: 60%;
    /* border-left: 2px solid var(--theme-color-main);
    border-right: 2px solid var(--theme-color-main); */
  }
}
@media (min-width: 1800px) {
  #lesson-view {
    width: 45%;
  }
}
</style>