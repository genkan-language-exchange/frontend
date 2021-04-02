<template>
  <div id="filter-bar">
    <button
      type="button"
      value="all"
      :class="storyFilter === 'all' ? 'active' : ''"
      @click="handleClick('all')"
    >
      All
    </button>
    <button
      type="button"
      value="community"
      :class="storyFilter === 'community' ? 'active' : ''"
      disabled
      @click="handleClick('community')"
    >
      
      <abbr title="Not yet implemented">Community</abbr>
    </button>
    <button
      type="button"
      value="follow"
      disabled
      :class="storyFilter === 'follow' ? 'active' : ''"
      @click="handleClick('follow')"
    >
      <abbr title="Not yet implemented">Following</abbr>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SearchBar',
  methods: {
    ...mapMutations(['setStoryFilter']),
    handleClick(value) {
      this.setStoryFilter({ value })
    },
  },
  computed: {
    ...mapGetters(['storyFilter']),
  }
}
</script>

<style scoped>
#filter-bar {
  position: sticky;
  top: 55px;
  margin: 55px auto 0;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: var(--bg-color-secondary);
  z-index: 50;
}
button {
  width: 30%;
  box-sizing: border-box;
  padding: 8px;
  margin: 0 5px;
  border: none;
  color: var(--off-white);
  background-color: var(--bg-color-secondary);
  border-radius: 5px;
  outline: none;
  font-weight: 600;
  font-size: 1.4rem;
  cursor: pointer;
}
button:focus, button:hover {
  background-color: var(--theme-color-main);
  color: var(--off-white-main);
}
button:disabled,
button:disabled:hover {
  cursor: default;
  color: var(--bg-color-main);
  background: var(--bg-color-secondary);
}
.active {
  background-color: var(--theme-color-main);
}
@media (min-width: 959px) {
  #filter-bar {
    top: 62px;
    margin-top: 60px;
    width: 60%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>