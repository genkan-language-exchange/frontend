<template>
  <BaseModal @closeModal="$emit('closeModal')">
    <div id="widgets-view">
      <div
        class="widgets"
        v-for="w in availableWidgets"
        :key="w"
        :class="`${w} ${w === newWidget && 'selected'}`"
        @click="selectWidget(w)"
      >
        <div v-if="w === 'TitleWidget'">
          <p>Title</p>
          <div></div>
        </div>

        <div v-if="w === 'TextWidget'">
          <p>Text</p>
          <div></div>
        </div>
        
        <div v-if="w === 'TableWidget'">
          <p>Table</p>
          <div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        <div v-if="w === 'TranslationWidget'">
          <p>Translation</p>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>

      </div>
      <div id="actions">
        <button @click="$emit('closeModal')">Cancel</button>
        <button :disabled="newWidget === ''" @click.prevent="handleAddWidget">Add Widget</button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue'
export default {
  components: {
    BaseModal
  },
  emits: ['closeModal'],
  props: ['addWidget'],
  data() {
    return {
      availableWidgets: ["TitleWidget", "TextWidget", "TableWidget", "TranslationWidget"],
      newWidget: "",
    }
  },
  methods: {
    selectWidget(w) {
      if (w === this.newWidget) return this.newWidget = ""
      this.newWidget = w
    },
    handleAddWidget() {
      this.addWidget(this.newWidget)
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
#widgets-view {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 600px;
  overflow-y: scroll;
}
#actions {
  display: flex;
  justify-content: space-between;
}
#actions button {
  cursor: pointer;
  color: var(--theme-color-main);
  border: 2px solid var(--off-white-main);
  background-color: var(--off-white-main);
  border-radius: 5px;
  padding: 8px;
}
#actions button:hover {
  color: var(--off-white-main);
  border-color: var(--off-white-main);
  background-color: var(--theme-color-secondary);
}
#actions button:first-child {
  color: var(--red);
}
#actions button:first-child:hover {
  color: var(--off-white-main);
  background-color: var(--red);
  border-color: var(--red)
}

.widgets {
  margin-bottom: 20px;
  cursor: pointer;
}
.widgets:hover {
  filter: brightness(0.9)
}

.TableWidget, .TextWidget, .TitleWidget, .TranslationWidget {
  background-color: var(--off-white-main);
  padding: 10px;
  border-radius: 5px;
  color: var(--bg-color-main);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p {
  margin: 0 0 10px;
  text-align: center;
  font-size: 2rem;
}

.selected {
  background-color: var(--yellow);
  filter: brightness(1) !important;
}

.TitleWidget>div>div, .TextWidget>div>div {
  height: 30px;
  border-radius: 5px;
  background-color: var(--gray);
}
.TextWidget>div>div {
  height: 75px;
}
.TableWidget>div>div, .TranslationWidget>div>div {
  display: flex;
  justify-content: center;
  margin: 0 30px;
}
.TranslationWidget>div>div {
  flex-direction: column;
}
.TableWidget>div>div>div>div, .TranslationWidget>div>div>div {
  margin: 0px 10px 20px;
  padding: 20px 50px;
  background-color: var(--gray);
  border-radius: 5px;
}

@media (min-width: 959px) {
  #widgets-view {
    max-height: 100%;
  }
}
</style>