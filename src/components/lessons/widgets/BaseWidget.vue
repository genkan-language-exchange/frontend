<template>
  <div class="widget">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseWidget",
}
</script>

<style scoped>
  .widget {
    position: relative;
    padding: 20px 10px;
    margin: 0;
    border-radius: 3px;
  }
  .widget>button {
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
  .widget>button:hover {
    opacity: 1;
    color: var(--yellow);
  }
@media (min-width: 968px) {
  .widget {
    margin: 0 10%;
  }
}
</style>