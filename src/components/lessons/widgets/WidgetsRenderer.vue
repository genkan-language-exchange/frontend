<template>
  <div id="wrapper">
    <button
      class="edit-button"
      v-if="canEdit"
      @click="setEditing"
    >
      {{ editing ? "Editing..." : "Edit"}}
    </button>
    <template v-if="!editing">
      <div id="render-view" v-for="widget in widgets" :key="widget._id">
        <TableWidget
          v-if="widget.type === 'TableWidget'"
          :widget="widget"
        />
        <TextWidget
          v-else-if="widget.type === 'TextWidget'"
          :widget="widget"
        />
        <TitleWidget
          v-else-if="widget.type === 'TitleWidget'"
          :widget="widget"
        />
        <TranslationWidget
          v-else-if="widget.type === 'TranslationWidget'"
          :widget="widget"
        />
        <div v-else>
          <p>Unable to identify Widget type</p>
        </div>
      </div>
    </template>

    <template v-else>
      <div>
        <div id="render-view" v-for="widget in widgets" :key="widget._id">
          <TableWidgetEditor
            v-if="widget.type === 'TableWidget'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
          />
          <TextWidgetEditor
            v-else-if="widget.type === 'TextWidget'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
          />
          <TitleWidgetEditor
            v-else-if="widget.type === 'TitleWidget'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
          />
          <TranslationWidgetEditor
            v-else-if="widget.type === 'TranslationWidget'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
          />
        </div>
        <div id="widgets-selector">
          <select v-model="newWidget" name="widgets" id="widgets">
            <option value="" selected disabled>Select a widget...</option>
            <option value="TitleWidget">Title</option>
            <option value="TextWidget">Text</option>
            <option value="TableWidget">Table</option>
            <option value="TranslationWidget">Translation</option>
          </select>
          <button @click.prevent="addWidget">Add Widget</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TableWidget from './TableWidget.vue'
import TextWidget from './TextWidget.vue'
import TitleWidget from './TitleWidget.vue'
import TranslationWidget from './TranslationWidget.vue'

import TableWidgetEditor from './editors/TableWidgetEditor.vue'
import TextWidgetEditor from './editors/TextWidgetEditor.vue'
import TitleWidgetEditor from './editors/TitleWidgetEditor.vue'
import TranslationWidgetEditor from './editors/TranslationWidgetEditor.vue'

export default {
  name: "WidgetsRenderer",
  components: {
    TableWidget,
    TextWidget,
    TitleWidget,
    TranslationWidget,
    TableWidgetEditor,
    TextWidgetEditor,
    TitleWidgetEditor,
    TranslationWidgetEditor,
  },
  props: ["canEdit", "widgets"],
  data() {
    return {
      editing: false,
      editingWidget: "",
      newWidget: ""
    }
  },
  methods: {
    setEditing() {
      this.editing = !this.editing
    },
    setEditingWidget(_id) {
      if (this.editingWidget === _id) {
        this.editingWidget = ""
      } else {
        this.editingWidget = _id
      }
    },
    addWidget() {
      // this.lessonWidgets.push({
      //   _id: Date.now().toString(),
      //   type: this.newWidget
      // })
      // this.newWidget = ""
    }
  },
  mounted() {
    if (this.canEdit && !this.widgets?.length) this.editing = true
  }
}
</script>

<style scoped>
  #wrapper {
    position: relative;
  }
  .edit-button {
    position: absolute;
    float: right;
    top: -62px;
    right: 5px;
    cursor: pointer;
    opacity: 0.3;
    padding: 5px 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--off-white);
    border: 1px solid var(--theme-color-main);
    background-color: var(--theme-color-main);
    border-radius: 5px;
  }
  .edit-button:hover {
    opacity: 1;
  }
  #widgets-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  #widgets-selector select {
    font-size: 1.6rem;
  }
  #widgets-selector select,
  #widgets-selector button {
    padding: 5px 10px;
    color: var(--bg-color-main);
    cursor: pointer;
  }
</style>