<template>
  <CertificationModel :active="actived">
    <el-form ref="AddExamineApplication" :model="AddExamineApplication" :rules="rule" label-width="130px">
      <el-card class="box-card">
        <div class="topCard">
          <el-form-item label="机构类型" prop="mechanismType">
            <el-col :span="9">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="申请公函地址" prop="officialLetter">
            <el-col :span="9"><el-input v-model="AddExamineApplication.officialLetter" /></el-col>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card">
        <p class="header">企业资质认证</p>
        <div class="content">
          <el-form-item label="企业全称" prop="enterpriseFullName">
            <el-col :span="9"><el-input v-model="AddExamineApplication.qualificationInformation.enterpriseFullName" /></el-col>
          </el-form-item>
          <el-form-item label="工商营业执照" prop="businessLicense">
            <el-col :span="9"><el-input v-model="AddExamineApplication.qualificationInformation.businessLicense" /></el-col>
          </el-form-item>
          <el-form-item label="其他材料">
            <el-col :span="9"><el-input v-model="AddExamineApplication.qualificationInformation.otherLicense" /></el-col>
          </el-form-item>
          <!-- <el-form-item label="其他材料证明" prop="elseCertification">
            <el-col :span="9"> <el-input v-model="ruleForm.elseCertification" /></el-col>
          </el-form-item> -->
        </div>
      </el-card>
      <el-card class="box-card">
        <p class="header">对公账户信息</p>
        <div class="content">
          <el-form-item label="开户名称" prop="accountName">
            <el-col :span="9"><el-input v-model="AddExamineApplication.corporateAccountInformation.accountName" placeholder="安利公司" /></el-col>
          </el-form-item>
          <el-form-item label="开户银行" prop="accountBank">
            <el-col :span="9"><el-input v-model="AddExamineApplication.corporateAccountInformation.accountBank" /></el-col>
          </el-form-item>
          <el-form-item label="银行卡号" prop="accountNumber">
            <el-col :span="9"> <el-input v-model="AddExamineApplication.corporateAccountInformation.accountNumber" /></el-col>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card">
        <p class="header">认证联系人信息</p>
        <div class="content">
          <el-form-item label="姓名" prop="contactName">
            <el-col :span="9"><el-input v-model="AddExamineApplication.certifiedContactInformation.contactName" /></el-col>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-col :span="9"><el-input v-model="AddExamineApplication.certifiedContactInformation.contactPhone" /></el-col>
          </el-form-item>
          <el-form-item label="座机/备用电话" prop="contactLandline">
            <el-col :span="9"><el-input v-model="AddExamineApplication.certifiedContactInformation.contactLandline" /></el-col>
          </el-form-item>
          <!-- <el-form-item label="短信验证码" prop="">
            <el-col :span="9"><el-input /></el-col>
          </el-form-item> -->
          <el-form-item label="电子邮箱" prop="contactEmail">
            <el-col :span="9"> <el-input v-model="AddExamineApplication.certifiedContactInformation.contactEmail" /></el-col>
          </el-form-item>
          <el-form-item label="身份证号码" prop="contactID">
            <el-col :span="9"><el-input v-model="AddExamineApplication.certifiedContactInformation.contactID" /></el-col>
          </el-form-item>
          <el-form-item label="联系人验证" />
        </div>
        <el-button type="primary" class="nextBtn" @click="handleClick">下一步</el-button>
      </el-card>

    </el-form>
  </CertificationModel>
