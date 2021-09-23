<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="error">
      Whoops!
    </template>
    <template v-else>
      <CreateNewLessonCard :navigateToLessonCreation="navigateToLessonCreation" />
      <h2 class="title">Your created lessons</h2>
      <LessonCardDeck
        :createdLessons="createdLessons"
        :navigateToLessonCreation="navigateToLessonCreation"
      />
    </template>
  </div>
</template>

<script>
const created_lessons = [
  {
    _id: "#sdngba2aa@3!",
    language: "Japanese",
    title: "は vs が - the compendium",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    published: true,
    creator: {
      _id: "!fsdsga@",
      username: "anewday",
      identifier: "6943",
      matchSettings: {
        languageKnow: [
          ["English", 3],
          ["Japanese", 2],
        ],
      },
    },
    rating: 4.2,
    likes: [
      {
        _id: "fsjndbfda",
        username: "new_joe",
        identifier: "4649"
      },
      {
        _id: "fsjndbfd3",
        username: "old_joe",
        identifier: "4219"
      },
    ],
    content: [
      {
        _id: "fmuno342g",
        type: "TitleWidget",
        content: "は vs が - the compendium"
      },
      {
        _id: "sdgbndefi23",
        type: "TextWidget",
        textAlign: "left",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.\nQuibusdam necessitatibus nisi nihil iure maxime error blanditiis at temporibus totam est, dolorem laboriosam. Doloremque aspernatur commodi dolore harum sunt necessitatibus placeat?"
      },
      {
        _id: "fsdkbjndk;",
        type: "TableWidget",
        content: [
          ["wa", "は"],
          ["ga", "が"],
        ],
      },
      {
        _id: "adsfsaga",
        type: "TranslationWidget",
        content: [
          {
            main: "blahblahblah",
            target: "なんやらなんやらなんやら"
          }
        ]
      }
    ],
  },
]

import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import LessonCardDeck from '@/components/lessons/LessonCardDeck.vue'
import CreateNewLessonCard from '@/components/lessons/CreateNewLessonCard.vue'
export default {
  name: "LessonCreationOverview",
  components: {
    TheLoadSpinner,
    LessonCardDeck,
    CreateNewLessonCard
  },
  data() {
    return {
      loading: true,
      error: false,
      createdLessons: [],
    }
  },
  methods: {
    fetchLessons() {
      // console.log(this.$route.params.language)
      // do api stuff
      this.pseudoLoader()
    },
    pseudoLoader() {
      const params = this.$route.params.language
      setTimeout(() => {
        this.loading = false
        this.createdLessons = created_lessons.filter(lesson => lesson.language.toLowerCase() === params.toLowerCase())
      }, 1000)
    },
    navigateToLessonCreation(id) {
      this.$router.push({ name: 'LessonCreator', params: { id } })
    }
  },
  mounted() {
    this.fetchLessons()
  }
}
</script>

<style scoped>
.container {
  margin-top: 62px;
  font-size: 1.8rem;
}
h2 {
  margin: 20px auto;
  padding: 0;
}
button {
  margin-top: 55px;
}
</style>
