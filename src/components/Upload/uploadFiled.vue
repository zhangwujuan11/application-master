<template>
  <el-upload
    ref="upload"
    action="#"
    :file-list="fileList"
    :data="params"
    :on-exceed="handleEsceed"
    :http-request="handleSuccess"
    :on-error="handleError"
    :on-remove="handleRemove"
    :before-upload="beforeAvatarUpload"
    :limit="limitNum"
    :on-change="ttttb"

  >
     <input type="text" disabled/>
     <i class="el-icon-folder-opened"></i>
      <el-progress v-show="progressFlag" :percentage="loadProgress"></el-progress>
  </el-upload>

</template>

<script>
import { putObjects } from '@/assets/js/upload.js'
export default {

  data() {
    return {
      key: '',
      show: false, //  从这里开始是上传头像的
      fileList: [],
      cosList: [], // 保存对象存储的相关信息(临时)
      limitNum: 1,
      params: {},
      badUid: null, // 错误上传文件
      errorFiles: [] ,// 异常文件（文件上传至对象存储失败） 修复文件显示上传成功但异常发生错误的文件无法删除的问题
      size:"",
      progressFlag:false,
      loadProgress:0
    }
  },
  watch: {
    cosList(n){
      this.$emit("fileList",n)
    },
    size(n){
      this.$emit("fileSize",n)
    }
  },
  methods: {
    // 上传前过滤类型
    beforeAvatarUpload(file,fileList) {
            const iszip = file.name.split("").slice(-4,file.name.length).join("") === '.zip' || file.name.split("").slice(-4,file.name.length).join("") === '.rar';
            if (!iszip) {
              this.$message.error('上传文件夹只能是压缩格式!');
              this.progressFlag = false;

            }
             return iszip
          },
    handleEsceed() {
      this.$message.warning('上传的文件个数已超出限制范围！')
    },
    handleSuccess(fel){
      this.size=fel.file.size
      putObjects(fel.file.name,fel.file).then(res=>{
        this.cosList.push('https://' + res.Location)
      })
    },
    ttttb(file){
      if(file.status === 'ready'){
                this.progressFlag = true; // 显示进度条
                this.loadProgress = 0;
                const interval = setInterval(() => {
                  if(this.loadProgress >=99){
                    clearInterval(interval)
                    this.progressFlag = false; // 显示进度条
                    this.loadProgress = 100;
                    return
                  }
                  this.loadProgress += 1

                }, 20);
              }
      if (file.status === 'success') {
        this.progressFlag = false; // 显示进度条
        this.loadProgress = 100;
      }
    },

    handleError() {
      this.$message.error('文件上传失败！')
    },
    handleRemove(file) {
       this.cosList =[]
       this.size=''
    // 修复错误文件无法从文件列表删除的bug
      // if (this.badUid && this.badUid === file.uid) {
      //   console.log("类型错误")
      //   this.badUid = null
      //   return true
      // }
      //   this.fileListData = [...fileList]
      
    }
  }
}
</script>
<style scoped>
  input{
    border:none;
    height: 36px;
    width: 100%;
    padding: 0 15px;
    border-radius: 4px;
    background-color: white;
  }
  /deep/.el-upload{
    width: 66.666%;
    position: relative;
  }
  .el-icon-folder-opened{
    font-size: 24px;
    color: #2F88FF;
    position: absolute;
    left:0;
    top: 6px;
  }
</style>
