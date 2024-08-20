<template>
  <div class="autocomplete-container">
    <v-sheet style="width: 120px; height: 3vh"></v-sheet>
    <v-chart class="chart" :option="option" autoresize />
  </div>
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
import { serverStorage } from "../../api/index.js";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

import { themeMode, themeConfig } from "@/utils/theme.js";

const { textColor } = themeConfig;

const tokenid = ref(sessionStorage.getItem("token") || "");

const serverInUsedSize = ref(0);
const dbSize = ref(0);
const serverRemainingSize = ref(0);
const serverInUsedSizeText = ref("");
const dbSizeText = ref("");
const serverRemainingSizeText = ref("");

const fetchData = async () => {
  try {
    // const response = await serverStorage(tokenid.value);
    // console.log(`${parseFloat(response.serverInUsedSize)} serversize`);
    // console.log(`${parseFloat(response.dbSize)} serversize`);
    // console.log(`${parseFloat(response.serverRemainingSize)} serversize`);

    // serverInUsedSize.value = parseFloat(response.serverInUsedSize).toFixed(2);
    // dbSize.value = parseFloat(response.dbSize).toFixed(2);
    // serverRemainingSize.value = parseFloat(
    //   response.serverRemainingSize
    // ).toFixed(2);

    serverInUsedSize.value = 88.88;
    dbSize.value = 12.35;
    serverRemainingSize.value = 155.23;

  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchData();
});

const totalSize = computed(() => {
  const size = 
    parseFloat(serverInUsedSize.value) +
    parseFloat(dbSize.value) +
    parseFloat(serverRemainingSize.value);

  return parseFloat(size.toFixed(2));
});

provide(THEME_KEY);
const option = ref({
  title: {
    text: `서버 저장 공간 현황 (${totalSize.value}GB)`,
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
      color: textColor.value,
    },
  },
  tooltip: {
    trigger: "item",
    formatter: `{b} / ${totalSize.value}GB`,
  },
  legend: {
    orient: "vertical", // 수직 방향으로 표시
    top: "15%", // 수직 정렬을 중앙으로 설정
    right: "0%",
    textStyle: {
      color: textColor.value, // 텍스트 컬러 설정
    },
  },
  series: [
    {
      type: "pie",
      radius: ["55%", "85%"],
      center: ["50%", "85%"], // 이 부분을 수정하여 위치 조절
      startAngle: 180,
      endAngle: 0,
      label: {
        show: false,
      },
      data: [
        {
          value: serverInUsedSize,
          name: `OS 및 기타 : ${serverInUsedSizeText.value}`,
          itemStyle: { color: "#E0E0E0" },
        },
        {
          value: dbSize,
          name: `DB 사용량 : ${dbSizeText.value}`,
          itemStyle: { color: "#43A047" },
        },
        {
          value: serverRemainingSize,
          name: `사용 가능한 공간 : ${serverRemainingSizeText.value}`,
          itemStyle: { color: "#D0E0D0" },
        },
        // {
        //   value: totalSize.value,
        //   itemStyle: {
        //     color: "none",
        //     decal: {
        //       symbol: "none",
        //     },
        //   },
        //   label: {
        //     show: false,
        //   },
        //   name: `전체 용량 : ${totalSize.value}GB`,
        // },
      ],
    },
  ],
});

// 데이터 변경 감지하여 차트 업데이트
watch([serverInUsedSize, dbSize, serverRemainingSize], () => {
  

  let titleText = "";
  if (totalSize.value > 1024) {
    titleText = `${(totalSize.value / 1024).toFixed(2)}TB`;
  } else {
    titleText = `${totalSize.value}GB`;
  }

  if (serverInUsedSize.value > 1024) {
    serverInUsedSizeText.value = `${(serverInUsedSize.value / 1024).toFixed(2)}TB`;
  } else {
    serverInUsedSizeText.value = `${serverInUsedSize.value}GB`;
  }

  if (dbSize.value > 1024) {
    dbSizeText.value = `${(dbSize.value / 1024).toFixed(2)}TB`;
  } else {
    dbSizeText.value = `${dbSize.value}GB`;
  }

  if (serverRemainingSize.value > 1024) {
    serverRemainingSizeText.value = `${(serverRemainingSize.value / 1024).toFixed(2)}TB`;
  } else {
    serverRemainingSizeText.value = `${serverRemainingSize.value}GB`;
  }


  option.value.title.text = `서버 저장 공간 현황 (${titleText})`;
  option.value.tooltip = {
    trigger: "item",
    formatter: function (params) {
      // params.value는 {b}에 해당하는 값입니다.
      // 이 값을 2배로 곱한 값을 표시합니다.
      return `${params.name}  (${(
        (params.value / totalSize.value) *
        100
      ).toFixed(1)}%)`;
    },
  };
  if (serverInUsedSize.value + dbSize.value > serverRemainingSize.value * 4) {
    option.value.series[0].data = [
      {
        value: serverInUsedSize.value,
        name: `OS 및 기타 : ${serverInUsedSizeText.value}`,
        itemStyle: { color: "#E0E0E0" },
      },
      {
        value: dbSize.value,
        name: `DB 사용량 : ${dbSizeText.value}`,
        itemStyle: { color: "#CC0033" },
      },
      {
        value: serverRemainingSize.value,
        name: `사용 가능한 공간 : ${serverRemainingSizeText.value}`,
        itemStyle: { color: "#FF6666" },
      },
      // {
      //   value: totalSize.value,
      //   itemStyle: {
      //     color: "none",
      //     decal: {
      //       symbol: "none",
      //     },
      //   },
      //   label: {
      //     show: false,
      //   },
      //   name: `전체 용량 : ${totalSize.value.toFixed(2)}GB`,
      // },
    ];
  } else {
    option.value.series[0].data = [
      {
        value: serverInUsedSize.value,
        name: `OS 및 기타 : ${serverInUsedSizeText.value}`,
        itemStyle: { color: "#E0E0E0" },
      },
      {
        value: dbSize.value,
        name: `DB 사용량 : ${dbSizeText.value}`,
        itemStyle: { color: "#43A047" },
      },
      {
        value: serverRemainingSize.value,
        name: `사용 가능한 공간 : ${serverRemainingSizeText.value}`,
        itemStyle: { color: "#E1F3DD" },
      },
      // {
      //   value: totalSize.value,
      //   itemStyle: {
      //     color: "none",
      //     decal: {
      //       symbol: "none",
      //     },
      //   },
      //   label: {
      //     show: false,
      //   },
      //   name: `전체 용량: ${totalSize.value.toFixed(2)}GB`,
      // },
    ];
  }
});
</script>

<style scoped>
.chart {
  height: 45vh;
}
body {
  margin: 0;
}
.autocomplete-container {
  position: relative;
}
</style>
