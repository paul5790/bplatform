import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // view
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/DashBoard.vue"),
  },
  {
    path: "/realtimeview",
    name: "realtimeview",
    component: () => import("../views/RealtimeView.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../views/MapData.vue"),
  },
  {
    path: "/alldata",
    name: "alldata",
    component: () => import("../views/AllData.vue"),
  },
  {
    path: "/alldata1",
    name: "alldata1",
    component: () => import("../views/AllData1.vue"),
  },
  {
    path: "/mapview",
    name: "mapview",
    component: () => import("../views/MapView.vue"),
  },
  {
    path: "/datagraph",
    name: "datagraph",
    component: () => import("../views/DataGraph.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/DataAnal.vue"),
  },
  {
    path: "/manager",
    name: "manager",
    component: () => import("../views/ManagerAll.vue"),
  },
  {
    path: "/guest",
    name: "guest",
    component: () => import("../views/GuestPage.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/PersonalSetting.vue"),
  },

  // components
  {
    path: "/osmap",
    name: "osmap",
    component: () => import("../components/OSMap.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
