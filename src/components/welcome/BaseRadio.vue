<template>
  <div class="checkbox-form">
    <div>
      <div class="answers">
        <h3><slot name="title"></slot></h3>
        <div id="scrollview">

          <label
            v-for="(item, index) of items"
            :key="index"
            class="item"
          >
            <div :for="item" class="label">
              <p>{{ item }}</p>
            </div>
            <input
              :id="index"
              v-model="checked"
              type="checkbox"
              :value="item"
            >
            <span class="checkmark" />
          </label>

        </div>
      </div>
    </div>
    <TheNextButton :toggle="!!checked.length" @click="handleClick" />
  </div>
</template>

<script>
import TheNextButton from './TheNextButton'
export default {
  components: {
    TheNextButton
  },
  props: ['items'],
  data() {
    return {
      checked: [],
    }
  },
  methods: {
    handleClick() {
      this.$emit('next', this.checked)
    },
  },
  watch: {
    checked(val) {
      if (val.length > 1) return this.checked = val.reverse().slice(0,1)
    },
  },
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