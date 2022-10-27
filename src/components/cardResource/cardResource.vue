<template>
  <a :class="styles.card">
    <img :src="props.src" />
  </a>
</template>
<style module="styles" lang="scss">
.card {
  position: relative;
  display: block;
  width: 200px;
  height: 292px;
  margin: 24px 12px;
  background: cyan;
  background: rgb(227, 233, 237);
  border-radius: 12px;
  transition: all 0.35s ease-out;
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    transform: scale(1.1);
  }
}
</style>
<script setup lang="ts">
const props = defineProps<{
  src: String;
}>();
</script>
