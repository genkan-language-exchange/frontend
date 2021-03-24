<template>
  <div>
    <StoryCreationCard />
  </div>
</template>

<script>
  import StoryCreationCard from '../components/stories/StoryCreationCard'
  export default {
    name: "StoryCreation",
    components: {
      StoryCreationCard
    }
  }
</script>

<style scoped>
  div {
    height: 85vh;
  }
</style>