<template>
  <div id="wrapper">
    <button
      class="edit-button button"
      v-if="canEdit"
      @click="setEditing"
    >
      {{ editing ? "Editing..." : "Edit"}}
    </button>
    <template v-if="!editing">
      <div id="render-view" v-for="widget in widgets" :key="widget.type + '-' + widget._id">
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
          <TheLoadSpinner v-if="busyWidget === widget._id" />
          <TableWidgetEditor
            v-if="widget.type === 'TableWidget'"
            :class="busyWidget === widget._id && 'busy'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
            :onSave="editWidget"
          />
          <TextWidgetEditor
            v-else-if="widget.type === 'TextWidget'"
            :class="busyWidget === widget._id && 'busy'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
            :onSave="editWidget"
          />
          <TitleWidgetEditor
            v-else-if="widget.type === 'TitleWidget'"
            :class="busyWidget === widget._id && 'busy'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
            :onSave="editWidget"
          />
          <TranslationWidgetEditor
            v-else-if="widget.type === 'TranslationWidget'"
            :class="busyWidget === widget._id && 'busy'"
            :widget="widget"
            :editingWidget="editingWidget"
            :setEditingWidget="setEditingWidget"
            :onSave="editWidget"
          />
        </div>
        
        <button class="button" @click.prevent="openModal">Add Widget</button>
        
        <AddWidgetModal
          v-if="modalOpen"
          @closeModal="modalOpen = false"
          :addWidget="addWidget"
        />
      </div>
    </template>
  </div>
</template>

<script>
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import AddWidgetModal from './AddWidgetModal.vue'
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
    TheLoadSpinner,
    AddWidgetModal,
    TableWidget,
    TextWidget,
    TitleWidget,
    TranslationWidget,
    TableWidgetEditor,
    TextWidgetEditor,
    TitleWidgetEditor,
    TranslationWidgetEditor,
  },
  props: ["canEdit", "widgets", "addWidgetToLesson", "editWidgetContent"],
  data() {
    return {
      editing: false,
      editingWidget: "",
      busyWidget: "",
      modalOpen: false,
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
    openModal() {
      this.modalOpen = true
    },
    addWidget(w) {
      this.addWidgetToLesson(w)
    },
    onLoadEnd() {
      this.busyWidget = ""
    },
    editWidget(id, payload) {
      this.busyWidget = this.editingWidget
      this.editingWidget = ""
      this.editWidgetContent(id, payload, this.onLoadEnd)
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
  #wrapper div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #wrapper div button {
    display: inline-block;
    margin: 0 auto;
    font-size: 1.6rem;
  }
  .busy {
    display: none;
    visibility: hidden;
  }
  .button {
    cursor: pointer;
    color: var(--off-white);
    border: 1px solid var(--theme-color-main);
    background-color: var(--theme-color-main);
    border-radius: 5px;
    padding: 5px 8px;
  }
  .edit-button {
    position: absolute;
    float: right;
    top: -62px;
    right: 5px;
    opacity: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;    
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