<template>
  <div :class="mini ? 'mini-list-view' : ''">
    <h2 class="title">
      <slot></slot>
    </h2>
    <section class="language-list" :class="mini ? 'language-list-mini': ''">
      <div
        v-for="lang in languages"
        :key="mini ? lang.code : lang"
        :title="mini ? `${lang.name} Lessons` : `${lang} Lessons`"
        @click="handleLessonNavigation(mini ? lang.name : lang)"
      >
        {{ mini ? lang.name : lang }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LessonCardsListView",
  props: ["handleLessonNavigation", "languages", "mini"]
}
</script>

<style scoped>
h2.title {
  text-align: left;
  padding: 5px 15px 3px;
  margin: 0 15px;
  font-size: 2.8rem;
  letter-spacing: 0.66px;
  color: var(--off-white-main);
  border-bottom: 1px solid var(--off-white-main) !important;
}
.language-list {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  padding: 0 15px;
  gap: 15px;
  width: 100vw;
  max-width: calc(100vw - 30px);
  overflow-x: scroll;
  height: 162px;
  scrollbar-color: var(--theme-color-main) var(--bg-color-secondary);
  scrollbar-width: thin;
}
.language-list::-webkit-scrollbar {
  height: 8px;
  background-color: var(--bg-color-secondary);
  overflow: hidden;
  border-radius: 4px;
  
}
.language-list::-webkit-scrollbar-thumb {
  background: var(--theme-color-main);
  border-radius: 4px;
}
.language-list>div {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-width: 140px;
  max-width: 140px;
  min-height: 140px;
  max-height: 140px;
  background-color: var(--theme-color-main);
  border-radius: 20px;
  cursor: pointer;
  font-family: "Roboto";
}
.language-list-mini {
  justify-content: flex-start;
  height: 122px;
}
.language-list-mini>div {
  min-width: 100px;
  max-width: 100px;
  min-height: 100px;
  max-height: 100px;
  transition: opacity 0.1s ease-in;
}
.language-list>div:hover {
  background-color: var(--theme-color-secondary);
}
.language-list-mini>div:hover, .language-list-mini>div:active {
  opacity: 1;
}
.mini-list-view {
  transition: all 0.2s ease-in;
}

@media (min-width: 959px) {
  .language-list {
    margin: 30px 15px;
    width: 100%;
    justify-content: flex-start;
    gap: 100px;
  }
  .mini-list-view {
    margin-top: 60px;
  }
  .language-list-mini {
    justify-content: flex-start;
    gap: 10px;
  }
  .language-list-mini>div {
    opacity: 0.5;
  }
}

@media (min-height: 800px) {
  .mini-list-view {
    margin-top: 20%;
  }
}
</style>
