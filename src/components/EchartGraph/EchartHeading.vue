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

const windspeed = ref(0);

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
    text: "Heading(GYRO)",
    left: "left",
    textStyle: {
      fontSize: 14, // 폰트 크기 설정
    },
  },
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: 450,
      center: ["50%", "40%"],
      radius: "68%",
      splitNumber: 8,
      min: 0,
      max: 360,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.125, "#ca7060"],
            [0.375, "#dada90"],
            [0.625, "#78A9D9"],
            [0.875, "#3CbF92"],
            [1, "#ca7060"],
          ],
        },
      },
      pointer: {
        length: "70%",
        width: 7,
        offsetCenter: [0, 0],
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        length: 7,
        lineStyle: {
          color: "auto",
          width: 1.5,
        },
      },
      splitLine: {
        length: 12,
        lineStyle: {
          color: "auto",
          width: 3,
        },
      },
      axisLabel: {
        color: "#464646",
        fontSize: 15,
        distance: -35,
        rotate: "tangential",
        formatter: function (value) {
          if (value === 90) {
            return "E";
          } else if (value === 180) {
            return "S";
          } else if (value === 270) {
            return "W";
          } else if (value === 360) {
            return "  N (0°)";
          }
          return "";
        },
      },
      detail: {
        fontSize: 15,
        // formatter: function () {
        //   return `${windspeed.value} m/s`;
        // },
        formatter: function (value) {
          return `degree: ${value} °`;
        },
        offsetCenter: ["100%", "100%"],
        valueAnimation: true,
        color: "#464646",
      },
      data: [
        {
          value: 0,
          color: "inherit",
        },
      ],
    },
  ],
});

// 1초마다 랜덤값 생성
const updateValue = () => {
  option.value.series[0].data[0].value = Math.floor(Math.random() * 361);
  windspeed.value = Math.floor(Math.random() * 101);
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});
</script>

<style scoped>
.chart {
  height: 40vh;
  padding: 0px;
}
body {
  margin: 0;
}
</style>
