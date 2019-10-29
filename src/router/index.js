import Vue       from 'vue'
import Router    from 'vue-router'
import routerArr from './router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [].concat(routerArr)
})
