<template>
  <BaseWidget>
    <div class="translation-block" v-for="(block, idx) in widget.content" :key="idx + block.main">
      <div class="translate">
        <p><span>{{ idx + 1 }}. </span>{{ block.main }}</p>
        <div class="no-select" @click="setViewAnswer(idx)"><i class="fas" :class="viewAnswer === idx ? 'fa-eye' : 'fa-eye-slash'"></i></div>
      </div>
      <transition name="answer" mode="out-in">
        <template v-if="viewAnswer === idx">
          <div class="divider">
            <p>{{ block.target }}</p>
          </div>
        </template>
      </transition>
    </div>
  </BaseWidget>
</template>

<script>
/*
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
*/
import BaseWidget from './BaseWidget.vue'
export default {
  name: "TranslationWidget",
  components: {
    BaseWidget
  },
  props: ["widget"],
  data() {
    return {
      viewAnswer: -1
    }
  },
  methods: {
    setViewAnswer(index) {
      if (this.viewAnswer === index) {
        this.viewAnswer = -1
      } else {
        this.viewAnswer = index
      }
    },
  },
}
</script>

<style scoped>
.translation-block {
  box-sizing: border-box;
  border: 2px solid var(--theme-color-main);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}
.translate {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.translate>div {
  text-align: center;
  min-width: 30px;
  max-width: 30px;
  padding: 15px 10px;
  border-left: 2px solid var(--theme-color-main);
  background-color: var(--theme-color-main);
  color: var(--off-white);
  cursor: pointer;
}
.translate>div:hover {
  background-color: var(--theme-color-secondary);
}
.divider {
  border-top: 2px solid var(--theme-color-main);
}
.translation-block p {
  box-sizing: border-box;
  margin: 0;
  padding: 15px 10px;
  background-color: var(--bg-color-secondary);
  width: 100%;
}
.answer-enter-from {
  opacity: 0;
}
.answer-enter-to {
  opacity: 1;
}
.answer-enter-active {
  transition: all 0.15s ease-out;
}
.answer-leave-from {
  opacity: 1;
}
.answer-leave-to {
  opacity: 0;
}
.answer-leave-active {
  transition: all 0.15s ease-out;
}
@media (min-width: 968px) {
  .translation-block {
    width: 90%;
    margin: 20px auto;
  }
}
</style>