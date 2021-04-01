<template>
  <div>
    <h2>This user's account does not exist</h2>
    <button @click.prevent="goToMain">Home</button>
  </div>
</template>

<script>
  export default {
    name: 'ResourceNotFound',
    methods: {
      goToMain() {
        this.$router.push('/')
      }
    },
  }
</script>

<style scoped>
  div {
    margin-top: 100px;
  }
  h2 {
    font-size: 2rem;
  }
  button {
    padding: 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--bg-color-secondary);
    color: var(--off-white-main);
    font-weight: 600;
    font-size: 1.6rem;
  }
  button:hover {
    background-color: var(--theme-color-main);
  }
</style>