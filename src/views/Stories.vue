<template>
  <template v-if="stories?.length">
    <StoryFilterBar />
    <div id="story-deck">
      <StoryCard v-for="story in stories" :key="story._id" :userId="story.userId" :story="story" @openModal="openModal" />
    </div>
  </template>
  
  <template v-else>
    <p>oop</p>
  </template>

  <template v-if="showModal">
    <teleport to="#app">
      <StoryModal @closeModal="closeModal" :story="modalData" />
    </teleport>
  </template>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StoryCard from '../components/stories/StoryCard'
  import StoryFilterBar from '../components/stories/StoryFilterBar'
  import StoryModal from '../components/stories/StoryModal'
  export default {
    components: {
      StoryCard,
      StoryFilterBar,
      StoryModal,
    },
    data() {
      return {
        showModal: false,
        modalData: null,
      }
    },
    computed: {
      ...mapGetters({
        stories: 'stories',
      }),
    },
    methods: {
      getStories() {
        this.$store.dispatch('getStories')
      },
      openModal(storyId) {
        this.modalData = this.stories.find(x => x._id === storyId)
        this.showModal = true
      },
      closeModal() {
        this.modalData = null
        this.showModal = false
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