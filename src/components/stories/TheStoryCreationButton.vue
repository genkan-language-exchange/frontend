<template>
  <div id="creation" @click="$router.push('/stories/create')">
    <i class="fas fa-book-medical"></i>
  </div>
</template>

<style scoped>
#creation {
  position: fixed;
  top: 5px;
  right: 15px;
  z-index: 110;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.6rem;
  width: 45px;
  height: 45px;
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
    visibility: visible;
    top: 85%;
    left: 85%;
    width: 60px;
    height: 60px;
  }
}
</style>