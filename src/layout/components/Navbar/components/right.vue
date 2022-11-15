<template>
  <div>
    <!-- 根据父组件传的afterLogin值确定顶部导航栏的右侧内容 -->
    <div v-if="$store.state.user.token" class="header-right">
      <span>{{$store.state.user.userInfo.username}}</span>
      <el-divider direction="vertical" />
      <span @click="logout">退出</span>
    </div>
    <div v-else :class="['header-right', {headerRight:headerRightColor}]">
      <span @click="register">注册</span>
      <el-divider direction="vertical" />
      <span class="navbutton" @click="showLogin">登录</span>
      <!-- 点击登录按钮时出现的表单 -->
      <el-dialog title="登录" :visible.sync="dialogFormVisible" width="22%" @close="closeDialog">
        <div style="position: relative;">

          <!-- 登录切换 -->
          <div class="choose">
            <span v-if="showCode" @click="choosePutdown">使用账号登录</span>
            <span v-if="showAccount" @click="chooseCode">扫码登录</span>
          </div>
          <!-- 展示扫码登录 -->
          <div v-if="showCode" class="code-box">
            <div class="success">
               <!-- 扫码成功之后出现绿色图标 -->
              <div v-if="showSuccess">
                <img :src="loginSuccess" alt="">
              </div>
            </div>
            <div :class="['code',{'opacity': showSuccess || expried}]">
               <div id="login_container"></div>
            </div>

            <div>
              云商扫一扫，选择该云商下的
            </div>
            <div class="marginTop">公众平台账号登录</div>
          </div>
          <!-- 展示账号密码登录 -->
          <div v-if="showAccount">
            <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules">
              <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
                <el-input v-model="loginForm.username" autocomplete="off" />
              </el-form-item>
              <el-form-item label="密码"  :label-width="formLabelWidth" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
              </el-form-item>
              <el-row>
                <el-button type="success" @click="handleLogin">登录</el-button>
                <!-- <el-button @click="dd">注册</el-button> -->

              </el-row>
            </el-form>
          </div>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      title="请先绑定手机号"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      >
      <input class="bindein" placeholder="请输入手机号" v-model="bindph"  type="text" >
      <el-button type="primary"  :disabled="issend" class="phoneBtn" @click="binPH">{{countDown}}</el-button>
       <p style="font-size: 12px;color: red;margin: 0 0 10px -52%;" v-show="teltru">请输入正确手机号</p>
        <input class="bindein binde"   placeholder="请输入验证码" v-model="phonval"  type="text" >
        <p style="width: 100%;text-align: center;"><el-button type="primary" :disabled=" phonval == '' "  @click="binPHchek">绑定手机</el-button></p>
    </el-dialog>




  </div>
</template>

<script>
import { setActiveProgramId, removeActiveProgramId, getEmail ,getToken} from '@/utils/auth'
import { login , userinfo,wxcallBack,bindPhone,sendVal} from '@/api/login'
import loginSuccess from '@/assets/img/login/loginSuccess.png'
import { mapMutations,mapState } from 'vuex'
import { kuakeadmin } from '@/api/adminCenter'

// 导入二维码插件
import '@/assets/js/weixinLogin.js'
import VueQr from 'qrcodejs2'
import { mapGetters } from 'vuex'


