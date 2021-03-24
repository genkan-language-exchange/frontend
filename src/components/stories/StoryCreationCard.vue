<template>
  <div id="creation-card">
    <h4 :style="content.trim().length > 899 && { color: `rgba(${parseInt(content.trim().length) - 745},0,0,1)` }">{{content.trim().length}}</h4>
    <form @submit.prevent="handleSubmit">
      <textarea name="story" id="story" cols="30" rows="10" v-model="content"></textarea>
      <!-- <input name="tags" type="text" placeholder="Tags"> -->
      <fieldset id="button-group" :disabled="!content.trim().length">
        <button type="button">Save Draft</button>
        <button type="submit">Post</button>
      </fieldset>
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
    methods: {
      handleSubmit() {
        console.log(this.content)
      }
    },
    watch: {
      content() {
        if (this.content.trim().length > 1000) this.content = this.content.slice(0,1000)
      }
    }
  }
</script>

<style scoped>
  #creation-card {
    margin: 100px auto;
    height: 60%;
    width: 100%;
    background-color: var(--theme-color-main);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h4 {
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
  }
  form {
    width: 97%;
    height: 92%;
    box-sizing: border-box;
    border: 2px solid var(--theme-color-main);
    border-bottom: 0;
    display: flex;
    flex-direction: column;
  }
  textarea {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--off-white-main);
    resize: none;
    margin: 0 auto;
    padding: 5px;
    border: none;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-family: 'Roboto', sans-serif;
  }
  textarea:focus {
    outline: none;
  }
  input,
  input:focus {
    color: gray;
    outline: none;
    border: none;
    padding: 5px 8px;
    border-top: 2px solid var(--theme-color-secondary);
    font-family: 'Roboto', sans-serif;
  }
  input:focus {
    color: var(--bg-color-main);
  }
  #button-group {
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    border-top: 2px solid var(--theme-color-secondary);
    border-bottom: 2px solid var(--theme-color-main);
  }
  button[type="button"] {
    border-right: 1px solid var(--theme-color-secondary);
    border-bottom-left-radius: 5px;
  }
  button[type="submit"] {
    border-left: 1px solid var(--theme-color-secondary);
    border-bottom-right-radius: 5px;
  }
  button {
    width: 100%;
    padding: 8px 0;
    outline: none;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 1.4rem;
    font-family: 'Roboto', sans-serif;
  }
  button:disabled {
    cursor: default;
    color: gray;
    background-color: var(--off-white-main);
  }
  button:disabled:hover,
  button:disabled:active {
    color: gray;
    background-color: var(--off-white-main);
  }
  button:hover,
  button:active {
    color: white;
    background-color: var(--theme-color-secondary);
  }

  @media (min-width: 959px) {
  #creation-card {
    height: 500px;
    width: 50%;
  }
}
</style>