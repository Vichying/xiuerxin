import axios from 'axios'

axios.interceptors.request.use(data=> {
    return data;
  }, err=> {
    if (err.response) {
        switch (err.response.status) {
          case 400: 
            break;
          case 401: 
            break;
          case 404: 
            break;
          case 500: 
            break;
        }
      }
    return Promise.resolve(err);
  });
  export default axios;