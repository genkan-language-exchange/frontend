<template>
  <div id="base">
    <div id="obscured" @click.prevent="closeModal"></div>
    <div id="modal" :style="{ maxHeight: safeHeight }">
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
    computed: {
      safeHeight() {
        return screen.availHeight - 200 + 'px'
      }
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
    top: 65px;
    left: 0;
    right: 0;
    /* max-height: 55%; */
    box-sizing: border-box;
    z-index: 110;
    width: 90%;
    margin: 0 auto;
    background-color: var(--theme-color-main);
    border-radius: 5px;
    font-size: 1.6rem;
    overflow-x: hidden;
    overflow-y: scroll;
    transform: all 0.2s ease-out;
  }
  @media (min-width: 959px) {
    #modal {
      top: 10%;
      width: 500px;
      max-height: 80% !important;
    }
  }
</style>