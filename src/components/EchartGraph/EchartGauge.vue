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
import { darkText, lightText } from "../../color/color.js";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const textColor = ref(themeMode.value === "light" ? lightText : darkText);
watch(themeMode, (newValue) => {
  textColor.value = newValue === "light" ? lightText : darkText;
});

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
  max_speed: Number,
  value: Number,
});

const option = ref({
  title: {
    text: props.name,
    left: props.left,
    textStyle: {
      fontSize: 14, 
      color: textColor.value,
    },
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} km/s",
  },
  series: [
    {
      name: "SPEEDLOG",
      min: 0,
      max: props.max_speed,
      type: "gauge",
      center: ["50%", `${props.center_y}`],
      pointer: {
        offsetCenter: [0, "0%"],
        length: "50%",
        width: 5,
      },
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: `{value} ${props.unit}`,
        fontSize: 14,
        textStyle: {
          color: textColor.value,
        },
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
