<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts'; // BarChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
  CanvasRenderer,
  BarChart, // BarChart로 변경
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY);

const option = ref({
  title: {
    text: '바그래프',
    left: 'center',
  },
  tooltip: {
    formatter: '{a} <br/>{b} : {c} mb',
  },
  xAxis: {
    data: ['시운전1', '시운전2', '시운전3'],
  },
  yAxis: {},
  series: [
    {
      name: '바바',
      type: 'bar', // bar 타입 사용
      data: [30, 27, 44],
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
body {
  margin: 0;
}
</style>
