<template>
  <div>
  <el-upload
    action="#"
    list-type="picture-card"
    :limit='1'
    :before-upload="beforeAvatarUpload"
    :on-exceed="overflod"
    :file-list="imglist"
    :http-request="uploadToCos"
    :on-change="loding"
    style="display: flex;"
    >
      <i data-v-55c71aa0="" class="el-icon-upload2 avatar-uploader-icon"></i>
      <span data-v-55c71aa0="">上传图片</span>
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="newList[0]" alt=""
        >

        <span class="el-upload-list__item-actions">
          <!-- <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span> -->

          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  <el-progress style="width: 50%;" v-show="progressFlag" :percentage="loadProgress"></el-progress>
  </div>
</template>

<script>

import { putObjects } from '@/assets/js/upload.js'
export default {
props:['hasqrimg'],
  data() {
    return {
    dialogImageUrl: '',
    dialogVisible: false,
    disabled: false,
    imglist:[],
    newList:[],
    progressFlag:false,
    loadProgress:0
    }
  },
  mounted() {
    this.$nextTick(()=>{
      if(this.hasqrimg != ''){
        let ob=Object
        ob.uid=123//随便给的，并不上传
        ob.file=this.hasqrimg
        this.imglist.push(ob),
        this.newList.push(this.hasqrimg)
      }

    })

  },


 methods: {
   loding(file){
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

   beforeAvatarUpload(file) {
     const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif'
     const isLt2M = file.size / 1024 / 1024 < 2;

     if (!isJPG) {
       this.$message.error('上传二维码图片只能是 JPG/PNG/JPEG/GIF 格式!');
       this.progressFlag = false;

     }
     if (!isLt2M) {
       this.$message.error('上传二维码图片大小不能超过 2MB!');
        this.progressFlag = false;
     }
     return isJPG && isLt2M;
   },


    handlePictureCardPreview(file) { //放大

           this.dialogImageUrl = this.newList[0];
           this.dialogVisible = true;
         },

   handleRemove(file) {
           const index =this.imglist.findIndex(item => item.uid === file.uid)
           this.imglist=[]//移除已上传的图片0
           this.newList=[]
         },

    overflod(){
       this.$alert('只允许上传一张图片，如需更换请先删除', {
                confirmButtonText: '确定',})
    },

   uploadToCos (fel) {
        this.imglist.push(fel.file)
        // console.log(this.imglist)
        let nnewList=[]
         putObjects(fel.file.name,fel.file).then(res=>{
           let qrimg='https://' + res.Location
           nnewList.push(qrimg)

           return nnewList

         })
         this.newList=nnewList

       },



 },
 watch:{
   newList(n){
     this.$emit("qrimg",n)
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
