import axios from './index';
const api = {
  //登录页
  Login: {
    //登录
    login(params){
      return axios.post('api/login', params);
    },
    //获得验证码
    getAuthCode(params){
      return axios.post('api/send-email', params);
    },
    //忘记密码
    resetPassword(params){
      return axios.post('api/reset-password', params);
    },
    
  },
  //首页
  Home: {
    //上方头部数据
    head(params){
      return axios.get('/api/main/head', params);
    },
    //中间图表数据
    central(params){
      return axios.get('/api/main/central', params);
    },
    //下方两个表格数据
    bottom(params){
      return axios.get('/api/main/bottom', params);
    },
  },
  //API管理
  ApiManage: {
    //平台列表
    organizes(params){
      return axios.get('api/config/organizes', params);
    },
    //api列表
    apiList(params){
      return axios.get('api/users/api', params);
    },
    //添加api
    addApi(params){
      return axios.post('api/users/api', params);
    },
    //更新api
    updateApi(params){
      return axios.patch('api/users/api/' + params.id, params);
    },
    //删除api
    removeApi(params){
      return axios.delete('api/users/api/' + params);
    },
    
  },
  //策略管理
  TacticsManage: {
    //策略列表
    tacticsList(params){
      return axios.get('api/strategy', {params});
    },
    //切换开关
    switch(params){
      return axios.patch('api/strategy/toggle-switch/' + params.id, params);
    },
    //策略详情
    tacticsDetails(params){
      return axios.get('api/strategy', params);
    },
    
  },
  //机器人
  Robot: {},
  //收益总览
  EarningsOverview: {},
  
};

export default api
