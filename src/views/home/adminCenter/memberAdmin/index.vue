<template>

  <el-card class="box-card">
    <el-select class="shoeconappid" placeholder="请选择" v-model="shoeconappid">
        <el-option
          v-for="(item,index) in appId"
          :key="index"
          :label="item.appName"
          :value="item.appId"
          >
        </el-option>
      </el-select> <br />
    <span class="title">超级管理员</span><span class="remarkWord">可设置风险操作保护，风险操作提醒，添加管理员、项目成员等帐号安全</span>
    <div class="memberAdmin">
      <div class="adminBox">
        <img class="people" src="@/assets/img/people.jpeg"/>
        <div class="message" v-for="(item,index) in superMember" :key="index">
          <span>名字：{{ item.username }}</span><br>
           <span>手机号：{{ item.phone }}</span>
          <!-- <span>云商号：{{ adminInformation.adminAccount }}</span> -->
        </div>
        <!-- <div class="update">
          <p @click="dialogFormVisible = true"><i class="el-icon-folder-add" />修改</p>
        </div> -->
      </div>
    </div>


    <span class="title">管理员</span><span class="remarkWord">可设置风险操作保护，风险操作提醒，添加项目成员等帐号安全</span>
    <div class="memberAdmin">
      <div class="adminBox" v-for="(item,index) in adminMember" :key="index">
        <img class="people" src="@/assets/img/people.jpeg"/>
        <div class="message">
          <span>名字：{{ item.username }}</span><br>
           <span>手机号：{{ item.phone }}</span>

        </div>
        <!-- <div class="update">
          <p @click="dialogFormVisible = true"><i class="el-icon-folder-add" />修改</p>
        </div> -->
         <img v-if="operationForm"  @click="deleteMember(item.id)" src="@/assets/img/del.png" class="serdel">
      </div>
      <div v-if="operationForm" class="addadmin" @click="addMemberDia = true">
        <i class="el-icon-plus"></i>
        <span>添加管理员</span>
      </div>
    </div>


    <p class="title" style="margin-top: 30px;margin-bottom: 0;">项目成员</p>
    <div class="memberList">
      <div class="memberAdmin">
        <div class="adminBox" v-for="(item,index) in ordinaryMember" :key="index">
          <img class="people" src="@/assets/img/people.jpeg"/>
          <div class="message">
            <span>名字：{{ item.username }}</span><br>
             <span>手机号：{{ item.phone }}</span>
            <!-- <span>云商号：{{ adminInformation.adminAccount }}</span> -->
          </div>
          <img v-if="operationFormT" @click="deleteMember(item.id)" src="@/assets/img/del.png" class="serdel">
        </div>
        <div v-if="operationFormT" class="addadmin" @click="addMemberDialog = true">
          <i class="el-icon-plus"></i>
          <span>添加成员</span>
        </div>
      </div>
    </div>

    <!-- 编辑成员的弹窗 -->
    <!-- <el-dialog title="编辑成员" :visible.sync="editMemberDialog" width="35%">
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="权限" prop="operator">
          <el-checkbox v-model="editForm.authority.operator">运营者</el-checkbox>
          <el-checkbox v-model="editForm.authority.developer">开发者</el-checkbox>
          <el-checkbox v-model="editForm.authority.dataAnalyst">数据分析者</el-checkbox>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-col :span="18"><el-input v-model="editForm.remarks" autocomplete="off" /></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editMemberDialog = false">取 消</el-button>
        <el-button type="primary" @click="editMember">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 删除成员的弹窗 -->
    <!-- <el-dialog title="删除成员" :visible.sync="deleteMemberDialog" width="35%">
      <p>确定要删除此成员吗？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteMemberDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteMember">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 添加管理员的弹窗 -->
    <el-dialog title="添加管理员" :visible.sync="addMemberDia" width="35%">
      <el-form ref="addForm" :model="addMemberForm" :rules="addMemberRules" label-width="120px">
        <el-form-item label="名字" prop="addname">
          <el-col :span="13"><el-input v-model="addMemberForm.realname" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item label="账号" prop="addaccount">
          <el-col :span="13"><el-input v-model="addMemberForm.username" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="phonepp">
          <el-col :span="13"><el-input v-model="addMemberForm.phone" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item label="备注" prop>
          <el-col :span="18"><el-input v-model="addMemberForm.remarks" autocomplete="off" /></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMemberDia = false">取 消</el-button>
        <el-button type="primary" @click="postaddMember">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加项目成员的弹窗 -->
    <el-dialog title="添加项目成员" :visible.sync="addMemberDialog" width="35%">
      <el-form ref="addFormT" :model="addForm" :rules="addRules" label-width="120px">
        <el-form-item label="名字" prop="addnameT">
          <el-col :span="13"><el-input v-model="addForm.realname" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item label="账号" prop="addaccountT">
          <el-col :span="13"><el-input v-model="addForm.username" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneppT">
          <el-col :span="13"><el-input v-model="addForm.phone" autocomplete="off" /></el-col>
        </el-form-item>
        <el-form-item label="备注" prop>
          <el-col :span="18"><el-input v-model="addForm.remarks" autocomplete="off" /></el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMemberDialog = false">取 消</el-button>
        <el-button type="primary" @click="postMember">确 定</el-button>
      </div>
    </el-dialog>


  </el-card>
  <!-- </el-col> -->
  <!-- </div> -->
