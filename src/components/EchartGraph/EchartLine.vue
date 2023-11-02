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
]);

provide(THEME_KEY);

const datasetRaw = ref([
  ["Year", "Income"],
]);

const rand = ref([]);
for (let i = 1; i<= 227; i++ ){
  const randomIncome = Math.floor(Math.random() * 100) + 1;
  rand.value.push(randomIncome); // 랜덤값을 배열에 추가
}
console.log(rand);
for (let i = 0; i <= 226; i++) { 
  datasetRaw.value.push([i+1, rand.value[i]]);
}

const option = ref({
  dataset: [
    {
      id: "dataset_raw",
      source: datasetRaw.value,
    },
    {
      id: "dataset_since_1950_of_germany",
      fromDatasetId: "dataset_raw",
      transform: {
        type: "filter",
        config: {
          and: [
            { dimension: "Year", gte: 0 }, // 1950년 이상
            { dimension: "Income", lte: 100 }, // 100 이하
          ],
        },
      },
    },
  ],
  title: {
    text: "시계열 그래프",
    left: "center",
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} mb",
  },
  xAxis: {
    type: "category",
    nameLocation: "middle",
  },
  yAxis: {
    name: "Income",
  },
  series: [
    {
      type: "line",
      datasetId: "dataset_since_1950_of_germany",
      showSymbol: false,
      encode: {
        x: "Year",
        y: "Income",
        itemName: "Year",
        tooltip: ["Income"],
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
