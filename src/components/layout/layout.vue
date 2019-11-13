<template>
  <el-container class="container">
    <el-aside class="aside-wrap" width="200px">
      <Vnav></Vnav>
    </el-aside>
    <el-container>
      <el-header>
        <Vheader></Vheader>
      </el-header>
      <el-main>
        <transition name="pageswitching">
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Vheader from '../header/Vheader';
  import Vnav    from '../nav/Vnav';
  export default {
    name: "layout",
    data(){
      return {
        globalLoading: '',
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
      })
    },
    watch: {},
    methods: {},
    props: {},
    mixins: [],
    filters: {},
    components: {
      Vheader, Vnav
    },
  }
</script>

<style scoped lang="scss">

  .el-header{
    padding: 0;
    border-bottom: 1px solid #e1e2e7;
  }

  .container{
    height: 100vh;
  }

  .aside-wrap{
    background: #4B81E2;
  }

  .el-main{
    padding: 30px;
    background: #f5f6fa;
  }

  /*
  * transition --- 页面切换的过度效果..
  */
  .pageswitching-enter-active,
  .pageswitching-leave-active,
  .pageswitching-move{
    transition: all 0.3s;
  }

  .pageswitching-enter,
  .pageswitching-leave-active{
    opacity: 0;
    transform: translateX(20px);
  }

  .pageswitching-leave-active{
    position: absolute;
  }

</style>
