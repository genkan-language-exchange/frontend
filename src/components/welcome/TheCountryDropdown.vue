<template>
  <div class="checkbox-form">
    <div>
      <div class="answers">
        <h3><slot></slot></h3>
        <div id="scrollview">
          <label
            v-for="country of countriesFiltered"
            :key="country.code"
            class="item"
          >
            <div :for="country.code" class="label">
              <p>{{ country.name[0] }}</p>
              <p>{{ country.endonym }}</p>
            </div>
            <input
              :id="country.code"
              v-model="checked"
              type="checkbox"
              :value="country.name[0]"
            >
            <span class="checkmark" />
          </label>
        </div>
        <input id="country-filter" type="text" name="country filter" v-model="filterInput" placeholder="Search countries...">
      </div>
    </div>
    <TheNextButton :toggle="!!checked.length" @click="handleClick" />
  </div>
</template>

<script>
import { countriesAll } from '../../data/countries'
import TheNextButton from './TheNextButton'

export default {
  components: {
    TheNextButton
  },
  data() {
    return {
      countriesAll,
      countriesFiltered: [],
      filterInput: '',
      checked: [],
    }
  },
  methods: {
    handleClick() {
      this.$emit('next', this.checked[0])
    },
    filterNames(val, array) {
      const userInput = val.split(" ").join("").toLowerCase()
      // purpose: to allow alternative names without showing every possible name
      // for each country, loop over the names array and return true if it matches the user's input
      const filtered = array.map(country => country.name.some(name => name.split(" ").join("").toLowerCase().includes(userInput) ) )

      // compare the filtered array (now true/false values) to the original array and return the indexes where true
      let filteredArray = []
      for (let i = 0 ; i < countriesAll.length ; i++) {
        if (filtered[i]) filteredArray.push(countriesAll[i])
      }
      return filteredArray
    }
  },
  watch: {
    checked(val) {
      // turn that checked button into a radio button with extra steps
      if (val.length > 1) return this.checked = val.reverse().slice(0,1)
    },
    filterInput(val) {
      if (val.trim().length > 0) return this.countriesFiltered = this.filterNames(val, countriesAll)
      return this.countriesFiltered = countriesAll
    }
  },
  mounted() {
    this.countriesFiltered = countriesAll
  }
}
</script>

<style scoped>
h1, h2, h3, p {
  margin: 0;
}
h2 {
  text-align: left;
}
.checkbox-form {
	display: flex;
	flex-direction: column;
	align-items: center;
  width: 80%;
  height: 400px;
}
.checkbox-form>div {
  margin-bottom: 25px;
}
#scrollview {
  box-sizing: border-box;
  height: 50vh;
  width: 300px;
  overflow: auto;
  margin: 0 auto;
  padding: 15px 15px 15px 0;
  border: 2px solid #8c7ae6;
  border-bottom: 1px solid #8c7ae6;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  scrollbar-width: thin;
  scrollbar-color: #2f3640 #8c7ae6;
}
#scrollview::-webkit-scrollbar { width: thin; }
#scrollview::-webkit-track { background: #2f3640; }
#scrollview::-webkit-thumb { background: #8c7ae6; }
#country-filter {
  padding: 5px 8px;
  border: none;
  outline: none;
  border: 2px solid #8c7ae6;
  border-top: 1px solid #8c7ae6;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.checkbox-form .answers {
	display: flex;
	flex-direction: column;
	align-items: left;
	width: 100%;
  height: 325px;
  overflow: hidden;
}
.checkbox-form .answers > h3, .checkbox-form .answers > p {
  margin: 0 auto 8px;
}
.checkbox-form label {
	margin-left: 1em;
}
.checkbox-form .item {
	position: relative;
	padding-left: 35px;
	margin-bottom: 18px;
	cursor: pointer;
	font-size: 1.4rem;
	height: 25px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	display: flex;
	align-items: center;
}
.checkbox-form .item input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}
.checkbox-form .label {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.checkbox-form .checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	background-color: #c2c2c2;
  border-radius: 50%;
}
.checkbox-form .item:hover input ~ .checkmark {
	background-color: #949494;
}
.checkbox-form .item input:checked ~ .checkmark {
	background-color: #8c7ae6;
}
.checkbox-form .checkmark:after {
	content: "";
	position: absolute;
	display: none;
}
.checkbox-form .item input:checked ~ .checkmark:after {
	display: block;
}
.checkbox-form .item .checkmark:after {
	left: 9px;
	top: 5px;
	width: 5px;
	height: 10px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
.next-button {
  bottom: -150px;
}
@media (max-width: 480px) {
  #scrollview {
    border-right-width: 2px;
  }
}
</style>