<template>
  <div>
    <el-card class="box-card">
      <el-form ref="mesForm" :model="mesForm" :rules="rule" label-width="100px">
           <el-col :span="12">
             <el-form-item label="企业名称" prop="enterprisename">
               <el-col :span='17'>
                 <el-input
                  v-model="mesForm.enterprisename"
                  type="text"
                  show-word-limit
                  placeholder="请输入名称"
                 ></el-input>
               </el-col> <br>
          </el-form-item>
          <el-form-item  label="主体信息" prop="subjectinformation">
             <el-select v-model="mesForm.subjectinformation"  placeholder="请选择" style="width:300px;">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
          </el-form-item>
        <el-form-item label="企业类型" prop="enterprisetypecode">
          <el-select v-model="mesForm.enterprisetypecode"  placeholder="请选择" style="width:300px;">
              <el-option
                v-for="(item,index) in enTypes"
                :key="index"
                :label="item.enterpriseTypeName"
                :value="item.enterpriseTypeCode">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业简介" prop="enterpriseintroduction">
          <el-col :span="17">
            <el-input
              v-model="mesForm.enterpriseintroduction"
              type="textarea"
              placeholder="请输入内容"
              rows="5"
            />
          </el-col>
        </el-form-item>

        <el-form-item  label="服务行业" prop="servicetrade">
           <el-select v-model="mesForm.servicetrade"  placeholder="请选择" style="width:300px;">
               <el-option
                 v-for="(item,index) in serveList"
                 :key="index"
                 :label="item.serviceTradeName"
                 :value="item.serviceTrade">
               </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="企业注册地" prop="registrationplace">
           <el-col :span='17'>
             <el-input
              v-model="mesForm.registrationplace"
              type="text"
              placeholder="请输入注册地"
             ></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="所在地区" prop="enterpriselocation">
           <el-col :span='17'>
             <el-input
             v-model="mesForm.enterpriselocation"
              type="text"
              placeholder="请输入地区"
             ></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="官方网站" prop="officialwebsite">
           <el-col :span='17'>
             <el-input
              v-model="mesForm.officialwebsite"
              type="text"
              placeholder="请输入网址"
             ></el-input>
           </el-col>
        </el-form-item>
        <el-form-item v-model="mesForm.enterpriseavatar" label="企业头像" prop="enterpriseavatar">
          <Upload @headimg="appavaimg" :hasavaimg="mesForm.enterpriseavatar"/>
        </el-form-item>
        <el-form-item  label="开户银行名称" prop="bankname">
           <el-col :span='17'>
             <el-input
               v-model="mesForm.bankname"
              type="text"
              placeholder="请输入银行名称"
             ></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="开户公司名称" prop="openaccountenterprisename">
           <el-col :span='17'>
             <el-input
             v-model="mesForm.openaccountenterprisename"
              type="text"
              placeholder="请输入公司名称"
             ></el-input>
           </el-col>
        </el-form-item>
        <el-form-item  label="认证方式" prop="verificationmode">
           <el-select v-model="mesForm.verificationmode" placeholder="请选择" style="width:300px;">
               <el-option
                 v-for="item in optionstypr"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
        </el-form-item>
      </el-col>
         <el-col :span="12">
           <el-form-item label="开户银行账号" prop="bankaccount">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.bankaccount"
                 type="text"
                 placeholder="请输入银行账号"
                ></el-input>
              </el-col>
           </el-form-item>
           <el-form-item v-model="mesForm.businesslicenseurl" label="营业执照" prop="businesslicenseurl">
             <UploadQecode @qrimg="appqrimg" :hasqrimg="mesForm.businesslicenseurl"></UploadQecode>
           </el-form-item>
           <el-form-item  label="统一社会信用代码" prop="unifysocialcredit">
              <el-col :span='17'>
                <el-input
                 v-model="mesForm.unifysocialcredit"
                 type="text"
                 placeholder="请输入社会信用代码"
                > </el-input>
              </el-col>
           </el-form-item>


           <!-- <el-form-item label="提交时间" prop="authenticationtime">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.authenticationtime"
                 type="text"
                ></el-input>
              </el-col>
           </el-form-item>
           <el-form-item label="认证时间" prop="authenticationupdatetime">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.authenticationupdatetime"
                 type="text"
                ></el-input>
              </el-col>
           </el-form-item>
           <el-form-item label="认证状态" prop="status">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.status"
                 type="text"
                ></el-input>
              </el-col>
           </el-form-item> -->
           <el-form-item label="商标注册证书" v-model="mesForm.brandcrtregistrationurl" prop="brandcrtregistrationurl">
             <TrademarkRe @trad="trdemarkimg" :hasmarkimg="mesForm.brandcrtregistrationurl"></TrademarkRe>
           </el-form-item>
           <el-form-item label="商标授权书" v-model="mesForm.brandaccrediturl" prop="brandaccrediturl">
             <Branda @branda="barandaimg" :hasdaimg="mesForm.brandaccrediturl"></Branda>
           </el-form-item>



           <el-form-item label="联系人姓名" prop="contactname">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.contactname"
                 type="text"
                 placeholder="请输入姓名"
                ></el-input>
              </el-col>
           </el-form-item>
           <el-form-item label="联系人电话" prop="contactphone">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.contactphone"
                 type="text"
                 placeholder="请输入电话号码"
                ></el-input>
              </el-col>
           </el-form-item>
           <el-form-item label="联系人座机号" prop="contactspecialplane">
             <el-col :span="17">
               <el-input
                 v-model="mesForm.contactspecialplane"
                 placeholder="请输入座机号"
                 show-word-limit
                 rows="5"
               />
             </el-col>
           </el-form-item>
         </el-col>
        </el-form>
       <div class="xiangqsub">
          <el-button v-if="subbtn" type="primary" class="submitButton" @click="handleSubmit">提交</el-button>
          <el-button v-if="!subbtn" type="primary" class="submitButton" @click="handleSubmit">重新审核</el-button>
        </div>
    </el-card>

  </div>
