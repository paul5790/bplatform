<template>
  <v-sheet
    :elevation="elevation"
    style="display: flex; flex-direction: column; align-items: center"
  >
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
import { ref, provide, onMounted } from "vue";
import axios from "axios";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GraphicComponent,
]);
const GLL = ref(0);
const GGA = ref(0);
const RMC = ref(0);
const VTG = ref(0);
const ZDA = ref(0);
const DTM = ref(0);
const GSV = ref(0);
const GSA = ref(0);
const THS = ref(0);
const HDT = ref(0);
const ROT = ref(0);
const MWV = ref(0);
const MWD = ref(0);
const VWR = ref(0);
const MTW = ref(0);
const VWT = ref(0);
const TTM = ref(0);
const TLL = ref(0);
const RSCREEN = ref(0);
const VDM = ref(0);
const VDO = ref(0);
const ROUTEINFO = ref(0);
const WAYPOINTS = ref(0);
const ESCREEN = ref(0);
const RSA = ref(0);
const MODE = ref(0);
const HTD = ref(0);
const VBW = ref(0);
const VHW = ref(0);
const VLW = ref(0);
const NO1ENGINE_PANEL_61444 = ref(0);
const NO1ENGINE_PANEL_65262 = ref(0);
const NO1ENGINE_PANEL_65263 = ref(0);
const NO1ENGINE_PANEL_65272 = ref(0);
const NO1ENGINE_PANEL_65271 = ref(0);
const NO1ENGINE_PANEL_65253 = ref(0);
const NO1ENGINE_PANEL_65270 = ref(0);
const NO1ENGINE_PANEL_65276 = ref(0);
const NO1ENGINE_PANEL_65360 = ref(0);
const NO1ENGINE_PANEL_65361_LAMP = ref(0);
const NO1ENGINE_PANEL_65361_STATUS = ref(0);
const NO1ENGINE_PANEL_65378 = ref(0);
const NO1ENGINE_PANEL_65376 = ref(0);
const NO1ENGINE_PANEL_65379 = ref(0);
const NO2ENGINE_PANEL_61444 = ref(0);
const NO2ENGINE_PANEL_65262 = ref(0);
const NO2ENGINE_PANEL_65263 = ref(0);
const NO2ENGINE_PANEL_65272 = ref(0);
const NO2ENGINE_PANEL_65271 = ref(0);
const NO2ENGINE_PANEL_65253 = ref(0);
const NO2ENGINE_PANEL_65270 = ref(0);
const NO2ENGINE_PANEL_65276 = ref(0);
const NO2ENGINE_PANEL_65360 = ref(0);
const NO2ENGINE_PANEL_65361_LAMP = ref(0);
const NO2ENGINE_PANEL_65361_STATUS = ref(0);
const NO2ENGINE_PANEL_65378 = ref(0);
const NO2ENGINE_PANEL_65376 = ref(0);
const NO2ENGINE_PANEL_65379 = ref(0);

const dataRefs = [
  GLL,
  GGA,
  RMC,
  VTG,
  ZDA,
  DTM,
  GSV,
  GSA,
  THS,
  HDT,
  ROT,
  MWV,
  MWD,
  VWR,
  MTW,
  VWT,
  TTM,
  TLL,
  RSCREEN,
  VDM,
  VDO,
  ROUTEINFO,
  WAYPOINTS,
  ESCREEN,
  RSA,
  MODE,
  HTD,
  VBW,
  VHW,
  VLW,
  NO1ENGINE_PANEL_61444,
  NO1ENGINE_PANEL_65262,
  NO1ENGINE_PANEL_65263,
  NO1ENGINE_PANEL_65272,
  NO1ENGINE_PANEL_65271,
  NO1ENGINE_PANEL_65253,
  NO1ENGINE_PANEL_65270,
  NO1ENGINE_PANEL_65276,
  NO1ENGINE_PANEL_65360,
  NO1ENGINE_PANEL_65361_LAMP,
  NO1ENGINE_PANEL_65361_STATUS,
  NO1ENGINE_PANEL_65378,
  NO1ENGINE_PANEL_65376,
  NO1ENGINE_PANEL_65379,
  NO2ENGINE_PANEL_61444,
  NO2ENGINE_PANEL_65262,
  NO2ENGINE_PANEL_65263,
  NO2ENGINE_PANEL_65272,
  NO2ENGINE_PANEL_65271,
  NO2ENGINE_PANEL_65253,
  NO2ENGINE_PANEL_65270,
  NO2ENGINE_PANEL_65276,
  NO2ENGINE_PANEL_65360,
  NO2ENGINE_PANEL_65361_LAMP,
  NO2ENGINE_PANEL_65361_STATUS,
  NO2ENGINE_PANEL_65378,
  NO2ENGINE_PANEL_65376,
  NO2ENGINE_PANEL_65379,
];

