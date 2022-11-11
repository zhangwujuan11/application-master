<template>

  <el-card class="box-card">
    <h3 class="formTitle">审核认证 &nbsp; <span class="gay">> &nbsp;公司详情</span> </h3>
   <el-form :model="companyInfo" label-width="100px">
        <el-col :span="12">
          <el-form-item label="企业名称:">
            <el-col :span='17'>
              <el-input
              v-model="companyInfo.enterprisename"
               type="text"
                :readonly="true"
               show-word-limit
              ></el-input>
            </el-col> <br>
       </el-form-item>
       <el-form-item label="主体信息:" prop="subjectinformation">
          <el-input
          v-model="companyInfo.subjectinformation"
           type="text"
            :readonly="true"
           show-word-limit
          ></el-input>
       </el-form-item>
     <el-form-item label="企业类型:" >
       <p class="filterBox">{{ers}}</p>
     </el-form-item>
     <el-form-item label="企业简介:" >
       <el-col :span="17">
         <p class="filterBox">{{companyInfo.enterpriseintroduction}}</p>
       </el-col>
     </el-form-item>

     <el-form-item  label="服务行业:" >
        <p class="filterBox">{{ser}}</p>
     </el-form-item>
     <el-form-item label="企业注册地:">
        <el-col :span='17'>
          <el-input
          v-model="companyInfo.registrationplace"
           type="text"
          :readonly="true"
          ></el-input>
        </el-col>
     </el-form-item>
     <el-form-item label="所在地区:">
        <el-col :span='17'>
          <el-input v-model="companyInfo.enterpriselocation" :readonly="true"></el-input>
        </el-col>
     </el-form-item>
     <el-form-item label="官方网站:">
        <el-col :span='17'>
          <el-input v-model="companyInfo.officialwebsite" :readonly="true"></el-input>
        </el-col>
     </el-form-item>
     <el-form-item label="企业头像:">
      <p @click="morebig(companyInfo.enterpriseavatar)"><img :src="companyInfo.enterpriseavatar" alt=""></p>
     </el-form-item>
     <el-form-item  label="开户银行名称:" prop="bankname">
        <el-col :span='17'>
          <el-input v-model="companyInfo.bankname" :readonly="true"></el-input>
        </el-col>
     </el-form-item>
     <el-form-item label="开户公司名称:" prop="openaccountenterprisename">
        <el-col :span='17'>
          <el-input v-model="companyInfo.openaccountenterprisename" :readonly="true"></el-input>
        </el-col>
     </el-form-item>
     <el-form-item  label="认证方式:" prop="verificationmode">
        <p class="filterBox">{{companyInfo.verificationmode | chemethod}}</p>
     </el-form-item>
   </el-col>
      <el-col :span="12">
        <el-form-item label="开户银行账号:" prop="bankaccount">
           <el-col :span='17'>
             <el-input v-model="companyInfo.bankaccount" :readonly="true"></el-input>
           </el-col>
        </el-form-item>
        <el-form-item v-model="companyInfo.businesslicenseurl" label="营业执照:" prop="businesslicenseurl">
          <p><img :src="companyInfo.businesslicenseurl" alt=""></p>
        </el-form-item>
        <el-form-item  label="统一社会信用代码:" prop="unifysocialcredit">
           <el-col :span='17'>
             <el-input v-model="companyInfo.unifysocialcredit" :readonly="true"> </el-input>
           </el-col>
        </el-form-item>


        <el-form-item label="提交时间:" prop="authenticationtime">
           <el-col :span='17'>
             <el-input v-model="companyInfo.authenticationtime" :readonly="true"></el-input>
           </el-col>
        </el-form-item>
        <!-- <el-form-item label="认证时间" prop="authenticationupdatetime">
           <el-col :span='17'>
             <el-input  v-model="companyInfo.unifysocialcredit" :readonly="true"></el-input>
           </el-col>
        </el-form-item> -->
        <el-form-item label="认证状态:" prop="status">
           <el-col :span='17'>
             <p class="filterBox">{{companyInfo.status | chekstatus}}</p>
           </el-col>
        </el-form-item>
        <el-form-item v-model="companyInfo.brandcrtregistrationurl" label="商标注册证书:" prop="brandcrtregistrationurl">
          <p @click="morebig(companyInfo.brandcrtregistrationurl)"><img :src="companyInfo.brandcrtregistrationurl" alt=""></p>
        </el-form-item>
        <el-form-item v-model="companyInfo.brandaccrediturl" label="商标授权书:" prop="brandaccrediturl">
          <p @click="morebig(companyInfo.brandaccrediturl)"><img :src="companyInfo.brandaccrediturl" alt=""></p>
        </el-form-item>



        <el-form-item label="联系人姓名:" prop="contactname">
           <el-col :span='17'>
             <el-input v-model="companyInfo.contactname" :readonly="true"></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="联系人电话:" prop="contactphone">
           <el-col :span='17'>
             <el-input v-model="companyInfo.contactphone" :readonly="true"></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="联系人座机号:" prop="contactspecialplane">
          <el-col :span="17">
            <el-input v-model="companyInfo.contactspecialplane" :readonly="true"/>
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
  import { statuGetInfo,examine } from '@/api/adminCenter'
  import { serveType } from '@/api/login'
