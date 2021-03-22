<template>
  <div class="comment-card">
    <div class="avatar">
      <img ref="avatar" src='@/assets/avatar1.png' alt="User" draggable="false">
    </div>
    <div class="comment-body">
      <div class="comment-header">
        <h4>{{`${comment.commenter.name}#${comment.commenter.identifier}`}}:</h4>
        <p class="created-at">{{formattedDate}}</p>
      </div>
      <p>{{comment.content}}</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: ['comment'],
    computed: {
      formattedDate() {
        const date = this.comment.createdAt
        const formatted = moment(date).startOf().fromNow()
        return formatted
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
  }
  .comment-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .comment-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .comment-header .created-at {
    color: gray;
    font-size: 1.2rem;
    margin-left: auto;
  }
</style>