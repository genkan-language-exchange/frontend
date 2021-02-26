<template>
  <template v-if="!users.length">
    <div id="loading">
      <LoadSpinner />
    </div>
  </template>
  <template v-else>
    <SearchBar />
    <div v-for="user in users" :key=user._id>
      <template v-if="user.active">
        <ResultCard :user="user" />
      </template>
    </div>
  </template>
</template>

<script>
import axios from 'axios';
import LoadSpinner from '@/components/LoadSpinner.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import ResultCard from '@/components/search/ResultCard.vue'

export default {
  name: 'Search',
  components: {
    LoadSpinner,
    SearchBar,
    ResultCard
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    async findUsers() {
      const { data: { data } } = await axios.get('https://genkan.herokuapp.com/api/v1/users')

      this.users = data.users;
      console.log(data.users);
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