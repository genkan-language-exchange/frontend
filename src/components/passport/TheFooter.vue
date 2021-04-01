<template>
  <footer>
    <section id="foot">
      <div id="left-foot">
        <a href="https://www.patreon.com/gengo_koukan"><i class="fab fa-patreon"></i></a>
        <a href="https://buymeacoff.ee/genkan"><i class="fas fa-mug-hot"></i></a>
        <a href="https://discord.gg/anFB4KQD3C"><i class="fab fa-discord"></i></a>
        <a href="https://twitter.com/gengo_koukan"><i class="fab fa-twitter"></i></a>
        <router-link :to="{ name: 'Roadmap' }"><i class="fas fa-map-marked"></i></router-link>
      </div>
      <button type="button" @click.prevent="$emit('logMeOut')"><span><i class="fas fa-sign-out-alt"></i></span>Sign out</button>
    </section>
  </footer>
</template>

<script>
  export default {
    props: ['isSelf'],
    emits: ['logMeOut']
  }
</script>

<style scoped>
footer {
  z-index: 100;
  position: fixed;
  bottom: 0;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--bg-color-secondary);
  border-top: 2px solid var(--theme-color-main);
}
#foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
#left-foot {
  display: flex;
  justify-content: space-around;
}
#left-foot a {
  font-size: 2.4rem;
  margin: 0 15px;
}
#left-foot a,
#left-foot a:visited {
  color: var(--theme-color-main);
}
#left-foot a:hover,
#left-foot a:active {
  color: var(--off-white-main);
}
#foot button {
  opacity: 0;
  visibility: 0;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  color: var(--off-white-main);
  background-color: var(--theme-color-main);
  cursor: pointer;
}
#foot button:hover {
  color: var(--theme-color-main);
  background-color: var(--off-white-main);
}
#foot button span {
  margin-right: 10px;
}
@media (min-width: 959px) {
  #foot button {
    opacity: 1;
    visibility: visible;
  } 
}

</style>