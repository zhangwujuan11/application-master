<template>
  <el-card class="box-card">
    <p class="title">小程序基本信息</p>
    <el-form ref="dialog" :model="dialog" :rules="rule" label-width="100px">
      <div class="elItem">
        <label class="key">小程序名称</label><div class="basicInformation">{{ lists.basicInformation.appName }}</div>
        <div><span class="text" @click="handleUpdate('小程序名称','appName')">修改</span><span class="text2">小程序发布后，非个人类帐号可通过认证 方式改名。</span></div>
      </div>
      <!-- 修改小程序名称的弹窗 -->
      <el-dialog

        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        center
        :before-close="putAppNameClose"
      >
        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="输入修改" />
          <el-step title="确认修改" />
        </el-steps>

        <el-form-item v-if="showBody" :label="dialog.chineseName" prop="value">
          <el-col :span="12"> <el-input v-model="dialog.value" /> </el-col>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="showBtn1" @click="clickAppNameNext">下一步</el-button>
          <el-button v-if="showBtn2" type="primary" @click="sbmitUpdated(dialog.englishName)">确认修改</el-button>
        </span>
      </el-dialog>
      <div class="elItem">
        <label class="key">小程序简称</label>
        <div class="basicInformation">{{ lists.basicInformation.appShortName }}</div>
        <div>
          <span class="text" @click="handleUpdate('小程序简称','appShortName')">修改</span>
          <span class="text2">一年内可申请修改2次，今年还可修改2次</span>
        </div>
      </div>
      <div class="elItem">
        <label class="key">小程序头像</label><div class="basicInformation">{{ }}</div>
        <div><span class="text" @click="dialogVisible = true">修改</span><span class="text2">一年内可申请修改2次，今年还可修改2次</span></div>
      </div>
      <div class="elItem">
        <label class="key">小程序二维码</label>
        <div class="basicInformation">{{ lists.appQRCode }}</div>
        <div>
          <span class="text" @click="dialogVisible = true">修改</span>
          <span class="text2">一年内可申请修改2次，今年还可修改2次</span>
        </div>
      </div>
      <div class="elItem">
        <label class="key">小程序状态</label><div class="basicInformation">{{ }}</div>
        <div><span class="text" @click="dialogVisible = true">详情</span><span class="text2">于2020-08-28完成微信认证审核</span></div>
      </div>
      <div class="elItem">
        <label class="key">主体信息</label><div class="basicInformation">{{ }}</div>
        <div><span class="text" @click="dialogVisible = true">修改</span><span class="text2">一个月内可申请修改5次，本月还可修改5次</span></div>
      </div>
      <div class="elItem">
        <label class="key">服务类型</label><div class="basicInformation">{{ }}</div>
        <div><span class="text" @click="dialogVisible = true">修改</span><span class="text2">一个月内可申请修改5次，本月还可修改5次</span></div>
      </div>
      <div class="elItem">
        <label class="key">小程序ID</label><div class="basicInformation">{{ lists.id }}</div>
      </div>
    </el-form>
  </el-card>
</template>
<script>
import { getActiveProgramId } from '@/utils/auth'
import { checkAppName } from '@/api/checkAppName'
import { basicInformation, updateBasicInation } from '@/api/adminCenter'
// import { mapGetters } from 'vuex'
export default {
  data() {
    var validateValue = async(rule, value, callback) => {
      await this.checkName()
      if (this.repeat === true) {
        callback(new Error('此名称已被注册'))
      }
      callback()
    }
    return {
      activeProgramID: '', // 激活应用的id
      repeat: false, // 调用接口校验小程序名称是否重复,先默认false
      dialog: { // 点击修改时的弹窗里面的数据
        chineseName: '', // 主要是为了显示在弹窗里面
        englishName: '', // 主要是为了发送英文名给后端
        value: '' // 绑定用户输入的数据
      },
      showBody: true,
      showBtn1: true,
      showBtn2: false,
      active: 0,
      dialogVisible: false,
      lists: {
        id: '',
        appQRCode: '',
        basicInformation: {
          appShortName: '',
          appName: ''
        }

      },
      rule: {
        value: [
          { required: true, validator: validateValue, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.activeProgramID = getActiveProgramId()
    this.getBasicInformation()
  },
  methods: {
    // 修改小程序名称时校验是否该名称已存在
    async checkName() {
      const data = await checkAppName({ appName: this.dialog.value, appType: '0' })
      //  data.repeat返回true或者false
      this.repeat = data.repeat
    },
    // 点击修改触发
    handleUpdate(chineseName, englishName) {
      this.dialog.chineseName = chineseName
      this.dialog.englishName = englishName
      this.dialogVisible = true
      // console.log(this.dialog)
    },
    clickAppNameNext() {
      this.showBtn2 = true
      this.showBtn1 = false
      this.showBody = false
      this.active = 1
    },
    putAppNameClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.active = 0
          this.showBody = true
          this.showBtn1 = true
          this.showBtn2 = false

          done()
        })
        .catch(_ => {})
    },
    async sbmitUpdated(val) {
      const temp = {}
      temp[val] = this.dialog.value
      await updateBasicInation({ id: this.activeProgramID, fields: temp })
      this.lists['basicInformation'][val] = this.dialog.value
      this.dialogVisible = false
    },
    async getBasicInformation() {
      const data = await basicInformation({ id: this.activeProgramID })
      this.lists = data
    }
  }

}
</script>
<style scoped>
.key{
  width: 100px;
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

</style>
