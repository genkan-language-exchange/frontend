<template>
  
  <template v-if="stories?.length">
    <div id="story-view">
      <StoryFilterBar />
      <section id="story-deck">
        <StoryCard v-for="story in stories" :key="story._id" :userId="story.userId" :story="story" @openModal="openModal" @openReportModal="openReportModal" />
      </section>
      <TheStoryCreationButtom />
    </div>
  </template>

    <template v-else>
      <div id="loading">
        <TheLoadSpinner />
      </div>
    </template>

  <transition name="storymodal" mode="out-in">
    <StoryModal @closeModal="closeModal" @report="switchModal" :story="modalData" :isCommenting="isCommenting" v-if="showModal" />
  </transition>
  <transition name="reportmodal" mode="out-in">
    <ReportModal @closeModal="closeReportModal" @cancelReport="cancelReport" :reporting="modalData" v-if="showReportModal" />
  </transition>
</template>

<script>
  import { getStories } from '../api/storyApi'

  import ReportModal from '../components/ReportModal'
  import StoryCard from '../components/stories/StoryCard'
  import StoryFilterBar from '../components/stories/StoryFilterBar'
  import StoryModal from '../components/stories/StoryModal'
  import TheStoryCreationButtom from '../components/stories/TheStoryCreationButton'
  import TheLoadSpinner from '../components/TheLoadSpinner'

  export default {
    components: {
      ReportModal,
      StoryCard,
      StoryFilterBar,
      StoryModal,
      TheStoryCreationButtom,
      TheLoadSpinner
    },
    data() {
      return {
        composing: false,
        showModal: false,
        showReportModal: false,
        modalData: null,
        isCommenting: false,
        stories: [],
      }
    },
    methods: {
      async getStories() {
        const response = await getStories()
        .then(res => res.data)
        .catch(err => err)
        this.stories = response
      },
      openModal(storyId, isCommenting) {
        this.modalData = this.stories.find(x => x._id === storyId)
        this.showModal = true

        if (isCommenting) this.isCommenting = true
        this.$nextTick(() => {
          this.isCommenting = false
        })
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
      },
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
#story-view {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
}
#story-deck {
  display: 'flex';
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 100%;
  font-size: 1.6rem;
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