<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="error">
      Whoops! Something went wrong!
    </template>
    <template v-else>
      <div id="lesson-view">
        <header>
          <h2 v-if="!editingTitle" class="title">{{ title }}</h2>
          <div v-else class="my-25">
            <label class="title" for="title">Lesson title</label>
            <input id="title" type="text" v-model="title">
            <button @click="saveLesson"><i class="fas fa-save"></i></button>
          </div>
          <button @click="editTitle" v-if="editing"><i class="fas fa-pencil-alt"></i></button>
        </header>
        <WidgetsRenderer
          :canEdit="true"
          :onEditing="onEditing"
          :lesson="lesson"
          :widgets="lesson.widgets"
          :addWidgetToLesson="addWidgetToLesson"
          :editWidgetContent="editWidgetContent"
          :onStatusChange="handleStatusChange"
          :onTypeChange="handleTypeChange"
        />
      </div>
    </template>
  </div>
</template>

<script>

import { getSingleLesson, updateLesson, addWidget, editWidget } from '@/api/lessonsApi.js'
import { mapGetters } from 'vuex'
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
      editing: false,
      editingTitle: false,
      lesson: {},
      title: "",
      status: "",
      type: ""
    }
  },
  methods: {
    ...mapGetters(["currentUser", "hasRole"]),
    async fetchLesson() {
      const id = this.$route.params.id
      const response = await getSingleLesson(id)
      if (this.checkLessonOwner(response.data.teacher)) {
        this.lesson = response.data
        this.title = response.data.title
        this.status = response.data.status
      } else {
        this.$router.push('/lessons')
      }
      this.loading = false
    },
    checkLessonOwner(teacher) {
      const teacherIdentifer = `${teacher.name}.${teacher.identifier}`
      return ['admin', 'owner'].includes(this.hasRole()) && teacherIdentifer === this.currentUser()
    },
    async addWidgetToLesson(type) {
      if (this.loading) return
      this.loading = true
      const id = this.$route.params.id
      await addWidget(id, type)
      this.fetchLesson()
    },
    async editWidgetContent(widget_id, payload, onLoadEnd) {
      if (this.busy) return
      this.busy = true
      await editWidget(widget_id, payload)
      await this.fetchLesson()
      onLoadEnd()
      this.busy = false
    },
    onEditing() {
      this.editing = !this.editing
    },
    editTitle() {
      this.editingTitle = !this.editingTitle
    },
    handleStatusChange(updated_status) {
      this.status = updated_status
      this.saveLesson()
    },
    handleTypeChange(updated_type) {
      this.type = updated_type
      this.saveLesson()
    },
    async saveLesson() {
      if (this.loading) return
      this.loading = true
      this.editingTitle = false

      const payload = { widgets: this.lesson.widgets, title: this.title, status: this.status, type: this.type }

      await updateLesson(this.lesson._id, payload)
      await this.fetchLesson()
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
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
}
header div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

header button {
  cursor: pointer;
  min-height: 30px;
  max-height: 30px;
  min-width: 30px;
  max-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--theme-color-main);
  background-color: var(--theme-color-main);
  border-radius: 5px;
}
header>button {
  margin-right: 150px;
  opacity: 0.3;
  color: var(--yellow);
}
header div button {
  color: var(--off-white-main);
}
header>button:hover {
  color: var(--yellow);
  opacity: 1;
}
h2.title {
  margin-left: 10px;
  margin-bottom: 30px;
}
.my-25 {
  margin-top: 25px;
  margin-bottom: 25px;
}
header input, header label {
  font-size: 1.8rem;
  padding: 5px;
}
header label {
  font-size: 2.4rem;
}
header input {
  border-radius: 5px;
  border: 2px solid var(--theme-color-main);
}
header input:active,
header input:focus {
  outline: 1px solid var(--theme-color-secondary);
}

@media (min-width: 968px) {
  h2.title, header div {
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