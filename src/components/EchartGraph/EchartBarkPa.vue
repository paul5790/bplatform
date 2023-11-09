<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup props="props">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts"; // BarChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted, defineProps } from "vue";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY);

const props = defineProps({
  name: String,
  barWidth: Number
});

const data = ref([]);

const option = ref({
  xAxis: {
    max: "dataMax",
  },
  yAxis: {
    type: "category",
    data: ["Engine\nOil   ", "Trans  \nmission\nOil    ", "Engine \nintake  \nManifold\nOil     "],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
  },
  series: [
    {
      realtimeSort: true,
      name: props.name, // Use the name prop from the parent
      barWidth: props.barWidth, // Use the barWidth prop from the parent
      type: "bar",
      data: data.value,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
    },
  ],
  legend: {
    show: true,
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
});

const run = () => {
  for (let i = 0; i < data.value.length; ++i) {
    if (Math.random() > 0.9) {
      data.value[i] = Math.round(Math.random() * 2000);
    } else {
      data.value[i] = Math.round(Math.random() * 200);
    }
  }
};

onMounted(() => {
  for (let i = 0; i < 3; ++i) {
    data.value.push(Math.round(Math.random() * 200));
  }

  setInterval(() => {
    run();
  }, 200);

  run();
});
</script>

<style scoped>
.chart {
  height: 47.5vh;
  padding: 10px;
}
body {
  margin: 0;
}
</style>
