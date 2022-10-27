<template>
  <div :class="styles.header">
    <router-link :to="{ name: 'home' }">
      <div :class="styles.logo"></div>
    </router-link>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
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

    <el-tooltip
      placement="top-start"
      content="上传资源"
      trigger="hover"
      effect="light"
    >
      <el-icon
        color="rgba(30,32,35,.65)"
        size="32px"
        style="margin-left: 30px"
        @click="openModal"
        ><DocumentAdd
      /></el-icon>
    </el-tooltip>
  </div>

  <UploadModal
    :uploadModalFlag="uploadModalFlag"
    @ok="handleUploadOk"
    @cancel="handleUploadCancel"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { DocumentAdd } from '@element-plus/icons-vue';
import UploadModal from './uploadModal.vue';

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

const uploadModalFlag = ref(false);
const openModal = () => {
  uploadModalFlag.value = true;
};

const handleUploadOk = () => {
  uploadModalFlag.value = false;
};

const handleUploadCancel = () => {
  uploadModalFlag.value = false;
};
</script>

<style lang="scss" module="styles">
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;

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
  }

  :global .el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
    color: rgba(30, 32, 35, 0.65);
    font-size: 16px;
  }

  :global .el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
    color: rgba(30, 32, 35, 1);
    border: none;
  }

  :global .el-menu--horizontal > .el-menu-item.is-active {
    color: rgba(30, 32, 35, 1) !important;
    border: none;
  }

  :global .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  :global .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: rgba(30, 32, 35, 1);
    background-color: #fff;
    outline: 0;
  }

  a {
    text-decoration: none;
  }
}

.logo {
  width: 28px;
  height: 60px;
  background: url('./image/icon.svg') no-repeat center;
}

:global .el-menu--horizontal .el-menu .el-menu-item a {
  color: rgba(30, 32, 35, 0.65) !important;
  font-size: 14px;
  text-decoration: none !important;
}

:global .el-menu--horizontal .el-menu .el-menu-item.is-active a {
  color: rgba(30, 32, 35, 1) !important;
}
:global .el-upload-dragger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: none;
}
</style>
