<template>
  <template v-if="stories?.length">
    <StoryFilterBar />
    <div id="story-deck">
      <StoryCard v-for="story in stories" :key="story._id" :userId="story.userId" :story="story" />
    </div>
  </template>
  <template v-else>
    <p>oop</p>
  </template>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StoryCard from '../components/stories/StoryCard'
  import StoryFilterBar from '../components/stories/StoryFilterBar'
  export default {
    components: {
      StoryCard,
      StoryFilterBar,
    },
    computed: {
      ...mapGetters({
        stories: 'stories',
      }),
    },
    methods: {
      getStories() {
        this.$store.dispatch('getStories')
      }
    },
    mounted() {
      this.getStories()
    }
  }
</script>

<style scoped>
  div {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 1.6rem;
  }
  #story-deck {
    display: 'flex';
    flex-direction: column;
    margin: 2rem 0;
    gap: 2rem;
  }
</style>