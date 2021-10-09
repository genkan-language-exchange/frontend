<template>
  <BaseModal>
    <div class="notification">
      <h2>{{ notification.title }}</h2>
      <p>{{ notification.content }}</p>
      <div>
        <p class="received-on">{{ createdAt }}</p>
        <button @click="handleDeleteNotification(notification._id)"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import BaseModal from '@/components/BaseModal'
export default {
  components: {
    BaseModal
  },
  props: ['notification'],
  methods: {
    ...mapActions(['removeNotification']),
    handleDeleteNotification(id) {
      this.removeNotification({ id })
    }
  },
  computed: {
    createdAt() {
      return moment(this.notification.createdAt).startOf().fromNow()
    }
  }
}
</script>

<style scoped>
  .notification {
    text-align: left;
    box-sizing: border-box;
    background-color: var(--off-white-main);
  }
  .notification h2 {
    padding-bottom: 20px;
    padding-left: 10px;
    background-color: var(--theme-color-main);
  }
  .notification>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--theme-color-main);
    padding-right: 10px;
  }
  .notification button {
    margin-top: 10px;
  }
  p {
    padding: 10px;
    color: var(--bg-color-main);
  }
  .received-on {
    color: var(--off-white-main);
    font-size: 1.4rem;
    padding: 0;
    padding-top: 15px;
    padding-left: 10px;
    text-transform: capitalize;
  }
  button {
    height: 30px;
    width: 30px;
    border: none;
    outline: none;
    border-radius: 3px;
    background-color: var(--theme-color-main);
    font-size: 18px;
    padding: 0;
    text-align: center;
    color: var(--off-white-main);
    cursor: pointer;
    transition: all ease-out 0.1s;
  }
  button:hover {
    background-color: var(--red);
  }
</style>