<template>
  <div id="date-picker">
    <label for="birthday"><h3>Birthday:</h3></label>
    <input type="date" id="birthday" name="birthday" min="1903-01-02" :max="minAgeLimit" v-model="date" :defaultValue="minAgeLimit">

    <TheNextButton :toggle="dateHasValue" @click.prevent="handleClick" :disabled="!dateHasValue"><i class="fas fa-passport"></i></TheNextButton>
  </div>
</template>

<script>
  import moment from 'moment'
  import TheNextButton from './TheNextButton'
  export default {
    name: "DatePicker",
    components: {
      TheNextButton
    },
    emits: ['next'],
    data() {
      return {
        date: "",
        dateHasValue: false,
        minDate: moment().subtract(16, 'years').calendar().split('/')
      }
    },
    methods: {
      handleClick() {
        this.$emit('next', this.date)
      },
    },
    computed: {
      minAgeLimit() {
        return `${this.minDate[2]}-${this.minDate[0]}-${this.minDate[1]}`
      }
    },
    watch: {
      date(val) {
        if (val.length > 0) return this.dateHasValue = true
        return this.dateHasValue = false
      }
    },
    mounted() {
      this.date = `${this.minDate[2]}-${this.minDate[0]}-${this.minDate[1]}`
    },
  }
</script>

<style scoped>
  #date-picker {
    margin: 65px 0 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  h3 {
    padding: 0;
    margin: 0;
  }
  #birthday {
    padding: 5px 8px;
    border: none;
    outline: none;
    height: 20px;
    border-radius: 5px;
    font-size: 1.8rem;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 20px;
  }
</style>