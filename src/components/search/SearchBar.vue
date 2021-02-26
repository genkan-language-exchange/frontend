<template>
  <form>
    <fieldset>
      <button type="button">All</button>
      <button type="button">New</button>
      <button type="button">Online</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
}
</script>

<style scoped>
form {
  position: sticky;
  top: 60px;
  margin: 60px auto 0;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: #353b48;
}
fieldset {
  border: none;
}
button {
  width: 32%;
  box-sizing: border-box;
  padding: 8px;
  border: none;
  color: #dcdde1;
  background-color: #353b48;
  border-radius: 5px;
  outline: none;
  font-weight: 600;
}
button:focus {
  background-color: #8c7ae6;
  color: white;
}
@media (min-width: 959px) {
  form {
    width: 60%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>