import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vue3Lottie from "vue3-lottie";
import { loadFonts } from "./plugins/webfontloader";
import VueApexCharts from "vue3-apexcharts";

loadFonts();

createApp(App)
  .use(Vue3Lottie)
  .use(router)
  .use(vuetify)
  .use(VueApexCharts)
  .mount("#app");
