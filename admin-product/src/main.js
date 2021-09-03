import Vue from "vue";
import ElementUI from 'element-ui';             //引用elementui
import 'element-ui/lib/theme-chalk/index.css';  //element样式
import App from "./App.vue";
import $ from 'jquery';
import router from "./router";    //路由引用
import axios from './api/http'    //引用简单封装过得axios
import store from "./store";  //引用vuex 下方挂载 全局可用 this.$store 等方法和变量
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn'); 
import echarts from 'echarts'  
Vue.prototype.$echarts = echarts


import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);

Vue.use(ElementUI);           //全局引用elementui
Vue.prototype.$http = axios;  //Vue.prototype vue原型链 这里挂在之后 全局this.$http.post()  相当于 axios.post()
Vue.prototype.$ = $;          
Vue.prototype.$Bus=new Vue;     //这里先定义一个$Bus定义到vue原型链上,就是用this.$Bus可以调用 定义得变量是新初始化得一个vue实例  //用于兄弟组件之间发送事件this.$Bus.$emit('fangfa') this.$Bus.$on('fangfa') 等同于父子组件得 this.$emit('fangfa') this.$on('fangfa')
Vue.config.productionTip = false;
import './assets/scss/style.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
