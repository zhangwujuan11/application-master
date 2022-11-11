<template>

  <el-card class="box-card">
    <h3 class="formTitle">审核认证</h3>
    <div class="memberAdmin">
      <div class="adminBox" v-for="(item,index) in superMember" :key="index">
        <div class="adminBoxT">
          <img class="people" :src="item.appAvatar"/>
          <div>
            <p> <span class="sevcl">应用名称</span> {{ item.appName }}</p>
            <p> <span class="sevcl">应用类型</span>{{ item.appType | appTypes}}</p>
            <p> <span class="sevcl">应用版本号</span>{{ item.versioncode }}</p>
          </div>
        </div>

        <div class="adminBoxD">
          <el-button type="primary" v-if="item.authStatus==2" @click="compenychek(item.appId)">公司审核</el-button>
          <el-button type="primary" v-if="item.appstatus==0" @click="appchek(item)">应用审核</el-button>
           <el-button type="primary" v-if="item.devStatus==2" @click="devchek(item)">版本审核</el-button>
        </div>

      </div>
    </div>
  </el-card>
</template>
<script>
  import { Toexamine } from '@/api/adminCenter'
export default {
  filters:{
    appTypes(e){
      if(e==1){
        return "小程序"
      }else if(e==2){
        return "移动开发"
      }else if(e==3){
        return "网页开发"
      }
    }
  },
   inject:["reload"],
  data(){
    return({
      superMember:[]
    })
  },
  mounted() {
    this.getlist()
  },

  methods: {
    async getlist(){
      const data= await Toexamine({
        "page": 1,
        "pageSize": 10,
      	"username": this.$store.state.user.userInfo.username
      }).then(res=>{
        this.superMember=res.data.content
      }).catch(err=>{
        console.log(err)
      })
    },
    // 公司审核
    compenychek(n){
      this.$router.push({
        path:"/CompanyDetails",
        query:{id:JSON.stringify(n)}
        })
         this.reload()

    },
    //应用审核
    appchek(n){
      this.$router.push({
        path:"/AppDetails",
        query:{id:JSON.stringify(n) }
      })
      this.reload()
    },
    // 版本审核
    devchek(n){
      this.$router.push({
        path:'/DevChek',
        query:{id:JSON.stringify(n) }
      })
    }
  },
  }
</script>
<style scoped>
.box-card{
  margin-top: 40px;
  padding: 20px 60px 100px 60px;
}
.formTitle{
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  color: #3A3A3A;
  border-bottom: 1px solid #C4C4C4;
  width: 100%;
  text-indent: 40px;
  margin-top: 0;
}
.memberAdmin{
  display: flex;
  width: 100%;
 padding: 0 20px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.memberAdmin:after{
  content: "";
  width: 500px;
  height: 0;
}
.adminBox{
  width: 500px;
  height: 200px;
  background: #E5F3FF;
  border-radius: 10px;
  font-size: 15px;
  line-height: 22px;
  margin: 20px 0;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.adminBoxT{
  display: flex;
  width: 100%;
  justify-content:left;
  align-items: center;
}
.adminBox .people{
  width: 80px;
  height: 80px;
  margin: 0 60px;
}
.adminBoxD{
  /* height: 80px; */
  width: 100%;
  display: flex;
  justify-content: left;
  /* align-items: center; */
  padding-left: 60px;
  /* flex-direction: column; */
}
.box-card{
  padding: 0;
}
/deep/.el-card__body{
  min-height: 500px;
}
.sevcl{
  color: #7A7A7A;
  margin-right: 20px;
}
.message p{
  margin-bottom:8px;
  margin-top: 0;
}
.el-button--primary{

  width: 90px;
}
.el-button--medium{
  padding: 10px;
}

</style>
