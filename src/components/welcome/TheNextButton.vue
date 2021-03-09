<template>
  <transition name="next-button">
    <button
      type="button"
      class="next-button"
      v-if="toggle"
    >
      <slot><i class="fas fa-chevron-circle-right"></i></slot>
    </button>
  </transition>
</template>

<script>
  export default {
    name: 'NextButton',
    props: {
      toggle: Boolean
    }
  }
</script>

<style scoped>
.next-button {
  display: flex;
  padding: 0;
  border: 0;
  outline: 0;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  color: #8c7ae6;
  font-size: 6rem;
}
.next-button:hover {
  color: #9c88ff;
}
.next-button-enter-from {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-45px) scale(0.5);
}
.next-button-enter-active {
  transition: all 0.3s ease-out;
}
.next-button-enter-to {
  opacity: 1;
  visibility: visible;
  transform: translateX(0) scale(1);
}
.next-button-leave-from {
  opacity: 1;
  visibility: visible;
  transform: translateX(0) scale(1);
}
.next-button-leave-active {
  transition: all 0.3s ease-out;
}
.next-button-leave-to {
  opacity: 0;
  visibility: hidden;
  transform: translate(25px, 45px) scale(0.7) rotate(45deg);
}
/*
.visible {
  animation: slide-in 0.2s ease-out forwards;
}
@keyframes slide-in {
  0% {
    opacity: 0;
    visibility: visible;
    transform: translateX(-45px) scale(.6);
  }
  70% {
    opacity: 0.7;
    visibility: visible;
    transform: translateX(0) scale(1.2);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: translateX(0) scale(1);
  }
}
*/
</style>