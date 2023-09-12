import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
    path: "/usersetting",
    name: "usersetting",
    component: () => import("../views/UserSetting.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
