<template>
  <div>
    <el-card  class="box-card">
      <el-form ref="mesForm" :model="mesForm" :rules="rule" label-width="100px">
        <h3 class="formTitle">基本信息</h3>
           <el-col :span="12">
             <el-form-item label="应用名称" prop="appname">
               <el-col :span='17'>
                 <el-input
                  v-model="mesForm.basicInformation.appname"
                  type="text"
                  maxlength="10"
                  show-word-limit
                  placeholder="请输入名称"
                 ></el-input>
               </el-col> <br>
               <span class="greyWord">应用名称长度为4-10个字符，一个中文字等于2个字符。</span>
          </el-form-item>
        <el-form-item label="应用简称" prop="appshortname">
          <el-col :span="17">
            <el-input
              v-model="mesForm.basicInformation.appshortname"
              type="text"
              maxlength="10"
              show-word-limit
              placeholder="请输入简称"
            />
          </el-col><br>
          <span class="greyWord">应用简称长度为4-10个字符，一个中文字等于2个字符。</span>
        </el-form-item>
        <el-form-item  label="应用类别" prop="apptype">
           <el-select v-model="mesForm.basicInformation.apptype" placeholder="请选择" style="width:  70.8333333333%;">
               <el-option
                 v-for="item in appTypes"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
        </el-form-item>
        <el-form-item  label="服务类别" prop="servicelabelcode">
           <el-select v-model="mesForm.basicInformation.servicelabelcode" placeholder="请选择" style="width:  70.8333333333%;">
               <el-option
                 v-for="(item,index) in serviceLabelist"
                 :key="index"
                 :label="item.serviceLabelCodeName"
                 :value="item.serviceLabelCode">
               </el-option>
             </el-select>
        </el-form-item>
        <el-form-item
        :label="mesForm.basicInformation.apptype | wzwz"
        prop="websiteurl"
        v-if="mesForm.basicInformation.apptype != 2"
        >

          <el-col :span="17">
            <el-input
              v-model="mesForm.basicInformation.websiteurl"
              type="text"
              placeholder="请输入网址"
            />
          </el-col><br>
        </el-form-item>
        <el-form-item  label="AppId" prop="apptid" v-if="mesForm.basicInformation.apptype == 1">
           <el-col :span='17'>
             <el-input
              v-model="mesForm.applicationMain.appid"
              type="text"
              placeholder="请输入appid"
             > </el-input>
           </el-col><br>
           <span class="greyWord">创建小程序应用生成的APPId</span>
        </el-form-item>
        <el-form-item v-model="mesForm.basicInformation.appavatar" label="应用头像 / (网站logo)" prop="appavatar">
          <Upload @headimg="appavaimg" :appavatarr='mesForm.basicInformation.appavatar'/>
        </el-form-item>
        <el-form-item
        v-if="mesForm.basicInformation.apptype == 1 ||mesForm.basicInformation.apptype == 2"
        v-model="mesForm.basicInformation.appqrcode"
        label="应用二维码"
        prop="appqrcode"
        >
          <UploadQecode @qrimg="appqrimg" :appqrcodee='mesForm.basicInformation.appqrcode'></UploadQecode>
        </el-form-item>

        <el-form-item
        label="允许进入手机生态"
        prop="ecology"
        >
           <el-radio-group size="small" v-model="mesForm.basicInformation.isenterphone">
              <el-radio :label="1" border>是</el-radio>
              <el-radio :label="0" border>否</el-radio>
            </el-radio-group>
        </el-form-item>


        <el-form-item label="应用内购买" prop="purchase">
          <el-select v-model="mesForm.basicInformation.purchase" placeholder="请选择" style="width:  70.8333333333%;">
              <el-option
                v-for="(item,index) in appTypess"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item
        v-if="mesForm.basicInformation.purchase == 1"
        label="订阅费用"
        prop="price"
        >
           <el-radio-group size="small" v-model="mesForm.basicInformation.price">
              <el-radio :label="1" border>30元/月</el-radio>
              <el-radio :label="2" border>198元/年</el-radio>
            </el-radio-group>
        </el-form-item>

        <!-- <el-form-item
        label="所需参数"
        >
        <el-col :span='17'>
           <el-select style="width: 100%;" v-model="mesForm.basicInformation.h5RequiredFields" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in canshu"
                :key="index"
                :label="item.name"
                :value="item.field_code">
              </el-option>
            </el-select>
        </el-col>
        </el-form-item> -->



      </el-col>
         <el-col :span="12">
           <el-form-item label="供应商" prop="supplier">
              <el-col :span='17'>
                <el-input
                 type="text"
                 v-model="mesForm.basicInformation.supplier"
                 placeholder="请输入供应商"
                ></el-input>
              </el-col>
           </el-form-item>

           <el-form-item label="应用语言" prop="language">
             <el-select v-model="mesForm.basicInformation.language" placeholder="请选择" style="width:  70.8333333333%;">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="应用版权" prop="appcopyright">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.basicInformation.appcopyright"
                 type="text"
                 placeholder="请输入版权归属"
                ></el-input>
              </el-col>
           </el-form-item>

           <el-form-item label="应用版本号" prop="versioncode">
              <el-col :span='17'>
                <el-input
                v-model="mesForm.applicationDevVersion.versioncode"
                 type="text"
                 placeholder="请输入版本号"
                ></el-input>
              </el-col> <br>
              <span class="greyWord">版本号格式：1.0.0</span>
           </el-form-item>
           <el-form-item label="版本内容" prop="appintroduction">
             <el-col :span="17">
               <el-input
                 v-model="mesForm.basicInformation.appintroduction"
                 type="textarea"
                 placeholder="请输入内容"
                 maxlength="30"
                 show-word-limit
                 rows="5"
               />
             </el-col>
           </el-form-item>
           <el-form-item v-if="isablechangfg" v-model="mesForm.basicInformation.screenshots" label="应用图片" prop="screenshots" >
             <el-col :span="17">
             <UploadPicture  @newingList="screenimgs"></UploadPicture>
             </el-col><br><br><br><br>
           </el-form-item>

           <el-form-item label="隐私政策" prop="privacypolicy">
             <el-col :span="17">
               <el-input
                 v-model="mesForm.basicInformation.privacypolicy"
                 type="textarea"
                 placeholder="请输入内容"
                 maxlength="30"
                 show-word-limit
                 rows="5"
               />
             </el-col><br><br><br><br>
           </el-form-item>
           <el-form-item
           label="是否默认开放"
           prop="isOpen"
           >
              <el-radio-group size="small" v-model="mesForm.basicInformation.isOpen">
                 <el-radio :label="1" border>是</el-radio>
                 <el-radio :label="0" border>否</el-radio>
               </el-radio-group>
           </el-form-item>
         </el-col>
      </el-form>
      <p style="width: 100%;">
        <el-button v-if="isablechangfg" type="primary" class="submitButton" @click="handleSubmit">提交</el-button>
        <el-button v-if="!isablechangfg" type="primary" class="submitButton" @click="putdata">确认修改</el-button>
      </p>
    </el-card>


  </div>
