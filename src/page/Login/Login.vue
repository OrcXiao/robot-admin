<template>
  <div class="dis-fl login-wrap">
    <div class="dis-fl bs login-area">
      <!--登录-->
      <div v-show="showType" class="dis-fl bs login-box">
        <div class="img-wrap">
          <img class="wd100 hg100" src="../../assets/img/login/picture.png"/>
        </div>
        <div class="tc login-form-wrap">
          <img src="../../assets/img/login/logo.png"/>
          <div @click="showType = !showType" class="cl666666 fs12 cuso back-login">忘记密码 ?</div>

          <el-form class="login-form" :model="login" :rules="loginRules" ref="login">
            <el-form-item prop="user" class="item-input">
              <el-input
                placeholder="请输入用户名"
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
                @click="submitLogin('login')"
                class="wd100 fs18 login-btn"
                type="primary">登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!--忘记密码-->
      <div v-show="!showType" class="dis-fl bs login-box">
        <div class="img-wrap">
          <img class="wd100 set-pass-img" src="../../assets/img/login/wangjimima.png"/>
        </div>
        <div class="tc login-form-wrap">
          <div class="cl4B81E2 fs22 tl forget-pass">忘记密码</div>
          <div @click="showType = !showType" class="cl666666 fs12 cuso back-login">返回登录</div>
          <el-form class="login-form forget-form" :model="forgetObj" :rules="forgetRules" ref="forgetObj">
            <el-form-item prop="user" class="item-input">
              <el-input
                placeholder="请输入用户名"
                v-model="forgetObj.user">
              </el-input>
              <img src="../../assets/img/login/yonghuming.png"/>
            </el-form-item>
            <el-form-item prop="pass" class="item-input">
              <el-input
                placeholder="请输入新密码"
                type="password"
                v-model="forgetObj.pass">
              </el-input>
              <img src="../../assets/img/login/mima.png"/>
            </el-form-item>
            <el-form-item prop="authCode" class="item-input">
              <el-input
                placeholder="请输入邮箱验证码"
                v-model="forgetObj.authCode">
              </el-input>
              <div @click="getAuthCode" class="clFFFFFF fs12 cuso auth-code-wrap">
                获取验证码
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="submitSure('forgetObj')"
                class="wd100 fs18 login-btn"
                type="primary">确认
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
      let validatorPassNew = (rule, value, callback) => {
        if(value.length < 6 || value.length > 32){
          callback(new Error('密码长度不能小于6个字符, 大于32个字符'));
        }
        else{
          callback();
        }
      };

      return {
        //显示类型: true-登录, false-忘记密码
        showType: true,
        //登录object..
        login: {
          user: '18888888888',
          pass: '123123',
        },
        loginRules: {
          user: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '用户名'}),
              trigger: 'blur'
            },
          ],
          pass: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '密码'}),
              trigger: 'blur'
            },
          ],
        },

        /*忘记密码*/
        forgetObj: {
          user: '18888888888',
          pass: '',
          authCode: ''
        },
        forgetRules: {
          user: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '用户名'}),
              trigger: 'blur'
            },
          ],
          pass: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '密码'}),
              trigger: 'blur'
            },
            {
              required: true,
              validator: validatorPassNew,
              trigger: 'blur'
            },
          ],
          authCode: [
            {
              required: true,
              validator: this.$verifys.nullStr({item: '邮箱验证码'}),
              trigger: 'blur'
            },
          ]
        },

      }
    },
    computed: {},
    created(){
    },
    mounted(){
      this.$nextTick(() => {
        //清空登录token
        localStorage.clear();
      })
    },
    methods: {
      //点击登录按钮
      submitLogin(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            let params = {
              username: this.login.user,
              password: this.login.pass,
            };
            this.$api.Login.login(params).then(res => {
              if(res.data && res.data.status === 1000){
                localStorage.setItem('RobotAdminSystemLoginToken', res.data.data.access_token);
                this.$router.push('/home');
                setTimeout(() => {
                  this.$common.successHint('登录成功');
                }, 100)
              }
            });
          }
        });
      },

      //获取验证码
      getAuthCode(){
        this.$refs.forgetObj.validateField('user', (valid) => {
          if(!valid){
            let params = {
              username: this.forgetObj.user,
            };
            this.$api.Login.getAuthCode(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.$common.successHint('验证码已发送成功, 请前往邮箱查看');
              }
            });
          }
        });
      },

      //点击忘记密码确认按钮
      submitSure(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            let params = {
              username: this.forgetObj.user,
              password: this.forgetObj.pass,
              code: this.forgetObj.authCode,
            };
            this.$api.Login.resetPassword(params).then(res => {
              if(res.data && res.data.status === 1000){
                this.$common.successHint('密码修改成功, 请重新登录');
              }
            });
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
    height: 100vh;
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

          .set-pass-img{
            position: relative;
            top: 40px;
          }
        }

      }

      .login-form-wrap{
        position: relative;
        margin-left: 94px;
        width: 440px;

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

            .auth-code-wrap{
              position: absolute;
              right: 20px;
              bottom: 13px;
              width: 82px;
              height: 30px;
              line-height: 30px;
              background: rgba(75, 129, 226, 1);
              border-radius: 2px;
            }
          }

          .login-btn{
            margin-top: 40px;
            height: 56px;
            letter-spacing: 4px;
          }
        }

        .forget-form{
          margin-top: 70px;
        }

        .back-login{
          position: absolute;
          bottom: 88px;
          right: 0;
          z-index: 100;
          opacity: 0.7;
        }
      }
    }
  }
</style>
