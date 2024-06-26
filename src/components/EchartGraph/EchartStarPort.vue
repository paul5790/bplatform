<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
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
  starport: String,
  name: String,
});

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
      fontSize: 14,
      color: textColor.value,
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
        interval: 10,
      },
      axisLabel: {
        color: "inherit",
        distance: 20,
        fontSize: 10,
        formatter: function (value) {
          if (value === -50) {
            return "PORT";
          }
          if (value === 50) {
            return "STBD";
          }
          if (value < 50 && value > -50) {
            return value;
          }

        },
      },
      type: "gauge",
      detail: {
        valueAnimation: true,
        formatter: function (value) {
          return isNullValue.value ? "NaN" : value;
        },
        color: "inherit",
        fontSize: 14,
      },
      data: [
        {
          value: 0,
        },
      ],
    },
  ],
});

const isNullValue = ref(false);
const updateDetailColor = () => {
  option.value.series[0].detail.color = isNullValue.value ? "Black" : "inherit";
};

const updateValue = () => {
  if (isNaN(props.starport) || props.starport === undefined) {
    option.value.series[0].data[0].value = 0;
    isNullValue.value = true;
  } else {
    option.value.series[0].data[0].value = props.starport;
    isNullValue.value = false;
  }
  updateDetailColor();
};

watch(() => props.starport, updateValue);

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
