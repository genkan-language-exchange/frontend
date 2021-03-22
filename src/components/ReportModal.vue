<template>
  <BaseModal>
    <div id="base">
      <div id="report-header">
        <h1>Report Form</h1>
        <p>Is something wrong?</p>
      </div>

      <div id="content-box">
        <h3>{{reporting.userId.name}}#{{reporting.userId.identifier}}</h3>
        <p>Content: "{{reporting.content}}"</p>
      </div>

      <div id="report-form-group">
        <form @submit.prevent="sendReport">
          <h4>What best describes the problem?</h4>
          <fieldset>
            <div>
              <input type="radio" name="reason" value="nsfw" v-model="reason"><label for="reason">It contains disturbing content</label>
            </div>
            <div>
              <input type="radio" name="reason" value="soliciting" v-model="reason"><label for="reason">It's trying to sell something</label>
            </div>
            <div>
              <input type="radio" name="reason" value="spam" v-model="reason"><label for="reason">It's spam/self-promotion</label>
            </div>
            <div>
              <input type="radio" name="reason" value="apathy" v-model="reason"><label for="reason">I just don't like it</label>
            </div>
            <div id="buttons">
              <input type="submit" value="Send Complaint">
              <input type="button" value="Cancel" @click="$emit('cancelReport')">
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </BaseModal>
</template>

<script>
  import BaseModal from './BaseModal'
  export default {
    components: {
      BaseModal,
    },
    data() {
      return {
        reason: '',
      }
    },
    props: ['reporting'],
    methods: {
      sendReport() {
        console.log(this.reason)
      }
    }
  }
</script>

<style scoped>
  h1 { font-size: 2.4rem; }
  h3 {
    font-size: 1.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h4 {
    font-size: 1.8rem;
    padding: 0;
    margin: 0;
  }
  p { font-size: 1.4rem; }
  #base {
    height: 100%;
  }
  #report-header {
    text-align: left;
    margin-left: 30px;
    height: 10%;
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  #content-box {
    padding: 15px 30px;
    box-sizing: border-box;
    background-color: var(--off-white-main);
    color: var(--bg-color-main);
    text-align: left;
    height: 45%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #report-form-group {
    height: 45%;
    width: 100%;
    margin: 0 auto;
    background-color: var(--theme-color-secondary);
    padding: 5px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  fieldset {
    border: none;
    outline: none;
    margin: 12px 0;
  }
  fieldset div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 15px;
    margin-bottom: 10px;
  }
  #buttons {
    display: flex;
    justify-content: space-evenly;
    margin-top: 24px;
  }
  #buttons input {
    color: var(--bg-color-main);
    background-color: var(--off-white-main);
    font-weight: 600;
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
  }
  #buttons input[type="submit"]:hover,
  #buttons input[type="submit"]:active {
    color: var(--bg-color-main);
    background-color: orange;
  }
  #buttons input:hover,
  #buttons input:active {
    color: var(--off-white-main);
    background-color: var(--theme-color-main);
  }
@media (min-width: 959px) {
  #report-header {
    margin-left: 50px;
  }
  #report-form-group {
    width: 70%;
  }
}
</style>