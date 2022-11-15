<template>

  <el-card class="whole">
    <el-select class="shoeconappid" placeholder="请选择" v-model="shoeconappid">
        <el-option
          v-for="(item,index) in appId"
          :key="index"
          :label="item.appName"
          :value="item.appId"
          >
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 20px;" @click="dialogFormVisible = true" icon="el-icon-folder-add">上传资源包</el-button>
    <p class="title">已上线</p>
    <div class="onlineCon">
      <div v-for="(item, index) in onLineList " :key="'prod'+index" class="onlineBox">
        <div class="item">
          <img class="button" src="@/assets/img/header/useing.png" alt="">
          <!-- 区域右边的向下箭头下拉菜单 -->
         <el-dropdown>
            <i class="el-icon-arrow-down el-icon--right" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="returnHis(item)">版本回退</span></el-dropdown-item>
              <el-dropdown-item><span @click="handleClickDownVersion(item)">下架</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p>版本号</p>
          <p>{{ item.versioncode }}</p>
        </div>
        <div class="item">
          <p><span class="key">发布者</span><span>{{ item.pushinformationaccount }}</span></p>
          <p><span class="key">发布时间</span><span>{{ item.lastupdatetime }}</span></p>
          <p><span class="key">资源大小</span><span>{{ item.size }} MB</span></p>
          <p><span class="key">新功能描述</span><span>{{ item.remarks }}</span></p>
        </div>
      </div>
    </div>

    <!-- 点击版本回退的弹窗  -->
    <el-dialog title="版本回退" :visible.sync="returnHisVersionDialog" width="50%">
      <!-- <el-table :data="allVersionList.prodVersions.filter(e => e.isHistory === 1)" style="width: 90%"  > -->
      <el-table :data="onlineVersionList" style="width: 90%">
        <el-table-column
          label="版本"
          width="180"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.versioncode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          width="180"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="代码提交时间"
          width="200"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime | parseTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleReturn(scope.row)"
            >回退</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleHisVersionDelete(scope.$index, scope.row.id)"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 确认版本回退的弹窗 -->
    <!-- <el-dialog title="确认版本回退" :visible.sync="sureReturnVersionDialog" width="50%">
      <h3>请确认执行回退到此版本？</h3>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureReturnVersionDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureReturnVersion">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 点击 ‘版本回退’ 里的 ‘删除’按钮的弹窗 -->
    <!-- <el-dialog title="删除版本" :visible.sync="sureDeleteHisVersionDialog" width="50%">
      <h3>请确认是否删除此版本？</h3>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureDeleteHisVersionDialog = false">取 消</el-button>
        <el-button type="primary" @click="sureDeleteHisVersion">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 线上版本点击下架的弹窗 -->
    <el-dialog title="下架版本" @click="downOnlineVersionDialog" width="50%" style="height: 100px;background-color: red;">

      </div>
    </el-dialog>

    <p class="title">审核版本</p>
    <!-- 审核中版本的div矩形框  -->
    <div class="onlineCon">
      <div v-for="(item,index) in auditList" :key="item.id" class="onlineBox review">
        <div class="item">
          <el-button v-if="item.examineStatus === '3'" type="primary" class="button" @click="publishOnline()">立即发布</el-button>
          <!-- 区域右边的向下箭头下拉菜单 -->
        <!-- <el-dropdown>
            <i class="el-icon-arrow-down el-icon--right" />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="handleClickDelVersion(index,item.id)">删除版本</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-button class="el-dropdown fsmall" @click="handleClickDelVersion(item)">撤回审核</el-button>
          <p>版本号</p>
          <p>{{ item.versioncode }}</p>
         <!-- <p v-if="item.examineStatus === '0'"> <el-button type="info" plain disabled>未审核</el-button></p>
          <p v-if="item.examineStatus === '1'"> <el-button type="info" disabled>审核中</el-button></p>
          <p v-if="item.examineStatus === '2'"> <el-button type="info" plain disabled>审核失败</el-button></p>
          <p v-if="item.examineStatus === '3'"> <el-button type="primary" disabled>审核通过</el-button></p> -->

        </div>
        <div class="item">
          <p><span class="key">发布者</span><span>{{ item.pushinformationaccount }}</span></p>
          <p><span class="key">提交审核时间</span><span>{{ item.lastupdatetime }}</span></p>
          <p><span class="key">资源大小</span><span>{{ item.size }} </span></p>
          <p><span class="key">项目备注</span><span>{{ item.remarks }}</span></p>
        </div>

        <!-- 点击删除审核中版本的弹窗 -->
        <!-- <el-dialog title="撤回审核" :visible.sync="returnDevVersionDialog" width="30%">
          <p style="text-align: center">确认撤回当前审核版本？</p>
          <div slot="footer" class="dialog-footer">
            <el-button @click="returnDevVersionDialog = false">取 消</el-button>
            <el-button type="primary" @click="returnDevVersion">确 定</el-button>
          </div>
        </el-dialog> -->
      </div>
    </div>

    <!-- 开发版本 -->
    <p class="title">开发版本</p>
    <div class="onlineCon">
      <div v-for="(item,index) in devList" :key="index" class="onlineBox">
        <div class="item">
          <el-button type="primary" class="button" @click="addExaminVersion(item)">提交审核</el-button>
          <img @click="handleDelDevVersion(item)" src="@/assets/img/del.png" class="serdel">
          <p>版本号</p>
          <p>{{ item.versioncode }}</p>
        </div>
        <div class="item">
          <p><span class="key">发布者</span><span>{{ item.pushinformationaccount }}</span></p>
          <p><span class="key">发布时间</span><span>{{ item.lastupdatetime }}</span></p>
          <p><span class="key">资源大小</span><span>{{ item.size }}</span></p>
          <p><span class="key">项目备注</span><span>{{ item.remarks }}</span></p>
        </div>
      </div>
    </div>



    <!-- 点击上传资源包出现 -->
    <el-dialog title="上传资源包" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="form"  :model="form" :rules="rule" label-width="150px">
        <el-form-item label="版本号" prop="versioncode">
          <el-col :span="16"><el-input v-model="form.versioncode" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item v-model="form.url"   label="目录" prop="resourcePath">
          <Upload @fileList="getKey" @fileSize="getSize"/>
          <span>请上传压缩包</span>
        </el-form-item>

        <el-form-item
        label="所需参数"
        >
         <el-col :span="16">
           <el-select  style="width: 100%;" v-model="form.h5requiredfields" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in canshu"
                :key="index"
                :label="item.name"
                :value="item.field_code">
              </el-option>
            </el-select>
         </el-col>
        </el-form-item>

        <el-form-item label="项目备注" prop="remarks">

          <el-col :span="16">
            <el-input v-model="form.remarks" autocomplete="off" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button><!-- dialogFormVisible = false -->
        <el-button type="primary"  @click="saveResource()">保存</el-button>
      </div>
    </el-dialog>

  </el-card>

