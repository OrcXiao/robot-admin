import Vue       from 'vue'
import Router    from 'vue-router'
import routerArr from './router';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [].concat(routerArr)
});

/*路由拦截器*/
router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    next();
  }
  else{
    /*
    * 跳转页面之前, 判断是否存在token.
    * 如果存在跳转到目标页, 如果不存在强制跳转到登录页.
    * */
    let token = localStorage.getItem('RobotAdminSystemLoginToken');
    if(token){
      next();
    }
    else{
      next({path: '/login'});
    }
  }
});
export default router
