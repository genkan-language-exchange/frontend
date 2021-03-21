<template>
  <div class="story-card">
    <div class="story-header">
      <div class="story-avatar">
        <img ref="avatar" src='@/assets/avatar1.png' alt="User" draggable="false">
      </div>
      <div class="user-info">
        {{ userId.name }}
        <!-- languages -->
      </div>
      <!-- date posted top right -->
    </div>
    <div class="story-content">
      <p v-for="(line, idx) in content" :key="idx">{{line}}</p>
    </div>
    <div class="story-footer">
      <!-- filled heart: <i class="fas fa-heart"></i>-->
      <!-- filled bubble (has >1 reply): <i class="fas fa-comment-dots"></i> -->
      <!-- long-press for other reactions - <i class="fas fa-dumpster-fire"></i> -->
      <button><i class="far fa-heart"></i></button>
      <button><i class="far fa-comment-dots"></i></button>
      <button><i class="far fa-flag"></i></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StoryCard",
    props: ['userId', 'story'],
    computed: {
      content() {
        return this.story.content.split('\n')
      }
    }
  }
</script>

<style scoped>
  .story-card {
    height: 250px;
    width: 95%;
    background-color: var(--bg-color-secondary);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: stretch;
  }
  .story-avatar {
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    object-fit: contain;
    overflow: hidden;
    border-radius: 50%;
    background-color: chartreuse;
  }
  .story-avatar img {
    width: 100%;
    height: 100%;
  }
  .story-header {
    height: 25%;
    padding: 5px;
    border-bottom: 1px solid chartreuse;
    display: flex;
  }
  .story-header .user-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .story-content {
    height: 60%;
    overflow-y: auto;
  }
  .story-footer {
    height: 15%;
    padding: 5px;
    border-top: 1px solid chartreuse;
  }
  .story-footer>button {
    height: 30px;
    width: 30px;
    margin: 3px;
    border: none;
    outline: none;
    border-radius: 3px;
    background-color: var(--theme-color-main);
    color: var(--off-white-main);
    float: left;
  }
  .story-footer>button:last-child {
    background-color: var(--bg-color-main);
    color: var(--theme-color-main);
    float: right;
  }
@media (min-width: 959px) {
  .story-card {
    width: 60%;
    height: 300px;
  }
}
</style>