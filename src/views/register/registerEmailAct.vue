<template>
  <!-- <RegisterModel :active="activeStep" :title="titles"> -->
  <RegisterModel :actived="activeStep">
    <div class="mainbox">
      <p>激活小程序账号</p>
      <div class="text">感谢注册！确认邮件已发送至你的注册邮箱：{{emm}}，请进入邮箱 查看邮件，并激活小程序账号。</div>
      <el-button type="success" class="button" @click="next">登录邮箱</el-button>
      <p>没有收到邮件？</p>
      <div><span>1、请检查邮箱地址是否正确，你可以返回</span><span class="blueWord">重新填写</span></div>
      <div><span>2、检查你的邮件垃圾箱</span></div>
      <div><span>3、若仍未收到确认，请尝试</span><span class="blueWord">重新发送</span></div>
    </div>
  </RegisterModel>
</template>
<script>
import RegisterModel from '@/components/RegisterModel/index.vue'

export default {
  name: 'RegisterEmailAct',
  components: {
    RegisterModel
  },
  data() {
    return {
      titles: '注册',
      activeStep: 1,
      emm:'xxxxxxxxxx@qq.com'
    }
  },
  created(){
    this.emm=this.$route.query.sendemil
  },
  methods: {
    next() {
      this.$router.push('registerMesDown')
    }
  }
}
</script>
<style scoped>
.mainbox{
  height: 630px;
  padding-top: 60px;
  padding-left: 115px;
}
.text{
  width: 530px;
  height: 40px;
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #93989D;
}
.button{
  margin-top: 30px;
  margin-bottom: 30px;
}
.blueWord{
  margin-left: 20px;
  font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
text-decoration: underline;
color: #4377F3;
}
</style>
