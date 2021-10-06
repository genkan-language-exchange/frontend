<template>
  <p
    v-for="lang in language"
    :key="lang"
  >
    {{ lang.language }}&nbsp;&nbsp;
    <template v-if="lang.level > 0">
      <span v-for="level in lang.level" :key="level"><i class="fas fa-star"></i></span>
    </template>
    <template v-else>
      <span><i class="far fa-star"></i></span>
    </template>
  </p>
</template>

<script>
export default {
  props: ['language'] // takes an array of language object { language: String, level: Number }
}
</script>
