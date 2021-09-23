<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      <div class="title-editor">
        <label for="title">Title:</label>
        <input v-model="content" type="text" placeholder="Enter a title..." required aria-required="true">
        <button>Save</button>
      </div>
    </template>
    <template v-if="editingWidget !== widget._id" v-slot:baseWidget>
      <TitleWidget :widget="widget" />
    </template>
  </BaseWidgetEditor>
</template>

<script>
import BaseWidgetEditor from './BaseWidgetEditor.vue'
import TitleWidget from '../TitleWidget.vue'
export default {
  name: "TitleWidgetEditor",
  components: {
    BaseWidgetEditor,
    TitleWidget
  },
  props: ["editingWidget", "setEditingWidget", "widget"],
  data() {
    return {
      content: this.widget?.content || ""
    }
  }
}
</script>

<style scoped>
.title-editor {
  box-sizing: border-box;
  display: inline-block;
  min-height: 20px;
  padding: 23.5px 10px;
  background-color: var(--off-white-main);
  border-radius: 5px;
  border: 2px solid var(--theme-color-main);
  color: var(--bg-color-main);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.title-editor input {
  margin-right: 10px;
  width: 60%;
}
.title-editor input, button {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 1.6rem;
  padding: 5px;
  border: 2px solid var(--theme-color-main);
}
.title-editor input:active,
.title-editor input:focus {
  outline: 1px solid var(--theme-color-secondary);
}
.title-editor label {
  font-weight: bold;
  margin-right: 8px;
}
.title-editor button {
  padding: 4px;
  cursor: pointer;
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
}
.title-editor button:hover {
  background-color: var(--theme-color-secondary);
}
@media (min-width: 968px) {
  .title-editor {
    margin: 0 10%;
  }
}
</style>