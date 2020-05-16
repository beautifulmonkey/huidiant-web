<template>
  <div class="login-bg">
    <svg data-v-24549f7d="" id="clouds" alt="Gray Clouds Background" xmlns="http://www.w3.org/2000/svg" width="2611.084" height="485.677" viewBox="0 0 2611.084 485.677"><path data-v-24549f7d="" id="Path_39" data-name="Path 39" d="M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z" transform="translate(142.69 -634.312)" fill="#eee"></path></svg>

    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="login-container">

    <h2 class="title" style="text-align: center;font-weight: 100;font-size: 26px;" >云逍收银</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width: 100%" @click.native.prevent="submitForm('loginForm')" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ThemePicker from "@/components/ThemePicker"
import LangSelector from "@/components/LangSelector"
import customerApi from '@/service/customer.js'

export default {
  name: 'Login',
  components:{
    ThemePicker,
    LangSelector
  },
  data() {
    return {
      loading: false,
      loginForm: {
        account: '',
        password: '',
        src: ''
      },
      fieldRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]

      },
      checked: true
    }
  },
  methods: {
    // login() {
    //   this.loading = true
    //   let userInfo = {account:this.loginForm.account, password:this.loginForm.password, captcha:this.loginForm.captcha}
    //   this.$api.login.login(userInfo).then((res) => {
    //       if(res.msg != null) {
    //         this.$message({
    //           message: res.msg,
    //           type: 'error'
    //         })
    //       } else {
    //         Cookies.set('token', res.data.token) // 放置token到Cookie
    //         sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
    //         this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
    //         this.$router.push('/')  // 登录成功，跳转到主页
    //       }
    //       this.loading = false
    //     }).catch((res) => {
    //       this.$message({
    //       message: res.message,
    //       type: 'error'
    //       })
    //     });
    // },


    async login(){
      this.loading = true;
      try {
        const res = await customerApi.userLogin(this.loginForm.account, this.loginForm.password);
        if (res.status >= 200 && res.status < 300) {
          const access_token = res.data.access_token;

          // Cookies.set('token', res.data.token) // 放置token到Cookie
          // sessionStorage.setItem('user', this.loginForm.account) // 保存用户到本地会话
          // this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
          localStorage.access_token = access_token;
          this.$router.push('/analysis/today')  // 登录成功，跳转到主页

        } else {
          this.$message({
            type: 'error',
            message: '验证失败!'
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false;
    },

    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        }else {
          return false;
        }
      });
    },

  },

}
</script>

<style lang="scss" scoped>
  .login-container {
    display: inline-block;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /*box-shadow: 0 0 25px #cac6c6;*/
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }

  #clouds {
    position: fixed;
    bottom: -160px;
    left: -50px;
    right: 100px;
    width: 120vw;
  }

  .login-bg{
    /*width: 6750px;*/
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    background: #005c97;
    background: linear-gradient(90deg,#363795,#005c97);
    background-position: 0 100%;
    background-repeat: repeat-x;
    height: 100%;
    left: 0;
    opacity: 1;
    /*position: fixed;*/
    top: 0;
  }
</style>
