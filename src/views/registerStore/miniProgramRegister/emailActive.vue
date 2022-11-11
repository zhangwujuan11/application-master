<template>
  <div>
    <miniRegisterModel :active="activeStep" :title="titles">
      <div class="mainbox">
        <p>激活小程序账号</p>
        <div class="text">感谢注册！确认邮件已发送至你的注册邮箱：xxxxxxxxxx@qq.com，请进入邮箱 查看邮件，并激活小程序账号。</div>
        <el-button type="success" class="button" @click="next">登录邮箱</el-button>
        <p>没有收到邮件？</p>
        <div><span>1、请检查邮箱地址是否正确，你可以返回</span><span class="blueWord">重新填写</span></div>
        <div><span>2、检查你的邮件垃圾箱</span></div>
        <div><span>3、若仍未收到确认，请尝试</span><span class="blueWord">重新发送</span></div>
      </div>

    </miniRegisterModel>

  </div>
</template>
<script>
// import RegisterModel from '@/components/RegisterModel/index.vue'
import miniRegisterModel from '@/components/miniProgramRegiModel/index.vue'
export default {
  name: 'EmailActive',
  components: {
    miniRegisterModel
  },
  data() {
    return {
      titles: '小程序注册',
      activeStep: 1
    }
  },
  methods: {
    next() {
      this.activeStep++
      this.$router.push('personalData')
    }
  }
}
</script>
<style scoped>
.mainbox{
  height: 630px;
  padding-top: 60px;
  padding-left: 115px;
  /* box-sizing: border-box; */
  /* background-color: rgb(146, 86, 86); */
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
