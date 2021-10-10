<template>
  <section id="about">
    <div>
      <h3>About:</h3><p>{{ profile.about ? profile.about : "I'm a mysterious person." }}</p>
    </div>
    <div v-if="profile.languageGoal">
      <h3>Language Goal:</h3><p>{{ profile.languageGoal }}</p>
    </div>
    <div v-if="profile.interests.length">
      <h3>Interests:</h3><p><span class="interest" v-for="interest in profile.interests" :key="interest">{{ interest }}</span></p>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['profile']
  }
</script>

<style scoped>
  #about {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 2px solid var(--theme-color-main);
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 20px;
  }
  #about div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  h3 {
    color: var(--theme-color-main);
  }
  h3, p {
    margin: 0;
    padding: 0;
  }
  p {
    margin-top: 3px;
  }
  .interest {
    padding: 6px 12px;
    margin: 0 5px;
    border-radius: 25px;
    background-color: var(--theme-color-main);
    cursor: pointer;
  }
  .interest:hover {
    background-color: var(--theme-color-secondary);
    box-shadow: 0 2px 8px 4px rgba(0,0,0,0.2);
  }
</style>