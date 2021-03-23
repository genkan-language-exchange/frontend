<template>
<BaseModal>
  <transition-group mode="out-in" name="story-modal">
    <template v-if="freshStory._id">
      <div id="story-card">
        <div class="story-header" @click.prevent="() => goToPassport(freshStory.userId.name, freshStory.userId.identifier)">
          <div class="story-avatar">
            <img ref="avatar" src='@/assets/usure.png' alt="User" draggable="false">
          </div>
          <div class="user-info">
            <div>
              <h2>{{ freshStory.userId.name }}<span>#{{ freshStory.userId.identifier }}</span></h2>
            </div>
            <!-- languages -->
          </div>
          <!-- date posted top right -->
        </div>

        <div class="content">
          <section id="story-content">
            <p v-for="(line, idx) in content" :key="idx">{{/^\s*$/.test(line) ? '&nbsp;' : line}}</p>
          </section>
          <section id="user-comments">
            <CommentsSection v-for="(comment, i) in orderedComments" :key="i" :comment="comment" />
          </section>
        </div>

        <div class="story-footer">
          <p v-if="freshStory.likes?.length">{{freshStory.likes.length}}</p>
          <button class="likes">  
            <i class="fa-heart" :class="freshStory.likes?.length ? 'fas' : 'far'"></i>
          </button>

          <p v-if="freshStory.comments?.length">{{freshStory.comments.length}}</p>
          <button class="comments">
            <i class="fa-comment-dots" :class="freshStory.comments?.length ? 'fas' : 'far'"></i>
          </button>
          <button id="report" @click.prevent="$emit('report')"><i class="far fa-flag"></i></button>
        </div>
      </div>
    </template>

    <template v-else>
      <div id="story-card">
        <div class="story-header">
          <div class="story-avatar">
            <img ref="avatar" src='@/assets/usure.png' alt="User" draggable="false">
          </div>
          <div class="user-info">
            <div>
              <h2>{{ story.userId.name }}<span>#{{ story.userId.identifier }}</span></h2>
            </div>
            <!-- languages -->
          </div>
        </div>
        <div class="content">
          <div :style="{ margin: '150px auto' }">
            <TheLoadSpinner />
          </div>
        </div>
        <div class="story-footer">
          <button class="likes"><i class="far fa-heart"></i></button>
          <button class="comments"><i class="far fa-comment-dots"></i></button>
          <button id="report"><i class="far fa-flag"></i></button>
        </div>
      </div>
    </template>
  </transition-group>
</BaseModal>
</template>

<script>
  import { getStory } from '../../api/storyApi'
  import BaseModal from '../BaseModal'
  import CommentsSection from './CommentsSection'
  import TheLoadSpinner from '../TheLoadSpinner'
  export default {
    name: 'StoryModal',
    props: ['story'],
    data() {
      return {
        freshStory: {}
      }
    },
    components: {
      BaseModal,
      CommentsSection,
      TheLoadSpinner,
    },
    methods: {
      async refreshStory() {
        const response = await getStory(this.story._id)
        if (response) this.freshStory = response
      },
      goToPassport(name, identifier) {
        this.$router.push({ name: 'Passport', params: { id: `${name}.${identifier}` } })
      },
    },
    computed: {
      content() {
        return this.story.content.split('\n')
      },
      orderedComments() {
        const ordered = this.story.comments
        return ordered.sort((a, b) => a.createdAt - b.createdAt)
      }
    },
    mounted() {
      this.refreshStory()
    }
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
    min-height: 95px;
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
  
  .content {
    height: 100%;
    overflow-y: auto;
    text-align: left;
    box-sizing: border-box;
    background-color: var(--off-white-main);
    display: flex;
    flex-direction: column;
  }
  .content p {
    padding: 0;
    margin: 0;
    line-height: 1.33;
    color: var(--bg-color-main);
  }

  .content #story-content {
    height: auto;
    min-height: 125px;
    overflow-y: auto;
    padding: 5px;
  }
  .content #user-comments {
    padding: 0 5px;
    overflow-y: auto;
    border-top: 5px solid var(--theme-color-main);
    background-color: var(--theme-color-main);
    margin-top: auto;
  }
  
  .story-footer {
    height: 40px;
    min-height: 35px;
    padding: 5px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: auto;
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

.story-modal-enter-from {
  opacity: 0;
}
.story-modal-enter-to {
  opacity: 1;
}
.story-modal-enter-active {
  transition: all 0.3s ease-out;  
}


.story-modal-leave-from {
  opacity: 1;
}
.story-modal-leave-to {
  opacity: 0;
}
.story-modal-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
  width: 100%;
}
</style>