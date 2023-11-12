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
import { ref, provide, onMounted } from "vue";

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const maxvalue = ref(1011);

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
    formatter: "{b} : {c} MB",
  },
  series: [
    {
      type: "gauge",
      legend: {
        data: ["사용중인 공간"], // 레전드에 표시할 항목 이름
      },
      radius: "90%",
      center: ["45%", "80%"], // 이 부분을 수정하여 위치 조절
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: maxvalue,
      label: {
        show: false,
      },
      progress: {
        show: true,
        width: 40,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 40,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },

      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: false,
        width: "60%",
        borderRadius: 8,
        offsetCenter: [0, "-5%"],
        fontSize: 30,
        fontWeight: "bolder",
        formatter: function (value) {
          const percent = (value / maxvalue.value) * 100;
          return `${percent.toFixed(1)} %`;
        },
        color: "inherit",
      },
      data: [
        {
          value: 550,
          name: "사용중인 공간",
        },
      ],
    },
  ],
});

// 1초마다 랜덤값 생성
const updateValue = () => {
  option.value.series[0].data[0].value = Math.floor(Math.random() * 1001);
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
