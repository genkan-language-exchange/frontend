<template>
  <transition-group mode="out-in" name="stories-page">
    <template v-if="stories?.length">
      <StoryFilterBar />
      <div id="story-deck">
        <StoryCard v-for="story in stories" :key="story._id" :userId="story.userId" :story="story" @openModal="openModal" @openReportModal="openReportModal" />
      </div>
    </template>

    <template v-else>
      <div id="loading">
        <TheLoadSpinner />
      </div>
    </template>
  </transition-group>
  
  <transition name="storymodal" mode="out-in">
    <StoryModal @closeModal="closeModal" @report="switchModal" :story="modalData" v-if="showModal"/>
  </transition>
  <transition name="reportmodal" mode="out-in">
    <ReportModal @closeModal="closeReportModal" @cancelReport="cancelReport" :reporting="modalData" v-if="showReportModal"/>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ReportModal from '../components/ReportModal'
  import StoryCard from '../components/stories/StoryCard'
  import StoryFilterBar from '../components/stories/StoryFilterBar'
  import StoryModal from '../components/stories/StoryModal'
  import TheLoadSpinner from '../components/TheLoadSpinner'
  export default {
    components: {
      ReportModal,
      StoryCard,
      StoryFilterBar,
      StoryModal,
      TheLoadSpinner
    },
    data() {
      return {
        composing: false,
        showModal: false,
        showReportModal: false,
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
      },
      openReportModal(storyId) {
        this.modalData = this.stories.find(x => x._id === storyId)
        this.showReportModal = true
      },
      closeReportModal() {
        this.showReportModal = false
      },
      cancelReport() {
        this.showModal = true
        this.showReportModal = false
      },
      switchModal() {
        this.showModal = false
        this.showReportModal = true
      }
    },
    mounted() {
      this.getStories()
    },
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
  
.storymodal-enter-from,
.reportmodal-enter-from {
  opacity: 0;
}
.storymodal-enter-to,
.reportmodal-enter-to {
  opacity: 1;
}
.storymodal-enter-active,
.reportmodal-enter-active {
  transition: all 0.3s ease-out;
  z-index: 110;
}

.storymodal-leave-from,
.reportmodal-leave-from {
  opacity: 1;
}
.storymodal-leave-to,
.reportmodal-leave-to {
  opacity: 0;
}
.storymodal-leave-active,
.reportmodal-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
  width: 100%;
  z-index: 110;
}
</style>