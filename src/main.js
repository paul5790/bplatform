import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vue3Lottie from "vue3-lottie";
import { loadFonts } from "./plugins/webfontloader";
import VueApexCharts from "vue3-apexcharts";
import socket from "vue3-websocket";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

loadFonts();

createApp(App)
  .use(Vue3Lottie)
  .use(router)
  .use(vuetify)
  .use(VueApexCharts)
  .use(socket, "ws://192.168.0.24:8080/ws/shipinfo")
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");
