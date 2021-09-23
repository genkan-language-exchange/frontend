<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      <div class="table-editor">
        <table cellspacing="0">
          <thead>
            <tr>
              <th v-for="cell, idx in widget.content[0]" :key="cell" :style="tableCellStyles">
                <input type="text" v-model="content[0][idx]" :disabled="saving">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row, idx in widget.content.slice(1)" :key="idx">
              <td v-for="cell, jdx in row" :key="cell" :style="tableCellStyles">
                <input type="text" v-model="content[idx + 1][jdx]" :disabled="saving">
              </td>
            </tr>
          </tbody>
          <tfoot>
            <caption></caption>
          </tfoot>
        </table>
        <div class="tools">
          <button @click="toggleHeader" :disabled="saving"><i class="fas" :class="hasHead ? 'fa-table' : 'fa-border-all'"></i></button>
          <button @click="pseudoSave" :disabled="saving"><i :class="saving ? 'fas fa-fan' : 'fas fa-save'"></i></button>
        </div>
      </div>
    </template>
    <template v-if="editingWidget !== widget._id" v-slot:baseWidget>
      <TableWidget :widget="widget" />
    </template>
  </BaseWidgetEditor>
</template>

<script>
/*
{
  _id: "fsdkbjndk;",
  type: "TableWidget",
  hasHead: true,
  content: [
    ["romaji", "kana"],
    ["wa", "は"],
    ["ga", "が"],
  ],
},
*/

import BaseWidgetEditor from './BaseWidgetEditor.vue'
import TableWidget from '../TableWidget.vue'
export default {
  name: "TableWidgetEditor",
  components: {
    BaseWidgetEditor,
    TableWidget
  },
  props: ["editingWidget", "setEditingWidget", "widget"],
  data() {
    return {
      hasHead: this.widget?.hasHead || true,
      content: this.widget?.content || [[],[]],
      saving: false,
    }
  },
  methods: {
    toggleHeader() {
      this.hasHead = !this.hasHead
    },
    pseudoSave() {
      this.saving = true
      setTimeout(() => {
        this.saving = false
      }, 500)
    }
  },
  computed: {
    columnCount() {
      return parseInt(this.widget.content[0].length)
    },
    tableCellStyles() {
      return ({ display: 'table-cell', width: `${1 / this.columnCount}%` })
    }
  }
}
</script>

<style scoped>
.table-editor {
  width: 90%;
  margin: 0 auto;
  background-color: var(--off-white-main);

  box-sizing: border-box;
  display: inline-block;
  padding: 30px 0;
  background-color: var(--off-white-main);
  border-radius: 5px;
  border: 2px solid var(--theme-color-main);
  color: var(--bg-color-main);
  display: flex;
  flex-direction: column;
}
table {
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--bg-color-secondary);
  border-radius: 3px;
}
thead, tbody, tr {
  width: 100%;
}
tr {
  background-color: var(--bg-color-secondary);
}
th, td {
  border: 1px solid var(--bg-color-main);
}

th input, td input {
  font-size: 1.6rem;
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  border: none;
}
th input:focus, td input:focus {
  outline: 3px solid var(--theme-color-main);
}
.tools {
  width: 90%;
  margin: 10px auto !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
}
.tools button {
  padding: 6px 9px;
  height: 40px;
  width: 40px;
  background-color: var(--theme-color-main);
  border: 1px solid var(--theme-color-main);
  border-radius: 5px;
  cursor: pointer;
}
.tools button:hover {
  background-color: var(--theme-color-secondary);
  border: 1px solid var(--theme-color-secondary);
}
.tools button:disabled {
  cursor: wait;
  background-color: #bbb;
  border: 1px solid #bbb;
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
@media (min-width: 968px) {
  table {
    width: 90%;
  }
}
.fa-fan {
  animation: spin 1.5s infinite linear;
}
</style>