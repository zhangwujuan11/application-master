<template>
  <!-- <div class="toRow"> -->
  <!-- <el-col :span="3"><Aside /></el-col> -->
  <!-- <el-col :span="21"> -->
  <el-card class="box-card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="功能异常" name="first">
        <div v-for="item in functionErrorList" :key="item.value" class="box">
          <div><span class="typeStyle">{{ item.errorType }}</span><span>{{ item.time }}</span></div><br>
          <div><strong>{{ item.userName }}：</strong><span class="errorWord">{{ item.content }}</span></div>
          <div class="iconArea"><i class="el-icon-chat-dot-round" @click="showFunction = true" /><el-divider direction="vertical" />
            <i class="el-icon-delete" @click="deleteDialogVisible = true" />
          </div>
        </div>
        <!-- 点击回复消息图标出现 -->
        <div v-if="showFunction" class="responseArea">
          回复：
          <el-input v-model="responseWord" class="responseInput" type="textarea" rows="4" />
          <el-button type="primary">发送</el-button><el-button>取消</el-button>
        </div>
        <!-- 点击删除图标出现 -->
        <el-dialog
          title="确定要删除这一条信息吗？"
          :visible.sync="deleteDialogVisible"
          width="30%"
          center
        >
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleDelete">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="产品建议" name="second">
        <div v-for="item in functionErrorList" :key="item.value" class="box">
          <div><span class="typeStyle">{{ item.errorType }}</span><span>{{ item.time }}</span></div><br>
          <div><strong>{{ item.userName }}：</strong><span class="errorWord">{{ item.content }}</span></div>
          <div class="iconArea"><i class="el-icon-chat-dot-round" @click="showResponse = true" /><el-divider direction="vertical" />
            <i class="el-icon-delete" @click="handleDelete(item.value)" />
          </div>
        </div>
        <div v-if="showResponse" class="responseArea">
          回复：
          <el-input v-model="responseWord" class="responseInput" type="textarea" rows="4" />
          <el-button type="primary">发送</el-button><el-button>取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

  </el-card>
  <!-- </el-col> -->
  <!-- </div> -->
</template>
<script>
// import Aside from '@/layout/components/asideMenu/index.vue'
export default {
  name: 'MenuAdmin',
  components: {
    // Aside
  },
  data() {
    return {
      responseWord: '',
      deleteDialogVisible: false,
      showFunction: false,
      showResponse: false,
      functionErrorList: [{ 'value': '1', 'userName': '张桑', 'time': '2019-02-1', 'errorType': '其他异常', 'content':
      '击添加后的图片，弹出查看完整图片的浮层，以及删除按钮。' }, { 'value': '2', 'userName': '李斯', 'time': '2021-02-1', 'errorType': '响应异常', 'content':
      '点击浮层非按钮区域即可关闭图片查看浮层以及删除按钮。点击浮层非按钮区域即可关闭图片查看浮层,击添加后的图片，弹出查看完整图片的浮层，以及删除按钮。' }],
      title1: '功能异常',
      title2: '产品建议',
      activeName: 'first'
    }
  },
  methods: {
    handleDelete() {
      this.$message.success('删除成功')
      this.deleteDialogVisible = false
    }
  }
}
</script>
<style scoped>
/* .toRow{
   display: flex;
  flex-direction: row;
} */
.box-card{
  margin-top:  40px;
    padding: 40px 50px 100px 50px;
}
.box{
  /* width: 700px; */
  /* background-color: blanchedalmond; */
  position: relative;
    margin-top: 20px;
    padding-bottom: 8px;
    padding-right: 150px;
    border-bottom: 1px solid #E5E5E5;
  }
  .typeStyle{
    margin-right: 15px;
    color: #4377F3;
    border:1px solid #4377F3;
  }
  .iconArea{
    position: absolute;
    bottom: 10px;
    right: 15px;
    font-size: 20px;
  }
  .errorWord{
    line-height: 20px;
    font-size: 15px;
font-family: Source Han Sans SC;
font-weight: 400;
color: #84888B;
  }
  .responseArea{
    width: 650px;
    margin-top: 40px;
  }
  .responseInput{
    margin-bottom: 30px;
    margin-left: 60px;
  }
  .el-button{
    transform: translateX(60px);
  }
</style>