const axioslist = ref([
  "dgps/gll",
  "dgps/gga",
  "dgps/rmc",
  "dgps/vtg",
  "dgps/zda",
  "dgps/dtm",
  "dgps/gsv",
  "dgps/gsa",
  "gyro/ths",
  "gyro/hdt",
  "gyro/rot",
  "anemometer/mwv",
  "anemometer/mwd",
  "anemometer/vwr",
  "anemometer/mtw",
  "anemometer/vwt",
  "radar/ttm",
  "radar/tll",
  "radar/screen",
  "ais/vdm",
  "ais/vdo",
  "ecdis/routeinfo",
  "ecdis/waypoints",
  "ecdis/screen",
  "autopilot/rsa",
  "autopilot/mode",
  "autopilot/htd",
  "speedlog/vbw",
  "speedlog/vhw",
  "speedlog/vlw",
  "no1enginepanel/no1engine_panel_61444",
  "no1enginepanel/no1engine_panel_65262",
  "no1enginepanel/no1engine_panel_65263",
  "no1enginepanel/no1engine_panel_65272",
  "no1enginepanel/no1engine_panel_65271",
  "no1enginepanel/no1engine_panel_65253",
  "no1enginepanel/no1engine_panel_65270",
  "no1enginepanel/no1engine_panel_65276",
  "no1enginepanel/no1engine_panel_65360",
  "no1enginepanel/no1engine_panel_65361_lamp",
  "no1enginepanel/no1engine_panel_65361_status",
  "no1enginepanel/no1engine_panel_65378",
  "no1enginepanel/no1engine_panel_65376",
  "no1enginepanel/no1engine_panel_65379",
  "no2enginepanel/no2engine_panel_61444",
  "no2enginepanel/no2engine_panel_65262",
  "no2enginepanel/no2engine_panel_65263",
  "no2enginepanel/no2engine_panel_65272",
  "no2enginepanel/no2engine_panel_65271",
  "no2enginepanel/no2engine_panel_65253",
  "no2enginepanel/no2engine_panel_65270",
  "no2enginepanel/no2engine_panel_65276",
  "no2enginepanel/no2engine_panel_65360",
  "no2enginepanel/no2engine_panel_65361_lamp",
  "no2enginepanel/no2engine_panel_65361_status",
  "no2enginepanel/no2engine_panel_65378",
  "no2enginepanel/no2engine_panel_65376",
  "no2enginepanel/no2engine_panel_65379",
]);
const settingTime = ref(5);

const fetchData = async () => {
  for (let i = 0; i < axioslist.value.length; i++) {
    try {
      const response = await axios.post(
        `http://192.168.0.73:8080/info/lossdata/${axioslist.value[i]}/1/${settingTime.value}`
      );
      dataRefs[i].value += Number(response.data.countDelay);
    } catch (error) {
      // 만약 어떤 요청이라도 409 에러가 발생하면 "데이터가 없음"을 출력합니다.
      if (error.response && error.response.status === 409) {
        console.log(`${axioslist.value[i]}데이터가 없음`);
      } else {
        console.error(error);
      }
    }
  }
  updateChart();
};
onMounted(() => {
  fetchData();
});

provide(THEME_KEY);

const chart = ref(null);
let isBackButtonActive = false;

