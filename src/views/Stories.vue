<template>
  <template v-if="stories?.length">
    <StoryFilterBar />
    <div id="story-deck">
      <StoryCard v-for="story in stories" :key="story._id" :userId="story.userId" :story="story" @openModal="openModal" />
    </div>
  </template>
  
  <template v-else>
    <div id="loading">
      <TheLoadSpinner />
    </div>
  </template>

  <template v-if="showModal">
    <BaseModal @closeModal="closeModal">
      <StoryModal :story="modalData" />
    </BaseModal>
  </template>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BaseModal from '../components/BaseModal'
  import StoryCard from '../components/stories/StoryCard'
  import StoryFilterBar from '../components/stories/StoryFilterBar'
  import StoryModal from '../components/stories/StoryModal'
  import TheLoadSpinner from '../components/TheLoadSpinner'
  export default {
    components: {
      BaseModal,
      StoryCard,
      StoryFilterBar,
      StoryModal,
      TheLoadSpinner
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
  #loading {
    display: flex;
    justify-content: center;
  }
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