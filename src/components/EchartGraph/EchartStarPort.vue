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
  title: {
    text: "타각",
    left: "center",
  },
  series: [
    {
      max: 50,
      min: -50,
      center: ["50%", "45%"],
      axisLine: {
        lineStyle: {
          width: 20,
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
        width: 5,
        length: "60%",
      },
      axisTick: {
        distance: -20,
        length: 5,
        lineStyle: {
          color: "#fff",
          width: 1,
        },
      },
      splitLine: {
        distance: -20,
        length: 30,
        lineStyle: {
          color: "#fff",
          width: 2,
        },
        interval: 10, // 수정: 눈금 간격을 10으로 설정
      },
      axisLabel: {
        color: "inherit",
        distance: 20,
        fontSize: 10,
        formatter: function (value) {
          if (value === -50) {
            return 'PORT';
          }
          if (value === 50) {
            return 'STBD';
          } 
          if (value < 50 || value > -50) {
            return value;
          }
        },
      },
      type: "gauge", // gauge 타입 사용
      detail: {
        valueAnimation: true,
        formatter: "{value}",
        color: "inherit",
        fontSize: 14,
      },
      data: [
        {
          value: -10,
        },
      ],
    },
  ],
});

// 1초마다 랜덤값 생성
const updateValue = () => {
  option.value.series[0].data[0].value = Math.floor(Math.random() * 101) - 50;
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});

</script>

<style scoped>
.chart {
  height: 55vh;
  padding: 0px;
}
body {
  margin: 0;
}
</style>