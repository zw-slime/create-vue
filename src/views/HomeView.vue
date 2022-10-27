<script setup lang="ts">
import NavBar from '../components/nav-bar/nav-bar.vue'
import Waterfull from '@/components/waterfull/waterfull.vue'
import Card from '../components/card/card.vue'
import {request} from '@/api'
import {onMounted, reactive, ref} from "vue";
import {useResourceRecommendStore} from "@/stores/resourceRecommend";
import {storeToRefs} from 'pinia'

const store = useResourceRecommendStore();
const { data, resourceRecommend } = storeToRefs(store);
const { getResourceRecommend } = store;
onMounted(() => {
  getResourceRecommend();
})

</script>

<template>
  <main :class="styles.main">
    <el-container>
      <el-header><NavBar></NavBar></el-header>
      <el-main>
        <Waterfull :data="resourceRecommend"></Waterfull>
      </el-main>
    </el-container>
  </main>
</template>

<style lang="scss" module = 'styles'>
.main {
  background: linear-gradient(to bottom,rgba(255,71,99,0.05), #ffffff);
  height: 100vh;
}
</style>
