<template>
  <RegisterModel :actived="activeStep" :title="titles">
    <el-form ref="mesForm" class="whole" :model="mesForm" status-icon :rules="rule" label-width="120px">
      <el-card class="box-card">
        <div slot="header">
          <span>企业信息</span>
        </div>
        <div class="mainBox">
          <el-form-item label="企业名称" prop="enterpriseName">
            <el-input v-model="mesForm.enterpriseInformation.enterpriseName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="企业简介" prop="enterpriseIntroduction">
            <el-input v-model="mesForm.enterpriseInformation.enterpriseIntroduction" type="textarea" rows="5" maxlength="150" show-word-limit class="textArea" />
          </el-form-item>
          <el-form-item label="主体信息" prop="subjectInformation">
            <el-input v-model="mesForm.enterpriseInformation.subjectInformation" />
          </el-form-item>
          <el-form-item label="服务行业" prop="serviceTrade">
            <el-col :span="8">
              <!-- <el-select v-model="mesForm.service" placeholder="请选择"> -->
              <!-- <el-option label="区域一" value="shanghai" /> -->
              <el-select v-model="mesForm.enterpriseInformation.serviceTrade" placeholder="请选择">
                <el-option v-for="item in serviceTradeList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="企业注册地" prop="registrationPlace">
            <el-col :span="8">
              <!-- <el-select v-model="mesForm.origin" placeholder="请选择"> -->
              <!-- <el-option label="区域一" value="shanghai" /> -->
              <el-select v-model="mesForm.enterpriseInformation.registrationPlace" placeholder="请选择">
                <el-option v-for="items in countryList" :key="items.value" :label="items.name" :value="items.value" />
              </el-select>
            </el-col>
          </el-form-item>

         
          <el-form-item label="所在地区" prop="enterpriseLocation">
            <el-col :span="8">
              <el-select v-model="mesForm.enterpriseInformation.enterpriseLocation.country" placeholder="请选择">
                <el-option v-for="it in countryList" :key="it.value" :label="it.name" :value="it.value" />
              </el-select>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-select v-model="mesForm.enterpriseInformation.enterpriseLocation.province" placeholder="请选择">
                <el-option label="上海市" value="10185" />
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="官方网站" prop="officialWebsite">
            <el-input v-model="mesForm.enterpriseInformation.officialWebsite" />
          </el-form-item>
          <el-form-item v-model="mesForm.enterpriseInformation.enterpriseAvatar" label="企业头像" prop="enterpriseAvatar">
            <Upload @getKey="getKey" />
          </el-form-item>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header">
          <span>注册人信息</span>
        </div>
        <div class="mainBox">
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="mesForm.registerInformation.realName" />
          </el-form-item>

          <el-form-item label="手机号码" prop="phone">
            <el-col :span="9">
              <!-- <el-select v-model="mesForm.phone.country2" placeholder="请选择"> -->
              <!-- <el-option label="中国大陆" value="中国大陆" /> -->
              <el-select v-model="mesForm.registerInformation.phone.areaCode" placeholder="请选择">
                <el-option v-for="item in countryAreaCodeList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-input v-model="mesForm.registerInformation.phone.phoneNumber" />
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button :disabled="disabled" @click="getCode">{{ getCodeText }}</el-button>
            </el-col>
            <br>
            <span class="grayWord">请填写常用手机号码</span>
          </el-form-item>

          <el-form-item label="短信验证码">
            <el-input />
          </el-form-item>
          <el-form-item label="联系地址" prop="contactAddress">
            <el-col :span="8">
              <el-select v-model="mesForm.registerInformation.contactAddress.country" placeholder="请选择">
                <el-option v-for="item in countryList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-select v-model="mesForm.registerInformation.contactAddress.province" placeholder="请选择">
                <el-option label="上海市" value="10185" />
              </el-select>
            </el-col>
            <br><br>
            <el-input v-model="mesForm.registerInformation.contactAddress.address" type="textarea" class="textArea" rows="3" placeholder="详细地址" />
            <br>
            <span class="grayWord">请填写常用地址</span>
          </el-form-item>
          <el-form-item label="身份证件类型" prop="IDType">
            <el-col :span="8">
            
              <el-select v-model="mesForm.registerInformation.IDType" placeholder="请选择">
                <el-option v-for="item in idTypeList" :key="item.value" :label="item.name" :value="item.value" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="证件号码" prop="IDNumber">
            <el-input v-model="mesForm.registerInformation.IDNumber" />
          </el-form-item>
          <!-- 扫码确认 -->
         <el-form-item label="管理员身份验证" prop="creator">
           <div class="check-box">
             <div class="position:relative;">
              <div class="tips">
               <!-- 扫码成功之后出现绿色图标 -->
              <div v-if="showSuccess" style="margin-left:7px;">
                <img :src="loginSuccess" alt="">
              </div>
              <!-- 扫码过期的文字展示 -->
              <div v-if="expried">
                <div><span>二维码已过期</span></div>
                <div class="refresh" @click="refreshQrcode"><span>点击刷新</span></div>
              </div>
            </div>
             <div  :class="['code',{'opacity': showSuccess || expried}]">
               <vue-qr v-if="qrcheck_ticket" :text="url" :size="140"/>
             </div>
             </div>
             <div style="margin-left:10px;">
               <span>填写完信息后,请用管理员本人夸克云商扫描二维码。本验证方式不扣除任何费用。注册后，扫码的云商号将成为该账号的管理员云商号。</span>
             </div>
           </div>
          </el-form-item>
          <!-- 原本是手动添加的云商账号 -->
          <!-- <el-form-item label="云商账号" prop="creator">
            <el-input v-model="mesForm.creator" />
          </el-form-item> -->
        </div>
      </el-card>
      <!-- 点击提交之后出现的弹窗 -->
      <el-dialog
        title="提示"
        :visible.sync="submitDialogVisible"
        width="30%"
      >
        <span>信息填写完成，是否确认提交？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="isSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <el-button type="success" class="button" @click="submit">提交</el-button>
    </el-form>

  </RegisterModel>
