<template>
  <div id="creation-card">
    <form @submit.prevent="">
      <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
    </form>
  </div>
</template>

<script>
  export default {
    name: "StoryCreationCard",
    data() {
      return {
        content: ""
      }
    },
  }
</script>

<style scoped>
  #creation-card {
    margin: 100px 0;
    height: 100%;
    width: 100%;
  }
  form {
    background-color: chartreuse;
    border: 2px solid var(--theme-color-main);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  textarea {
    height: 100%;
    width: 350px;
    resize: none;
    margin: 0 auto;
    padding: 5px;
    border: none;
    font-family: 'Roboto', sans-serif;
  }
  button {
    width: 100%;
    padding: 8px 0;
    outline: none;
    border: none;
    box-sizing: border-box;
    border-bottom: 2px solid var(--theme-color-main);
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
  }
  button:hover,
  button:active {
    color: white;
    background-color: var(--theme-color-main);
  }
</style>