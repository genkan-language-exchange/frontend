<template>
  <template v-if="!users.length">
    <div id="loading">
      <TheLoadSpinner />
    </div>
  </template>
  <template v-else>
    <SearchBar />
    <transition-group tag="div" name="user-list">
      <div v-for="user in filteredUsers" :key="user._id">
        <template v-if="user.active && user.accountStatus !=='banned'">
          <ResultCard :user="user" />
        </template>
      </div>
    </transition-group>
  </template>
</template>

<script>
import { mapGetters } from 'vuex'

import { getUsersMany } from '../api/userApi'
import SearchBar from '@/components/search/SearchBar.vue'
import ResultCard from '@/components/search/ResultCard.vue'
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'

import checkAccountAge from '../util/checkAccountAge.js'
import checkLastOnline from '../util/checkLastOnline.js'

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
      const response = await getUsersMany()
      const removeSelf = response.filter(user => `${user.name}.${user.identifier}` !== this.currentUser)
      this.users = removeSelf
    },
  },
  computed: {
    ...mapGetters({
      activeFilter: 'activeFilter',
      currentUser: 'currentUser',
    }),
    filteredUsers() {
      switch(this.activeFilter) {
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