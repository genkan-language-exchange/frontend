<template>
  <div class="container" :style="selectedType && 'align-items: center;'">
    <transition-group name="fade-in" mode="out-in">

      <template v-if="!selectedType">
        <section class="culture" :class="loading || cultureLessons === 0 && 'loading'" key="culture" @click="loading || cultureLessons === 0 ? null : handleTypeSelect('culture')">
          <transition-group name="fade-in" mode="out-in">
            <h2 key="title" class="title">Culture</h2>
            <p key="count" v-if="!loading">{{ cultureLessons }} lesson{{ cultureLessons === 1 ? '' : 's'}}</p>
          </transition-group>
        </section>

        <section class="language" :class="loading || languageLessons === 0 && 'loading'" key="language" @click="loading || languageLessons === 0 ? null : handleTypeSelect('language')">
          <transition-group name="fade-in" mode="out-in">
            <h2 key="title" class="title">Language</h2>
            <p key="count" v-if="!loading">{{ languageLessons }} lesson{{ languageLessons === 1 ? '' : 's'}}</p>
          </transition-group>
        </section>
      </template>

      <template v-else>
        <template v-if="busy">
          <TheLoadSpinner />
        </template>

        <template v-else-if="!busy && !lessons.length">
          <h2>No lessons yet :(</h2>
        </template>

        <template v-else>
          <div>
            <h1 class="title">Check out these lessons</h1>
            <transition :appear="!!lessons.length" name="fade-in" mode="out-in">
              <div class="scroll-view" key="scroll-view">
                <div v-for="lesson in lessons" :key="lesson._id" @click="navigateToLesson(lesson._id)">
                  <h2>{{ lesson.title }}</h2>
                  <section class="timestamps">
                    <p v-if="lesson.createdAt >= lesson.updatedAt">Created {{ formattedDate(lesson.createdAt) }}</p>
                    <p v-else>Updated {{ formattedDate(lesson.updatedAt) }}</p>
                  </section>
                </div>
              </div>
            </transition>
          </div>
        </template>
      </template>

    </transition-group>
  </div>
</template>

<script>
import moment from 'moment'
import { getLessonCount, getPublishedLessons } from '@/api/lessonsApi.js'
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
export default {
  components: {
    TheLoadSpinner
  },
  data() {
    return {
      loading: true,
      busy: false,
      language: "",
      cultureLessons: 0,
      languageLessons: 0,
      selectedType: "",
      page: 1, // 25 results per page
      lessons: [],
    }
  },
  methods: {
    formattedDate(date) {
      return moment(date).startOf().fromNow()
    },
    async fetchLessons() {
      const languageResponse = await getLessonCount(this.language, 'language')
      const cultureResponse = await getLessonCount(this.language, 'culture')

      this.languageLessons = languageResponse.lesson_count
      this.cultureLessons = cultureResponse.lesson_count
      this.loading = false
    },
    async handleTypeSelect(type) {
      if (this.busy) return
      this.busy = true
      if (type !== this.selectedType) {
        // if user moves back to culture/language select view
        // but clicks back into the same type
        // keep them on the same page
        this.page = 1
      }
      this.selectedType = type
      const response = await getPublishedLessons(this.language, type, this.page - 1)
      console.log(response)
      if (response.status === 'success') {
        this.lessons = response.data
      }
      this.busy = false
    },
    navigateToLesson(id) {
      this.$router.push({ name: 'LessonPage', params: { id } })
    }
  },
  created() {
    this.language = this.$route.params.language
    this.fetchLessons()
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  display: flex;
  justify-content: center;
  padding-top: 55px;
  height: calc(100vh - 55px);
  font-size: 1.8rem;
}
h1.title {
  margin: 0 0 25px;
  padding: 0;
}
.culture {
  border-right: 1px solid var(--theme-color-main);
}
.language {
  border-left: 1px solid var(--theme-color-main);
}
.language, .culture {
  border-top: 2px solid var(--theme-color-main);
  padding-top: 5px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in;
}
section:hover, section:active {
  background-color: var(--theme-color-main);
}
.loading {
  cursor: default;
}
.loading:hover, .loading:active {
  background-color: transparent;
}
.scroll-view {
  /* margin-top: 25px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 65vw;
  gap: 100px;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  border-top: 1px solid white;
}
.scroll-view>div {
  height: 250px;
  min-width: 300px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  border-radius: 15px;
  background-color: var(--theme-color-main);
  box-shadow: 0 0 12px 8px rgba(0,0,0,0.1);
  cursor: pointer;
}

@media (min-width: 959px) {
  h2.title {
    font-size: 4rem;
  }
}
</style>