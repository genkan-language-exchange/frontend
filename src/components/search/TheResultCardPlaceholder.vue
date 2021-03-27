<template>
  <div class="card">
    <div class="head">
      <div class="status offline"></div>
      <div class="avatar"></div>
    </div>

    <div class="info">
      <div>
        <h3>This could've been a new match</h3>
      </div>
      <div>
        <p>No results found :(</p>
        <p>Try adjusting your filters!</p>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.card {
  height: 150px;
  width: 90%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px;
  margin: 35px auto;
  display: flex;
  flex-direction: row;
  background-color: var(--bg-color-secondary);
  box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.15);
}
.head {
  display: flex;
  align-items: flex-start;
  position: relative;
}
.status {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: 3px solid var(--bg-color-main);
}
.online {
  background-color: chartreuse;
}
.offline {
  background-color: var(--bg-color-secondary);
}
.avatar {
  width: 75px;
  height: 75px;
  background-color: var(--bg-color-secondary);
  border-radius: 50%;
  font-size: 3rem;
  display: flex;
  line-height: 1;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--bg-color-main);
}
h3 {
  font-size: 1.6rem;
  font-weight: 600;
}
span {
  font-size: 1.8rem;
  color: var(--theme-color-main);
  vertical-align: middle;
}
.info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.info p {
  font-size: 1.4rem;
  text-align: left;
  text-overflow: ellipsis;
}
@media (min-width: 959px) {
  .card {
    width: 50%;
  }
}
</style>