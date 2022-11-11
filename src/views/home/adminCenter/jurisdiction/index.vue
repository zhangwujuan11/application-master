<template>
  <el-card class="box-card">
    <h4>
      项目权限
      <span class="titleTips">展示当前项目中的所有权限，管理员可进行配置</span>
      <span class="addjuri">添加权限</span>
    </h4>
    <template>
      <el-table
        :data="tableData"
        style="width:100%">
        <el-table-column
          prop="appName"
          label="应用名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="appType"
          label="应用类型">
          <template slot-scope="scope">
           <div>{{scope.row.appType | appTypes}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="应用状态">
          <template slot-scope="scope">
            <div>{{scope.row.appStatus | appTstatus}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column prop='appId'>
         <template slot="header">
          <span>
            <i class="el-icon-setting"></i>
          </span>
         </template>
         <template  slot-scope="scope">
           <span class="rismodify" @click='showmore( scope.row.appId)'><i class="el-icon-edit-outline"></i>详情</span>
         </template>
        </el-table-column>
      </el-table>
    </template>
    <p class="ristips">
      参数配置
      <span>仅管理员有权限对当前应用中的参数进行配置</span>
      <span>添加权限</span>
    </p>
  </el-card>
</template>
<script>
  import { allList } from '@/api/adminCenter'
  export default{
    filters:{
      appTypes(e){
        if(e==1){
          return "小程序"
        }else if(e==2){
          return "移动开发"
        }else if(e==3){
          return "网页开发"
        }
      },
      appTstatus(e){
        if(e==1){
          return "正常"
        }else if(e==0){
          return "停用"
        }
      }
    },
 inject:["reload"],
  data(){
          return {
            tableData: []
          }
        },
  created() {
    allList({
      "page": 1,
      "pageSize": 10,
      "username": JSON.parse(localStorage.getItem('userinfo')).username
      }).then(res=>{
       this.tableData= res.data.content
      })
  },
  methods:{
    showmore(n){
      this.$router.push({
        path:"/AppDetails",
        query:{forid:JSON.stringify(n) , isready:true }
      })
      this.reload()
    }
  }

  }
</script>

<style scoped>
.el-card{
    padding: 15px 30px !important;
  }
  h4{
    font-size: 18px;
    color: #3A3A3A;
    font-weight: normal;
  }
  h4 .titleTips{
    font-size: 14px;
    color: #7A7A7A;
    margin-left: 15px;
  }
  /deep/table td,/deep/.el-table th{
    text-align: center;
  }
  .addjuri{
    color: #2F88FF;
    font-size: 14px;
    float: right;
  }
  .el-icon-setting{
    font-size: 18px;
    color: #3A3A3A;
    font-weight: 800;
  }
  /deep/.el-table th{
    background-color: #F4F4F4;
    color: #3A3A3A;
  }
  /deep/.el-table th:first-child{
     border-top-left-radius: 10px;
  }
  /deep/.el-table th:nth-child(4){
     border-top-right-radius: 10px;
  }
.rismodify{
  color: #2F88FF;
  margin-right: 30px;
  cursor: pointer;
}
.risdel{
  color: #E93838;
  cursor: pointer;
}
.ristips{
  font-size: 18px;
  color: #3A3A3A;
  margin-top: 20px;
}
.ristips span:first-child{
  font-size: 15px;
  color: #7A7A7A;
  margin-left: 10px;
}
.ristips span:last-child{
  font-size: 15px;
  color: #2F88FF;
  float: right;
}
</style>
