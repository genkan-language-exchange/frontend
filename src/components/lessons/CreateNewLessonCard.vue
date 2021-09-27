<template>
  <div
    class="lesson-card"
    :class="loading && 'loading'"
    @click="createNewLesson()"
  >
    <h2 class="title">Create new lesson</h2>
    <i class="fas fa-plus-circle no-select"></i>
  </div>
</template>

<script>
export default {
  name: "CreateNewLessonCard",
  props: ["loading", "createNewLesson"]
}
</script>

<style scoped>
.lesson-card {
  background-color: var(--theme-color-main);
  width: 250px;
  height: 125px;
  margin: 0 auto 25px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.lesson-card:hover {
  background-color: var(--theme-color-secondary);
}
.loading {
  background-color: var(--gray);
  color: #bbb;
  cursor: wait;
}
.loading:hover {
  background-color: var(--gray);
  color: #bbb;
}
h2.title {
  margin: 0;
}
i {
  margin-top: 15px;
  font-size: 4rem;
}
</style>