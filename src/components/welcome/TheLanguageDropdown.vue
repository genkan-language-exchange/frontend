<template>
  <div class="checkbox-form">
    <div>
      <div class="answers">
        <h3><slot></slot></h3>
        <div id="scrollview">

          <div
            v-for="(lang) of filteredLanguages"
            :key="lang.code"
          >
            <label
              class="item"
            >
              <div :for="lang.code" class="label">
                <p>{{ lang.name }}</p>
                <p>{{ lang.endonym }}</p>
              </div>
              <input
                :id="lang.code"
                v-model="checked"
                type="checkbox"
                class="checkbox"
                :value="lang.name"
              >
              <span class="checkmark" />
            </label>
            <input
              v-if="filterChecked.includes(lang.name)"
              type="range"
              min="0"
              max="3"
              class="slider"
              :value="langLevels[lang.name]"
              @change="e => handleSlide(e.target.value, lang.name)"
              :id="`levelSlider_${lang.name}`"
            />
            <p v-if="filterChecked.includes(lang.name)">{{ levels[langLevels[lang.name]] }}</p>
          </div>

        </div>
      </div>
    </div>
    <TheNextButton :toggle="!!checked.length" @click="handleClick" v-if="!profileEditor" />
  </div>
</template>

<script>
import { langPopular, langAll } from '../../data/languages'
import TheNextButton from './TheNextButton'
export default {
  components: {
    TheNextButton
  },
  props: ['languageKnow', 'profileEditor'],
  data() {
    return {
      langAll,
      langPopular,
      filteredLanguages: [],
      checked: [],
      langLevels: {},
      levels: {
        0: "Beginner",
        1: "Intermediate",
        2: "Advanced",
        3: "Fluent"
      }
    }
  },
  methods: {
    handleSlide(val, langCode) {
      this.langLevels = {
        ...this.langLevels,
        [langCode]: val 
      }
    },
    handleClick() {
      const payload = []

      this.checked.forEach(lang => {
        const newLang = {
          language: lang,
          level: this.langLevels[lang]
        }
        payload.push(newLang)
      })
      
      this.$emit('next', payload)
    },
  },
  watch: {
    checked(val) {
      if (val.length > 3) return this.checked.shift()
    }
  },
  computed: {
    filterChecked() {
      const _checked = this.checked.filter(lang => lang.toLowerCase() !== 'undecided')
      return _checked
    }
  },
  mounted() {
    const languages = this.langPopular.concat(this.langAll)
    if (this.languageKnow) {
      const known = this.languageKnow
      console.log(known)
      for (let i = 0; i < languages.length ; i++) {
        for (let j = 0 ; j < known.length ; j++) {
          if (languages[i].name.toLowerCase() === known[j].language.toLowerCase()) {
            languages.splice(i, 1)
          }
          this.langLevels[languages[i].name] = 0
        }
      }
    }
    this.filteredLanguages = languages
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
  border-right: 1px solid #8c7ae6;;
  border-radius: 5px;
  scrollbar-width: thin;
  scrollbar-color: #2f3640 #8c7ae6;
}
#scrollview::-webkit-scrollbar { width: thin; }
#scrollview::-webkit-track { background: #2f3640; }
#scrollview::-webkit-thumb { background: #8c7ae6; }

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
.checkbox-form .item .checkbox {
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
  border-radius: 3px;
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
#sliders>div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px 0;
}
.next-button {
  bottom: -150px;
}

input[type=range] {
  height: 23px;
  -webkit-appearance: none;
  margin: 10px 0 10px 20px;
  width: 90%;
  background-color: transparent;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: #8C7AE6;
  border-radius: 5px;
  border: 1px solid transparent;
}
input[type=range]::-webkit-slider-thumb {
  border: 1px solid transparent;
  height: 15px;
  width: 50px;
  border-radius: 20px;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #8C7AE6;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  background: #8C7AE6;
  border-radius: 5px;
  border: 1px solid transparent;
}
input[type=range]::-moz-range-thumb {
  border: 1px solid transparent;
  height: 15px;
  width: 50px;
  border-radius: 20px;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #8C7AE6;
  border: 1px solid transparent;
  border-radius: 10px;
}
input[type=range]::-ms-fill-upper {
  background: #8C7AE6;
  border: 1px solid transparent;
  border-radius: 10px;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  border: 1px solid transparent;
  height: 15px;
  width: 50px;
  border-radius: 20px;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #8C7AE6;
}
input[type=range]:focus::-ms-fill-upper {
  background: #8C7AE6;
}

@media (max-width: 480px) {
  #scrollview {
    border-right-width: 2px;
  }
}
</style>