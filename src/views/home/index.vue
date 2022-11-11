<template>
  <div>
    <p class="choose-title">应用管理中心</p>
    <p class="choose-detail">接入夸克开放平台开发，为更多用户提供轻便的服务</p>
    <el-button @click="addapp" type="primary" icon="el-icon-folder-add">添加应用</el-button>
    <el-table
      :data="AppList"
      style="width: 100%"
    >
      <el-table-column
        label="应用名称"
      >
        <template slot-scope="scope">

          <span>{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="应用类型"
      >
        <template slot-scope="scope">
          <!-- 对从后端拿到的应用类型进行过滤展示 -->
          <span>{{scope.row.appType | appType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="应用状态"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.appstatus | appstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="认证状态"
        width="250"
      >
        <template class="stuss" slot-scope="scope">
          <el-button @click="goEW(scope.row)" :disabled=" scope.row.authStatus | gono" type="primary">{{ scope.row.authStatus | authenticationStatus}}</el-button>
          <el-button @click="delthisApp(scope.row.appId)" v-if="scope.row.authStatus==2">撤销</el-button>
          <el-button v-if="scope.row.authStatus==1" @click="goEW(scope.row)" type="primary">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="AppID"
        width="300"
      >
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.appId}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="Secret Key"
        width="150"
      >
        <template slot-scope="scope">

          <span style="margin-left: -10px">{{ scope.row.appSecret}}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="创建时间"
        width="200"
      >
        <template slot-scope="scope">

          <span style="margin-left: -10px">{{scope.row.mcreateTime}}</span>

        </template>
      </el-table-column>
      <el-table-column label="操作"  width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.row.appId)"
          >管理</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="putdata(scope.row.appId)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>

import { getAccount } from '@/utils/auth'
import { getApplicationList,statuGetInfo,revoke,appdatas } from '@/api/adminCenter'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  inject:["reload"],
  filters: {
    appType(e) {
      if (e === 1) {
        return '小程序'
      } else if (e === 2) {
        return '移动开发'
      } else if (e === 3) {
        return '网站开发'
      }
    },
    gono(e){
      if (e === 1) {
        return "disabled"
      } else if (e == 2) {
        return "disabled"
      } else if (e == 3){
        return
        }else if (e == 0){
        return
      }

      },
    authenticationStatus(e) {
      if (e == 1) {
        return '审核通过'
      } else if (e == 2) {
        return '审核中'
      } else if (e == 3){
        return "审核未通过"
      }else if (e == 0){
        return "未认证"
      }
    },

    appstatus(e) {
      if(e === 1){
        return "正常"
      }else if(e === 0){
        return "停用"
      }
    }

  },
  data() {
    return {
      AppList: []
    }
  },

  mounted() {
    this.getAppList()


    // for (var i=1;i<=this.AppList.lenght;i++) {
    //   if(AppList.)
    // }

  },

  methods: {

    async getAppList() {
      const data = await getApplicationList(
      {
      	"page": 1,
      	"pageSize": 10,
      	"username": this.$store.state.user.userInfo.username
      }
      ).then(res=>{
        this.AppList = res.data.content

      }).catch(() => {alert('获取应用列表失败')})


    },

    addapp(){
      this.$router.push({ path: '/home/adminCenter/miniProgramMessage/index'})
    },
    handleDelete(appid){
      this.$router.push({
        path:'/home/adminCenter/versionAdmin/index',
        query:{"appid":appid}
        })
    },
    goEW(n){
        statuGetInfo(n.appId).then(res=>{
          let data=res.data
          this.$router.push({
            name: "RegisterStore",
            params:{"data":data,"needid":n.appId}
          })
        })
    },
    // 撤销认证中
    async delthisApp(n){
       const data=await revoke(n).then(res=>{
         this.$message.success("撤销成功")
         this.reload()
       })
    },
    // 修改应用
    putdata(n){
      appdatas(n).then(res=>{
       let data=res.data
       this.$router.push({
         name:'ProgramMessage',
         params:{'data':data}
       })
      })

    }
  }
}
</script>
<style scoped>
.el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  .whole{
    width: 800px;
    padding: 40px 80px;
    position: relative;

  }
  .titles{
     font-size: 20px;
    line-height: 20px;
    margin-bottom: 30px;
    color: #000;
    /* background-color: darkseagreen; */
  }
  .el-table{
    margin-top: 50px;
    margin-bottom: 320px;
  }

.choose-title{
    font-size: 38px;
    height: 38px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #263965;
    text-align: center;
    margin-top: 150px;
}
.choose-detail{
  text-align: center;
  height: 20px;
  font-size: 20px;
  margin-top: 25px;
  margin-bottom: 10px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: #646D80;
/* background-color: antiquewhite; */
}
/deep/.el-table_1_column_4  {
  display: flex !important;
  flex-direction: row;
}
</style>
