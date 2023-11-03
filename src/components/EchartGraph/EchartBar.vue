<template>
  <v-sheet :elevation="elevation">
    <v-chart class="chart" :option="option" autoresize />
  </v-sheet>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts"; // BarChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  BarChart, // BarChart로 변경
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY);

var data1 = Math.round(Math.random() * 20);
var data2 = Math.round(Math.random() * 20);
var data3 = Math.round(Math.random() * 20);
var data4 = Math.round(Math.random() * 20);
var data5 = Math.round(Math.random() * 20);
var data6 = Math.round(Math.random() * 20);
var data7 = Math.round(Math.random() * 20);
var data8 = Math.round(Math.random() * 20);
var data9 = Math.round(Math.random() * 20);
var data10 = Math.round(Math.random() * 20);



const data = [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10];

const option = ref({
  title: {
    text: "데이터 수집기능",
    left: "left",
    textStyle: {
      fontSize: 14, // 폰트 크기 설정
    },
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} mb",
  },
  xAxis: {
    type: "category",
    axisLabel: { interval: 0, rotate: 20, align: "center", margin: 30 },

    data: [
      "DGPS",
      "GYRO",
      "ANEMOMETER",
      "RADAR",
      "AIS",
      "ECDIS",
      "AUTOPILOT",
      "SPEEDLOG",
      "NO.1ENGINE",
      "NO.2ENGINE",
    ],
  },
  yAxis: {},
  series: [
    {
      realtimeSort: true,
      name: "바바",
      type: "bar", // bar 타입 사용
      data: data,
    },
  ],
});


</script>

<style scoped>
.chart {
  height: 45vh;
  padding: 5px;
}
body {
  margin: 0;
}
</style>
