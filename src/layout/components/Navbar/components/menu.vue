<template>
  <div class="header-left">
    <!-- <el-menu
      mode="horizontal"
      :background-color="bgcColor"
      :text-color="textColor"
      :active-text-color="activeColor"
    >
      <el-menu-item v-for="item in headerMenu2" :key="item.id" :index="item.path">{{ item.name }}</el-menu-item>
    </el-menu> -->
    <el-menu
      v-if="this.$route.path == '/login'"
      mode="horizontal"
      default-active="activeMenu"
      :background-color="bgcColor"
      :text-color="textColor"
      router
      :active-text-color="activeColor"
    >
      <el-menu-item v-for="item in headerMenu" :key="item.id" :index="item.path">{{ item.name }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { kuakeadmin } from '@/api/adminCenter'
import {userinfo} from '@/api/login'
export default {
  name: 'Left',
  props: ['bgcColor', 'textColor', 'activeColor','famsg'],
  data() {
    return {
      activePath: '/',
      headerMenu: [
        { id: 1, name: '首页', path: '/' },
        // { id: 2, name: '资源中心', path: '/home/adminCenter/certification' },
        // { id: 3, name: '注册中心', path: '/registerStore' },
        { id: 4, name: '管理中心', path: '/home' },
        { id: 3, name: '审核认证', path: '/home/adminCenter/examine/index' },
        ],
    }
  },
  computed: {

    activeMenu() {
      const router = this.$router
      return router
    }
  },
  mounted(){
    if(this.$store.state.user.token != null || localStorage.getItem('userinfo') != null){
      let ad=JSON.parse(localStorage.getItem('token')).token_type
      let ab=JSON.parse(localStorage.getItem('token')).access_token
      const ty=this.$store.state.user.token_type+" "+this.$store.state.user.token || ad+" "+ab
      userinfo(ty).then(da=>{
        let us=da.data.name || JSON.parse(localStorage.getItem('userinfo')).username

       this.$nextTick(()=>{
         kuakeadmin({username:us}).then(res=>{
             if(res.data==false){
               this.headerMenu.pop()
             }
           }).catch(err=>{
             console.log(err+"没有管理员资格")
             this.headerMenu.pop()
           })
       })

      }).catch(() => {console.log('error submit!!')})
    }
    // let userinfo=localStorage.getItem('userinfo')
    // // console.log(localStorage.getItem('userinfo'))
    // if(this.$store.state.user.loginStatus == true){
    //   console.log("登录了")
    //   kuakeadmin({username:JSON.parse(localStorage.getItem('userinfo')).username}).then(res=>{
    //     if(res.data==false){
    //       this.headerMenu.pop()
    //     }
    //   }).catch(err=>{
    //     console.log(err+"没有管理员资格22")
    //     this.headerMenu.pop()
    //   })
    // }

  },
  watch:{
   '$store.state.user.loginStatus'(n){
     console.log(n)
   }
  }
}
</script>

<style spoed>
.active{
  color: red ;
}
.header-left{
  height: 72px;
  width: 379px;
  display: flex;
  justify-content: space-around;
}
.el-menu.el-menu--horizontal{
  border-bottom:0;
  align-items: center;
  display: flex;
}
element.style{
  border-bottom-color:rgb(001, 003, 007);
}
.el-menu--horizontal > .el-menu-item.is-active{
  border-bottom:0;
}
.el-menu-item{
  font-size: 16px;
}
.el-menu-item:hover{
   color: #E9EEF3 !important;
}
</style>
