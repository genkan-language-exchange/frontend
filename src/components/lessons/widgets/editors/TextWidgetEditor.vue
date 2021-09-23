<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      <div class="text-editor">
        <div v-for="block, idx in widget.content" :key="idx">
          <textarea v-model="content[idx]" :style="{ textAlign }" name="text" id="text" cols="30" rows="4" required />
        </div>
        <div class="tools">
          <button><i class="fas fa-bars"><i class="fas fa-plus-circle"></i></i></button>
          <button @click="toggleAlignment"><i :class="`fas fa-align-${textAlign}`"></i></button>
          <button><i class="fas fa-save"></i></button>
        </div>
      </div>
    </template>
    <template v-if="editingWidget !== widget._id" v-slot:baseWidget>
      <TextWidget :widget="widget" />
    </template>
  </BaseWidgetEditor>
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
import BaseWidgetEditor from './BaseWidgetEditor.vue'
import TextWidget from '../TextWidget.vue'
export default {
  name: "TextWidgetEditor",
  props: ["editingWidget", "setEditingWidget", "widget"],
  components: {
    BaseWidgetEditor,
    TextWidget
  },
  data() {
    return {
      content: this.widget?.content || [],
      textAlign: this.widget?.textAlign || "left"
    }
  },
  methods: {
    toggleAlignment() {
      const options = ["left", "center", "right", "justify"]
      const current = options.indexOf(this.textAlign)
      if (current === 3) this.textAlign = "left"
      if (current === 2) this.textAlign = "justify"
      if (current === 1) this.textAlign = "right"
      if (current === 0) this.textAlign = "center"
    }
  }
}
</script>

<style scoped>
.text-editor {
  box-sizing: border-box;
  display: inline-block;
  min-height: 20px;
  padding: 23.5px 10px;
  background-color: var(--off-white-main);
  border-radius: 5px;
  border: 2px solid var(--theme-color-main);
  color: var(--bg-color-main);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}
.text-editor div {
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.text-editor div textarea {
  box-sizing: border-box;
  margin: 10px auto;
  min-height: 80px;
  max-height: 80px;
  min-width: 100%;
  max-width: 100%;
  resize: none;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  border: 1px solid var(--theme-color-main);
  border-radius: 3px;
  padding: 4px;
}
.text-editor div textarea:focus {
  border-color: var(--theme-color-secondary);
  outline: 2px solid var(--theme-color-secondary);
}
.tools {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
}
.tools button {
  padding: 6px 9px;
  background-color: var(--theme-color-main);
  border: 1px solid var(--theme-color-main);
  border-radius: 5px;
  cursor: pointer;
}
.tools button:hover {
  background-color: var(--theme-color-secondary);
  border: 1px solid var(--theme-color-secondary);
}
button i {
  position: relative;
  font-size: 2rem;
  color: var(--off-white-main);
}
button i i {
  position: absolute;
  top: -5px;
  right: -8px;
  font-size: 1.4rem;
}
</style>