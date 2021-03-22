<template>
  <div class="story-card">
    <div class="story-header" @click.prevent="() => goToPassport(userId.name, userId.identifier)">
      <div class="story-avatar">
        <img ref="avatar" src='@/assets/usure.png' alt="User" draggable="false">
      </div>
      <div class="user-info">
        {{ userId.name }}
        <!-- languages -->
      </div>
      <!-- date posted top right -->
    </div>
    <div class="story-content" @click.prevent="$emit('openModal', story._id)">
      <p v-for="(line, idx) in content" :key="idx">{{/^\s*$/.test(line) ? '&nbsp;' : line}}</p>
    </div>
    <div class="story-footer">
      <button class="likes">
        <span v-if="story.likes?.length">{{story.likes.length}}</span>
        <i class="fa-heart" :class="story.likes?.length ? 'fas' : 'far'"></i>
      </button>
      <button class="comments">
        <span v-if="story.comments?.length">{{story.comments.length}}</span>
        <i class="fa-comment-dots" :class="story.comments?.length ? 'fas' : 'far'"></i>
      </button>
      <button><i class="far fa-flag"></i></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StoryCard",
    emits: ['openModal'],
    props: ['userId', 'story'],
    methods: {
      goToPassport(name, identifier) {
        this.$router.push({ name: 'Passport', params: { id: `${name}.${identifier}` } })
      }
    },
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
    margin-right: 10px;
  }
  .story-avatar img {
    width: 100%;
    height: 100%;
  }
  .story-header {
    height: 25%;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .story-header:hover {
    background-color: var(--theme-color-main);
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
    padding: 5px 15px;
    text-align: left;
    cursor: pointer;
  }
  .story-content p {
    padding: 0;
    margin: 0;
    line-height: 1.33;
  }
  .story-footer {
    height: 15%;
    padding: 5px;
  }
  .story-footer>button {
    height: 30px;
    width: 30px;
    margin: 3px 15px 3px 3px;
    border: none;
    outline: none;
    border-radius: 3px;
    background-color: var(--theme-color-main);
    font-size: 18px;
    padding: 0;
    text-align: center;
    color: var(--off-white-main);
    float: left;
    cursor: pointer;
    transition: all ease-out 0.2s;
  }
  .story-footer>button:hover {
    color: var(--theme-color-main);
    background-color: var(--off-white-main);
  }
  .story-footer>button:last-child {
    background-color: var(--bg-color-main);
    color: var(--theme-color-main);
    float: right;
    margin-right: 3px;
  }
  .story-footer>button:last-child:hover {
    color: red;
  }

  .likes, .comments {
    position: relative;
  }
  .likes span,
  .comments span {
    position: absolute;
    top: -10px;
    right: -10px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    z-index: 10;
    background-color: var(--theme-color-main);
    border: 2px solid var(--theme-color-secondary);
    box-sizing: border-box;
    font-size: 1.3rem;
    font-feature-settings: 'tnum';
    font-variant-numeric: 'tabular-nums';
    color: white !important;
  }

@media (min-width: 959px) {
  .story-card {
    width: 50%;
    height: 300px;
  }
}
</style>