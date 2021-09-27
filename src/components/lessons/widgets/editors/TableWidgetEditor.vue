<template>
  <BaseWidgetEditor @setEditingWidget="setEditingWidget(widget._id)">
    <template v-if="editingWidget === widget._id">
      <div class="table-editor">
        <h2 v-if="error_colCountLimit">Too many columns!</h2>
        <div class="table-group">
          <table cellspacing="0" v-cloak>
            <thead>
              <tr>
                <th v-for="cell, idx in content[0]" :key="'head-' + idx" :style="tableCellStyles">
                  <input type="text" v-model="content[0][idx]" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row, idx in content.slice(1)" :key="'row-' + idx">
                <td v-for="cell, jdx in row" :key="'cell-' + jdx" :style="tableCellStyles">
                  <input type="text" v-model="content[idx + 1][jdx]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="tools">
          <button title="Add column" @click="handleAddCol" :disabled="saving"><i class="fas fa-grip-lines-vertical"><i class="fas fa-plus-circle"></i></i></button>
          <button title="Add row" @click="handleAddRow" :disabled="saving"><i class="fas fa-grip-lines"><i class="fas fa-plus-circle"></i></i></button>
          <button title="Bold header" @click="toggleHeader" :disabled="saving"><i class="fas" :class="hasHead ? 'fa-table' : 'fa-border-all'"></i></button>
          <button title="Save" @click="handleSave" :disabled="saving"><i :class="saving ? 'fas fa-fan' : 'fas fa-save'"></i></button>
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
  props: ["editingWidget", "setEditingWidget", "widget", "onSave"],
  data() {
    return {
      hasHead: this.widget?.hasHead || true,
      content: this.widget?.content || [
        ["", ""],
        ["", ""],
      ],
      saving: false,
      error_colCountLimit: false,
    }
  },
  methods: {
    toggleHeader() {
      this.hasHead = !this.hasHead
    },
    handleSave() {
      const payload = {
        content: this.content,
        hasHead: this.hasHead
      }
      
      this.onSave(this.widget._id, payload)
    },
    handleAddRow() {
      const newRow = []
      // get number of columns in each row
      // (should be the same for each row, so just get the first row)
      let colCount = this.content[0].length

      // add cell to newRow colCount times
      while (colCount > 0) {
        newRow.push("")
        --colCount
      }

      // push to content array
      this.content.push(newRow)
    },
    handleAddCol() {
      const updatedTable = []
      
      // limit number of columns to avoid readability issues
      const colCount = this.content[0].length
      if (colCount > 3) return this.error_colCountLimit = true

      // duplicate current cells and add new cell to each
      this.content.forEach(cell => {
        const newRow = [...cell]
        newRow.push("")
        updatedTable.push(newRow)
      })

      // push to content array
      this.content = updatedTable
    }
  },
  computed: {
    columnCount() {
      return parseInt(this.content[0].length)
    },
    tableCellStyles() {
      return ({ display: 'table-cell', width: `${(1 / this.columnCount) * 100}%` })
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
  align-items: stretch;
}
.table-editor h2 {
  text-align: center;
  color: var(--red);
}
.table-group {
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.add-col {
  padding: 8px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--theme-color-main);
  color: var(--off-white-main);
}
.add-row {
  background-color: var(--theme-color-main);
  text-align: center;
  cursor: pointer;
  color: var(--off-white-main);
}
.add-row td {
  border: none;
  padding: 4px;
}
.add-col:hover,
.add-row:hover {
  background-color: var(--theme-color-secondary) !important;
}
table {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  overflow: hidden;
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
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}
th input:focus, td input:focus {
  outline: 3px solid var(--theme-color-main);
}
tfoot {
  text-align: center;
}
.tools {
  width: 90%;
  margin: 10px auto !important;
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
}
.tools button {
  position: relative;
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
  font-size: 2rem;
  color: var(--off-white-main);
}
button i i {
  position: absolute;
  top: -1px;
  right: 0px;
  font-size: 1.5rem;
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