// 定时器
var timer = null
export default {
  name: 'Login',
  inject:["reload"],
  components: {
    VueQr
  },
  props: {
    headerRightColor: { // 颜色
      type: Boolean
    },
    afterlogin: { //
      type: String,
      default: ''
    }
  },

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请输入正确的账号'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能少于6位'))
      }
      callback()
    }

    return {
      username:'',
      acd:'',
      email: '',
      account: '25256',
      showSuccess: false, // 控制扫码成功出现的图标
      expried: false, // 二维码过期标志
      loginSuccess: loginSuccess, // 扫码成功出现的绿色图标资源
      showCode: true, // 控制展示扫码页面
      showAccount: false, // 控制展示账号密码页面
      dialogFormVisible: false,
      formLabelWidth: '60px',
      qrcheck_ticket: '', // 扫码需要的key
      loginForm: {
        grant_type:'password',
        username: '',
        password: '',
        client_id:'1001',
        client_secret:'123456'
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },

      url:'',
      code:'',
      bindph:'',
      teltru:false,
      dialogVisible:false,
      countDown: '获取验证码',
      countdown: 60,
      timer: null,
      issend:false,
      phonval:''
    }
  },
  created(){
    this.url=window.location.href
    if(this.url.indexOf("?code=") != -1 ){
          this.code=this.url.match(/code=(\S*)&/)[1];
          let oldcode= localStorage.getItem('userinfo')
          if(oldcode == null){
            wxcallBack({code:this.code}).then(res=>{
              if(res.data.isBind){
                this.$store.commit('user/USER_LOGIN', res.data.tokenMap)
                this.$store.commit('user/USER_INFO', { username:res.data.username})
                window.location.href="https://1to2to3.cn/applet_center/#/login"
              }else{
                // console.log(res.data)
                localStorage.setItem('openid',JSON.stringify(res.data.openid));
                this.dialogVisible=true
                // this.$prompt('请先绑定手机号', '提示', {
                //           confirmButtonText: '确定',
                //           showClose:false,
                //           showCancelButton:false,
                //           closeOnHashChange:false,
                //           closeOnClickModal:false,
                //           inputPattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
                //           inputErrorMessage: '手机格式不正确'
                //         }).then(({ value }) => {
                //           bindPhone({
                //                 openid:JSON.parse(localStorage.getItem('openid')),
                //                 phone:value
                //           }).then(res=>{
                //             console.log(res)
                //              this.$store.commit('user/USER_LOGIN', res.data.data)
                //             this.$store.commit('user/USER_INFO', { username:res.data.data.username})
                //             localStorage.removeItem("openid")
                //             window.location.href="https://1to2to3.cn/applet_center/#/login"

                //           })

                //         })
              }
            }).catch(()=>{
              this.$message.error("登录失败")
              this.$nextTick(()=>{
                window.location.href="https://1to2to3.cn/applet_center/#/login"
              })
            })

          }
    }
  },
  methods: {
    loading(){
         //启动定时器
         this.issend=true
         this.countdown--; //定时器减1
         this.countDown = "重新发送（" + this.countdown +"）";
        },
    clearTimer(){
       //清除定时器
       clearInterval(this.timer);
       this.timer = null;
    },

    // 发送验证码
    binPH(){
      let reg=/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
      if(!reg.test(this.bindph)){
        this.teltru=true
        return false
      }else{
          this.teltru=false
          this.loading()
          sendVal({
            "phone":this.bindph
          }).then(res=>{
            if(res.data.code==1500){
              this.$message.success('发送成功')
              localStorage.setItem("dosendMsg",JSON.stringify(res.data.data))
            }else{
              this.$message.error('发送失败')
            }
          })
          this.timer = setInterval(() => {
            //创建定时器
            if(this.countdown == 0){
                this.issend=false
                 this.clearTimer(); //关闭定时器
                 this.countDown="获取验证码"
                 this.countdown=60
            }else{
               this.loading();
            }
          },1000)
      }

    },
    binPHchek(){
      let trueCode=JSON.parse(localStorage.getItem('dosendMsg'))
      if(this.phonval == trueCode){
        bindPhone({
          openid:JSON.parse(localStorage.getItem('openid')),
          phone:this.bindph
          }).then(res=>{
            this.$store.commit('user/USER_LOGIN', res.data.data)
            this.$store.commit('user/USER_INFO', { username:res.data.data.username})
            localStorage.removeItem("openid")
            localStorage.removeItem("dosendMsg")
            this.$message.success('手机绑定成功')
            window.location.href="https://1to2to3.cn/applet_center/#/login"
          }).catch(()=>{
            localStorage.removeItem("openid")
            localStorage.removeItem("dosendMsg")
            this.$message.error('绑定失败')
            window.location.href="https://1to2to3.cn/applet_center/#/login"
          })
      }else{
        this.$message.error('验证码错误！！')
      }
    },
    // 点击扫码登录
    chooseCode() {

      this.showSuccess = false
      this.showCode = !this.showCode
      this.showAccount = !this.showAccount
      this.$nextTick(()=>{
        this.showLogin()
      })

    },
    // 点击‘账号密码登录’
    choosePutdown() {
      this.showSuccess = false
      this.showCode = !this.showCode
      this.showAccount = !this.showAccount
      clearInterval(timer)

    },
    // register() {
    //   this.$router.push('/register')
    // },
    closeDialog() {
      // 清空定时器
      clearInterval(timer)
      this.showSuccess = false
      this.expried = false
    },

    // 显示二维码
    showLogin(){
      this.dialogFormVisible=true
      this.$nextTick(()=>{
        var obj = new WxLogin({
        self_redirect: false,//是否在显示二维码区域跳转（iframe）
        id:"login_container",//二维码容器
        appid: "wxdf8750fc46c4cd3d",//微信开发者内创建应用的appid
        scope: "snsapi_login",//公司认证过的
        redirect_uri:"https://1to2to3.cn/applet_center/#/login",//登录成功后进入的页面
        herf:'https://1to2to3.cn/applet_center/#/login',
        })
      })
    },


    // 确认登录出发
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
      login(this.loginForm).then(res=>{
       //登录成功,存储用户信息
       if(res.data.code=='400'){
          this.$message.error(res.data.message)
          this.reload()
       }else{
         this.$store.commit('user/USER_LOGIN', res.data)
         const ty=this.$store.state.user.token_type+" "+res.data.access_token
         userinfo(ty).then(res=>{
           this.$store.commit('user/USER_INFO',res.data.principal.user)
         }).catch(() => {console.log('error submit!!')})
         this.dialogFormVisible = false
         this.reload()
       }
       this.reload()
    }).catch(err => {
      this.loading = false
      })
        }else{
           this.$message.error('请填写正确登录信息')
          return false
        }
      })
    },
    async logout() {
      await this.$store.commit('user/loginOut')
     this.$message({
                 type: 'info',
                 message: '已退出登录'
               });
     this.$nextTick(()=>{
       window.location.href="https://1to2to3.cn/applet_center/#/login"
     })
    },


    register(){
     this.$router.push({
       path:'/register'
     })
    }




  }
}
</script>

