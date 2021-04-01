<template>
  <div>
    <TheSidebar v-if="isMobile"/>
    <TheNavbar v-else />
  </div>
</template>

<script>
import TheNavbar from './TheNavbar'
import TheSidebar from './TheSidebar'
export default {
  components: {
    TheNavbar,
    TheSidebar,
  },  
  data() {
    return {
      isMobile: window.innerWidth < 959,
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      return this.isMobile = window.innerWidth < 900
    }
  },
}
</script>

<style scoped>

</style>