<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts"; // BarChart로 변경
import { UniversalTransition } from "echarts/features";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent,
]);

provide(THEME_KEY);

const datasetRaw = ref([
  ["time", "value"],
]);

const times = ref([]); // 시간 배열을 정의
for (let i = 0; i <= 226; i++) {
  // 원하는 시간 형식을 배열에 추가
  const hours = Math.floor(i / 60); // 시간
  const minutes = i % 60; // 분
  times.value.push(`${hours}:${minutes}`);
}


const rand = ref([]);
for (let i = 0; i<= 226; i++ ){
  const randomIncome = Math.floor(Math.random() * 100) + 1;
  rand.value.push(randomIncome); // 랜덤값을 배열에 추가
}
console.log(rand);
for (let i = 0; i <= 226; i++) { 
  datasetRaw.value.push([times.value[i], rand.value[i]]);
}

const option = ref({
  dataset: [
    {
      id: "dataset_raw",
      source: datasetRaw.value,
    },
  ],
  title: {
    text: "시계열 그래프",
    left: "center",
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} mb",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: '2%',
    },
  ],
  xAxis: {
    type: "category",
    nameLocation: "middle",
    data: times.value, // x축 데이터를 times 배열로 설정
  },
  yAxis: {
  },
  series: [
    {
      type: "line",
      datasetId: "dataset_raw",
      showSymbol: false,
      encode: {
        x: "time",
        y: "value",
        itemName: "time",
        tooltip: ["value"],
      },
    },
  ],
});

</script>

<style scoped>
.chart {
  height: 100vh;
}
body {
  margin: 0;
}
</style>
