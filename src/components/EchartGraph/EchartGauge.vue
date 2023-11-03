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
import { ref, provide , onMounted } from 'vue';

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
      center: ["50%", "60%"],
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} km/s',
        fontSize: 14,
      },
      data: [
        {
          value: 50,
        },
      ],
    },
  ],
});
// 1초마다 랜덤값 생성
const updateValue = () => {
  option.value.series[0].data[0].value = Math.floor(Math.random() * 101);
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});
</script>

<style scoped>
.chart {
  height: 45vh;
  padding: 5px;
}
body {
  margin: 0;
}
</style>
