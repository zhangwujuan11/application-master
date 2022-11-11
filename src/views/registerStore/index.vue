<template>
  <div class="outerBox">
    <div class="choose-title">企业认证</div>
    <div class="contain">
      <div class="type-contain">
        <TypeBox />
      </div>
    </div>
  </div>
</template>

<script>
import TypeBox from './components/typeBox.vue'
export default {
  name: 'RegisterStore',
  components: {
    TypeBox
  },

  data() {
    return {
    }
  }
}
</script>
<style scoped>

.outerBox{
    width: 100%;
    margin:0;
    background-color:#F5F5F5;
    box-sizing: border-box;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.contain{
  width: 1800px;
  background-color: white;
  border-radius: 10px;
  margin-top: 19px;
  
}

.choose-title{
    font-size: 18px;
    height:60px;
    width: 100%;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #3A3A3A;
    text-align: center;
    background-color: white;
    line-height: 60px;
}

</style>
