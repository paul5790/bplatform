<template>
  <div class="autocomplete-container">
    <v-select
      v-model="selectedTestName"
      label="Test Name"
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
import { themeMode, themeConfig } from "@/utils/theme.js";

const { textColor } = themeConfig;

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
const selectedTestName = ref();
const trialNum = ref(100);

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      const testName = response[i].testName;
      trialrun.value.push(testName);
      selectedTestName.value = trialrun.value[0];
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
    refs[key] = ref(null); // 초기 값을 null로 설정
    refs[`ALL${key}`] = ref(null);
    dataRef[key] = ref(null);
    dataRef[`ALL${key}`] = ref(null);
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
    "RADARSCREEN",
    "VDM",
    "VDO",
    "ROUTEINFO",
    "WAYPOINTS",
    "RTZ",
    "ECDISSCREEN",
    "RSA",
    "HTD",
    "VBW",
    "VHW",
    "VLW",
    "CANONLINESTATE",
    "ENGINERPM",
    "RUDDER",
    "RUDDERSCALE",
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
    "SITUATIONAL",
    "VIRTUALNAV",
    "ROUTEDECISION",
    "SYSTEMSTATE",
    "MODEINFO",
    "AIS",
    "DYNAMICAISINFO",
    "STATICAISINFO",
    "OBJECTINFO",
    "WEATHERINFO",
  ];

  keys.forEach((key) => createRef(key));

  return { refs, dataRef };
};

const { refs, dataRef } = createRefObject();
const createDataObject = (groupId, values, allValues) => {
  const valueSum = values.reduce((acc, val) => acc + val.value, 0);
  const allValueSum = allValues.reduce((acc, val) => acc + val.value, 0);

  // `countDelay` 값의 합산 계산
  const countDelaySum = values.reduce((acc, refObj) => {
    // null 체크를 통해 안전하게 _value와 countDelay에 접근
    if (refObj._value && refObj._value.countDelay) {
      return acc + Number(refObj._value.countDelay);
    }
    return acc;
  }, 0);
  const numOfDataSum = allValues.reduce((acc, refObj) => {
    // null 체크를 통해 안전하게 _value와 countDelay에 접근
    if (refObj._value && refObj._value.numOfData) {
      return acc + Number(refObj._value.numOfData);
    }
    return acc;
  }, 0);

  const percent = ((countDelaySum / numOfDataSum) * 100).toFixed(2);

  return {
    value: countDelaySum,
    groupId: groupId,
    percent: percent,
    itemStyle: {
      color: percent > 30 ? "#FF6666" : undefined, // 30% 초과 시 빨간색, 이하 시 기본 색상 (여기서는 파란색)
    },
  };
};

// 로딩
const loading = ref(true);

// response 데이터를 refs에 넣기 전에 모든 값을 0으로 초기화하는 함수
const initializeRefs = () => {
  Object.keys(refs).forEach((key) => {
    refs[key].value = 0;
  });
};

// response 데이터를 refs에 넣는 함수
const populateRefs = (responseData) => {
  responseData.forEach((item) => {
    
    let signalName = item.signalName;
    

    // 엔진 데이터인 경우 접두사 포함
    if (
      signalName.includes("ENGINE_PANEL") ||
      signalName.includes("NO1ENGINE_PANEL") ||
      signalName.includes("NO2ENGINE_PANEL")
    ) {
      signalName = signalName.substring(signalName.indexOf("_") + 1);
    } else {
      // 접두사를 제거하고 나머지 부분만 사용
      signalName = signalName.split("_").pop();
    }
    if (refs[signalName] && refs[`ALL${signalName}`]) {
      refs[signalName].value = item;
      refs[`ALL${signalName}`].value = item;
    }
  });
};

const fetchData = async () => {
  loading.value = true;
  initializeRefs();
  let response = await readlossData(tokenid.value, selectedTestName.value);
  await populateRefs(response);

  loading.value = false;
  updateChart();
};

// onMounted(() => {
//   fetchData();
// });

// selectedTestName 변경을 감시하고 변경되면 trialNum을 갱신하고 fetchData 실행
watch(selectedTestName, (newTrialNum) => {
  // 항차 N번에서 N 추출
  const num = parseInt(newTrialNum.match(/\d+/)[0]);
  trialNum.value = num;
  fetchData();

  option.value.title.text = `${newTrialNum} 데이터 저장 용량`;
});

provide(THEME_KEY);

const chart = ref(null);

