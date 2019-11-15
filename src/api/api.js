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
      return axios.get('api/strategy/' + params.id, params);
    },
    //添加策略
    addTactics(params){
      return axios.post('api/strategy', params);
    },
    //修改策略
    editTactics(params){
      return axios.patch('api/strategy/' + params.id, params);
    },
    //修改策略
    removeTactics(params){
      return axios.delete('api/strategy/' + params);
    },
  },
  //机器人
  Robot: {
    //机器人列表
    RobotList(params){
      return axios.get('api/robot', {params});
    },
    //获得选项数据
    getOptionData(){
      return axios.get('api/robot-coins');
    },
    //查询余额
    queryBalance(params){
      return axios.get('api/users/api/balance', params);
    },
    //策略列表
    strategies(params){
      return axios.get('api/robots/strategies', params);
    },
    //添加机器人
    addRobot(params){
      return axios.post('api/robot', params);
    },
    //切换开关
    changSwitch(params){
      return axios.patch('api/robot-config/' + params.id, params);
    },
    //删除机器人
    removeRobot(params){
      return axios.delete('api/robot/' + params.id, params);
    },
    //启动机器人
    startRobot(params){
      return axios.patch('api/robots/start/' + params.id, params);
    },
    //暂停机器人
    stopRobot(params){
      return axios.patch('api/robots/stop/' + params.id, params);
    },
    //机器人详情
    robotDetails(params){
      return axios.get('api/robot/' + params.id, params);
    },
    //修改机器人
    editRobot(params){
      return axios.patch('api/robot/' + params.id, params);
    },
    //跑单列表
    orderList(params){
      return axios.get('api/orders', {params});
    },
    //持仓/收益详情
    earningsDetails(params){
      return axios.get('api/orders/record/' + params.id);
    },
    //持仓/收益详情
    getEarnings(params){
      return axios.get('api/orders/income/' + params.id);
    },
    //获取跑单详情
    getOrder(params){
      return axios.get('api/orders/' + params.id, params);
    },
    //修改跑单
    editOrder(params){
      return axios.patch('api/order-config/' + params.id, params);
    },
    //强制平仓
    orderPosition(params){
      return axios.delete('api/order-position/' + params.id, params);
    },
    //获取异常信息
    getAbnormalInfo(params){
      return axios.get('api/orders/errors', {params});
    },
    //处理异常信息
    disposeAbnormalInfo(params){
      return axios.patch('api/orders/errors/' + params.id);
    },
  },
  //收益总览
  EarningsOverview: {
    //机器人列表
    robotList(){
      return axios.get('api/report-robots');
    },
    //收益总览
    getEarnings(params){
      return axios.get('api/report-profit', {params});
    },
    
  },
  
};

export default api
