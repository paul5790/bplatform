<template>
  <div class="autocomplete-container">
    <v-select
      v-model="selectedtrialNum"
      label="select"
      :items="trialrun"
      variant="underlined"
      style="width: 120px; height: 5vh"
      position="top right"
      density="compact"
    ></v-select>
    <v-sheet
      v-if="loading"
      :elevation="elevation"
      style="
        height: 50vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <p style="margin-top: 10px; font-weight: 400; font-size: 18px">loading</p>
    </v-sheet>
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
  </div>
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
import { ref, provide, onMounted, watch } from "vue";
import {
  readTrialData,
  readlossData,
  readTimeData,
  readLossTimeData,
} from "../../api/index.js";
import { darkText, lightText } from "../../color/color.js";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const textColor = ref(themeMode.value === "light" ? lightText : darkText);
watch(themeMode, (newValue) => {
  textColor.value = newValue === "light" ? lightText : darkText;
});

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GraphicComponent,
]);

const tokenid = ref(sessionStorage.getItem("token") || "");

const trialrun = ref([]);
const selectedtrialNum = ref();
const trialNum = ref(1);

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      trialrun.value.push(`항차 ${i + 1}번`);
      selectedtrialNum.value = trialrun.value[0];
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(getTrialDate);

const GLL = ref(0);
const GGA = ref(0);
const RMC = ref(0);
const VTG = ref(0);
const ZDA = ref(0);
const GSV = ref(0);
const GSA = ref(0);
const HDT = ref(0);
const ROT = ref(0);
const MWV = ref(0);
const RSCREEN = ref(0);
const VDM = ref(0);
const VDO = ref(0);
const ROUTEINFO = ref(0);
const WAYPOINTS = ref(0);
const RTZ = ref(0);
const ESCREEN = ref(0);
const RSA = ref(0);
const HTD = ref(0);
const VBW = ref(0);
const VHW = ref(0);
const VLW = ref(0);
const CAN_Online_State = ref(0);
const Engine_RPM = ref(0);
const Rudder = ref(0);
const Rudder_Scale = ref(0);
const AUTOPILOTCONTACT = ref(0);
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

const ALLGLL = ref(0);
const ALLGGA = ref(0);
const ALLRMC = ref(0);
const ALLVTG = ref(0);
const ALLZDA = ref(0);
const ALLGSV = ref(0);
const ALLGSA = ref(0);
const ALLHDT = ref(0);
const ALLROT = ref(0);
const ALLMWV = ref(0);
const ALLRSCREEN = ref(0);
const ALLVDM = ref(0);
const ALLVDO = ref(0);
const ALLROUTEINFO = ref(0);
const ALLWAYPOINTS = ref(0);
const ALLRTZ = ref(0);
const ALLESCREEN = ref(0);
const ALLRSA = ref(0);
const ALLHTD = ref(0);
const ALLVBW = ref(0);
const ALLVHW = ref(0);
const ALLVLW = ref(0);
const ALLCAN_Online_State = ref(0);
const ALLEngine_RPM = ref(0);
const ALLRudder = ref(0);
const ALLRudder_Scale = ref(0);
const ALLAUTOPILOTCONTACT = ref(0);
const ALLNO1ENGINE_PANEL_61444 = ref(0);
const ALLNO1ENGINE_PANEL_65262 = ref(0);
const ALLNO1ENGINE_PANEL_65263 = ref(0);
const ALLNO1ENGINE_PANEL_65272 = ref(0);
const ALLNO1ENGINE_PANEL_65271 = ref(0);
const ALLNO1ENGINE_PANEL_65253 = ref(0);
const ALLNO1ENGINE_PANEL_65270 = ref(0);
const ALLNO1ENGINE_PANEL_65276 = ref(0);
const ALLNO1ENGINE_PANEL_65360 = ref(0);
const ALLNO1ENGINE_PANEL_65361_LAMP = ref(0);
const ALLNO1ENGINE_PANEL_65361_STATUS = ref(0);
const ALLNO1ENGINE_PANEL_65378 = ref(0);
const ALLNO1ENGINE_PANEL_65376 = ref(0);
const ALLNO1ENGINE_PANEL_65379 = ref(0);
const ALLNO2ENGINE_PANEL_61444 = ref(0);
const ALLNO2ENGINE_PANEL_65262 = ref(0);
const ALLNO2ENGINE_PANEL_65263 = ref(0);
const ALLNO2ENGINE_PANEL_65272 = ref(0);
const ALLNO2ENGINE_PANEL_65271 = ref(0);
const ALLNO2ENGINE_PANEL_65253 = ref(0);
const ALLNO2ENGINE_PANEL_65270 = ref(0);
const ALLNO2ENGINE_PANEL_65276 = ref(0);
const ALLNO2ENGINE_PANEL_65360 = ref(0);
const ALLNO2ENGINE_PANEL_65361_LAMP = ref(0);
const ALLNO2ENGINE_PANEL_65361_STATUS = ref(0);
const ALLNO2ENGINE_PANEL_65378 = ref(0);
const ALLNO2ENGINE_PANEL_65376 = ref(0);
const ALLNO2ENGINE_PANEL_65379 = ref(0);

