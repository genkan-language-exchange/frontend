<template>
  <section id="filters">
    <div>
      <h3>My Privacy Filters:</h3>
      <p>These settings change who can find you and who you can find</p>
    </div>

    <div class="filter">
      <h4>Age Range</h4>
      <p @click="() => handleSetFilters('age')">{{filterSettings.ages.join(' - ')}}</p>
      <TheAgeFilter v-if="editingAge" />
    </div>

    <div class="filter">
      <h4>I want to meet</h4>
      <p id="genders" @click="() => handleSetFilters('gender')" v-if="filterSettings.genders.length > 2">everyone</p>
      <p id="genders" @click="() => handleSetFilters('gender')" v-else>{{filterSettings.genders.join(', ')}}</p>
      <TheGenderFilter v-if="editingGender" />
      <span>from</span>
      <p @click="() => handleSetFilters('resides')" v-if="filterSettings.length > 0">
        {{filterSettings.resides.join(', ')}}
      </p>
      <p @click="() => handleSetFilters('resides')" >everywhere</p>
      <TheCountryDropdown :profileEditor="true" v-if="editingResides" />
    </div>

    <div class="filter">
      <h4>My ideal friend speaks</h4>
      <p @click="() => handleSetFilters('langsKnow')" v-if="filterSettings.languagesKnow?.length">{{filterSettings.languagesKnow.join(', ')}}</p>
      <p @click="() => handleSetFilters('langsKnow')" v-else>any language</p>
      <TheLanguageDropdown :languageKnow="true" :profileEditor="true" v-if="editingKnows" />
      <h4>and studies</h4>
      <p @click="() => handleSetFilters('langsSpeak')" v-if="filterSettings.languagesSpeak?.length">{{filterSettings.languagesSpeak.join(', ')}}</p>
      <p @click="() => handleSetFilters('langsSpeak')" v-else>any language</p>
      <TheLanguageDropdown :languageKnow="true" :profileEditor="true" v-if="editingSpeak" />
    </div>

    <div class="filter">
      <h4>Show my age</h4>
      <p @click="() => handleSetFilters('showAge')" v-if="filterSettings.showOwnAge">Yes</p>
      <p @click="() => handleSetFilters('showAge')" v-else>No</p>
    </div>

    <div class="filter">
      <h4>Show my online status</h4>
      <p @click="() => handleSetFilters('showOnline')" v-if="filterSettings.showOnlineStatus">Yes</p>
      <p @click="() => handleSetFilters('showOnline')" v-else>No</p>
    </div>
    
    <div class="filter">
      <h4>Show my profile picture before matching</h4>
      <p @click="() => handleSetFilters('showPicture')" v-if="filterSettings.blurBeforeMatch">Yes</p>
      <p @click="() => handleSetFilters('showPicture')" v-else>No</p>
    </div>
  </section>
</template>

<script>
  import TheAgeFilter from './filters/TheAgeFilter'
  import TheGenderFilter from './filters/TheGenderFilter'
  import TheCountryDropdown from '../welcome/TheCountryDropdown'
  import TheLanguageDropdown from '../welcome/TheLanguageDropdown'
  export default {
    components: {
      TheAgeFilter,
      TheGenderFilter,
      TheCountryDropdown,
      TheLanguageDropdown
    },
    props: ['filterSettings', 'role'],
    emits: ['changedFilter'],
    data() {
      return {
        editingAge: false,
        editingGender: false,
        editingResides: false,
        editingKnows: false,
        editingSpeak: false,
      }
    },
    methods: {
      handleSetFilters(val) {
        switch(val) {
          case 'age':
            this.editingAge = !this.editingAge
            break
          case 'gender':
            // if (this.role !== "vip") return
            this.editingGender = !this.editingGender
            break
          case 'resides':
            this.editingResides = !this.editingResides
            break
          case 'langsKnow':
            this.editingKnows = !this.editingKnows
            break
          case 'langsSpeak':
            this.editingSpeak = !this.editingSpeak
            break
          case 'showAge':
          case 'showOnline':
          case 'showPicture':
            this.$emit('changedFilter', val)
            break
          default: break
        }
      },
    },
  }
</script>

<style scoped>
h3, h4 { color: var(--theme-color-main); }
h3, h4, p { margin: 0; }
#filters {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid var(--theme-color-main);
  gap: 30px;
}
.filter p {
  text-decoration: underline;
  cursor: pointer;
}
.filter p:hover {
  color: var(--theme-color-secondary);
}
</style>