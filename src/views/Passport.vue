<template>
  <div>
    <template v-if="!user._id && !isError">
      <div id="loading">
        <TheLoadSpinner />
      </div>
    </template>
    <template v-if="isError">
      <div id="loading">
        <p>Invalid User ID 😣</p>
        <button type="button" @click.prevent="logMeOut"><span><i class="fas fa-sign-out-alt"></i></span>Sign out</button>
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
import { mapActions } from 'vuex'
import TheLoadSpinner from '@/components/TheLoadSpinner.vue'
import PassportCard from '@/components/passport/PassportCard.vue'
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
#loading {
  display: flex;
  flex-direction: column;
}
#loading>button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
#loading>button:hover {
  color: #fff;
  background-color: #8c7ae6;
}
#loading>button>span {
  margin-right: 10px;
}
</style>