<template>
  <div :class="styles.search">
    <h1><span>花瓣，</span>陪你做生活的设计师</h1>
    <div :class="styles.searchInput">
      <el-input
        v-model="input"
        placeholder="超过40亿灵感等你来发现"
        :suffix-icon="Search"
        @change="inputChange"
        maxlength="20"
        show-word-limit
        clearable
      />
    </div>
  </div>
  <div :class="styles.waterfull">
    <div :class="styles.itemWrap" v-for="(group, index) in props.data">
      <div :class="styles.itemInner">
        <div
          :class="styles.itemBox"
          :ref="(el) => setItemBoxRef(el as Element, index)"
        >
          <div :class="styles.item" v-for="item in group.concat(group)">
            <CardResource :src="item?.url"></CardResource>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="styles.shadom"></div>
</template>
<style lang="scss" module="styles">
.waterfull {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 60px - 24px - 24px);
  overflow: hidden;
}

.itemInner {
  overflow: hidden;
}

$index: 0;
@for $i from 1 through 4 {
  $index: $index + 1;
  .itemWrap:nth-child(#{$i}) {
    margin-top: 95px + ($index * 60);
  }
}

$index1: 4;
@for $i from 5 through 8 {
  $index1: $index1 - 1;
  .itemWrap:nth-child(#{$i}) {
    margin-top: 130px + ($index1 * 50);
  }
}

.shadom {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 400px;
  background: linear-gradient(
    0deg,
    hsla(0, 0%, 100%, 0.8),
    hsla(0, 0%, 100%, 0)
  );
}
.search {
  position: absolute;
  top: 40px;
  left: 50%;
  z-index: 9;
  transform: translateX(-50%);
  h1 {
    font-weight: 300;
    font-size: 60px;
    text-align: center;
    span {
      color: #ff5967;
      font-weight: 300;
    }
  }
  .searchInput {
    width: 700px;
    height: 56px;
    margin-top: 24px;
    padding: 0 24px;
    font-size: 16px;
    background: #fff;
    border-radius: 32px;
    box-shadow: 0 8px 48px 8px rgb(0 0 0 / 8%);
    &:hover {
      border: 1px solid #ff7081;
    }
    :global .el-input__wrapper {
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
    :global .el-input__inner {
      height: 56px;
      font-size: 16px;
      line-height: 56px;
    }
  }
}
</style>
<script lang="ts" setup>
import type { Resource } from '@/interface';
import CardResource from '@/components/cardResource/cardResource.vue';
import { ref, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';

const props = defineProps<{ data: Resource[][] }>();

const itemBox = ref<Element[]>([]);

const setItemBoxRef = (el: Element, idx: number) => {
  if (el) {
    itemBox.value[idx] = el;
  }
};

const input = ref('');
// 输入提交
const inputChange = (e: string) => {
  console.log(e);
};

let start = 0;
let index = 0;
let step = 0;
const animation = () => {
  requestAnimationFrame((timestamp) => {
    if (start === 0) {
      start = timestamp;
    }

    const duration = 1000 * 5;
    const arr = [3, 5, 4, 6, 2, 1, 0, 7];

    if (timestamp - start >= duration) {
      start = timestamp;
      index++;

      if (index <= 7) {
        step = step - 316;
        for (const [ii, i] of arr.entries()) {
          const slider = itemBox.value[i] as HTMLElement;
          const card = slider.children[index - 1] as HTMLElement;
          card.setAttribute(
            'style',
            `transition:all .35s ease-out ${ii / 10}s;opacity:0;`
          );
          slider.setAttribute(
            'style',
            `transition:all 0.5s ease-in-out ${
              ii / 10
            }s;transform:translateY(${step}px);`
          );
        }
      } else {
        index = 0;
        step = 0;
        for (const i of arr) {
          const slider = itemBox.value[i] as HTMLElement;
          for (const j of [0, 1, 2, 3, 4, 5, 6]) {
            const card = slider.children[j] as HTMLElement;
            card.setAttribute('style', 'opacity:1;');
          }
          slider.setAttribute('style', 'transform:translateY(0px)');
        }
      }
    }
    animation();
  });
};

onMounted(() => {
  animation();
});
</script>
