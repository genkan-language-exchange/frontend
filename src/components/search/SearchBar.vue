<template>
  <form>
    <fieldset>
      <button
        type="button"
        value="all"
        :class="activeIndex === 0 ? 'active' : ''"
        @click="handleClick(0, 'all')"
      >
        All
      </button>
      <button
        type="button"
        value="new"
        :class="activeIndex === 1 ? 'active' : ''"
        @click="handleClick(1, 'new')"
      >
        New
      </button>
      <button
        type="button"
        value="online"
        :class="activeIndex === 2 ? 'active' : ''"
        @click="handleClick(2, 'online')"
      >
        Online
      </button>
      <button
        type="button"
        value="custom"
        :class="activeIndex === 3 ? 'active' : ''"
        @click="handleClick(3, 'custom')"
      >
        <i class="fas fa-sliders-h"></i>
      </button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    handleClick(i, val) {
      this.activeIndex = i
      this.$emit('filter', val)
    }
  }
}
</script>

<style scoped>
form {
  position: sticky;
  top: 62px;
  margin: 60px auto 0;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: #353b48;
  z-index: 50;
}
fieldset {
  border: none;
}
button {
  width: 25%;
  box-sizing: border-box;
  padding: 8px;
  margin: 0 5px;
  border: none;
  color: #dcdde1;
  background-color: #353b48;
  border-radius: 5px;
  outline: none;
  font-weight: 600;
  font-size: 1.4rem;
}
button:last-child {
  width: 40px;
}
button:focus {
  background-color: #8c7ae6;
  color: white;
}
.active {
  background-color: #8c7ae6;
}
@media (min-width: 959px) {
  form {
    width: 60%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>