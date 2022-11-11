<template>
  <!-- bgc是计算属性的方法，是登录页就只有一个footer样式，如果不是登录页，就加上chooseBgc这个样式 -->
  <div :class="['footer', {chooseBgc:bgc}]">
    <div>
      @ 1998-2021Tencent All Right Reserved.
    </div>
    <div>
      <span>开发者协议</span>
      <el-divider direction="vertical" />
      <span>运营规范 </span>
      <el-divider direction="vertical" />
      <span>联系夸克</span>
      <el-divider direction="vertical" />
      <span>问题反馈</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {

    bgc() {
      const router = this.$route.path
      if (router !== '/login') {
        return true
      } else {
        return false
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.chooseBgc{
  background-color: #FFFFFF !important;
 color: #000 !important;
//  border-top: 1px solid #65696b !important;
}
.footer {
  font-size: 14px;
  color: #FFFFFF;
    width: 100%;
  height: 76px;
  overflow: hidden;
  position: relative;
  background-color: #2A3035;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border-top: 1px solid #FFFFFF;
  }
</style>
