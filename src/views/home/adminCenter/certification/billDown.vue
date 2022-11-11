<template>
  <CertificationModel :active="actived">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rule" label-width="130px" class="ruleForm">
      <el-card class="box-card">
        <div class="content">
          <div class="textWord">
            <p>发票审核完成后不可修改，若因填写错误导致开具，寄送问题，将无法重开。</p>
            <p>因三证合一等问题导致的税务变更，请先和公司财务确认清楚，税号确认错误将无法重开。</p>
            <p>电子发票和增值税专票抬头均为认证申请机构名称。</p>
          </div>
          <el-form-item label="发票类型" prop="billType">
            <el-col :span="9">
              <el-select v-model="ruleForm.billType" placeholder="请选择发票类型">
                <el-option label="电子发票" value="0" />
                <el-option label="纸质发票" value="1" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="发票抬头" prop="taitou">
            <el-col :span="9"><el-input v-model="ruleForm.taitou" /></el-col>
          </el-form-item>
          <el-form-item label="发票备注" prop="remark">
            <el-col :span="9"><el-input v-model="ruleForm.remark" /></el-col>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
          <span>税务信息</span>
        </div> -->
        <p class="header">税务信息</p>
        <div class="content">
          <el-form-item label="税务登记副本/一般纳税人资格证">
            <el-upload
              ref="upload"
              action=""
              :headers="{'x-cos-storage-class':'STANDARD_IA'}"

              list-type="picture-card"

              :auto-upload="true"

              multiple
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                >
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!show"
                    class="el-upload-list__item-delete"
                  >
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="纳税识别号" prop="number">
            <el-col :span="9"><el-input v-model="ruleForm.number" /></el-col>
          </el-form-item>
        </div>
      </el-card>
      <el-card class="box-card">
        <!-- <div slot="header" class="clearfix">
          <span>发票邮寄地址</span>
        </div> -->
        <p class="header">发票邮寄地址</p>
        <div class="content">
          <el-form-item label="联系人姓名" prop="name">
            <el-col :span="9"><el-input v-model="ruleForm.name" /></el-col>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-col :span="9"><el-input v-model="ruleForm.phone" /></el-col>
          </el-form-item>
        </div>
        <el-button type="primary" class="nextBtn" @click="handleClick">下一步</el-button>
      </el-card>

    </el-form>
  </CertificationModel>
</template>
<script>
import CertificationModel from '@/components/certificationModel/index.vue'
// import { mapGetters } from 'vuex'
export default {
  name: 'BillDown',
  components: {
    CertificationModel
  },
  data() {
    return {
      actived: 1,
      ruleForm: {
        billType: '',
        taitou: '',
        remark: '',
        fuben: '',
        number: '',
        name: '',
        phone: ''
      },
      rule: {
        billType: [
          { required: true, message: '请选择发票类型', trigger: 'blur' }
        ],
        taitou: [
          { required: true, message: '请填写发票抬头', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请填写纳税识别号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写联系人电话号码', trigger: 'blur' }
        ]
      }

    }
  },

  mounted() {

  },

  methods: {
    handleClick() {
      this.actived++
      this.$router.push('/home/adminCenter/certification/payMoney')
    }
  }
}
</script>
<style scoped>
/* .ruleForm{
    margin-top: 5px;
} */
.header{
  margin-left: 20px;
}
.textWord{
  margin-bottom: 40px;
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
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

</style>
