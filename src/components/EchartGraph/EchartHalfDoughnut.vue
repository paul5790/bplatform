<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const option = ref({
  title: {
    text: "저장 가능 공간 및 저장된 공간",
    left: "left",
    textStyle: {
      fontSize: 14, // 폰트 크기 설정
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
    legend: {
    orient: 'vertical',  // 수직 방향으로 표시
    top: 'middle',       // 수직 정렬을 중앙으로 설정
    right: '10%',  
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: ["40%", "70%"],
      center: ['35%', '70%'], // 이 부분을 수정하여 위치 조절
      startAngle: 180,
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      },
      data: [
        { value: 1048, name: "저장된 공간" },
        { value: 735, name: "저장 가능 공간" },
        {
          // make an record to fill the bottom 50%
          value: 1048 + 735,
          itemStyle: {
            // stop the chart from rendering this piece
            color: "none",
            decal: {
              symbol: "none",
            },
          },
          label: {
            show: false,
          },
        },
      ],
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 45vh;
}
body {
  margin: 0;
}
</style>
