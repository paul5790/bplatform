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

const createRefObject = () => {
  const refs = {};
  const dataRef = {};

  const createRef = (key) => {
    refs[key] = ref(0);
    refs[`ALL${key}`] = ref(0);
    dataRef[key] = ref(0);
    dataRef[`ALL${key}`] = ref(0);
  };

  const keys = [
    "GLL",
    "GGA",
    "RMC",
    "VTG",
    "ZDA",
    "GSV",
    "GSA",
    "HDT",
    "ROT",
    "MWV",
    "RSCREEN",
    "VDM",
    "VDO",
    "ROUTEINFO",
    "WAYPOINTS",
    "RTZ",
    "ESCREEN",
    "RSA",
    "HTD",
    "VBW",
    "VHW",
    "VLW",
    "CAN_Online_State",
    "Engine_RPM",
    "Rudder",
    "Rudder_Scale",
    "AUTOPILOTCONTACT",
    "NO1ENGINE_PANEL_61444",
    "NO1ENGINE_PANEL_65262",
    "NO1ENGINE_PANEL_65263",
    "NO1ENGINE_PANEL_65272",
    "NO1ENGINE_PANEL_65271",
    "NO1ENGINE_PANEL_65253",
    "NO1ENGINE_PANEL_65270",
    "NO1ENGINE_PANEL_65276",
    "NO1ENGINE_PANEL_65360",
    "NO1ENGINE_PANEL_65361_LAMP",
    "NO1ENGINE_PANEL_65361_STATUS",
    "NO1ENGINE_PANEL_65378",
    "NO1ENGINE_PANEL_65376",
    "NO1ENGINE_PANEL_65379",
    "NO2ENGINE_PANEL_61444",
    "NO2ENGINE_PANEL_65262",
    "NO2ENGINE_PANEL_65263",
    "NO2ENGINE_PANEL_65272",
    "NO2ENGINE_PANEL_65271",
    "NO2ENGINE_PANEL_65253",
    "NO2ENGINE_PANEL_65270",
    "NO2ENGINE_PANEL_65276",
    "NO2ENGINE_PANEL_65360",
    "NO2ENGINE_PANEL_65361_LAMP",
    "NO2ENGINE_PANEL_65361_STATUS",
    "NO2ENGINE_PANEL_65378",
    "NO2ENGINE_PANEL_65376",
    "NO2ENGINE_PANEL_65379",
  ];

  keys.forEach((key) => createRef(key));

  return { refs, dataRef };
};

const { refs, dataRef } = createRefObject();

