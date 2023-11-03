<template>
  <v-sheet :elevation="elevation">
    <v-chart
      ref="chart"
      class="chart"
      :option="option"
      autoresize
      @click="handleChartClick"
    />
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
    text: "데이터 소실빈도",
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
      "ANEMOMETER",
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
        groupId: "DGPS",
      },
      {
        value: 12,
        groupId: "GYRO",
      },
      {
        value: 44,
        groupId: "ANEMOMETER",
      },
      {
        value: 48,
        groupId: "RADAR",
      },
      {
        value: 25,
        groupId: "AIS",
      },
      {
        value: 45,
        groupId: "ECDIS",
      },
      {
        value: 48,
        groupId: "AUTOPILOT",
      },
      {
        value: 27,
        groupId: "SPEEDLOG",
      },
      {
        value: 48,
        groupId: "NO.1ENGINE",
      },
      {
        value: 48,
        groupId: "NO.2ENGINE",
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
    dataGroupId: "DGPS",
    data: [
      ["GLL", 4],
      ["GGA", 2],
      ["RMC", 1],
      ["VTG", 2],
      ["ZDA", 1],
      ["GSV", 2],
      ["GSA", 1],
    ],
  },
    {
    dataGroupId: "GYRO",
    data: [
      ["THS", 4],
      ["HDT", 2],
      ["ROT", 1],
    ],
  },
    {
    dataGroupId: "ANEMOMETER",
    data: [
      ["MWV", 4],
      ["MTW", 2],
    ],
  },
    {
    dataGroupId: "RADAR",
    data: [
      ["GLL", 4],
      ["GGA", 2],
      ["RMC", 1],
      ["VTG", 2],
      ["ZDA", 1],
      ["GSV", 2],
      ["GSA", 1],
    ],
  },
    {
    dataGroupId: "AIS",
    data: [
      ["VDM", 4],
      ["VDO", 2],
    ],
  },
    {
    dataGroupId: "ECDIS",
    data: [
      ["ROUTEINFO", 4],
      ["WAYPOINTS", 2],
    ],
  },
    {
    dataGroupId: "AUTOPILOT",
    data: [
      ["RSA", 4],
      ["HTD", 2],
    ],
  },
    {
    dataGroupId: "SPEEDLOG",
    data: [
      ["VBW", 4],
      ["VHW", 2],
      ["VLW", 1],
    ],
  },
    {
    dataGroupId: "NO.1ENGINE",
    data: [
      ["NO.1ENGINE_PANEL_61444", 4],
      ["NO.1ENGINE_PANEL_65262", 2],
      ["NO.1ENGINE_PANEL_65263", 1],
      ["NO.1ENGINE_PANEL_65272", 2],
      ["NO.1ENGINE_PANEL_65271", 1],
      ["NO.1ENGINE_PANEL_65253", 2],
      ["NO.1ENGINE_PANEL_65270", 1],
      ["NO.1ENGINE_PANEL_65276", 4],
      ["NO.1ENGINE_PANEL_65360", 2],
      ["NO.1ENGINE_PANEL_65361_LAMP", 1],
      ["NO.1ENGINE_PANEL_65361_STATUS", 2],
      ["NO.1ENGINE_PANEL_65378", 1],
      ["NO.1ENGINE_PANEL_65376", 2],
      ["NO.1ENGINE_PANEL_65379", 1],
    ],
  },
    {
    dataGroupId: "NO.2ENGINE",
    data: [
      ["NO.1ENGINE_PANEL_61444", 4],
      ["NO.1ENGINE_PANEL_65262", 2],
      ["NO.1ENGINE_PANEL_65263", 1],
      ["NO.1ENGINE_PANEL_65272", 2],
      ["NO.1ENGINE_PANEL_65271", 1],
      ["NO.1ENGINE_PANEL_65253", 2],
      ["NO.1ENGINE_PANEL_65270", 1],
      ["NO.1ENGINE_PANEL_65276", 4],
      ["NO.1ENGINE_PANEL_65360", 2],
      ["NO.1ENGINE_PANEL_65361_LAMP", 1],
      ["NO.1ENGINE_PANEL_65361_STATUS", 2],
      ["NO.1ENGINE_PANEL_65378", 1],
      ["NO.1ENGINE_PANEL_65376", 2],
      ["NO.1ENGINE_PANEL_65379", 1],
    ],
  },
  // 다른 drilldown 데이터도 추가
];

// 그래프 클릭 이벤트 핸들러
const handleChartClick = (event) => {
  if (event.data) {
    // 클릭된 데이터에 대한 하위 데이터 검색
    const subData = drilldownData.find(
      (data) => data.dataGroupId === event.data.groupId
    );
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
                    "ANEMOMETER",
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
                      groupId: "DGPS",
                    },
                    {
                      value: 12,
                      groupId: "GYRO",
                    },
                    {
                      value: 44,
                      groupId: "ANEMOMETER",
                    },
                    {
                      value: 48,
                      groupId: "RADAR",
                    },
                    {
                      value: 25,
                      groupId: "AIS",
                    },
                    {
                      value: 45,
                      groupId: "ECDIS",
                    },
                    {
                      value: 48,
                      groupId: "AUTOPILOT",
                    },
                    {
                      value: 27,
                      groupId: "SPEEDLOG",
                    },
                    {
                      value: 48,
                      groupId: "NO.1ENGINE",
                    },
                    {
                      value: 48,
                      groupId: "NO.2ENGINE",
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
