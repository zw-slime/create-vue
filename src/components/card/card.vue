<template>
  <a :class="styles.card">
    <img :src="props.src"/>
  </a>
</template>
<style module="styles" lang="scss">
.card {
    display: block;
    position: relative;
    width: 200px;
    height: 292px;
    margin: 24px 12px;
    border-radius: 12px;
    background: cyan;
    transition: all .35s ease-out;
    background: rgb(227, 233, 237);
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    transform: scale(1.1)
  }
}
</style>
<script setup lang="ts">
const props = defineProps<{
  src: String
}>()
</script>
