<template>
  <div id="base">
    <div id="obscured" @click.prevent="closeModal"></div>
    <div id="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseModal",
    emits: ['closeModal'],
    methods: {
      closeModal() {
        this.$emit('closeModal')
      },
      handleKeyPress(e) {
        if (e.code.toLowerCase() === 'escape') this.closeModal()
      },
    },
    mounted() {
      window.addEventListener('keyup', this.handleKeyPress)
    },
    unmounted() {
      window.removeEventListener('keyup', this.handleKeyPress)
    }
  }
</script>

<style scoped>
  #base {
    position: relative;
    width: 100%;
  }
  #obscured {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0,0,0,0.7);
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }
  #modal {
    position: fixed;
    top: 10%;
    left: 0;
    right: 0;
    height: 70%;
    box-sizing: border-box;
    z-index: 101;
    width: 90%;
    margin: 0 auto;
    background-color: var(--theme-color-main);
    border-radius: 5px;
    overflow: hidden;
  }
  @media (min-width: 959px) {
    #modal {
      width: 50%;
      height: 700px;
    }
  }
  @media (min-height: 1000px) {
    #modal {
      height: 800px;
    }
  }
</style>