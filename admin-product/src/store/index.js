import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import { startsWith } from 'core-js/fn/string'
const VuexLocal = new VuexPersistence({
  storage: window.localStorage
}); // https://github.com/championswimmer/vuex-persist vuex的本地持久化插件

import loginModule from './module/loginModule'; // 按文件夹分类得一些全局方法   使用在index页面
const Modele ={
  loginModule
}
Vue.use(Vuex)         //Vue全局引用vuex 就
export default new Vuex.Store({
   // 全局变量 放在 state里面 
  state: {
    header:{},         //请求头
    tokenHeaders:'',   //不同类型请求头
    userInfo:'',       //用户信息
    login: false,      // 登录状态
    isMenuColl:false,  //菜单展开状态
    auth:'',            //获取得整个token信息 包括过期时间 token等，后端定义
    rou:['/data/overview'],
    titles:''
  },
  getters:{  
    getRouter: state => {
      return state.rou;
    },
    getTokenTime: state => {
      return state.tokenTime;
    },
    getAuth: state => {
      return state.auth;
    },
    getToken: state => {
      const token = state.token || localStorage.getItem('token');
      state.token = token;
      return state.token;
    },
    getUserInfo:state=>{  
      return state.userInfo           
    },
    getIsMenuColl:state=>{  
      return state.isMenuColl
    },
    getLogin: state => {
      const login = JSON.parse(localStorage.getItem('login'));
      if (login) {
        state.login = login;
      }
      return state.login;
    },
    
  },
  mutations: {  
    setTitles(state, data) {
      state.titles = data;
    },  
    setRouters(state, data) {
      state.rou = data;
    },    
    setToken(state, data) {
      if (data) {
        state.tokenHeaders = {
          headers: {
            Authorization: "Bearer " + data,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        state.header = {
          headers: {
            Authorization: "Bearer " + data,
            'Content-Type': 'application/json; charset=UTF-8;'
          }
        };
      }
      state.token = data;
    },
    setAuth(state, data) {
      state.auth = data;
    },
    setLogin(state, data) {
      state.login = data;
    },
    setTokenTime(state, data) {
      state.tokenTime = data;
    },
    setUserInfo(state,data){
      state.userInfo=data;
    },
    setIsMenuColl(state,data){
      state.isMenuColl=data;
    },
  },
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
  },
  modules: {
    //用来分多个文件
    ...Modele,
  },
  plugins: [VuexLocal.plugin]
})