const dataRefs = [
  refs.GLL,
  refs.GGA,
  refs.RMC,
  refs.VTG,
  refs.ZDA,
  refs.GSV,
  refs.GSA,
  refs.HDT,
  refs.ROT,
  refs.MWV,
  refs.RSCREEN,
  refs.VDM,
  refs.VDO,
  refs.ROUTEINFO,
  refs.WAYPOINTS,
  refs.RTZ,
  refs.ESCREEN,
  refs.RSA,
  refs.HTD,
  refs.VBW,
  refs.VHW,
  refs.VLW,
  refs.CAN_Online_State,
  refs.Engine_RPM,
  refs.Rudder,
  refs.Rudder_Scale,
  refs.AUTOPILOTCONTACT,
  refs.NO1ENGINE_PANEL_61444,
  refs.NO1ENGINE_PANEL_65262,
  refs.NO1ENGINE_PANEL_65263,
  refs.NO1ENGINE_PANEL_65272,
  refs.NO1ENGINE_PANEL_65271,
  refs.NO1ENGINE_PANEL_65253,
  refs.NO1ENGINE_PANEL_65270,
  refs.NO1ENGINE_PANEL_65276,
  refs.NO1ENGINE_PANEL_65360,
  refs.NO1ENGINE_PANEL_65361_LAMP,
  refs.NO1ENGINE_PANEL_65361_STATUS,
  refs.NO1ENGINE_PANEL_65378,
  refs.NO1ENGINE_PANEL_65376,
  refs.NO1ENGINE_PANEL_65379,
  refs.NO2ENGINE_PANEL_61444,
  refs.NO2ENGINE_PANEL_65262,
  refs.NO2ENGINE_PANEL_65263,
  refs.NO2ENGINE_PANEL_65272,
  refs.NO2ENGINE_PANEL_65271,
  refs.NO2ENGINE_PANEL_65253,
  refs.NO2ENGINE_PANEL_65270,
  refs.NO2ENGINE_PANEL_65276,
  refs.NO2ENGINE_PANEL_65360,
  refs.NO2ENGINE_PANEL_65361_LAMP,
  refs.NO2ENGINE_PANEL_65361_STATUS,
  refs.NO2ENGINE_PANEL_65378,
  refs.NO2ENGINE_PANEL_65376,
  refs.NO2ENGINE_PANEL_65379,
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
  refs.ALLGLL,
  refs.ALLGGA,
  refs.ALLRMC,
  refs.ALLVTG,
  refs.ALLZDA,
  refs.ALLGSV,
  refs.ALLGSA,
  refs.ALLHDT,
  refs.ALLROT,
  refs.ALLMWV,
  refs.ALLRSCREEN,
  refs.ALLVDM,
  refs.ALLVDO,
  refs.ALLROUTEINFO,
  refs.ALLWAYPOINTS,
  refs.ALLRTZ,
  refs.ALLESCREEN,
  refs.ALLRSA,
  refs.ALLHTD,
  refs.ALLVBW,
  refs.ALLVHW,
  refs.ALLVLW,
  refs.ALLCAN_Online_State,
  refs.ALLEngine_RPM,
  refs.ALLRudder,
  refs.ALLRudder_Scale,
  refs.ALLAUTOPILOTCONTACT,
  refs.ALLNO1ENGINE_PANEL_61444,
  refs.ALLNO1ENGINE_PANEL_65262,
  refs.ALLNO1ENGINE_PANEL_65263,
  refs.ALLNO1ENGINE_PANEL_65272,
  refs.ALLNO1ENGINE_PANEL_65271,
  refs.ALLNO1ENGINE_PANEL_65253,
  refs.ALLNO1ENGINE_PANEL_65270,
  refs.ALLNO1ENGINE_PANEL_65276,
  refs.ALLNO1ENGINE_PANEL_65360,
  refs.ALLNO1ENGINE_PANEL_65361_LAMP,
  refs.ALLNO1ENGINE_PANEL_65361_STATUS,
  refs.ALLNO1ENGINE_PANEL_65378,
  refs.ALLNO1ENGINE_PANEL_65376,
  refs.ALLNO1ENGINE_PANEL_65379,
  refs.ALLNO2ENGINE_PANEL_61444,
  refs.ALLNO2ENGINE_PANEL_65262,
  refs.ALLNO2ENGINE_PANEL_65263,
  refs.ALLNO2ENGINE_PANEL_65272,
  refs.ALLNO2ENGINE_PANEL_65271,
  refs.ALLNO2ENGINE_PANEL_65253,
  refs.ALLNO2ENGINE_PANEL_65270,
  refs.ALLNO2ENGINE_PANEL_65276,
  refs.ALLNO2ENGINE_PANEL_65360,
  refs.ALLNO2ENGINE_PANEL_65361_LAMP,
  refs.ALLNO2ENGINE_PANEL_65361_STATUS,
  refs.ALLNO2ENGINE_PANEL_65378,
  refs.ALLNO2ENGINE_PANEL_65376,
  refs.ALLNO2ENGINE_PANEL_65379,
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

const createDataObject = (groupId, values, allValues) => {
  console.log("red");
  const valueSum = values.reduce((acc, val) => acc + val.value, 0);
  const allValueSum = allValues.reduce((acc, val) => acc + val.value, 0);
  const percent = ((valueSum / allValueSum) * 100).toFixed(2);

  return {
    value: valueSum,
    groupId: groupId,
    percent: percent,
    itemStyle: {
      color: percent > 30 ? '#FF6666' : undefined // 30% 초과 시 빨간색, 이하 시 기본 색상 (여기서는 파란색)
    }
  };
};

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

    console.log("2: "+ dataRefs[0].value);
    console.log("2: "+ alldataRefs[0].value);

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

const option = ref({
  title: {
    text: "항차 별 데이터 소실 빈도",
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
      color: textColor.value,
    },
  },
  tooltip: {
    formatter: function (params) {
      // params에서 필요한 정보 추출
      let groupId = params.data ? params.data.groupId : null; // groupId 값
      let value = params.data ? params.data.value : null; // value 값
      let percent = params.data ? params.data.percent : null;
      // params.data가 존재하고 groupId, value, percent 속성이 존재하는지 확인
      if (params.data && groupId !== null && value !== null && percent !== null) {
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
      createDataObject(
        "DGPS",
        [refs.GLL, refs.GGA, refs.RMC, refs.VTG, refs.ZDA, refs.GSV, refs.GSA],
        [refs.ALLGLL, refs.ALLGGA, refs.ALLRMC, refs.ALLVTG, refs.ALLZDA, refs.ALLGSV, refs.ALLGSA]
      ),
      createDataObject("GYRO", [refs.HDT, refs.ROT], [refs.ALLHDT, refs.ALLROT]),
      createDataObject("ANEMOMETER", [refs.MWV], [refs.ALLMWV]),
      createDataObject("RADAR", [refs.RSCREEN], [refs.ALLRSCREEN]),
      createDataObject("AIS", [refs.VDM, refs.VDO], [refs.ALLVDM, refs.ALLVDO]),
      createDataObject(
        "ECDIS",
        [refs.ROUTEINFO, refs.WAYPOINTS, refs.RTZ, refs.ESCREEN],
        [refs.ALLROUTEINFO, refs.ALLWAYPOINTS, refs.ALLRTZ, refs.ALLESCREEN]
      ),
      createDataObject("AUTOPILOT", [refs.RSA, refs.HTD], [refs.ALLRSA, refs.ALLHTD]),
      createDataObject(
        "SPEEDLOG",
        [refs.VBW, refs.VHW, refs.VLW],
        [refs.ALLVBW, refs.ALLVHW, refs.ALLVLW]
      ),
      createDataObject(
        "CanThrottle",
        [refs.CAN_Online_State, refs.Engine_RPM, refs.Rudder, refs.Rudder_Scale],
        [refs.ALLCAN_Online_State, refs.ALLEngine_RPM, refs.ALLRudder, refs.ALLRudder_Scale]
      ),
      createDataObject(
        "AUTOPILOTCONTACT",
        [refs.AUTOPILOTCONTACT],
        [refs.ALLAUTOPILOTCONTACT]
      ),
      createDataObject(
        "NO.1ENGINE",
        [
          refs.NO1ENGINE_PANEL_61444,
          refs.NO1ENGINE_PANEL_65262,
          refs.NO1ENGINE_PANEL_65263,
          refs.NO1ENGINE_PANEL_65272,
          refs.NO1ENGINE_PANEL_65271,
          refs.NO1ENGINE_PANEL_65253,
          refs.NO1ENGINE_PANEL_65270,
          refs.NO1ENGINE_PANEL_65276,
          refs.NO1ENGINE_PANEL_65360,
          refs.NO1ENGINE_PANEL_65361_LAMP,
          refs.NO1ENGINE_PANEL_65361_STATUS,
          refs.NO1ENGINE_PANEL_65378,
          refs.NO1ENGINE_PANEL_65376,
          refs.NO1ENGINE_PANEL_65379,
        ],
        [
          refs.ALLNO1ENGINE_PANEL_61444,
          refs.ALLNO1ENGINE_PANEL_65262,
          refs.ALLNO1ENGINE_PANEL_65263,
          refs.ALLNO1ENGINE_PANEL_65272,
          refs.ALLNO1ENGINE_PANEL_65271,
          refs.ALLNO1ENGINE_PANEL_65253,
          refs.ALLNO1ENGINE_PANEL_65270,
          refs.ALLNO1ENGINE_PANEL_65276,
          refs.ALLNO1ENGINE_PANEL_65360,
          refs.ALLNO1ENGINE_PANEL_65361_LAMP,
          refs.ALLNO1ENGINE_PANEL_65361_STATUS,
          refs.ALLNO1ENGINE_PANEL_65378,
          refs.ALLNO1ENGINE_PANEL_65376,
          refs.ALLNO1ENGINE_PANEL_65379,
        ]
      ),
      createDataObject(
        "NO.2ENGINE",
        [
          refs.NO2ENGINE_PANEL_61444,
          refs.NO2ENGINE_PANEL_65262,
          refs.NO2ENGINE_PANEL_65263,
          refs.NO2ENGINE_PANEL_65272,
          refs.NO2ENGINE_PANEL_65271,
          refs.NO2ENGINE_PANEL_65253,
          refs.NO2ENGINE_PANEL_65270,
          refs.NO2ENGINE_PANEL_65276,
          refs.NO2ENGINE_PANEL_65360,
          refs.NO2ENGINE_PANEL_65361_LAMP,
          refs.NO2ENGINE_PANEL_65361_STATUS,
          refs.NO2ENGINE_PANEL_65378,
          refs.NO2ENGINE_PANEL_65376,
          refs.NO2ENGINE_PANEL_65379,
        ],
        [
          refs.ALLNO2ENGINE_PANEL_61444,
          refs.ALLNO2ENGINE_PANEL_65262,
          refs.ALLNO2ENGINE_PANEL_65263,
          refs.ALLNO2ENGINE_PANEL_65272,
          refs.ALLNO2ENGINE_PANEL_65271,
          refs.ALLNO2ENGINE_PANEL_65253,
          refs.ALLNO2ENGINE_PANEL_65270,
          refs.ALLNO2ENGINE_PANEL_65276,
          refs.ALLNO2ENGINE_PANEL_65360,
          refs.ALLNO2ENGINE_PANEL_65361_LAMP,
          refs.ALLNO2ENGINE_PANEL_65361_STATUS,
          refs.ALLNO2ENGINE_PANEL_65378,
          refs.ALLNO2ENGINE_PANEL_65376,
          refs.ALLNO2ENGINE_PANEL_65379,
        ]
      ),
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
    console.log(subData);
    if (subData) {
      const xAxisData = subData.data.map((item) => item[0]);
      const seriesData = subData.data.map((item) => item[1]);
      console.log(xAxisData);
      console.log(seriesData);

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
                      [refs.GLL, refs.GGA, refs.RMC, refs.VTG, refs.ZDA, refs.GSV, refs.GSA],
                      [refs.ALLGLL, refs.ALLGGA, refs.ALLRMC, refs.ALLVTG, refs.ALLZDA, refs.ALLGSV, refs.ALLGSA]
                    ),
                    createDataObject("GYRO", [refs.HDT, refs.ROT], [refs.ALLHDT, refs.ALLROT]),
                    createDataObject("ANEMOMETER", [refs.MWV], [refs.ALLMWV]),
                    createDataObject("RADAR", [refs.RSCREEN], [refs.ALLRSCREEN]),
                    createDataObject("AIS", [refs.VDM, refs.VDO], [refs.ALLVDM, refs.ALLVDO]),
                    createDataObject(
                      "ECDIS",
                      [refs.ROUTEINFO, refs.WAYPOINTS, refs.RTZ, refs.ESCREEN],
                      [refs.ALLROUTEINFO, refs.ALLWAYPOINTS, refs.ALLRTZ, refs.ALLESCREEN]
                    ),
                    createDataObject("AUTOPILOT", [refs.RSA, refs.HTD], [refs.ALLRSA, refs.ALLHTD]),
                    createDataObject(
                      "SPEEDLOG",
                      [refs.VBW, refs.VHW, refs.VLW],
                      [refs.ALLVBW, refs.ALLVHW, refs.ALLVLW]
                    ),
                    createDataObject(
                      "CanThrottle",
                      [refs.CAN_Online_State, refs.Engine_RPM, refs.Rudder, refs.Rudder_Scale],
                      [
                        refs.ALLCAN_Online_State,
                        refs.ALLEngine_RPM,
                        refs.ALLRudder,
                        refs.ALLRudder_Scale,
                      ]
                    ),
                    createDataObject(
                      "AUTOPILOTCONTACT",
                      [refs.AUTOPILOTCONTACT],
                      [refs.ALLAUTOPILOTCONTACT]
                    ),
                    createDataObject(
                      "NO.1ENGINE",
                      [
                        refs.NO1ENGINE_PANEL_61444,
                        refs.NO1ENGINE_PANEL_65262,
                        refs.NO1ENGINE_PANEL_65263,
                        refs.NO1ENGINE_PANEL_65272,
                        refs.NO1ENGINE_PANEL_65271,
                        refs.NO1ENGINE_PANEL_65253,
                        refs.NO1ENGINE_PANEL_65270,
                        refs.NO1ENGINE_PANEL_65276,
                        refs.NO1ENGINE_PANEL_65360,
                        refs.NO1ENGINE_PANEL_65361_LAMP,
                        refs.NO1ENGINE_PANEL_65361_STATUS,
                        refs.NO1ENGINE_PANEL_65378,
                        refs.NO1ENGINE_PANEL_65376,
                        refs.NO1ENGINE_PANEL_65379,
                      ],
                      [
                        refs.ALLNO1ENGINE_PANEL_61444,
                        refs.ALLNO1ENGINE_PANEL_65262,
                        refs.ALLNO1ENGINE_PANEL_65263,
                        refs.ALLNO1ENGINE_PANEL_65272,
                        refs.ALLNO1ENGINE_PANEL_65271,
                        refs.ALLNO1ENGINE_PANEL_65253,
                        refs.ALLNO1ENGINE_PANEL_65270,
                        refs.ALLNO1ENGINE_PANEL_65276,
                        refs.ALLNO1ENGINE_PANEL_65360,
                        refs.ALLNO1ENGINE_PANEL_65361_LAMP,
                        refs.ALLNO1ENGINE_PANEL_65361_STATUS,
                        refs.ALLNO1ENGINE_PANEL_65378,
                        refs.ALLNO1ENGINE_PANEL_65376,
                        refs.ALLNO1ENGINE_PANEL_65379,
                      ]
                    ),
                    createDataObject(
                      "NO.2ENGINE",
                      [
                        refs.NO2ENGINE_PANEL_61444,
                        refs.NO2ENGINE_PANEL_65262,
                        refs.NO2ENGINE_PANEL_65263,
                        refs.NO2ENGINE_PANEL_65272,
                        refs.NO2ENGINE_PANEL_65271,
                        refs.NO2ENGINE_PANEL_65253,
                        refs.NO2ENGINE_PANEL_65270,
                        refs.NO2ENGINE_PANEL_65276,
                        refs.NO2ENGINE_PANEL_65360,
                        refs.NO2ENGINE_PANEL_65361_LAMP,
                        refs.NO2ENGINE_PANEL_65361_STATUS,
                        refs.NO2ENGINE_PANEL_65378,
                        refs.NO2ENGINE_PANEL_65376,
                        refs.NO2ENGINE_PANEL_65379,
                      ],
                      [
                        refs.ALLNO2ENGINE_PANEL_61444,
                        refs.ALLNO2ENGINE_PANEL_65262,
                        refs.ALLNO2ENGINE_PANEL_65263,
                        refs.ALLNO2ENGINE_PANEL_65272,
                        refs.ALLNO2ENGINE_PANEL_65271,
                        refs.ALLNO2ENGINE_PANEL_65253,
                        refs.ALLNO2ENGINE_PANEL_65270,
                        refs.ALLNO2ENGINE_PANEL_65276,
                        refs.ALLNO2ENGINE_PANEL_65360,
                        refs.ALLNO2ENGINE_PANEL_65361_LAMP,
                        refs.ALLNO2ENGINE_PANEL_65361_STATUS,
                        refs.ALLNO2ENGINE_PANEL_65378,
                        refs.ALLNO2ENGINE_PANEL_65376,
                        refs.ALLNO2ENGINE_PANEL_65379,
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
    itemStyle: {
    color: ((value / allValue) * 100) > 30 ? '#FF6666' : undefined // 소실률이 30% 초과 시 빨간색
  }
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
          color: textColor.value,
        },
      },
      series: {
        type: "bar",
        id: "sales",
        data: [
          createDataObject(
            "DGPS",
            [refs.GLL, refs.GGA, refs.RMC, refs.VTG, refs.ZDA, refs.GSV, refs.GSA],
            [refs.ALLGLL, refs.ALLGGA, refs.ALLRMC, refs.ALLVTG, refs.ALLZDA, refs.ALLGSV, refs.ALLGSA]
          ),
          createDataObject("GYRO", [refs.HDT, refs.ROT], [refs.ALLHDT, refs.ALLROT]),
          createDataObject("ANEMOMETER", [refs.MWV], [refs.ALLMWV]),
          createDataObject("RADAR", [refs.RSCREEN], [refs.ALLRSCREEN]),
          createDataObject("AIS", [refs.VDM, refs.VDO], [refs.ALLVDM, refs.ALLVDO]),
          createDataObject(
            "ECDIS",
            [refs.ROUTEINFO, refs.WAYPOINTS, refs.RTZ, refs.ESCREEN],
            [refs.ALLROUTEINFO, refs.ALLWAYPOINTS, refs.ALLRTZ, refs.ALLESCREEN]
          ),
          createDataObject("AUTOPILOT", [refs.RSA, refs.HTD], [refs.ALLRSA, refs.ALLHTD]),
          createDataObject(
            "SPEEDLOG",
            [refs.VBW, refs.VHW, refs.VLW],
            [refs.ALLVBW, refs.ALLVHW, refs.ALLVLW]
          ),
          createDataObject(
            "CanThrottle",
            [refs.CAN_Online_State, refs.Engine_RPM, refs.Rudder, refs.Rudder_Scale],
            [refs.ALLCAN_Online_State, refs.ALLEngine_RPM, refs.ALLRudder, refs.ALLRudder_Scale]
          ),
          createDataObject(
            "AUTOPILOTCONTACT",
            [refs.AUTOPILOTCONTACT],
            [refs.ALLAUTOPILOTCONTACT]
          ),
          createDataObject(
            "NO.1ENGINE",
            [
              refs.NO1ENGINE_PANEL_61444,
              refs.NO1ENGINE_PANEL_65262,
              refs.NO1ENGINE_PANEL_65263,
              refs.NO1ENGINE_PANEL_65272,
              refs.NO1ENGINE_PANEL_65271,
              refs.NO1ENGINE_PANEL_65253,
              refs.NO1ENGINE_PANEL_65270,
              refs.NO1ENGINE_PANEL_65276,
              refs.NO1ENGINE_PANEL_65360,
              refs.NO1ENGINE_PANEL_65361_LAMP,
              refs.NO1ENGINE_PANEL_65361_STATUS,
              refs.NO1ENGINE_PANEL_65378,
              refs.NO1ENGINE_PANEL_65376,
              refs.NO1ENGINE_PANEL_65379,
            ],
            [
              refs.ALLNO1ENGINE_PANEL_61444,
              refs.ALLNO1ENGINE_PANEL_65262,
              refs.ALLNO1ENGINE_PANEL_65263,
              refs.ALLNO1ENGINE_PANEL_65272,
              refs.ALLNO1ENGINE_PANEL_65271,
              refs.ALLNO1ENGINE_PANEL_65253,
              refs.ALLNO1ENGINE_PANEL_65270,
              refs.ALLNO1ENGINE_PANEL_65276,
              refs.ALLNO1ENGINE_PANEL_65360,
              refs.ALLNO1ENGINE_PANEL_65361_LAMP,
              refs.ALLNO1ENGINE_PANEL_65361_STATUS,
              refs.ALLNO1ENGINE_PANEL_65378,
              refs.ALLNO1ENGINE_PANEL_65376,
              refs.ALLNO1ENGINE_PANEL_65379,
            ]
          ),
          createDataObject(
            "NO.2ENGINE",
            [
              refs.NO2ENGINE_PANEL_61444,
              refs.NO2ENGINE_PANEL_65262,
              refs.NO2ENGINE_PANEL_65263,
              refs.NO2ENGINE_PANEL_65272,
              refs.NO2ENGINE_PANEL_65271,
              refs.NO2ENGINE_PANEL_65253,
              refs.NO2ENGINE_PANEL_65270,
              refs.NO2ENGINE_PANEL_65276,
              refs.NO2ENGINE_PANEL_65360,
              refs.NO2ENGINE_PANEL_65361_LAMP,
              refs.NO2ENGINE_PANEL_65361_STATUS,
              refs.NO2ENGINE_PANEL_65378,
              refs.NO2ENGINE_PANEL_65376,
              refs.NO2ENGINE_PANEL_65379,
            ],
            [
              refs.ALLNO2ENGINE_PANEL_61444,
              refs.ALLNO2ENGINE_PANEL_65262,
              refs.ALLNO2ENGINE_PANEL_65263,
              refs.ALLNO2ENGINE_PANEL_65272,
              refs.ALLNO2ENGINE_PANEL_65271,
              refs.ALLNO2ENGINE_PANEL_65253,
              refs.ALLNO2ENGINE_PANEL_65270,
              refs.ALLNO2ENGINE_PANEL_65276,
              refs.ALLNO2ENGINE_PANEL_65360,
              refs.ALLNO2ENGINE_PANEL_65361_LAMP,
              refs.ALLNO2ENGINE_PANEL_65361_STATUS,
              refs.ALLNO2ENGINE_PANEL_65378,
              refs.ALLNO2ENGINE_PANEL_65376,
              refs.ALLNO2ENGINE_PANEL_65379,
            ]
          ),
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
          ["GLL", updateDataObject("GLL", refs.GLL.value, refs.ALLGLL.value)],
          ["GGA", updateDataObject("GGA", refs.GGA.value, refs.ALLGGA.value)],
          ["RMC", updateDataObject("RMC", refs.RMC.value, refs.ALLRMC.value)],
          ["VTG", updateDataObject("VTG", refs.VTG.value, refs.ALLVTG.value)],
          ["ZDA", updateDataObject("ZDA", refs.ZDA.value, refs.ALLZDA.value)],
          ["GSV", updateDataObject("GSV", refs.GSV.value, refs.ALLGSV.value)],
          ["GSA", updateDataObject("GSA", refs.GSA.value, refs.ALLGSA.value)],
        ],
      },
      {
        dataGroupId: "GYRO",
        data: [
          ["HDT", updateDataObject("HDT", refs.HDT.value, refs.ALLHDT.value)],
          ["ROT", updateDataObject("ROT", refs.ROT.value, refs.ALLROT.value)],
        ],
      },
      {
        dataGroupId: "ANEMOMETER",
        data: [["MWV", updateDataObject("MWV", refs.MWV.value, refs.ALLMWV.value)]],
      },
      {
        dataGroupId: "RADAR",
        data: [
          [
            "RSCREEN",
            updateDataObject("RSCREEN", refs.RSCREEN.value, refs.ALLRSCREEN.value),
          ],
        ],
      },
      {
        dataGroupId: "AIS",
        data: [
          ["VDM", updateDataObject("VDM", refs.VDM.value, refs.ALLVDM.value)],
          ["VDO", updateDataObject("VDO", refs.VDO.value, refs.ALLVDO.value)],
        ],
      },
      {
        dataGroupId: "ECDIS",
        data: [
          [
            "ROUTEINFO",
            updateDataObject("ROUTEINFO", refs.ROUTEINFO.value, refs.ALLROUTEINFO.value),
          ],
          [
            "WAYPOINTS",
            updateDataObject("WAYPOINTS", refs.WAYPOINTS.value, refs.ALLWAYPOINTS.value),
          ],
          ["RTZ", updateDataObject("RTZ", refs.RTZ.value, refs.ALLRTZ.value)],
          [
            "ESCREEN",
            updateDataObject("ESCREEN", refs.ESCREEN.value, refs.ALLESCREEN.value),
          ],
        ],
      },
      {
        dataGroupId: "AUTOPILOT",
        data: [
          ["RSA", updateDataObject("RSA", refs.RSA.value, refs.ALLRSA.value)],
          ["HTD", updateDataObject("HTD", refs.HTD.value, refs.ALLHTD.value)],
        ],
      },
      {
        dataGroupId: "SPEEDLOG",
        data: [
          ["VBW", updateDataObject("VBW", refs.VBW.value, refs.ALLVBW.value)],
          ["VHW", updateDataObject("VHW", refs.VHW.value, refs.ALLVHW.value)],
          ["VLW", updateDataObject("VLW", refs.VLW.value, refs.ALLVLW.value)],
        ],
      },
      {
        dataGroupId: "CanThrottle",
        data: [
          [
            "CAN_Online_State",
            updateDataObject(
              "CAN_Online_State",
              refs.CAN_Online_State.value,
              refs.ALLCAN_Online_State.value
            ),
          ],
          [
            "Engine_RPM",
            updateDataObject(
              "Engine_RPM",
              refs.Engine_RPM.value,
              refs.ALLEngine_RPM.value
            ),
          ],
          ["Rudder", updateDataObject("Rudder", refs.Rudder.value, refs.ALLRudder.value)],
          [
            "Rudder_Scale",
            updateDataObject(
              "Rudder_Scale",
              refs.Rudder_Scale.value,
              refs.ALLRudder_Scale.value
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
              refs.AUTOPILOTCONTACT.value,
              refs.ALLAUTOPILOTCONTACT.value
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
              refs.NO1ENGINE_PANEL_61444.value,
              refs.ALLNO1ENGINE_PANEL_61444.value
            ),
          ],
          [
            "65262",
            updateDataObject(
              "NO1ENGINE_PANEL_65262",
              refs.NO1ENGINE_PANEL_65262.value,
              refs.ALLNO1ENGINE_PANEL_65262.value
            ),
          ],
          [
            "65263",
            updateDataObject(
              "NO1ENGINE_PANEL_65263",
              refs.NO1ENGINE_PANEL_65263.value,
              refs.ALLNO1ENGINE_PANEL_65263.value
            ),
          ],
          [
            "65272",
            updateDataObject(
              "NO1ENGINE_PANEL_65272",
              refs.NO1ENGINE_PANEL_65272.value,
              refs.ALLNO1ENGINE_PANEL_65272.value
            ),
          ],
          [
            "65271",
            updateDataObject(
              "NO1ENGINE_PANEL_65271",
              refs.NO1ENGINE_PANEL_65271.value,
              refs.ALLNO1ENGINE_PANEL_65271.value
            ),
          ],
          [
            "65253",
            updateDataObject(
              "NO1ENGINE_PANEL_65253",
              refs.NO1ENGINE_PANEL_65253.value,
              refs.ALLNO1ENGINE_PANEL_65253.value
            ),
          ],
          [
            "65270",
            updateDataObject(
              "NO1ENGINE_PANEL_65270",
              refs.NO1ENGINE_PANEL_65270.value,
              refs.ALLNO1ENGINE_PANEL_65270.value
            ),
          ],
          [
            "65276",
            updateDataObject(
              "NO1ENGINE_PANEL_65276",
              refs.NO1ENGINE_PANEL_65276.value,
              refs.ALLNO1ENGINE_PANEL_65276.value
            ),
          ],
          [
            "65360",
            updateDataObject(
              "NO1ENGINE_PANEL_65360",
              refs.NO1ENGINE_PANEL_65360.value,
              refs.ALLNO1ENGINE_PANEL_65360.value
            ),
          ],
          [
            "65361_LAMP",
            updateDataObject(
              "NO1ENGINE_PANEL_65361_LAMP",
              refs.NO1ENGINE_PANEL_65361_LAMP.value,
              refs.ALLNO1ENGINE_PANEL_65361_LAMP.value
            ),
          ],
          [
            "65361_STATUS",
            updateDataObject(
              "NO1ENGINE_PANEL_65361_STATUS",
              refs.NO1ENGINE_PANEL_65361_STATUS.value,
              refs.ALLNO1ENGINE_PANEL_65361_STATUS.value
            ),
          ],
          [
            "65378",
            updateDataObject(
              "NO1ENGINE_PANEL_65378",
              refs.NO1ENGINE_PANEL_65378.value,
              refs.ALLNO1ENGINE_PANEL_65378.value
            ),
          ],
          [
            "65376",
            updateDataObject(
              "NO1ENGINE_PANEL_65376",
              refs.NO1ENGINE_PANEL_65376.value,
              refs.ALLNO1ENGINE_PANEL_65376.value
            ),
          ],
          [
            "65379",
            updateDataObject(
              "NO1ENGINE_PANEL_65379",
              refs.NO1ENGINE_PANEL_65379.value,
              refs.ALLNO1ENGINE_PANEL_65379.value
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
              refs.NO2ENGINE_PANEL_61444.value,
              refs.ALLNO2ENGINE_PANEL_61444.value
            ),
          ],
          [
            "65262",
            updateDataObject(
              "NO2ENGINE_PANEL_65262",
              refs.NO2ENGINE_PANEL_65262.value,
              refs.ALLNO2ENGINE_PANEL_65262.value
            ),
          ],
          [
            "65263",
            updateDataObject(
              "NO2ENGINE_PANEL_65263",
              refs.NO2ENGINE_PANEL_65263.value,
              refs.ALLNO2ENGINE_PANEL_65263.value
            ),
          ],
          [
            "65272",
            updateDataObject(
              "NO2ENGINE_PANEL_65272",
              refs.NO2ENGINE_PANEL_65272.value,
              refs.ALLNO2ENGINE_PANEL_65272.value
            ),
          ],
          [
            "65271",
            updateDataObject(
              "NO2ENGINE_PANEL_65271",
              refs.NO2ENGINE_PANEL_65271.value,
              refs.ALLNO2ENGINE_PANEL_65271.value
            ),
          ],
          [
            "65253",
            updateDataObject(
              "NO2ENGINE_PANEL_65253",
              refs.NO2ENGINE_PANEL_65253.value,
              refs.ALLNO2ENGINE_PANEL_65253.value
            ),
          ],
          [
            "65270",
            updateDataObject(
              "NO2ENGINE_PANEL_65270",
              refs.NO2ENGINE_PANEL_65270.value,
              refs.ALLNO2ENGINE_PANEL_65270.value
            ),
          ],
          [
            "65276",
            updateDataObject(
              "NO2ENGINE_PANEL_65276",
              refs.NO2ENGINE_PANEL_65276.value,
              refs.ALLNO2ENGINE_PANEL_65276.value
            ),
          ],
          [
            "65360",
            updateDataObject(
              "NO2ENGINE_PANEL_65360",
              refs.NO2ENGINE_PANEL_65360.value,
              refs.ALLNO2ENGINE_PANEL_65360.value
            ),
          ],
          [
            "65361_LAMP",
            updateDataObject(
              "NO2ENGINE_PANEL_65361_LAMP",
              refs.NO2ENGINE_PANEL_65361_LAMP.value,
              refs.ALLNO2ENGINE_PANEL_65361_LAMP.value
            ),
          ],
          [
            "65361_STATUS",
            updateDataObject(
              "NO2ENGINE_PANEL_65361_STATUS",
              refs.NO2ENGINE_PANEL_65361_STATUS.value,
              refs.ALLNO2ENGINE_PANEL_65361_STATUS.value
            ),
          ],
          [
            "65378",
            updateDataObject(
              "NO2ENGINE_PANEL_65378",
              refs.NO2ENGINE_PANEL_65378.value,
              refs.ALLNO2ENGINE_PANEL_65378.value
            ),
          ],
          [
            "65376",
            updateDataObject(
              "NO2ENGINE_PANEL_65376",
              refs.NO2ENGINE_PANEL_65376.value,
              refs.ALLNO2ENGINE_PANEL_65376.value
            ),
          ],
          [
            "65379",
            updateDataObject(
              "NO2ENGINE_PANEL_65379",
              refs.NO2ENGINE_PANEL_65379.value,
              refs.ALLNO2ENGINE_PANEL_65379.value
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