const timeDataRefs = [
  GLL,
  GGA,
  RMC,
  VTG,
  ZDA,
  GSV,
  GSA,
  HDT,
  ROT,
  MWV,
  RSCREEN,
  VDM,
  VDO,
  ROUTEINFO,
  WAYPOINTS,
  RTZ,
  ESCREEN,
  RSA,
  HTD,
  VBW,
  VHW,
  VLW,
  CAN_Online_State,
  Engine_RPM,
  Rudder,
  Rudder_Scale,
  AUTOPILOTCONTACT,
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

const dataRefs = [
  GLL,
  GGA,
  RMC,
  VTG,
  ZDA,
  GSV,
  GSA,
  HDT,
  ROT,
  MWV,
  RSCREEN,
  VDM,
  VDO,
  ROUTEINFO,
  WAYPOINTS,
  RTZ,
  ESCREEN,
  RSA,
  HTD,
  VBW,
  VHW,
  VLW,
  CAN_Online_State,
  Engine_RPM,
  Rudder,
  Rudder_Scale,
  AUTOPILOTCONTACT,
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

const responseKeys = [
  "DGPS_GLL",
  "DGPS_GGA",
  "DGPS_RMC",
  "DGPS_VTG",
  "DGPS_ZDA",
  "DGPS_GSV",
  "DGPS_GSA",
  "GYRO_HDT",
  "GYRO_ROT",
  "ANEMOMETER_MWV",
  "RADAR_RADARSCREEN",
  "AIS_VDM",
  "AIS_VDO",
  "ECDIS_ROUTEINFO",
  "ECDIS_WAYPOINTS",
  "ECDIS_RTZ",
  "ECDIS_ECDISSCREEN",
  "AUTOPILOT_RSA",
  "AUTOPILOT_HTD",
  "SPEEDLOG_VBW",
  "SPEEDLOG_VHW",
  "SPEEDLOG_VLW",
  "CANTHROTTLE_CANONLINESTATE",
  "CANTHROTTLE_ENGINERPM",
  "CANTHROTTLE_RUDDER",
  "CANTHROTTLE_RUDDERSCALE",
  "AUTOPILOTCONTACT_AUTOPILOTCONTACT",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_61444",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65262",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65263",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65272",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65271",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65253",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65270",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65276",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65360",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65361_LAMP",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65361_STATUS",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65378",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65376",
  "NO1ENGINEPANEL_NO1ENGINE_PANEL_65379",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_61444",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65262",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65263",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65272",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65271",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65253",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65270",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65276",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65360",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65361_LAMP",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65361_STATUS",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65378",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65376",
  "NO2ENGINEPANEL_NO2ENGINE_PANEL_65379",
];

const alldataRefs = [
  ALLGLL,
  ALLGGA,
  ALLRMC,
  ALLVTG,
  ALLZDA,
  ALLGSV,
  ALLGSA,
  ALLHDT,
  ALLROT,
  ALLMWV,
  ALLRSCREEN,
  ALLVDM,
  ALLVDO,
  ALLROUTEINFO,
  ALLWAYPOINTS,
  ALLRTZ,
  ALLESCREEN,
  ALLRSA,
  ALLHTD,
  ALLVBW,
  ALLVHW,
  ALLVLW,
  ALLCAN_Online_State,
  ALLEngine_RPM,
  ALLRudder,
  ALLRudder_Scale,
  ALLAUTOPILOTCONTACT,
  ALLNO1ENGINE_PANEL_61444,
  ALLNO1ENGINE_PANEL_65262,
  ALLNO1ENGINE_PANEL_65263,
  ALLNO1ENGINE_PANEL_65272,
  ALLNO1ENGINE_PANEL_65271,
  ALLNO1ENGINE_PANEL_65253,
  ALLNO1ENGINE_PANEL_65270,
  ALLNO1ENGINE_PANEL_65276,
  ALLNO1ENGINE_PANEL_65360,
  ALLNO1ENGINE_PANEL_65361_LAMP,
  ALLNO1ENGINE_PANEL_65361_STATUS,
  ALLNO1ENGINE_PANEL_65378,
  ALLNO1ENGINE_PANEL_65376,
  ALLNO1ENGINE_PANEL_65379,
  ALLNO2ENGINE_PANEL_61444,
  ALLNO2ENGINE_PANEL_65262,
  ALLNO2ENGINE_PANEL_65263,
  ALLNO2ENGINE_PANEL_65272,
  ALLNO2ENGINE_PANEL_65271,
  ALLNO2ENGINE_PANEL_65253,
  ALLNO2ENGINE_PANEL_65270,
  ALLNO2ENGINE_PANEL_65276,
  ALLNO2ENGINE_PANEL_65360,
  ALLNO2ENGINE_PANEL_65361_LAMP,
  ALLNO2ENGINE_PANEL_65361_STATUS,
  ALLNO2ENGINE_PANEL_65378,
  ALLNO2ENGINE_PANEL_65376,
  ALLNO2ENGINE_PANEL_65379,
];

const axioslist = ref([
  "dgps/gll",
  "dgps/gga",
  "dgps/rmc",
  "dgps/vtg",
  "dgps/zda",
  "dgps/gsv",
  "dgps/gsa",
  "gyro/hdt",
  "gyro/rot",
  "anemometer/mwv",
  "radar/radarscreen",
  "ais/vdm",
  "ais/vdo",
  "ecdis/routeinfo",
  "ecdis/waypoints",
  "ecdis/rtz",
  "ecdis/ecdisscreen",
  "autopilot/rsa",
  "autopilot/htd",
  "speedlog/vbw",
  "speedlog/vhw",
  "speedlog/vlw",
  "canthrottle/canonlinestate",
  "canthrottle/enginerpm",
  "canthrottle/rudder",
  "canthrottle/rudderscale",
  "autopilotcontact/autopilotcontact",
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

// 로딩
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await readLossTimeData(tokenid.value);
    const timeDataRefs = responseKeys.map((key) => response[key]);
    const axiosPromises = axioslist.value.map(async (endpoint, i) => {
      try {
        const response = await readlossData(
          tokenid.value,
          endpoint,
          trialNum.value,
          timeDataRefs[i]
        );

        console.log("time : " + timeDataRefs[i]);

        dataRefs[i].value = 0;
        dataRefs[i].value += Number(response.countDelay);
        alldataRefs[i].value = 0;
        alldataRefs[i].value += Number(response.numOfData);
      } catch (error) {
        //console.error(error);
      }
    });

    // 모든 axios 호출이 완료될 때까지 기다림
    await Promise.all(axiosPromises);
    loading.value = false;

    // 데이터를 모두 받아온 후에 차트 업데이트

    await updateChart();
  } catch (error) {
    console.error("Error during fetchData:", error);
  }
};

onMounted(() => {
  fetchData();
});

// selectedtrialNum의 변경을 감시하고 변경되면 trialNum을 갱신하고 fetchData 실행
watch(selectedtrialNum, (newTrialNum) => {
  // 항차 N번에서 N 추출
  const num = parseInt(newTrialNum.match(/\d+/)[0]);
  trialNum.value = num;
  fetchData();
});

provide(THEME_KEY);

const chart = ref(null);

// 초기 그래프 옵션 설정
const option = ref({
  title: {
    text: "항차 별 데이터 소실 빈도",
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
    },
  },
  tooltip: {
    formatter: function (params) {
      // params에서 필요한 정보 추출
      let groupId = params.data ? params.data.groupId : null; // groupId 값
      let value = params.data ? params.data.value : null; // value 값
      let percent = params.data ? params.data.percent : null;
      // params.data가 존재하고 groupId, value, percent 속성이 존재하는지 확인
      if (
        params.data &&
        groupId !== null &&
        value !== null &&
        percent !== null
      ) {
        // 툴팁 형식 설정
        return `${groupId} : ${value}번 <br> 소실률 : ${percent}%`;
      } else {
        // 필요한 데이터가 없을 경우 빈 문자열 반환
        return "";
      }
    },
  },
  xAxis: {
    type: "category",
    axisLabel: {
      color: textColor.value,
      interval: 0,
      rotate: 20,
      align: "center",
      margin: 30,
    },
    data: [
      "DGPS",
      "GYRO",
      "ANEMOMETER",
      "RADAR",
      "AIS",
      "ECDIS",
      "AUTOPILOT",
      "SPEEDLOG",
      "CanThrottle",
      "AUTOPILOTCONTACT",
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
      // 다른 데이터도 추가 가능
    ],
    universalTransition: {
      enabled: true,
      divideShape: "clone",
    },
  },
});
let drilldownData = [];
// 그래프 클릭 이벤트 핸들러

const createDataObject = (groupId, values, allValues) => ({
  value: values.reduce((acc, val) => acc + val.value, 0),
  groupId: groupId,
  percent: (
    (values.reduce((acc, val) => acc + val.value, 0) /
      allValues.reduce((acc, val) => acc + val.value, 0)) *
    100
  ).toFixed(2),
});

const handleChartClick = async (event) => {
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
          axisLabel: {
            color: textColor.value, // 텍스트 색상을 흰색으로 설정
          },
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
            left: 0,
            top: 0,
            style: {
              text: ". .",
              fontSize: 1880,
            },
            onclick: () => {
              // 'Back' 버튼 클릭 시 최상위 그래프로 이동하는 옵션 설정
              const backToTopOption = {
                xAxis: {
                  axisLabel: {
                    color: textColor.value, // 텍스트 색상을 흰색으로 설정
                  },
                  data: [
                    "DGPS",
                    "GYRO",
                    "ANEMOMETER",
                    "RADAR",
                    "AIS",
                    "ECDIS",
                    "AUTOPILOT",
                    "SPEEDLOG",
                    "CanThrottle",
                    "AUTOPILOTCONTACT",
                    "NO.1ENGINE",
                    "NO.2ENGINE",
                  ],
                },
                series: {
                  type: "bar",
                  id: "sales",
                  dataGroupId: "",
                  data: [
                    createDataObject(
                      "DGPS",
                      [GLL, GGA, RMC, VTG, ZDA, GSV, GSA],
                      [ALLGLL, ALLGGA, ALLRMC, ALLVTG, ALLZDA, ALLGSV, ALLGSA]
                    ),
                    createDataObject("GYRO", [HDT, ROT], [ALLHDT, ALLROT]),
                    createDataObject("ANEMOMETER", [MWV], [ALLMWV]),
                    createDataObject("RADAR", [RSCREEN], [ALLRSCREEN]),
                    createDataObject("AIS", [VDM, VDO], [ALLVDM, ALLVDO]),
                    createDataObject(
                      "ECDIS",
                      [ROUTEINFO, WAYPOINTS, RTZ, ESCREEN],
                      [ALLROUTEINFO, ALLWAYPOINTS, ALLRTZ, ALLESCREEN]
                    ),
                    createDataObject("AUTOPILOT", [RSA, HTD], [ALLRSA, ALLHTD]),
                    createDataObject(
                      "SPEEDLOG",
                      [VBW, VHW, VLW],
                      [ALLVBW, ALLVHW, ALLVLW]
                    ),
                    createDataObject(
                      "CanThrottle",
                      [CAN_Online_State, Engine_RPM, Rudder, Rudder_Scale],
                      [
                        ALLCAN_Online_State,
                        ALLEngine_RPM,
                        ALLRudder,
                        ALLRudder_Scale,
                      ]
                    ),
                    createDataObject(
                      "AUTOPILOTCONTACT",
                      [AUTOPILOTCONTACT],
                      [ALLAUTOPILOTCONTACT]
                    ),
                    createDataObject(
                      "NO.1ENGINE",
                      [
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
                      ],
                      [
                        ALLNO1ENGINE_PANEL_61444,
                        ALLNO1ENGINE_PANEL_65262,
                        ALLNO1ENGINE_PANEL_65263,
                        ALLNO1ENGINE_PANEL_65272,
                        ALLNO1ENGINE_PANEL_65271,
                        ALLNO1ENGINE_PANEL_65253,
                        ALLNO1ENGINE_PANEL_65270,
                        ALLNO1ENGINE_PANEL_65276,
                        ALLNO1ENGINE_PANEL_65360,
                        ALLNO1ENGINE_PANEL_65361_LAMP,
                        ALLNO1ENGINE_PANEL_65361_STATUS,
                        ALLNO1ENGINE_PANEL_65378,
                        ALLNO1ENGINE_PANEL_65376,
                        ALLNO1ENGINE_PANEL_65379,
                      ]
                    ),
                    createDataObject(
                      "NO.2ENGINE",
                      [
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
                      ],
                      [
                        ALLNO2ENGINE_PANEL_61444,
                        ALLNO2ENGINE_PANEL_65262,
                        ALLNO2ENGINE_PANEL_65263,
                        ALLNO2ENGINE_PANEL_65272,
                        ALLNO2ENGINE_PANEL_65271,
                        ALLNO2ENGINE_PANEL_65253,
                        ALLNO2ENGINE_PANEL_65270,
                        ALLNO2ENGINE_PANEL_65276,
                        ALLNO2ENGINE_PANEL_65360,
                        ALLNO2ENGINE_PANEL_65361_LAMP,
                        ALLNO2ENGINE_PANEL_65361_STATUS,
                        ALLNO2ENGINE_PANEL_65378,
                        ALLNO2ENGINE_PANEL_65376,
                        ALLNO2ENGINE_PANEL_65379,
                      ]
                    ),
                  ],
                  universalTransition: {
                    enabled: true,
                    divideShape: "clone",
                  },
                },
              };
              if (chart.value) {
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
              }
            },
          },
        ],
      };

      chart.value.setOption(updatedOption);
      // loading.value = true;
    }
  }
};