<style scoped>
.opacity{
  opacity: 0.1;
}
.choose{

  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.code-box{
  text-align: center;
}
.success{
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  transform: translateY(40px);
  display: flex;
  justify-content: center;
  align-content: center;

}
 .success img{
     width: 65px;
     height: 65px;
   }
.refresh{
  display: block;
  margin-top: 10px;
}
.code{
  justify-content: center;
  display: flex;
  align-content: center;
}
.marginTop{
  margin-top: 15px;
}
.headerRight{
  color: #000 !important;
}
.header-right{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #8f9294;
  height: 34px;
  width: 220px;
  /* background-color: cadetblue; */
}
.header-right span{
 font-size: 16px;
 height: 16px;
}
.navbutton{
  text-align: center;
  width: 48px;
height: 22px !important;
border: 1px solid #4377F3;
border-radius: 4px;
}
.navbutton :hover {
  background-color: #4377F3;
}
.header-right span:hover{
color: #4377F3;
cursor: pointer;
}

.el-row{
transform: translateX(33.3%);
}
/deep/.el-dialog__body{
  text-align: center;
}
#qrcode{
  margin-bottom: 18px;
}

.phoneBtn{
  width: 120px;
  height: 36px;
  background-color: #1890ff;
  color: white;
  border-radius: 5px;
  outline: none;
  border: 1px solid #1890ff;
margin-left: 20px;
}
.bindein{
  width: 250px;
  height: 36px;
  border: 1px solid #C4C4C4;
  background-color: white;
  border-radius: 5px;
  outline: none;
  text-indent: 5px;
  margin-bottom: 10px;
}
.binde{
   width: 73%;
}
.el-dialog{
  height: 190px;
}

</style>
