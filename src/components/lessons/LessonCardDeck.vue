<template>
  <div id="card-deck">
    <div
      class="lesson-card"
      v-for="lesson in createdLessons"
      :key="lesson._id"
      :class="lesson.status === 'draft' && 'draft'"
      @click="navigateToLessonCreation(lesson._id)"
    >
      <h2>{{lesson.title}}</h2>
      <section class="timestamps">
        <p v-if="lesson.createdAt >= lesson.updatedAt">Created {{formattedDate(lesson.createdAt)}}</p>
        <p v-else>Updated {{formattedDate(lesson.updatedAt)}}</p>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ["createdLessons", "navigateToLessonCreation"],
  methods: {
    formattedDate(date) {
      return moment(date).startOf().fromNow()
    },
  }
}
</script>

<style scoped>
#card-deck {
  width: 65%;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
}
.lesson-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--theme-color-main);
  width: 250px;
  min-height: 150px;
  border-radius: 3px;
  cursor: pointer;
}
.lesson-card:hover {
  background-color: var(--theme-color-secondary);
}
.draft {
  border: 1px solid var(--green);
  animation: breathing 2s alternate-reverse infinite;
}
h2 {
  margin: 10px auto 25px;
}
.timestamps p {
  font-size: 1.2rem;
}
</style>