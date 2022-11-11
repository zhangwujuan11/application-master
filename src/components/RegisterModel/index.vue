<template>
  <div class="main">
    <span class="names">{{ title }}</span>
    <!-- <span class="names">注册</span> -->
    <el-card class="box-card">
      <div class="clearfix">
        <!-- <el-steps class="stepStyle" :active="active" finish-status="success" :space="200" align-center>
          <el-step title="账号信息" />
          <el-step title="邮箱激活" />
          <el-step title="信息登记" />
        </el-steps> -->
        <!-- <el-steps class="stepStyle" :active="actived" finish-status="success" :space="200" align-center>
          <el-step title="账号信息" icon="el-icon-user" />
          <el-step title="邮箱激活" icon="el-icon-message" />
          <el-step title="信息登记" icon="el-icon-edit-outline" />
        </el-steps> -->
      </div>
      <div class="text">
        <!-- 这里面放子组件 -->
        <slot />
        <!-- <RegisterEmailinfo /> -->
        <!-- <RegisterEmailinfo /> -->
        <!-- <RegisterMesDown /> -->
        <!-- <RegisterEmailinfo v-if="this.$refs.registerEmailinfo.activeStep === 0" ref="registerEmailinfo" /> -->
        <!-- <RegisterEmailAct v-else-if="this.$refs.registerEmailAct.activeStep" ref="registerEmailAct" /> -->
        <!-- <RegisterMesDown v-else-if="actived === 2" ref="registerMesDown" /> -->
      </div>
    </el-card>
  </div>
</template>
<script>
// import RegisterEmailinfo from '@/views/register/index.vue'
// import RegisterEmailAct from '@/views/register/registerEmailAct.vue'
// import RegisterMesDown from '@/views/register/registerMesDown.vue'
// import step1 from '@/assets/img/programRegister/step1.png'
export default {
  name: 'RegisterModel',
  components: {
    // RegisterEmailinfo,
    // RegisterEmailAct,
    // RegisterMesDown
  },
  props: [
    'personform',
    // 'title',
    'actived' // 通过父组件传过来的值，来切换步骤条，父组件是@/view/register/registerStore/miniProgramRegister下面的
  ],
  data() {
    return {
      title: '注册'
      // step1: step1
    }
  },
  mounted() {
    // this.getChildStep()
  },
  methods: {
    // getChildStep(data) {
    //   this.actived = data
    // }
  }
}
</script>
<style scoped>

.main{
    /* background-color: darkgray; */
    width: 100%;
    /* height: 750px; */
    /* margin-left:15% ; */
    margin-top: 50px;
    /* margin-bottom: 50px; */
}
.names{
    display: block;
    height: 50px;
    padding-top: 10px;
    /* margin-bottom: 30px; */
    font-size: 23px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #263965;
    text-align: center;
}
.box-card {
    /* width: 100%; */
    /* height: 700px; */
    /* background-color: darkgoldenrod; */

  }
  .clearfix{
   display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    box-sizing: border-box;
    border: 1px solid #E5E1E1;
 }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.stepStyle{
    width: 680px;
    height: 56px;
    /* background-color: rgb(123, 113, 180); */
    display: flex;
    justify-content: center;
    align-items: center;
}
.text{
   /* background-color: burlywood; */
   /* display: flex;
   align-items: center;
   justify-content: center; */
   /* overflow: scroll; */
 }
</style>
