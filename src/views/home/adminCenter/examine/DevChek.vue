<template>

  <el-card class="box-card">
    <h3 class="formTitle">审核认证 &nbsp; <span class="gay">> &nbsp;版本详情</span> </h3>
   <el-form :model="appInfo" label-width="100px">
        <el-col :span="12">
          <el-form-item label="应用名称:">
            <el-col :span='17'>
              <el-input
              v-model="appInfo.appName"
               type="text"
                :readonly="true"
               show-word-limit
              ></el-input>
            </el-col> <br>
       </el-form-item>

     <el-form-item label="应用大小:">
        <el-col :span='17'>
          <el-input
          v-model="appInfo.size"
           type="text"
          :readonly="true"
          ></el-input>
        </el-col>
     </el-form-item>

     <el-form-item  v-if=" appInfo.websiteurl != '' " label="网站网址:">
        <p class="filterBox">{{appInfo.websiteurl}}</p>
     </el-form-item>
     <el-form-item   label="应用资源包">
        <p class="filterBox"> <a :href="url">{{url}}</a></p>
     </el-form-item>

   </el-col>
      <el-col :span="12">
        <el-form-item label="应用版本号:" prop="bankaccount">
           <el-col :span='17'>
             <el-input v-model="appInfo.versioncode" :readonly="true"></el-input>
           </el-col>
        </el-form-item>
       <!-- <el-form-item v-model="appInfo.businesslicenseurl" label="营业执照:" prop="businesslicenseurl">
          <p><img :src="appInfo.businesslicenseurl" alt=""></p>
        </el-form-item> -->
        <el-form-item  label="版本内容:">
           <el-col :span='17'>
             <el-input v-model="appInfo.appIntroduction" :readonly="true"> </el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="版本提交时间" prop="authenticationupdatetime">
           <el-col :span='17'>
             <el-input  v-model="appInfo.dcreateTime" :readonly="true"></el-input>
           </el-col>
        </el-form-item>
      </el-col>
     </el-form>
     <div class="btnBox">
         <el-button @click="fail" type="danger">不通过</el-button>
          <el-button @click="pass" type="primary">通&nbsp;过</el-button>
     </div>

  </el-card>
</template>
<script>
  import { checkAppservion } from '@/api/adminCenter'
  import { serveType } from '@/api/login'
export default {
  filters:{
    appTypes(e){
      if(e==1){
        return "小程序"
      }else if(e==2){
        return "移动开发"
      }else if(e==3){
        return "网页开发"
      }
    },

    appTstatus(e){
      if(e==1){
        return "正常"
      }else if(e==0){
        return "停用"
      }
    },

  },
  inject:["reload"],
  data(){
    return({
      appInfo:{},
      url:'',
      appid:'',
      did:null
    })
  },

  mounted() {
    this.appInfo=JSON.parse(this.$route.query.id)
    this.appid= this.appInfo.appId
    this.did=this.appInfo.did
    this.url=this.appInfo.url.match(/"(\S*)"/)[1]


  },

  methods: {
    // 不通过
    fail(){
       this.$prompt('未通过理由', '审核认证失败', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType:"textarea",
                inputPattern: /\S/,
                inputErrorMessage: '请输入不通过理由'
              }).then(({ value }) => {
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  this.$router.push("/home/adminCenter/examine/index")
                  this.reload()
              })
    },
    // 通过
    async pass(){
      let smsg = {
                  "appId":this.appid,
                  "id":this.did,
                  "username":this.$store.state.user.userInfo.username
                }
      const data=await checkAppservion(smsg).then(res=>{
        this.$message.success("操作成功")
        this.$router.push("/home/adminCenter/examine/index")
        this.reload()
      }).catch(err=>{
        this.$message.error("操作失败")
      })
    },
    // 图片放大
    morebig(n){
      this.$alert(`<img style="max-width:450px;" src="` + n +`">`, {
                dangerouslyUseHTMLString: true
              });
    }
  }
  }
</script>
<style scoped>
.box-card{
  margin-top: 40px;
  padding: 20px 0 100px 0;
}
.formTitle{
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #3A3A3A;
  border-bottom: 1px solid #C4C4C4;
  width: 100%;
  text-indent: 40px;
  margin-top: 0;
}
.memberAdmin{
  width: 100%;
  padding: 0 20px;
}
.el-form .el-col-12:first-child{
  padding-left:40px;
}
.gay{
  color: #7A7A7A;
  font-size: 16px;
  font-weight: normal;
}
/deep/.el-input--medium .el-input__inner{
  border: none;
}
img{
  width: 110px;
  height: 110px;
  border-radius: 10px;
}
/deep/.el-form-item--medium .el-form-item__label{
  width: 120px !important;
}
/deep/.el-form-item__content{
  margin-left: 122px !important;
}
.filterBox{
  line-height: 36px;
  margin: 0;
  padding-left: 15px;
}
.btnBox{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
.btnBox .el-button{
  margin-right: 50px;
}
.picture p{
  float: left;
  margin-right: 15px;
}
.filterBox a{
  color: blue;
}
</style>
