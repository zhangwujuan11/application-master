<template>


  <el-card class="box-card">
    <h3 class="formTitle">资源包管理</h3>
    <el-select class="shoeconappid" placeholder="请选择" v-model="shoeconappid">
        <el-option
          v-for="(item,index) in appId"
          :key="index"
          :label="item.appName"
          :value="item.appId"
          >
        </el-option>
      </el-select>
    <div class="content">
      <div
      v-for="(item,index) in versionList"
      :key="index"
      class="versionBoox">
        <div class="version-left">
          <span>版本号</span>
          <strong>{{item.versioncode}}</strong>
          <el-button type="primary">确定上传</el-button>
        </div>
        <ul class="version-right">
          <li><span>上传者：</span>{{item.pushinformationaccount}}</li>
          <li><span>上传时间：</span>{{item.lastupdatetime}}</li>
          <li><span>项目备注：</span>{{item.remarks}}</li>
        </ul>
        <img class="del" src="@/assets/img/del.png" alt="">
      </div>


      <div class="versionBoox up"  @click="dialogFormVisible = true">
        <i style="font-size: 40px;color: #2F88FF;" class="el-icon-folder-add"></i>
        上传资源包
      </div>

      <!-- <el-col :span="10" :offset="1">
        <div class="uploadBox">
          <p class="box-item" @click="dialogFormVisible = true"><i class="el-icon-folder-add" />上传资源包</p>
        </div>
      </el-col> -->

    </div>
    <!-- 点击上传资源包出现 -->
    <el-dialog title="上传资源包" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="form"  :model="form" :rules="rule" label-width="150px">
        <el-form-item  label="应用" prop="apptid">
          <el-col :span="16">
           <el-select v-model="form.appid" placeholder="请选择" style="width: 100%;">
               <el-option
                 v-for="(item,index) in appId"
                 :key="index"
                 :label="item.appName"
                 :value="item.appId">
               </el-option>
             </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="版本号" prop="versioncode">
          <el-col :span="16"><el-input v-model="form.versioncode" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item  label="目录" prop="resourcePath">
          <Upload @fileList="getKey" @fileSize="getSize"/>
          <span>请上传压缩包</span>
        </el-form-item>

        <!-- <el-form-item label="推送者云商账号" prop="pushinformationaccount">
          <el-col :span="16"><el-input v-model="form.pushinformationaccount" autocomplete="off" /></el-col>
        </el-form-item> -->
        <el-form-item label="项目备注" prop="remarks">

          <el-col :span="16">
            <!-- 下面是富文本 -->
            <!-- <quill-editor ref="myQuillEditor" v-model="form.remarks" style="width:385px" /> -->
            <el-input v-model="form.remarks" autocomplete="off" />
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="后端服务">
          <template>
            <el-radio v-model="radio" label="1">移动 • 云开发</el-radio>
            <el-radio v-model="radio" label="2">不使用云服务</el-radio>
          </template>
        </el-form-item> -->
        <!-- <p class="resourTips">无需搭建服务器，即可使用云数据库、云存储、云函数、云托管等完整云端能力。<span>详情</span></p> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button><!-- dialogFormVisible = false -->
        <el-button type="primary"  @click="saveResource">保存</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getAccount } from '@/utils/auth'
import { quillEditor } from 'vue-quill-editor'
import { getActiveProgramId } from '@/utils/auth'
import Upload from '@/components/Upload/uploadFiled.vue'

