<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

/deep/.el-card{
  border-radius: 10px;
}
section>div{
  margin: 20px;
  margin-top: 20px !important;
}
</style>
