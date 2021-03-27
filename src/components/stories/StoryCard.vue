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
      <transition name="like-modal" mode="out-in">
        <div class="like-modal" v-if="likesOpen">
          <div class="arrow"></div>
          <p v-if="whoLiked.length">{{whoLiked}} liked this</p>
          <p v-else>No one liked this yet 😴</p>
        </div>
      </transition>

      <div class="comment-like">
        <button class="likes" ref="likes" @click.prevent="sendLike(story._id)" aria-name="like post">
          <span v-if="likes.length">{{likes.length}}</span>
          <i class="fa-heart" :class="userLikes ? 'fas' : 'far'"></i>
        </button>

        <button class="comments" @click.prevent="$emit('openModal', story._id, true)" aria-name="view comments">
          <span v-if="story.comments?.length">{{story.comments.length}}</span>
          <i class="fa-comment-dots" :class="story.comments?.length ? 'fas' : 'far'"></i>
        </button>
      </div>

      <div class="story-management">
        <button class="delete" v-if="isSelf" @click.prevent="$emit('deleteStory', story._id)"><i class="fas fa-trash-alt"></i></button>
        <button class="report" @click.prevent="$emit('openReportModal', story._id)" aria-name="report story"><i class="far fa-flag"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  import { likeStory } from '../../api/storyApi'
  import { mapGetters } from 'vuex'
  export default {
    name: "StoryCard",
    data() {
      return {
        timer: 0,
        likesOpen: false,
        likes: [],
        userLikes: false,
      }
    },
    emits: ['openModal', 'openReportModal', 'deleteStory'],
    props: ['userId', 'story'],
    methods: {
      goToPassport(name, identifier) {
        this.$router.push({ name: 'Passport', params: { id: `${name}.${identifier}` } })
      },
      showLikesBegin() {
        this.timer = setTimeout(() => {
          this.likesOpen = true
        }, 1000)
      },
      showLikesEnd() {
        this.likesOpen = false
        clearTimeout(this.timer)
      },
      async sendLike(storyId) {
        const response = await likeStory(storyId)
        if (response.status === "success") {
          this.likes = response.data
          this.userLikes = !this.userLikes
        }
      },
      doesUserLike() {
        const currentUser = this.currentUser.split('.').join('#')
        this.userLikes = !!this.story.likes.find(like => `${like.likeUser.name}#${like.likeUser.identifier}` === currentUser)
      },
    },
    computed: {
      ...mapGetters({
        currentUser: 'currentUser',
      }),
      content() {
        return this.story.content.split('\n')
      },
      whoLiked() {
        const likes = this.likes
        const sortedLikes = likes.sort((a, b) => a.createdAt - b.createdAt)
        let likeUsersArray = []

        for (let i = 0 ; i < sortedLikes.length ; i++) {
          if (i > 3) break;
          const like = sortedLikes[i]
          const likeUser = `${like.likeUser.name}#${like.likeUser.identifier}`
          const currentUser = this.currentUser.split('.').join('#')
          if (likeUser === currentUser || like.likeUser.name == undefined) {
            likeUsersArray.push(i === 0 ? "You" : (i === 2 ? "and you" : "you"))
            continue;
          }
          likeUsersArray.push(likeUser)
        }

        if (likeUsersArray.length > 3) likeUsersArray.push(' and more') 
        return likeUsersArray.length !== 2 ? likeUsersArray.join(', ') : likeUsersArray.join(' and ')
      },
      isSelf() {
        return `${this.story.userId.name}#${this.story.userId.identifier}` === this.currentUser.split('.').join('#')
      }
    },
    mounted() {
      this.$refs.likes.addEventListener('mouseenter', this.showLikesBegin)
      this.$refs.likes.addEventListener('mouseleave', this.showLikesEnd)
      this.likes = this.story.likes
      this.doesUserLike()
    },
    beforeUnmount() {
      this.$refs.likes.removeEventListener('mouseenter', this.showLikesBegin)
      this.$refs.likes.removeEventListener('mouseleave', this.showLikesEnd)
    }
  }
</script>

<style scoped>
  p {
    padding: 0;
    margin: 0;
  }
  .story-card {
    height: 250px;
    width: 95%;
    margin: 0 auto 20px;
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
    padding: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .story-content:hover,
  .story-header:hover {
    background-color: var(--theme-color-main);
    box-shadow: 0px 0px 10px 10px rgba(0,0,0,0.15);
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
    scrollbar-width: thin;
    scrollbar-color: var(--theme-color-main) var(--bg-color-secondary);
}
  .story-content::-webkit-scrollbar { width: thin; }
  .story-content::-webkit-track { background: var(--theme-color-main); }
  .story-content::-webkit-thumb { background: var(--bg-color-secondary); }
  .story-content p {
    line-height: 1.33;
  }
  .story-footer {
    height: 15%;
    padding: 5px;
    position: relative;
  }
  .comment-like button,
  .story-management button {
    height: 30px;
    width: 30px;
    margin: 3px 8px;
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
  .comment-like button:hover {
    color: var(--theme-color-main);
    background-color: var(--off-white-main);
  }
  .story-management {
    float: right;
    margin-right: 8px;
  }
  .story-management .report,
  .story-management .delete {
    color: var(--theme-color-main);
    background-color: var(--bg-color-secondary);
  }
  .story-management .delete:hover,
  .story-management .report:hover {
    color: #c23616;
    background-color: var(--bg-color-secondary);
  }

  .like-modal {
    position: absolute;
    top: -38px;
    left: 0;
    padding: 5px 8px;
    color: white;
    background-color: var(--theme-color-main);
    border-radius: 5px;
    box-shadow: 5px 3px 15px 8px rgba(0,0,0,0.1);
  }
  .like-modal .arrow {
    position: absolute;
    bottom: -5px;
    left: 23px;
    height: 10px;
    width: 10px;
    background-color: var(--theme-color-main);
    transform: rotate(45deg);
  }
  .likes, .comments {
    position: relative;
  }
  .likes span,
  .comments span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -10px;
    right: -10px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    z-index: 10;
    font-size: 1.1rem;
    font-feature-settings: 'tnum';
    font-variant-numeric: 'tabular-nums';
    color: white !important;
    background-color: var(--theme-color-main);
    border: 2px solid var(--theme-color-secondary);
    box-sizing: border-box;
  }
  
.like-modal-enter-from {
  opacity: 0;
}
.like-modal-enter-to {
  opacity: 1;
}
.like-modal-enter-active {
  transition: all 0.3s ease-out;
}

.like-modal-leave-from {
  opacity: 1;
}
.like-modal-leave-to {
  opacity: 0;
}
.like-modal-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
}
@media (min-width: 959px) {
  .story-card {
    width: 50%;
    height: 300px;
  }
}
</style>