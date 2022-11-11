<template>
  <miniRegisterModel :active="activeStep" :title="titles" :parent-event="ruleForm">
    <div class="firstStepBox">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="ruleForm">
        <div class="textWord">
          <!-- <span class="word">已有小程序?</span><span class="loginLink">立即登录</span> -->
          <p class="word">每个邮箱绑定一个小程序</p>
        </div>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" type="email" autocomplete="off" />
          <span class="word">作为登录账号，请填写未注册过夸克应用的邮箱</span>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
          字母、数字或者英文符号，最短8位，区分大小写
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="checkPass" type="text" autocomplete="off" />
          请再次输入密码
        </el-form-item> -->
        <el-form-item class="vcodeItem" label="验证码" prop="vcode">
          <el-input v-model="ruleForm.vcode" class="codeInput" autocomplete="off" />
          <div ref="vcode" class="vcode" />
          <span class="nextCode loginLink" @click="getVcode">换一张</span>
        </el-form-item>
        <div class="agreeArea"><el-checkbox v-model="checked" @change="handleChange">你已阅读并同意</el-checkbox>
          <span>《夸克应用平台服务协议》</span>及<span>《夸克小程序平台服务条款》</span>
        </div>
        <el-button class="button" type="success" :disabled="check" @click="submitForm('ruleForm')">注册</el-button>
      </el-form>
    </div>
  </miniRegisterModel>
</template>
<script>
import { getVerificationCode } from '@/api/getCode'
import { miniProgramEmailCheck } from '@/api/miniProgramRegister'
import miniRegisterModel from '@/components/miniProgramRegiModel/index.vue'
export default {
  name: 'MiniProgramRegister',
  components: {
    miniRegisterModel
  },
  data() {
    const validateEmail = async(rule, value, callback) => {
      const patten = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      await this.checkEmail()
      if (!patten.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
      } else if (this.repeatd) {
        callback(new Error('该邮箱已注册过小程序'))
      }
      callback()
    }
    // const validatePass = (rule, value, callback) => {
    //   if (value.length < 8) {
    //     callback(new Error('请输入符合要求的密码'))
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass')
    //     }
    //     callback()
    //   }
    // }
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error('两次输入密码不一致!'))
    //   } else {
    //     callback()
    //   }
    // }
    const validateVcode = (rule, value, callback) => {
      if (value !== this.vcodeText) {
        callback(new Error('请输入正确的验证码'))
      }
      callback()
    }

    return {
      repeatd: false,
      vcodeText: '', // 请求验证码接口返回的验证应填入的正确的输入值
      titles: '小程序注册',
      check: true,
      checked: false,
      activeStep: 0, // 0代表当前注册步骤为填写账号信息
      // checkPass: '',
      ruleForm: {
        // pass: '',
        email: '',
        vcode: ''
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        // pass: [
        //   { validator: validatePass, trigger: 'change' }
        // ],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'change' }
        // ],
        vcode: [
          { validator: validateVcode, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property

  },
  mounted() {
    this.getVcode()
  },
  methods: {
    async checkEmail() {
      const data = await miniProgramEmailCheck({ email: this.ruleForm.email, appType: '0' })
      // console.log(data)
      this.repeatd = data.repeat
    },
    handleChange(event) {
      if (event) {
        this.check = false
      } else {
        this.check = true
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$loading = true
          // this.$store.dispatch('user/login', this.ruleForm).then(() => {
          this.activeStep++
          this.$router.push('emailActive')
          //   this.$loading = false
          // this.$message.success('注册成功')
          window.sessionStorage.setItem('miniProgramEmail', this.ruleForm.email)
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    async getVcode() {
      const data = await getVerificationCode()
      const { img, text } = data
      this.$refs.vcode.innerHTML = img
      this.vcodeText = text
    }
  }
}
</script>
<style scoped>
.vcodeItem{
  position: relative;
}
.nextCode{
  position: absolute;
  top: 0;
  left: 480px;
  cursor: pointer;
}
.vcode{
   width: 150px;
  height: 44px;
  background-color: blanchedalmond;
 position: absolute;
 left: 320px;
top: -8px;
}
.codeInput{
  width: 300px;
  margin-right: 20px;
}
.loginLink{
  font-size: 17px;
font-family: Source Han Sans SC;
font-weight: 400;
text-decoration: underline;
color: #4377F3;
}
.textWord{
  margin-left: 60px;
  margin-bottom: 60px;

}
.word{
  height: 14px;
font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
margin-right: 20px;

}
.firstStepBox{
  display: flex;
   align-items: center;
   justify-content: center;
}

.stepStyle{
    width: 680px;
    height: 70px;
    background-color: rgb(123, 113, 180);
    display: flex;
    justify-content: center;
    align-items: center;
}
.ruleForm{
  width: 680px;
  height: 630px;
  /* background-color: aquamarine; */
  padding-top: 40px;
  padding-right: 40px;
}
 /* .clearfix{
   display: flex;
    justify-content: center;
    align-items: center;
 } */
 .text{
   height: 600px;
   background-color: burlywood;
   display: flex;
   align-items: center;
   justify-content: center;
 }
  /* .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  } */

  .box-card {
    width: 100%;
    height: 770px;
  }
  .agreeArea{
    margin-left: 60px;
    margin-top: 40px;
    font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
  }
  .button{
    margin-top: 20px;
   margin-left: 50%;
    width: 100px;
    /* 因为ruleForm内有padding-right:40px,所以transform的时候还要计算上 */
    transform: translateX(-30px);
  }
</style>
