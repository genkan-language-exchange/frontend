<template>
  <p>
    {{ language }}&nbsp;&nbsp;
    <template v-if="level > 0">
      <span v-for="l in level" :key="l"><i class="fas fa-star"></i></span>
    </template>
    <template v-else>
      <span><i class="far fa-star"></i></span>
    </template>
  </p>
</template>

<script>
export default {
  props: ['language', 'level']
}
</script>
