<template>
  <div
    class="lesson-card"
    @click="navigateToLessonCreation('new')"
  >
    <h2 class="title">Create new lesson</h2>
    <i class="fas fa-plus-circle no-select"></i>
  </div>
</template>

<script>
export default {
  name: "CreateNewLessonCard",
  props: ["navigateToLessonCreation"]
}
</script>

<style scoped>
.lesson-card {
  background-color: var(--theme-color-main);
  width: 250px;
  height: 125px;
  margin: 82px auto 25px;
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
h2.title {
  margin: 0;
}
i {
  margin-top: 15px;
  font-size: 4rem;
}
</style>