</template>
<script>
import UploadQecode from '@/components/Upload/uploadQecode.vue'
import UploadPicture from '@/components/Upload/uploadPicture.vue'
import Upload from '@/components/Upload/uploadImg.vue'
import { addNeverPublishVersion,appdatas,upappdata} from '@/api/adminCenter'//发布应用
import {paramsdata,serviceLabe} from '@/api/login'


export default {
    inject:["reload"],
  components: {
    Upload,
    UploadQecode,
    UploadPicture
  },
  filters:{
    wzwz(e){
      if(e==3){
        return '网站网址'
      }else if(e==1){
        return '安装包地址'
      }
    }
  },
  data() {

    // 表单校验
    var validateValue = async(rule, value, callback) => {
      if (this.mesForm.basicInformation.appname === '') {
        callback(new Error('请输入应用名称'))
      }
      callback()
    }
    var validateappshortname = (rule, value, callback) => {
      if (this.mesForm.basicInformation.appshortname === '') {
        callback(new Error('请输入应用简称'))
      }
      callback()
    }
    var validateappavatar = (rule, value, callback) => {
      if (this.mesForm.basicInformation.appavatar == '') {
        callback(new Error('请上传头像'))
      }
      callback()
    }
    // var validateappqrcode = (rule, value, callback) => {
    //   if (this.mesForm.basicInformation.appqrcode == '') {
    //     callback(new Error('请上传二维码'))
    //   }
    //   callback()
    // }
    var validatesupplier = (rule, value, callback) => {
      if (this.mesForm.basicInformation.supplier === '') {
        callback(new Error('请输入供应商'))
      }
      callback()
    }
    var validateapptype = (rule, value, callback) => {
      if (this.mesForm.basicInformation.apptype === null) {
        callback(new Error('请选择应用类别'))
      }
      callback()
    }
    var validatelanguage = (rule, value, callback) => {
      if (this.mesForm.basicInformation.language === '') {
        callback(new Error('请选择应用语言'))
      }
      callback()
    }
    var validatepurchase = (rule, value, callback) => {
      if (this.mesForm.basicInformation.purchase === null) {
        callback(new Error('请选择应用内购买'))
      }
      callback()
    }
    var validateappcopyright = (rule, value, callback) => {
      if (this.mesForm.basicInformation.appcopyright === '') {
        callback(new Error('请输入应用版权'))
      }
      callback()
    }
    var validateprice = (rule, value, callback) => {
      if (this.mesForm.basicInformation.price === null) {
        callback(new Error('请选择订阅费用'))
      }
      callback()
    }
    var validateversioncode = (rule, value, callback) => {
       let reg= /^([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/
      if (!reg.test(this.mesForm.applicationDevVersion.versioncode)) {
        callback(new Error('请输入正确版本号'))
      }
      callback()
    }
    var validateappintroduction = (rule, value, callback) => {
      if (this.mesForm.basicInformation.appintroduction === '') {
        callback(new Error('请输入版内容'))
      }
      callback()
    }
    var validatescreenshots = (rule, value, callback) => {
      if (this.mesForm.basicInformation.screenshots == '[]' || this.mesForm.basicInformation.screenshots== '') {
        callback(new Error('请上传应用图片'))
      }
      callback()
    }
    var validateprivacypolicy = (rule, value, callback) => {
      if (this.mesForm.basicInformation.privacypolicy === '') {
        callback(new Error('请输入隐私政策'))
      }
      callback()
    }
    var validateappid = (rule,value,callback)=>{
      if(this.mesForm.applicationMain.appid == ''){
        callback(new Error('请输入appid'))
      }
      callback()
    }
    var vwebsiteurl = (rule,value,callback)=>{
       let reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      if(!reg.test(this.mesForm.basicInformation.websiteurl)){
        callback(new Error('请输入正确的网址'))
      }
      callback()
    }




    return {
      isablechangfg:true,
      canshu:[],
      ServiceClassification: [], // 服务类目
      appTypes:[
        {value:1,label:'小程序'},
        {value:2,label:'移动开发'},
        {value:3,label:'网页开发'}
      ],
      options: [
        {value: '0',label:'JAVA'},
        {value:'1',label:'PHP'},
        {value:'2',label:'C++'},
        {value:'3',label:'其他'},
        ],
      serviceStyle: [],
      optionsAge:[      //年龄分级
        {vaule:'0',label:'一年'},
        {vaule:'1',label:'2-5年'},
        {vaule:'2',label:'6-10年'},
      ],
      optionsAgeSlect:'',
      serviceLabelist:[],

      appTypess:[
        {value:0,label:'不需要'},
        {value:1,label:'需要'}
      ],
      appavatarr:'',
      mesForm: {
            "applicationDevVersion": {
              "appid":"",//应用appid
              "experienceqrcode": "",
              "isdev": '',
              "lastupdateby": "",
              "pushinformationaccount": "",
              "pushinformationname": "",
              "remarks": "",
              "size": "",
              "status":'',
              "url": "",
              "versioncode": ""//应用版本号
            },
            "applicationMain": {
              "appid":"",//小程序appid
              "adminphone": "",
              "createby": "",
              "email": "",
              "idname": "",
              "idnumber": "",
              "lastupdateby": "",
              "registertype":'',
              "username": ""
            },
            "basicInformation": {
              "appavatar": "",//上传应用头像
              "appcopyright": "",//应用版权
              "appintroduction": "",//版本内容
              "appname": "",//应用名称
              "appqrcode": "",//二维码
              "appshortname": "",//应用简称
              "apptype": null,//应用类别
              "price": null,//订阅费用
              "privacypolicy": "",//隐私政策
              "purchase":null,//应用内购买
              "servicelabelcode": "",//应用类别
              "star": null,
              "subscriptionjson": "",
              "screenshots": "",//应用图片
              "supplier": "",//供应商
              "language": "",//应用语言
              "websiteurl":'',//网址
              // 'h5RequiredFields':''
              "isenterphone":1,
              "isOpen":1
            },
          nweupdata:''
          },
      rule: {
        appname: [
          { required: true, validator: validateValue, trigger: 'blur' }
        ],
        appshortname: [
          { required: true, validator: validateappshortname, trigger: 'blur' }
        ],
        appavatar:[
           { required: true, validator: validateappavatar, trigger: 'blur' }
        ],
        // appqrcode:[
        //   { required: true, validator: validateappqrcode, trigger: 'blur' }
        // ],
        supplier:[
          { required: true, validator: validatesupplier, trigger: 'blur' }
        ],
        apptype:[
          { required: true, validator: validateapptype, trigger: 'blur' }
        ],
        language:[
          { required: true, validator: validatelanguage, trigger: 'blur' }
        ],
        purchase:[
          { required: true, validator: validatepurchase, trigger: 'blur' }
        ],
        appcopyright:[
          { required: true, validator: validateappcopyright, trigger: 'blur' }
        ],
        price:[
          { required: true, validator: validateprice, trigger: 'blur' }
        ],
        versioncode:[
          { required: true, validator: validateversioncode, trigger: 'blur' }
        ],
        appintroduction:[
          { required: true, validator: validateappintroduction, trigger: 'blur' }
        ],
        screenshots:[
          { required: true, validator: validatescreenshots, trigger: 'blur' }
        ],
        privacypolicy:[
          { required: true, validator: validateprivacypolicy, trigger: 'blur' }
        ],
        apptid:[
           { required: true, validator: validateappid, trigger: 'blur' }
        ],
        websiteurl:[
          { required: true, validator: vwebsiteurl, trigger: 'blur' }
        ]
      },
    }
  },
  // watch:{
  //   test(n){
  //     console.log(typeof(JSON.stringify(n)) )
  //   }
  // },
  created(){
          paramsdata({
          "auth": 2,
          "project": "applet",
          "table": "sys_h5_required_fields_info",
          "conditions": {
              "fields": [],
              "query": {}
          }
      }).then(res=>{
        this.canshu=res.data.data
      })

      serviceLabe().then(res=>{
         this.serviceLabelist=res.data.data
      })
  },
  mounted(){
    // if(this.$route.query.data){
    //   this.nweupdata=this.$route.query.data
    //   this.isablechangfg=false
    // }
    if(this.$route.params.data != null){
      this.mesForm=this.$route.params.data
      this.isablechangfg=false
    }
  },
  methods: {
    parameter(value){
              console.log(111);
    },
    screenimgs(res){
     this.mesForm.basicInformation.screenshots=JSON.stringify(res)
    },

    appavaimg(res){
        if(res.length >= 1 ){
          this.mesForm.basicInformation.appavatar=JSON.stringify(res).match(/"(\S*)"/)[1]
        }else{
          this.mesForm.basicInformation.appavatar=''
        }

    },
    appqrimg(res){
      if(res.length >= 1 ){
         this.mesForm.basicInformation.appqrcode=JSON.stringify(res).match(/"(\S*)"/)[1]
      }else{
         this.mesForm.basicInformation.appqrcode=''
      }
    },
    handleSubmit() {
      this.mesForm.applicationMain.username=this.$store.state.user.userInfo.username
       // this.mesForm.basicInformation.h5RequiredFields=JSON.stringify(this.mesForm.basicInformation.h5RequiredFields)
      // console.log(this.mesForm.basicInformation.h5RequiredFields)
      this.$refs.mesForm.validate(valid => {
        if (valid) {
         addNeverPublishVersion(this.mesForm).then(res=>{
           // console.log(res)
             this.$message({
                           type: 'success',
                           message: res.msg
                         })
            this.$router.push("/home/index")
            this.reload()
         }).catch(err=>{
            // this.mesForm.basicInformation.h5RequiredFields=''
            this.$message.error(
                         err.response.data.message
                        );
         })
        } else {
           // this.mesForm.basicInformation.h5RequiredFields=''
          this.$message.error('请填写完整信息')
          return false
        }
      })
    },

    // 确认修改
     putdata(){
       upappdata(this.mesForm).then(res=>{
         this.$message.success(res.msg)
         this.$router.push('/home')
       }).catch(()=>{
         this.$message.error('修改失败，请重试')
          this.reload()
       })
     }

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
  margin-top: 40px;
  padding: 10px 30px 50px 50px;
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
    width: 50%;
    display: block;
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
  margin-top: 40px;
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
</style>
