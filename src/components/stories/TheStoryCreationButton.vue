<template>
  <div id="creation" @click="$router.push('/stories/create')">
    <i class="fas fa-book-medical"></i>
  </div>
</template>

<style scoped>
#creation {
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--theme-color-main);
  cursor: pointer;
  transition: all 0.25s ease-out;
}
#creation:active,
#creation:hover, i {
  background-color: var(--theme-color-secondary);
}
@media (min-width: 959px) {
  #creation {
    border-radius: 5px;
    right: 17%;
  }
}
</style>