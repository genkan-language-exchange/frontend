<template>
  <div class="card" :style="newUser ? 'box-shadow: 0 0 8px 5px rgba(140, 122, 230, 0.4);' : 'box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.15);'">
    <div class="head">
      <div class="avatar"></div>
    </div>
    <div class="info">
      <h3>
        <span v-if="newUser" class="material-icons">fiber_new</span>
        {{user.name}}
      </h3>

      <div>
        <p>Speaks: {{user.matchSettings.languageKnow.join(', ')}}</p>
        <p>Learns: {{user.matchSettings.languageLearn.join(', ')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newUser: false,
    }
  },
  methods: {
    isUserNew() {
      const accountCreated = moment(this.user.matchSettings.accountCreated)
      const now = moment(Date.now())
      this.newUser = now.diff(accountCreated) < (1000 * 60 * 60 * 24 * 7)
    }
  },
  mounted() {
    this.isUserNew()
  }
}
</script>

<style scoped>
.card {
  height: 150px;
  width: 90%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  transition: background-color 0.2s ease-out;
}
.card:active {
  background-color: #353b48;
}
.head {
  display: flex;
  align-items: flex-start;
}
.avatar {
  width: 75px;
  height: 75px;
  background-color: #444;
  border-radius: 50%;
}
h3 {
  font-size: 1.6rem;
  font-weight: 600;
}
span {
  font-size: 1.8rem;
  color: #8c7ae6;
  vertical-align: middle;
}
.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.info p {
  font-size: 1.4rem;
  text-align: left;
  text-overflow: ellipsis;
  font-feature-settings: "liga" 0;
}
/* font-feature-settings: 'tnum'; */
/* font-variant-numeric: 'tabular-nums'; */
@media (min-width: 959px) {
  .card {
    width: 50%;
  }
  .card:hover {
    background-color: #353b48;
    cursor: pointer;
  }
}
</style>