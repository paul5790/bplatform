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
import { ref, provide, computed, onMounted, watch } from "vue";
import axios from "axios";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const serverInUsedSize = ref(0);
const dbSize = ref(0);
const serverRemainingSize = ref(0);

const fetchData = async () => {
  try {
    const response = await axios.post(
      "http://192.168.0.73:8080/info/storage/db"
    );
    console.log(`${parseFloat(response.data.serverInUsedSize)} serversize`);
    console.log(`${parseFloat(response.data.dbSize)} serversize`);
    console.log(`${parseFloat(response.data.serverRemainingSize)} serversize`);

    serverInUsedSize.value = parseFloat(response.data.serverInUsedSize).toFixed(
      2
    );
    dbSize.value = parseFloat(response.data.dbSize).toFixed(2);
    serverRemainingSize.value = parseFloat(
      response.data.serverRemainingSize
    ).toFixed(2);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchData();
});

const totalSize = computed(() => {
  return (
    parseFloat(serverInUsedSize.value) +
    parseFloat(dbSize.value) +
    parseFloat(serverRemainingSize.value)
  );
});

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
    formatter: "{b}",
  },
  legend: {
    orient: "vertical", // 수직 방향으로 표시
    top: "15%", // 수직 정렬을 중앙으로 설정
    right: "0%",
  },
  series: [
    {
      type: "pie",
      radius: ["55%", "85%"],
      center: ["40%", "70%"], // 이 부분을 수정하여 위치 조절
      startAngle: 180,
      label: {
        show: false,
      },
      data: [
        {
          value: serverInUsedSize,
          name: `타 프로그램 용량: ${serverInUsedSize.value}GB`,
          label: {
            show: false,
          },
        },
        { value: dbSize, name: `DB 사용량: ${dbSize.value}GB` },
        {
          value: serverRemainingSize,
          name: `사용 가능한 공간: ${serverRemainingSize.value}GB`,
        },
        {
          // make an record to fill the bottom 50%
          value: totalSize.value,
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
          name: `전체 용량: ${totalSize.value}GB`,
        },
      ],
    },
  ],
});

// 데이터 변경 감지하여 차트 업데이트
watch([serverInUsedSize, dbSize, serverRemainingSize], () => {
  option.value.series[0].data = [
    {
      value: serverInUsedSize.value,
      name: `타 프로그램 용량: ${serverInUsedSize.value}GB`,
    },
    { value: dbSize.value, name: `DB 사용량: ${dbSize.value}GB` },
    {
      value: serverRemainingSize.value,
      name: `사용 가능한 공간: ${serverRemainingSize.value}GB`,
    },
    {
      value: totalSize.value,
      itemStyle: {
        color: "none",
        decal: {
          symbol: "none",
        },
      },
      label: {
        show: false,
      },
      name: `전체 용량: ${totalSize.value.toFixed(2)}GB`,
    },
  ];
});

// console.log(serverInUsedSize.value);
// console.log(dbSize.value);
// console.log(serverRemainingSize.value);
</script>

<style scoped>
.chart {
  height: 45vh;
}
body {
  margin: 0;
}
</style>
