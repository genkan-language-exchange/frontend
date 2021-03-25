<template>
  <div id="container">
  <transition-group name="creation" mode="out-in">
    <div id="creation-card" v-if="!sending">
      <div id="character-limit-box">
        <h4 :style="content.trim().length > 899 && { color: `rgba(${parseInt(content.trim().length) - 745},0,0,1)` }">{{content.trim().length}} / 1000</h4>
      </div>
      <form @submit.prevent="() => handleSubmit('visible')">
        <textarea name="story" id="story" cols="30" rows="10" v-model="content"></textarea>
        <!-- <input name="tags" type="text" placeholder="Tags"> -->
        <fieldset id="button-group" :disabled="!content.trim().length">
          <button type="button" @click="() => handleSubmit('draft')"><i class="far fa-save"></i></button>
          <button type="submit"><i class="fas fa-paper-plane"></i></button>
        </fieldset>
      </form>
    </div>
    <div v-else-if="loading" id="long-load">
      <h3>Hold on there, tomodachi 🤠</h3>
      <p>The server is waking up</p>
      <TheLoadSpinner />
    </div>
  </transition-group>
  
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { createStory } from '../../api/storyApi'
  import TheLoadSpinner from '../TheLoadSpinner'
  export default {
    name: "StoryCreationCard",
    components: {
      TheLoadSpinner
    },
    data() {
      return {
        content: "",
        loading: false,
        sending: false,
        timer: 0,
      }
    },
    methods: {
      handleSubmit(val) {
        this.sending = true
        this.sendStory(val)

        this.timer = setTimeout(() => {
          this.loading = true
        }, 2000)
      },
      async sendStory(mode) {
        const payload = {
          content: this.content.trim(),
          status: mode
        }
        const response = await createStory(payload)
        console.log(response)
        clearTimeout(this.timer)
      }
    },
    computed: {
      ...mapGetters({
        userInfoId: 'id',
      }),
    },
    watch: {
      content() {
        if (this.content.trim().length > 1000) this.content = this.content.slice(0,1000)
      }
    }
  }
</script>

<style scoped>
  #long-load h3, #long-load p {
    margin: 0 0 10px;
    padding: 0;
    font-size: 2rem;
  }
  #long-load p {
    font-size: 1.4rem;
  }
  #container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    height: 65vh;
    margin: 60px auto;
    padding: 40px 0;
    overflow-x: hidden;
  }
  #creation-card {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 7px 0;
    background-color: var(--theme-color-main);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #character-limit-box {
    padding: 5px;
    margin-bottom: 8px;
    width: 10%;
    background-color: white;
    border-radius: 5px;
  }
  h4 {
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
    color: var(--bg-color-main);
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
    font-size: 1.6rem;
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
    color: var(--bg-color-main);
    transition: all 0.25s ease-out;
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
    color: var(--off-white-main);
    background-color: var(--theme-color-secondary);
  }

  
  .creation-enter-from {
    opacity: 0;
    transform: translate(-500px, -500px) scale(0.3) rotate(-30deg);
  }
  .creation-enter-to {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  .creation-enter-active {
    transition: all 0.3s ease-out;  
  }


  .creation-leave-from {
    opacity: 1;
    transform: translateY(0, 0) scale(1) rotate(0deg);
  }
  .creation-leave-to {
    opacity: 0;
    transform: translate(500px, -500px) scale(0.3) rotate(30deg);
  }
  .creation-leave-active {
    transition: all 0.3s ease-out;
    width: 100%;
    position: absolute;
  }

@media (min-width: 959px) {
  #creation-card {
    height: 500px;
    width: 50%;
  }
  textarea {
    font-size: 1.4rem;
  }
}
</style>