</template>
<script>
import { getActiveProgramId } from '@/utils/auth'
import Upload from '@/components/Upload/uploadImg.vue'
import { findApplicationMembers, addApplicationMember, editApplicationMember, deleteApplicationMember, IsRepeatApplicationMember } from '@/api/adminCenter'
// import Aside from '@/layout/components/asideMenu/index.vue'
import {memberList,getApplicationList,applMember,getMemberInfo,delapplMember} from '@/api/adminCenter'
// import { mapGetters } from 'vuex'
export default {
  name: 'MenuAdmin',
  components: {
    Upload
  },
   inject:["reload"],
  filters: {
    toChinese(e) {
      if (e === false) {
        return '否'
      } else {
        return '是'
      }
    }
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (this.addForm.realname === '') {
        callback(new Error('请输入成员名字'))
      }
      callback()
    }
    var validateAvatar = (rule, value, callback) => {
     if (this.addForm.username === '') {
       callback(new Error('请输入成员账号'))
     }
     callback()
    }
    var validateAccount = async(rule, value, callback) => {
      let reg=/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if (!reg.test(this.addForm.phone)) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    }


    var validataddeName  = (rule, value, callback) => {
      if (this.addMemberForm.realname === '') {
        callback(new Error('请输入成员名字'))
      }
      callback()
    }
    var validateaddAvatar = (rule, value, callback) => {
      if (this.addMemberForm.username === '') {
        callback(new Error('请输入成员账号'))
      }
      callback()
    }
    var validateaddphone = (rule, value, callback) => {
      let reg=/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      if (!reg.test(this.addMemberForm.phone)) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    }

    return {
      appId:[],
      shoeconappid:'',
      allMember:[],//所有成员
      superMember:[],//超级管理员
      adminMember:[],//管理员
      ordinaryMember:[],//普通成员
      operationForm:false,//管理员操作按钮是否显示
      operationFormT:false,//普通成员操作按钮是否显示



      activeProgramID: '', // 激活的应用的id
      repeated: false, // 添加成员时是否该成员已存在，先默认为false
      deleteMemberDialog: false,
      editMemberDialog: false,
      addMemberDialog: false,
      addMemberDia: false,
      // 管理员信息
      adminInformation: {},
      // 成员信息
      members: [],
      allMemberInformation: null, // 所有成员信息（包含管理员）
      addForm: {
        "appid": "",
        "authority": 3,
        "createby": "",
        "createtime": "",
        "id": null,
        "lastupdateby": "",
        "lastupdatetime": "",
        "phone": "",
        "realname": "",
        "remarks": "",
        "username": ""
      },
      addMemberForm:{
        		"appid": "",
        		"authority": 2,
        		"createby": "",
        		"createtime": "",
        		"id": null,
        		"lastupdateby": "",
        		"lastupdatetime": "",
        		"phone": "",
        		"realname": "",
        		"remarks": "",
        		"username": ""
      },
      deleteMemmberId: null, // 删除成员所在的索引
      memberId: '', // 编辑的成员的id
      editMemberIndex: null, // 编辑成员的索引

      editForm: { // 编辑成员的表单
        authority: {
          operator: false,
          developer: false,
          dataAnalyst: false
        },
        remarks: undefined
      },
      addRules: {
        addnameT: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
         addaccountT: [
          { required: true, validator: validateAvatar, trigger: 'blur' }
        ],
        phoneppT: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ]
      },
      addMemberRules:{
          addname: [
            { required: true, validator: validataddeName, trigger: 'blur' }
          ],
          addaccount: [
            { required: true, validator: validateaddAvatar, trigger: 'blur' }
          ],
      phonepp:[
          {
          required: true, validator: validateaddphone,trigger: 'blur'
          }
        ]
    },
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
  },

  mounted() {
    this.activeProgramID = getActiveProgramId()
    // console.log(this.allMemberInformation)
    this.addForm.id = this.activeProgramID


  },
  watch:{
    //当应用切换时
    shoeconappid(n){
      this.superMember=[]
       this.adminMember=[]
       this.ordinaryMember=[]

      // 管理员列表分类
     memberList({appId:n}).then(res=>{
       this.allMember=res.data
       for (var i=0;i<res.data.length;i++) {
         if(res.data[i].authority == 1){
           this.superMember.push(res.data[i])
         }else if(res.data[i].authority == 2){
           this.adminMember.push(res.data[i])
         }else if(res.data[i].authority == 3){
           this.ordinaryMember.push(res.data[i])
         }
       }
     })
     // 管理员身份信息
     getMemberInfo({
       appId:n,
       username: this.$store.state.user.userInfo.username
     }).then(res=>{

       this.addMemberForm.id=res.data.id
       this.addForm.id=res.data.id
       let authority=res.data.authority
       if(authority == 1){
         this.operationForm=true
         this.operationFormT=true
       }else if(authority == 2){
         this.operationForm=false
         this.operationFormT=true
       }else if(authority == 3){
         this.operationForm=false
         this.operationFormT=false
       }
     })

     // 应用详情
     // getApplsBasicInfoDetail({appId:n}).then(res=>{
     //   console.log(res)
     // })
    }
  },
  methods: {
      // 添加管理员
     async postaddMember(){
       this.addMemberForm.appid=this.shoeconappid
       this.addMemberForm.createby=this.$store.state.user.userInfo.username
        this.$refs.addForm.validate(async valid => {
        if (valid){
            applMember(this.addMemberForm).then(res=>{
              this.$message.success('添加成功')
              this.addMemberDia=false
              this.reload()
            }).catch(err=>{
              this.$message.error(err.response.data.message)
            })
        } else {
          this.$message.error('请正确填写信息')
          return false
        }})
      },
      // 添加项目成员
      async postMember(){
        this.addForm.appid=this.shoeconappid
        this.addForm.createby=this.$store.state.user.userInfo.username
        this.$refs.addFormT.validate(valid=>{
          if(valid){
            applMember(this.addForm).then(res=>{
              this.$message.success('添加成功')
              this.addMemberDia=false
              this.reload()
            }).catch(err=>{
              this.$message.error(err.response.data.message)
            })
          }else{
            this.$message.error('请正确填写信息')
            return false
          }
        })
      },
      // 确认删除触发
      deleteMember(n) {
       delapplMember({
         id:n,
         username:this.$store.state.user.userInfo.username
         }).then(res=>{
         this.$message.success('删除成功')
         this.reload()
       }).catch(err=>{
         console.log(err.response)
       })
      },









    // 判断该成员是否存在
    async isRepeat() {
      const data = await IsRepeatApplicationMember({ id: this.activeProgramID, account: this.addForm.member.account })
      this.repeated = data.repeat
    },
    // 添加成员
    addMember() {
      // console.log(this.addForm.member.authority.operator)
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const data = await addApplicationMember(this.addForm)
          const id = data.memberId
          //  在我的本地data数据members加入这个添加成员的数据，就不用再调后端接口了
          this.members.push({ id: id, name: this.addForm.member.name,
            avatar: this.addForm.member.avatar, account: this.addForm.member.account,
            authority: { operator: this.addForm.member.authority.operator, developer: this.addForm.member.authority.developer,
              dataAnalyst: this.addForm.member.authority.dataAnalyst }, remarks: this.addForm.member.remarks })

          this.addMemberDialog = false
        } else {
          this.$message.error('请填写完整信息')
        }
      })
    },
    getKey(data) {
      this.addForm.member.avatar = data
    },
    // 点击编辑的时候触发
    handleClickEdit(index, id) {
      this.editMemberIndex = index
      this.memberId = id
      this.editMemberDialog = true
    },
    // 确认编辑成员信息按钮触发
    async editMember() {
      await editApplicationMember({ id: this.memberId, fields: this.editForm })
      // 拿到此编辑的成员的索引，也是在我本地手动改变此组件的data数据
      this.members[this.editMemberIndex].remarks = this.editForm.remarks
      this.members[this.editMemberIndex].authority.operator = this.editForm.authority.operator
      this.members[this.editMemberIndex].authority.developer = this.editForm.authority.developer
      this.members[this.editMemberIndex].authority.dataAnalyst = this.editForm.authority.dataAnalyst
      this.editMemberDialog = false
    },
    // 点击删除按钮触发
    handleDelete(index, id) {
      this.deleteMemberId = id
      this.deleteMemmberId = index
      this.deleteMemberDialog = true
    },


  }

}
</script>
<style scoped>

