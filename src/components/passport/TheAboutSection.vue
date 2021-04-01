<template>
  <section id="about">
    <div>
      <h3>About:</h3><p>{{about}}</p>
    </div>
    <div>
      <h3>Language Goal:</h3><p>{{languageGoal}}</p>
    </div>
    <div>
      <h3>Interests:</h3><p>{{interests.join(', ')}}</p>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['about', 'languageGoal', 'interests']
  }
</script>

<style scoped>

</style>