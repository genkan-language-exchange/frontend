<template>
  <BaseWidget>
    <div class="text-widget" :style="{ textAlign: widget.textAlign }">
      <div v-for="block, idx in widget.content" :key="idx">
        <p>{{ block }}</p>
      </div>
    </div>
  </BaseWidget>
</template>

<script>
/*
{
  _id: "sdgbndefi23",
  type: "TextWidget",
  textAlign: "left",
  content: ["Lorem ipsum, dolor sit amet consectetur adipisicing elit.\nQuibusdam necessitatibus nisi nihil iure maxime error blanditiis at temporibus totam est, dolorem laboriosam. Doloremque aspernatur commodi dolore harum sunt necessitatibus placeat?"]
},
*/
import BaseWidget from './BaseWidget.vue'
export default {
  name: "TextWidget",
  props: ["widget"],
  components: {
    BaseWidget
  },
}
</script>

<style scoped>
.text-widget>div {
  margin: 0 0 10px;
}
.text-widget>div p {
  margin: 0;
  padding: 0;
}
</style>