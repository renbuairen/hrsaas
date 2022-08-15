<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      action="#"
      :file-list="fileList"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      list-type="picture-card"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <!-- 弹窗图片 -->
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDlLfiTxA6l8E3bKmyDJAm9HAoDNIyQdbP',
  SecretKey: 'iLqCORK2ayA7qKabOt86nDLCl6BzVkiQ'
})
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      imgUrl: '',
      previewImgDialog: false,
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true

      cos.putObject(
        {
          Bucket: 'hm-37-1313341614' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          //成功或值失败均进入该两数
          // err null false 没有错
          // errnull true有错
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', { url: 'http://' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      //可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }

      //限制上传的图片
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('文件不能大于2MB')
        return false
      }

      //   console.log('上传前的检查', file)
    }
  }
}
// AKIDlLfiTxA6l8E3bKmyDJAm9HAoDNIyQdbP
// iLqCORK2ayA7qKabOt86nDLCl6BzVkiQ
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}

.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
