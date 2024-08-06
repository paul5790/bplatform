<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup props="props">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted, defineProps, watch } from "vue";
import { themeMode, themeConfig } from "@/utils/theme.js";

const { textColor } = themeConfig;

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const props = defineProps({
  name: String,
  left: String,
  unit: String,
  center_y: String,
  max_value: Number,
  min_value: Number,
  splitNumber: Number,
  value: Number,
});

const option = ref({
  title: {
    text: props.name,
    left: props.left,
    top: "2%", // 제목을 아래로 이동
    textStyle: {
      fontSize: 12, 
      color: textColor.value,
    },
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} km/s",
  },
  series: [
    {
      name: "SPEEDLOG",
      min: props.min_value,
      max: props.max_value,
      splitNumber: props.splitNumber, // 분할 수를 줄여 눈금을 덜 촘촘하게 만듭니다
      type: "gauge",
      center: ["50%", `${props.center_y}`],
      pointer: {
        offsetCenter: [0, "0%"],
        length: "50%",
        width: 3,
      },
      progress: {
        show: true,
      },
      splitLine: {
        length: 8,
        lineStyle: {
          width: 2,
        },
      },
      axisTick: {
        distance: 10,
        length: 4,
        
        lineStyle: {
          width: 0.7,
        },
      },
      detail: {
        valueAnimation: true,
        formatter: `{value} ${props.unit}`,
        fontSize: 14,
        textStyle: {
          color: textColor.value,
        },
        offsetCenter: [0, "70%"],
      },
      axisLabel: {
        color: textColor.value,
      },
      data: [
        {
          value: 50,
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

watch(
  () => [props.min_value, props.max_value],
  ([newMin, newMax]) => {
    option.value.series[0].min = newMin;
    option.value.series[0].max = newMax;
  }
);

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});
</script>

<style scoped>
.chart {
  height: 40vh;
}
body {
  margin: 0;
}
</style>
