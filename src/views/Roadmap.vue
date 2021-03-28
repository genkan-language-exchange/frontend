<template>
  <div class="container">
    <header>
      <h2>Here's where we're headed</h2>
    </header>
    <div id="timeline">
      <div class="timeline-item">Implement Privacy Settings</div>
      <div class="timeline-item">Add Slow Mode Chatting - Why Rush!</div>
      <div class="timeline-item">Add Real Time Chatting</div>
      <div class="timeline-item">Add Friend Requests</div>
      <div class="timeline-item">Add Custom Profile Pictures</div>
      <div class="timeline-item">Add Corrections Feature</div>
      <div class="timeline-item">Add Custom Stickers</div>
      <div class="timeline-item">Notifications</div>
      <div class="timeline-item">Add Subscription Model to Support Development</div>
      <div class="timeline-item">Mobile App</div>
      <div class="timeline-item">2FA</div>
      <div class="timeline-item">Hire More Than 1 Dev?</div>
      <div class="timeline-item">Better Story Sorting Algorithm (popular, featured, etc)</div>
      <div class="timeline-item">Add Voice Profile/Notes</div>
      <div class="timeline-item">Matching Algorithm</div>
      <div class="timeline-item">Add Hand Drawn Notes</div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
  import TheFooter from '../components/passport/TheFooter'
  export default {
    components: {
      TheFooter
    },
    name: "Roadmap",
  }
</script>

<style scoped>
  .container {
    margin: 60px 0;
    font-size: 1.8rem;
  }
  header {
    padding: 20px;
    font-family: 'Sriracha', sans-serif;
    color: var(--off-white-main);
    background-color: var(--theme-color-main);
    margin-bottom: 60px;
    border-bottom: 2px solid var(--theme-color-main);
  }
  #timeline {
    position: relative;
    width: 60%;    
    margin: 0 auto;
    padding: 50px;
    border-radius: 15px;
    background-color: var(--bg-color-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 60px;
  }
  #timeline::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: var(--theme-color-main);
    top: -60px;
    bottom: -60px;
    left: 50%;
    margin-left: -2px;
  }
  .timeline-item {
    position: relative;
    padding: 50px;
    border-radius: 5px;
    min-width: 40%;
    max-width: 40%;
    box-sizing: border-box;
    background-color: var(--theme-color-main);
    box-shadow: 0 0 5px 5px rgba(0,0,0,0.15);
  }
  .timeline-item:nth-child(even) {
    left: 25%;
  }
  .timeline-item:nth-child(odd) {
    left: -25%;
  }
  .timeline-item::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -15px;
    background-color: var(--theme-color-main);
    border: 4px solid var(--theme-color-main);
    top: 20%;
    transform: rotate(45deg);
  }
  .timeline-item:nth-child(even)::after {
    left: -15px;
  }
</style>