<template>
  <v-card
    height="93vh"
    :style="{ backgroundColor: themeColor }"
    class="pa-1 d-flex justify-center align-center"
  >
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              v-if="nodata"
              :elevation="elevation"
              :style="{
                height: '75vh',
                padding: '30px',
                paddingBottom: '0px',
                paddingRight: '0',
                display: 'flex',
                backgroundColor: themeColor,
              }"
            >
              <v-card style="flex: 1">
                <v-card-title>
                  <span class="text-h6">{{ selectedcontentsItem }}</span>
                </v-card-title>
                <v-card-item>
                  <v-sheet v-if="!loading">
                    <v-sheet v-if="first"> </v-sheet>
                    <v-sheet
                      v-if="!first"
                      :elevation="elevation"
                      :style="{
                        height: '67vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }"
                    >
                      <p
                        style="
                          margin-top: 10px;
                          font-weight: 400;
                          font-size: 18px;
                        "
                      >
                        no-data
                      </p>
                    </v-sheet>
                  </v-sheet>
                  <v-sheet
                    v-if="loading"
                    :elevation="elevation"
                    :style="{
                      height: '67vh',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }"
                  >
                    <v-progress-circular
                      :size="50"
                      color="primary"
                      indeterminate
                    ></v-progress-circular>
                    <p
                      style="
                        margin-top: 10px;
                        font-weight: 400;
                        font-size: 18px;
                      "
                    >
                      loading
                    </p>
                  </v-sheet>
                </v-card-item>
              </v-card>
            </v-sheet>
            <v-sheet
              v-if="!nodata"
              :style="{
                height: '75vh',
                padding: '30px',
                paddingBottom: '0',
                paddingRight: '0',
                display: 'flex',
                backgroundColor: themeColor,
              }"
            >
              <v-card style="flex: 1">
                <v-card-item id="graph" :style="tableStyle">
                  <v-card-title class="card-title">
                    <span class="text-h6">{{ selectedcontentsItem }} contents</span>
                    <v-spacer></v-spacer>
                    <span class="text-span">*This data was provided by Xinnos. Unauthorized distribution or disclosure of this data is strictly prohibited.</span>
                  </v-card-title>
                  <div ref="chartRef" class="chart" autoresize></div>
                  <div>
                    <p>Zoom Range: {{ zoomRange }}</p>
                  </div>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              :style="{
                height: '20vh',
                padding: '30px',
                paddingTop: '10px',
                paddingRight: '0',
                display: 'flex',
                backgroundColor: themeColor,
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <v-data-table
                    :headers="headers"
                    :items="analysis"
                    fixed-header
                    height="120px"
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="3">
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              :style="{
                height: '93vh',
                padding: '30px',
                paddingBottom: '5px',
                paddingLeft: '10px',
                display: 'flex',
                backgroundColor: themeColor,
                position: 'relative',
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <div>
                    <v-select
                      v-model="selectedsubComponent"
                      :items="subComponents"
                      label="SubComponents"
                      variant="outlined"
                      class="custom-select"
                      style="margin-top: 3vh"
                      chips
                      multiple
                    ></v-select>

                    <v-select
                      v-model="selectedItem"
                      :items="items"
                      label="Items"
                      variant="outlined"
                      class="custom-select"
                      chips
                      multiple
                    ></v-select>

                    <v-select
                      v-model="selectedtrialrun"
                      :items="trialrun"
                      label="Period / Test Number"
                      variant="outlined"
                      class="custom-select"
                    ></v-select>

                    <VueDatePicker
                      :class="
                        themeMode === 'dark'
                          ? 'dp__theme_dark'
                          : 'dp__theme_light'
                      "
                      style="--dp-input-padding: 15px"
                      v-model="dateRange"
                      range
                      :dark="themeMode === 'dark'"
                      :readonly="date_readonly"
                    />
                    <p style="font-size: 12px; font-weight: bold">
                      &nbsp;&nbsp;* 날짜 검색은 한국 표준시를 기준으로 작성하며,
                      &nbsp;&nbsp;
                    </p>
                    <p style="font-size: 12px; font-weight: bold">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;데이터는 UTC 기준으로 보여짐
                    </p>
                    <v-btn
                      style="margin-top: 10px"
                      width="500px"
                      :color="btnColor"
                      @click="searchData()"
                    >
                      조회하기
                    </v-btn>
                    <v-btn
                      style="margin-top: 10px"
                      width="500px"
                      :color="test"
                      @click="testData()"
                    >
                      조회하기
                    </v-btn>
                    <v-btn
                      style="
                        position: absolute;
                        bottom: 10px;
                        left: 10px;
                        width: calc(100% - 20px);
                      "
                      height="40px"
                      width="500px"
                      :color="btnColor"
                      @click="captureImage()"
                    >
                      그래프 캡쳐하기
                    </v-btn>
                  </div>
                  <p style="margin-top: 38vh"></p>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import {
  ref,
  provide,
  onMounted,
  onBeforeUnmount,
  watch,
  watchEffect,
} from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { themeMode, themeConfig } from "@/utils/theme.js";
import { readTrialData, readDataTrial } from "../api/index.js";
import * as echarts from "echarts";
import html2canvas from "html2canvas";
import "@/styles/datepicker-theme.css";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
  MarkPointComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  MarkLineComponent,
  MarkPointComponent,
  ToolboxComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent,
]);
provide(THEME_KEY);

// =================================================== 셋업 ===================================================
// 다크모드
const { btnColor, textColor, themeColor, tableStyle } = themeConfig;
const tokenid = ref(sessionStorage.getItem("token") || "");

onMounted(() => {
  sessionStorage.setItem("page", "데이터 분석");
  initializeChart();
});

// // 화면 로딩 변수
// const nodata = ref(true);
// const loading = ref(false);
// const first = ref(true);

