<template>
  <div id="placeholders">
    <div id="searchbar-ph">
      <div id="label-ph"></div>
      <div id="input-ph"></div>
    </div>
    <div class="placeholder" :class="`placeholder-${index}`" v-for="(letter, index) in String.raw`Coming Soon...`.split('')" :key="index">
      <div class="avatar-ph no-select">{{letter}}</div>
      <div class="chat-ph">
        <div>
          <div></div>
          <div></div>
        </div>
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
    width: 90px;
    min-width: 50px;
    margin-right: 4px;
    background-color: #8c7ae6;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  #searchbar-ph #input-ph {
    height: 100%;
    width: 100%;
    background-color: #8c7ae6;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .placeholder {
    display: flex;
    margin: 10px;
    width: 90%;
    font-family: 'DotGothic16', sans-serif;
    font-weight: 700;
    animation: breathing 1s ease-in-out infinite alternate;
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
  }
  @keyframes breathing {
    0% {
      opacity: 1;
      transform: scale(100%);
    }
    100% {
      opacity: 0.55;
      transform: scale(103%);
    }
  }
  .placeholder .chat-ph {
    height: 12px;
    margin-left: auto;
    width: 77%;
  }
  .placeholder .chat-ph>div {
    height: 100%;
    width: 100%;
    margin: 5px;
    padding: 3px;
    border-radius: 15px;
    background-color: #8c7ae6;
  }
  .chat-ph div:first-child {
    width: 45%;
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
  .placeholder-10 { animation-delay: calc(100ms * 11); }
  .placeholder-11 { animation-delay: calc(100ms * 12); }
  .placeholder-12 { animation-delay: calc(100ms * 13); }
  .placeholder-13 { animation-delay: calc(100ms * 14); }
  .placeholder-14 { animation-delay: calc(100ms * 15); }
</style>