const calculateGroupPercentage = (values, allValues) => {
  const value = values.reduce(
    (acc, currentValue) => acc + currentValue.value,
    0
  );
  const percent = (
    (value /
      allValues.reduce((acc, currentValue) => acc + currentValue.value, 0)) *
    100
  ).toFixed(2);

  return { value, percent };
};

const updateDataObject = (id, value, allValue) => ({
  value: value,
  groupId: id,
  percent: ((value / allValue) * 100).toFixed(2),
});

watch(selectedtrialNum, (newTrialNum) => {
  option.value.title.text = `${newTrialNum} 데이터 저장 용량`;
});

const updateChart = () => {
  if (chart.value) {
    // 차트 데이터 업데이트 로직
    const updatedOption = {
      title: {
        text: `${selectedtrialNum.value} 데이터 소실 빈도`,
        left: "center",
        textStyle: {
          fontSize: 19, // 폰트 크기 설정
          fontWeight: 550,
        },
      },
      series: {
        name: "바바",
        type: "bar",
        id: "sales",
        data: [
          {
            groupId: "DGPS",
            ...calculateGroupPercentage(
              [GLL, GGA, RMC, VTG, ZDA, GSV, GSA],
              [ALLGLL, ALLGGA, ALLRMC, ALLVTG, ALLZDA, ALLGSV, ALLGSA]
            ),
          },
          {
            groupId: "GYRO",
            ...calculateGroupPercentage([HDT, ROT], [ALLHDT, ALLROT]),
          },
          {
            groupId: "ANEMOMETER",
            ...calculateGroupPercentage([MWV], [ALLMWV]),
          },
          {
            groupId: "RADAR",
            ...calculateGroupPercentage([RSCREEN], [ALLRSCREEN]),
          },
          {
            groupId: "AIS",
            ...calculateGroupPercentage([VDM, VDO], [ALLVDM, ALLVDO]),
          },
          {
            groupId: "ECDIS",
            ...calculateGroupPercentage(
              [ROUTEINFO, WAYPOINTS, RTZ, ESCREEN],
              [ALLROUTEINFO, ALLWAYPOINTS, ALLRTZ, ALLESCREEN]
            ),
          },
          {
            groupId: "AUTOPILOT",
            ...calculateGroupPercentage([RSA, HTD], [ALLRSA, ALLHTD]),
          },
          {
            groupId: "SPEEDLOG",
            ...calculateGroupPercentage(
              [VBW, VHW, VLW],
              [ALLVBW, ALLVHW, ALLVLW]
            ),
          },
          {
            groupId: "CanThrottle",
            ...calculateGroupPercentage(
              [CAN_Online_State, Engine_RPM, Rudder, Rudder_Scale],
              [ALLCAN_Online_State, ALLEngine_RPM, ALLRudder, ALLRudder_Scale]
            ),
          },
          {
            groupId: "AUTOPILOTCONTACT",
            ...calculateGroupPercentage(
              [AUTOPILOTCONTACT],
              [ALLAUTOPILOTCONTACT]
            ),
          },
          {
            groupId: "NO.1ENGINE",
            ...calculateGroupPercentage(
              [
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
              ],
              [
                ALLNO1ENGINE_PANEL_61444,
                ALLNO1ENGINE_PANEL_65262,
                ALLNO1ENGINE_PANEL_65263,
                ALLNO1ENGINE_PANEL_65272,
                ALLNO1ENGINE_PANEL_65271,
                ALLNO1ENGINE_PANEL_65253,
                ALLNO1ENGINE_PANEL_65270,
                ALLNO1ENGINE_PANEL_65276,
                ALLNO1ENGINE_PANEL_65360,
                ALLNO1ENGINE_PANEL_65361_LAMP,
                ALLNO1ENGINE_PANEL_65361_STATUS,
                ALLNO1ENGINE_PANEL_65378,
                ALLNO1ENGINE_PANEL_65376,
                ALLNO1ENGINE_PANEL_65379,
              ]
            ),
          },
          {
            groupId: "NO.2ENGINE",
            ...calculateGroupPercentage(
              [
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
              ],
              [
                ALLNO2ENGINE_PANEL_61444,
                ALLNO2ENGINE_PANEL_65262,
                ALLNO2ENGINE_PANEL_65263,
                ALLNO2ENGINE_PANEL_65272,
                ALLNO2ENGINE_PANEL_65271,
                ALLNO2ENGINE_PANEL_65253,
                ALLNO2ENGINE_PANEL_65270,
                ALLNO2ENGINE_PANEL_65276,
                ALLNO2ENGINE_PANEL_65360,
                ALLNO2ENGINE_PANEL_65361_LAMP,
                ALLNO2ENGINE_PANEL_65361_STATUS,
                ALLNO2ENGINE_PANEL_65378,
                ALLNO2ENGINE_PANEL_65376,
                ALLNO2ENGINE_PANEL_65379,
              ]
            ),
          },
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
          ["GLL", updateDataObject("GLL", GLL.value, ALLGLL.value)],
          ["GGA", updateDataObject("GGA", GGA.value, ALLGGA.value)],
          ["RMC", updateDataObject("RMC", RMC.value, ALLRMC.value)],
          ["VTG", updateDataObject("VTG", VTG.value, ALLVTG.value)],
          ["ZDA", updateDataObject("ZDA", ZDA.value, ALLZDA.value)],
          ["GSV", updateDataObject("GSV", GSV.value, ALLGSV.value)],
          ["GSA", updateDataObject("GSA", GSA.value, ALLGSA.value)],
        ],
      },
      {
        dataGroupId: "GYRO",
        data: [
          ["HDT", updateDataObject("HDT", HDT.value, ALLHDT.value)],
          ["ROT", updateDataObject("ROT", ROT.value, ALLROT.value)],
        ],
      },
      {
        dataGroupId: "ANEMOMETER",
        data: [["MWV", updateDataObject("MWV", MWV.value, ALLMWV.value)]],
      },
      {
        dataGroupId: "RADAR",
        data: [
          [
            "RSCREEN",
            updateDataObject("RSCREEN", RSCREEN.value, ALLRSCREEN.value),
          ],
        ],
      },
      {
        dataGroupId: "AIS",
        data: [
          ["VDM", updateDataObject("VDM", VDM.value, ALLVDM.value)],
          ["VDO", updateDataObject("VDO", VDO.value, ALLVDO.value)],
        ],
      },
      {
        dataGroupId: "ECDIS",
        data: [
          [
            "ROUTEINFO",
            updateDataObject("ROUTEINFO", ROUTEINFO.value, ALLROUTEINFO.value),
          ],
          [
            "WAYPOINTS",
            updateDataObject("WAYPOINTS", WAYPOINTS.value, ALLWAYPOINTS.value),
          ],
          ["RTZ", updateDataObject("RTZ", RTZ.value, ALLRTZ.value)],
          [
            "ESCREEN",
            updateDataObject("ESCREEN", ESCREEN.value, ALLESCREEN.value),
          ],
        ],
      },
      {
        dataGroupId: "AUTOPILOT",
        data: [
          ["RSA", updateDataObject("RSA", RSA.value, ALLRSA.value)],
          ["HTD", updateDataObject("HTD", HTD.value, ALLHTD.value)],
        ],
      },
      {
        dataGroupId: "SPEEDLOG",
        data: [
          ["VBW", updateDataObject("VBW", VBW.value, ALLVBW.value)],
          ["VHW", updateDataObject("VHW", VHW.value, ALLVHW.value)],
          ["VLW", updateDataObject("VLW", VLW.value, ALLVLW.value)],
        ],
      },
      {
        dataGroupId: "CanThrottle",
        data: [
          [
            "CAN_Online_State",
            updateDataObject(
              "CAN_Online_State",
              CAN_Online_State.value,
              ALLCAN_Online_State.value
            ),
          ],
          [
            "Engine_RPM",
            updateDataObject(
              "Engine_RPM",
              Engine_RPM.value,
              ALLEngine_RPM.value
            ),
          ],
          ["Rudder", updateDataObject("Rudder", Rudder.value, ALLRudder.value)],
          [
            "Rudder_Scale",
            updateDataObject(
              "Rudder_Scale",
              Rudder_Scale.value,
              ALLRudder_Scale.value
            ),
          ],
        ],
      },
      {
        dataGroupId: "AUTOPILOTCONTACT",
        data: [
          [
            "AUTOPILOTCONTACT",
            updateDataObject(
              "AUTOPILOTCONTACT",
              AUTOPILOTCONTACT.value,
              ALLAUTOPILOTCONTACT.value
            ),
          ],
        ],
      },
      {
        dataGroupId: "NO.1ENGINE",
        data: [
          [
            "61444",
            updateDataObject(
              "NO1ENGINE_PANEL_61444",
              NO1ENGINE_PANEL_61444.value,
              ALLNO1ENGINE_PANEL_61444.value
            ),
          ],
          [
            "65262",
            updateDataObject(
              "NO1ENGINE_PANEL_65262",
              NO1ENGINE_PANEL_65262.value,
              ALLNO1ENGINE_PANEL_65262.value
            ),
          ],
          [
            "65263",
            updateDataObject(
              "NO1ENGINE_PANEL_65263",
              NO1ENGINE_PANEL_65263.value,
              ALLNO1ENGINE_PANEL_65263.value
            ),
          ],
          [
            "65272",
            updateDataObject(
              "NO1ENGINE_PANEL_65272",
              NO1ENGINE_PANEL_65272.value,
              ALLNO1ENGINE_PANEL_65272.value
            ),
          ],
          [
            "65271",
            updateDataObject(
              "NO1ENGINE_PANEL_65271",
              NO1ENGINE_PANEL_65271.value,
              ALLNO1ENGINE_PANEL_65271.value
            ),
          ],
          [
            "65253",
            updateDataObject(
              "NO1ENGINE_PANEL_65253",
              NO1ENGINE_PANEL_65253.value,
              ALLNO1ENGINE_PANEL_65253.value
            ),
          ],
          [
            "65270",
            updateDataObject(
              "NO1ENGINE_PANEL_65270",
              NO1ENGINE_PANEL_65270.value,
              ALLNO1ENGINE_PANEL_65270.value
            ),
          ],
          [
            "65276",
            updateDataObject(
              "NO1ENGINE_PANEL_65276",
              NO1ENGINE_PANEL_65276.value,
              ALLNO1ENGINE_PANEL_65276.value
            ),
          ],
          [
            "65360",
            updateDataObject(
              "NO1ENGINE_PANEL_65360",
              NO1ENGINE_PANEL_65360.value,
              ALLNO1ENGINE_PANEL_65360.value
            ),
          ],
          [
            "65361_LAMP",
            updateDataObject(
              "NO1ENGINE_PANEL_65361_LAMP",
              NO1ENGINE_PANEL_65361_LAMP.value,
              ALLNO1ENGINE_PANEL_65361_LAMP.value
            ),
          ],
          [
            "65361_STATUS",
            updateDataObject(
              "NO1ENGINE_PANEL_65361_STATUS",
              NO1ENGINE_PANEL_65361_STATUS.value,
              ALLNO1ENGINE_PANEL_65361_STATUS.value
            ),
          ],
          [
            "65378",
            updateDataObject(
              "NO1ENGINE_PANEL_65378",
              NO1ENGINE_PANEL_65378.value,
              ALLNO1ENGINE_PANEL_65378.value
            ),
          ],
          [
            "65376",
            updateDataObject(
              "NO1ENGINE_PANEL_65376",
              NO1ENGINE_PANEL_65376.value,
              ALLNO1ENGINE_PANEL_65376.value
            ),
          ],
          [
            "65379",
            updateDataObject(
              "NO1ENGINE_PANEL_65379",
              NO1ENGINE_PANEL_65379.value,
              ALLNO1ENGINE_PANEL_65379.value
            ),
          ],
        ],
      },
      {
        dataGroupId: "NO.2ENGINE",
        data: [
          [
            "61444",
            updateDataObject(
              "NO2ENGINE_PANEL_61444",
              NO2ENGINE_PANEL_61444.value,
              ALLNO2ENGINE_PANEL_61444.value
            ),
          ],
          [
            "65262",
            updateDataObject(
              "NO2ENGINE_PANEL_65262",
              NO2ENGINE_PANEL_65262.value,
              ALLNO2ENGINE_PANEL_65262.value
            ),
          ],
          [
            "65263",
            updateDataObject(
              "NO2ENGINE_PANEL_65263",
              NO2ENGINE_PANEL_65263.value,
              ALLNO2ENGINE_PANEL_65263.value
            ),
          ],
          [
            "65272",
            updateDataObject(
              "NO2ENGINE_PANEL_65272",
              NO2ENGINE_PANEL_65272.value,
              ALLNO2ENGINE_PANEL_65272.value
            ),
          ],
          [
            "65271",
            updateDataObject(
              "NO2ENGINE_PANEL_65271",
              NO2ENGINE_PANEL_65271.value,
              ALLNO2ENGINE_PANEL_65271.value
            ),
          ],
          [
            "65253",
            updateDataObject(
              "NO2ENGINE_PANEL_65253",
              NO2ENGINE_PANEL_65253.value,
              ALLNO2ENGINE_PANEL_65253.value
            ),
          ],
          [
            "65270",
            updateDataObject(
              "NO2ENGINE_PANEL_65270",
              NO2ENGINE_PANEL_65270.value,
              ALLNO2ENGINE_PANEL_65270.value
            ),
          ],
          [
            "65276",
            updateDataObject(
              "NO2ENGINE_PANEL_65276",
              NO2ENGINE_PANEL_65276.value,
              ALLNO2ENGINE_PANEL_65276.value
            ),
          ],
          [
            "65360",
            updateDataObject(
              "NO2ENGINE_PANEL_65360",
              NO2ENGINE_PANEL_65360.value,
              ALLNO2ENGINE_PANEL_65360.value
            ),
          ],
          [
            "65361_LAMP",
            updateDataObject(
              "NO2ENGINE_PANEL_65361_LAMP",
              NO2ENGINE_PANEL_65361_LAMP.value,
              ALLNO2ENGINE_PANEL_65361_LAMP.value
            ),
          ],
          [
            "65361_STATUS",
            updateDataObject(
              "NO2ENGINE_PANEL_65361_STATUS",
              NO2ENGINE_PANEL_65361_STATUS.value,
              ALLNO2ENGINE_PANEL_65361_STATUS.value
            ),
          ],
          [
            "65378",
            updateDataObject(
              "NO2ENGINE_PANEL_65378",
              NO2ENGINE_PANEL_65378.value,
              ALLNO2ENGINE_PANEL_65378.value
            ),
          ],
          [
            "65376",
            updateDataObject(
              "NO2ENGINE_PANEL_65376",
              NO2ENGINE_PANEL_65376.value,
              ALLNO2ENGINE_PANEL_65376.value
            ),
          ],
          [
            "65379",
            updateDataObject(
              "NO2ENGINE_PANEL_65379",
              NO2ENGINE_PANEL_65379.value,
              ALLNO2ENGINE_PANEL_65379.value
            ),
          ],
        ],
      },
    ];

    // 차트에 새로운 옵션 적용
    chart.value.setOption(updatedOption);
  } else {
    console.warn("Chart object is null. Cannot update chart.");
  }
};
</script>

<style scoped>
.chart {
  margin-top: 3vh;
  height: 37vh;
  padding: 5px;
}
body {
  margin: 0;
}
.autocomplete-container {
  position: relative;
}

.v-select {
  margin-top: 5px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
