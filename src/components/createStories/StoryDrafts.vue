<template>
  <div id="story-drafts-container">
      <h3>Drafts</h3>
      <section id="drafts" v-if="drafts.length">

        <transition-group name="draft-cards">
          <div class="draft-card" v-for="draft in drafts" :key="draft._id">
            <div class="draft-info" @click="() => sendFillData(draft)">
              <p>{{ truncate(draft.content) }}</p>
              <p>Started: {{ formattedDate(draft.createdAt) }}</p>
            </div>
            <div class="trash" @click="() => deleteDraft(draft._id)"><i class="fas fa-trash-alt"></i></div>
          </div>
        </transition-group>

      </section>
      <section id="no-drafts" v-else>
        <p>Nothing to see here!</p>
      </section>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getDrafts, removeStory } from '../../api/storyApi'
  export default {
    data() {
      return {
        drafts: [],
        loading: false,
      }
    },
    props: {
      savedDrafts: {
        type: Array,
        required: false,
      }
    },
    emits: ['fillData'],
    methods: {
      async getMyDrafts() {
        const response = await getDrafts()
        .then(res => res.data)
        .catch(err => console.log(err))
        this.drafts = response
      },
      formattedDate(date) {
        return moment(date).startOf().fromNow()
      },
      truncate(string) {
        const truncString = string.length > 100 ? `${string.slice(0,100)}...` : string
        return truncString
      },
      sendFillData(draft) {
        this.$emit('fillData', draft)
      },
      async deleteDraft(id) {
        this.loading = true
        await removeStory(id)
        .then(() => {
          this.loading = false
          this.updateDrafts(id)
        })
        .catch(err => console.log(err))
      },
      updateDrafts(id) {
        this.drafts = this.drafts.filter(draft => draft._id !== id)
      }
    },
    watch: {
      savedDrafts: {
        deep: true,
        immediate: false,
        handler () {
          this.getMyDrafts()
        }
      }
    },
    mounted() {
      this.getMyDrafts()
    }
  }
</script>

<style scoped>
#story-drafts-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  box-sizing: border-box;
  margin: 40px auto;
  padding: 20px 0;
  background-color: var(--bg-color-secondary);
  border-radius: 5px;
}
#drafts,
#no-drafts {
  font-size: 1.6rem;
  margin-bottom: auto;
}
#no-drafts p {
  font-size: 1.4rem;
  color: #718093;
}
.draft-card {
  background-color: #40739e;
  border-radius: 5px;
  margin: 15px;
  overflow: hidden;
  cursor: pointer;
}
.draft-card:hover {
  background-color: #487eb0;
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
}
.draft-info {
  margin: 10px;
}
.trash {
  width: 100%;
  padding: 15px 0;
  transition: all 0.25s ease-out;
}
.trash:hover,
.trash:active {
  background-color: #c23616;
}
h3 {
  font-size: 2rem;
}
@media (min-width: 959px) {
  #story-drafts-container {
    width: 25%;
    margin: 0;
    margin-left: 50px;
  }
  .trash {
    width: 25%;
    float: right;
    border-top-left-radius: 5px;
    padding: 5px 0;
  }
}

.draft-cards-enter-from {
  opacity: 0;
}
.draft-cards-enter-to {
  opacity: 1;
}
.draft-cards-enter-active {
  transition: all 0.3s ease-out;  
}


.draft-cards-leave-from {
  opacity: 1;
}
.draft-cards-leave-to {
  opacity: 0;
}
.draft-cards-leave-active {
  transition: all 0.3s ease-out;
}

.draft-cards-move {
  transition: transform 0.5s ease;
}
</style>