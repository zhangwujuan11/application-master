<template>
  <div>
  <el-upload
    action="#"
    list-type="picture-card"
    :limit='4'
    :before-upload="beforeAvatarUpload"
    :on-exceed="overflod"
    :file-list="imglist"
    :http-request="uploadToCos"
    :before-remove="handleRemove"
    style="display: flex;"
    >
      <i class="el-icon-upload2 avatar-uploader-icon"></i>
      <span >上传4张图片</span>
      
  </el-upload>
  </div>
</template>

<script>

import { putObjects } from '@/assets/js/upload.js'
export default {

  data() {
    return {
    dialogImageUrl: '',
    disabled: false,
    imglist:[],
    newList:[],
    imageUrl:'',
    videoFlag: false,
    videoUploadPercent: 0,

    }
  },


 methods: {

   beforeAvatarUpload(file) {
     const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif'
     const isLt2M = file.size / 1024 / 1024 < 2;

     if (!isJPG) {
       this.$message.error('上传图片只能是 JPG/PNG/JPEG/GIF 格式!');
     }
     if (!isLt2M) {
       this.$message.error('上传图片大小不能超过 2MB!');
     }
     return isJPG && isLt2M;
   },


   handleRemove(file) {
             const index =this.imglist.findIndex(item => item.uid === file.uid)
             this.imglist.splice(index, 1)//移除已上传的图片0
             this.newList.splice(index, 1)
             // console.log( this.imglist,this.newList)
         },

    overflod(){
       this.$alert('只允许上传四张图片，如需更换请先删除', {
                confirmButtonText: '确定',})
    },




   uploadToCos (file) {
     this.imglist.push(file.file)
     let nnlist=[]
     for (var i=0;i<this.imglist.length;i++) {
       putObjects(this.imglist[i].name,this.imglist[i]).then(res=>{
         let qrimg='https://' + res.Location
          nnlist.push(qrimg)
          this.newList = JSON.parse(JSON.stringify(nnlist))
          })
        }

       },
 },
 watch:{
    newList(n){
      this.$emit("newingList",n)
    }
 }

}
</script>
<style scoped>
/deep/.el-upload{
      width: 100px;
      height: 100px;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #409EFF;
    }
    /deep/.el-upload:hover {
      border-color: #409EFF;

    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #409EFF;

    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    /deep/.el-icon-upload2:before{
      font-size: 28px;
    }
    /deep/.el-upload--picture-card{
      line-height: normal;
    }
    /deep/.el-upload-list--picture-card .el-upload-list__item{
      width: 100px;
      height: 100px;
    }
</style>
