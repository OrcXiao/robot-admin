<template>
  <div class="dis-fl login-wrap">
    <div class="dis-fl bs login-area">
      <div class="dis-fl bs login-box">
        <div class="img-wrap">
          <img class="wd100 hg100" src="../../assets/img/login/picture.png"/>
        </div>
        <div class="tc login-form-wrap">
          <img src="../../assets/img/login/logo.png"/>
          <el-form class="login-form" :model="login" :rules="loginRules" ref="login">
            <el-form-item prop="user" class="item-input">
              <el-input
                placeholder="请输入账号"
                v-model="login.user">
              </el-input>
              <img src="../../assets/img/login/yonghuming.png"/>
            </el-form-item>
            <el-form-item prop="pass" class="item-input">
              <el-input
                placeholder="请输入密码"
                type="password"
                v-model="login.pass">
              </el-input>
              <img src="../../assets/img/login/mima.png"/>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="submit('login')"
                class="wd100 fs18 login-btn"
                type="primary">立即登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        login: {
          user: '',
          pass: '',
        },
        loginRules: {
          user: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '账号'}),
              trigger: 'blur'
            },
          ],
          pass: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '密码'}),
              trigger: 'blur'
            },
          ]
        }
      }
    },
    computed: {},
    created(){
    },
    mounted(){
      //this.$ nextTick(() => {

      //})
    },
    methods: {
      //点击登录按钮
      submit(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$router.push('/home');
            this.$common.successHint('登录成功');
          }
        });
      },
    },
    props: {},
    watch: {},
    mixins: [],
    filters: {},
    components: {},
  }
</script>

<style scoped lang="scss">
  .login-wrap{
    width: 100%;
    height: 100%;
    background-color: #3460d3;
    align-items: center;
    justify-content: center;
    user-select: none;

    .login-area{
      width: 1873px;
      height: 100%;
      align-items: center;
      justify-content: center;
      background: url("../../assets/img/login/beijing.png") no-repeat;

      .login-box{
        width: 1260px;
        height: 620px;
        border-radius: 10px;
        box-shadow: 0 0 40px #5c5c5c;
        background: #ffffff;
        padding: 95px;

        .img-wrap{
          width: 535px;
          height: 451px;
          position: relative;
          top: -10px;
        }

      }

      .login-form-wrap{
        width: 440px;
        margin-left: 94px;

        .login-form{
          margin-top: 64px;

          /deep/ .el-input__inner{
            height: 56px;
          }

          .item-input{
            position: relative;

            img{
              position: absolute;
              right: 20px;
              bottom: 17px;
            }
          }

          .login-btn{
            margin-top: 40px;
            height: 56px;
            letter-spacing: 4px;
          }
        }
      }
    }
  }
</style>
