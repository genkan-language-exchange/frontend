<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      TRANSLATION EDITOR
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
  props: ["editingWidget", "setEditingWidget", "widget"]
}
</script>

<style scoped>

</style>