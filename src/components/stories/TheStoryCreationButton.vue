<template>
  <div id="creation" @click="$router.push('/stories/create')">
    <i class="fas fa-feather-alt"></i>
  </div>
</template>

<style scoped>
#creation {
  position: fixed;
  top: 5px;
  right: 15px;
  z-index: 180;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.6rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
}
#creation { background-color: var(--theme-color-main); }
#creation:active,
#creation:hover {
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
    z-index: 100;
  }
}
</style>