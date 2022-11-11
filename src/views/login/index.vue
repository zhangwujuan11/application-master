<template>
  <!-- <div class="whole"> -->
  <div class="loginbox">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="never" height="800px">
      <el-carousel-item v-for="item in loginImg" :key="item.id" :label="item.text">
        <img :src="item.img" :alt="item.id">
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- </div> -->
</template>

<script>
import img1 from '@/assets/img/login/login1.png'
import img2 from '@/assets/img/login/login2.png'
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      loginImg: [
        { id: 1, img: img1, text: '夸克开放平台' },
        { id: 2, img: img2, text: '小程序应用开发' }
      ],
      iswanted: true
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
  /* .whole{
    background-color: #2A3035;
  } */
  .loginbox{
    height: 100%;
    width: 1300px;
    margin: 0 auto;
  }
  /* 轮播图选择框大小在'@/style/element-ui.scss' */
</style>