// =================================================== 신호 선택 ===================================================
const subComponents = ref([
  "DGPS",
  "GYRO",
  "ANEMOMETER",
  "SPEEDLOG",
  "AUTOPILOT",
  "NO.1ENGINEPANEL",
  "NO.2ENGINEPANEL",
]);
const items = ref([]);
const selectedsubComponent = ref([]); // 선택된 구성 요소
const selectedItem = ref([]); // 선택된 구성 요소
const chartInstance = ref(null);

// 선택된 subComponent가 변경될 때마다 items 업데이트
watch(selectedsubComponent, (newVal) => {
  items.value = []; // 기존 items 초기화
  selectedItem.value = []; // 선택된 items 초기화
  if (newVal) {
    if (newVal.includes("DGPS")) {
      items.value.push(
        "latitude",
        "longitude",
        "altitude",
        "speedovergroundknots",
        "courseovergrounddegreestrue"
      );
    }
    if (newVal.includes("GYRO")) {
      items.value.push("heading", "rateofturn");
    }
    if (newVal.includes("ANEMOMETER")) {
      items.value.push("anemometerangle", "anemometerspeed");
    }
    if (newVal.includes("SPEEDLOG")) {
      items.value.push("speedn");
    }
    if (newVal.includes("AUTOPILOT")) {
      items.value.push("starboardruddersensor", "portruddersensor");
    }
    if (newVal.includes("NO.1ENGINEPANEL")) {
      items.value.push(
        "1_Engine Speed",
        "1_Engine Oil Temperature",
        "1_Engine Oil Pressure",
        "1_Engine Coolant Level",
        "1_Transmission Oil Pressure",
        "1_Charging System Potential",
        "1_Battery Potential",
        "1_Engine total hours",
        "1_Engine Intake Manifold Pressure",
        "1_Engine Intake Manifold Temp",
        "1_Engine Exhaust Gas Temperature",
        "1_fuel_LEVEL"
      );
    }
    if (newVal.includes("NO.2ENGINEPANEL")) {
      items.value.push(
        "2_Engine Speed",
        "2_Engine Oil Temperature",
        "2_Engine Oil Pressure",
        "2_Engine Coolant Level",
        "2_Transmission Oil Pressure",
        "2_Charging System Potential",
        "2_Battery Potential",
        "2_Engine total hours",
        "2_Engine Intake Manifold Pressure",
        "2_Engine Intake Manifold Temp",
        "2_Engine Exhaust Gas Temperature",
        "2_fuel_LEVEL"
      );
    }
  }
});

watch(selectedItem, (newVal) => {
  if (newVal.length > 5) {
    selectedItem.value.pop(); // 가장 마지막에 추가된 항목 제거
    alert("최대 5개까지 선택할 수 있습니다.");
  }
});

// =============================== 항차 및 날짜 선택 ===========================================
// trial
const trialrun = ref(["직접 선택"]);
const selectedtrialrun = ref(null);
const selectedtrialNum = ref();

// 항차의 시작, 끝 기간을 미리 정의하여 저장
const setStartTime = ref([]);
const setEndTime = ref([]);

// axios에 쓰일 지정 기간
const startDate = ref(); // 반응적인(ref) 변수로 선언
const endDate = ref(); // 반응적인(ref) 변수로 선언

// date Picker
const date_readonly = ref(true);
const dateRange = ref([]);

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      const testName = response[i].testName;
      selectedtrialNum.value = testName;
      trialrun.value.push(`${testName}`);
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(getTrialDate);

watch(selectedtrialrun, (newVal) => {
  if (newVal == "직접 선택") {
    date_readonly.value = false;
    updateDate();
  } else {
    const index = trialrun.value.indexOf(selectedtrialrun.value);
    date_readonly.value = true;

    startDate.value = setStartTime.value[index - 1];
    endDate.value = setEndTime.value[index - 1];

    let start = new Date(startDate.value);
    let end = new Date(endDate.value);

    // 시간 범위 설정
    dateRange.value = [start, end];
  }
});

const updateDate = () => {
  let start = new Date(dateRange.value[0]);
  let end = new Date(dateRange.value[1]);

  if (!isNaN(start) && !isNaN(end)) {
    // 유효한 날짜인 경우에만 ISO 문자열로 변환
    startDate.value = start.toISOString();
    endDate.value = end.toISOString();
  } else {
    console.error("Invalid date values in dateRange.value");
  }
};

// =============================== 통계 테이블 신호 ===========================================
// 데이터 테이블 헤더
const headers = ref([
  {
    title: "신호",
    align: "start",
    key: "name",
    sortable: false,
  },
  { title: "단위", align: "center", key: "unit", sortable: false },
  { title: "최솟값", align: "center", key: "min", sortable: false },
  { title: "최댓값", align: "center", key: "max", sortable: false },
  { title: "평균값", align: "center", key: "average", sortable: false },
  { title: "중앙값", align: "center", key: "median", sortable: false },
  { title: "분산", align: "center", key: "variance", sortable: false },
  { title: "표준편차", align: "center", key: "rmse", sortable: false },
  { title: "표준오차", align: "center", key: "error", sortable: false },
  { title: "RMS", align: "center", key: "rms", sortable: false },
]);

const analysis = ref([
  {
    name: "signal",
    unit: "unit",
    min: "-",
    max: "-",
    average: "-",
    rmse: "-",
    rms: "-",
    variance: "-",
    error: "-",
    median: "-",
  },
]);

const unit = ref();

// =============================== 차트 변수 ===========================================

const chart = ref(null);

const chartRef = ref(null);
const zoomRange = ref("");
const timeRange = ref({
  start: 0,
  end: 0,
});
let myChart = null;

