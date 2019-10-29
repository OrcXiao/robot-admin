<template>
  <div class="NotFound-wrap">
    <el-button
      class="back-btn"
      icon="el-icon-arrow-left"
      @click="$router.back()"
      type="primary">返回上一页
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
    data(){
      return {}
    },
    computed: {},
    created(){
    },
    mounted(){
      //this.$ nextTick(() => {

      //})
    },
    methods: {},
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped lang="scss">
  .NotFound-wrap{
    width: 100vw;
    height: 100vh;
    background: url("../../assets/img/404.jpg") no-repeat;
    position: relative;

    .back-btn{
      width: 200px;
      position: absolute;
      left: 50%;
      bottom: 10%;
      margin-left: -100px;
    }
  }
</style>
