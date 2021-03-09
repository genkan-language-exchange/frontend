<template>
  <form>
    <fieldset>
      <button
        type="button"
        value="all"
        :class="activeFilter === 'all' ? 'active' : ''"
        @click="handleClick('all')"
      >
        All
      </button>
      <button
        type="button"
        value="new"
        :class="activeFilter === 'new' ? 'active' : ''"
        @click="handleClick('new')"
      >
        New
      </button>
      <button
        type="button"
        value="online"
        :class="activeFilter === 'online' ? 'active' : ''"
        @click="handleClick('online')"
      >
        Online
      </button>
      <button
        type="button"
        value="custom"
        :class="activeFilter === 'custom' ? 'active' : ''"
        @click="handleClick('custom')"
      >
        <i class="fas fa-sliders-h"></i>
      </button>
    </fieldset>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SearchBar',
  methods: {
    ...mapMutations({
      setActiveFilter: 'setActiveFilter'
    }),
    handleClick(value) {
      this.setActiveFilter({ value })
    },
  },
  computed: {
    ...mapGetters({
      activeFilter: 'activeFilter',
    }),
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