<template>
  <div class="container">
    <template v-if="loading">
      <TheLoadSpinner />
    </template>
    <template v-else-if="error">
      Whoops!
    </template>
    <template v-else-if="newLesson">

    </template>
    <template v-else>
      <div id="lesson-view">
        <h2 class="title">{{ lesson?.title }}</h2>
        <WidgetsRenderer :canEdit="true" :widgets="lesson.content" />
      </div>
    </template>
  </div>
</template>

<script>
const lesson = {
    _id: "#sdngba2aa@3!",
    language: "Japanese",
    target_languages: ["English", "Korean"],
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
        content: "Putting it all together"
      },
      {
        _id: "sdgbndefi232",
        type: "TextWidget",
        textAlign: "left",
        content: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit.\nQuibusdam necessitatibus nisi nihil iure maxime error blanditiis at temporibus totam est, dolorem laboriosam. Doloremque aspernatur commodi dolore harum sunt necessitatibus placeat?", "Nulla facilisi. Pellentesque ac malesuada lorem, eu sagittis odio. Duis rutrum nisi maximus feugiat imperdiet. In hac habitasse platea dictumst. Ut scelerisque eu tellus et pulvinar. Duis sit amet ipsum est. Nam nec nisi sapien. Sed et elit in mi tempor cursus ac sit amet enim. Proin rutrum aliquam imperdiet. Vivamus egestas sit amet eros id venenatis."]
      },
      {
        _id: "fsdkbjndk;fsdag",
        type: "TableWidget",
        hasHead: true,
        content: [
          ["romaji", "kana", "한글"],
          ["wa", "は", "은/는"],
          ["ga", "が", "이/가"],
        ],
      },
      {
        _id: "sdgbndefi23",
        type: "TextWidget",
        textAlign: "left",
        content: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit.\nQuibusdam necessitatibus nisi nihil iure maxime error blanditiis at temporibus totam est, dolorem laboriosam. Doloremque aspernatur commodi dolore harum sunt necessitatibus placeat?"]
      },
      {
        _id: "fsdkbjndk;",
        type: "TableWidget",
        hasHead: false,
        content: [
          ["e", "へ"],
          ["ni", "に"],
        ],
      },
      {
        _id: "adsfsaga",
        type: "TranslationWidget",
        content: [
          {
            main: "blahblahblah",
            target: "なんやらなんやらなんやら"
          },
          {
            main: "wowowow",
            target: "すごい"
          },
          {
            main: "wowowow",
            target: "すごい"
          },
        ]
      }
    ],
  }

import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import WidgetsRenderer from '@/components/lessons/widgets/WidgetsRenderer.vue'
export default {
  name: "LessonCreator",
  components: {
    TheLoadSpinner,
    WidgetsRenderer
  },
  data() {
    return {
      error: false,
      loading: true,
      newLesson: false,
      lesson: {}
    }
  },
  methods: {
    pseudoLoad() {
      if (this.$route.params.id === "new") {
        this.loading = false
        this.newLesson = true
      }
      setTimeout(() => {
        this.lesson = lesson
        this.loading = false
      }, 500)
    }
  },
  mounted() {
    this.pseudoLoad()
  },
}
</script>

<style scoped>
.container {
  margin-top: 55px;
  font-size: 1.8rem;
}
#lesson-view {
  width: 90%;
  min-height: calc(100vh - 75px);
  margin: 0 auto;
  padding: 10px;
  background-color: var(--bg-color-main);
  text-align: left;
  transition: all 0.15s ease-in;
}
h2.title {
  margin-left: 10px;
  margin-bottom: 30px;
}

@media (min-width: 968px) {
  h2.title {
    margin-left: 10%;
  }
  #lesson-view {
    width: 60%;
    /* border-left: 2px solid var(--theme-color-main);
    border-right: 2px solid var(--theme-color-main); */
  }
}
@media (min-width: 1800px) {
  #lesson-view {
    width: 45%;
  }
}
</style>