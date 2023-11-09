<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart } from "echarts/charts"; // GaugeChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted } from "vue";

use([
  CanvasRenderer,
  GaugeChart, // GaugeChart로 변경
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const option = ref({
  tooltip: {
    formatter: "{a} <br/>{b} : {c} km/s",
  },
  series: [
    {
      name: "SPEEDLOG",
      type: "gauge", // gauge 타입 사용
      radius: "90%",
      center: ["50%", "45%"],
      splitNumber: 5,
      min: 8,
      max: 18,
      axisLine: {
        lineStyle: {
          width: 7,
        },
      },
      progress: {
        show: true,
        width: 7,
      },
      pointer: {
        length: "45%",
        width: 3,
      },
      splitLine: {
        length: 8,
        lineStyle: {
          width: 2,
        },
      },
      axisLabel: {
        distance: 10,
        fontSize: 10,
      },
      detail: {
        valueAnimation: true,
        formatter: "{value} v",
        fontSize: 14,
        offsetCenter: [0, "70%"],
      },
      data: [
        {
          value: 8,
        },
      ],
    },
  ],
});
// 1초마다 랜덤값 생성
const updateValue = () => {
  option.value.series[0].data[0].value = Math.floor(Math.random() * 10) + 8;
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});
</script>

<style scoped>
.chart {
  height: 25vh;
  padding: 5px;
}
body {
  margin: 0;
}
</style>
