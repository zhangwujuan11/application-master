<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="never" height="530px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图下面部分 -->
    <div class="footer-contain">
      <div class="contain-item" />
      <div class="contain-item" />
      <div class="contain-item" />
      <div class="contain-item" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  },
  methods: {
  }
}
</script>
<style scoped>
/* 轮播图 */
 .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
/* 轮播图下面那块 */
  .footer-contain{
 display: flex;
 justify-content: center;
 margin: 0 auto;
 width: 80%;
  height: 370px;
  background-color: #475669;
}
.contain-item{
background-color: cornflowerblue;
    width: 250px;
    height: 250px;
    margin: 40px;
}
</style>
