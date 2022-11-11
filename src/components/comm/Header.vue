<template>
  <div class="newHeader" >
    <!-- <div class="header-left">
      <img src="@/assets/img/logo.png">
      <span>夸克应用管理中心</span>
    </div> -->

    <!-- <div>
      <ul>
        <li>移动开发</li>
        <li>网站开发</li>
        <li>小程序开发</li>
      </ul>
    </div> -->
    <div class="header-right">


     <!-- <template>
        <el-select v-model="selected">
          <el-option
            v-for="(item,index) in AppList"
            :key="index"

          </el-option>
        </el-select>
      </template> -->
     <!-- <select name="Application" v-model="selected">
        <option
        v-for="(item,index) in AppList"
        :key="index"
         value=" item.basicInformation.appName "
         >{{ item.basicInformation.appName }}
         </option>
      </select> -->
        <span>{{$store.state.user.userInfo.username}}</span>
        <el-divider direction="vertical" />
        <span @click="logout">退出</span>

    </div>
  </div>

</template>

<script>
  // import { getActiveProgramId } from '@/utils/auth'
  // import { getAccount } from '@/utils/auth'
  // import { basicInformation } from '@/api/adminCenter'
  // import { getApplicationList } from '@/api/adminCenter'//获取应用名称列表

  export default{
    methods:{
      async logout() {
        await this.$store.commit('user/loginOut')
        this.$router.push('/')
       this.$message({
                   type: 'info',
                   message: '已退出登录'
                 });
      }
    }
  }
</script>

<style scoped>
.newHeader{
  /* width: calc(87.5% + 26px); */
  height: 60px;
  background-color:white;
  display: flex;
  justify-content: end;
  align-items: center;
  color: #3A3A3A;
  padding: 0 17px;
  position: relative;
  /* right: calc(-12.5% + 26px); */
}
/* .header-left{
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
}
.header-left img{
  width: 18px;
  height: 20px;
  margin-right: 4px;
} */
ul{
  display: flex;
  width: 295px;
  justify-content: space-between;
  font-size: 15px;
}

li{
 list-style: none;
 cursor: pointer;
}
.header-right{
  width:180px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 400px;
  align-items: center;
  
}
/* /deep/.header-right span{
  height: 100%;
} */
.header-right .portrait{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 22px;
}
.bell{
  margin-left: 22px;
}
</style>
