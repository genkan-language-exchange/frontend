<template>
  <StoryDrafts />
  <StoryCreationCard />

</template>

<script>
  import StoryDrafts from '@/components/createStories/StoryDrafts'
  import StoryCreationCard from '@/components/createStories/StoryCreationCard'
  export default {
    name: "StoryCreation",
    components: {
      StoryCreationCard,
      StoryDrafts
    }
  }
</script>

<style scoped>

</style>