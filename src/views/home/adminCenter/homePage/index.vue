<template>
  <!-- <div class="toRow"> -->
  <!-- <el-col :span="3"><Aside /></el-col> -->
  <!-- <el-col :span="21"> -->

  <el-card class="box-car">
    <div class="rightContent">
      <strong>{{applicationType}}认证</strong>
      <span>该类型需要先通过夸克认证，否则无法发布</span>
      <el-button v-if="authenticationStatus === '0'" type="primary" @click="handleClick">前往认证</el-button>
      <el-button v-else-if="authenticationStatus === '1'" type="primary" disabled @click="handleClick">认证中</el-button>
      <el-button v-else-if="authenticationStatus === '2'" type="primary" @click="handleClick">认证失败</el-button>
      <el-button v-else-if="authenticationStatus === '3'" type="primary" disabled @click="handleClick">已认证</el-button>

    </div>
  </el-card>
  <!-- </el-col> -->
  <!-- </div> -->
</template>
<script>
import {getActiveProgramId,getActiveProgramType} from '@/utils/auth'
// import Aside from '@/layout/components/asideMenu/index.vue'
// import { mapGetters } from 'vuex'
import { basicInformation } from '@/api/adminCenter'
export default {
  name: 'HomePage',
  components: {
    // Aside
  },
  data() {
    return {
      applicationType: '',
      authenticationStatus: ''
    }
  },
  created() {
    this.applicationType = getActiveProgramType()
    if(this.applicationType === '0') {
      this.applicationType = '小程序'
    } else {
       this.applicationType = '氢应用'
    }
    this.getInfo()
  },

  methods: {
    async getInfo() {
      const id = getActiveProgramId()
      const data = await basicInformation({ id: id})
      this.authenticationStatus = data.authentication.authenticationStatus
    },
    handleClick() {
      const query = this.$route.query.id
      this.$router.push({ path: '/home/adminCenter/certification/index', query: { id: query }})
    }
  }

}
</script>
<style scoped>
.toRow{
   display: flex;
  flex-direction: row;
}
.box-car{
  padding: 40px;
    margin-top: 40px;
    height: 500px;
}
.rightContent{
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
}
</style>