</template>
<script>
// 导入二维码插件
import VueQr from 'vue-qr'
import { getKey, getCache } from '@/api/login'
import { getFieldList, postRegisterMessage } from '@/api/fieldList'
import Upload from '@/components/Upload/uploadImg.vue'
import RegisterModel from '@/components/RegisterModel/index.vue'
import loginSuccess from '@/assets/img/login/loginSuccess.png'
// 定时器
var timer = null
export default {
  name: 'RegisterMesDown',
  components: {
    RegisterModel,
    Upload,
     VueQr
  },
  data() {
    var validateEnterpriseName = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.enterpriseName === '') {
        callback(new Error('请填写企业姓名'))
      }
      callback()
    }
    var validateEnterpriseIntroduction = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.enterpriseIntroduction === '') {
        callback(new Error('请填写企业简介'))
      }
      callback()
    }
    var validateSubjectInformation = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.subjectInformation === '') {
        callback(new Error('请填写主体信息'))
      }
      callback()
    }
    var validateServiceTrade = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.serviceTrade === '') {
        callback(new Error('请选择服务类型'))
      }
      callback()
    }
    var validateRegistrationPlace = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.registrationPlace === '') {
        callback(new Error('请选择企业注册地'))
      }
      callback()
    }
    var validateEnterpriseLocation = (rule, value, callback) => {
      if (value || this.mesForm.enterpriseInformation.enterpriseLocation.province) {
        callback()
      } else {
        callback(new Error('请选择地区！'))
      }
    }
    var validateOfficialWebsite = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.officialWebsite === '') {
        callback(new Error('请填写官方网站！'))
      }
      callback()
    }
    var validateRealName = (rule, value, callback) => {
      if (this.mesForm.registerInformation.realName === '') {
        callback(new Error('请填写你的真实姓名'))
      }
      callback()
    }
  
    var validateIDType = (rule, value, callback) => {
      if (this.mesForm.registerInformation.IDType === '') {
        callback(new Error('请选择身份证类型'))
      }
      callback()
    }
    var validateEnterpriseAvatar = (rule, value, callback) => {
      if (this.mesForm.enterpriseInformation.enterpriseAvatar === '') {
        callback(new Error('请上传企业头像'))
      }
      callback()
    }
    var validateCountry2 = (rule, value, callback) => {
      const phone = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (value || (phone.test(this.mesForm.registerInformation.phone.phoneNumber))) {
        callback()
      } else {
        callback(new Error('请填写完整的手机号码！'))
      }
    }
    var validateContactAddress = (rule, value, callback) => {
      if (this.mesForm.registerInformation.contactAddress.country ||
      this.mesForm.registerInformation.contactAddress.address || this.mesForm.registerInformation.contactAddress.province) {
        callback()
      } else {
        callback(new Error('请填写完整的地址！'))
      }
    }
    var validatePhoneNum = (rule, value, callback) => {
      const phone = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (!(phone.test(value))) {
        callback(new Error('请填写正确的手机号码'))
      }
      callback()
    }
    var validateIDNumber = async(rule, value, callback) => {
      const reg = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/
      if (!reg.test(this.mesForm.registerInformation.IDNumber)) {
        callback(new Error('请填写正确的身份证号码'))
      }
        const data = await getKey({ qrType: 'qrcheck/app_admin' })
        this.qrcheck_ticket = data.key
       this.$nextTick(() => {
        this.getCacheloopHandle()
      })
      callback()
      
     
    }
    var validateCreator = (rule, value, callback) => {
      if (this.mesForm.creator === '') {
        callback(new Error('请填写云商账号'))
      }
      callback()
    }
    return {
      loginSuccess: loginSuccess, // 扫码成功出现的绿色图标资源
      showSuccess: false, // 扫码成功
      expried: false, // 二维码过期
      qrcheck_ticket: '', // 扫码需要的key
      provinceList: [], // 各省份列表
      countryAreaCodeList: [], // 手机号码的城市select
      countryList: [], // 城市select
      serviceTradeList: [], // 服务行业select
      idTypeList: [], // 身份证类型select
      submitDialogVisible: false,
      disabled: false,
      getCodeText: '获取验证码',
      titles: '注册',
      activeStep: 2,
      // 企业信息
      EnterpriseLocationDTO: {
        country: '',
        province: ''
      },
      EnterpriseInformationDTO: {
        enterpriseName: '',
        enterpriseIntroduction: '',
        subjectInformation: '',
        serviceTrade: '',
        registrationPlace: '',
        enterpriseLocation: this.EnterpriseLocationDTO,
        officialWebsite: '',
        enterpriseAvatar: ''
      },
      // 个人信息
      PhoneDTO: {
        areaCode: '',
        phoneNumber: ''
      },
      ContactAddressDTO: {
        country: '',
        province: '',
        address: ''
      },
      personMes: {
        realName: '',
        phone: this.PhoneDTO,
        contactAddress: this.ContactAddressDTO,
        IDType: '',
        IDNumber: ''
      },
      // 创建个人开发者
      CreateUserDTO: {
        email: '',
        password: '',
        enterpriseInformation: this.EnterpriseInformationDTO,
        registerInformation: this.RegisterInformationDTO
      },
      mesForm: {
        email: '',
        password: '',
        enterpriseInformation: {
          enterpriseName: '',
          enterpriseIntroduction: '',
          subjectInformation: '',
          serviceTrade: '',
          registrationPlace: '',
          enterpriseLocation: { //  所在地区
            country: '',
            province: ''
          },
          officialWebsite: '',
          enterpriseAvatar: ''
        },
        registerInformation: {
          realName: '',
          phone: { // 手机号码
            areaCode: '',
            phoneNumber: ''
          },
          // vcode: '',
          contactAddress: { // 联系地址
            country: '',
            province: '',
            address: ''
          },
          IDType: '',
          IDNumber: ''
        },

        creator: ''
      },
      rule: {
        enterpriseName: [
          { required: true, validator: validateEnterpriseName, trigger: 'blur' }
        ],
        enterpriseIntroduction: [
          { required: true, validator: validateEnterpriseIntroduction, trigger: 'blur' }
        ],
        subjectInformation: [
          { required: true, validator: validateSubjectInformation, trigger: 'blur' }
        ],
        serviceTrade: [
          { required: true, validator: validateServiceTrade, trigger: 'change' }
        ],
        registrationPlace: [
          { required: true, validator: validateRegistrationPlace, trigger: 'change' }
        ],
        enterpriseLocation: [
          { required: true, validator: validateEnterpriseLocation, trigger: 'change' }
        ],
        phone: [
          { required: true, validator: validateCountry2, trigger: 'blur' }
        ],
        contactAddress: [
          { required: true, validator: validateContactAddress, trigger: 'blur' }
        ],
        officialWebsite: [
          { required: true, validator: validateOfficialWebsite, trigger: 'blur' }
        ],
        enterpriseAvatar: [
          { required: true, validator: validateEnterpriseAvatar, trigger: 'change' }
        ],
        realName: [
          { required: true, validator: validateRealName, trigger: 'blur' }
        ],
        phoneNum: [
          { validator: validatePhoneNum, trigger: 'blur' }
        ],
        // vcode: [
        //   { required: true, message: '请填写短信验证码', trigger: 'change' }
        // ],
        // detailAdress: [
        //   { required: true, validator: validateDetailAdress, trigger: 'blur' }
        // ],
        IDType: [
          { required: true, validator: validateIDType, trigger: 'change' }
        ],
        IDNumber: [
          { required: true, validator: validateIDNumber, trigger: 'blur' }
        ],
        creator: [
          { required: true, validator: validateCreator, trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    url() {
      return `http://10.10.10.138:8080/#/pages/index/check-successing?qrcheck_ticket=${this.qrcheck_ticket}`
      // return `${process.env.VUE_APP_CODEBAR_API}#/pages/index/index?qrcheck_ticket=${this.qrcheck_ticket}`
    }
  },
  mounted() {
    this.getSession()
    this.getFileData()
    // this.email = window.sessionStorage.getItem('email')
  },
  methods: {
    // 刷新二维码
     async refreshQrcode() {
        console.log('已过期')
      clearInterval(timer)
      this.showSuccess = false
      this.expried = false
      // 重新生成二维码
      // 关注下
      const data = await getKey({ qrType: 'qrcheck/app_admin' })
      this.qrcheck_ticket = data.key
      // ui 更新后
      this.$nextTick(() => {
        this.getCacheloopHandle()
      })
    },
    // 扫码的函数
    async getCacheloopHandle() {
      clearInterval(timer)
      timer = setInterval(async() => {
        const data = await getCache({ key: this.qrcheck_ticket })
        const { base_resp, status } = data
        if (status == '-1') {
          // 二维码已过期
          this.showSuccess = false
          this.expried = true
          clearInterval(timer)
        }
        if (status == '0') {
          // 等待扫码
        }
        if (status == '1') {
          // 扫码成功
          this.showSuccess = true
         
        }
      }, 1000)
    },
    // 图片上传的getKey
    getKey(data) {
      this.mesForm.enterpriseInformation.enterpriseAvatar = data
    },
    getSession() {
      this.mesForm.email = window.sessionStorage.getItem('email')
      this.mesForm.password = window.sessionStorage.getItem('password')
      if (!this.mesForm.email) {
        window.sessionStorage.removeItem('email')
        window.sessionStorage.removeItem('password')
      }
    },
    async getFileData() {
      const data = await getFieldList()
      const { IDTypeList, countryList, countryAreaCodeList, serviceTradeList } = data
      this.idTypeList = IDTypeList
      this.countryList = countryList
      this.countryAreaCodeList = countryAreaCodeList
      this.serviceTradeList = serviceTradeList
      
    },

    getCode() {
      this.$refs.mesForm.validateField('country2', (errMsg) => {
        if (errMsg) {
          console.log('手机号校验未通过')
        } else {
          this.tackBtn()
          alert('已发送验证码')
        }
      })
    },
    // 验证码倒数60秒函数
    tackBtn() {
      let time = 60
      const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.getCodeText = '获取验证码'
          this.disabled = false
        } else {
          this.disabled = true
          this.getCodeText = time + '秒后重试'
          time--
        }
      }, 1000)
    },
    submit() {
      console.log(this.mesForm.enterpriseInformation.enterpriseAvatar)

      this.$refs.mesForm.validate((valid) => {
        if (valid) {
          this.submitDialogVisible = true
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    async isSubmit() {
      await postRegisterMessage(this.mesForm)
      this.submitDialogVisible = false
      this.$message.success('注册成功')
      setTimeout(() => {
        this.$router.replace('/login')
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{
  text-align: center;
  position: absolute;
  top: 56px;
   z-index: 99;
  left: 60px;
   img{
     width: 65px;
     height: 65px;
   }
}
.refresh{
  color: blue;
}
.opacity{
  // opacity: 0.1;
}
.code{
  justify-content: center;
  display: flex;
  align-content: center;
}
.mainBox{
 padding-top: 20px;
 width: 600px;
}
.el-card{
margin-bottom: 20px;
padding: 40px;
}
.button{
  width: 80px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
}
.grayWord{
    font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
}
.check-box{
  background: #F7F7F7;
  overflow: hidden;
  padding: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
