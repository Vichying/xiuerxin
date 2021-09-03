<template>
  <div class="login">
    <div class="logo"><img src="@/assets/img/img_logo.png"/></div>
    <div class="login_form">
      <div class="login_box">
        <p class="login_top">111</p>
        <div class="login_bottom">
          <div class="login_img">
            <!-- <img src="../assets/img/login_normal.png" class="normal" v-show="!inputFocus" alt="">
            <img src="../assets/img/login_greeting.png" class="greeting" v-show="inputFocus=='admin'" alt="">
            <img src="../assets/img/login_blindfold.png" class="blindfold" v-show="inputFocus=='pwd'" alt=""> -->
          </div>
    
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" @submit.native.prevent  class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item label="" prop="admin">
              <div class="inputtx">
                 <img src="@/assets/img/icon_glymc.png" /> <el-input @focus="inputFocus='admin'" placeholder="请输入用户名" @blur="inputFocus=''" type="text" v-model="ruleForm.admin" autocomplete="off"></el-input>
              </div>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="" prop="pwd">
              <div class="inputtx">
                 <img src="@/assets/img/icon_dlmm.png" />  <el-input @focus="inputFocus='pwd'" placeholder="请输入登入密码" @blur="inputFocus=''" type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
              </div>
            </el-form-item>
             <!-- 验证码 -->
             <!-- <el-form-item label="" prop="yzm">
              <div class="inputtx">
                 <img src="@/assets/img/icon_yzm.png" />
                  <el-input placeholder="请输入验证码" v-model="ruleForm.yzm" autocomplete="off">
                    <template slot="append"><img style="width:100%;display:block;width:150px;" src=""/></template>
                 </el-input>
              </div>
            </el-form-item> -->
            <el-form-item class="submit_btn">
              <el-button type="primary" native-type="submit" @click="submitForm('ruleForm')">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from "vuex";  
export default {
  name: "login",
  data() {
    return{
      inputFocus:'',
      ruleForm:{
        admin:'',
        pwd:'',
        yzm:''
      },
      code:'',
      rules: {     
        admin: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        yzm: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
    this.getLoginCode().then(res=>{
      if(res.code==1){
          this.code=res.data.codes;
      }
    })
  },
  components: {
  },
  methods: {
    ...mapMutations({              
      setUserInfo: "setUserInfo",   //设置用户信息
      setToken: "setToken",         //设置token
      setTokenTime:"setTokenTime",  //设置token过期时间
      setLogin: "setLogin",         //设置登陆状态
    }),
    ...mapActions({
      loginUser:'loginModule/loginUser',
      getLoginCode:'loginModule/getLoginCode',
      getuserInfo:'loginModule/getuserInfo'
    }),
    submitForm(formName) {
      //提交表单 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let opt={
             username:this.ruleForm.admin,
             password:this.ruleForm.pwd,
             logintypes:1,
             codes: this.code
          }
          this.loginUser(opt).then((res)=>{
            console.log(res)
             if(res.code==1){
                  this.$message({
                    message: '登陆成功',
                    type: 'success'
                  });
                  this.setLogin(true);
                  this.setToken(res.data.tokens);
                  // this.setTokenTime(res.data.userinfo.et);
                  // this.setUserInfo(res.data);
                  this.getuserInfo({tokens:res.data.tokens}).then(ress=>{
                      console.log('user',ress)
                      if(ress.code==1){
                         this.setUserInfo(ress.data.list[0]);
                      }
                  })
                  this.$router.push('/home')
             }else{
                this.$message.error(res.msg);
             }
          })
        } else {
          //校验规则不通过 
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo{
  position: absolute;
  left: 77px;
  top:67px;
}
::v-deep .el-input-group__append{
  padding: 0;
  border: none;
}
::v-deep .el-form-item{
  margin-bottom: 35px;
}
.inputtx{
  display: flex;
  align-items: center;
  border-bottom: 2px solid #EEEEEE;
  img{
    width:32px;
    height: 32px;
    margin-left: 11px;
    margin-right: 17px;
  }
}
::v-deep .el-input__inner{
  font-size: 20px;
  border:none;
}
::v-deep .el-form-item__error{
  left:19%;
}
.login{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  //justify-content: center;
  background: url("../assets/img/login_bg.png") repeat;
  //background: #000;
  .login_form{
    width:26%;
    background: #FFFFFF;
    box-shadow: 0px 18px 29px 0px rgba(0, 46, 142, 0.44);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 16%;
    padding: 27px 50px 18px;
    .login_box{
      // height: 260px;
      // padding: 0 50px;
      // background-color: rgba(255, 255, 255, 1);
      // box-shadow: 0px 0px 10px 0px rgba(139, 140, 140, 0.3);
      // border-radius: 2px;
      width:100%;
      .login_top{    
        width: 100%;
        text-align: center;
        height: 20px;
        line-height: 20px;
        margin: 20px 0;
        font-size: 34px;
        margin-bottom: 53px;
          color: #1155C4;
        cursor: pointer;
        font-weight: bold;

      }
      .login_bottom{
        .submit_btn {
          margin-top: 25px;
          ::v-deep .el-form-item__content{
            margin-left: 20px!important;
            text-align: center;
          }
          ::v-deep .el-button{
            width:100%;
            font-size: 26px;
            padding: 23px 0;
            border-radius: 36px;
          }
          ::v-deep .el-button--primary{
            background-color: #1A72FE;
            border-color: #1A72FE;
          }
        }
      }
    }
    .login_img{
      img{
        height: auto;
      }
      img{
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 1;
        width: 10rem;
      }
      .normal{
        transform: translate(-50%,-83%);
      }
      .greeting{
        transform: translate(-50%,-75.8%);
      }
      .blindfold{
        width: 8.6rem;
        transform: translate(-50%,-75%);
      }
    }
  }
}
</style>