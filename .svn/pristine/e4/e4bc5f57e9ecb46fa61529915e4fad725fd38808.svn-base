import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';
// http response 拦截器
axios.interceptors.response.use(
  res => {
    return res;
  }, err => {
    if (err.response) {
      switch (err.response.status) {
        case 401: 
          // localStorage.clear(); // 请求前先清除所有信息
          // localStorage.setItem('activeUrl',window.location.herf);  
          //跳转到鉴权页面
          // router.push({
          //   path: '/auth'
          // });
          break;
        case 404:
          Message({
            type:'error',
            message:err.response.statusText
          });
          //跳转到404页面
          router.replace({
            path: '/404'
          });
          
          break;
        case 500:
          Message({
            type:'error',
            message:err.response.statusText
          });
          //跳转到500页面
          router.replace({
            path: '/500'
          });
          break;
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
