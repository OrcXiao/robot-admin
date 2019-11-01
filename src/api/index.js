import axios from 'axios';
import {Message} from 'element-ui';
import router    from "../router/index.js";

axios.defaults.baseURL = '';

//http 请求request 拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("RobotSystemLoginToken");
    if(token){
      config.headers = {
        'token': token
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http 响应response 拦截器
axios.interceptors.response.use(res => {
    
    if(res.data.code !== 200){
    
    }
    return res;
  },
  error => {
    return Promise.resolve(error);
    
  }
);

export default axios;
