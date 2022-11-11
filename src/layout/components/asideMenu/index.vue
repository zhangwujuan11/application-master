<template>
  <div class="whole">

      <div @click="goxin"  class="header-left">
        <img src="@/assets/img/logo.png">
        <span>夸克应用管理中心</span>
      </div>

    <el-menu
      default-active="/home/adminCenter/homePage/index"
      class="el-menu-vertical-demo"
      router
    >
      <div v-for="item in menus" :key="item.id">
        <el-menu-item :index="item.path">
          <i :class="item.icon" />
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
// import { getActiveProgramId } from '@/utils/auth'
import bus from '@/utils/bus'
import { kuakeadmin } from '@/api/adminCenter'
// import { mapGetters } from 'vuex'
// import { mount } from '@vue/test-utils'
export default {
  name: 'AsideMenu',
  // props: ['showAside'],
  data() {
    return {
      activeProgramID: '', // 激活应用的id
      menus: [
        // { id: 0, title: '首页', path: '/home/adminCenter/homePage/index', icon: 'el-icon-s-home' },
        { id: 4, title: '应用列表', path: '/home/adminCenter/jurisdiction/index', icon: 'el-icon-s-check' },
        { id: 0, title: '添加应用', path: '/home/adminCenter/miniProgramMessage/index', icon: 'el-icon-s-order' },
        // { id: 1, title: '资源包库', path: '/home/adminCenter/resourcePackage/index', icon: 'el-icon-document-copy' },
        // { id: 2, title: '上传资源', path: '/home/adminCenter/resourcePackage/index', icon: 'el-icon-menu' },
        { id: 1, title: '版本管理', path: '/home/adminCenter/versionAdmin/index', icon: 'el-icon-s-management' },
        { id: 2, title: '成员管理', path: '/home/adminCenter/memberAdmin/index', icon: 'el-icon-user-solid' },
        { id: 3, title: '审核认证', path: '/home/adminCenter/examine/index', icon: 'el-icon-s-check' },

        // { id: 5, title: '用户反馈', path: '/home/adminCenter/userResponse/index', icon: 'el-icon-s-comment' },

      ],
      ifkuake:false
    }
  },
  computed: {
    activesPath() {
      const router = this.$router.currentRoute.fullPath
      return router
    }
  },
  watch:{
    ifkuake(n) {
      // console.log(n)


    }
  },

  created(){
    kuakeadmin({username:JSON.parse(localStorage.getItem('userinfo')).username}).then(res=>{
      // this.ifkuake=res.data
      if(res.data==false){
        this.menus.shift()
        this.menus.pop();
      }
    }).catch(err=>{
      console.log(err+"没有管理员资格")
      this.menus.pop()
      this.menus.shift()
    })
  },
  methods: {
    goxin(){
      this.$router.push("/home")
    }
  }
}
</script>
<style scoped>
.btn{
  transform: translateX(26px);
  margin-bottom: 15px;
  padding-left: 33px;
  padding-right: 33px;
}
.whole{
    margin-top: -60px;
    background-color: #242F3F;
    position: relative;
    z-index: 999;
}
.el-menu-item:hover{
  /* background: #545c64;; */
    color: #1787FB !important;
    text-decoration: underline;
    border-bottom: none;

}
/* 去掉选中el-menu-item时的下划线 */
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  color: red;
}

.header-left{
  width: 100%;
  height: 60px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
}
.header-left:hover{
  cursor: pointer;
}
.header-left img{
  width: 18px;
  height: 20px;
  margin-right: 4px;
}
.el-menu{
  background-color:#242F3F ;
  border-right: 1px solid #242F3F;
}
.el-menu li{
  color: white;
  text-align: center;
}
/* .el-menu-item i{
  color: white;
} */

</style>
