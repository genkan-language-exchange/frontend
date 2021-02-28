<template>
  <div>
    <template v-if="!user._id && !isError">
      <div id="loading">
        <TheLoadSpinner />
      </div>
    </template>
    <template v-if="isError">
      <div id="loading">
        <p>Invalid User ID :(</p>
      </div>
    </template>
    <template v-if="user._id">
      <div id="passport">
        <PassportCard :user="user" />
      </div>
    </template>
  </div>
</template>

<script>
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import PassportCard from '@/components/profile/PassportCard.vue'
import { getUserByNameIdentifierCombo } from '../api/userApi'

export default {
  name: 'Passport',
  components: {
    TheLoadSpinner,
    PassportCard
  },
  data() {
    return {
      user: {},
      isError: false,
      errorMessage: String,
    }
  },
  methods: {
    async findUser(id) {
      const name = id.split('.')[0]
      const identifier = id.split('.')[1]

      const response = await getUserByNameIdentifierCombo(name, identifier)

      if (!response) this.isError = true
      this.user = response
    }
  },
  mounted() {
    this.findUser(this.$route.params.id)
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      this.user = {}
      this.findUser(to.params.id)
      next()
    }
  }
}
</script>

<style scoped>
div {
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
}
#passport {
  margin: 95px auto;
}
</style>