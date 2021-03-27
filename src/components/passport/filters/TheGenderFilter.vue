<template>
  <div id="gender-filter">
    <div>
      <input type="checkbox" name="male" value="male"><label for="gender-male">Male</label>
    </div>
    <div>
      <input type="checkbox" name="female" value="female"><label for="gender-female">Female</label>
    </div>
    <div>
      <input type="checkbox" name="gender-non-binary" value="non-binary"><label for="gender-non-binary">Non-binary</label>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
#gender-filter {
  height: 200px;
  width: 40%;
  margin: 20px;
  margin-left: 45px;
  padding-left: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 30px;
  border: 2px solid var(--theme-color-main);
  border-radius: 5px;
  box-shadow: 0px 0px 15px 8px rgba(0, 0, 0, 0.15);
}
#gender-filter>div {
  display: flex;
  align-items: center;
}
input {
  margin-right: 15px;
}
</style>