</template>
<script>
import UploadQecode from '@/components/Upload/Business.vue'
import Upload from '@/components/Upload/uploadApplicationImg.vue'
import TrademarkRe from '@/components/Upload/TrademarkRe.vue'
import Branda from '@/components/Upload/Brandaccrediturl.vue'
import { serveType } from '@/api/login'
import {kuakeCompany,remarkson} from '@/api/adminCenter'


export default {
  components: {
    Upload,
    UploadQecode,
    TrademarkRe,
    Branda
  },
  data() {
    // 表单校验
    var vbankaccount = async(rule, value, callback) => {
      let reg=/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/
      if (!reg.test(this.mesForm.bankaccount) || this.mesForm.bankaccount == '') {
        callback(new Error('请正确输入开户银行账号'))
      }
      callback()
    }
    var vbankname = (rule, value, callback) => {
      if (this.mesForm.bankname === '') {
        callback(new Error('请输入开户银行名称'))
      }
      callback()
    }
    var vbusinesslicenseurl = (rule, value, callback) => {
      if (this.mesForm.businesslicenseurl == '') {
        callback(new Error('请上传营业执照'))
      }
      callback()
    }
    var vcontactname = (rule, value, callback) => {
      if (this.mesForm.contactname == '') {
        callback(new Error('请输入联系人姓名'))
      }
      callback()
    }
    var vcontactphone = (rule, value, callback) => {
      let reg=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
      if (!reg.test(this.mesForm.contactphone)||this.mesForm.contactphone === '') {
        callback(new Error('请输入联系人电话'))
      }
      callback()
    }
    var vcontactspecialplane = (rule, value, callback) => {
      if (this.mesForm.contactspecialplane === '') {
        callback(new Error('请输入座机号'))
      }
      callback()
    }
    var venterpriseavatar = (rule, value, callback) => {
      if (this.mesForm.enterpriseavatar === '') {
        callback(new Error('请上传企业头像'))
      }
      callback()
    }
    var venterpriseintroduction = (rule, value, callback) => {
      if (this.mesForm.enterpriseintroduction === '') {
        callback(new Error('请输入企业简介'))
      }
      callback()
    }
    var venterpriselocation = (rule, value, callback) => {
      if (this.mesForm.enterpriselocation === '') {
        callback(new Error('请输入所在地区'))
      }
      callback()
    }
    var venterprisename = (rule, value, callback) => {
      if (this.mesForm.enterprisename === '') {
        callback(new Error('请输入企业名称'))
      }
      callback()
    }
    var venterprisetypecode = (rule, value, callback) => {
      if (this.mesForm.enterprisetypecode === null) {
        callback(new Error('请选择企业类型'))
      }
      callback()
    }
    var vofficialwebsite = (rule, value, callback) => {
      let reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      if (!reg.test(this.mesForm.officialwebsite)||this.mesForm.officialwebsite == '') {
        callback(new Error('请输入官方网站'))
      }
      callback()
    }
    var vopenaccountenterprisename = (rule, value, callback) => {
      if (this.mesForm.openaccountenterprisename === '') {
        callback(new Error('请输入开户公司名称'))
      }
      callback()
    }
    var vregistrationplace = (rule,value,callback)=>{
      if(this.mesForm.registrationplace == ''){
        callback(new Error('请输入企业注册地'))
      }
      callback()
    }
    var vservicetrade = (rule,value,callback)=>{
      if(this.mesForm.servicetrade == ""){
        callback(new Error('请输入服务行业'))
      }
      callback()
    }
    var vsubjectinformation = (rule,value,callback)=>{
      if(this.mesForm.subjectinformation == ''){
        callback(new Error('请输入主体信息'))
      }
      callback()
    }
    var vunifysocialcredit = (rule,value,callback)=>{
      if(this.mesForm.unifysocialcredit == ''){
        callback(new Error('请输入一社会信用代码'))
      }
      callback()
    }
    var vverificationmode = (rule,value,callback)=>{
      if(this.mesForm.verificationmode == ''){
        callback(new Error('请选择认证方式'))
      }
      callback()
    }
    var vbrandcrtregistrationurl = (rule,value,callback)=>{
      if(this.mesForm.brandcrtregistrationurl == ''){
        callback(new Error('请上传商标注册证书'))
      }
      callback()
    }
    var vbrandaccrediturl = (rule,value,callback)=>{
      if(this.mesForm.brandaccrediturl == ''){
        callback(new Error('请上传商标授权书'))
      }
      callback()
    }
    var vopenaccountenterprisename = (rule,value,callback)=>{
      if(this.mesForm.openaccountenterprisename == ''){
        callback(new Error('请输入开户公司名称'))
      }
      callback()
    }
    return {
      enTypes:[],
      options: [
        {value:"企业类型",label:'企业类型'},

        ],
        serveList:[],
        optionstypr: [
          {value:1,label:'对公账号打款'},
          {value:2,label:'法人扫脸'},
          {value:3,label:'电子营业执照'},
          ],
        subbtn:true,
        // changebtn:false,
      mesForm: {
              "authenticationtime": "",
              "authenticationupdatetime": "",
              "bankaccount": "",
              "bankname": "",
              "brandaccrediturl": "",
              "brandcrtregistrationurl": "",
              "businesslicenseurl": "",
              "certificateregistrationurl": "",
              "contactidnumber": "",
              "contactmail": "",
              "contactname": "",
              "contactphone": "",
              "contactspecialplane": "",
              "enterpriseavatar": "",
              "enterpriseintroduction": "",
              "enterpriselocation": "",
              "enterprisename": "",
              "enterprisetypecode": null,
              "id": "",
              "invoicetype": 0,
              "officialwebsite": "",
              "openaccountenterprisename": "",
              "registrationplace": "",
              "servicetrade": "",
              "status": 0,
              "subjectinformation": "企业类型",
              "unifysocialcredit": "",
              "verificationmode": 1
            },
      appid:'',
      rule: {
        bankaccount: [
          { required: true, validator: vbankaccount, trigger: 'blur' }
        ],
        bankname: [
          { required: true, validator: vbankname, trigger: 'blur' }
        ],
        businesslicenseurl:[
           { required: true, validator: vbusinesslicenseurl, trigger: 'blur' }
        ],
      contactname:[
          { required: true, validator: vcontactname, trigger: 'blur' }
        ],
        contactphone:[
          { required: true, validator: vcontactphone, trigger: 'blur' }
        ],
        contactspecialplane:[
          { required: true, validator: vcontactspecialplane, trigger: 'blur' }
        ],
        enterpriseavatar:[
          { required: true, validator: venterpriseavatar, trigger: 'blur' }
        ],
        enterpriseintroduction:[
          { required: true, validator: venterpriseintroduction, trigger: 'blur' }
        ],
        enterpriselocation:[
          { required: true, validator: venterpriselocation, trigger: 'blur' }
        ],
        enterprisename:[
          { required: true, validator: venterprisename, trigger: 'blur' }
        ],
        registrationplace:[
          { required: true, validator: vregistrationplace, trigger: 'blur' }
        ],
        servicetrade:[
          { required: true, validator: vservicetrade, trigger: 'blur' }
        ],
        subjectinformation:[
          { required: true, validator: vsubjectinformation, trigger: 'blur' }
        ],
        unifysocialcredit:[
          { required: true, validator: vunifysocialcredit, trigger: 'blur' }
        ],
        verificationmode:[
           { required: true, validator: vverificationmode, trigger: 'blur' }
        ],
        officialwebsite:[
           { required: true, validator: vofficialwebsite, trigger: 'blur' }
        ],
        brandcrtregistrationurl:[
          { required: true, validator: vbrandcrtregistrationurl, trigger: 'blur' }
        ],
        brandaccrediturl:[
           { required: true, validator: vbrandaccrediturl, trigger: 'blur' }
        ],
        enterprisetypecode:[
          { required: true, validator: venterprisetypecode, trigger: 'blur' }
        ],
        openaccountenterprisename:[
          { required: true, validator: vopenaccountenterprisename, trigger: 'blur' }
        ]
      },
    }
  },
  mounted() {
    this.getenTypes()
    this.getserveList()
    // console.log(this.$route.params.data.status)

    // 是否未通过
    if(this.$route.params.data!=null){
        remarkson({	appId:this.$route.params.needid}).then(res=>{
          this.$alert(res.data[0].authenticationreason, '认证失败原因', {
                   confirmButtonText: '确定',
                 });
        })
    }

    // 重新审核或提交表单的信息
    let tempData=localStorage.getItem('tempData')
    let needid=localStorage.getItem('needid')
    if(tempData){
      this.mesForm=JSON.parse(localStorage.getItem('tempData'))
      this.subbtn=false
    }else{
      if(this.$route.params.data == null){
        this.mesForm=this.mesForm
        this.subbtn=true
      }else{
        localStorage.setItem('tempData',JSON.stringify(this.$route.params.data))
        this.mesForm=JSON.parse(localStorage.getItem('tempData'))
        this.subbtn=false
        }
   }
   if(needid){
      this.appid=JSON.parse(localStorage.getItem('needid'))
   }else{
     localStorage.setItem('needid',JSON.stringify(this.$route.params.needid))
     this.appid=JSON.parse(localStorage.getItem('needid'))
   }
   // console.log(this.appid)
  },
  beforeDestroy () {
      localStorage.removeItem('tempData')
       localStorage.removeItem('needid')
    },
  methods: {
    barandaimg(res){
      if(res.length >= 1 ){
      this.mesForm.brandaccrediturl=JSON.stringify(res).match(/"(\S*)"/)[1]
      }else{
       this.mesForm.brandaccrediturl=''
      }
    },
    trdemarkimg(res){
      if(res.length >= 1 ){
      this.mesForm.brandcrtregistrationurl=JSON.stringify(res).match(/"(\S*)"/)[1]
      }else{
       this.mesForm.brandcrtregistrationurl=''
      }
    },
    appavaimg(res){
        if(res.length >= 1 ){
          this.mesForm.enterpriseavatar=JSON.stringify(res).match(/"(\S*)"/)[1]
        }else{
          this.mesForm.enterpriseavatar=''
        }

    },
    appqrimg(res){
      if(res.length >= 1 ){
         this.mesForm.businesslicenseurl=JSON.stringify(res).match(/"(\S*)"/)[1]
      }else{
         this.mesForm.businesslicenseurl=''
      }
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
        this.serveList=res.data.data
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
        this.enTypes=res.data.data
      })
    },
    // 提交表单
    handleSubmit() {
      this.$refs.mesForm.validate(valid => {
        if (valid) {
          kuakeCompany({
            appid:this.appid,
            data:this.mesForm
          }).then(res=>{
            this.$message.success("提交审核成功")
            this.$router.push("/home/index")
          }).catch(err=>{
             this.$message.error("提交审核失败")
            console.log(err)
          })
        } else {
          this.$message.error('请填写完整信息')
          return false
        }
      })
    },
    // 修改表单
    // changeSubmit(){
    //   this.$refs.mesForm.validate(valid => {
    //     if(valid){
    //       kuakeChanCompany({
    //         appid:this.appid,
    //         data:this.mesForm
    //       }).then(res=>{
    //         this.$message.success("修改成功")
    //         this.$router.push("/home/index")
    //       }).catch(err=>{
    //         this.$message.error("修改失败")
    //         console.log(err)
    //       })
    //     }else{
    //       this.$message.error('请填写完整信息')
    //       return false
    //     }
    //   })
    // }


  }

}
</script>

