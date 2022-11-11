<template>
  <miniRegisterModel ref="childrenModel" :active="activeStep" :title="titles">
    <div class="allbox">
      <div class="itembox">
        <p class="titles">用户信息登记</p>
        <div class="content">
          <div class="firstContent">
            夸克应用平台致力于打造真实、合法、有效的互联网平台。为了更好的保障你和广大用户的合法权益，
            请你认真填写 以下登记信息。为表述方便，本服务中，“用户”也被成为“开发者”或“你”。
          </div>
          <div class="nextContent">
            <p>用户信息登记审核通过后： </p>
            <p>1. 你可以依法享有本应用平台所产生的权利和收益；</p>
            <p>2. 你将对本应用平台的所有行为承担全部责任；</p>
            <p>3. 你的注册信息将在法律允许的范围内向用户展示；</p>
            <p>4.人民法院、检察院、公关机关等有权机关可向腾讯依法调取你的注册信息等。</p>
          </div>
          <div class="thidContent">
            <span>请确认你的微信公众账号主体类型属于政府、媒体、企业、其他组织、个人，并请按照对应的类别进行信息登记。 点击查看</span>
            <span class="blueColor">夸克应用平台信息登记指引</span>
          </div>
          <!-- <div class="fourContent"> -->
        </div>
      </div>
      <el-form ref="companyForm" :model="companyForm" :rules="rule" status-icon label-width="140px">
        <el-form-item label="小程序名称" prop="appName">
          <el-input v-model="companyForm.appName" autocomplete="off" /><br>
        </el-form-item>
        <el-form-item label="应用运行时" prop="appType">
          <el-radio-group v-model="companyForm.appType">
            <el-radio label="0">小程序</el-radio>
            <el-radio label="1">h5</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="注册国家/地区" prop="country">
          <el-select v-model="companyForm.registerInformation.country" placeholder="请选择">
            <el-option
              v-for="item in countryList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="主体类型" prop="subjectType">
          <!-- <label class="labelText">主体类型</label> -->
          <el-radio-group v-model="companyForm.registerInformation.subjectType" @change="handleChange">
            <el-radio-button label="0">个人</el-radio-button>
            <el-radio-button label="1">企业</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- </div> -->
        <!-- 下面是主体类型是个人的时候 -->
        <transition name="el-fade-in-linear">
          <div v-if="showPersonal" class="itembox">

            <p class="titles">管理员信息登记</p>
            <div class="content">
              <!-- <el-form status-icon label-width="130px"> -->
              <el-form-item label="身份证姓名" prop="name">
                <el-input v-model="companyForm.adminInformation.name" autocomplete="off" /><br>
                信息审核成功后身份证姓名不可修改；如果名字包含分隔号“-”，请勿省略。
              </el-form-item>
              <el-form-item label="身份证号码" prop="idNum">
                <el-input v-model="companyForm.adminInformation.idNum" autocomplete="off" /><br>
                请输入您的身份证号码。一个身份证号码只能注册5个小程序。
              </el-form-item>
              <el-form-item label="管理员手机号码" prop="phone">
                <el-input v-model="companyForm.adminInformation.phone" autocomplete="off" /><br>
                <!-- 下面这行是有获取短信验证码按钮的 -->
                <!-- <el-input v-model="ruleForm.phone" autocomplete="off" /><el-button :disabled="disabled" @click="getCode">{{ getCodeText }}</el-button><br> -->
                请输入您的手机号码，一个手机号码只能注册5个小程序。
              </el-form-item>

              <!-- <el-form-item label="短信验证码" prop="checkCode">
                <el-input v-model="ruleForm.checkCode" autocomplete="off" /><span class="blueColor">无法验收验证码？</span><br>
                请输入手机短信收到的6位验证码
              </el-form-item> -->
              <el-form-item label="云商账号" prop="accountNumber">
                <el-input v-model="companyForm.adminInformation.accountNumber" autocomplete="off" />
              </el-form-item>
            <!-- </el-form> -->
            </div>
          </div>
        </transition>
        <!-- 下面是主体类型为企业是所展示的内容 -->
        <transition name="el-fade-in-linear">
          <div v-if="showCompany">
            <div class="itembox">
              <p class="titles">主体信息登记</p>
              <div class="content">
                <!-- <el-form ref="companyForm" :model="companyForm" status-icon :rules="companyRules" label-width="120px"> -->
                <el-form-item label="企业类型" prop="enterpriseType">
                  <el-radio-group v-model="companyForm.subjectInformation.enterpriseType">
                    <el-radio label="0">企业</el-radio>
                    <el-radio label="1">个体工商户</el-radio>.
                  </el-radio-group>
                  <br>
                  个体工商户最多只能注册5个帐号
                </el-form-item>

                <el-form-item label="企业名称" prop="enterpriseName">
                  <el-input v-model="companyForm.subjectInformation.enterpriseName" autocomplete="off" /><br>
                  需与当地政府颁发的商业许可证书或企业注册证上的企业名称完全一致， 信息审核审核成功后，企业名称不可修改。
                </el-form-item>
                <el-form-item label="营业执照注册号" prop="businessLicense">
                  <el-input v-model="companyForm.subjectInformation.businessLicense" /><br>
                  请输入15位营业执照注册号或18位的统一社会信用代码
                </el-form-item>
                <!-- <el-form-item label="地址" prop="registerId">
                  <el-input v-model="companyForm.registerId" /><br>
                  请输入营业执照上的地址
                </el-form-item> -->
                <el-form-item label="注册方式" prop="registerType">
                  <el-radio-group v-model="companyForm.subjectInformation.registerType">
                    <el-radio label="0">向夸克公司小额打款验证 </el-radio>
                    <el-radio label="1"> 夸克验证</el-radio>
                  </el-radio-group>
                  <br>
                  微信注册并认证，需支付300元审核费用。提交认证后会在1-5个 工作日完成审核。在认证完成前小程序部分能力暂不支持。
                </el-form-item>
                <!-- <el-form-item label="营业执照照片" prop="registerId">
                  <Upload />
                </el-form-item> -->

                <!-- </el-form> -->
              </div>
            </div>

            <div class="itembox">
              <p class="titles">管理员信息登记</p>
              <div class="content">
                <!-- <el-form label-width="130px"> -->

                <el-form-item label="管理员身份证姓名" prop="IDName">
                  <el-input v-model="companyForm.companyAdminInformation.IDName" autocomplete="off" /><br>
                  信息审核成功后身份证姓名不可修改；如果名字包含分隔号“-”，请勿省略。
                </el-form-item>
                <el-form-item label="管理员身份证号码" prop="IDNumber">
                  <el-input v-model="companyForm.companyAdminInformation.IDNumber" autocomplete="off" /><br>
                  请输入您的身份证号码。一个身份证号码只能注册5个小程序。
                </el-form-item>
                <el-form-item label="管理员手机号码" prop="adminPhone">
                  <el-input v-model="companyForm.companyAdminInformation.adminPhone" autocomplete="off" /><br>
                  <!-- <el-input v-model="companyForm.adminPhone" autocomplete="off" /><el-button :disabled="companyDisabled" @click="getNum">{{ companyCodeText }}</el-button><br> -->
                  请输入您的手机号码，一个手机号码只能注册5个小程序。
                </el-form-item>
                <!-- <el-form-item label="短信验证码" prop="adminCode">
                  <el-input v-model="companyForm.adminCode" autocomplete="off" /><span class="blueColor">无法验收验证码？</span><br>
                  请输入手机短信收到的6位验证码
                </el-form-item> -->
                <el-form-item label="云商账号" prop="adminAccount">
                  <el-input v-model="companyForm.companyAdminInformation.adminAccount" />
                </el-form-item>
                <!-- </el-form> -->
              </div>
            </div>
          </div>
        </transition>
        <el-button type="success" class="nextBtn" @click="next">提交</el-button>
      </el-form>
      <!-- 当提交的主体类型为个人时出现的弹窗 -->
      <el-dialog
        :visible.sync="personDialogVisible"
        width="30%"
        center
      >
        <div slot="title">
          <img :src="tanhao" alt="gg">
          <p>请确认以下提交的主体信息</p>
          <p>主体名称：{{ companyForm.adminInformation.name }}</p>
          <p>主体类型：个人</p>
        </div>
        <span class="submitExplain">该主体一经提交，将成为你使用夸克应用平台各项服务与功能的唯一法律主体与缔约 主体。
          夸克将在法律允许的范围内向用户展示你的注册信息，你需对填写资料的真实 性、合法性、准确性和有效性承担责任，
          否则夸克有权拒绝或终止提供服务。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="personDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitPerson">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 当提交的主体类型为企业时出现的弹窗 -->
      <el-dialog
        :visible.sync="companyDialogVisible"
        width="30%"
        center
      >
        <div slot="title">
          <img :src="tanhao" alt="gg">
          <p>请确认以下提交的主体信息</p>
          <p>主体名称：{{ companyForm.subjectInformation.companyName }}</p>
          <p>主体类型：企业</p>
        </div>
        <span class="submitExplain">该主体一经提交，将成为你使用夸克应用平台各项服务与功能的唯一法律主体与缔约 主体。
          夸克将在法律允许的范围内向用户展示你的注册信息，你需对填写资料的真实 性、合法性、准确性和有效性承担责任，
          否则夸克有权拒绝或终止提供服务。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="companyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCompany">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 提交成功时的弹窗 -->
      <el-dialog :visible.sync="successDialogVisible" width="30%" center>
        <div slot="title">
          <img :src="success" alt="success">
          <p>信息提交成功</p>
          <p>你可以前往夸克应用平台使用相关功能</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="successDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </miniRegisterModel>
