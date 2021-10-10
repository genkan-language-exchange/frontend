<template>
  <div>
    <h2>{{ notificationType === 'user' ? 'Notification Sender' : 'Create Global Notification' }}</h2>
    <form @submit.prevent="handleSubmit">
      <fieldset>
        <div v-if="notificationType === 'user'">
          <label for="name">Username</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div v-if="notificationType === 'user'">
          <label for="identifier">Identifier</label>
          <input type="text" id="identifier" v-model="identifier" />
        </div>
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div>
          <label for="content">Notification Body</label>
          <textarea name="content" id="content" cols="30" rows="4" v-model="content" required />
        </div>
        <div v-if="notificationType === 'user'">
          <label for="shouldClean">Auto Clean</label>
          <input type="checkbox" id="shouldClean" v-model="shouldClean">
        </div>
        <div v-if="shouldClean && notificationType === 'user'">
          <label for="cleanAfterDays">Clean After x Days</label>
          <input type="number" id="cleanAfterDays" min="1" max="31" v-model="cleanAfterDays">
        </div>
        <div v-if="notificationType === 'global'">
          <label for="cleanAfterWeeks">Clean After x Weeks</label>
          <input type="number" id="cleanAfterWeeks" min="1" max="12" v-model="cleanAfterWeeks">
        </div>
        <input type="submit" class="genkan-button" value="Send it" />
      </fieldset>
    </form>
  </div>
</template>

<script>
import { createNotification } from '@/api/notificationsApi'
export default {
  props: ['notificationType'],
  data() {
    return {
      name: null,
      identifier: null,
      title: null,
      content: null,
      shouldClean: false,
      cleanAfterDays: 1,
      cleanAfterWeeks: 1,
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.title || !this.content) return
      const payload = {
        title: this.title,
        content: this.content,
      }

      if (this.notificationType === 'user') {
        payload.name = this.name
        payload.identifier = this.identifier
        payload.shouldClean = this.shouldClean
        payload.cleanAfterDays = this.cleanAfterDays
      } else if (this.notificationType === 'global') {
        payload.cleanAfterWeeks = this.cleanAfterWeeks
      }

      const response = await createNotification(payload, this.notificationType)
      if (response.success) {
        this.name = null
        this.identifier = null
        this.title = null
        this.content = null
        this.shouldClean = false
        this.cleanAfterDays = 1
        this.cleanAfterWeeks = 1
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    color: var(--yellow);
  }
  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  fieldset div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  fieldset label {
    margin-bottom: 4px;
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
  }
  fieldset input {
    padding: 8px;
    width: auto;
  }
  fieldset input[type=checkbox] {
    width: auto;
  }
  fieldset textarea {
    padding: 8px;
    resize: none;
    width: auto;
  }  
  fieldset input,
  fieldset textarea {
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
    border: 2px solid var(--theme-color-main);
  }
  fieldset input:focus,
  fieldset textarea:focus {
    border-color: transparent;
    outline: 2px solid var(--yellow);
  }

  @media (min-width: 968px) {
    h2 { text-align: center; }
    fieldset div { text-align: center; }
    fieldset input,
    fieldset textarea { margin: 0 auto; }
    fieldset input { width: 200px; }
    fieldset textarea { width: 400px; }
  }
</style>