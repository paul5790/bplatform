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
import axios from "axios";

const maxsize = ref();
const usesize = ref();
// 데이터 받아오기
const fetchData = async () => {
  try {
    const response = await axios.post(
      "http://192.168.0.73:8080/info/storage/db"
    );
    console.log(`${response.data} serversize`);

    maxsize.value = response.data.serverMaximumSize;
    usesize.value = response.data.serverInUsedSize;
    console.log(`${maxsize.value} maxsize.value`);
    console.log(`${usesize.value} usesize.value`);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

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
    text: "저장 가능 공간 및 저장된 공간",
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} MB",
  },

  series: [
    {
      type: "gauge",
      radius: "110%",
      center: ["50%", "80%"], // 이 부분을 수정하여 위치 조절
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: maxsize,
      label: {
        show: false,
      },
      progress: {
        show: true,
        width: 50,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 50,
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
        fontSize: 35,
        fontWeight: "bolder",
        formatter: function (value) {
          const percent = (value / maxsize.value) * 100;
          return `${percent.toFixed(1)} %`;
        },
        color: "inherit",
      },
      data: [
        {
          value: usesize,
          name: "사용중인 공간",
        },
      ],
    },
  ],
});

// 1초마다 랜덤값 생성
// const updateValue = () => {
//   option.value.series[0].data[0].value = Math.floor(Math.random() * 1001);
// };

// onMounted(() => {
//   setInterval(updateValue, 1000);
//   updateValue();
// });
</script>

<style scoped>
.chart {
  height: 40vh;
}
body {
  margin: 0;
}
</style>
