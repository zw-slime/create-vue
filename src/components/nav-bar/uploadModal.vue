<template>
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

</script>
