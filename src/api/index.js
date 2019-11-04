import axios     from 'axios';
import {Message} from 'element-ui';
import router    from '../router/index';

axios.defaults.baseURL = 'http://25f872i731.qicp.vip/';

//http 请求request 拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("RobotAdminSystemLoginToken");
    if(token){
      config.headers = {
        'Authorization': token
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
    if(Number(res.data.status) !== 1000){
      if(Number(res.data.status) === 1007){
        Message.error({message: '登录失效, 请重新登录'});
        router.push('/login');
      }
      else{
        Message.error({message: res.data.message});
      }
    }
    return res;
  }, err => {
    Message({
      showClose: true,
      message: '系统错误',
      type: 'warning'
    });
    return Promise.resolve(err);
  }
);

export default axios;
