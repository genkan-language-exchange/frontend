<template>
  <div>
    <PassportCard
      :avatar=avatar
      :user_name=user_name
      :user_identifier=user_identifier
      :user_from=user_from
      :user_lives=user_lives
      :user_learns=user_learns
      :user_speaks=user_speaks
      :user_intro=user_intro
      :user_goal=user_goal
    />
  </div>
</template>

<script>
import PassportCard from '@/components/PassportCard.vue'

export default {
  name: 'Passport',
  components: {
    PassportCard
  },
  data() {
    return {
      avatar: '',
      user_name: 'Username',
      user_identifier: '#0000',
      user_from: 'USA',
      user_lives: 'USA',
      user_learns: ['Japanese', 'Korean'],
      user_speaks: ['English'],
      user_intro: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolorem nostrum cum, dignissimos eum alias. Aut quos molestias omnis maiores sequi? Voluptatum laboriosam repellendus ad neque distinctio modi pariatur minus.',
      user_goal: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nisi minus quos ducimus, sapiente consequuntur.'
    }
  }

}
</script>

<style scoped>
  div {
    height: 100vh;
    margin: auto 0;
    display: flex;
    justify-content: center;
  }
</style>