<template>
  <div id="comment-adder">
    <form @submit.prevent="handleSubmit">
      <textarea
        name="comment"
        v-model="content"
        ref="comment"
      />
      <button type="submit" :disabled="!notEmpty">
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    emits: ['finished'],
    props: ['composing'],
    data() {
      return {
        content: ""
      }
    },
    methods: {
      submitOnEnter(event){
        if (event.which === 13) {
          if (!event.shiftKey) {
            event.target.form.dispatchEvent(new Event("submit", { cancelable: true }))
            event.preventDefault() // Prevents the addition of a new line
          }
        }
      },
      handleSubmit() {
        if (!this.notEmpty) return
        this.$emit('finished', this.content.trim())
        this.content = ""
      }
    },
    computed: {
      notEmpty() {
        return this.content.trim().length
      }
    },
    mounted() {
      document.activeElement.blur()
      this.$refs.comment.focus()
      this.$refs.comment.addEventListener("keypress", this.submitOnEnter)
    },
    beforeUnmount() {
      this.$refs.comment.removeEventListener("keypress", this.submitOnEnter)
    },
  }
</script>

<style scoped>
  #comment-adder {
    background-color: var(--theme-color-main);
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 5px;
    height: 75px;
  }
  form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  textarea {
    padding: 5px 8px;
    margin: 0;
    box-sizing: border-box;
    width: 85%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    font-size: 1.6rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-family: "Roboto", Tahoma, sans-serif;
    color: var(--bg-color-main);
    overflow: auto;
  }
  button {
    width: 15%;
    height: 100%;
    padding: 5px 8px;
    margin: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--off-white-main);
    background-color: #0097e6;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  button:hover {
    background-color: #00a8ff;
  }
  button:disabled,
  button:disabled:hover {
    cursor: default;
    color: gray;
    background-color: darkgray;
  }

</style>