import { createRouter, createWebHistory } from "vue-router";

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
    path: "/trialrundata",
    name: "trialrundata",
    component: () => import("../views/TrialRunData.vue"),
  },
  {
    path: "/alldata",
    name: "alldata",
    component: () => import("../views/AllData.vue"),
  },
  {
    path: "/usersetting",
    name: "usersetting",
    component: () => import("../views/UserSetting.vue"),
  },

  // components
  {
    path: "/weathercard",
    name: "weathercard",
    component: () => import("../components/WeatherCard.vue"),
  },
  {
    path: "/ex1",
    name: "ex1",
    component: () => import("../components/ExChart1.vue"),
  },
  {
    path: "/sailling",
    name: "sailling",
    component: () => import("../components/SaillingLottie.vue"),
  },
  {
    path: "/donutgraph",
    name: "donutgraph",
    component: () => import("../components/DonutGraph.vue"),
  },
  {
    path: "/circulargauge",
    name: "circulargauge",
    component: () => import("../components/CircularGauge.vue"),
  },
  {
    path: "/osmap",
    name: "osmap",
    component: () => import("../components/OSMap.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
