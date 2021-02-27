<template>
  <template v-if="!users.length">
    <div id="loading">
      <LoadSpinner />
    </div>
  </template>
  <template v-else>
    <SearchBar @filter="filterSettings" />
    <div v-for="user in filteredUsers" :key="user._id">
      <template v-if="user.active && user.accountStatus !=='banned'">
        <ResultCard :user="user" />
      </template>
    </div>
  </template>
</template>

<script>
import { getUsersMany } from '../api/userApi'
import SearchBar from '@/components/search/SearchBar.vue'
import ResultCard from '@/components/search/ResultCard.vue'
import LoadSpinner from '@/components/LoadSpinner.vue'

import checkAccountAge from '../util/checkAccountAge.js'
import checkLastOnline from '../util/checkLastOnline.js'

export default {
  name: 'Search',
  components: {
    LoadSpinner,
    SearchBar,
    ResultCard
  },
  inject: ['currentUser'],
  data() {
    return {
      users: [],
      filterType: 'all',
    }
  },
  methods: {
    async findUsers() {
      const response = await getUsersMany()
      const removeSelf = response.filter(user => `${user.name}.${user.identifier}` !== this.currentUser)
      this.users = removeSelf
    },
    filterSettings(e) {
      const filters = ['all', 'new', 'online', 'custom']
      const filterIndex = filters.findIndex(i => i === e)
      this.filterType = filters[filterIndex]
    }
  },
  computed: {
    filteredUsers() {
      switch(this.filterType) {
        case 'all':
          return this.users
        case 'new':
          return this.users.filter(user => checkAccountAge(user.matchSettings.accountCreated))
        case 'online':
          return this.users.filter(user => checkLastOnline(user.matchSettings.lastSeen))
        case 'custom':
          return this.users
        default:
          return this.users
      }
    }
  },
  mounted() {
    this.findUsers();
  }
}
</script>

<style scoped>
#loading {
  margin-top: 150px;
}
div {
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
}
h2 {
  font-size: 1.8rem;
}
</style>