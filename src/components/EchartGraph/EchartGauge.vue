<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup props="props">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts'; // GaugeChart로 변경
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide , onMounted, defineProps } from 'vue';

use([
  CanvasRenderer,
  GaugeChart, // GaugeChart로 변경
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const props = defineProps({  // #2 props 정의
  name: String,
  left: String,
  unit: String,
  center_y: String,
});


const option = ref({
  title: {
    text: props.name,
    left: props.left,
        textStyle: {
      fontSize: 14, // 폰트 크기 설정
    },
  },
  tooltip: {
    formatter: '{a} <br/>{b} : {c} km/s',
  },
  series: [
    {
      name: 'SPEEDLOG',
      type: 'gauge', // gauge 타입 사용
      center: ["50%", `${props.center_y}`],
      progress: {
        show: true,
      },
      detail: {
        valueAnimation: true,
        formatter: `{value} ${props.unit}`,
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
