<template>
  <BaseWidget>
    <div class="table-widget">
      <table cellspacing="0">

        <template v-if="widget.hasHead">
          <thead>
            <tr>
              <th v-for="cell in widget.content[0]" :key="cell" :style="tableCellStyles">
                {{ cell }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in widget.content.slice(1)" :key="idx">
              <td v-for="cell in row" :key="cell" :style="tableCellStyles">
                {{ cell }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <caption></caption>
          </tfoot>
        </template>
        
        <template v-else>
          <tbody>
            <tr v-for="(row, idx) in widget.content" :key="idx">
              <td v-for="cell in row" :key="cell" :style="tableCellStyles">
                {{ cell }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <caption></caption>
          </tfoot>
        </template>

      </table>
    </div>
  </BaseWidget>
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

import BaseWidget from './BaseWidget.vue'
export default {
  name: "TableWidget",
  components: {
    BaseWidget
  },
  props: ["widget"],
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
table {
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--theme-color-secondary);
  border-radius: 3px;
}
thead, tbody, tr {
  width: 100%;
}
tr {
  background-color: var(--bg-color-secondary);
}
th, td {
  padding: 8px;
  border: 1px solid var(--theme-color-secondary);
}

@media (min-width: 968px) {
  table {
    width: 90%;
  }
}
</style>