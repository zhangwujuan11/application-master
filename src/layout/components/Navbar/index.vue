<template>
  <!-- islogin是计算属性的函数，为了登录页和其他页面的navbar不同 -->
  <div v-if="this.$route.path === '/login'" class="navbar bgc">
    <Left />
    <Menu :bgc-color="login.color" :active-color="login.actColor" :famsg='isadmin' />
    <Right :header-right-color="false"/>
  </div>
  <!-- <div v-else-if="this.$route.path === '/register/registerEmailinfo' ||this.$route.path === '/register/registerEmailAct' || this.$route.path === '/register/registerMesDown' " class="navbar">
    <div v-else-if="this.$store.user.state.activePage = 'register'" class="navbar">
    <Left :is-title="true" />
    </div>
  </div> -->
  <div v-else class="navbar">
    <Left :is-title="true" />
    <Menu :bgc-color="elses.colors" :text-color="elses.textcolors" :active-color="elses.actColor" />
    <Right :header-right-color="true"/>
  </div>
</template>
<script>
import Menu from './components/menu.vue'
import Left from './components/left.vue'
import Right from './components/right.vue'
export default {
  // props: [
  //   'iswant'
  // ],
  components: {
    Left,
    Right,
    Menu
  },
  data() {
    return {
      nowPath: '',
      login: {
        color: '#2A3035',
        actColor: '#FFF'
      },
      elses: {
        colors: '#FFF',
        textcolors: '#000',
        actColor: '#4377F3'
      },
    }
  }

}
</script>

<style lang="scss" scoped>
.bgc{
background: #2A3035 !important;
}
.navbar {
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 72px;
  background-color: #FFF;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #FFFFFF;
  }
</style>
