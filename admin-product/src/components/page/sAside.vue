<template>
  <div :style="{width:isMenuColl?'64px':'180px'}" class="page_left">
    <el-menu                        
      :default-active="onRoutes"
      :router="true"
      :collapse-transition="false"
      :collapse="isMenuColl"
      class="page_menu"
      text-color="#eee" 
      active-text-color="#0068d3"
      background-color="#0058B3"
       @select='selectIn'
      > <!-- element 导航栏组件 :index="" 相当于vue得 <route-link></route-link> 跳转到对应路由 -->
      <template  v-for="item in menuList">
            <el-menu-item v-if="item.children==null"  :index="item.route" :key="item.route" >
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.route" :class="{collapse:isMenuColl}" :key="item.route" >
              <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group v-if='item.children'>
                <el-menu-item v-for="(it,indexs) in item.children" :key="indexs" :index="it.route">
                   <i class="iconfont" :class="it.icon"></i>{{it.name}}</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
      </template>
    </el-menu>
    <router-link to='/operating/user'></router-link>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: 'sAside',
  data(){
    return {
      menuList:[
        {
            route:'/overview',
            icon:'el-icon-s-data',
            name:'全局概览',
            children:null
         },
        //  {
        //     route:'/experience',
        //     name:'交互记录',
        //     children:[
        //       {
        //           route:'/experience',
        //           name:'体验列表'
        //       },
        //       {
        //           route:'/repair',
        //           name:'修复列表'
        //       }]
        //  },
         {
            name:'规则管理',
            route:'/field',
            icon:'el-icon-s-tools',
            children:[
              {
                  route:'/field',
                  name:'字段类型'
              }, {
                  route:'/datatype',
                  name:'数据类型'
              },
               {
                  route:'/rule',
                  name:'规则管理'
              }]
         },
         {
            name:'套餐管理',
            route:'/setmeal',
            icon:'el-icon-s-goods',
            children:[
              {
                  route:'/setmeal',
                  name:'套餐列表'
              }, {
                  route:'/cost',
                  name:'费用列表'
              }]
         },
         {
           route:'/order',
            name:'订单管理',
            icon:'el-icon-s-cooperation',
            children:[
              {
                  route:'/order',
                  name:'订单列表'
              }]
         },
        //  {
        //     name:'用户管理',
        //     route:'/user',
        //     children:[
        //       {
        //           route:'/user',
        //           name:'用户列表'
        //       }]
        //  },
        //  {
        //     name:'判断管理',
        //     route:'/Irreparable',
        //     children:[
        //       {
        //           route:'/Irreparable',
        //           name:'不可修复判断'
        //       },
        //       {
        //           route:'/serious',
        //           name:'严重失信判断'
        //       }]
        //  },
          {
            name:'审核管理',
            route:'/examine',
            icon:'el-icon-s-check',
            children:[
              {
                  route:'/examine',
                  name:'审核列表'
              }]
         },
          {
            name:'管理员管理',
            route:'/staff',
            icon:'el-icon-s-custom',
            children:[
              {
                  route:'/staff',
                  name:'管理员管理'
              }]
         },
         {
            name:'文章管理',
            route:'/article',
            icon:'el-icon-tickets',
            children:[
              {
                  route:'/article',
                  name:'文章管理'
              },
                {
                  route:'/source',
                  name:'文章来源管理'
              }, {
                  route:'/type',
                  name:'文章类型管理'
              }]
         }

      ]
    }
  },
  created(){
    // this.Bind();
   // console.log(this.$store.state.routers,'routers')
  },
  computed:{
    ...mapGetters({
      isMenuColl:"getIsMenuColl",
    }),
    onRoutes(){
      let path=this.$route.path;
      if(path=='/vip'||path.indexOf('vip')!=-1){
        return '/vip'
      }else if(path=='/product'||path.indexOf('pro')!=-1){
        return '/product'
      }else{
        return this.$route.path
      }
    }
  },
  methods:{
    ...mapActions({
      getRoutes:'loginModule/getRoutes'
    }),
    ...mapMutations({
        setRouters:'setRouters',
        setTitles:'setTitles'
    }),
    selectIn(index,indexPath){
      // console.log(index)
       for(let i=0;i<this.menuList.length;i++){
         if(this.menuList[i].children!=null){
               for(let j=0;j<this.menuList[i].children.length;j++){
                      if(this.menuList[i].children[j].route==index){
                          this.setTitles(this.menuList[i].children[j].name);
                      }
              }
         }
       }
    },
    Bind(){
      let rou=[];
       this.getRoutes().then((res)=>{
         this.menuList.splice(0,this.menuList.length)
            for(let i=0;i<res.data.data.length;i++){
                let a=[];
                rou.push(res.data.data[i].path);
                if(res.data.data[i].children!=null&&res.data.data[i].children.length>0){
                  for(let j=0;j<res.data.data[i].children.length;j++){
                       a.push({
                         route:res.data.data[i].children[j].path,
                         icon:res.data.data[i].children[j].meta.icon,
                         name:res.data.data[i].children[j].meta.title
                       })
                        rou.push(res.data.data[i].children[j].path)
                  }
                }
                if(a!=null&&a.length>0){
                     this.menuList.push({
                          route:res.data.data[i].path,
                          icon:res.data.data[i].meta.icon,
                          name:res.data.data[i].meta.title,
                          children:a
                    })
                }else{
                       this.menuList.push({
                          route:res.data.data[i].path,
                          icon:res.data.data[i].meta.icon,
                          name:res.data.data[i].meta.title,
                          children:null
                      })
                }
           
            }
       })
         this.setRouters(rou);
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-menu-item-group>ul{
  overflow: hidden;
}
::v-deep .el-menu-item-group__title{
  display: none;
}
::v-deep .el-submenu__title i{
  color:#fff;
  padding-right:5px;
}
::v-deep .el-menu--collapse .el-submenu {
    overflow: hidden;
}
::v-deep .el-menu .el-menu-item.is-active{
     background-color: #fff!important;
     font-weight: bold;
    border-radius: 40px;
    margin-left: 20px;
}
::v-deep .el-menu-item{
  transition: none;
}
::v-deep .el-menu-item i{
  color:#fff;
}
.page_left{
  flex-shrink: 0;
  min-height:calc(100vh - 64px);
  background: none repeat scroll 0 0 #0058B3;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  transition: width .28s;
  ::v-deep .el-menu{
    border-right: none;
    .el-menu-item{
      background-color:#1d1e23;
      &.collapse{
        width: 64px;
      }
      .iconfont {
        font-size: 22px;
        margin: 5px;
      }
      &.is-active{
        background-color: #101117;
      }
      &:hover{
        background-color: #101117;
      }
    }
  }
  
}
</style>