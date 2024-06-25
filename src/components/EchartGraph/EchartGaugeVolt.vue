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
import { ref, provide, onMounted, defineProps, watch } from "vue";

import { themeMode, themeConfig } from "@/utils/theme.js";

const { textColor } = themeConfig;

const props = defineProps({
  // #2 props 정의
  name: String,
  value: String,
  unit: String,
  max_value: Number,
  height: String,
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
      color: textColor.value,
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
      center: ["50%", "60%"],
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
        color: textColor.value,
      },
      detail: {
        valueAnimation: true,
        formatter: `{value} ${props.unit}`,
        fontSize: 12,
        textStyle: {
          color: textColor.value, // 텍스트 컬러 설정
        },
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
</script>

<style scoped>
.chart {
  padding: 5px;
}

:root {
  --chart-height: {{ chartHeight }};
}

body {
  margin: 0;
}
</style>