// 초기 그래프 옵션 설정
const option = ref({
  title: {
    text: "데이터 소실 빈도",
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
    },
  },
  tooltip: {
    formatter: "{b} : {c}번",
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
    name: "소실횟수",
    type: "bar",
    id: "sales",
    data: [
      {
        value: 0,
        groupId: "DGPS",
      },
      {
        value: 0,
        groupId: "GYRO",
      },
      {
        value: 0,
        groupId: "ANEMOMETER",
      },
      {
        value: 0,
        groupId: "RADAR",
      },
      {
        value: 0,
        groupId: "AIS",
      },
      {
        value: 0,
        groupId: "ECDIS",
      },
      {
        value: 0,
        groupId: "AUTOPILOT",
      },
      {
        value: 0,
        groupId: "SPEEDLOG",
      },
      {
        value: 0,
        groupId: "NO.1ENGINE",
      },
      {
        value: 0,
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
let drilldownData = []
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
            right: 50,
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
                      value:
                        GLL.value +
                        GGA.value +
                        RMC.value +
                        VTG.value +
                        ZDA.value +
                        DTM.value +
                        GSV.value +
                        GSA.value,
                      groupId: "DGPS",
                    },
                    {
                      value: THS.value + HDT.value + ROT.value,
                      groupId: "GYRO",
                    },
                    {
                      value:
                        MWV.value +
                        MWD.value +
                        VWR.value +
                        MTW.value +
                        VWT.value,
                      groupId: "ANEMOMETER",
                    },
                    {
                      value: TTM.value + TLL.value + RSCREEN.value,
                      groupId: "RADAR",
                    },
                    {
                      value: VDM.value + VDO.value,
                      groupId: "AIS",
                    },
                    {
                      value: ROUTEINFO.value + WAYPOINTS.value + ESCREEN.value,
                      groupId: "ECDIS",
                    },
                    {
                      value: RSA.value + MODE.value + HTD.value,
                      groupId: "AUTOPILOT",
                    },
                    {
                      value: VBW.value + VHW.value + VLW.value,
                      groupId: "SPEEDLOG",
                    },
                    {
                      value:
                        NO1ENGINE_PANEL_61444.value +
                        NO1ENGINE_PANEL_65262.value +
                        NO1ENGINE_PANEL_65263.value +
                        NO1ENGINE_PANEL_65272.value +
                        NO1ENGINE_PANEL_65271.value +
                        NO1ENGINE_PANEL_65253.value +
                        NO1ENGINE_PANEL_65270.value +
                        NO1ENGINE_PANEL_65276.value +
                        NO1ENGINE_PANEL_65360.value +
                        NO1ENGINE_PANEL_65361_LAMP.value +
                        NO1ENGINE_PANEL_65361_STATUS.value +
                        NO1ENGINE_PANEL_65378.value +
                        NO1ENGINE_PANEL_65376.value +
                        NO1ENGINE_PANEL_65379.value,
                      groupId: "NO.1ENGINE",
                    },
                    {
                      value:
                        NO2ENGINE_PANEL_61444.value +
                        NO2ENGINE_PANEL_65262.value +
                        NO2ENGINE_PANEL_65263.value +
                        NO2ENGINE_PANEL_65272.value +
                        NO2ENGINE_PANEL_65271.value +
                        NO2ENGINE_PANEL_65253.value +
                        NO2ENGINE_PANEL_65270.value +
                        NO2ENGINE_PANEL_65276.value +
                        NO2ENGINE_PANEL_65360.value +
                        NO2ENGINE_PANEL_65361_LAMP.value +
                        NO2ENGINE_PANEL_65361_STATUS.value +
                        NO2ENGINE_PANEL_65378.value +
                        NO2ENGINE_PANEL_65376.value +
                        NO2ENGINE_PANEL_65379.value,
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
              chart.value.setOption({
                graphic: [
                  {
                    type: "text",
                    style: {
                      text: "", // 빈 문자열로 할당
                    },
                  },
                ],
              });
              // graphic의 style의 text를 ""값으로 할당
            },
          },
        ],
      };

      chart.value.setOption(updatedOption);
    }
  }
};
const updateChart = () => {
  // 차트 데이터 업데이트 로직
  const updatedOption = {
    series: {
      name: "바바",
      type: "bar",
      id: "sales",
      data: [
        {
          value:
            GLL.value +
            GGA.value +
            RMC.value +
            VTG.value +
            ZDA.value +
            DTM.value +
            GSV.value +
            GSA.value,
          groupId: "DGPS",
        },
        {
          value: THS.value + HDT.value + ROT.value,
          groupId: "GYRO",
        },
        {
          value: MWV.value + MWD.value + VWR.value + MTW.value + VWT.value,
          groupId: "ANEMOMETER",
        },
        {
          value: TTM.value + TLL.value + RSCREEN.value,
          groupId: "RADAR",
        },
        {
          value: VDM.value + VDO.value,
          groupId: "AIS",
        },
        {
          value: ROUTEINFO.value + WAYPOINTS.value + ESCREEN.value,
          groupId: "ECDIS",
        },
        {
          value: RSA.value + MODE.value + HTD.value,
          groupId: "AUTOPILOT",
        },
        {
          value: VBW.value + VHW.value + VLW.value,
          groupId: "SPEEDLOG",
        },
        {
          value:
            NO1ENGINE_PANEL_61444.value +
            NO1ENGINE_PANEL_65262.value +
            NO1ENGINE_PANEL_65263.value +
            NO1ENGINE_PANEL_65272.value +
            NO1ENGINE_PANEL_65271.value +
            NO1ENGINE_PANEL_65253.value +
            NO1ENGINE_PANEL_65270.value +
            NO1ENGINE_PANEL_65276.value +
            NO1ENGINE_PANEL_65360.value +
            NO1ENGINE_PANEL_65361_LAMP.value +
            NO1ENGINE_PANEL_65361_STATUS.value +
            NO1ENGINE_PANEL_65378.value +
            NO1ENGINE_PANEL_65376.value +
            NO1ENGINE_PANEL_65379.value,
          groupId: "NO.1ENGINE",
        },
        {
          value:
            NO2ENGINE_PANEL_61444.value +
            NO2ENGINE_PANEL_65262.value +
            NO2ENGINE_PANEL_65263.value +
            NO2ENGINE_PANEL_65272.value +
            NO2ENGINE_PANEL_65271.value +
            NO2ENGINE_PANEL_65253.value +
            NO2ENGINE_PANEL_65270.value +
            NO2ENGINE_PANEL_65276.value +
            NO2ENGINE_PANEL_65360.value +
            NO2ENGINE_PANEL_65361_LAMP.value +
            NO2ENGINE_PANEL_65361_STATUS.value +
            NO2ENGINE_PANEL_65378.value +
            NO2ENGINE_PANEL_65376.value +
            NO2ENGINE_PANEL_65379.value,
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
  // 하위 그래프 데이터
  drilldownData = [
    {
      dataGroupId: "DGPS",
      data: [
        ["GLL", GLL.value],
        ["GGA", Number(`${GGA.value}`)],
        ["RMC", RMC.value],
        ["VTG", VTG.value],
        ["ZDA", Number(ZDA.value)],
        ["DTM", DTM.value],
        ["GSV", GSV.value],
        ["GSA", GSA.value],
      ],
    },
    {
      dataGroupId: "GYRO",
      data: [
        ["THS", THS.value],
        ["HDT", HDT.value],
        ["ROT", ROT.value],
      ],
    },
    {
      dataGroupId: "ANEMOMETER",
      data: [
        ["MWV", MWV.value],
        ["MWD", MWD.value],
        ["VWR", VWR.value],
        ["MTW", MTW.value],
        ["VWT", VWT.value],
      ],
    },
    {
      dataGroupId: "RADAR",
      data: [
        ["TTM", TTM.value],
        ["TLL", TLL.value],
        ["RSCREEN", RSCREEN.value],
      ],
    },
    {
      dataGroupId: "AIS",
      data: [
        ["VDM", VDM.value],
        ["VDO", VDO.value],
      ],
    },
    {
      dataGroupId: "ECDIS",
      data: [
        ["ROUTEINFO", ROUTEINFO.value],
        ["WAYPOINTS", WAYPOINTS.value],
        ["ESCREEN", ESCREEN.value],
      ],
    },
    {
      dataGroupId: "AUTOPILOT",
      data: [
        ["RSA", RSA.value],
        ["MODE", MODE.value],
        ["HTD", HTD.value],
      ],
    },
    {
      dataGroupId: "SPEEDLOG",
      data: [
        ["VBW", VBW.value],
        ["VHW", VHW.value],
        ["VLW", VLW.value],
      ],
    },
    {
      dataGroupId: "NO.1ENGINE",
      data: [
        ["61444", NO1ENGINE_PANEL_61444.value],
        ["65262", NO1ENGINE_PANEL_65262.value],
        ["65263", NO1ENGINE_PANEL_65263.value],
        ["65272", NO1ENGINE_PANEL_65272.value],
        ["65271", NO1ENGINE_PANEL_65271.value],
        ["65253", NO1ENGINE_PANEL_65253.value],
        ["65270", NO1ENGINE_PANEL_65270.value],
        ["65276", NO1ENGINE_PANEL_65276.value],
        ["65360", NO1ENGINE_PANEL_65360.value],
        ["65361_LAMP", NO1ENGINE_PANEL_65361_LAMP.value],
        ["65361_STATUS", NO1ENGINE_PANEL_65361_STATUS.value],
        ["65378", NO1ENGINE_PANEL_65378.value],
        ["65376", NO1ENGINE_PANEL_65376.value],
        ["65379", NO1ENGINE_PANEL_65379.value],
      ],
    },
    {
      dataGroupId: "NO.2ENGINE",
      data: [
        ["61444", NO2ENGINE_PANEL_61444.value],
        ["65262", NO2ENGINE_PANEL_65262.value],
        ["65263", NO2ENGINE_PANEL_65263.value],
        ["65272", NO2ENGINE_PANEL_65272.value],
        ["65271", NO2ENGINE_PANEL_65271.value],
        ["65253", NO2ENGINE_PANEL_65253.value],
        ["65270", NO2ENGINE_PANEL_65270.value],
        ["65276", NO2ENGINE_PANEL_65276.value],
        ["65360", NO2ENGINE_PANEL_65360.value],
        ["65361_LAMP", NO2ENGINE_PANEL_65361_LAMP.value],
        ["65361_STATUS", NO2ENGINE_PANEL_65361_STATUS.value],
        ["65378", NO2ENGINE_PANEL_65378.value],
        ["65376", NO2ENGINE_PANEL_65376.value],
        ["65379", NO2ENGINE_PANEL_65379.value],
      ],
    },
    // 다른 drilldown 데이터도 추가
  ];

  // 차트에 새로운 옵션 적용
  chart.value.setOption(updatedOption);
};
</script>

<style scoped>
.chart {
  height: 40vh;
  padding: 5px;
}
body {
  margin: 0;
}
</style>
