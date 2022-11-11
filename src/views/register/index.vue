
<template>
  <RegisterModel :actived="activeStep" :personform="registerForm">
    <div class="firstStepBox">
      <el-form ref="registerForm" :model="registerForm" status-icon :rules="rules" label-width="100px" class="registerForm">

        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name" type="text" autocomplete="off" />
          <span class="greyWord">用户姓名</span>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="registerForm.username" type="text" autocomplete="off" />
          <span class="greyWord">作为登录账号，请填写未被夸克应用平台注册的账号</span>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" type="email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone" type="tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="registerForm.password" type="password" autocomplete="off" />
          <span class="greyWord">字母、数字或者英文符号，最短8位，区分大小写</span>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="registerForm.checkPass" type="password" autocomplete="off" />
          <span class="greyWord">请再次输入密码</span>
        </el-form-item>
        <!-- <el-form-item class="vcodeItem" label="验证码" prop="vcode">
          <el-input v-model="registerForm.vcode" class="codeInput" autocomplete="off" />
          <div ref="code" class="vcode">
            <img :src="svg" alt="dd">
          </div>
          <span class="nextCode loginLink" @click="getCode">换一张</span>
        </el-form-item> -->
        <div class="agreeArea"><el-checkbox v-model="checked" @change="handleChange">你已阅读并同意</el-checkbox>
          <span>《夸克应用平台服务协议》</span>及<span>《夸克小程序平台服务条款》</span>
        </div>
        <el-button class="button" type="success" :disabled="check" @click="submitForm(registerForm)">注册</el-button>
      </el-form>
    </div>
  </RegisterModel>
</template>
<script>
import { postRegister } from '@/api/login'
import RegisterModel from '@/components/RegisterModel/index.vue'
export default {
  name: 'RegisterEmailinfo',
  inject:["reload"],
  components: {
    RegisterModel
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      const patten = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!patten.test(value)) {
        callback(new Error('请输入正确的邮箱地址'))
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (this.registerForm.password.length < 8) {
        callback(new Error('请输入符合要求的密码'))
      }
        callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatephone=(rule, value, callback) => {
        const reg =/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
    }
    const validatename=(rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'))
        }
        callback()
    }
    const validateusername=(rule, value, callback) => {
        if (value === '') {
          callback(new Error('账号不能为空'))
        }
        callback()
    }
    // const validateVcode = (rule, value, callback) => {
    //   if (value !== this.vcodeText) {
    //     callback(new Error('请输入正确的验证码'))
    //   }
    //   callback()
    // }
    return {
      svg:'',//验证码图片地址



      activeStep: 0, // 0代表当前注册步骤为填写账号信息
      titles: '注册',
      check: true,
      checked: false,
      vcodeText: '', // 请求验证码接口返回的验证应填入的正确的输入值
      registerForm: {
        	"name":"",
        	"userCode":"",
        	"username":"",
        	"password":"",
        	"email":"",
        	"phone":"",
          "checkPass":''
      },

      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name:[
          { validator: validatename, trigger: 'blur' }
        ],
        username:[
          {validator: validateusername, trigger: 'blur' },
          ],
        phone:[
          {validator: validatephone, trigger: 'blur'}
        ]

      }
    }
  },
  mounted() {
    // this.$store.user.state.activePage = 'register'
    // this.getCode()
    this.activeStep = 0
  },
  methods: {


    // 图片验证码
    // async getCode() {
    //   captcha().then(res=>{
    //     this.svg ='data:image/gif;base64' + res.data.data.base64;
    //     this.vcodeText = res.data.data.validatecode
    //     console.log(this.vcodeText)
    //   })
    // },
    handleChange(event) {
      if (event) {
        this.check = false
      } else {
        this.check = true
      }
    },
    submitForm(formName) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          postRegister(formName).then(res=>{
            if(res.data.code=="1500"){
              this.$message.success(res.data.message)
              this.$router.push('/')
            }else{
              this.$message.error(res.data.message)
             this.reload()
            }
            console.log(res)
          }).catch(err=>{
            console.log(err.response)
            this.$message.error('注册失败')
          })


        } else {
          this.$message.error('请确认注册信息！')
          return false
        }
      })
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
  left: 470px;
  cursor: pointer;
}
.vcode{
  width: 150px;
  height: 44px;
  /* background-color: blanchedalmond; */
 position: absolute;
 left: 310px;
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
.greyWord{
  font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;;
}
.firstStepBox{
  display: flex;
   align-items: center;
   justify-content: center;
}
.registerForm{
  width: 680px;
  /* height: 630px; */
  /* background-color: aquamarine; */
  padding-top: 40px;
  padding-right: 40px;
}

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
    margin-bottom: 30px;
  }
</style>
