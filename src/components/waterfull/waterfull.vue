<template>
  <div :class="styles.search">
      <h1><span>花瓣，</span>陪你做生活的设计师</h1>
      <div :class="styles.searchInput">
        <el-input v-model="input" placeholder="超过40亿灵感等你来发现"  :suffix-icon="Search" @change="inputChange"  maxlength="20"  show-word-limit clearable/>
      </div>
    </div>
  <div :class="styles.waterfull">
    <div :class="styles.itemWrap" v-for="(group,index) in props.data">
      <div :class="styles.itemInner" >
        <div :class="styles.itemBox" :ref="(el) => setItemBoxRef(el, index)">
          <div :class="styles.item" v-for="item in group.concat(group)">
            <Card :src="item?.url"></Card>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div :class="styles.shadom"></div>

</template>
<style lang="scss" module="styles">
.waterfull {
  overflow:hidden;
  height: calc(100vh - 60px - 24px - 24px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
}

.itemInner {
  overflow: hidden;
}


$index : 0;
@for $i from 1 through 4 {
  $index: $index + 1;
  .itemWrap:nth-child(#{$i}) {
    margin-top: 95px + ($index * 60 );
  }
}

$index1 : 4;
@for $i from 5 through 8 {
  $index1: $index1 - 1;
  .itemWrap:nth-child(#{$i}) {
    margin-top: 130px + ($index1 * 50 );
  }
}

.shadom {
  position: fixed;
  bottom:0;
  width: 100vw;
  height:400px;
  background: linear-gradient(0deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0));
}
.search {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  h1 {
    font-size: 60px;
    text-align: center;
    font-weight: 300;
    span {
      color:#ff5967;
      font-weight: 300;
    }
  }
  .searchInput {
    margin-top: 24px;
    width: 700px;
    height: 56px;
    padding: 0 24px;
    border-radius: 32px;
    box-shadow: 0 8px 48px 8px rgb(0 0 0 / 8%);
    font-size: 16px;
    background: #fff;
    &:hover {
      border: 1px solid  #ff7081;
    }
    :global .el-input__wrapper {
      box-shadow: none;
      border:none;
      background-color: transparent;
    }
    :global .el-input__inner {
      height: 56px;
      line-height: 56px;
      font-size: 16px;

    }
  }
}

</style>
<script lang="ts" setup>
  import type {Resource} from "@/interface";
  import Card from '@/components/card/card.vue'
  import {reactive, watch, ref, onMounted} from "vue";
  import { Search } from '@element-plus/icons-vue'

  const props = defineProps<{ data: Resource[][]}>()

  const itemBox = ref<Element[]>([]);

  const setItemBoxRef = (el:Element, idx:number) =>{
    if (el) {
      itemBox.value[idx] = el;
    }
  }

  const input = ref('')
  // 输入提交
  const inputChange = (e: string) => {
    console.log(e)
  }

  let start = 0;
  let index = 0;
  let step = 0;
  const animation = () => {
    requestAnimationFrame((timestamp) => {

      if(start === 0 ) {
        start = timestamp;
      }

      const duration = 1000 * 5
      const arr = [3,5,4,6,2,1,0,7]

      if(timestamp - start >= duration) {
        start = timestamp;
        index++;
        if(index <= 7) {
          step = step - 316;
          for(const [ii,i] of arr.entries()) {
            itemBox.value[i].children[index-1].style = `transition:all .35s ease-out ${ii/10}s;opacity:0;`
            itemBox.value[i].style = `transition:all 0.5s ease-in-out ${ii/10}s;transform:translateY(${step}px);`
          }
        } else {
          index = 0;
          step = 0;
          for(const i of arr) {
            for (const j of [0, 1, 2, 3, 4, 5, 6]) {
              itemBox.value[i].children[j].style= 'opacity:1;'
            }
            itemBox.value[i].style = `transform:translateY(0px)`;
          }
        }
      }
      animation();
    })
  }

  onMounted(() => {
    const itemBox = document.querySelectorAll('.itemBox')
    animation()
  })

</script>