.title{
  font-size: 20px;
    line-height: 20px;
    color: #000;
}
.box-card{
  margin-top: 40px;
  padding: 20px 60px 100px 60px;
}

.remarkWord{
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
margin-left: 15px;
}
.adminBox{
  width: 520px;
  height: 160px;
background: #E5F3FF;
border-radius: 10px;
font-size: 15px;
line-height: 22px;
margin-top: 20px;
display: flex;
justify-content: space-around;
position: relative;
margin-bottom: 40px;
margin-right: 30px;
}
.adminBox .people{
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-20px);

}
.memberList{
  width: 70%;
  display: flex;
  justify-content: space-between;
}
.message{
  position: absolute;
  top: 50%;
  transform: translateY(-22px);
  left: 100px;
}
.space{
  margin-left: 15px;
  cursor: pointer;
  color: #2F88FF;
}
.update{
  position: absolute;
  bottom: 0;
  right: 15px;
}
.adminBox .del{
  width: 19.5px;
  height: 20px;
  position: absolute;
  left:480px;
  top: 40px;
}
.addadmin{
  width: 520px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2F88FF;
  flex-direction: column;
  background-color: #E5F3FF;
  border-radius: 10px;
  margin-bottom: 40px;
  margin-top: 20px;
}
.addadmin i{
  font-size: 30px;
  margin-bottom: 10px;
}
.memberAdmin{
  display: flex;
  width: 100%;
  align-items: center;
}
/deep/.el-table th{
  background-color:#F4F4F4;
}
/deep/.el-table__header-wrapper, .el-table__footer-wrapper{
  border-top-left-radius: 10px;
  border-top-right-radius:10px;
}
.el-icon-setting{
  font-size:20px;
}
.shoeconappid{
  width: 520px;
  margin-bottom: 50px;
}
.serdel{
  position: absolute !important;
  right: 30px !important;
  top: 20px !important;
}
</style>
