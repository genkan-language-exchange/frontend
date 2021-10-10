<template>
  <div>
    <template v-if="!user && !isError">
      <div id="loading">
        <TheLoadSpinner />
      </div>
    </template>
    <template v-if="isError">
      <div id="loading">
        <p>Invalid User ID 😣</p>
      </div>
    </template>
    <template v-if="user?._id">
      <div class="passport">
        <PassportCard :user="user" />

        <TheAboutSection
          :profile="user.profile"
        />
      </div>
    </template>

    <TheFooter :isSelf="isSelf" @logMeOut="logMeOut" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import TheLoadSpinner from '@/components/TheLoadSpinner'
import PassportCard from '@/components/passport/PassportCard'
import TheAboutSection from '@/components/passport/TheAboutSection'
import TheFooter from '@/components/TheFooter'

import { getUserByNameIdentifierCombo } from '@/api/userApi'

export default {
  name: 'Passport',
  components: {
    TheLoadSpinner,
    PassportCard,
    TheAboutSection,
    TheFooter
  },
  data() {
    return {
      user: {},
      isError: false,
    }
  },
  methods: {
    ...mapActions(['logout']),
    async findUser(id) {
      const name = id.split('.')[0]
      const identifier = id.split('.')[1]

      const response = await getUserByNameIdentifierCombo(name, identifier)

      if (response.status !== "success") this.isError = true
      this.user = response.data[0]
    },
    logMeOut() {
      this.logout()
      this.$router.replace('/login')
    }
  },
  watch: {
    user(val) {
      if (val) this.isError = false
    }
  },
  mounted() {
    let id
    id = this.$store.getters.currentUser
    if (this.$route.params.id) id = this.$route.params.id
    this.findUser(id)
  },
  beforeRouteUpdate(to, from, next) {
    let id
    if (to.params.id !== from.params.id) {
      id = this.$store.getters.currentUser
      if (this.$route.params.id) id = this.$route.params.id
      this.user = {}
      this.findUser(id)
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
#loading {
  display: flex;
  flex-direction: column;
}
.passport {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>