<template>
  <CertificationModel :active="actived">
    <div class="whole">
      <p>微信支付</p>
      <!-- <h2>300元</h2> -->
      <img :src="imgg" alt="tt"><br>
      <el-button type="primary" @click="submit">完成验证</el-button>
    </div>
  </CertificationModel>
</template>
<script>
import { putAuthentication } from '@/api/adminCenter'
import { mapGetters } from 'vuex'
import imgg from '@/assets/img/QRcode/tt.png'
import CertificationModel from '@/components/certificationModel/index.vue'
export default {
  name: 'PayMoney',
  components: {
    CertificationModel
  },
  data() {
    return {
      actived: 2,
      imgg: imgg
    }
  },
  computed: {
    ...mapGetters([
      'certificationMes'
    ])
  },
  methods: {
    async submit() {
      await putAuthentication(this.certificationMes)
      // console.log(data)
      this.$message.success('验证成功')
      setTimeout(() => {
        this.$router.replace('/home/adminCenter/homePage/index')
      }, 2000)
    }
  }
}
</script>
<style scoped>
.whole{
    text-align: center;
    margin-top: 60px;
    margin-bottom: 160px;
}
</style>
