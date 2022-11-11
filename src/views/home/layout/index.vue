<template>
  <div class="box">
    <Headert/>
    <div class="toRow">
      <el-col :span="3" style="background-color: #242F3F;"><Aside /></el-col>
      <el-col :span="21"><Main /></el-col>
    </div>
    <Footer />
  </div>
</template>
<script>
import Headert from '@/components/comm/Header.vue'
import Aside from '@/layout/components/asideMenu/index.vue'
import Footer from '@/layout/components/Footer/index.vue'
import Main from '@/layout/components/AppMain/index.vue'
export default {
  components: {
    Headert,
    Aside,
    Footer,
    Main
  }
}
</script>
<style scoped>
.box{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: #F5F5F5;
}
.toRow{
    display: flex;
    flex-direction: row;
}
.el-col-21{
  width: 100%;
  border-radius: 10px;

}
</style>
