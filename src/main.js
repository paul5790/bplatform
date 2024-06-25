import { createApp } from "vue";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vue3Lottie from "vue3-lottie";
import VueApexCharts from "vue3-apexcharts";
import socket from "vue3-websocket";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueECharts from "vue-echarts";

const pinia = createPinia();
loadFonts();

createApp(App)
  .use(Vue3Lottie)
  .use(router)
  .use(vuetify, {
    theme: {
      dark: true,
    },
  })
  .use(pinia)
  .use(VueApexCharts)
  // .use(socket, "ws://ias.bdpbackend.com/ws/shipinfo")
  .component("VueDatePicker", VueDatePicker)
  .component("v-chart", VueECharts)
  .mount("#app");
