import Vue            from 'vue';
import Router         from 'vue-router';
import App            from './App.vue';
import router         from './router/index';
import store          from './store/index';
import ElementUI      from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/common.scss";
import './registerServiceWorker';
//引入全局校验js..
import verify         from './verify/index';
//引入全局的mixin..
import {globalMixins} from "./mixin/global_mixin.js"
//引入公共的方法
import common         from './common'

Vue.prototype.$verifys = verify;
Vue.prototype.$common = common;

Vue.use(ElementUI);

Vue.mixin(globalMixins);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err => err)
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
