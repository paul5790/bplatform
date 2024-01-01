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
import { darkText, lightText } from "../../color/color.js";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const textColor = ref(themeMode.value === "light" ? lightText : darkText);
watch(themeMode, (newValue) => {
  textColor.value = newValue === "light" ? lightText : darkText;
});

const props = defineProps({
  // #2 props 정의
  value: Number,
  barWidth: Number,
  name: String,
});

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
    text: props.name,
    left: "center",
    textStyle: {
      fontSize: 10, // 폰트 크기 설정
      color: textColor.value,
    },
  },
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: 450,
      center: ["50%", "50%"],
      radius: "75%",
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
        length: "45%",
        width: 3,
        offsetCenter: [0, 0],
        itemStyle: {
          color: "auto",
        },
      },
      axisTick: {
        distance: 5,
        length: 4,
        lineStyle: {
          color: "auto",
          width: 0.7,
        },
      },
      splitLine: {
        distance: 5,
        length: 5,
        lineStyle: {
          color: "auto",
          width: 2,
        },
      },
      axisLabel: {
        show: false,
        color: textColor.value,
        fontSize: 7,
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
        fontSize: 10,
        // formatter: function () {
        //   return `${windspeed.value} m/s`;
        // },
        formatter: function (value) {
          return `degree: ${value} °`;
        },
        offsetCenter: ["0%", "115%"],
        valueAnimation: true,
                textStyle: {
          color: textColor.value, // 텍스트 컬러 설정
        },
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
  padding: 7px;
}
body {
  margin: 0;
}
</style>
