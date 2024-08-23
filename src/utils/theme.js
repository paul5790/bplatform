// src/utils/theme.js
import {
  darkbackcolor,
  whitebackcolor,
  darkselectedTab,
  darkNonSelectedTab,
  darkselectedTabText,
  darkNoNselectedTabText,
  lightselectedTab,
  lightNonSelectedTab,
  lightselectedTabText,
  lightNoNselectedTabText,
  darkbtn,
  lightbtn,
  darkbtnText,
  lightbtnText,
  darkText,
  lightText,
} from "../color/color.js";

import { ref, watch, computed } from "vue";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const themeConfig = {
  btnColor: ref(themeMode.value === "light" ? lightbtn : darkbtn),
  btnTextColor: ref(themeMode.value === "light" ? lightbtnText : darkbtnText),

  selectColor: ref(
    themeMode.value === "light" ? "#ffffff" : darkNonSelectedTab
  ),
  selectTextColor: ref(
    themeMode.value === "light" ? darkbtnText : lightbtnText
  ),

  textColor: ref(themeMode.value === "light" ? lightText : darkText),

  themeColor: ref(themeMode.value === "light" ? whitebackcolor : darkbackcolor),
  cctvColor: ref(themeMode.value === "light" ? "#eeeeee" : "#222222"),
  themeSelectedTabColor: ref(
    themeMode.value === "light" ? lightselectedTab : darkselectedTab
  ),
  themeNoNSelectedTabColor: ref(
    themeMode.value === "light" ? lightNonSelectedTab : darkNonSelectedTab
  ),
  themeSelectedTabTextColor: ref(
    themeMode.value === "light" ? lightselectedTabText : darkselectedTabText
  ),
  themeNoNSelectedTabTextColor: ref(
    themeMode.value === "light"
      ? lightNoNselectedTabText
      : darkNoNselectedTabText
  ),
  tableStyle: computed(() => {
    const imageUrl =
      themeMode.value === "light"
        ? "/image/kriso_kren_n.png"
        : "/image/kriso_kren_d.png";
    return {
      paddingTop: "5px",
      paddingBottom: "10px",
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "auto 60%",
      backgroundPosition: "center 60%",
      backgroundRepeat: "no-repeat",
    };
  }),
};

export { themeMode, themeConfig };
