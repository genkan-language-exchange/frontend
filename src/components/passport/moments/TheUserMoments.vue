<template>
  <section id="story-deck" v-if="stories.length">
    <transition-group name="fade-in">
      <StoryCard
        v-for="story in stories"
        :key="story._id"
        :userId="story.userId"
        :story="story"
        @openModal="openModal"
        @openReportModal="openReportModal"
        @deleteStory="deleteStory"
      />
    </transition-group>
  </section>
</template>

<script>
  import StoryCard from '../../stories/StoryCard'
  export default {
    components: {
      StoryCard
    },
    props: ["user"],
    data() {
      return {
        stories: [],
      }
    },
    methods: {
      async getUserStories() {
        const token = this.$store.getters.token
        await fetch(`${process.env.VUE_APP_API_URL}/api/v1/stories/user-stories`, {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ _id: this.user._id })
        })
        .then(res => res.json())
        .then(res => {
          return this.stories = res.data
        })
        .catch(err => console.error(err))
      },
      openModal() {},
      openReportModal() {},
      deleteStory() {},
    },
    mounted() {
      this.getUserStories()
    }
  }
</script>

<style scoped>
#story-deck {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto 40px;
  box-sizing: border-box;
  width: 100%;
}
</style>