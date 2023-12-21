<template>
  <div class="autocomplete-container">
    <v-select
      v-model="selectedtrialNum"
      label="select"
      :items="trialrun"
      variant="underlined"
      style="width: 120px; height: 5vh;"
      position="top right"
      density="compact"
    ></v-select>
  <v-sheet
    v-if="loading"
    :elevation="elevation"
    style="height: 50vh; display: flex; flex-direction: column; align-items: center; justify-content: center;"
  >
    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
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
import { readTrialData, readlossData, readTimeData } from "../../api/index.js";

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

const loading = ref(true);
const fetchData = async () => {
  loading.value = true;
  try {
    const axiosPromises = axioslist.value.map(async (endpoint, i) => {
      try {
        const timedata = await readTimeData(tokenid.value);

        await (settingTime.value = timedata.lossTime);

        const response = await readlossData(tokenid.value, endpoint, trialNum.value, settingTime.value);
        
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
      let percent = params.data ? params.data.percent : null; // "얄라리"

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
      {
        value:
          GLL.value +
          GGA.value +
          RMC.value +
          VTG.value +
          ZDA.value +
          GSV.value +
          GSA.value,
        groupId: "DGPS",
        percent: (
          ((GLL.value +
            GGA.value +
            RMC.value +
            VTG.value +
            ZDA.value +
            GSV.value +
            GSA.value) /
            (ALLGLL.value +
              ALLGGA.value +
              ALLRMC.value +
              ALLVTG.value +
              ALLZDA.value +
              ALLGSV.value +
              ALLGSA.value)) *
          100
        ).toFixed(2),
      },
      {
        value:
          // THS.value +
          HDT.value + ROT.value,
        groupId: "GYRO",
        percent: (
          ((HDT.value + ROT.value) / (ALLHDT.value + ALLROT.value)) *
          100
        ).toFixed(2),
      },
      {
        value: MWV.value,
        // MWD.value +
        // VWR.value +
        // MTW.value +
        // VWT.value,
        groupId: "ANEMOMETER",
        percent: ((MWV.value / ALLMWV.value) * 100).toFixed(2),
      },
      {
        // TTM.value + TLL.value +
        value: RSCREEN.value,
        groupId: "RADAR",
        percent: ((RSCREEN.value / ALLRSCREEN.value) * 100).toFixed(2),
      },
      {
        value: VDM.value + VDO.value,
        groupId: "AIS",
        percent: (
          ((VDM.value + VDO.value) / (ALLVDM.value + ALLVDO.value)) *
          100
        ).toFixed(2),
      },
      {
        value: ROUTEINFO.value + WAYPOINTS.value + RTZ.value + ESCREEN.value,
        groupId: "ECDIS",
        percent: (
          ((ROUTEINFO.value + WAYPOINTS.value + RTZ.value + ESCREEN.value) /
            (ALLROUTEINFO.value +
              ALLWAYPOINTS.value +
              ALLRTZ.value +
              ALLESCREEN.value)) *
          100
        ).toFixed(2),
      },
      {
        value: RSA.value + HTD.value,
        //+ MODE.value,
        groupId: "AUTOPILOT",
        percent: (
          ((RSA.value + HTD.value) / (ALLRSA.value + ALLHTD.value)) *
          100
        ).toFixed(2),
      },
      {
        value: VBW.value + VHW.value + VLW.value,
        groupId: "SPEEDLOG",
        percent: (
          ((VBW.value + VHW.value + VLW.value) /
            (ALLVBW.value + ALLVHW.value + ALLVLW.value)) *
          100
        ).toFixed(2),
      },
      {
        value:
          CAN_Online_State.value +
          Engine_RPM.value +
          Rudder.value +
          Rudder_Scale.value,
        groupId: "CanThrottle",
        percent: (
          ((CAN_Online_State.value +
            Engine_RPM.value +
            Rudder.value +
            Rudder_Scale.value) /
            (ALLCAN_Online_State.value +
              ALLEngine_RPM.value +
              ALLRudder.value +
              ALLRudder_Scale.value)) *
          100
        ).toFixed(2),
      },
      {
        value: AUTOPILOTCONTACT.value,
        groupId: "AUTOPILOTCONTACT",
        percent: (
          (AUTOPILOTCONTACT.value / ALLAUTOPILOTCONTACT.value) *
          100
        ).toFixed(2),
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
        percent: (
          ((NO1ENGINE_PANEL_61444.value +
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
            NO1ENGINE_PANEL_65379.value) /
            (ALLNO1ENGINE_PANEL_61444.value +
              ALLNO1ENGINE_PANEL_65262.value +
              ALLNO1ENGINE_PANEL_65263.value +
              ALLNO1ENGINE_PANEL_65272.value +
              ALLNO1ENGINE_PANEL_65271.value +
              ALLNO1ENGINE_PANEL_65253.value +
              ALLNO1ENGINE_PANEL_65270.value +
              ALLNO1ENGINE_PANEL_65276.value +
              ALLNO1ENGINE_PANEL_65360.value +
              ALLNO1ENGINE_PANEL_65361_LAMP.value +
              ALLNO1ENGINE_PANEL_65361_STATUS.value +
              ALLNO1ENGINE_PANEL_65378.value +
              ALLNO1ENGINE_PANEL_65376.value +
              ALLNO1ENGINE_PANEL_65379.value)) *
          100
        ).toFixed(2),
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
        percent: (
          ((NO2ENGINE_PANEL_61444.value +
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
            NO2ENGINE_PANEL_65379.value) /
            (ALLNO2ENGINE_PANEL_61444.value +
              ALLNO2ENGINE_PANEL_65262.value +
              ALLNO2ENGINE_PANEL_65263.value +
              ALLNO2ENGINE_PANEL_65272.value +
              ALLNO2ENGINE_PANEL_65271.value +
              ALLNO2ENGINE_PANEL_65253.value +
              ALLNO2ENGINE_PANEL_65270.value +
              ALLNO2ENGINE_PANEL_65276.value +
              ALLNO2ENGINE_PANEL_65360.value +
              ALLNO2ENGINE_PANEL_65361_LAMP.value +
              ALLNO2ENGINE_PANEL_65361_STATUS.value +
              ALLNO2ENGINE_PANEL_65378.value +
              ALLNO2ENGINE_PANEL_65376.value +
              ALLNO2ENGINE_PANEL_65379.value)) *
          100
        ).toFixed(2),
      },
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
                    {
                      value:
                        GLL.value +
                        GGA.value +
                        RMC.value +
                        VTG.value +
                        ZDA.value +
                        GSV.value +
                        GSA.value,
                      groupId: "DGPS",
                      percent: (
                        ((GLL.value +
                          GGA.value +
                          RMC.value +
                          VTG.value +
                          ZDA.value +
                          GSV.value +
                          GSA.value) /
                          (ALLGLL.value +
                            ALLGGA.value +
                            ALLRMC.value +
                            ALLVTG.value +
                            ALLZDA.value +
                            ALLGSV.value +
                            ALLGSA.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value:
                        // THS.value +
                        HDT.value + ROT.value,
                      groupId: "GYRO",
                      percent: (
                        ((HDT.value + ROT.value) /
                          (ALLHDT.value + ALLROT.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value: MWV.value,
                      // MWD.value +
                      // VWR.value +
                      // MTW.value +
                      // VWT.value,
                      groupId: "ANEMOMETER",
                      percent: ((MWV.value / ALLMWV.value) * 100).toFixed(2),
                    },
                    {
                      // TTM.value + TLL.value +
                      value: RSCREEN.value,
                      groupId: "RADAR",
                      percent: (
                        (RSCREEN.value / ALLRSCREEN.value) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value: VDM.value + VDO.value,
                      groupId: "AIS",
                      percent: (
                        ((VDM.value + VDO.value) /
                          (ALLVDM.value + ALLVDO.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value:
                        ROUTEINFO.value +
                        WAYPOINTS.value +
                        RTZ.value +
                        ESCREEN.value,
                      groupId: "ECDIS",
                      percent: (
                        ((ROUTEINFO.value +
                          WAYPOINTS.value +
                          RTZ.value +
                          ESCREEN.value) /
                          (ALLROUTEINFO.value +
                            ALLWAYPOINTS.value +
                            ALLRTZ.value +
                            ALLESCREEN.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value: RSA.value + HTD.value,
                      //+ MODE.value,
                      groupId: "AUTOPILOT",
                      percent: (
                        ((RSA.value + HTD.value) /
                          (ALLRSA.value + ALLHTD.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value: VBW.value + VHW.value + VLW.value,
                      groupId: "SPEEDLOG",
                      percent: (
                        ((VBW.value + VHW.value + VLW.value) /
                          (ALLVBW.value + ALLVHW.value + ALLVLW.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value:
                        CAN_Online_State.value +
                        Engine_RPM.value +
                        Rudder.value +
                        Rudder_Scale.value,
                      groupId: "CanThrottle",
                      percent: (
                        ((CAN_Online_State.value +
                          Engine_RPM.value +
                          Rudder.value +
                          Rudder_Scale.value) /
                          (ALLCAN_Online_State.value +
                            ALLEngine_RPM.value +
                            ALLRudder.value +
                            ALLRudder_Scale.value)) *
                        100
                      ).toFixed(2),
                    },
                    {
                      value: AUTOPILOTCONTACT.value,
                      groupId: "AUTOPILOTCONTACT",
                      percent: (
                        (AUTOPILOTCONTACT.value / ALLAUTOPILOTCONTACT.value) *
                        100
                      ).toFixed(2),
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
                      percent: (
                        ((NO1ENGINE_PANEL_61444.value +
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
                          NO1ENGINE_PANEL_65379.value) /
                          (ALLNO1ENGINE_PANEL_61444.value +
                            ALLNO1ENGINE_PANEL_65262.value +
                            ALLNO1ENGINE_PANEL_65263.value +
                            ALLNO1ENGINE_PANEL_65272.value +
                            ALLNO1ENGINE_PANEL_65271.value +
                            ALLNO1ENGINE_PANEL_65253.value +
                            ALLNO1ENGINE_PANEL_65270.value +
                            ALLNO1ENGINE_PANEL_65276.value +
                            ALLNO1ENGINE_PANEL_65360.value +
                            ALLNO1ENGINE_PANEL_65361_LAMP.value +
                            ALLNO1ENGINE_PANEL_65361_STATUS.value +
                            ALLNO1ENGINE_PANEL_65378.value +
                            ALLNO1ENGINE_PANEL_65376.value +
                            ALLNO1ENGINE_PANEL_65379.value)) *
                        100
                      ).toFixed(2),
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
                      percent: (
                        ((NO2ENGINE_PANEL_61444.value +
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
                          NO2ENGINE_PANEL_65379.value) /
                          (ALLNO2ENGINE_PANEL_61444.value +
                            ALLNO2ENGINE_PANEL_65262.value +
                            ALLNO2ENGINE_PANEL_65263.value +
                            ALLNO2ENGINE_PANEL_65272.value +
                            ALLNO2ENGINE_PANEL_65271.value +
                            ALLNO2ENGINE_PANEL_65253.value +
                            ALLNO2ENGINE_PANEL_65270.value +
                            ALLNO2ENGINE_PANEL_65276.value +
                            ALLNO2ENGINE_PANEL_65360.value +
                            ALLNO2ENGINE_PANEL_65361_LAMP.value +
                            ALLNO2ENGINE_PANEL_65361_STATUS.value +
                            ALLNO2ENGINE_PANEL_65378.value +
                            ALLNO2ENGINE_PANEL_65376.value +
                            ALLNO2ENGINE_PANEL_65379.value)) *
                        100
                      ).toFixed(2),
                    },
                    // 다른 데이터도 추가 가능
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
              // graphic의 style의 text를 ""값으로 할당
            },
          },
        ],
      };

      chart.value.setOption(updatedOption);
      // loading.value = true;
    }
  }
};
const updateChart = () => {
  if (chart.value) {
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
            GSV.value +
            GSA.value,
          groupId: "DGPS",
          percent: (
            ((GLL.value +
              GGA.value +
              RMC.value +
              VTG.value +
              ZDA.value +
              GSV.value +
              GSA.value) /
              (ALLGLL.value +
                ALLGGA.value +
                ALLRMC.value +
                ALLVTG.value +
                ALLZDA.value +
                ALLGSV.value +
                ALLGSA.value)) *
            100
          ).toFixed(2),
        },
        {
          value:
            // THS.value +
            HDT.value + ROT.value,
          groupId: "GYRO",
          percent: (
            ((HDT.value + ROT.value) / (ALLHDT.value + ALLROT.value)) *
            100
          ).toFixed(2),
        },
        {
          value: MWV.value,
          // MWD.value +
          // VWR.value +
          // MTW.value +
          // VWT.value,
          groupId: "ANEMOMETER",
          percent: ((MWV.value / ALLMWV.value) * 100).toFixed(2),
        },
        {
          // TTM.value + TLL.value +
          value: RSCREEN.value,
          groupId: "RADAR",
          percent: ((RSCREEN.value / ALLRSCREEN.value) * 100).toFixed(2),
        },
        {
          value: VDM.value + VDO.value,
          groupId: "AIS",
          percent: (
            ((VDM.value + VDO.value) / (ALLVDM.value + ALLVDO.value)) *
            100
          ).toFixed(2),
        },
        {
          value: ROUTEINFO.value + WAYPOINTS.value + RTZ.value + ESCREEN.value,
          groupId: "ECDIS",
          percent: (
            ((ROUTEINFO.value + WAYPOINTS.value + RTZ.value + ESCREEN.value) /
              (ALLROUTEINFO.value +
                ALLWAYPOINTS.value +
                ALLRTZ.value +
                ALLESCREEN.value)) *
            100
          ).toFixed(2),
        },
        {
          value: RSA.value + HTD.value,
          //+ MODE.value,
          groupId: "AUTOPILOT",
          percent: (
            ((RSA.value + HTD.value) / (ALLRSA.value + ALLHTD.value)) *
            100
          ).toFixed(2),
        },
        {
          value: VBW.value + VHW.value + VLW.value,
          groupId: "SPEEDLOG",
          percent: (
            ((VBW.value + VHW.value + VLW.value) /
              (ALLVBW.value + ALLVHW.value + ALLVLW.value)) *
            100
          ).toFixed(2),
        },
        {
          value:
            CAN_Online_State.value +
            Engine_RPM.value +
            Rudder.value +
            Rudder_Scale.value,
          groupId: "CanThrottle",
          percent: (
            ((CAN_Online_State.value +
              Engine_RPM.value +
              Rudder.value +
              Rudder_Scale.value) /
              (ALLCAN_Online_State.value +
                ALLEngine_RPM.value +
                ALLRudder.value +
                ALLRudder_Scale.value)) *
            100
          ).toFixed(2),
        },
        {
          value: AUTOPILOTCONTACT.value,
          groupId: "AUTOPILOTCONTACT",
          percent: (
            (AUTOPILOTCONTACT.value / ALLAUTOPILOTCONTACT.value) *
            100
          ).toFixed(2),
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
          percent: (
            ((NO1ENGINE_PANEL_61444.value +
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
              NO1ENGINE_PANEL_65379.value) /
              (ALLNO1ENGINE_PANEL_61444.value +
                ALLNO1ENGINE_PANEL_65262.value +
                ALLNO1ENGINE_PANEL_65263.value +
                ALLNO1ENGINE_PANEL_65272.value +
                ALLNO1ENGINE_PANEL_65271.value +
                ALLNO1ENGINE_PANEL_65253.value +
                ALLNO1ENGINE_PANEL_65270.value +
                ALLNO1ENGINE_PANEL_65276.value +
                ALLNO1ENGINE_PANEL_65360.value +
                ALLNO1ENGINE_PANEL_65361_LAMP.value +
                ALLNO1ENGINE_PANEL_65361_STATUS.value +
                ALLNO1ENGINE_PANEL_65378.value +
                ALLNO1ENGINE_PANEL_65376.value +
                ALLNO1ENGINE_PANEL_65379.value)) *
            100
          ).toFixed(2),
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
          percent: (
            ((NO2ENGINE_PANEL_61444.value +
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
              NO2ENGINE_PANEL_65379.value) /
              (ALLNO2ENGINE_PANEL_61444.value +
                ALLNO2ENGINE_PANEL_65262.value +
                ALLNO2ENGINE_PANEL_65263.value +
                ALLNO2ENGINE_PANEL_65272.value +
                ALLNO2ENGINE_PANEL_65271.value +
                ALLNO2ENGINE_PANEL_65253.value +
                ALLNO2ENGINE_PANEL_65270.value +
                ALLNO2ENGINE_PANEL_65276.value +
                ALLNO2ENGINE_PANEL_65360.value +
                ALLNO2ENGINE_PANEL_65361_LAMP.value +
                ALLNO2ENGINE_PANEL_65361_STATUS.value +
                ALLNO2ENGINE_PANEL_65378.value +
                ALLNO2ENGINE_PANEL_65376.value +
                ALLNO2ENGINE_PANEL_65379.value)) *
            100
          ).toFixed(2),
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
        [
          "GLL",
          {
            value: GLL.value,
            groupId: "GLL",
            percent: ((GLL.value / ALLGLL.value) * 100).toFixed(2),
          },
        ],
        [
          "GGA",
          {
            value: GGA.value,
            groupId: "GGA",
            percent: ((GGA.value / ALLGGA.value) * 100).toFixed(2),
          },
        ],
        [
          "RMC",
          {
            value: RMC.value,
            groupId: "RMC",
            percent: ((RMC.value / ALLRMC.value) * 100).toFixed(2),
          },
        ],
        [
          "VTG",
          {
            value: VTG.value,
            groupId: "VTG",
            percent: ((VTG.value / ALLVTG.value) * 100).toFixed(2),
          },
        ],
        [
          "ZDA",
          {
            value: ZDA.value,
            groupId: "ZDA",
            percent: ((ZDA.value / ALLZDA.value) * 100).toFixed(2),
          },
        ],
        // ["DTM", DTM.value],
        [
          "GSV",
          {
            value: GSV.value,
            groupId: "GSV",
            percent: ((GSV.value / ALLGSV.value) * 100).toFixed(2),
          },
        ],
        [
          "GSA",
          {
            value: GSA.value,
            groupId: "GSA",
            percent: ((GSA.value / ALLGSA.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "GYRO",
      data: [
        //["THS", THS.value],
        [
          "HDT",
          {
            value: HDT.value,
            groupId: "HDT",
            percent: ((HDT.value / ALLHDT.value) * 100).toFixed(2),
          },
        ],
        [
          "ROT",
          {
            value: ROT.value,
            groupId: "ROT",
            percent: ((ROT.value / ALLROT.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "ANEMOMETER",
      data: [
        [
          "MWV",
          {
            value: MWV.value,
            groupId: "MWV",
            percent: ((MWV.value / ALLMWV.value) * 100).toFixed(2),
          },
        ],
        // ["MWD", MWD.value],
        // ["VWR", VWR.value],
        // ["MTW", MTW.value],
        // ["VWT", VWT.value],
      ],
    },
    {
      dataGroupId: "RADAR",
      data: [
        // ["TTM", TTM.value],
        // ["TLL", TLL.value],
        [
          "RSCREEN",
          {
            value: RSCREEN.value,
            groupId: "RSCREEN",
            percent: ((RSCREEN.value / ALLRSCREEN.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "AIS",
      data: [
        [
          "VDM",
          {
            value: VDM.value,
            groupId: "VDM",
            percent: ((VDM.value / ALLVDM.value) * 100).toFixed(2),
          },
        ],
        [
          "VDO",
          {
            value: VDO.value,
            groupId: "VDO",
            percent: ((VDO.value / ALLVDO.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "ECDIS",
      data: [
        [
          "ROUTEINFO",
          {
            value: ROUTEINFO.value,
            groupId: "ROUTEINFO",
            percent: ((ROUTEINFO.value / ALLROUTEINFO.value) * 100).toFixed(2),
          },
        ],
        [
          "WAYPOINTS",
          {
            value: WAYPOINTS.value,
            groupId: "WAYPOINTS",
            percent: ((WAYPOINTS.value / ALLWAYPOINTS.value) * 100).toFixed(2),
          },
        ],
        [
          "RTZ",
          {
            value: RTZ.value,
            groupId: "RTZ",
            percent: ((RTZ.value / ALLRTZ.value) * 100).toFixed(2),
          },
        ],
        [
          "ESCREEN",
          {
            value: ESCREEN.value,
            groupId: "ESCREEN",
            percent: ((ESCREEN.value / ALLESCREEN.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "AUTOPILOT",
      data: [
        [
          "RSA",
          {
            value: RSA.value,
            groupId: "RSA",
            percent: ((RSA.value / ALLRSA.value) * 100).toFixed(2),
          },
        ],
        // ["MODE", MODE.value],
        [
          "HTD",
          {
            value: HTD.value,
            groupId: "HTD",
            percent: ((HTD.value / ALLHTD.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "SPEEDLOG",
      data: [
        [
          "VBW",
          {
            value: VBW.value,
            groupId: "VBW",
            percent: ((VBW.value / ALLVBW.value) * 100).toFixed(2),
          },
        ],
        [
          "VHW",
          {
            value: VHW.value,
            groupId: "VHW",
            percent: ((VHW.value / ALLVHW.value) * 100).toFixed(2),
          },
        ],
        [
          "VLW",
          {
            value: VLW.value,
            groupId: "VLW",
            percent: ((VLW.value / ALLVLW.value) * 100).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "CanThrottle",
      data: [
        [
          "CAN_Online_State,",
          {
            value: CAN_Online_State.value,
            groupId: "CAN_Online_State",
            percent: (
              (CAN_Online_State.value / ALLCAN_Online_State.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "Engine_RPM,",
          {
            value: Engine_RPM.value,
            groupId: "Engine_RPM",
            percent: ((Engine_RPM.value / ALLEngine_RPM.value) * 100).toFixed(
              2
            ),
          },
        ],
        [
          "Rudder,",
          {
            value: Rudder.value,
            groupId: "Rudder",
            percent: ((Rudder.value / ALLRudder.value) * 100).toFixed(2),
          },
        ],
        [
          "Rudder_Scale,",
          {
            value: Rudder_Scale.value,
            groupId: "Rudder_Scale",
            percent: (
              (Rudder_Scale.value / ALLRudder_Scale.value) *
              100
            ).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "AUTOPILOTCONTACT",
      data: [
        [
          "AUTOPILOTCONTACT",
          {
            value: AUTOPILOTCONTACT.value,
            groupId: "AUTOPILOTCONTACT",
            percent: (
              (AUTOPILOTCONTACT.value / ALLAUTOPILOTCONTACT.value) *
              100
            ).toFixed(2),
          },
        ],
      ],
    },

    {
      dataGroupId: "NO.1ENGINE",
      data: [
        [
          "61444",
          {
            value: NO1ENGINE_PANEL_61444.value,
            groupId: "NO1ENGINE_PANEL_61444",
            percent: (
              (NO1ENGINE_PANEL_61444.value / ALLNO1ENGINE_PANEL_61444.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65262",
          {
            value: NO1ENGINE_PANEL_65262.value,
            groupId: "NO1ENGINE_PANEL_65262",
            percent: (
              (NO1ENGINE_PANEL_65262.value / ALLNO1ENGINE_PANEL_65262.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65263",
          {
            value: NO1ENGINE_PANEL_65263.value,
            groupId: "NO1ENGINE_PANEL_65263",
            percent: (
              (NO1ENGINE_PANEL_65263.value / ALLNO1ENGINE_PANEL_65263.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65272",
          {
            value: NO1ENGINE_PANEL_65272.value,
            groupId: "NO1ENGINE_PANEL_65272",
            percent: (
              (NO1ENGINE_PANEL_65272.value / ALLNO1ENGINE_PANEL_65272.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65271",
          {
            value: NO1ENGINE_PANEL_65271.value,
            groupId: "NO1ENGINE_PANEL_65271",
            percent: (
              (NO1ENGINE_PANEL_65271.value / ALLNO1ENGINE_PANEL_65271.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65253",
          {
            value: NO1ENGINE_PANEL_65253.value,
            groupId: "NO1ENGINE_PANEL_65253",
            percent: (
              (NO1ENGINE_PANEL_65253.value / ALLNO1ENGINE_PANEL_65253.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65270",
          {
            value: NO1ENGINE_PANEL_65270.value,
            groupId: "NO1ENGINE_PANEL_65270",
            percent: (
              (NO1ENGINE_PANEL_65270.value / ALLNO1ENGINE_PANEL_65270.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65276",
          {
            value: NO1ENGINE_PANEL_65276.value,
            groupId: "NO1ENGINE_PANEL_65276",
            percent: (
              (NO1ENGINE_PANEL_65276.value / ALLNO1ENGINE_PANEL_65276.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65360",
          {
            value: NO1ENGINE_PANEL_65360.value,
            groupId: "NO1ENGINE_PANEL_65360",
            percent: (
              (NO1ENGINE_PANEL_65360.value / ALLNO1ENGINE_PANEL_65360.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65361_LAMP",
          {
            value: NO1ENGINE_PANEL_65361_LAMP.value,
            groupId: "NO1ENGINE_PANEL_65361_LAMP",
            percent: (
              (NO1ENGINE_PANEL_65361_LAMP.value /
                ALLNO1ENGINE_PANEL_65361_LAMP.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65361_STATUS",
          {
            value: NO1ENGINE_PANEL_65361_STATUS.value,
            groupId: "NO1ENGINE_PANEL_65361_STATUS",
            percent: (
              (NO1ENGINE_PANEL_65361_STATUS.value /
                ALLNO1ENGINE_PANEL_65361_STATUS.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65378",
          {
            value: NO1ENGINE_PANEL_65378.value,
            groupId: "NO1ENGINE_PANEL_65378",
            percent: (
              (NO1ENGINE_PANEL_65378.value / ALLNO1ENGINE_PANEL_65378.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65376",
          {
            value: NO1ENGINE_PANEL_65376.value,
            groupId: "NO1ENGINE_PANEL_65376",
            percent: (
              (NO1ENGINE_PANEL_65376.value / ALLNO1ENGINE_PANEL_65376.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65379",
          {
            value: NO1ENGINE_PANEL_65379.value,
            groupId: "NO1ENGINE_PANEL_65379",
            percent: (
              (NO1ENGINE_PANEL_65379.value / ALLNO1ENGINE_PANEL_65379.value) *
              100
            ).toFixed(2),
          },
        ],
      ],
    },
    {
      dataGroupId: "NO.2ENGINE",
      data: [
        [
          "61444",
          {
            value: NO2ENGINE_PANEL_61444.value,
            groupId: "NO2ENGINE_PANEL_61444",
            percent: (
              (NO2ENGINE_PANEL_61444.value / ALLNO2ENGINE_PANEL_61444.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65262",
          {
            value: NO2ENGINE_PANEL_65262.value,
            groupId: "NO2ENGINE_PANEL_65262",
            percent: (
              (NO2ENGINE_PANEL_65262.value / ALLNO2ENGINE_PANEL_65262.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65263",
          {
            value: NO2ENGINE_PANEL_65263.value,
            groupId: "NO2ENGINE_PANEL_65263",
            percent: (
              (NO2ENGINE_PANEL_65263.value / ALLNO2ENGINE_PANEL_65263.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65272",
          {
            value: NO2ENGINE_PANEL_65272.value,
            groupId: "NO2ENGINE_PANEL_65272",
            percent: (
              (NO2ENGINE_PANEL_65272.value / ALLNO2ENGINE_PANEL_65272.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65271",
          {
            value: NO2ENGINE_PANEL_65271.value,
            groupId: "NO2ENGINE_PANEL_65271",
            percent: (
              (NO2ENGINE_PANEL_65271.value / ALLNO2ENGINE_PANEL_65271.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65253",
          {
            value: NO2ENGINE_PANEL_65253.value,
            groupId: "NO2ENGINE_PANEL_65253",
            percent: (
              (NO2ENGINE_PANEL_65253.value / ALLNO2ENGINE_PANEL_65253.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65270",
          {
            value: NO2ENGINE_PANEL_65270.value,
            groupId: "NO2ENGINE_PANEL_65270",
            percent: (
              (NO2ENGINE_PANEL_65270.value / ALLNO2ENGINE_PANEL_65270.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65276",
          {
            value: NO2ENGINE_PANEL_65276.value,
            groupId: "NO2ENGINE_PANEL_65276",
            percent: (
              (NO2ENGINE_PANEL_65276.value / ALLNO2ENGINE_PANEL_65276.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65360",
          {
            value: NO2ENGINE_PANEL_65360.value,
            groupId: "NO2ENGINE_PANEL_65360",
            percent: (
              (NO2ENGINE_PANEL_65360.value / ALLNO2ENGINE_PANEL_65360.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65361_LAMP",
          {
            value: NO2ENGINE_PANEL_65361_LAMP.value,
            groupId: "NO2ENGINE_PANEL_65361_LAMP",
            percent: (
              (NO2ENGINE_PANEL_65361_LAMP.value /
                ALLNO2ENGINE_PANEL_65361_LAMP.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65361_STATUS",
          {
            value: NO2ENGINE_PANEL_65361_STATUS.value,
            groupId: "NO2ENGINE_PANEL_65361_STATUS",
            percent: (
              (NO2ENGINE_PANEL_65361_STATUS.value /
                ALLNO2ENGINE_PANEL_65361_STATUS.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65378",
          {
            value: NO2ENGINE_PANEL_65378.value,
            groupId: "NO2ENGINE_PANEL_65378",
            percent: (
              (NO2ENGINE_PANEL_65378.value / ALLNO2ENGINE_PANEL_65378.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65376",
          {
            value: NO2ENGINE_PANEL_65376.value,
            groupId: "NO2ENGINE_PANEL_65376",
            percent: (
              (NO2ENGINE_PANEL_65376.value / ALLNO2ENGINE_PANEL_65376.value) *
              100
            ).toFixed(2),
          },
        ],
        [
          "65379",
          {
            value: NO2ENGINE_PANEL_65379.value,
            groupId: "NO2ENGINE_PANEL_65379",
            percent: (
              (NO2ENGINE_PANEL_65379.value / ALLNO2ENGINE_PANEL_65379.value) *
              100
            ).toFixed(2),
          },
        ],
      ],
      // [
      //   ["61444", NO2ENGINE_PANEL_61444.value],
      //   ["65262", NO2ENGINE_PANEL_65262.value],
      //   ["65263", NO2ENGINE_PANEL_65263.value],
      //   ["65272", NO2ENGINE_PANEL_65272.value],
      //   ["65271", NO2ENGINE_PANEL_65271.value],
      //   ["65253", NO2ENGINE_PANEL_65253.value],
      //   ["65270", NO2ENGINE_PANEL_65270.value],
      //   ["65276", NO2ENGINE_PANEL_65276.value],
      //   ["65360", NO2ENGINE_PANEL_65360.value],
      //   ["65361_LAMP", NO2ENGINE_PANEL_65361_LAMP.value],
      //   ["65361_STATUS", NO2ENGINE_PANEL_65361_STATUS.value],
      //   ["65378", NO2ENGINE_PANEL_65378.value],
      //   ["65376", NO2ENGINE_PANEL_65376.value],
      //   ["65379", NO2ENGINE_PANEL_65379.value],
      // ],
    },
    // 다른 drilldown 데이터도 추가
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
