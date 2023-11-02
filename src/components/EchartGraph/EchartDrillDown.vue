<template>
  <v-sheet :elevation="elevation">
    <v-chart ref="chart" class="chart" :option="option" autoresize @click="handleChartClick" />
  </v-sheet>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GraphicComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GraphicComponent,
]);

provide(THEME_KEY);

const chart = ref(null);

// 초기 그래프 옵션 설정
const option = ref({
  title: {
    text: "데이터 수집기능",
    left: "left",
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c} mb",
  },
  xAxis: {
    type: "category",
    axisLabel: { interval: 0, rotate: 20, align: "center", margin: 30 },
    data: [
      "DGPS",
      "GYRO",
      "ANEMO",
      "RADAR",
      "AIS",
      "ECDIS",
      "AUTOPILOT",
      "SPEEDLOG",
      "NO.1ENGINE",
      "NO.2ENGINE",
    ],
  },
  yAxis: {},
  dataGroupId: "",
  animationDurationUpdate: 500,
  series: {
    name: "바바",
    type: "bar",
    id: "sales",
    data: [
      {
        value: 48,
        groupId: "animals",
      },
      {
        value: 12,
        groupId: "fruits",
      },
      {
        value: 44,
        groupId: "cars",
      },
      {
        value: 48,
        groupId: "animals1",
      },
      {
        value: 25,
        groupId: "fruits1",
      },
      {
        value: 45,
        groupId: "cars1",
      },
      {
        value: 48,
        groupId: "animals2",
      },
      {
        value: 27,
        groupId: "fruits2",
      },
      {
        value: 48,
        groupId: "cars2",
      },
      // 다른 데이터도 추가 가능
    ],
    universalTransition: {
      enabled: true,
      divideShape: "clone",
    },
  },
});

// 하위 그래프 데이터
const drilldownData = [
  {
    dataGroupId: "animals",
    data: [
      ["Cats", 4],
      ["Dogs", 2],
      ["Cows", 1],
      ["Sheep", 2],
      ["Pigs", 1],
    ],
  },
  // 다른 drilldown 데이터도 추가
];

// 그래프 클릭 이벤트 핸들러
const handleChartClick = (event) => {
  if (event.data) {
    // 클릭된 데이터에 대한 하위 데이터 검색
    const subData = drilldownData.find((data) => data.dataGroupId === event.data.groupId);
    if (subData) {
      const xAxisData = subData.data.map((item) => item[0]);
      const seriesData = subData.data.map((item) => item[1]);

      // 클릭된 데이터에 대한 새로운 그래프 옵션 설정
      const updatedOption = {
        xAxis: {
          data: xAxisData,
        },
        series: {
          type: "bar",
          id: "sales",
          dataGroupId: subData.dataGroupId,
          data: seriesData,
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
        },
        graphic: [
          {
            type: "text",
            left: 50,
            top: 20,
            style: {
              text: "Back",
              fontSize: 18,
            },
            onclick: () => {
              // 'Back' 버튼 클릭 시 최상위 그래프로 이동하는 옵션 설정
              const backToTopOption = {
                xAxis: {
                  data: [
                    "DGPS",
                    "GYRO",
                    "ANEMO",
                    "RADAR",
                    "AIS",
                    "ECDIS",
                    "AUTOPILOT",
                    "SPEEDLOG",
                    "NO.1ENGINE",
                    "NO.2ENGINE",
                  ],
                },
                series: {
                  type: "bar",
                  id: "sales",
                  dataGroupId: "",
                  data: [
                    {
                      value: 48,
                      groupId: "animals",
                    },
                    {
                      value: 12,
                      groupId: "fruits",
                    },
                    {
                      value: 44,
                      groupId: "cars",
                    },
                    {
                      value: 48,
                      groupId: "animals1",
                    },
                    {
                      value: 25,
                      groupId: "fruits1",
                    },
                    {
                      value: 45,
                      groupId: "cars1",
                    },
                    {
                      value: 48,
                      groupId: "animals2",
                    },
                    {
                      value: 27,
                      groupId: "fruits2",
                    },
                    {
                      value: 48,
                      groupId: "cars2",
                    },
                    // 다른 데이터도 추가 가능
                  ],
                  universalTransition: {
                    enabled: true,
                    divideShape: "clone",
                  },
                },
              };
              chart.value.setOption(backToTopOption);
            },
          },
        ],
      };

      chart.value.setOption(updatedOption);
    }
  }
};
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
