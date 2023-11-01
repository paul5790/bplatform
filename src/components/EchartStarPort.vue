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
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  GaugeChart, // GaugeChart로 변경
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const option = ref({
  title: {
    text: "타각",
    left: "center",
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} km/s",
  },
  series: [
    {
      max: 80,
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.5, "#50d28a"],
            [1, "#fd666d"],
          ],
        },
      },
      pointer: {
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: "#fff",
          width: 2,
        },
        splitNumber: 7
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: "#fff",
          width: 4,
        },
      },
      axisLabel: {
        color: "inherit",
        distance: 40,
        fontSize: 20,
      },
      type: "gauge", // gauge 타입 사용
      detail: {
        valueAnimation: true,
        formatter: '{value} km/h',
        color: 'inherit'
      },
      data: [
        {
          value: 70
        },
      ],
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
