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
          <TheLoadSpinner style="margin: 0 auto !important;" v-if="busyWidget === widget._id" />
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
        
        <button class="modal-button button" @click.prevent="openModal">Add Widget</button>
        
        <div class="lesson-type">
          <label for="type">Lesson type:</label>
          <select name="type" id="type" v-model="type" @change="handleTypeChange">
            <option value="language">Language</option>
            <option value="culture">Culture</option>
          </select>
        </div>
        <div class="lesson-status">
          <label for="status">Lesson status:</label>
          <select name="status" id="status" v-model="status" @change="handleStatusChange">
            <option value="draft" disabled>Draft</option>
            <option value="published">Published</option>
            <option value="private">Private</option>
            <option value="deleted">Delete</option>
          </select>
        </div>
        
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
  props: ["canEdit", "lesson", "widgets", "addWidgetToLesson", "editWidgetContent", "onEditing", "onStatusChange", "onTypeChange"],
  data() {
    return {
      editing: false,
      editingWidget: "",
      busyWidget: "",
      modalOpen: false,
      status: "",
      type: "",
    }
  },
  methods: {
    setEditing() {
      this.onEditing()
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
      this.editingWidget = "-1"
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
    },
    handleStatusChange() {
      if (this.status === 'deleted') {
        const answer = prompt('Are you sure you want to delete this lesson? Type "YES" to continue.')
        if (answer?.trim()?.toLowerCase() !== 'yes') return
      }
      this.onStatusChange(this.status)
    },
    handleTypeChange() {
      this.onTypeChange(this.type)
    }
  },
  mounted() {
    this.status = this.lesson.status
    this.type = this.lesson.type
    if (this.canEdit && !this.widgets?.length) {
      this.editing = true
      this.onEditing()
    }
  }
}
</script>

<style scoped>
  #render-view{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
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
  .modal-button {
    margin-top: 20px !important;
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
  .lesson-status, .lesson-type {
    width: 30%;
    margin: 20px auto;
  }
  .lesson-status label, .lesson-type label {
    margin-bottom: 5px;
  }
  .lesson-status select, .lesson-type select {
    padding: 5px;
    font-size: 1.6rem;
  }
</style>