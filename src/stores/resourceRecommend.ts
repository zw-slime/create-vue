import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { request } from '@/api';

export const useResourceRecommendStore = defineStore(
  'resourceRecommend',
  () => {
    const data = ref([]);
    const resourceRecommend = computed(() => {
      const arr = [];
      let index = 0;
      while (index < 8) {
        arr.push(data.value.slice(index * 7, index * 7 + 7));
        index++;
      }
      return arr;
    });

    function getResourceRecommend() {
      request.get('/getResourceRecommend').then((v) => {
        data.value = v.data.data;
      });
    }

    return { data, resourceRecommend, getResourceRecommend };
  }
);
