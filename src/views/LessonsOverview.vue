<template>
  <div class="container">
    
    <section>
      <h2 class="title">Culture</h2>
    </section>
    <section>
      <h2 class="title">Language</h2>
    </section>

  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.container {
  margin: 0;
  display: flex;
  padding-top: 55px;
  height: calc(100vh - 55px);
  font-size: 1.8rem;
}
.container section:first-child {
  border-right: 1px solid var(--theme-color-main);
}
.container section:nth-child(2) {
  border-left: 1px solid var(--theme-color-main);
}
section {
  border-top: 2px solid var(--theme-color-main);
  padding-top: 5px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in;
}
section:hover, section:active {
  background-color: var(--theme-color-main);
}
@media (min-width: 959px) {
  h2.title {
    font-size: 4rem;
  }
}
</style>