<script setup lang="ts">
import NavBar from '../components/nav-bar/nav-bar.vue';
import WaterfullCard from '@/components/waterfullCard/waterfullCard.vue';
import { onMounted } from 'vue';
import { useResourceRecommendStore } from '@/stores/resourceRecommend';
import { storeToRefs } from 'pinia';

const store = useResourceRecommendStore();
const { resourceRecommend } = storeToRefs(store);
const { getResourceRecommend } = store;
onMounted(() => {
  getResourceRecommend();
});
</script>

<template>
  <main :class="styles.main">
    <el-container>
      <el-header><NavBar></NavBar></el-header>
      <el-main>
        <WaterfullCard :data="resourceRecommend"></WaterfullCard>
      </el-main>
    </el-container>
  </main>
</template>

<style lang="scss" module="styles">
.main {
  height: 100vh;
  background: linear-gradient(to bottom, rgba(255, 71, 99, 0.05), #ffffff);
}
</style>
