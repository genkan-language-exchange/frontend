<template>
  <BaseWidget>
    <h3>{{ widget.content }}</h3>
  </BaseWidget>
</template>

<script>
/*
{
  _id: "fmuno342g",
  type: "TitleWidget",
  content: "は vs が - the compendium"
},
*/
import BaseWidget from './BaseWidget.vue'
export default {
  name: "TitleWidget",
  components: {
    BaseWidget
  },
  props: ["widget"],
  // computed: {
  //   highlight() {
  //     const _content = this.widget.content
  //     const highlightFinder = /@.*@/

  //     if (!highlightFinder.test(_content)) return _content

  //     return _content.replace(highlightFinder, match => ('<span style="color: var(--theme-color-main)">' + match + '</span>').replaceAll("@", "")
  //     )
      
  //   }
  // }
}
</script>

<style scoped>
  h3 {
    color: var(--off-white);
  }
</style>