const option = ref({
  title: {
    text: "시험 별 데이터 소실 빈도",
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
      "CANTHROTTLE",
      "AUTOPILOTCONTACT",
      "NO.1ENGINE",
      "NO.2ENGINE",
      "KASS",
      "MANAGEMENT",
      "VTS",
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
        [
          refs.ALLGLL,
          refs.ALLGGA,
          refs.ALLRMC,
          refs.ALLVTG,
          refs.ALLZDA,
          refs.ALLGSV,
          refs.ALLGSA,
        ]
      ),
      createDataObject(
        "GYRO",
        [refs.HDT, refs.ROT],
        [refs.ALLHDT, refs.ALLROT]
      ),
      createDataObject("ANEMOMETER", [refs.MWV], [refs.ALLMWV]),
      createDataObject("RADAR", [refs.RADARSCREEN], [refs.ALLRADARSCREEN]),
      createDataObject("AIS", [refs.VDM, refs.VDO], [refs.ALLVDM, refs.ALLVDO]),
      createDataObject(
        "ECDIS",
        [refs.ROUTEINFO, refs.WAYPOINTS, refs.RTZ, refs.ECDISSCREEN],
        [refs.ALLROUTEINFO, refs.ALLWAYPOINTS, refs.ALLRTZ, refs.ALLECDISSCREEN]
      ),
      createDataObject(
        "AUTOPILOT",
        [refs.RSA, refs.HTD],
        [refs.ALLRSA, refs.ALLHTD]
      ),
      createDataObject(
        "SPEEDLOG",
        [refs.VBW, refs.VHW, refs.VLW],
        [refs.ALLVBW, refs.ALLVHW, refs.ALLVLW]
      ),
      createDataObject(
        "CANTHROTTLE",
        [refs.CANONLINESTATE, refs.ENGINERPM, refs.RUDDER, refs.RUDDERSCALE],
        [
          refs.ALLCANONLINESTATE,
          refs.ALLENGINERPM,
          refs.ALLRUDDER,
          refs.ALLRUDDERSCALE,
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
      createDataObject(
        "KASS",
        [refs.SITUATIONAL, refs.VIRTUALNAV, refs.ROUTEDECISION],
        [refs.ALLSITUATIONAL, refs.ALLVIRTUALNAV, refs.ALLROUTEDECISION]
      ),
      createDataObject(
        "MANAGEMENT",
        [refs.SYSTEMSTATE, refs.MODEINFO],
        [refs.ALLSYSTEMSTATE, refs.ALLMODEINFO]
      ),
      createDataObject(
        "VTS",
        [
          refs.AIS,
          refs.DYNAMICAISINFO,
          refs.OBJECTINFO,
          refs.STATICAISINFO,
          refs.WEATHERINFO,
        ],
        [
          refs.ALLAIS,
          refs.ALLDYNAMICAISINFO,
          refs.ALLOBJECTINFO,
          refs.ALLSTATICAISINFO,
          refs.ALLWEATHERINFO,
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
                    "CANTHROTTLE",
                    "AUTOPILOTCONTACT",
                    "NO.1ENGINE",
                    "NO.2ENGINE",
                    "KASS",
                    "MANAGEMENT",
                    "VTS",
                  ],
                },
                series: {
                  type: "bar",
                  id: "sales",
                  dataGroupId: "",
                  data: [
                    createDataObject(
                      "DGPS",
                      [
                        refs.GLL,
                        refs.GGA,
                        refs.RMC,
                        refs.VTG,
                        refs.ZDA,
                        refs.GSV,
                        refs.GSA,
                      ],
                      [
                        refs.ALLGLL,
                        refs.ALLGGA,
                        refs.ALLRMC,
                        refs.ALLVTG,
                        refs.ALLZDA,
                        refs.ALLGSV,
                        refs.ALLGSA,
                      ]
                    ),
                    createDataObject(
                      "GYRO",
                      [refs.HDT, refs.ROT],
                      [refs.ALLHDT, refs.ALLROT]
                    ),
                    createDataObject("ANEMOMETER", [refs.MWV], [refs.ALLMWV]),
                    createDataObject(
                      "RADAR",
                      [refs.RADARSCREEN],
                      [refs.ALLRADARSCREEN]
                    ),
                    createDataObject(
                      "AIS",
                      [refs.VDM, refs.VDO],
                      [refs.ALLVDM, refs.ALLVDO]
                    ),
                    createDataObject(
                      "ECDIS",
                      [
                        refs.ROUTEINFO,
                        refs.WAYPOINTS,
                        refs.RTZ,
                        refs.ECDISSCREEN,
                      ],
                      [
                        refs.ALLROUTEINFO,
                        refs.ALLWAYPOINTS,
                        refs.ALLRTZ,
                        refs.ALLECDISSCREEN,
                      ]
                    ),
                    createDataObject(
                      "AUTOPILOT",
                      [refs.RSA, refs.HTD],
                      [refs.ALLRSA, refs.ALLHTD]
                    ),
                    createDataObject(
                      "SPEEDLOG",
                      [refs.VBW, refs.VHW, refs.VLW],
                      [refs.ALLVBW, refs.ALLVHW, refs.ALLVLW]
                    ),
                    createDataObject(
                      "CANTHROTTLE",
                      [
                        refs.CANONLINESTATE,
                        refs.ENGINERPM,
                        refs.RUDDER,
                        refs.RUDDERSCALE,
                      ],
                      [
                        refs.ALLCANONLINESTATE,
                        refs.ALLENGINERPM,
                        refs.ALLRUDDER,
                        refs.ALLRUDDERSCALE,
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
                    createDataObject(
                      "KASS",
                      [refs.SITUATIONAL, refs.VIRTUALNAV, refs.ROUTEDECISION],
                      [refs.ALLSITUATIONAL, refs.ALLVIRTUALNAV, refs.ALLROUTEDECISION]
                    ),
                    createDataObject(
                      "MANAGEMENT",
                      [refs.SYSTEMSTATE, refs.MODEINFO],
                      [refs.ALLSYSTEMSTATE, refs.ALLMODEINFO]
                    ),
                    createDataObject(
                      "VTS",
                      [
                        refs.AIS,
                        refs.DYNAMICAISINFO,
                        refs.OBJECTINFO,
                        refs.STATICAISINFO,
                        refs.WEATHERINFO,
                      ],
                      [
                        refs.ALLAIS,
                        refs.ALLDYNAMICAISINFO,
                        refs.ALLOBJECTINFO,
                        refs.ALLSTATICAISINFO,
                        refs.ALLWEATHERINFO,
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

const updateDataObject = (id, value, allValue) => {
  if (!value || !value.countDelay || !allValue || !allValue.numOfData) {
    // 필요한 값이 없으면 기본 객체를 반환하거나 에러를 처리할 수 있음
    return {
      value: 0,
      groupId: id,
      percent: "0.00",
      itemStyle: {
        color: undefined, // 기본 색상
      },
    };
  }

  return {
    value: value.countDelay,
    groupId: id,
    percent: ((value.countDelay / allValue.numOfData) * 100).toFixed(2),
    itemStyle: {
      color:
        (value.countDelay / allValue.numOfData) * 100 > 30
          ? "#FF6666"
          : undefined, // 소실률이 30% 초과 시 빨간색
    },
  };
};

const updateChart = () => {
  if (chart.value) {
    // 차트 데이터 업데이트 로직
    const updatedOption = {
      title: {
        text: `${selectedTestName.value} 데이터 소실 빈도`,
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
            [
              refs.GLL,
              refs.GGA,
              refs.RMC,
              refs.VTG,
              refs.ZDA,
              refs.GSV,
              refs.GSA,
            ],
            [
              refs.ALLGLL,
              refs.ALLGGA,
              refs.ALLRMC,
              refs.ALLVTG,
              refs.ALLZDA,
              refs.ALLGSV,
              refs.ALLGSA,
            ]
          ),
          createDataObject(
            "GYRO",
            [refs.HDT, refs.ROT],
            [refs.ALLHDT, refs.ALLROT]
          ),
          createDataObject("ANEMOMETER", [refs.MWV], [refs.ALLMWV]),
          createDataObject("RADAR", [refs.RADARSCREEN], [refs.ALLRADARSCREEN]),
          createDataObject(
            "AIS",
            [refs.VDM, refs.VDO],
            [refs.ALLVDM, refs.ALLVDO]
          ),
          createDataObject(
            "ECDIS",
            [refs.ROUTEINFO, refs.WAYPOINTS, refs.RTZ, refs.ECDISSCREEN],
            [
              refs.ALLROUTEINFO,
              refs.ALLWAYPOINTS,
              refs.ALLRTZ,
              refs.ALLECDISSCREEN,
            ]
          ),
          createDataObject(
            "AUTOPILOT",
            [refs.RSA, refs.HTD],
            [refs.ALLRSA, refs.ALLHTD]
          ),
          createDataObject(
            "SPEEDLOG",
            [refs.VBW, refs.VHW, refs.VLW],
            [refs.ALLVBW, refs.ALLVHW, refs.ALLVLW]
          ),
          createDataObject(
            "CANTHROTTLE",
            [
              refs.CANONLINESTATE,
              refs.ENGINERPM,
              refs.RUDDER,
              refs.RUDDERSCALE,
            ],
            [
              refs.ALLCANONLINESTATE,
              refs.ALLENGINERPM,
              refs.ALLRUDDER,
              refs.ALLRUDDERSCALE,
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
          createDataObject(
            "KASS",
            [refs.SITUATIONAL, refs.VIRTUALNAV, refs.ROUTEDECISION],
            [refs.ALLSITUATIONAL, refs.ALLVIRTUALNAV, refs.ALLROUTEDECISION]
          ),
          createDataObject(
            "MANAGEMENT",
            [refs.SYSTEMSTATE, refs.MODEINFO],
            [refs.ALLSYSTEMSTATE, refs.ALLMODEINFO]
          ),
          createDataObject(
            "VTS",
            [
              refs.AIS,
              refs.DYNAMICAISINFO,
              refs.OBJECTINFO,
              refs.STATICAISINFO,
              refs.WEATHERINFO,
            ],
            [
              refs.ALLAIS,
              refs.ALLDYNAMICAISINFO,
              refs.ALLOBJECTINFO,
              refs.ALLSTATICAISINFO,
              refs.ALLWEATHERINFO,
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
        data: [
          ["MWV", updateDataObject("MWV", refs.MWV.value, refs.ALLMWV.value)],
        ],
      },
      {
        dataGroupId: "RADAR",
        data: [
          [
            "RADARSCREEN",
            updateDataObject(
              "RADARSCREEN",
              refs.RADARSCREEN.value,
              refs.ALLRADARSCREEN.value
            ),
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
            updateDataObject(
              "ROUTEINFO",
              refs.ROUTEINFO.value,
              refs.ALLROUTEINFO.value
            ),
          ],
          [
            "WAYPOINTS",
            updateDataObject(
              "WAYPOINTS",
              refs.WAYPOINTS.value,
              refs.ALLWAYPOINTS.value
            ),
          ],
          ["RTZ", updateDataObject("RTZ", refs.RTZ.value, refs.ALLRTZ.value)],
          [
            "ECDISSCREEN",
            updateDataObject(
              "ECDISSCREEN",
              refs.ECDISSCREEN.value,
              refs.ALLECDISSCREEN.value
            ),
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
        dataGroupId: "CANTHROTTLE",
        data: [
          [
            "CANONLINESTATE",
            updateDataObject(
              "CANONLINESTATE",
              refs.CANONLINESTATE.value,
              refs.ALLCANONLINESTATE.value
            ),
          ],
          [
            "ENGINERPM",
            updateDataObject(
              "ENGINERPM",
              refs.ENGINERPM.value,
              refs.ALLENGINERPM.value
            ),
          ],
          [
            "RUDDER",
            updateDataObject("RUDDER", refs.RUDDER.value, refs.ALLRUDDER.value),
          ],
          [
            "RUDDERSCALE",
            updateDataObject(
              "RUDDERSCALE",
              refs.RUDDERSCALE.value,
              refs.ALLRUDDERSCALE.value
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
      {
        dataGroupId: "KASS",
        data: [
          [
            "SITUATIONAL",
            updateDataObject(
              "SITUATIONAL",
              refs.SITUATIONAL.value,
              refs.ALLSITUATIONAL.value
            ),
          ],
          [
            "VIRTUALNAV",
            updateDataObject(
              "VIRTUALNAV",
              refs.VIRTUALNAV.value,
              refs.ALLVIRTUALNAV.value
            ),
          ],
          [
            "ROUTEDECISION",
            updateDataObject(
              "ROUTEDECISION",
              refs.ROUTEDECISION.value,
              refs.ALLROUTEDECISION.value
            ),
          ],
        ],
      },
      {
        dataGroupId: "MANAGEMENT",
        data: [
          [
            "SYSTEMSTATE",
            updateDataObject(
              "SYSTEMSTATE",
              refs.SYSTEMSTATE.value,
              refs.ALLSYSTEMSTATE.value
            ),
          ],
          [
            "MODEINFO",
            updateDataObject(
              "MODEINFO",
              refs.MODEINFO.value,
              refs.ALLMODEINFO.value
            ),
          ],
        ],
      },
      {
        dataGroupId: "VTS",
        data: [
          ["AIS", updateDataObject("AIS", refs.AIS.value, refs.ALLAIS.value)],
          [
            "DYNAMICAISINFO",
            updateDataObject(
              "DYNAMICAISINFO",
              refs.DYNAMICAISINFO.value,
              refs.ALLDYNAMICAISINFO.value
            ),
          ],
          [
            "OBJECTINFO",
            updateDataObject(
              "OBJECTINFO",
              refs.OBJECTINFO.value,
              refs.ALLOBJECTINFO.value
            ),
          ],
          [
            "STATICAISINFO",
            updateDataObject(
              "STATICAISINFO",
              refs.STATICAISINFO.value,
              refs.ALLSTATICAISINFO.value
            ),
          ],
          [
            "WEATHERINFO",
            updateDataObject(
              "WEATHERINFO",
              refs.WEATHERINFO.value,
              refs.ALLWEATHERINFO.value
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
  height: 42vh;
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
