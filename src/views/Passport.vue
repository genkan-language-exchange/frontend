<template>
  <template v-if="!user._id && !isError">
    <div id="loading">
      <LoadSpinner />
    </div>
  </template>
  <template v-if="isError">
    <div id="loading">
      <p>Invalid User ID :(</p>
    </div>
  </template>
  <template v-if="user._id">
    <div>
      <PassportCard :user="user" />
    </div>
  </template>
</template>

<script>
import LoadSpinner from '@/components/LoadSpinner.vue'
import PassportCard from '@/components/profile/PassportCard.vue'
import { getUserByNameIdentifierCombo } from '../api/userApi'

export default {
  name: 'Passport',
  components: {
    LoadSpinner,
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
    async findUser() {
      const name = this.$route.params.id.split('.')[0]
      const identifier = this.$route.params.id.split('.')[1]

      const response = await getUserByNameIdentifierCombo(name, identifier)

      if (!response) this.isError = true
      this.user = response
    }
  },
  mounted() {
    this.findUser()
  },
}
</script>

<style scoped>
#loading {
  margin-top: 150px;
}
div {
  height: 100%;
  margin: 95px auto;
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
}
</style>