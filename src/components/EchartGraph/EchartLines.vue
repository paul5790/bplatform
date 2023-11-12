<template>
  <div>
    <v-chart class="chart" :option="option" autoresize />

    <v-container fluid>
      <v-checkbox v-model="selectedGraphs" label="Email" value="Email"></v-checkbox>
      <v-checkbox v-model="selectedGraphs" label="Union Ads" value="Union Ads"></v-checkbox>
      <v-checkbox v-model="selectedGraphs" label="Video Ads" value="Video Ads"></v-checkbox>
      <v-checkbox v-model="selectedGraphs" label="Direct" value="Direct"></v-checkbox>
      <v-checkbox v-model="selectedGraphs" label="Search Engine" value="Search Engine"></v-checkbox>
    </v-container>
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts"; // BarChart로 변경
import { UniversalTransition } from "echarts/features";
import {
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  TransformComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, watch, onMounted } from "vue";

use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent,
]);

provide(THEME_KEY);

const seriesData = {
  "Email": [
    120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 132, 101,
    134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210,
  ],
  "Union Ads": [
    220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310, 182, 191,
    234, 290, 330, 310, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330,
    310,
  ],
  "Video Ads": [
    150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232, 201,
    154, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330,
    410,
  ],
  "Direct": [
    320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330, 320, 332, 301,
    334, 390, 330, 320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330,
    320,
  ],
  "Search Engine": [
    820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932,
    901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934,
    1290, 1330, 1320,
  ],
};

const selectedGraphs = ref([]);

// const toggleGraph = (graphName) => {
//   const index = selectedGraphs.value.indexOf(graphName);
//   if (index === -1) {
//     selectedGraphs.value.push(graphName);
//   } else {
//     selectedGraphs.value.splice(index, 1);
//   }

//   updateChart();
// };

const updateChart = () => {
  option.value.series = selectedGraphs.value.map((graphName) => ({
    name: graphName,
    type: "line",
    stack: "Total",
    data: seriesData[graphName],
  }));
};

watch(() => selectedGraphs.value, updateChart);

// mounted 훅을 사용하여 컴포넌트가 처음 마운트될 때 한 번 실행됨
onMounted(() => {
  updateChart();
});



const option = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
    ],
  },
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  series: [],
});
</script>

<style scoped>
.chart {
  height: 87vh;
}
body {
  margin: 0;
}
</style>
