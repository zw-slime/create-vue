<template>
  <div :class="styles.header">
    <router-link :to="{ name: 'home'}">
      <div :class="styles.logo"></div>
    </router-link>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
    >
      <template v-for="menu in menuData">
        <el-sub-menu :index="menu.path" v-if="menu.children">
          <template #title>{{ menu.name }}</template>
          <template v-for="menu1 in menu.children">
            <el-menu-item :index="menu1.path">
              <router-link :to="{ name: menu1.path}">{{ menu1.name }}</router-link>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <el-menu-item :index="menu.path" v-else>
          <router-link :to="{ name: menu.path}">{{ menu.name }}</router-link>
        </el-menu-item>
      </template>

    </el-menu>
    <el-input v-model="input" placeholder="搜索" style="width: 500px;height:40px;" :suffix-icon="Search" @change="inputChange"  maxlength="20"  show-word-limit clearable/>

    <el-tooltip
    placement="top-start"
    content="上传资源"
    trigger="hover"
    effect="light"
  >
      <el-icon color="rgba(30,32,35,.65)" size='32px' style="margin-left:30px;" @click="uploadOpen"><DocumentAdd /></el-icon>
  </el-tooltip>

  </div>

  <el-dialog v-model="uploadModalFlag" title="上传资源" width="30%" draggable >
    <el-form ref="uploadRuleFormRef" :model="uploadRuleForm" :rules="uploadRules" label-width="120px"  status-icon>
      <el-form-item label="类型" prop="type">
        <el-select-v2
            v-model="uploadRuleForm.type"
            placeholder="请选择类型"
            :options="typeOptions"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="uploadRuleForm.name" />
      </el-form-item>
      <el-form-item label="过期时间" prop="date">
        <el-date-picker
            v-model="uploadRuleForm.date"
            type="date"
            label="过期时间"
            placeholder="选择过期时间"
            style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="资源" prop="resource">
        <el-input v-model="uploadRuleForm.resource" v-if="uploadRuleForm.type === 'book'"/>
        <el-upload v-else-if="uploadRuleForm.type === 'picture'"
            v-model:file-list="fileList"
                   action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
                   :before-upload ="beforeUpload"
                   drag

        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-input v-model="uploadRuleForm.file" v-else-if="uploadRuleForm.type === 'cartoon'"/>
        <el-input v-model="uploadRuleForm.file" v-else/>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-checkbox-group v-model="uploadRuleForm.keyword">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="uploadRuleForm.desc" type="textarea" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadClose">取消</el-button>
        <el-button type="primary" @click="submitForm" html-type="submit"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted,computed,reactive } from 'vue'
// import styles from './index.module.scss';
import {RouterLink,useRoute} from 'vue-router'
import { Search,DocumentAdd ,Plus} from '@element-plus/icons-vue'

const menuData = [
  {name: '发现', path: 'home'},
  {
    name: '资源', path: 'resource',
    children: [
      {name: '书籍', path: 'book'},
      {name: '漫画', path: 'cartoon'},
      {name: '美图', path: 'picture'},
      {name: '素材', path: 'material'}
    ]
  },
  {name: '教程', path: 'learn'},
  {name: '广场', path: 'square'},
]


const route = useRoute()
// 导航选中 随着路由变动
const activeIndex = computed(() => {
  const pathArr = route.path.split('/')
  return pathArr.length ? (pathArr[pathArr.length-1] || 'home' ):'home'
})

// onMounted(() => {
//   const pathArr = route.path.split('/')
//   console.log(pathArr.length ? pathArr[pathArr.length-1]:'')
//   activeIndex.value = pathArr.length ? pathArr[pathArr.length-1]:''
// });

const input = ref('')
// 输入提交
const inputChange = (e) => {
  console.log(e)
}
// form
const typeOptions = [{value:'book',label:'书籍'},{value:'cartoon',label:'漫画'},{value:'picture',label:'美图'},{value:'material',label:'素材'}]
const uploadRuleFormRef = ref<FormInstance>()
const uploadRuleForm = reactive({
  type: 'book',
  name: '',
  date: '',
  resource: null,
  keyword: [],
  desc: '',
})
const uploadRules = reactive<FormRules>({
  type: [{ required: true, message: '请选择类型', trigger: 'blur' },],
  name: [{ required: true, message: '请输入资源名称', trigger: 'blur' },
    { min: 5, max: 255, message: '名称长度：5-255', trigger: 'blur' },],
  date: [
    {
      type: 'date',
      required: true,
      message: '请选择过期时间',
      trigger: 'change',
    },
  ],
  resource: [
    {
      type: 'resource',
      required: true,
      message: '请上传资源',
      trigger: 'change',
    },
  ],
  keyword: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一个关键字',
      trigger: 'change',
    },
  ],
  desc: [
    { required: false},
  ],
})

const submitForm = async () => {
  console.log(uploadRuleFormRef.value)
  await uploadRuleFormRef.value.validate((valid, fields) => {
    if (valid) {

      console.log('submit!')
      uploadClose()
    } else {
      console.log('error submit!', fields)
    }
  })

}

console.log(uploadRuleForm.type)

const uploadModalFlag = ref(false);
const uploadOpen = () => {
  uploadModalFlag.value = true;
}

const uploadClose = () => {
  console.log(uploadModalFlag)
  uploadModalFlag.value = false;
}


// uplaod组件
const fileList = ref([]);
const handlePictureCardPreview = () => {

}
const handleRemove = () => {

}
const beforeUpload = (f) => {
  console.log(f)
  const fileAccept = ['image/jpeg','image/png','image/svg']
  if(!fileAccept.includes(f.type)) {
    ElMessage.error('只能上传图片格式为：jpeg/jpg/png')
    return false;
  }
}
</script>

<style lang="scss" module="styles">
.header {
  display: flex;
  width: 100%;
  align-items: center;
  height: 80px;

  :global .el-menu {
    border: none;
    min-width: 380px;
    margin: 0 14px;
  }

  :global .el-menu--horizontal>.el-menu-item {
    color: rgba(30,32,35,.65);
    font-size: 16px;
    transition: color .3s;
  }

  :global .el-menu--horizontal>.el-sub-menu .el-sub-menu__title {
    color: rgba(30,32,35,.65);
    font-size: 16px;
  }

  :global .el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title {
    border: none;
    color: rgba(30,32,35,1);;
  }

  :global .el-menu--horizontal>.el-menu-item.is-active {
    border: none;
    color: rgba(30,32,35,1) !important;
  }

  :global .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, :global .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: rgba(30,32,35,1) ;
    background-color: #fff
  }


  a {
    text-decoration: none;
  }
}

.logo {
  background: url("./image/icon.svg") no-repeat center;
  width: 28px;
  height: 60px;
}


:global .el-menu--horizontal .el-menu .el-menu-item a {
  color: rgba(30,32,35,.65) !important;
  font-size: 14px;
  text-decoration: none !important;
}

:global .el-menu--horizontal .el-menu .el-menu-item.is-active a{
  color: rgba(30,32,35,1) !important;
}
:global .el-upload-dragger {
  height: 100%;
  border:none;
  display:flex;
  align-items: center;
  justify-content: center;
}
</style>
