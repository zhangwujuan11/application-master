<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){//刷新
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },

  created(){
    this.$store.commit('user/INIT_USER');
  },
 
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>
