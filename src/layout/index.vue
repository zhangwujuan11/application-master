<template>
  <!-- miss是computed里面的方法，如果是login页背景色就是那个 -->
  <div :class="{loginBgc:miss}">
    <div class="app-wrapper">
      <Navbar />
      <!-- 如果有token值，证明是登陆之后，就有侧边栏，侧边栏和AppMain同一行排列 -->
      <!-- <div :class="{toRow: token}"> -->
      <!-- 有token就展示侧边栏 -->
      <!-- <Aside v-if="token" /> -->
      <!-- <AppMain /> -->
      <!-- </div> -->
      <!-- <div v-if="this.$route.path === '/home/adminCenter/miniProgramMessage/index'" :class="{toRow: token}">
        <el-col :span="3"> <Aside /> </el-col>
        <el-col :span="21"><AppMain /> </el-col>
      </div> -->
      <!-- <div v-else> -->
      <div>
        <AppMain />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Aside from '@/layout/components/asideMenu/index.vue'
import AppMain from './components/AppMain/index.vue'
import Footer from './components/Footer/index.vue'
import Navbar from './components/Navbar/index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    Aside,
    AppMain,
    Navbar,
    Footer
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'activePage'
    ]),
    miss() {
      if (this.$route.path === '/login') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
 .loginBgc{
    background-color: #2A3035;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 1300px;
    margin: 0 auto;

  }
.toRow{
  display: flex;
  flex-direction: row;
  // flex-basis: auto;
  // box-sizing: border-box;
}
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

</style>
