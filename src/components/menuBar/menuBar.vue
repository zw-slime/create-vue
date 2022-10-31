<template>
  <div :class="styles.menu">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <template v-for="menu in menuData" :key="menu.path">
        <el-sub-menu :index="menu.path" v-if="menu.children">
          <template #title>{{ menu.name }}</template>
          <template v-for="menu1 in menu.children" :key="menu1.path">
            <el-menu-item :index="menu1.path">
              <router-link :to="{ name: menu1.path }">{{
                menu1.name
              }}</router-link>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <el-menu-item :index="menu.path" v-else>
          <router-link :to="{ name: menu.path }">{{ menu.name }}</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<style lang="scss" module="styles">
.menu {
  display: flex;
  align-items: center;
  :global .el-menu {
    min-width: 380px;
    margin: 0 14px;
    background-color: transparent;
    border: none;
  }

  :global .el-menu--horizontal > .el-menu-item {
    color: rgba(30, 32, 35, 0.65);
    font-size: 16px;
    transition: color 0.3s;
    a {
      font-weight: bold;
    }
  }

  :global .el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
    color: rgba(30, 32, 35, 0.65);
    font-size: 16px;
    background-color: transparent !important;
    border: none !important;
    font-weight: bold;
  }

  :global .el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
    color: rgba(30, 32, 35, 1);
    border: none !important;
  }

  :global .el-menu--horizontal > .el-menu-item.is-active {
    color: rgba(30, 32, 35, 1) !important;
    border: none !important;
  }
  :global .el-sub-menu {
    background-color: transparent !important;
  }

  :global .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  :global .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: rgba(30, 32, 35, 1) !important;
    background-color: transparent !important;
    outline: 0 !important;
  }
  a {
    text-decoration: none;
  }
}
</style>
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const menuData = [
  { name: '发现', path: 'home' },
  {
    name: '资源',
    path: 'resource',
    children: [
      { name: '书籍', path: 'book' },
      { name: '漫画', path: 'cartoon' },
      { name: '美图', path: 'picture' },
      { name: '素材', path: 'material' },
    ],
  },
  { name: '教程', path: 'learn' },
  { name: '广场', path: 'square' },
];

const route = useRoute();
// 导航选中 随着路由变动
const activeIndex = computed(() => {
  const pathArr = route.path.split('/');
  return pathArr.length ? pathArr[pathArr.length - 1] || 'home' : 'home';
});
</script>
