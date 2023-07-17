<template>
  <div class="upload-demo">
    <el-upload v-loading="loading" action="/tools/removeImg/" :multiple="fileOperation.multiple"
      :drag="fileOperation.drag" :accept="fileOperation.accept" :on-preview="handlePreview" :on-remove="handleRemove"
      :file-list="fileList" :before-upload="beforeFileUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传{{ fileOperation.accept }}文件</div>
    </el-upload>
    <div>
      <el-button v-if="showLink" :span="12" type="primary" @click="downloadFile">下载文件</el-button>
      <el-button v-if="showLink" :span="12" type="primary" @click="resetFile">重置</el-button>
    </div>
    <div>
      <img :src="downloadLink" :span="24" v-if="showLink" alt="" />
    </div>
  </div>
</template>

<script>
import imglyRemoveBackground from '@imgly/background-removal'
import { saveAs } from 'file-saver'

export default {
  name: 'RemoveBackground',
  data () {
    return {
      fileList: [],
      fileOperation: {
        multiple: false,
        drag: true,
        accept: '.png,.jpg,.jpeg'
      },
      publicPath: './imgly/',
      loading: false,
      showLink: false,
      downloadLink: '',
      blob: null
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeFileUpload (file) {
      this.resetFile()
      const { name, uid, size, type } = file
      this.fileList.push({ name, uid, size, type })
      this.loading = true
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = e => {
        imglyRemoveBackground(e.target.result).then((blob) => {
          const url = URL.createObjectURL(blob)
          this.loading = false
          this.downloadLink = url
          this.blob = blob
          this.showLink = true
        }).catch(err => {
          // Handle any errors here\
          this.loading = false
          console.error(err)
        })
      }
      return false
    },
    downloadFile () {
      saveAs(this.blob, this.fileList[0].name.split('.')[0] + '.png', { autoBom: true })
    },
    resetFile () {
      this.fileList = []
      this.showLink = false
      this.downloadLink = ''
      this.blob = null
    }
  }
}
</script>

<style scoped>
.el-button {
  margin-top: 10px;
}

.upload-demo {
  width: 320px;
  margin: 0 auto;
  font-size: 18px;
  padding: 12px 0;
}

img {
  width: 320px;
}

.upload-demo ::v-deep .el-upload-dragger {
  width: 320px;
  height: 120px;
}

.upload-demo ::v-deep .el-upload-dragger .el-icon-upload {
  margin: 30px 0;
}
</style>
