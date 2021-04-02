<template>
  <div class="comment-card">
    <div class="avatar">
      <img ref="avatar" src='@/assets/avatar1.png' alt="User" draggable="false">
    </div>
    <div class="comment-body">
      <div class="comment-header">
        <h4 :style="isCurrentUser && { color: '#0097e6 !important' }">{{commentUser}}:</h4>
        <p class="created-at">{{formattedDate}}</p>
      </div>
      <p>{{comment.content}} <span class="edited" v-if="comment.originalContent?.length">(edited)</span></p>
      <template v-if="isCurrentUser">
        <button class="edit-button">
          <i class="fas fa-edit"></i>     
        </button>
        <button class="delete-button" >
          <i class="fas fa-trash-alt"></i>     
        </button>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  export default {
    props: ['comment'],
    computed: {
      ...mapGetters(['currentUser']),
      formattedDate() {
        const date = this.comment.createdAt
        const formatted = moment(date).startOf().fromNow()
        return formatted
      },
      commentUser() {
        return `${this.comment.commenter.name}#${this.comment.commenter.identifier}`
      },
      isCurrentUser() {
        return this.currentUser.split('.').join('#') === this.commentUser
      }
    }
  }
</script>

<style scoped>
  h4, p {
    padding: 0;
    margin: 0;
    color: var(--bg-color-main);
  }
  .avatar {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    box-sizing: border-box;
    object-fit: contain;
    overflow: hidden;
    margin-right: 10px;
    border-radius: 50%;
    background-color: var(--theme-color-main);
  }
  .avatar img {
    width: 100%;
    height: 100%;
  }
  .comment-card {
    background-color: var(--off-white-main);
    height: 65px;
    display: flex;
    padding: 5px;
    margin: 5px 0;
    cursor: pointer;
    border-radius: 5px;
  }
  .comment-card:hover {
    background-color: white;
  }
  .comment-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
  }
  .comment-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .edited,
  .comment-header .created-at {
    color: gray;
    font-size: 1.2rem;
    margin-left: auto;
  }
  .edit-button,
  .delete-button {
    position: absolute;
    bottom: 5px;
    right: 5px;
    padding: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    color: var(--off-white-main);
    background-color: #c23616;
    border-radius: 5px;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-out;
  }
  .edit-button,
  .delete-button:hover {
    background-color: var(--off-white-main);
    color: #c23616;
    border-color: #c23616;
  }
  .edit-button {
    right: 45px;
    color: var(--off-white-main);
    background-color: #e1b12c;
    border-color: #e1b12c;
  }
  .edit-button:hover {
    background-color: var(--off-white-main);
    color: #e1b12c;
  }
  .comment-card:hover .edit-button,
  .comment-card:hover .delete-button {
    visibility: visible;
    opacity: 1;
  }
</style>