<template>
  <v-btn @click="hi()">ㅎㅇ</v-btn>
  <v-card-title>
    <span class="text-h6">Contents/Item</span>
  </v-card-title>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup props="props">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
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
import { ref, provide, defineProps } from "vue";

const props = defineProps({  // #2 props 정의
  name: String,
  data: Object,
  time: Object,
});

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


const datasetRaw = ref([["time", "value"]]);

const times = ref(props.time); // 시간 배열을 정의
const datas = ref(props.data);


for (let i = 0; i < datas.value.length; i++) {
  datasetRaw.value.push([times.value[i], datas.value[i]]);
}

const hi = () => {
  console.log(times.value);
console.log(datas.value.length);
}

const option = ref({
  dataset: [
    {
      id: "dataset_raw",
      source: datasetRaw.value,
    },
  ],
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
      height: "2%",
    },
  ],
  xAxis: {
    type: "category",
    nameLocation: "middle",
    data: times.value, // x축 데이터를 times 배열로 설정
  },
  yAxis: {},
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
  height: 65vh;
}
body {
  margin: 0;
}
</style>




