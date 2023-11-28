<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup props="props">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart } from "echarts/charts"; // GaugeChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted,defineProps } from "vue";

const props = defineProps({
  // #2 props 정의
  star: Number,
  port: Number,
});

const starValue = ref();
const portValue = ref();

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
    text: "Rudder(AUTOPILOT)",
    left: "left",
    textStyle: {
      fontSize: 14, // 폰트 크기 설정
    },
  },
  series: [
    {
      max: 50,
      min: -50,
      center: ["50%", "45%"],
      axisLine: {
        lineStyle: {
          width: 12,
          color: [
            [0.5, "#20d25a"],
            [1, "#ed060d"],
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
        distance: -12,
        length: 5,
        lineStyle: {
          color: "#fff",
          width: 1,
        },
      },
      splitLine: {
        distance: -10,
        length: 10,
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
  if (props.star > 0) {
    portValue.value = 0;
    option.value.series[0].data[0].value = props.star;
  }
  else if (props.port > 0) {
    starValue.value = 0;
    option.value.series[0].data[0].value = props.port;
  }
  else {
    option.value.series[0].data[0].value = 0;
  }
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
