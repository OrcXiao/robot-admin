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
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Vheader from '../header/Vheader';
  import Vnav    from '../nav/Vnav';
  export default {
    name: "admin",
    data(){
      return {}
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {

      })
    },
    methods: {},
    props: {},
    watch: {},
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
    /*box-shadow: 5px 0 2px 2px #edeef3;*/
    box-shadow: 4px 0 10px #e1e2e7;

  }

  .el-main{
    margin-top: 2px;
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
</style>
