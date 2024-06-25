<template>
  <v-card
    v-if="guest"
    height="93vh"
    class="pa-1 d-flex justify-center align-center"
  >
    <div style="text-align: center">
      <p style="font-weight: 600; font-size: 20px">
        <span style="color: #f76060">'User 등급'</span> 이상이 되시면 사용이
        가능합니다.
      </p>
      <p style="font-weight: 400; font-size: 15px">
        현재 {{ userid }}님의 등급은 Guest입니다.
      </p>
    </div>
  </v-card>
  <v-card
    v-else
    :style="{ backgroundColor: themeColor }"
    class="pa-1 d-flex justify-center align-center"
  >
    <v-row>
      <!-- 왼쪽 큰 박스 -->
      <v-col cols="12" style="">
        <v-row>
          <v-col
            v-for="chart in charts"
            :key="chart.id"
            :cols="chart.cols"
            no-gutters
            style="padding: 0px"
          >
            <v-sheet
              :style="{
                height: chart.style.height,
                padding: chart.style.padding,
                backgroundColor: chart.style.backgroundColor,
                display: 'flex',
                paddingTop: chart.style.paddingTop,
                paddingLeft: chart.style.paddingLeft,
                paddingRight: chart.style.paddingRight,
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <component :is="chart.component" />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              :style="{
                backgroundColor: themeColor,
                display: 'flex',
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingBottom: '10px',
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <VoyageTable />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import VoyageTable from "../components/VoyageTable.vue";
import EchartHalfDoughnut from "../components/EchartGraph/EchartHalfDoughnut1";
import EchartDoughnut from "../components/EchartGraph/EchartDoughnut.vue";
import EchartDrillDown from "../components/EchartGraph/EchartDrillDown.vue";
import EchartDrillDownMulti from "../components/EchartGraph/EchartDrillDownMulti.vue";
import { themeMode, themeConfig } from "@/utils/theme.js";
const guest = ref(true);
const userid = ref(sessionStorage.getItem("isAdmin"));
if (userid.value === "GUEST") guest.value = true;
else guest.value = false;

const { themeColor } = themeConfig;
const charts = ref([
  {
    id: 1,
    cols: 4,
    component: EchartDrillDown,
    style: {
      height: "43vh",
      backgroundColor: themeColor.value,
      paddingLeft: "13px",
      paddingTop: "15px",
      paddingRight: "3px",
    },
  },
  {
    id: 2,
    cols: 4,
    component: EchartDoughnut,
    style: {
      height: "43vh",
      backgroundColor: themeColor.value,
      paddingLeft: "3px",
      paddingTop: "15px",
      paddingRight: "3px",
    },
  },
  {
    id: 3,
    cols: 4,
    component: EchartHalfDoughnut,
    style: {
      height: "43vh",
      backgroundColor: themeColor.value,
      paddingLeft: "3px",
      paddingTop: "15px",
      paddingRight: "13px",
    },
  },
]);

const updateCols = () => {
  const screenWidth = window.innerWidth;
  charts.value.forEach((chart) => {
    if (chart.id === 1) {
      chart.cols = screenWidth <= 1700 ? 12 : 4;
      chart.style.paddingLeft = chart.cols === 12 ? "13px" : "13px";
      chart.style.paddingRight = chart.cols === 12 ? "13px" : "3px";
      chart.style.paddingTop = chart.cols === 12 ? "3px" : "15px";
    } else if (chart.id === 2) {
      chart.cols = screenWidth <= 1100 ? 12 : screenWidth <= 1700 ? 6 : 4;
      chart.style.paddingLeft =
        chart.cols === 6 || chart.cols === 12 ? "13px" : "3px";
      chart.style.paddingTop =
        chart.cols === 6 || chart.cols === 12 ? "3px" : "15px";
      chart.style.paddingRight = chart.cols === 12 ? "13px" : "3px";
    } else if (chart.id === 3) {
      chart.cols = screenWidth <= 1100 ? 12 : screenWidth <= 1700 ? 6 : 4;
      chart.style.paddingLeft = chart.cols === 12 ? "13px" : "3px";
      chart.style.paddingRight = chart.cols === 6 ? "13px" : "13px";
      chart.style.paddingTop =
        chart.cols === 6 || chart.cols === 12 ? "3px" : "15px";
    }
  });
};

// 컴포넌트가 마운트될 때 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener("resize", updateCols);
  // 초기에도 업데이트 수행
  updateCols();
  sessionStorage.setItem("page", "대시보드");
});

// 컴포넌트가 소멸될 때 이벤트 리스너 해제
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCols);
});
</script>

<style scoped>
.custom-card {
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