</template>
<script>
import { checkAppName } from '@/api/checkAppName'
import { getFieldList } from '@/api/fieldList'
import { postRegisterMiniProgram } from '@/api/postRegisterMiniProgram'
// import Upload from '@/components/Upload/uploadImg.vue'
import success from '@/assets/img/programRegister/success.png'
import tanhao from '@/assets/img/programRegister/tanhao.png'
// import RegisterModel from '@/components/RegisterModel/index.vue'
import miniRegisterModel from '@/components/miniProgramRegiModel/index.vue'
export default {
  name: 'PersonalData',
  components: {
    miniRegisterModel
    // Upload
  },
  data() {
    // 小程序名称验证
    var validateAppName = async(rule, value, callback) => {
      if (this.companyForm.appName === '') {
        callback(new Error('请填写小程序名称'))
      } else if (this.repeated) {
        await this.checkName()
        callback(new Error('该名称已存在'))
      }

      callback()
    }
    var validateAppType = (rule, value, callback) => {
      if (this.companyForm.appType === '') {
        callback(new Error('请填写应用类型'))
      }
      callback()
    }
    // 注册地验证
    var validateCountry = (rule, value, callback) => {
      if (this.companyForm.registerInformation.country === '') {
        callback(new Error('请输入注册国家/地区'))
      }
      callback()
    }
    // 主体类型验证
    var validateSubjectType = (rule, value, callback) => {
      if (this.companyForm.registerInformation.subjectType === '') {
        callback(new Error('请输入主体类型'))
      }
      callback()
    }
    // 主体类型为个人管理员名字验证
    var validateName = (rule, value, callback) => {
      if (this.companyForm.adminInformation.name === '') {
        callback(new Error('请填写名字'))
      }
      callback()
    }
    // 主体类型为个人管理员身份证号码验证
    var validateIdNum = (rule, value, callback) => {
      if (this.companyForm.adminInformation.idNum === '') {
        callback(new Error('请填写身份证号码'))
      }
      callback()
    }
    // 主体类型为个人管理员手机号码验证
    var validatePhone = (rule, value, callback) => {
      // const phone = /^1[3|4|5|7|8][0-9]\d{8}$/
      // if (!(phone.test(value))) {
      //   callback(new Error('请输入正确的手机号码'))
      // }
      // callback()
      if (this.companyForm.adminInformation.phone === '') {
        callback(new Error('手机号码不能为空'))
      }
      callback()
    }
    // 主体类型为个人管理员云商账号验证
    var validateAccountNumber = (rule, value, callback) => {
      if (this.companyForm.adminInformation.accountNumber === '') {
        callback(new Error('云商账号不能为空'))
      }
      callback()
    }
    // 主体类型为企业管理员名字验证
    var validateIDName = (rule, value, callback) => {
      if (this.companyForm.companyAdminInformation.IDName === '') {
        callback(new Error('姓名不能为空'))
      }
      // } else if ((value.length === 1) || (value.length > 4) || (/[a-z]/.test(value)) || (/A-Z/.test(value)) || (/\d/.test(value)) || (/\s/.test(value))) {
      //   callback(new Error('请输入合法姓名'))
      // }
      callback()
    }
    // 主体类型为企业理员身份证号码验证
    var validateIDNumber = (rule, value, callback) => {
      // const reg = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/
      // if (!value) {
      //   return callback(new Error('证件号码不能为空'))
      // } else if (!reg.test(value)) {
      //   return callback(new Error('证件号码不正确'))
      // } else {
      //   callback()
      // }
      // 下面的先简单点验证先
      if (this.companyForm.companyAdminInformation.IDNumber === '') {
        callback(new Error('证件号码不能为空'))
      }
      callback()
    }
    // 主体类型为企业管理员手机号码验证
    var validateAdminPhone = (rule, value, callback) => {
      // const phone = /^1[3|4|5|7|8][0-9]\d{8}$/
      // if (!(phone.test(value))) {
      //   callback(new Error('请输入正确的手机号码'))
      // }
      // callback()
      if (this.companyForm.companyAdminInformation.adminPhone === '') {
        callback(new Error('手机号码不能为空'))
      }
      callback()
    }
    // 主体类型为企业管理员云商账号验证
    var validateAdminAccount = (rule, value, callback) => {
      if (this.companyForm.companyAdminInformation.adminAccount === '') {
        callback(new Error('云商账号不能为空'))
      }
      callback()
    }
    // 企业类型验证
    var validateEnterpriseType = (rule, value, callback) => {
      if (this.companyForm.subjectInformation.enterpriseType === '') {
        callback(new Error('请填写企业类型'))
      }
      callback()
    }
    // 企业名称验证
    var validateEnterpriseName = (rule, value, callback) => {
      if (this.companyForm.subjectInformation.enterpriseName === '') {
        callback(new Error('请填写企业名称'))
      }
      callback()
    }
    // 企业营业执照验证
    var validateBusinessLicense = (rule, value, callback) => {
      if (this.companyForm.subjectInformation.businessLicense === '') {
        callback(new Error('请填写企业营业执照'))
      }
      callback()
    }
    // 企业的注册类型验证
    var validateRegisterType = (rule, value, callback) => {
      if (this.companyForm.subjectInformation.registerType === '') {
        callback(new Error('请填写注册类型'))
      }
      callback()
    }

    return {
      repeated: null,
      countryList: [], // 注册城市的列表
      titles: '小程序注册',
      miniProgramEmail: '', // 注册小程序的邮箱
      success: success, // 提交成功弹窗的的绿色图片
      tanhao: tanhao, // 点击继续弹窗的叹号图片
      activeStep: 2, // 意思步骤条到信息登记了
      showPersonal: false, // 主体类型为个人之后的内容展示
      showCompany: false, // 主体类型为企业之后的内容展示
      getCodeText: '获取验证码', // 主体类型为个人手机号码右边的按钮内的文字展示
      disabled: false, // 主体类型为个人手机号码右边的按钮是否禁用
      companyDisabled: false, // 主体类型为企业手机号码右边的按钮是否禁用
      personDialogVisible: false,
      companyDialogVisible: false,
      successDialogVisible: false,
      companyCodeText: '获取验证码', // 主体类型为企业手机号码右边的按钮内的文字展示
      // adminInformation: {
      //   IDNumber: '',
      //   adminPhone: '',
      //   IDName: '',
      //   adminAccount: ''
      // },
      appTypeList: [
        { value: '0', name: '小程序' },
        { value: '1', name: '小程序' }
      ],
      companyForm: { // 主体类型为企业的表单
        appName: '',
        appType: '',
        registerInformation: {
          country: '',
          subjectType: ''
        },
        subjectInformation: {
          enterpriseType: '', // 企业类型
          enterpriseName: '', // 企业名称
          businessLicense: '',
          registerType: ''
        },
        adminInformation: {
          idNum: '',
          phone: '',
          name: '',
          accountNumber: ''
        },
        companyAdminInformation: {
          IDNumber: '',
          adminPhone: '',
          IDName: '',
          adminAccount: '' // 原来是adminAccountNumber
        }

      },
      rule: {
        appName: [
          { validator: validateAppName, trigger: 'blur' }
        ],
        appType: [
          { validator: validateAppType, trigger: 'blur' }
        ],
        country: [
          { validator: validateCountry, trigger: 'change' }
        ],
        subjectType: [
          { validator: validateSubjectType, trigger: 'change' }
        ],
        IDName: [
          { validator: validateIDName, trigger: 'change' }
        ],
        name: [
          { validator: validateName, trigger: 'change' }
        ],
        idNum: [
          { validator: validateIdNum, trigger: 'change' }
        ],
        IDNumber: [
          { validator: validateIDNumber, trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'change' }
        ],
        adminPhone: [
          { validator: validateAdminPhone, trigger: 'change' }
        ],
        accountNumber: [
          { validator: validateAccountNumber, trigger: 'change' }
        ],
        adminAccount: [
          { validator: validateAdminAccount, trigger: 'change' }
        ],
        enterpriseType: [
          { validator: validateEnterpriseType, trigger: 'change' }
        ],
        enterpriseName: [
          { validator: validateEnterpriseName, trigger: 'change' }
        ],
        businessLicense: [
          { validator: validateBusinessLicense, trigger: 'change' }
        ],
        registerType: [
          { validator: validateRegisterType, trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getDataList()
    this.getSession()
    // 获取从注册小程序第一步通过session保存的miniProgramEmail
    // this.miniProgramEmail = window.sessionStorage.getItem('miniProgramEmail')
    // window.sessionStorage.removeItem('miniProgramEmail')
  },
  methods: {
    getSession() {
      this.miniProgramEmail = window.sessionStorage.getItem('miniProgramEmail')
      if (this.miniProgramEmail !== '') {
        window.sessionStorage.removeItem('miniProgramEmail')
      }
    },
    async checkName() {
      const data = await checkAppName({ appName: this.companyForm.appName, appType: '0' })
      this.repeated = data.repeat
      // console.log(data.repeat)
      // return data.repeat
    },
    // 获取注册城市的列表
    async getDataList() {
      const data = await getFieldList()
      const { countryList } = data
      this.countryList = countryList
    },
    // 判断主体为个人时的手机号码input是否验证通过的函数
    // getCode() {
    //   this.$refs.ruleForm.validateField('phone', (errMsg) => {
    //     if (errMsg) {
    //       console.log('手机号校验未通过')
    //     } else {
    //       this.tackBtn()
    //       alert('已发送验证码')
    //     }
    //   })
    // },
    // 判断主体为企业时的手机号码input是否验证通过的函数
    // getNum() {
    //   this.$refs.companyForm.validateField('adminPhone', (errMsg) => {
    //     if (errMsg) {
    //       console.log('手机号校验未通过')
    //     } else {
    //       this.tack()
    //       alert('已发送验证码')
    //     }
    //   })
    // },

    // 主体为个人的验证码倒数60秒
    // tackBtn() {
    //   let time = 60
    //   const timer = setInterval(() => {
    //     if (time === 0) {
    //       clearInterval(timer)
    //       this.getCodeText = '获取验证码'
    //       this.disabled = false
    //     } else {
    //       this.disabled = true
    //       this.getCodeText = time + '秒后重试'
    //       time--
    //     }
    //   }, 1000)
    // },
    // 主体为企业的验证码倒数60秒
    // tack() {
    //   let time = 60
    //   const timer = setInterval(() => {
    //     if (time === 0) {
    //       clearInterval(timer)
    //       this.companyCodeText = '获取验证码'
    //       this.companyDisabled = false
    //     } else {
    //       this.companyDisabled = true
    //       this.companyCodeText = time + '秒后重试'
    //       time--
    //     }
    //   }, 1000)
    // },
    next() {
      this.$refs.companyForm.validate((valid) => {
        if (valid) {
          // alert('submit!')
          if (this.companyForm.registerInformation.subjectType === '0') {
            this.personDialogVisible = true
          } else {
            this.companyDialogVisible = true
          }
        } else {
          alert('error submit!!')
          return false
        }
      })
    },

    // 提交主体类型为个人的表单
    async submitPerson() {
      const data = await postRegisterMiniProgram({
        email: this.miniProgramEmail,
        appName: this.companyForm.appName,
        // 在这里先传一个应用类型为0代表是小程序，后面还会加上移动应用开发这些
        appType: this.companyForm.appType,
        registerInformation: this.companyForm.registerInformation,
        adminInformation: {
          IDNumber: this.companyForm.adminInformation.idNum,
          adminPhone: this.companyForm.adminInformation.phone,
          IDName: this.companyForm.adminInformation.name,
          adminAccount: this.companyForm.adminInformation.accountNumber
        },
        creator: '25244' // 创建人的云商账号
      })
      this.personDialogVisible = false
      this.successDialogVisible = true
      this.$message.success('注册成功')
      setTimeout(() => {
        this.$router.replace('/login')
      }, 2000)
    },
    // 提交主体类型为企业的表单
    async submitCompany() {
      const data = await postRegisterMiniProgram({
        email: this.miniProgramEmail,
        appName: this.companyForm.appName,
        // 在这里先传一个应用类型为0代表是小程序，后面还会加上移动应用开发这些
        appType: this.companyForm.appType,
        registerInformation: this.companyForm.registerInformation,
        // 注意这里传的（和类型为个人不一样）
        adminInformation: this.companyForm.companyAdminInformation,
        subjectInformation: this.companyForm.subjectInformation,
        creator: '1224425' // 创建人的云商账号
      })
      console.log(data)
      this.companyDialogVisible = false
      this.successDialogVisible = true
      this.$message.success('注册成功')
      setTimeout(() => {
        this.$router.replace('/login')
      }, 2000)
    },
    // handleShowPersonal() {
    //   this.showCompany = false
    //   this.showPersonal = true
    // },
    // handleShowCompany() {
    //   this.showPersonal = false
    //   this.showCompany = true
    // },
    // 当点击主体类型的选项时展示相应的内容
    handleChange(event) {
    // 0代表类型为个人
      if (event === '0') {
        this.showCompany = false
        this.showPersonal = true
      } else {
        this.showPersonal = false
        this.showCompany = true
      }
    }
  }
}
</script>
<style scoped>
.allbox{
 padding: 63px 50px;
}
.itembox{
  /* background-color: darkolivegreen; */
  margin-top: 30px;
  width: 720px;
  box-sizing: border-box;
}
.titles{
  font-size: 22px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #2A3035;
}
.content{
   width: 713px;
   font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
  /* background-color: cadetblue; */
}
.firstContent{
  line-height: 25px;
}
.thidContent{
  margin-top: 10px;
  margin-bottom: 20px;
  line-height: 25px;
  width: 700px;
font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #2A3035;
}
.fourContent{
  width: 550px;
}
.labelText{
  color: #2A3035;
  margin-right: 40px;
}
.el-input{
  width: 400px;
 margin-right: 10px;
}
.blueColor{
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
text-decoration: underline;
color: #4377F3;
}
.nextBtn{
  margin-left: 300px;
}
.submitExplain{
  font-size: 14px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
}
</style>
