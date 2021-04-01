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
  emits: ['triggerSearch'],
  methods: {
    ...mapMutations({
      setActiveFilter: 'setActiveFilter'
    }),
    handleClick(value) {
      this.setActiveFilter({ value })
      this.$emit("triggerSearch")
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
  top: 55px;
  margin: 55px auto 0;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: var(--bg-color-secondary);
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
  color: var(--off-white-main);
  background-color: var(--bg-color-secondary);
  border-radius: 5px;
  outline: none;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
}
button:hover, button:focus {
  background-color: var(--theme-color-main);
  color: var(--off-white-main);
}
button:last-child {
  width: 40px;
}
.active {
background-color: var(--theme-color-main);
}
@media (min-width: 959px) {
  form {
    top: 62px;
    margin-top: 60px;
    width: 60%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>