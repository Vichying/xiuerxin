<template>
  <div class="page">
    <sHead></sHead>     
    <div class="content">
      <sAside></sAside>  
      <el-main>         
        <router-view  :key="$route.fullPath"></router-view> <!-- 把路由更深一层 相当于所有路由页面 都包含 公共头部组件和侧边导航栏-->
      </el-main>
    </div>
  </div>
</template>
<script>
import sHead from './sHead'         //引用同目录下得sHead组件
import sAside from './sAside' 
export default {
  name: 'page',
  data(){
    return {
      
    }
  },
  components:{
    sHead,
    sAside
  }
}
</script>
<style lang="scss" scoped>
.page{
  .content{
    display: flex;
    .el-main{
      background:#f0f2f5;
      padding: 0;
    }
  }
}
</style>