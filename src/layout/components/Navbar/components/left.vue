<template>
  <div>
    <transition name="headerLogoFade">
      <router-link to="/">
        <!-- <div v-if="this.$route.path === '/home/index'" class="logo-area">
          <img v-if="logo" :src="logo">
          <span :class="['logo-title','wid', {logoTitle:isTitle}]">{{ title }}(管理中心)</span>
        </div> -->
        <div class="logo-area">
          <img v-if="logo" :src="logo">
          <span :class="['logo-title',{logoTitle:isTitle}]">{{ title }}</span>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.png'
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  props: ['isTitle'],
  data() {
    return {
      title: '夸克应用发布平台',
      logo: logo
      // adminCenter: '(管理中心)'
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'token',
      'activePage'
    ])
  }

}
</script>

<style lang="scss" scoped>
.wid{
  width: 220px !important;
}
.logo-area{
 display: flex;
 align-items: center;
}
.logo-title {
     font-family: Source Han Sans SC;
     font-weight: 400;
     font-size: 19px;
     width: 158px;
     margin-left: 8px;
     color: #FFFFFF;
    }
 .logoTitle {
     color: #2A3035 !important;
    }
</style>