</template>
<script>
import { getActiveProgramId } from '@/utils/auth'
// import { mapGetters } from 'vuex'
import { getAccount } from '@/utils/auth'
import CertificationModel from '@/components/certificationModel/index.vue'
export default {
  name: 'Certification',
  components: {
    CertificationModel
  },
  data() {
    var validateOfficialLetter = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写申请公函地址'))
      }
      callback()
    }
    var validateEnterpriseFullName = (rule, value, callback) => {
      if (this.AddExamineApplication.qualificationInformation.enterpriseFullName === '') {
        callback(new Error('请填写企业全称'))
      }
      callback()
    }
    var validateBusinessLicense = (rule, value, callback) => {
      if (this.AddExamineApplication.qualificationInformation.businessLicense === '') {
        callback(new Error('请选填写工商营业执照'))
      }
      callback()
    }
    // 其他材料
    // var validateOtherLicense = (rule, value, callback) => {
    //   if (this.AddExamineApplication.qualificationInformation.otherLicense === '') {

    //   }
    //   callback()
    // }
    var validateAccountName = (rule, value, callback) => {
      if (this.AddExamineApplication.corporateAccountInformation.accountName === '') {
        callback(new Error('请填写开户名称'))
      }
      callback()
    }
    var validateAccountBank = (rule, value, callback) => {
      if (this.AddExamineApplication.corporateAccountInformation.accountBank === '') {
        callback(new Error('请填写开户银行'))
      }
      callback()
    }
    var validateAccountNumber = (rule, value, callback) => {
      if (this.AddExamineApplication.corporateAccountInformation.accountNumber === '') {
        callback(new Error('请填写银行卡号'))
      }
      callback()
    }
    var validateContactName = (rule, value, callback) => {
      if (this.AddExamineApplication.certifiedContactInformation.contactName === '') {
        callback(new Error('请填写姓名'))
      }
      callback()
    }
    var validateContactPhone = (rule, value, callback) => {
      if (this.AddExamineApplication.certifiedContactInformation.contactPhone === '') {
        callback(new Error('请填写电话'))
      }
      callback()
    }
    var validateContactLandline = (rule, value, callback) => {
      if (this.AddExamineApplication.certifiedContactInformation.contactLandline === '') {
        callback(new Error('请填写备用电话'))
      }
      callback()
    }
    var validateContactEmail = (rule, value, callback) => {
      if (this.AddExamineApplication.certifiedContactInformation.contactEmail === '') {
        callback(new Error('请填写电子邮箱'))
      }
      callback()
    }
    var validateContactID = (rule, value, callback) => {
      if (this.AddExamineApplication.certifiedContactInformation.contactID === '') {
        callback(new Error('请填写身份证号码'))
      }
      callback()
    }
    return {
      options: [{
        value: '0',
        label: '企业法人'
      }],
      value: '',
      actived: 0,
      AddExamineApplication: {
        id: '', // 当前选中应用程序的id
        account: '', // 登录就保存在cookie的云商账号
        mechanismType: ['0', '0'], // 机构类型
        officialLetter: '', // 申请公函地址
        qualificationInformation: { // 企业资质信息
          enterpriseFullName: '',
          businessLicense: '',
          otherLicense: undefined
        },
        corporateAccountInformation: { // 对公账号信息
          accountName: '',
          accountBank: '',
          accountNumber: ''
        },
        certifiedContactInformation: { // 认证联系人信息
          contactName: '',
          contactPhone: '',
          contactLandline: '',
          contactEmail: '',
          contactID: ''
        }
      },
      rule: {
        mechanismType: [
          { required: true, message: '请填写机构类型', trigger: 'blur' }
        ],
        enterpriseFullName: [
          { required: true, validator: validateEnterpriseFullName, trigger: 'blur' }
        ],
        businessLicense: [
          { required: true, validator: validateBusinessLicense, trigger: 'blur' }
        ],
        // otherLicense: [
        //   { required: true, validator: validateOtherLicense, trigger: 'blur' }
        // ],
        officialLetter: [
          { required: true, validator: validateOfficialLetter, trigger: 'blur' }
        ],
        accountName: [
          { required: true, validator: validateAccountName, trigger: 'blur' }
        ],
        accountBank: [
          { required: true, validator: validateAccountBank, trigger: 'blur' }
        ],
        accountNumber: [
          { required: true, validator: validateAccountNumber, trigger: 'blur' }
        ],
        contactName: [
          { required: true, validator: validateContactName, trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, validator: validateContactPhone, trigger: 'blur' }
        ],
        contactLandline: [
          { required: true, validator: validateContactLandline, trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, validator: validateContactEmail, trigger: 'blur' }
        ],
        contactID: [
          { required: true, validator: validateContactID, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'activeProgramID'
    // ])
  },
  mounted() {
    this.AddExamineApplication.id = getActiveProgramId()
    // this.AddExamineApplication.id = this.activeProgramID
    // this.AddExamineApplication.id = this.$route.query.id
    this.AddExamineApplication.account = getAccount()
  },
  methods: {
    handleClick() {
      this.$refs.AddExamineApplication.validate((valid) => {
        if (valid) {
          this.$store.commit('certification/SET_CERTIFICATION', this.AddExamineApplication)
          this.actived++
          this.$router.push('/home/adminCenter/certification/billDown')
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    }
  }

}
</script>
<style scoped>

.topCard{
  padding: 40px;
}
.box-card{
  margin-top: 5px;
}
.content{
    padding: 40px;
}
.nextBtn{
    margin-left: 250px;
    margin-bottom: 80px;
}
.header{
  margin-left: 20px;
}
</style>
