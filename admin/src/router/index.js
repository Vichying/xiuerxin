import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index'; 
import login from "../views/login.vue";
import home from "../views/home.vue";
import error404 from "../views/error/404.vue";
import error503 from "../views/error/503.vue";
import homeChildren from './home/homeChildren'      
//解决路由重复点击报错
const originalPush = VueRouter.prototype.push;      
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//解决路由重复点击报错
Vue.use(VueRouter);
const routes = [
  {
    path: "/home",
    name: "home",
    component: home,
    children:[
      ...homeChildren
    ]
  },
  {
    path: "/",
    name: "/",
    component: login,
    meta: {
      isAuth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      isAuth: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: error404,
    meta: {
      isAuth: false
    }
  },
  {
    path: "/503",
    name: "503",
    component: error503,
    meta: {
      isAuth: false
    }
  }
];

const router = new VueRouter({
  mode:'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
});

// 路由守卫 
router.beforeEach((to, form, next) => {
  if(to.meta&&to.meta.title){
    document.title=to.meta.title        //设置页面标题 不需要设置不同页面标题可删除
  }else{
    document.title='后台管理系统'
  }
  if (to.meta && to.meta.isAuth === false) { // 判断该路由是否需要登录权限 false 为不需要登录
    next();
  } else {
    if (store.state.login) {  
      // let k=0;
      // for(let i=0;i<store.state.rou.length;i++){
      //   if(store.state.rou[i]==to.path){
      //     k=1;
      //   }
      // }
      // if(k==1)
      //    next();
      // else{
      //   next({ path: '/overview' });
      // }
      next();
    } else {
      document.title='后台管理系统'
      next({ path: '/login' });
    }
  }
 
});


export default router;
