<template>
  <div id="container">
    <StoryDrafts :savedDrafts="savedDrafts" @fillData="fillData" />
    <StoryCreationCard :draft="draft" @savedForLater="savedForLater" />
  </div>

</template>

<script>
  import StoryDrafts from '@/components/createStories/StoryDrafts'
  import StoryCreationCard from '@/components/createStories/StoryCreationCard'
  export default {
    name: "StoryCreation",
    components: {
      StoryCreationCard,
      StoryDrafts
    },
    data() {
      return {
        draft: {},
        savedDrafts: []
      }
    },
    methods: {
      fillData(draft) {
        this.draft = draft
      },
      savedForLater(draft) {
        this.savedDrafts.push(draft)
      }
    }
  }
</script>

<style scoped>
#container {
  margin-top: 105px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
}
@media (min-width: 959px) {
  #container {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>