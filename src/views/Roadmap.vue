<template>
  <div class="container">
    <header>
      <h2>Here's where we're headed</h2>
    </header>
    <div id="timeline">
      <div class="timeline-item"><p>Profile and Settings</p></div>
      <div class="timeline-item"><p>Story Tags</p></div>
      <div class="timeline-item"><p>Corrections Feature</p></div>
      <div class="timeline-item"><p>Slow Mode Chatting - Why Rush!</p></div>
      <div class="timeline-item"><p>Friend Requests</p></div>
      <div class="timeline-item"><p>Real Time Chatting</p></div>
      <div class="timeline-item"><p>Custom Profile Pictures</p></div>
      <div class="timeline-item"><p>User Created Mini-Lessons</p></div>
      <div class="timeline-item"><p>Communities</p></div>
      <div class="timeline-item"><p>Awards</p></div>
      <div class="timeline-item"><p>Multiple Like/React Types</p></div>
      <div class="timeline-item"><p>Notifications</p></div>
      <div class="timeline-item"><p>Subscription Model to Support Development</p></div>
      <div class="timeline-item"><p>Mobile App</p></div>
      <div class="timeline-item"><p>2FA</p></div>
      <div class="timeline-item"><p>Custom Stickers</p></div>
      <div class="timeline-item"><p>Better Story Sorting Algorithms</p></div>
      <div class="timeline-item"><p>Voice Profile/Notes</p></div>
      <div class="timeline-item"><p>Matching Algorithm</p></div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
  import TheFooter from '@/components/passport/TheFooter'
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
  padding: 10px;
  border-radius: 5px;
  min-width: 50%;
  max-width: 50%;
  box-sizing: border-box;
  background-color: var(--theme-color-main);
  box-shadow: 0 0 5px 5px rgba(0,0,0,0.15);
}
.timeline-item p {
  font-size: 1.6rem;
  padding: 0;
  margin: 0;
}
.timeline-item:nth-child(even) {
  left: 35%;
  text-align: right;
}
.timeline-item:nth-child(odd) {
  left: -35%;
  text-align: left;
}
.timeline-item::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  right: -7px;
  background-color: var(--theme-color-main);
  border: 4px solid var(--theme-color-main);
  top: 20%;
  transform: rotate(45deg);
  z-index: 0;
}
.timeline-item:nth-child(even)::after {
  left: -7px;
}

@media (min-width: 959px) {
  .timeline-item {
    padding: 50px;
  }
  .timeline-item:nth-child(even) {
    left: 27%;
  }
  .timeline-item:nth-child(odd) {
    left: -27%;
  }
  .timeline-item::after {
    width: 25px;
    height: 25px;
  }
}
</style>