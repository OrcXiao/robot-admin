import axios from './index';

const api = {
  //登录页
  Login: {
    login(params){
    
    }
  },
  //首页
  Home: {
    head(params){
      axios.get('/api/main/head', params);
    },
    central(params){
      axios.get('/api/main/central', params);
    },
    bottom(params){
      axios.get('/api/main/bottom', params);
    },
  },
  //API管理
  ApiManage: {},
  //策略管理
  TacticsManage: {},
  //机器人
  Robot: {},
  //收益总览
  EarningsOverview: {},
  
};

export default api
