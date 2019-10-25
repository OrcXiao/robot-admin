<template>
  <div class="nav-wrap">
    <div class="logo-wrap">
      <img src="../../assets/img/nav/sign_in_logo.png"/>
      <span class="fs18 clFFFFFF">后台管理系统</span>
    </div>
    <el-menu
      router
      :default-active="defaultRoute"
      text-color="#B2CCFB"
      active-text-color="#FFFFFF">
      <el-menu-item index="/home">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/apiManage">
        <i class="el-icon-printer"></i>
        <span slot="title">API管理</span>
      </el-menu-item>
      <el-menu-item index="/tacticsManage">
        <i class="el-icon-paperclip"></i>
        <span slot="title">策略管理</span>
      </el-menu-item>
      <el-menu-item index="/robot">
        <i class="el-icon-connection"></i>
        <span slot="title">机器人</span>
      </el-menu-item>
      <el-menu-item index="/earningsOverview">
        <i class="el-icon-bank-card"></i>
        <span slot="title">收益总览</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "vnav",
    data(){
      return {
        //默认路由
        defaultRoute: '',
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        this.defaultRoute = this.$route.path;
      })
    },
    methods: {},
    props: {},
    watch: {
      $route(to, from){
        this.defaultRoute = to.path;
      }
    },
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped lang="scss">
  .el-menu{
    border-right: none;
    background: transparent !important;
    user-select: none;
  }

  .el-menu-item{
    padding-left: 35px !important;
    background: transparent !important;
  }

  .el-menu-item i{
    color: #B2CCFB;
  }

  .nav-wrap{
    .logo-wrap{
      padding: 20px 0 20px 35px;

      img{
        position: relative;
        top: 6px;
      }

      span{
        padding-left: 3px;
      }
    }
  }
</style>
