<template>
  <div class="hg100 dis-fl ju-sb header-wrap">
    <div class="project-name"></div>
    <div class="info-wrap">
      <i class="el-icon-bell cl4B81E2 fs20 info-icon cuso"></i>
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          <el-button icon="el-icon-user" circle></el-button>
          <span class="login-name cuso fs14">admin</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/login" icon="el-icon-back">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Vheader",
    data(){
      return {}
    },
    computed: {},
    created(){
    },
    mounted(){

    },
    methods: {
      handleCommand(command){
        this.$router.push(command);
      }
    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped lang="scss">
  .header-wrap{
    height: 60px;

    & > .project-name{
      padding-left: 20px;
      line-height: 60px;
      font-size: 22px;
      color: white;
      user-select: none;
    }

    & > .info-wrap{
      padding-top: 10px;
      padding-right: 20px;

      .info-icon{
        margin-right: 20px;
      }
      .login-name{
        padding: 0 5px;
      }
    }
  }
</style>
