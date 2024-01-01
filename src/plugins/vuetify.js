// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { createApp, ref, watch } from "vue";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: "#F7F7F7",
    surface: "#FFFFFF",
    primary: "#2D3B40",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: "#424242",
    surface: "#424242",
    primary: "#2979FF",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme:
      themeMode.value === "light" ? "myCustomLightTheme" : "myCustomDarkTheme", // 초기값 설정
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
});

// 아래와 같이 themeMode가 변경될 때마다 테마를 업데이트합니다.
watch(themeMode, (newValue) => {
  vuetify.framework.theme.defaultTheme = newValue === "light" ? "myCustomLightTheme" : "myCustomDarkTheme";
});

export default vuetify;
