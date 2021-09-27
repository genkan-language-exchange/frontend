<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      <div class="title-editor">
        <label for="title">Title:</label>
        <input v-model="content" type="text" placeholder="Enter a title..." required aria-required="true">
        <div class="tools">
          <button @click="handleSave"><i class="fas fa-save"></i></button>
        </div>
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
  props: ["editingWidget", "setEditingWidget", "widget", "onSave"],
  data() {
    return {
      content: this.widget?.content || ""
    }
  },
  methods: {
    handleSave() {
      const payload = {
        content: this.content
      }

      this.onSave(this.widget._id, payload)
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
@media (min-width: 968px) {
  .title-editor {
    margin: 0 10%;
  }
}
</style>