export default {
  filters:{
    chemethod(e) {
      if(e==1){
        return "对公账号打款"
      }else if(e==2){
        return "法人扫脸"
      }else if(e==3){
        return "电子营业执照"
      }
    },
    chekstatus(e){
      if(e==1){
        return "审核通过"
      }else if(e==2){
        return "审核中"
      }else {
        return "未审核"
      }
    }
  },
  inject:["reload"],
  data(){
    return({
      appid:'',
      companyInfo:{},
      ers:'',
      ser:''
    })
  },

  mounted() {
    this.appid=this.$route.query.id
    this.getcompanyInfo()
    this.getenTypes()
    this.getserveList()
  },

  methods: {
    async getcompanyInfo(){
      const data=await statuGetInfo(JSON.parse(this.appid)).then(res=>{
        this.companyInfo=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    // 企业类型列表
    async getenTypes(){
      const data=await serveType(
    {
        "auth": 2,
        "project": "applet",
        "table": "sys_enterprise_type_info",
        "conditions": {
            "fields": [],
            "query": {}
        }
    }
      ).then(res=>{
          let trs=res.data.data
          let trr=this.companyInfo.enterprisetypecode
          for(var i=0;i<trs.length;i++){
            if (trr == trs[i].enterpriseTypeCode) {
              this.ers= trs[i].enterpriseTypeName

            }
        }

      })
    },
    // 服务行业列表
    async getserveList(){
      const data=await serveType(
        {
            "auth": 2,
            "project": "applet",
            "table": "sys_service_trade_info",
            "conditions": {
                "fields": [],
                "query": {}
            }
        }
      ).then(res=>{
        let serve=res.data.data
        let ser=this.companyInfo.servicetrade
        for(var i=0;i<serve.length;i++){
          if(ser == serve[i].serviceTrade){
            this.ser=serve[i].serviceTradeName
          }
        }
      }).catch(err=>{
        console.log("00")
      })
    },
    // 不通过
    fail(){

       this.$prompt('未通过理由', '审核认证失败', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType:"textarea",
                inputPattern: /\S/,
                inputErrorMessage: '请输入不通过理由'
              }).then(({ value }) => {
                let unsend= {
                  "appId":JSON.parse(this.appid),
                  "flag":0,
                  "reason":value,
                  "username":this.$store.state.user.userInfo.username
                }
                // console.log(typeof(value))
                examine(unsend).then(res=>{
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  this.$router.push("/home/adminCenter/examine/index")
                  this.reload()
                })


              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });
              });

    },
    // 通过
    async pass(){
      let smsg = {
                  "appId":JSON.parse(this.appid),
                  "flag":1,
                  "reason":'',
                  "username":this.$store.state.user.userInfo.username
                }
      const data=await examine(smsg).then(res=>{
        this.$message.success("操作成功")
        this.$router.push("/home/adminCenter/examine/index")
        this.reload()
      }).catch(err=>{
        this.$message.error("操作失败")
      })
    },
    morebig(n){
      this.$alert(`<img style="max-width:450px;" src="` + n +`">`, {
                dangerouslyUseHTMLString: true
              });
    }
  },
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
  white-space:normal; width:200px; overflow:auto;
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
</style>