</template>

<script>
import { getActiveProgramId } from '@/utils/auth'
import Upload from '@/components/Upload/uploadFiled.vue'
// import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import {paramsdata} from '@/api/login'
// import { AddApplicationExamineVersion, AddApplicationProdVersion, delApplicationExamineVersion,
//   OffApplicationProdVersion, delApplicationDevVersion, returnApplicationProdVersion } from '@/api/adminCenter'
// import Aside from '@/layout/components/asideMenu/index.vue'
import { getApplicationList,resourcePackag,applVersion,updataapplVersion ,onlineVersionRecord,rollback,submitAudit} from '@/api/adminCenter'
export default {
  name: '',
  inject:["reload"],
  components: {
    Upload
  },
  filters: {
    // 过滤时间
    parseTime(e) {
      return parseTime(new Date(e))
    }

  },
  data() {
    var validateVersionCode = (rule, value, callback) => {
      let reg= /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/
      if (!reg.test(this.form.versioncode)) {
        callback(new Error('请输入正确的版本号'))
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
      if (this.form.url == undefined || this.form.url == "[]") {
        callback(new Error('请上传资源包'))
      }
      callback()
    }
    return {
      canshu:[],
      activeProgramID: '', // 激活应用的id
      deleteDevVersionDialog: false, // 删除开发版本的弹窗
      downOnlineVersionDialog: false, // 线上版本点击下架的弹窗
      returnHisVersionDialog: false, // 点击已上线版本的版本回退的弹窗
      returnDevVersionDialog: false, // 点击撤回审核中版本的弹窗
      delDevVersionId: '', // 删除开发版本的那个id
      delDevVersionIndex: '', // 删除开发版本的那个在 allVersionList.devVersions 的索引
      allVersionList: {
        prodVersions: [],
        devVersions: [],
        examineVersions: []
      }, // 保存全部类型的版本数据
      title1: '线上版本',
      title2: '审核版本',
      title3: '开发版本',
      appId:[],
      shoeconappid:'',
      devList:[],//开发版本列表
      auditList:[],//审核版本列表
      onLineList:[],//已上线版本列表
      dialogFormVisible:false,//上传资源包表单状态
      form: {
            "appid":'',
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
            "versioncode": "",
            "h5requiredfields":''
          },
          rule: {
            versioncode: [
              { required: true, validator: validateVersionCode, trigger: 'blur' }
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
          onlineVersionList:[]
    }
  },
  watch:{
    //应用列表
    shoeconappid(n){
     resourcePackag({appId:n}).then(res=>{
       this.devList=res.data.devList
       this.auditList=res.data.auditList
       this.onLineList=res.data.onLineList
     }).catch(() => {console.log('error submit!!')})
    }
  },
  computed: {
    formatProdVersions() {
      return this.allVersionList.prodVersions.filter(item => item.isHistory === 0)
    },
    historyVersionList() {
      return this.allVersionList.prodVersions.filter(item => item.isHistory === 1)
    }
  },
  created() {
    //应用列表获取
    getApplicationList({
       "page": 1,
       "pageSize": 10,
       "username": this.$store.state.user.userInfo.username
     }).then(res=>{

       this.appId=res.data.content
      this.$nextTick(()=>{
       if(this.$route.query.appid){
         this.shoeconappid=this.$route.query.appid
       }else{
         this.shoeconappid=this.appId[0].appId
       }
      })
     }).catch(() => {console.log('error submit!!')})

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
  },
  mounted() {
    this.activeProgramID = getActiveProgramId()
  },
  methods: {
    getSize(e) {
      this.form.size = JSON.stringify(e)
    },
    getKey(data) {
      this.form.url =JSON.stringify(data)
    },
    //获取应用线上版本记录
    returnHis(n){
      this.returnHisVersionDialog=true
      onlineVersionRecord({appId:n.appid}).then(res=>{
        this.onlineVersionList=res.data
      }).catch(()=>{
        console.log("erorr!!")
      })
    },


    // 点击线上版本下架的按钮时触发
    handleClickDownVersion(form) {
       this.$confirm('此操作将下架该应用是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if(this.auditList.length > 1){
                  this.$message.error("已存在审核版本，如需更改，请先撤回")
                  return false
                }else{
                  form.status=0
                  updataapplVersion(form).then(res=>{
                    this.$message.success('版本已下架')
                    this.$router.push({
                      path:"/home/adminCenter/versionAdmin/index",
                      query:{"appid":form.appid},
                    })
                    this.reload();
                  }).catch(()=>{
                    this.$message.error("下架失败")
                  })
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消下架'
                });
              });
    },
    // 确认线上版本下架时触发
    async downOnlineVersion() {
      await OffApplicationProdVersion({ versionId: this.downOnlineVersionId })
      // this.allVersionList.prodVersions.splice(this.downOnlineVersionIndex, 1)
      const online = this.allVersionList.prodVersions.filter(e => {
        return e.isHistory === 0
      })
      const onlineObj = online[0]
      // console.log(onlineObj.isHistory)
      onlineObj.isHistory = 1
      // console.log(onlineObj.isHistory)

      this.downOnlineVersionDialog = false
    },


    // 点击删除开发版本

    async handleDelDevVersion(form) {
      this.$confirm('是否删除该开发版本?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               form.status=-1
               updataapplVersion(form).then(res=>{
                 this.$message.success('版本已删除')
                 this.$router.push({
                   path:"/home/adminCenter/versionAdmin/index",
                   query:{"appid":form.appid},
                 })
                 this.reload()
               }).catch(()=>{
                 this.$message.error("删除失败")
               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消删除'
               });
             });
    },

    // 提交审核
    addExaminVersion(n) {
      if(this.auditList.length > 1){
        this.$message.error("已存在审核版本，如需更改，请先撤回")
        return false
      }else{
          submitAudit(n).then(res=>{
           this.$message.success('版本已提交审核，请耐心等待')
           this.$router.push({
             path:"/home/adminCenter/versionAdmin/index",
             query:{"appid":n.appid},
           })
           this.reload()
          }).catch(err=>{
            this.$message.error(err.response.data.message)

            console.log(err.response)
          })
      }

    },
    //点击撤回审核中的版本
    handleClickDelVersion(n) {
        this.$confirm('请确认是否撤回审核?', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
               }).then(() => {

                 n.status=0
                 updataapplVersion(n).then(res=>{
                   this.$message.success('已撤销审核')
                   this.$router.push({
                     path:"/home/adminCenter/versionAdmin/index",
                     query:{"appid":n.appid},
                   })
                   this.reload()
                 }).catch(()=>{
                   this.$message.error("撤销失败失败")
                 })
               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '已取消撤销'
                 });
               });
    },

    // 确认删除审核中的版本时触发
    // async returnDevVersion() {
    //   await delApplicationExamineVersion({ versionId: this.delExaminVerionId })
    //   this.allVersionList.examineVersions.splice(this.delExaminVerionIndex, 1)
    //   this.returnDevVersionDialog = false
    // },

    // 点击 ‘版本回退’ => ‘回退’
    handleReturn(n) {
      this.$confirm('请确认是否回退到版本?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
                  rollback({
                    appId:n.appId,
                    id:n.id,
                    username:n.pushInformationAccount
                  }).then(res=>{
                    this.$message.success('回退已提交审核')
                  }).catch(()=>{
                    this.$message.error("回退提交失败")
                  })
               // n.status=2
               // updataapplVersion(n).then(res=>{
               //   this.$message.success('版本已提交审核')
               //   this.reload();
               // }).catch(()=>{
               //   this.$message.error("回退提交失败")
               // })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消回退'
               });
             });
    },


    // 添加资源包
    async saveResource() {
      this.form.h5requiredfields=JSON.stringify(this.form.h5requiredfields)
       // console.log(this.form)
      this.form.appid=this.shoeconappid
      this.form.pushinformationaccount=this.$store.state.user.userInfo.username

      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log(this.form)
          const data = await applVersion(this.form).then(res=>{
           this.$message.success(res.msg)
             this.dialogFormVisible = false
             this.reload()
          }).catch(err => {
             this.$message.error(err.response.data.message)
             this.form.h5requiredfields=''
          })
        } else {
          this.$message.error('请填写完整信息')

           this.form.h5requiredfields=''
          return false
        }
      })

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
.whole{
  padding-left: 60px;
  margin-top: 40px;
  /* padding-left: 60px; */
  padding-bottom: 60px;
}
.box-card{
    margin-top: 20px;
    padding: 20px;
    width: 600px;
}
.onlineCon{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.onlineBox{
  width: 750px;
  height: 240px;
background: white;
border: 1px solid #2F88FF;
box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
border-radius: 10px;
font-size: 16px;
margin-bottom: 20px;
display: flex;
justify-content: flex-start;
padding: 35px;
position: relative;
margin-right:30px;
}
.el-dropdown{
  position: absolute;
  right: 30px;
  top: 85px;
  font-size: 20px;
}
.item{
  margin-right: 40px;
}
.button{
  position: absolute;
  top: 80px;
  right: 70px;
}
.key{
    margin-right: 20px;
    font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
opacity: 0.7;
}
.title{
  font-size: 20px;
    line-height: 20px;
    margin-bottom: 30px;
    color: #000;
}
/* .whole{
    padding: 40px 80px;
} */
.review{
  background-color: #F4F4F4;
  border: none;
  box-shadow: none;
}
.serdel{
  position: absolute;
  right: 30px;
  top: 20px;
}
.shoeconappid{
  width: 520px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.fsmall{
  font-size: 14px;
  top: 60px;
  cursor: pointer;
  color: #2F88FF;
}
</style>
