<template>
  <section id="filters">
    <div>
      <h3>My Privacy Filters:</h3>
      <p>These settings change who can find you and who you can find</p>
    </div>

    <div class="filter">
      <h4>Age Range</h4>
      <p>{{filterSettings.ages.join(' - ')}}</p>
    </div>

    <div class="filter">
      <h4>I want to meet</h4>
      <p id="genders" v-if="filterSettings.genders.length > 2">everyone</p>
      <p id="genders" v-else>{{filterSettings.genders.join(', ')}}</p>
      <span>from</span>
      <p v-if="filterSettings.length > 0">
        {{filterSettings.resides.join(', ')}}
      </p>
      <p>everywhere</p>
    </div>

    <div class="filter">
      <h4>My ideal friend speaks</h4>
      <p v-if="filterSettings.languagesKnow?.length">{{filterSettings.languagesKnow.join(', ')}}</p>
      <p v-else>any language</p>
      <h4>and studies</h4>
      <p v-if="filterSettings.languagesSpeak?.length">{{filterSettings.languagesSpeak.join(', ')}}</p>
      <p v-else>any language</p>
    </div>

    <div class="filter">
      <h4>Show my age</h4>
      <p v-if="filterSettings.showOwnAge">Yes</p>
      <p v-else>No</p>
    </div>

    <div class="filter">
      <h4>Show my online status</h4>
      <p v-if="filterSettings.showOnlineStatus">Yes</p>
      <p v-else>No</p>
    </div>
    
    <div class="filter">
      <h4>Show my profile picture before matching</h4>
      <p v-if="filterSettings.blurBeforeMatch">Yes</p>
      <p v-else>No</p>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['filterSettings']
  }
</script>

<style scoped>
h3, h4 { color: var(--theme-color-main); }
h3, h4, p { margin: 0; }
#filters {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid var(--theme-color-main);
  gap: 30px;
}
.filter p {
  text-decoration: underline;
  cursor: pointer;
}
.filter p:hover {
  color: var(--theme-color-secondary);
}
</style>