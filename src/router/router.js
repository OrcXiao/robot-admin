const routerArr = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../page/Login/Login.vue")
  },
  {
    path: "/home",
    redirect: "/",
    component: () => import("../components/layout/layout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../page/Home/Home.vue"),
      }
    ]
  },
  {
    path: "/apiManage",
    redirect: "/",
    component: () => import("../components/layout/layout.vue"),
    children: [
      {
        path: "/",
        name: "ApiManage",
        component: () => import("../page/ApiManage/ApiManage.vue"),
      }
    ]
  },
  
  {
    path: "/tacticsManage",
    redirect: "/",
    component: () => import("../components/layout/layout.vue"),
    children: [
      {
        path: "/",
        name: "TacticsManage",
        component: () => import("../page/TacticsManage/TacticsManage.vue"),
      }
    ]
  },
  
  {
    path: "/robot",
    redirect: "/",
    component: () => import("../components/layout/layout.vue"),
    children: [
      {
        path: "/",
        name: "Robot",
        component: () => import("../page/Robot/Robot.vue"),
      },
      {
        path: "/RobotDetails/:id",
        name: "RobotDetails",
        component: () => import("../page/Robot/RobotDetails.vue"),
      }
    ]
  },
  {
    path: "/earningsOverview",
    redirect: "/",
    component: () => import("../components/layout/layout.vue"),
    children: [
      {
        path: "/",
        name: "EarningsOverview",
        component: () => import("../page/EarningsOverview/EarningsOverview.vue"),
      }
    ]
  },
  
  /*
   *增加404页面
   */
  {
    path: "*",
    component: () => import("../components/NotFound/NotFound.vue")
  },
];

export default routerArr;