<style scoped>

.application-img-box{
  display: flex;
  flex-direction: row;
}
.application-img{
  margin-right: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  width: 150px;
  height: 150px;
}
.box-card{
  padding: 10px 30px 50px 50px;
}
.el-card{
  border-radius: 10px;
}
.el-col-12{
  width: 429px;
}
.el-form{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.el-col-17{
  width: 300px;
}
.el-form-item{
  margin-top: 40px;
}
  .submitButton{
    margin-bottom: 40px;
    margin-top: 20px;
    transform: translateX(100px);
  }
  .greyWord{
    font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
  }
  .makeSure{
    margin-left: 80px;
   font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #2A3035;
line-height: 25px;
  }
  .dialogKey{
    font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #7E8488;
margin-right: 20px;
  }
  /* 信息展示 */
  .key{
  width: 115px;
  margin-right: 20px;
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #7E8488;
}
.elItem{
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
}
.basicInformation{
  padding-left: 15px;
  padding-right: 15px;
  height: 35px;
  font-size: 15px;
  /* background-color: #5476C9; */
  border-bottom: 1px solid #93989D;
  width: 350px;
}
.box-card{

  padding: 20px 40px 40px 40px;
}
.title{
    font-size: 20px;
font-family: Source Han Sans SC;
font-weight: 500;
color: #2A3035;
margin-bottom: 60px;
}
.el-form-item{
  margin-bottom: 50px;
}
.text{
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #5476C9;
margin-left: 40px;
margin-right: 20px;
}
.text2{
  font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
}

.sataeBtn{
    background: #E5F3FF;
    border: none;
    width: 100px;
    height: 30px;
    color: #2F88FF;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}
/deep/.sataeBtn span{
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sataeBtn .sataCherk{
  width: 17.5px;
  height: 17.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7.5px;
}
/deep/.el-form-item{
  margin-bottom: 20px;
  margin-top: 20px;
}
.xiangqsub{
  width: 100%;
  text-align: center;
}
.formTitle{
  font-size: 18px;
  color: #3A3A3A;
  border-bottom: 1px solid #C4C4C4;
  width: calc(100% + 80px);
  position: relative;
  left: -40px;
  text-indent: 40px;
  padding-bottom: 20px;
  margin-top: 0;
}
/deep/.el-form-item__label{
  width: 120px !important;
}
/deep/.el-form-item__error{
  left: 27px;
}
</style>
