<template>
  <div class="widget-editor" :class="highlightWidget && 'highlight'">
    <slot></slot>
    <slot name="baseWidget"></slot>
    <button ref="editButton" @click="$emit('setEditingWidget')"><i class="fas fa-pencil-alt"></i></button>
  </div>
</template>

<script>
export default {
  name: "BaseWidget",
  emits: ["setEditingWidget"],
  data() {
    return {
      highlightWidget: false
    }
  },
  methods: {
    setHighlightWidget() {
      this.highlightWidget = !this.highlightWidget
    }
  },
  mounted() {
    
    this.$refs.editButton.addEventListener('mouseenter', this.setHighlightWidget)
    this.$refs.editButton.addEventListener('mouseleave', this.setHighlightWidget)
    
  },
  beforeUnmount() {
    this.$refs.editButton.removeEventListener('mouseenter', this.setHighlightWidget)
    this.$refs.editButton.removeEventListener('mouseleave', this.setHighlightWidget)
  }
}
</script>

<style scoped>
  .widget-editor {
    position: relative;
    border-radius: 3px;
  }
  .widget-editor>button {
    position: absolute;
    float: right;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: 0.3;
    min-height: 30px;
    max-height: 30px;
    min-width: 30px;
    max-width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--yellow);
    border: 1px solid var(--theme-color-main);
    background-color: var(--theme-color-main);
    border-radius: 5px;
  }
  .highlight {
    background-color: var(--bg-color-secondary);
  }
  .widget-editor>button:hover {
    opacity: 1;
    color: var(--yellow);
  }
</style>