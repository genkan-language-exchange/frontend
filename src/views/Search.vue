<template>
  <template v-if="!users.length">
    <div id="loading">
      <TheLoadSpinner />
    </div>
  </template>
  <template v-else>
    <SearchBar @triggerSearch="findUsers" />
    <transition-group tag="div" name="user-list">
      <div v-for="user in users" :key="user._id">
        <ResultCard :user="user" />
      </div>
    </transition-group>
  </template>
</template>

<script>
import { mapGetters } from 'vuex'

import { getUsers } from '../api/userApi'
import SearchBar from '@/components/search/SearchBar.vue'
import ResultCard from '@/components/search/ResultCard.vue'
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'

export default {
  name: 'Search',
  components: {
    TheLoadSpinner,
    SearchBar,
    ResultCard
  },
  data() {
    return {
      users: [],
    }
  },
  methods: {
    async findUsers() {
      const response = await getUsers(this.activeFilter)
      this.users = response.data
    },
  },
  computed: {
    ...mapGetters({
      activeFilter: 'activeFilter',
      currentUser: 'currentUser',
    }),
  },
  mounted() {
    this.findUsers();
  }
}
</script>

<style scoped>
#loading {
  display: flex;
  justify-content: center;
}
.user-list {
  overflow-x: hidden;
}
.user-list>div {
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
}
h2 {
  font-size: 1.8rem;
}

.user-list-enter-from {
  opacity: 0;
}
.user-list-enter-to {
  opacity: 1;
}
.user-list-enter-active {
  transition: all 0.3s ease-out;  
}


.user-list-leave-from {
  opacity: 1;
}
.user-list-leave-to {
  opacity: 0;
}
.user-list-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
  width: 100%;
}

.user-list-move {
  transition: transform 0.5s ease;
}
</style>