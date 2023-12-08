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
import { ref, provide, onMounted, defineProps, computed } from "vue";

const props = defineProps({
  // #2 props 정의
  name: String,
  value: String,
  unit: String,
  max_value: Number,
  height: Number,
});

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
    text: props.name,
    left: "center",
    textStyle: {
      fontSize: 10, // 폰트 크기 설정
    },
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} km/s",
  },
  series: [
    {
      name: props.name,
      type: "gauge", // gauge 타입 사용
      radius: "90%",
      center: ["50%", "65%"],
      splitNumber: 5,
      min: 0,
      max: props.max_value,
      axisLine: {
        lineStyle: {
          width: 7,
          // color: [
          //   [0.875, "#00609a20"],
          //   [1, "#ca706040"],
          // ],
        },
      },
      progress: {
        show: true,
        width: 7,
      },
      pointer: {
        length: "40%",
        width: 2,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        length: 6,
        lineStyle: {
          width: 2,
        },
      },
      axisLabel: {
        distance: 10,
        fontSize: 9,
      },
      detail: {
        valueAnimation: true,
        formatter: `{value} ${props.unit}`,
        fontSize: 12,
        offsetCenter: [0, "70%"],
      },
      data: [
        {
          value: props.value,
        },
      ],
    },
  ],
});
// 1초마다 랜덤값 생성
const updateValue = () => {
  if (isNaN(props.value) || props.value === undefined) {
    option.value.series[0].data[0].value = null;
  } else {
    if (props.value <= 0) {
      option.value.series[0].data[0].value = 0;
    } else {
      option.value.series[0].data[0].value = props.value;
    }
  }
};



onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});

const chartHeight = computed(() => `${props.height}vh`);
</script>

<style scoped>
.chart {
  height: 17vh;
  padding: 5px;
}

:root {
  --chart-height: {{ chartHeight }};
}

body {
  margin: 0;
}
</style>
