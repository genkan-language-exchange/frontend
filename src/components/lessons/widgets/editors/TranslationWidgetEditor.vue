<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      <div class="text-editor">
        <div class="input-group" v-cloak v-for="block, idx in content" :key="idx">
          <input type="text" v-model="content[idx].main" />
          <input type="text" v-model="content[idx].target" />
        </div>
        <div class="tools">
          <button title="Remove group" @click="removeGroup"><i class="fas fa-bars"><i class="fas fa-minus-circle"></i></i></button>
          <button title="Add group" @click="addGroup"><i class="fas fa-bars"><i class="fas fa-plus-circle"></i></i></button>
          <button title="Save" @click="handleSave"><i class="fas fa-save"></i></button>
        </div>
      </div>
    </template>
    <template v-if="editingWidget !== widget._id" v-slot:baseWidget>
      <TranslationWidget :widget="widget" />
    </template>
  </BaseWidgetEditor>
</template>

<script>
import BaseWidgetEditor from './BaseWidgetEditor.vue'
import TranslationWidget from '../TranslationWidget.vue'
export default {
  name: "TranslationWidgetEditor",
  components: {
    BaseWidgetEditor,
    TranslationWidget
  },
  props: ["editingWidget", "setEditingWidget", "widget", "onSave"],
  data() {
    return {
      content: this.widget.content || [{ main: "", target: "" }]
    }
  },
  methods: {
    handleSave() {
      const payload = {
        content: this.content,
      }

      this.onSave(this.widget._id, payload)
    },
    addGroup() {
      this.content.push({ main: "", target: "" })
    },
    removeGroup() {
      this.content.pop()
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
.text-editor div input {
  font-size: 1.6rem;
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--theme-color-secondary);
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  margin: 8px 2px;
}
.text-editor div input:focus {
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