<template>
  <template v-if="loading && !users.length">
    <TheLoadSpinner />
  </template>
  <template v-else>
    <SearchBar @triggerSearch="handleSearchFilter" />
    <transition-group tag="div" name="user-list" mode="out-in">
      <template v-if="users.length">
        <ResultCard v-for="user in users" :key="user._id" :user="user" />
      </template>
    </transition-group>
    <TheResultCardPlaceholder v-if="!users.length"/>
    <div ref="bottom"></div>
  </template>
</template>

<script>
import { mapGetters } from 'vuex'

import { getUsers } from '../api/userApi'
import SearchBar from '@/components/search/SearchBar.vue'
import ResultCard from '@/components/search/ResultCard.vue'
import TheResultCardPlaceholder from '@/components/search/TheResultCardPlaceholder.vue'
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'

export default {
  name: 'Search',
  components: {
    SearchBar,
    ResultCard,
    TheResultCardPlaceholder,
    TheLoadSpinner,
  },
  data() {
    return {
      users: [],
      loading: false,
      page: 1,
      limit: 5,
    }
  },
  methods: {
    handleSearchFilter() {
      this.page = 1
      this.findUsers()
    },
    async findUsers() {
      const response = await getUsers(this.activeFilter, this.page)
      .then(res => {
        this.loading = false
        return res
      })
      .catch(err => {
        this.loading = false
        return err
      })
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
    this.loading = true
    this.findUsers();
  },
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
  transform: rotate(-10deg) translateX(-150px);
}
.user-list-enter-to {
  opacity: 1;
  transform: rotate(0deg) translateX(0px);
}
.user-list-enter-active {
  transition: all 0.25s ease-out;
}

.user-list-leave-from {
  transform: rotate(0deg) translateX(0px);
  opacity: 1;
}
.user-list-leave-to {
  opacity: 0;
  transform: rotate(10deg) translateX(150px); 
}
.user-list-leave-active {
  transition: all 0.25s ease-out;
}

.user-list-move {
  transition: transform 0.5s ease;
}
</style>