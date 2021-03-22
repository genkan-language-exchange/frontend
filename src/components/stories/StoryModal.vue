<template>
<BaseModal>
  <div id="story-card">
    <div class="story-header" @click.prevent="() => goToPassport(story.userId.name, story.userId.identifier)">
      <div class="story-avatar">
        <img ref="avatar" src='@/assets/usure.png' alt="User" draggable="false">
      </div>
      <div class="user-info">
        <div>
          <h2>{{ story.userId.name }}<span>#{{ story.userId.identifier }}</span></h2>
        </div>
        <!-- languages -->
      </div>
      <!-- date posted top right -->
    </div>
    <div class="story-content">
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
      <button id="report" @click.prevent="$emit('report')"><i class="far fa-flag"></i></button>
    </div>
  </div>
</BaseModal>
</template>

<script>
  import BaseModal from '../BaseModal'
  export default {
    name: 'StoryModal',
    props: ['story'],
    components: {
      BaseModal,
    },
    methods: {
      goToPassport(name, identifier) {
        this.$router.push({ name: 'Passport', params: { id: `${name}.${identifier}` } })
      },
    },
    computed: {
      content() {
        return this.story.content.split('\n')
      }
    },
  }
</script>

<style scoped>
  h2, p {
    font-size: 1.6rem;
  }
  #story-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .story-header {
    height: 95px;
    min-height: 75px;
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .story-header .user-info span {
    font-size: 1.2rem;
  }
  .story-avatar {
    width: 95px;
    min-width: 95px;
    height: 95px;
    min-height: 95px;
    box-sizing: border-box;
    object-fit: contain;
    overflow: hidden;
    margin-right: 10px;
  }
  .story-avatar img {
    width: 100%;
    height: 100%;
  }
  
  .story-content {
    height: 75%;
    overflow-y: auto;
    padding: 15px;
    text-align: left;
    box-sizing: border-box;
    background-color: var(--off-white-main);
  }
  .story-content p {
    padding: 0;
    margin: 0;
    line-height: 1.33;
    color: var(--bg-color-main);
  }

  .story-footer {
    height: 40px;
    min-height: 35px;
    padding: 5px 5px 0;
    margin-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
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
    cursor: pointer;
    transition: all ease-out 0.2s;
  }
  .story-footer>button:hover {
    color: var(--theme-color-main);
    background-color: var(--off-white-main);
  }
  .story-footer>button:last-child {
    background-color: var(--theme-color-main);
    color: var(--off-white-main);
    margin-right: 3px;
    margin-left: auto;
  }
  .story-footer>button:last-child:hover {
    background-color: red;
  }

  .likes, .comments {
    position: relative;
  }
  .likes span,
  .comments span {
    position: absolute;
    font-family: 'Courier New', Courier, monospace;
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
</style>