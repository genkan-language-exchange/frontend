<template>
  <div class="container">
    <template v-if="loading && !users.length">
      <TheLoadSpinner />
    </template>
    <template v-else>
      <div class="card-deck">
        <SearchBar @triggerSearch="handleSearchFilter" />
        <transition-group tag="div" name="rotate" mode="out-in">
          <template v-if="users.length">
            <ResultCard v-for="user in users" :key="user._id" :user="user" />
          </template>
        </transition-group>
        <TheResultCardPlaceholder v-if="!users.length"/>
        <div ref="bottom"></div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { getUsers } from '@/api/userApi'
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
  created() {
    this.loading = true
    this.findUsers();
  },
}
</script>

<style scoped>
.card-deck {
  padding-top: 60px;
}
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
</style>