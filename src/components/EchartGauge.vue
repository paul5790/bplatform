<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts'; // GaugeChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

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
    text: 'SPEEDLOG',
    left: 'center',
  },
  tooltip: {
    formatter: '{a} <br/>{b} : {c} km/s',
  },
  series: [
    {
      name: 'SPEEDLOG',
      type: 'gauge', // gauge 타입 사용
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} km/s',
      },
      data: [
        {
          value: 50,
          name: 'SPEEDK',
        },
      ],
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
