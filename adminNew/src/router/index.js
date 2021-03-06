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
let routes = [{
    path: "/home",
    name: "home",
    component: home,
    redirect: '/overview',
    children: [
      ...homeChildren,
      {
        path: '/examineDetails',
        name: 'examineDetails',
        component: () => import("@/views/adminView/examine/examineDetails.vue"),
        meta: {
          title: '后台管理-操作详情'
        }
      },
      {
        path: '/experience',
        name: 'experience',
        component: () => import("@/views/adminView/Interactive/experience.vue"),
        meta: {
          title: '后台管理-体验列表'
        }
      },
      {
        path: '/repair',
        name: 'repair',
        component: () => import("@/views/adminView/Interactive/repair.vue"),
        meta: {
          title: '后台管理-修复列表'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import("@/views/adminView/user/user.vue"),
        meta: {
          title: '后台管理-用户列表'
        }
      },
      {
        path: '/Irreparable',
        name: 'Irreparable',
        component: () => import("@/views/adminView/judge/Irreparable.vue"),
        meta: {
          title: '后台管理-不可修复判断'
        }
      },

      {
        path: '/serious',
        name: 'serious',
        component: () => import("@/views/adminView/judge/serious.vue"),
        meta: {
          title: '后台管理-严重失信判断'
        }
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import("@/views/adminView/staff/staff.vue"),
        meta: {
          title: '后台管理-管理员管理'
        }
      },

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


// let data = store.state;

// data.rou.forEach((v) => {
//   if (v && v.child && v.child.length != 0) {
//     v.child.forEach((o) => {
//       let op = {
//         path: o.code,
//         name: o.code.substring(1, o.code.length),
//         component: () => import(`@/views/adminView${o.file_url}.vue`),
//         meta: {
//           title: `后台管理-${o.name}`,
//         },
//       };
//       routes.find(item => {
//         return item.name == "home"
//       }).children.push(op)
//     });
//   }
// });


const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes
});



// 路由守卫 
router.beforeEach((to, form, next) => {

  if (to.meta && to.meta.title) {
    document.title = to.meta.title //设置页面标题 不需要设置不同页面标题可删除
  } else {
    document.title = '后台管理系统'
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
      document.title = '后台管理系统';
      next({
        path: '/login'
      });
    }
  }

});


export default router;