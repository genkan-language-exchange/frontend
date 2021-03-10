<template>
  <div id="placeholders">
    <div id="searchbar-ph">
      <div id="label-ph"></div>
      <div id="input-ph"></div>
    </div>
    <div class="placeholder" :class="`placeholder-${index}`" v-for="(letter, index) in String.raw`LOADING...`.split('')" :key="index">
      <div class="avatar-ph no-select">{{letter}}</div>
      <div class="chat-ph">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderContacts'
}
</script>

<style scoped>
  #placeholders {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  #searchbar-ph {
    display: flex;
    justify-content: space-between;
    height: 25px;
    width: 100%;
    margin-bottom: 10px;
  }
  #searchbar-ph #label-ph {
    height: 100%;
    width: 24%;
    background-color: #8c7ae6;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  #searchbar-ph #input-ph {
    height: 100%;
    width: 74%;
    background-color: #8c7ae6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .placeholder {
    display: flex;
    margin: 10px;
    animation: tenmetsu 1s ease-in-out infinite alternate;
  }
  .placeholder .avatar-ph {
    min-height: 65px;
    min-width: 65px;
    background-color: #8c7ae6;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 2.4rem;
    font-family: 'Lato', sans-serif;
    animation: colorpulse 2s ease-in-out infinite alternate;
  }
  @keyframes tenmetsu {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0.55;
      transform: translateY(15px);
    }
  }
  @keyframes colorpulse {
    from { background-color: #8c7ae6; }
    to { background-color: #7766ce; }
  }
  .placeholder .chat-ph {
    height: 12px;
    margin-left: auto;
    width: 77%;
  }
  .placeholder .chat-ph div {
    height: 100%;
    width: 100%;
    margin: 5px;
    padding: 3px;
    border-radius: 15px;
    background-color: #8c7ae6;
  }
  .placeholder-0 { animation-delay: calc(100ms * 1); }
  .placeholder-1 { animation-delay: calc(100ms * 2); }
  .placeholder-2 { animation-delay: calc(100ms * 3); }
  .placeholder-3 { animation-delay: calc(100ms * 4); }
  .placeholder-4 { animation-delay: calc(100ms * 5); }
  .placeholder-5 { animation-delay: calc(100ms * 6); }
  .placeholder-6 { animation-delay: calc(100ms * 7); }
  .placeholder-7 { animation-delay: calc(100ms * 8); }
  .placeholder-8 { animation-delay: calc(100ms * 9); }
  .placeholder-9 { animation-delay: calc(100ms * 10); }
</style>