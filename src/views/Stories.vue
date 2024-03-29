<template>
  <template v-if="stories?.length">
    <div id="story-view">
      <StoryFilterBar />
      <section id="story-deck">
        <transition-group name="fade-in">
          <template v-for="story in stories">
            <StoryCard
              v-if="story.userId != null || story.userId != undefined"
              :key="story._id"
              :userId="story.userId"
              :story="story"
              @openModal="openModal"
              @openReportModal="openReportModal"
              @deleteStory="deleteStory"
            />
          </template>
        </transition-group>
      </section>
      <TheStoryCreationButton />
    </div>
  </template>
  <template v-else-if="!stories?.length">
    <div id="story-view">
      <TheStoryCreationButton />
    </div>
  </template>

  <template v-else>
    <div id="loading">
      <TheLoadSpinner />
    </div>
  </template>  

  <transition name="fade-in-z" mode="out-in">
    <StoryModal
      v-if="showModal"
      @closeModal="closeModal"
      @report="switchModal"
      :story="modalData"
      :isCommenting="isCommenting"
    />
  </transition>
  <transition name="fade-in-z" mode="out-in">
    <ReportModal
      v-if="showReportModal"
      @closeModal="closeReportModal"
      @cancelReport="cancelReport"
      :reporting="modalData"
    />
  </transition>
</template>

<script>
  import { getStories, removeStory } from '@/api/storyApi'

  import ReportModal from '@/components/ReportModal'
  import StoryCard from '@/components/stories/StoryCard'
  import StoryFilterBar from '@/components/stories/StoryFilterBar'
  import StoryModal from '@/components/stories/StoryModal'
  import TheStoryCreationButton from '@/components/stories/TheStoryCreationButton'
  import TheLoadSpinner from '@/components/TheLoadSpinner'

  export default {
    components: {
      ReportModal,
      StoryCard,
      StoryFilterBar,
      StoryModal,
      TheStoryCreationButton,
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
        .then(res => res.data.filter(story => story.userId != null))
        .catch(err => err)
        this.stories = response
      },
      async deleteStory(id) {
        await removeStory(id)
        .then(res => res.data)
        .catch(err => err)
        this.stories = this.stories.filter(story => story._id !== id)
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

</style>