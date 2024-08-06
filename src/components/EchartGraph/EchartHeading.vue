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

const props = defineProps({
  value: Number,
  barWidth: Number,
  name: String,
});

const windspeed = ref(0);

use([
  CanvasRenderer,
  GaugeChart,
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
      fontSize: 12,
      color: textColor.value,
    },
  },
  series: [
    {
      type: "gauge",
      startAngle: 90,
      endAngle: 450,
      center: ["50%", "50%"],
      radius: "67%",
      splitNumber: 8,
      min: 0,
      max: 360,
      axisLine: {
        lineStyle: {
          width: 3,
        },
      },
      pointer: {
        length: "60%",
        width: 3,
        offsetCenter: [0, 0],
      },
      axisTick: {
        distance: 5,
        length: 4,
        lineStyle: {
          width: 0.7,
        },
      },
      splitLine: {
        distance: 5,
        length: 5,
        lineStyle: {
          width: 2,
        },
      },
      axisLabel: {
        show: true,
        color: textColor.value,
        fontSize: 9,
        distance: -17,
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
          } else if (value === 45) {
            return "NE";
          } else if (value === 135) {
            return "NW";
          } else if (value === 225) {
            return "SW";
          } else if (value === 315) {
            return "SE";
          }
          
          return "";
        },
      },
      detail: {
        fontSize: 13,
        // formatter: function () {
        //   return `${windspeed.value} m/s`;
        // },
        formatter: function (value) {
          return `degree: ${value} °`;
        },
        offsetCenter: ["0%", "127%"],
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
  padding: 0px;
  padding-top: 8px;
}
body {
  margin: 0;
}
</style>