import { getApplicationList,resourcePackag,applVersion,updataapplVersion } from '@/api/adminCenter'
import {userinfo} from '@/api/login'
import { mapState } from "vuex"
export default {
  name: 'ResourcePackage',
  components: {
    Upload,
    quillEditor
  },
  data() {
    var validateVersionCode = (rule, value, callback) => {
      let reg= /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/
      if (!reg.test(this.form.versioncode)) {
        callback(new Error('请输入正确的版本号'))
      }
      callback()
    }
    var validateAPPID = (rule, value, callback) => {
      if (this.form.appid == '') {
        callback(new Error('请选择需上传的APP'))
      }
      callback()
    }
    var validatepushinformationaccount = (rule, value, callback) => {
      if (this.form.pushinformationaccount === '') {
        callback(new Error('请输入推送者云商号'))
      }
      callback()
    }
    var validateRemarks = (rule, value, callback) => {
      if (this.form.remarks === '') {
        callback(new Error('请输入项目备注'))
      }
      callback()
    }
    var validateResourcePath = (rule, value, callback) => {
      if (this.form.resourcePath == undefined || this.form.resourcePath == "[]") {
        callback(new Error('请上传资源包'))
      }
      callback()
    }
    return {
      shoeconappid:'',//资源包列表显示类
      activeProgramID: '', // 激活应用的id
      showResource: false,
      dialogFormVisible: false,
      show: false,
      appId:[],
      versionList:[],
      form: {
            "appid": "",
            "createtime": "",
            "experienceqrcode": "",
            "isdev": 0,
            "lastupdateby": "",
            "lastupdatetime": "",
            "pushinformationaccount": "",
            "pushinformationname": "",
            "remarks": "",
            "size": "",
            "status": 0,
            "url": "",
            "versioncode": ""
          },

      rule: {
        versioncode: [
          { required: true, validator: validateVersionCode, trigger: 'blur' }
        ],
        apptid:[
           { required: true, validator: validateAPPID, trigger: 'blur' }
        ],
        pushinformationaccount: [
          { required: true, validator: validatepushinformationaccount, trigger: 'blur' }
        ],

        remarks: [
          { required: true, validator: validateRemarks, trigger: 'blur' }
        ],
        resourcePath: [
          { required: true, validator: validateResourcePath, trigger: 'change' }
        ]
      },
    }
  },
  created() {

  },
  computed: {
      ...mapState({
        Tok:state => state.user.token,
       ccount:state=>state.user.userInfo
      })
  },
  mounted() {
    this.activeProgramID = getActiveProgramId()
    this.form.pushInformationAccount = getAccount()
    this.getmyapp()
    this.getpuinfo()
  },
  watch:{
    //应用资源包列表
    shoeconappid(n){
     resourcePackag({appId:n}).then(res=>{
       this.versionList=res.data
       console.log(this.versionList)
     }).catch(() => {console.log('error submit!!')})
    }
  },
  methods: {
    // test(){
    //   console.log(this.form.resourcePath)
    // },
    getSize(e) {
      this.form.size = JSON.stringify(e)
    },
    getKey(data) {
      this.form.resourcePath =JSON.stringify(data)
    },
    // appdid
    async getmyapp(){
      const data= await getApplicationList({
        "page": 1,
        "pageSize": 10,
        "username": this.$store.state.user.userInfo.username
      }).then(res=>{
        this.appId=res.data.content
        this.shoeconappid=this.appId[0].appId

      }).catch(() => {console.log('error submit!!')})
    },
    // 云商号获取
    getpuinfo(){
      this.form.pushinformationaccount=this.ccount.username
    },

    async saveResource() {
      const data = await applVersion(this.form).then(res=>{
       this.$message.success(res.msg)
         this.dialogFormVisible = false
         this.shoeconappid=this.form.appid
       // updataapplVersion(this.form).then(res=>{
       //    // this.dialogFormVisible = false
       //    this.shoeconappid=this.form.appid
       //   consle.log(res)
       // })

      }).catch(err => {
         this.$message.error("添加失败")
      })
      // this.$refs.form.validate(async valid => {
      //   if (valid) {
      //     applVersion({
      //       data:this.form
      //     })
      //   } else {
      //     this.$message.error('请填写完整信息')
      //     return false
      //   }
      // })

      // 调用postResourceFiled接口，返回资源包管理页，重新再调用一次获取未上传的资源包的接口getNeverPublishVersion
    }
  }
}
</script>
<style scoped>
.toRow{
   display: flex;
  flex-direction: row;
}
.box-card{
    margin-top: 40px;
    padding-bottom: 100px;
    /* padding-left: 50px; */
    /* padding-right: 50px; */
}

.uploadBox{
    height: 188px;
background: #F1F7FE;
border-radius: 10px;
font-size: 16px;
margin-top: 40px;
}
.box{
height: 188px;
background: #F1F7FE;
border-radius: 10px;
font-size: 16px;
margin-top: 40px;
display: flex;
justify-content: space-around;
padding: 35px;
position: relative;
}
.deleteButton{
    position: absolute;
    right: 10px;
    top: 10px;
}
.key{
    margin-right: 20px;
    font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
opacity: 0.7;
}
.box-item{
    position: relative;
    width: 97px;
    top: 50%;
    left: 50%;
    transform: translate(-49px,-9px);
}
.box-item:hover{
    color: #4377F3;
}
.formTitle{
  font-size: 18px;
  color: #3A3A3A;
  border-bottom: 1px solid #C4C4C4;
  width: calc(100% + 80px);
  position: relative;
  left: -40px;
  text-indent: 40px;
  padding: 20px;
  margin-top: 0;
}



.content{
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
}

.content .versionBoox{
  width: 520px;
  height: 240px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #E5F3FF;
  color: #3A3A3A;
  border-radius: 10px;
  position: relative;
  margin-bottom: 30px;
}
.content .versionBoox .version-left{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.content .versionBoox .version-left strong{
  margin: 15px 0;
}
.content .versionBoox .version-right{
  display: flex;
  flex-direction: column;
  justify-content: center;
  }

  .content .versionBoox .version-right li{
    list-style: none;
    margin-bottom: 20px;
  }
 .version-right li span{
   color: #7a7a7a;
 }
 .del{
   position: absolute;
   right: 30px;
   top: 20px;
 }
.up{
  flex-direction: column;
  color: #2F88FF !important;
  justify-content: center !important;
  font-size: 15px;
}
.el-select{
  width: 66.66%;
}
.resourTips{
  text-align: center;
  color: #7a7a7a;
  font-size: 15px;
}
.resourTips span{
  color: #2F88FF;
  cursor: pointer;
}
.shoeconappid{
  width: 520px;
  margin-left: 18px;
  margin-bottom: 20px;
}
</style>
