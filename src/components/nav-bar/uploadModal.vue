<template>
<el-dialog v-model="props.uploadModalFlag" title="上传资源" width="30%" draggable >
    <el-form ref="uploadRuleFormRef" :model="uploadRuleForm" :rules="uploadRules" label-width="120px"  status-icon>
      <el-form-item label="类型" prop="type">
        <el-select-v2
            v-model="uploadRuleForm.type"
            placeholder="请选择类型"
            :options="typeOptions"
            @change="uploadRuleFormRef.validate()"
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

        <el-upload v-else-if="uploadRuleForm.type === 'picture' || uploadRuleForm.type === 'material'"
            v-model:file-list="fileList"
            list-type="picture-card"
            @change="uploadRuleFormRef.validate()"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
                   :before-upload ="beforeUpload"
                   :auto-upload="false"
                   drag

        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-input v-model="uploadRuleForm.resource" v-else-if="uploadRuleForm.type === 'cartoon'"/>

        <el-input v-model="uploadRuleForm.resource" v-else/>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-checkbox-group v-model="uploadRuleForm.keyword" v-for="k in keywords">
          <el-checkbox :label="k" :name="k" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="uploadRuleForm.desc" type="textarea" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadClose">取消</el-button>
        <el-button type="primary" @click="()=>submitForm(uploadRuleFormRef as FormInstance)" html-type="submit"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'
import {ref, reactive} from 'vue';
import type {FormInstance,FormRules} from 'element-plus';
import {ElMessage} from 'element-plus';

const props = defineProps<{
  uploadModalFlag: boolean
}>()


const emit = defineEmits<{
  (e: 'ok'): void
  (e: 'cancel'): void
}>()

const typeOptions = [{value:'book',label:'书籍'},{value:'cartoon',label:'漫画'},{value:'picture',label:'美图'},{value:'material',label:'素材'}]
const keywords = ['music','music2','music3','music4','music5']

interface FormState {
  type: string
  name: string
  date: string
  resource: string
  keyword: string[],
  desc: string
}

const uploadRuleFormRef = ref<FormInstance>()
const uploadRuleForm = reactive<FormState>({
  type: 'book',
  name: '',
  date: '',
  resource: '',
  keyword: [],
  desc: '',
})

const validateResource = (rule: any, value: any, callback: any) => {
  const {type,resource}= uploadRuleForm
  if (type !== 'picture' && type !== 'material' && !resource) {
    callback(new Error('请填写资源'))
  } else if((type === 'picture' || type === 'material') && fileList.value.length<=0) {
    callback(new Error('请上传资源'))
  } else {
    callback()
  }
}
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
      type: 'string',
      trigger: 'change',
      validator: validateResource
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
    { required: false,type:'string'},
  ],
})
const fileList = ref<File[]>([]);
const submitForm = async (form: FormInstance) => {

  const data = await form.validate((valid, fields) => {
    if (valid) {

      console.log('submit!')

    } else {
      console.log('error submit!', fields)
    }


    const formData: {type:string,date: string,desc:string,keyword: string[],name:string,resource: string | File[]} = {...uploadRuleForm}

    if(formData.type === 'picture' || formData.type === 'material') {
      formData.resource = fileList.value
    }
    console.log(formData)

    // emit('ok');
  })



}



const uploadClose = () => {
  emit('cancel');
}


// uplaod组件

const handlePictureCardPreview = () => {

}
const handleRemove = () => {

}
const beforeUpload = (f:File) => {
  console.log(f)
  const fileAccept = ['image/jpeg','image/png','image/svg']
  if(!fileAccept.includes(f.type)) {
    ElMessage.error('只能上传图片格式为：jpeg/jpg/png')
    return false;
  }
}
</script>
