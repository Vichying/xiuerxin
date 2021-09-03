<template>
  <el-header>
    <div class="logo">
      <p>后台管理系统</p>
    </div>
    <div class="menu_btn" @click="meunCollClick">
      <i v-if="isMenuColl" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>
    <div class="right">
      <div class="admin">
         <p>欢迎您,{{userInfo.identity_name}}</p>
      </div>
      <div class="back">
        
        <el-dropdown  @command="dropDownClick" >      <!-- element下拉菜单组件-->
          <span class="el-dropdown-link">
            <i style="color:#fff" class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit" >退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: 'sHead',
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters({
      isMenuColl:"getIsMenuColl",
      userInfo:"getUserInfo",
    })
  },
  mounted(){
    // console.log('userInfo',this.userInfo)
  },
  methods: {
    ...mapMutations({               
      setUserInfo: "setUserInfo",   //设置用户信息
      setToken: "setToken",         //设置token
      setLogin: "setLogin",         //设置登陆状态
    }),
    dropDownClick(command){
      if(command=='exit'){
        this.setUserInfo(null);
        this.setToken(null);
        this.setLogin(false);
        this.$router.replace({path: '/login'})        //跳转到指定URL，替换history栈中最后一个记录，点击后退会返回至上上一个页面 和this.$router.push()同用法
      }
    },
    meunCollClick(){
      this.$store.commit('setIsMenuColl',!this.isMenuColl);
    }
  },
}
</script>
<style lang="scss" scoped>
.el-header{
  height: 64px!important;
  width: 100%;
  background:linear-gradient(90deg,#014298,#014298);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .liu_warp{
    max-width: 92%;
    width: 100%;
    margin: 0 auto;
  }
  .menu_btn{
    margin-left:10px;
    transform: translateY(2px);
    margin-right: auto;
    &:hover{
      cursor: pointer;
    }
    i{
      font-size: 20px;
    }
  }
  .logo{
    width: 160px;
    font-size: 14px;
    
  }
  .right{
    display: flex;
    .admin{
      display: flex;
      align-items: center;
      .userImg{
        width: 45px;
        height:45px;
        &:hover{
          transform: rotate(666turn);
          transition-delay: 1s;
          transition-property: all;
          transition-duration: 59s;
          transition-timing-function: cubic-bezier(.34,0,.84,1);
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 1px solid #f6ca9d;
          display: block;
        }
      }
      p{
        font-size: 18px;
        max-width: 300px;
        margin: 0 20px;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow: ellipsis; 
      }
    }
    .back{
      i{
        font-size:20px;
        color: #f6ca9d;
        margin-top: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>