const option = ref({
  dataset: [
    {
      id: "dataset_raw",
    },
  ],
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: selectedsubComponent.value,
  },
  toolbox: {},
  grid: {
    top: "13%", // top margin을 15%로 설정
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Data",
      type: "line",
      data: [],
    },
  ],
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: 0,
      filterMode: "none",
    },
    {
      type: "slider",
      xAxisIndex: 0,
      filterMode: "none",
      height: "4%", // 높이를 20%로 설정
      bottom: "1%", // 위치를 아래로 조정
    },
    {
      type: "slider",
      yAxisIndex: 0,
      filterMode: "none",
      width: "2%",
    },
    {
      type: "inside",
      yAxisIndex: 0,
      filterMode: "none",
    },
  ],
});

const analysisData = ref([]);
const analysisCal = ref([]);
const analysisTime = ref([]);

const initChart = () => {
  const series = [];
  analysisCal.value = [];
  myChart = echarts.init(chartRef.value);

  myChart.setOption(option.value);

  // 모든 타임스탬프 수집
  const allTimestamps = new Set();
  selectedItem.value.forEach((component) => {
    if (component in gData) {
      gData[component].forEach((item) => {
        const timestamp = Object.keys(item)[0];
        allTimestamps.add(timestamp);
      });
    }
  });

  // 타임스탬프를 정렬
  const sortedTimestamps = Array.from(allTimestamps).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // const sortedTimestamps = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // dataMap을 자동으로 생성
  const dataMap = Object.keys(gData).reduce((map, key) => {
    // 타임스탬프를 키로 사용한 맵 생성
    map[key] = gData[key].reduce((subMap, item) => {
      const timestamp = Object.keys(item)[0];
      subMap[timestamp] = item[timestamp];
      return subMap;
    }, {});
    return map;
  }, {});

  selectedItem.value.forEach((component) => {
    if (component in dataMap) {
      const seriesData = sortedTimestamps.map(
        (timestamp) => dataMap[component][timestamp] || null
      );

      // console.log(seriesData);

      analysisCal.value.push(seriesData);

      series.push({
        name: component,
        type: "line",
        data: seriesData,
        connectNulls: true, // null 값을 선으로 연결
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
      });
    }
  });

  option.value.series = series;

  option.value.legend = {
    data: selectedItem.value,
  };

  option.value.xAxis = {
    type: "category",
    nameLocation: "middle",
    boundaryGap: false,
    data: sortedTimestamps, // x축 데이터를 타임스탬프로 설정
    axisLabel: {
      color: textColor.value, // 텍스트 색상을 흰색으로 설정
      formatter: (value) => {
        const date = new Date(value);
        const formattedDate = `
        ${date.getDate().toString().padStart(2, "0")} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
  };

  myChart.setOption(option.value); // 옵션 설정

  // Add event listener for dataZoom
  // myChart.on('dataZoom', (params) => {
  //   const xAxis = option.value.xAxis.data;
  //   const startIndex = Math.round(params.start / 100 * (xAxis.length - 1));
  //   const endIndex = Math.round(params.end / 100 * (xAxis.length - 1));
  //   zoomRange.value = `${xAxis[startIndex]} to ${xAxis[endIndex]}`;
  // });

  myChart.on("dataZoom", (params) => {
    const xAxis = option.value.xAxis.data;

    // 옵션 객체와 xAxis 값이 있는지 확인
    if (!xAxis || xAxis.length === 0) {
      console.error("xAxis 데이터가 없습니다.");
      zoomRange.value = "No data";
      return;
    }

    if (params.batch) {
      // 스크롤 이벤트 처리
      const startIndex = Math.round(
        (params.batch[0].start / 100) * (xAxis.length - 1)
      );
      const endIndex = Math.round(
        (params.batch[0].end / 100) * (xAxis.length - 1)
      );

      const startValue = xAxis[startIndex];
      const endValue = xAxis[endIndex];

      timeRange.value.start = startIndex;
      timeRange.value.end = endIndex;

      zoomRange.value = `${startValue} to ${endValue}`;
    } else {
      // 드래그 이벤트 처리
      const startIndex = Math.round((params.start / 100) * (xAxis.length - 1));
      const endIndex = Math.round((params.end / 100) * (xAxis.length - 1));

      timeRange.value.start = startIndex;
      timeRange.value.end = endIndex;

      const startValue = xAxis[startIndex];
      const endValue = xAxis[endIndex];

      zoomRange.value = `${startValue} to ${endValue}`;
    }
  });
};

watch(timeRange.value, (newVal) => {
  calculateData(newVal.start, newVal.end);
});

onMounted(() => {});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});

// 데이터 전체 담기
const itemsData = {
  gga: [],
  vtg: [],
  hdt: [],
  rot: [],
  mwv: [],
  vhw: [],
  rsa: [],
  engine_SPEED: [],
  engine_OIL_TEMPERATURE1: [],
  engine_OIL_PRESSURE: [],
  transmission_OIL_PRESSURE: [],
  charging_SYSTEM_POTENTIAL: [],
  engine_TOTAL_HOURS: [],
  engine_INTAKE_MANIFOLD_NO1_PRESSURE: [],
  fuel_LEVEL_1: [],
  engine_SPEED2: [],
  engine_OIL_TEMPERATURE2: [],
  engine_OIL_PRESSURE2: [],
  transmission_OIL_PRESSURE2: [],
  charging_SYSTEM_POTENTIAL2: [],
  engine_TOTAL_HOURS2: [],
  engine_INTAKE_MANIFOLD_NO1_PRESSURE2: [],
  fuel_LEVEL_2: [],
};

// 데이터 생성 및 객체에 담기
const gData = {
  latitude: [],
  longitude: [],
  altitude: [],
  speedovergroundknots: [],
  courseovergrounddegreestrue: [],
  heading: [],
  rateofturn: [],
  anemometerangle: [],
  anemometerspeed: [],
  speedn: [],
  starboardruddersensor: [],
  portruddersensor: [],
  "1_Engine Speed": [],
  "1_Engine Oil Temperature": [],
  "1_Engine Oil Pressure": [],
  "1_Engine Coolant Level": [],
  "1_Transmission Oil Pressure": [],
  "1_Charging System Potential": [],
  "1_Battery Potential": [],
  "1_Engine total hours": [],
  "1_Engine Intake Manifold Pressure": [],
  "1_Engine Intake Manifold Temp": [],
  "1_Engine Exhaust Gas Temperature": [],
  "1_fuel_LEVEL": [],
  "2_Engine Speed": [],
  "2_Engine Oil Temperature": [],
  "2_Engine Oil Pressure": [],
  "2_Engine Coolant Level": [],
  "2_Transmission Oil Pressure": [],
  "2_Charging System Potential": [],
  "2_Battery Potential": [],
  "2_Engine total hours": [],
  "2_Engine Intake Manifold Pressure": [],
  "2_Engine Intake Manifold Temp": [],
  "2_Engine Exhaust Gas Temperature": [],
  "2_fuel_LEVEL": [],
};

// const option = ref({
//   dataset: [
//     {
//       id: "dataset_raw",
//     },
//   ],
//   // tooltip: {
//   //   formatter: "{a} <br/>{b} : {c} mb",
//   // },
//   tooltip: {
//     trigger: "axis",
//   },
//   legend: {
//     data: selectedsubComponent.value,
//   },
//   toolbox: {
//     feature: {
//       saveAsImage: {},
//     },
//   },
//   grid: {
//     top: "13%", // top margin을 15%로 설정
//   },
//   dataZoom: [
//     {
//       type: "slider",
//       xAxisIndex: 0,
//       filterMode: "none",
//       height: "4%", // 높이를 20%로 설정
//       bottom: "1%", // 위치를 아래로 조정
//     },
//     {
//       type: "slider",
//       yAxisIndex: 0,
//       filterMode: "none",
//       width: "2%",
//     },
//     {
//       type: "inside",
//       xAxisIndex: 0,
//       filterMode: "none",
//     },
//     {
//       type: "inside",
//       yAxisIndex: 0,
//       filterMode: "none",
//     },
//     // {
//     //   show: true,
//     //   realtime: true,
//     //   start: 0,
//     //   end: 100,
//     //   xAxisIndex: [0, 1],
//     //   height: "2%",
//     // },
//   ],
//   xAxis: {
//     type: "category",
//     nameLocation: "middle",
//     data: analysisTime.value, // x축 데이터를 times 배열로 설정
//     axisLabel: {
//       color: textColor.value, // 텍스트 색상을 흰색으로 설정
//     },
//   },
//   yAxis: {},
//   series: [],
// });
// =============================== 데이터 검색 및 업데이트 ===========================================

// const updateSeries = () => {
//   console.log("@");
//   const series = [];

//   // 모든 타임스탬프 수집
//   const allTimestamps = new Set();
//   selectedItem.value.forEach((component) => {
//     if (component in gData) {
//       gData[component].forEach((item) => {
//         const timestamp = Object.keys(item)[0];
//         allTimestamps.add(timestamp);
//       });
//     }
//   });

//   // 타임스탬프를 정렬
//   const sortedTimestamps = Array.from(allTimestamps).sort(
//     (a, b) => new Date(a) - new Date(b)
//   );

//   // dataMap을 자동으로 생성
//   const dataMap = Object.keys(gData).reduce((map, key) => {
//     // 타임스탬프를 키로 사용한 맵 생성
//     map[key] = gData[key].reduce((subMap, item) => {
//       const timestamp = Object.keys(item)[0];
//       subMap[timestamp] = item[timestamp];
//       return subMap;
//     }, {});
//     return map;
//   }, {});

//   selectedItem.value.forEach((component) => {
//     if (component in dataMap) {
//       const seriesData = sortedTimestamps.map(
//         (timestamp) => dataMap[component][timestamp] || null
//       );

//       series.push({
//         name: component,
//         type: "line",
//         data: seriesData,
//         connectNulls: true, // null 값을 선으로 연결
//         markPoint: {
//           data: [
//             { type: "max", name: "Max" },
//             { type: "min", name: "Min" },
//           ],
//         },
//       });
//     }
//   });

//   option.value.series = series;

//   option.value.legend = {
//     data: selectedItem.value,
//   };

//   option.value.xAxis = {
//     type: "category",
//     nameLocation: "middle",
//     data: sortedTimestamps, // x축 데이터를 타임스탬프로 설정
//     axisLabel: {
//       color: textColor.value, // 텍스트 색상을 흰색으로 설정
//       formatter: (value) => {
//         const date = new Date(value);
//         const formattedDate = `
//         ${date.getDate().toString().padStart(2, "0")} ${date
//           .getHours()
//           .toString()
//           .padStart(2, "0")}:${date
//           .getMinutes()
//           .toString()
//           .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
//         return formattedDate;
//       },
//     },
//   };

//   // if (chartInstance.value) {
//   //   chartInstance.value.clear(); // 이전 데이터 제거
//   //   chartInstance.value.setOption(option.value);
//   // }
//   initializeChart();
// };

// x축의 범위를 업데이트하는 dataZoom 이벤트 핸들러 추가
const updateZoomRange = (params) => {
  const { startValue, endValue } = params.batch[0];
  const start = option.value.xAxis.data[startValue];
  const end = option.value.xAxis.data[endValue];
  zoomRange.value = `Zoom Range: ${start} - ${end}`;
};

// 차트 인스턴스를 초기화하고 이벤트 리스너를 등록하는 함수
const initializeChart = () => {
  if (chartInstance.value) {
    chartInstance.value.clear();
    chartInstance.value.setOption(option.value);
    chartInstance.value.on("dataZoom", updateZoomRange);
  }
};

const testData = () => {
  initChart();
};

const requests = ref({
  type: "",
  data: "",
  period: "",
  signal: "",
});

// 데이터 API 요청
const fetchData = async (subComponent, contents) => {
  try {
    if (selectedtrialrun.value === "직접 선택") {
      // 직접 선택이라면
      requests.value.period = `period?start_utctime=${startDate.value}&end_utctime=${endDate.value}`;
    } else {
      // 시험 선택이라면
      requests.value.period = `test?test_name=${selectedtrialrun.value}`;
    }

    let apiReq = `table_data/information/test?test_name=TestCase1&signal_name=ais_vdo&signal_name=ais_vdm`;
    apiReq = `table_data/information/${requests.value.period}&signal_name=${subComponent}_${contents}`;
    let a = await readDataTrial(tokenid.value, apiReq);
    return a;
  } catch (error) {
    console.error(error);
    throw error; // 에러를 호출자에게 전파
  }
};

let n = 0;

const processData = (
  dataArray,
  timestampKey,
  dataKey,
  unitValue,
  contentsItemValue,
  analysisName
) => {
  // const dataArray = data.DGPS_GGA;

  analysisData.value[n] = dataArray.map((item) => item[dataKey]);

  // 중복된 타임스탬프를 제거하면서 analysisTime에 값을 추가
  const newTimestamps = dataArray.map((item) => item[timestampKey]);
  const allTimestamps = new Set([...analysisTime.value, ...newTimestamps]);
  analysisTime.value = Array.from(allTimestamps).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // analysisTime.value = data.map((item) => item[timestampKey]);
  // gData[analysisName] = data.map((item) => item[dataKey]);
  gData[analysisName] = dataArray.map((item) => {
    let obj = {};
    obj[item[timestampKey]] = item[dataKey];
    return obj;
  });

  unit.value = unitValue;
  // selectedcontentsItem.value = contentsItemValue;
  analysis.value[n].name = analysisName;
  analysis.value[n].unit = unitValue;
  n++;
};

//데이터 검색
const searchData = async () => {
  // if (
  //   selectedsubComponent.value !== null &&
  //   selectedItem.value !== null &&
  //   selectedtrialrun.value !== null
  // ) {
  //   nodata.value = true;
  //   loading.value = true;
  //   first.value = false;

  // } else {
  //   alert("선택항목을 선택해주세요.");
  // }
  updateDate();
  // clearChart();

  try {
    analysisData.value = [];
    analysisTime.value = [];

    const newLength = selectedItem.value.length;
    // 기본 객체 템플릿
    const template = {
      name: "signal",
      unit: "unit",
      min: "-",
      max: "-",
      average: "-",
      rmse: "-",
      rms: "-",
      variance: "-",
      error: "-",
      median: "-",
    };
    analysis.value = Array.from({ length: newLength }, () => ({ ...template }));

    if (
      selectedItem.value.includes("latitude") ||
      selectedItem.value.includes("longitude") ||
      selectedItem.value.includes("altitude")
    ) {
      const fetchedData = await fetchData("DGPS", "GGA");
      itemsData.gga = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("speedovergroundknots") ||
      selectedItem.value.includes("courseovergrounddegreestrue")
    ) {
      const fetchedData = await fetchData("DGPS", "VTG");
      itemsData.vtg = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("heading")) {
      const fetchedData = await fetchData("GYRO", "HDT");
      itemsData.hdt = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("rateofturn")) {
      const fetchedData = await fetchData("GYRO", "ROT");
      itemsData.rot = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("anemometerangle") ||
      selectedItem.value.includes("anemometerspeed")
    ) {
      const fetchedData = await fetchData("ANEMOMETER", "MWV");
      itemsData.mwv = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("speedn")) {
      const fetchedData = await fetchData("SPEEDLOG", "VHW");
      itemsData.vhw = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("starboardruddersensor") ||
      selectedItem.value.includes("portruddersensor")
    ) {
      const fetchedData = await fetchData("AUTOPILOT", "RSA");
      itemsData.rsa = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("1_Engine Speed")) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_61444"
      );
      itemsData.engine_SPEED = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("1_Engine Oil Temperature")) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65262"
      );
      itemsData.engine_OIL_TEMPERATURE1 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("1_Engine Oil Pressure") ||
      selectedItem.value.includes("1_Engine Coolant Level")
    ) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65263"
      );
      itemsData.engine_OIL_PRESSURE = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("1_Transmission Oil Pressure")) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65272"
      );
      itemsData.transmission_OIL_PRESSURE = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("1_Charging System Potential") ||
      selectedItem.value.includes("1_Battery Potential")
    ) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65271"
      );
      itemsData.charging_SYSTEM_POTENTIAL = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("1_Engine total hours")) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65253"
      );
      itemsData.engine_TOTAL_HOURS = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("1_Engine Intake Manifold Pressure") ||
      selectedItem.value.includes("1_Engine Intake Manifold Temp") ||
      selectedItem.value.includes("1_Engine Exhaust Gas Temperature")
    ) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65270"
      );
      itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE =
        Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("1_fuel_LEVEL")) {
      const fetchedData = await fetchData(
        "NO1ENGINEPANEL",
        "NO1ENGINE_PANEL_65276"
      );
      itemsData.fuel_LEVEL_1 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("2_Engine Speed")) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_61444"
      );
      itemsData.engine_SPEED2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("2_Engine Oil Temperature")) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65262"
      );
      itemsData.engine_OIL_TEMPERATURE2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("2_Engine Oil Pressure") ||
      selectedItem.value.includes("2_Engine Coolant Level")
    ) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65263"
      );
      itemsData.engine_OIL_PRESSURE2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("2_Transmission Oil Pressure")) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65272"
      );
      itemsData.transmission_OIL_PRESSURE2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("2_Charging System Potential") ||
      selectedItem.value.includes("2_Battery Potential")
    ) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65271"
      );
      itemsData.charging_SYSTEM_POTENTIAL2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("2_Engine total hours")) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65253"
      );
      itemsData.engine_TOTAL_HOURS2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (
      selectedItem.value.includes("2_Engine Intake Manifold Pressure") ||
      selectedItem.value.includes("2_Engine Intake Manifold Temp") ||
      selectedItem.value.includes("2_Engine Exhaust Gas Temperature")
    ) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65270"
      );
      itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE2 =
        Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }
    if (selectedItem.value.includes("2_fuel_LEVEL")) {
      const fetchedData = await fetchData(
        "NO2ENGINEPANEL",
        "NO2ENGINE_PANEL_65276"
      );
      itemsData.fuel_LEVEL_2 = Object.values(fetchedData)[0]; // 동적으로 배열 추출
    }

    selectedItem.value.forEach((item) => {
      switch (item) {
        case "latitude":
          processData(
            itemsData.gga,
            "timestamp_EQUIPMENT",
            "latitude",
            "degree(°)",
            "gga/latitude",
            "latitude"
          );
          break;
        case "longitude":
          processData(
            itemsData.gga,
            "timestamp_EQUIPMENT",
            "longitude",
            "degree(°)",
            "gga/longitude",
            "longitude"
          );
          break;
        case "altitude":
          processData(
            itemsData.gga,
            "timestamp_EQUIPMENT",
            "altitude",
            "M",
            "gga/altitude",
            "altitude"
          );
          break;
        case "speedovergroundknots":
          processData(
            itemsData.vtg,
            "timestamp_EQUIPMENT",
            "speedovergroundknots",
            "N",
            "vtg/speedovergroundknots",
            "speedovergroundknots"
          );
          break;
        case "courseovergrounddegreestrue":
          processData(
            itemsData.vtg,
            "timestamp_EQUIPMENT",
            "courseovergrounddegreestrue",
            "degree(°)",
            "vtg/courseovergrounddegreestrue",
            "courseovergrounddegreestrue"
          );
          break;
        case "heading":
          processData(
            itemsData.hdt,
            "timestamp_EQUIPMENT",
            "heading",
            "degree(°)",
            "hdt/heading",
            "heading"
          );
          break;
        case "rateofturn":
          processData(
            itemsData.rot,
            "timestamp_EQUIPMENT",
            "rateofturn",
            "degree/minute",
            "rot/rateofturn",
            "rateofturn"
          );
          break;
        case "anemometerangle":
          processData(
            itemsData.mwv,
            "timestamp_EQUIPMENT",
            "anemometerangle",
            "degree(°)",
            "mwv/anemometerangle",
            "anemometerangle"
          );
          break;
        case "anemometerspeed":
          processData(
            itemsData.mwv,
            "timestamp_EQUIPMENT",
            "anemometerspeed",
            "m/s",
            "mwv/anemometerspeed",
            "anemometerspeed"
          );
          break;
        case "speedn":
          processData(
            itemsData.vhw,
            "timestamp_EQUIPMENT",
            "speedn",
            "N",
            "vhw/speedn",
            "speedn"
          );
          break;
        case "starboardruddersensor":
          processData(
            itemsData.rsa,
            "timestamp_EQUIPMENT",
            "starboardruddersensor",
            "degree(°)",
            "rsa/starboardruddersensor",
            "starboardruddersensor"
          );
          break;
        case "portruddersensor":
          processData(
            itemsData.rsa,
            "timestamp_EQUIPMENT",
            "portruddersensor",
            "degree(°)",
            "rsa/portruddersensor",
            "portruddersensor"
          );
          break;

        case "1_Engine Speed":
          processData(
            itemsData.engine_SPEED,
            "timestamp_EQUIPMENT",
            "engine_SPEED",
            "RPM",
            "no1engine_panel_61444/Engine Speed",
            "1_Engine Speed"
          );
          break;
        case "1_Engine Oil Temperature":
          processData(
            itemsData.engine_OIL_TEMPERATURE1,
            "timestamp_EQUIPMENT",
            "engine_OIL_TEMPERATURE1",
            "°C",
            "no1engine_panel_65262/Engine Oil Temperature",
            "1_Engine Oil Temperature"
          );
          break;
        case "1_Engine Oil Pressure":
          processData(
            itemsData.engine_OIL_PRESSURE,
            "timestamp_EQUIPMENT",
            "engine_OIL_PRESSURE",
            "kPa",
            "no1engine_panel_65263/Engine Oil Pressure",
            "1_Engine Oil Pressure"
          );
          break;
        case "1_Engine Coolant Level":
          processData(
            itemsData.engine_OIL_PRESSURE,
            "timestamp_EQUIPMENT",
            "engine_COOLANT_LEVEL",
            "%",
            "no1engine_panel_65263/Engine Coolant Level",
            "1_Engine Coolant Level"
          );
          break;
        case "1_Transmission Oil Pressure":
          processData(
            itemsData.transmission_OIL_PRESSURE,
            "timestamp_EQUIPMENT",
            "transmission_OIL_PRESSURE",
            "kPa",
            "no1engine_panel_65272/Transmission Oil Pressure",
            "1_Transmission Oil Pressure"
          );
          break;
        case "1_Charging System Potential":
          processData(
            itemsData.charging_SYSTEM_POTENTIAL,
            "timestamp_EQUIPMENT",
            "charging_SYSTEM_POTENTIAL",
            "V",
            "no1engine_panel_65271/Charging System Potential",
            "1_Charging System Potential"
          );
          break;
        case "1_Battery Potential":
          processData(
            itemsData.charging_SYSTEM_POTENTIAL,
            "timestamp_EQUIPMENT",
            "battery_POTENTIAL",
            "V",
            "no1engine_panel_65271/Battery Potential",
            "1_Battery Potential"
          );
          break;
        case "1_Engine total hours":
          processData(
            itemsData.engine_TOTAL_HOURS,
            "timestamp_EQUIPMENT",
            "engine_TOTAL_HOURS",
            "hr",
            "no1engine_panel_65253/Engine total hours",
            "1_Engine total hours"
          );
          break;
        case "1_Engine Intake Manifold Pressure":
          processData(
            itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE,
            "timestamp_EQUIPMENT",
            "engine_INTAKE_MANIFOLD_NO1_PRESSURE",
            "kPa",
            "no1engine_panel_65270/Engine Intake Manifold Pressure",
            "1_Engine Intake Manifold Pressure"
          );
          break;
        case "1_Engine Intake Manifold Temp":
          processData(
            itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE,
            "timestamp_EQUIPMENT",
            "engine_INTAKE_MANIFOLD_NO1_TEMP",
            "°C",
            "no1engine_panel_65270/Engine Intake Manifold Temp",
            "1_Engine Intake Manifold Temp"
          );
          break;
        case "1_Engine Exhaust Gas Temperature":
          processData(
            itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE,
            "timestamp_EQUIPMENT",
            "engine_EXHAUST_GAS_TEMPERATURE",
            "°C",
            "no1engine_panel_65270/Engine Exhaust Gas Temperature",
            "1_Engine Exhaust Gas Temperature"
          );
          break;
        case "1_fuel_LEVEL":
          processData(
            itemsData.fuel_LEVEL_1,
            "timestamp_EQUIPMENT",
            "fuel_LEVEL_1",
            "%",
            "no1engine_panel_65276/Fuel Level",
            "1_fuel_LEVEL"
          );
          break;

        case "2_Engine Speed":
          processData(
            itemsData.engine_SPEED2,
            "timestamp_EQUIPMENT",
            "engine_SPEED",
            "RPM",
            "no2engine_panel_61444/Engine Speed",
            "2_Engine Speed"
          );
          break;
        case "2_Engine Oil Temperature":
          processData(
            itemsData.engine_OIL_TEMPERATURE2,
            "timestamp_EQUIPMENT",
            "engine_OIL_TEMPERATURE1",
            "°C",
            "no2engine_panel_65262/Engine Oil Temperature",
            "2_Engine Oil Temperature"
          );
          break;
        case "2_Engine Oil Pressure":
          processData(
            itemsData.engine_OIL_PRESSURE2,
            "timestamp_EQUIPMENT",
            "engine_OIL_PRESSURE",
            "kPa",
            "no2engine_panel_65263/Engine Oil Pressure",
            "2_Engine Oil Pressure"
          );
          break;
        case "2_Engine Coolant Level":
          processData(
            itemsData.engine_OIL_PRESSURE2,
            "timestamp_EQUIPMENT",
            "engine_COOLANT_LEVEL",
            "%",
            "no2engine_panel_65263/Engine Coolant Level",
            "2_Engine Coolant Level"
          );
          break;
        case "2_Transmission Oil Pressure":
          processData(
            itemsData.transmission_OIL_PRESSURE2,
            "timestamp_EQUIPMENT",
            "transmission_OIL_PRESSURE",
            "kPa",
            "no2engine_panel_65272/Transmission Oil Pressure",
            "2_Transmission Oil Pressure"
          );
          break;
        case "2_Charging System Potential":
          processData(
            itemsData.charging_SYSTEM_POTENTIAL2,
            "timestamp_EQUIPMENT",
            "charging_SYSTEM_POTENTIAL",
            "V",
            "no2engine_panel_65271/Charging System Potential",
            "2_Charging System Potential"
          );
          break;
        case "2_Battery Potential":
          processData(
            itemsData.charging_SYSTEM_POTENTIAL2,
            "timestamp_EQUIPMENT",
            "battery_POTENTIAL",
            "V",
            "no2engine_panel_65271/Battery Potential",
            "2_Battery Potential"
          );
          break;
        case "2_Engine total hours":
          processData(
            itemsData.engine_TOTAL_HOURS2,
            "timestamp_EQUIPMENT",
            "engine_TOTAL_HOURS",
            "hr",
            "no2engine_panel_65253/Engine total hours",
            "2_Engine total hours"
          );
          break;
        case "2_Engine Intake Manifold Pressure":
          processData(
            itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE2,
            "timestamp_EQUIPMENT",
            "engine_INTAKE_MANIFOLD_NO1_PRESSURE",
            "kPa",
            "no2engine_panel_65270/Engine Intake Manifold Pressure",
            "2_Engine Intake Manifold Pressure"
          );
          break;
        case "2_Engine Intake Manifold Temp":
          processData(
            itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE2,
            "timestamp_EQUIPMENT",
            "engine_INTAKE_MANIFOLD_NO1_TEMP",
            "°C",
            "no2engine_panel_65270/Engine Intake Manifold Temp",
            "2_Engine Intake Manifold Temp"
          );
          break;
        case "2_Engine Exhaust Gas Temperature":
          processData(
            itemsData.engine_INTAKE_MANIFOLD_NO1_PRESSURE2,
            "timestamp_EQUIPMENT",
            "engine_EXHAUST_GAS_TEMPERATURE",
            "°C",
            "no2engine_panel_65270/Engine Exhaust Gas Temperature",
            "2_Engine Exhaust Gas Temperature"
          );
          break;
        case "2_fuel_LEVEL":
          processData(
            itemsData.fuel_LEVEL_2,
            "timestamp_EQUIPMENT",
            "fuel_LEVEL_1",
            "%",
            "no2engine_panel_65276/Fuel Level",
            "2_fuel_LEVEL"
          );
          break;
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    // loading.value = false;
  }

  updateDate();
  // clearChart();
  option.value.series = [];
  // updateSeries();
  initChart();
  calculateData(0, analysisTime.value.length);
  // chart.value.setOption(updateSeries);
  n = 0;
};

const calculateData = (start, end) => {
  const datasetRaw2 = ref([["time", "value"]]);
  datasetRaw2.value = [];

  const reTime = analysisTime.value.slice(start, end);

  reTime.sort((a, b) => {
    // 시간을 기준으로 정렬하기 위해 시간을 비교합니다.
    const timeA = new Date(a);
    const timeB = new Date(b);
    return timeA - timeB;
  });

  datasetRaw2.value.sort((a, b) => {
    // 시간을 기준으로 정렬하기 위해 시간을 비교합니다.
    const timeA = new Date(a[0]);
    const timeB = new Date(b[0]);
    return timeA - timeB;
  });

  //updateSeries();

  for (let n = 0; n < selectedItem.value.length; n++) {
    const reData = analysisCal.value[n].slice(start, end);
    const isData = reData.filter((value) => value !== null);

    console.log(isData);
    for (let i = 0; i <= reTime.length; i++) {
      datasetRaw2.value.push([reTime[i + 1], isData[i]]);
    }

    if (reTime.length <= 0) {
      analysis.value[n].min = "-"; // 최댓값
      analysis.value[n].max = "-"; // 평균값
      analysis.value[n].average = "-"; // 표준편차
      analysis.value[n].rmse = "-"; // 제곱평균제곱근
      analysis.value[n].rms = "-"; // 중앙값
      analysis.value[n].median = "-"; // 표준 오차
      analysis.value[n].error = "-"; // 분산
      analysis.value[n].variance = "-";

      // nodata.value = true;
      // loading.value = false;
    } else {
      // nodata.value = false;
    }

    const minValue = ref(); // 최솟값
    const maxValue = ref(); // 최댓값
    const averageValue = ref(); // 평균값
    const standardDeviation = ref(); // 표준편차
    const rms = ref(); // 제곱평균제곱근
    const median = ref(); // 중앙값
    const standardError = ref(); // 표준오차
    const variance = ref();
    const numericValues = isData
      .map((value) => Number(value))
      .filter((value) => !isNaN(value));

    // console.log( "통계:", analysisData.value); // if(analysisData)

    if (numericValues.length > 1) {
      // 최솟값 구하기
      minValue.value = Math.min(...isData);

      // 최댓값 구하기
      maxValue.value = Math.max(...isData);
      // 평균 계산sortedValues
      const sum = ref(numericValues.reduce((acc, value) => acc + value, 0));
      averageValue.value = sum.value / numericValues.length;

      // 표준편차 계산
      const squaredDifferences = ref(
        numericValues.map((value) => Math.pow(value - averageValue.value, 2))
      );
      const sumOfSquaredDifferences = squaredDifferences.value.reduce(
        (acc, value) => acc + value,
        0
      );
      variance.value = sumOfSquaredDifferences / numericValues.length;
      standardDeviation.value = Math.sqrt(variance.value);

      // 제곱평균제곱근(RMS) 계산
      const sumOfSquares = ref(
        numericValues.reduce((acc, value) => acc + Math.pow(value, 2), 0)
      );
      rms.value = Math.sqrt(sumOfSquares.value / numericValues.length);

      // 중앙값 계산
      const sortedValues = numericValues.sort((a, b) => a - b);
      const mid = ref(Math.floor(sortedValues.length / 2));

      if (sortedValues.length % 2 === 0) {
        // 짝수일 경우 중간의 두 값의 평균을 중앙값으로 사용
        median.value =
          (sortedValues[mid.value - 1] + sortedValues[mid.value]) / 2;
      } else {
        // 홀수일 경우 중간 값이 중앙값
        median.value = sortedValues[mid.value];
      }
      // 표준 오차 계산
      standardError.value =
        standardDeviation.value / Math.sqrt(numericValues.length);
    } else {
      alert("데이터가 존재하지 않습니다.");
      averageValue.value = 0;
      standardDeviation.value = 0;
      rms.value = 0;
      median.value = 0;
      standardError.value = 0;
    }
    // analysis.value[n].unit = unit.value;
    // console.log(`Minimum Value: ${minValue.value}`); // 최솟값
    analysis.value[n].min = minValue.value.toFixed(4);
    // console.log(`Maximum Value: ${maxValue.value}`); // 최댓값
    analysis.value[n].max = maxValue.value.toFixed(4);
    // console.log(`Average Value: ${averageValue.value}`); // 평균값
    analysis.value[n].average = averageValue.value.toFixed(4);
    // console.log(`Standard Deviation: ${standardDeviation.value}`); // 표준편차
    analysis.value[n].rmse = standardDeviation.value.toFixed(4);
    // console.log(`RMS (Root Mean Square): ${rms.value}`); // 제곱평균제곱근
    analysis.value[n].rms = rms.value.toFixed(4);
    // console.log(`Median: ${median.value}`); // 중앙값
    analysis.value[n].median = median.value.toFixed(4);
    // console.log(`Standard Error: ${standardError.value}`); // 표준 오차
    analysis.value[n].error = standardError.value.toFixed(4);
    // console.log(`Variance: ${variance.value}`); // 분산
    analysis.value[n].variance = variance.value.toFixed(4);
  }
};

const clearChart = () => {
  option.value.series = [];
  chart.value.setOption(option.value, true); // true를 통해 기존 옵션을 덮어쓰고 초기화
};

const captureImage = async () => {
  const graphSheet = document.getElementById("graph");
  if (graphSheet) {
    try {
      const canvas = await html2canvas(graphSheet);
      const imageData = canvas.toDataURL("image/png");

      // 데이터 URI를 Blob으로 변환
      const blobData = await fetch(imageData).then((res) => res.blob());

      // Blob을 URL로 변환
      const blobUrl = URL.createObjectURL(blobData);

      // 다운로드 링크 생성
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = `${analysis.value[0].name}_image.png`; // 파일명 지정

      // 링크 클릭 및 다운로드
      downloadLink.click();

      // URL 객체 해제
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  }
};
</script>

<style scoped>
.custom-select {
  --v-select-menu-font-size: 10px;
}
.chart {
  height: 65vh;
}
body {
  margin: 0;
}
.v-data-table-footer {
  display: none !important;
}
.card-title {
  display: flex;
  align-items: center;
}
.text-span {
  margin-top: 5px;
  font-size: 11px;
  color: #ff4444;
}
</style>
