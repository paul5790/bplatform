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
                <v-card-item id="graph">
                  <v-card-title>
                    <span class="text-h6">{{ selectedcontentsItem }}</span>
                  </v-card-title>
                  <v-chart class="chart" :option="option" autoresize />
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
                  <v-data-table-virtual
                    style=""
                    :headers="headers"
                    :items="analysis"
                  >
                  </v-data-table-virtual>
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
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <div>
                    <v-select
                      v-model="selectedsubComponent"
                      :items="subComponents"
                      label="구성 요소"
                      variant="outlined"
                      class="custom-select"
                      style="margin-top: 3vh"
                    ></v-select>

                    <v-select
                      v-model="selectedItem"
                      :items="items"
                      label="신호 선택"
                      variant="outlined"
                      class="custom-select"
                    ></v-select>

                    <v-select
                      v-model="selectedtrialrun"
                      :items="trialrun"
                      label="항차 선택"
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
                      style="margin-top: 30px"
                      width="500px"
                      :color = btnColor
                      @click="searchData()"
                    >
                      조회하기
                    </v-btn>
                    <v-btn
                      style="margin-top: 355px"
                      height="50px"
                      width="500px"
                      :color = btnColor
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
import { ref, provide, onMounted, watchEffect } from "vue";
import html2canvas from "html2canvas";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { readTrialData, readDataTrial, readDataDate } from "../api/index.js";
import {
  darkbackcolor,
  whitebackcolor,
  darkText,
  lightText,
  darkbtn,
  lightbtn,
} from "../color/color.js";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
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
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent,
]);
provide(THEME_KEY);

// 다크모드
const themeMode = ref(localStorage.getItem("themeMode") || "light");

const btnColor = ref(themeMode.value === "light" ? lightbtn : darkbtn);
const textColor = ref(themeMode.value === "light" ? lightText : darkText);
const themeColor = ref(
  themeMode.value === "light" ? whitebackcolor : darkbackcolor
);

// 왼쪽 셀렉바 설정
const tokenid = ref(sessionStorage.getItem("token") || "");
const analysisData = ref([]);
const analysisTime = ref([]);
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
const trialrun = ref(["직접 선택"]);
const setStartTime = ref([]);
const setEndTime = ref([]);

// 선택된 데이터
const selectedsubComponent = ref(null);
const selectedItem = ref(null);
const selectedtrialrun = ref(null);
const selectedtrialNum = ref();
const selectedcontentsItem = ref("Contents/Item");
const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      setStartTime.value.push(`${response[i].startTimeUtc}`);
      setEndTime.value.push(`${response[i].endTimeUtc}`);
      selectedtrialNum.value = i + 1;
      console.log(setStartTime.value);
      console.log(setEndTime.value);
      console.log(`항차 ${i + 1}번`);
      trialrun.value.push(`항차 ${i + 1}번`);
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(getTrialDate);

// 시운전 시간 받아오기
const date_readonly = ref(true);
const dateRange = ref([]);
const daterange = ref("");
const voyagesearch = ref(false);
const startDate2 = ref(); // 반응적인(ref) 변수로 선언
const endDate2 = ref(); // 반응적인(ref) 변수로 선언
const nodata = ref(true);
const loading = ref(false);
const first = ref(true);
watchEffect(() => {
  const index = trialrun.value.indexOf(selectedtrialrun.value);
  selectedtrialNum.value = index;
  daterange.value = `${selectedtrialNum.value}항차 데이터`;

  if (selectedtrialrun.value === "직접 선택") {
    date_readonly.value = false;
    voyagesearch.value = false;

    const start = new Date(dateRange.value[0]);
    const end = new Date(dateRange.value[1]);

    if (!isNaN(start) && !isNaN(end)) {
      // 유효한 날짜인 경우에만 ISO 문자열로 변환
      startDate2.value = start.toISOString();
      endDate2.value = end.toISOString();
      console.log("start.toISOString():", start.toISOString().slice(0, 10));
      console.log("end.toISOString():", end.toISOString().slice(0, 10));
      daterange.value = `${start.toISOString().slice(0, 10)}~${end
        .toISOString()
        .slice(0, 10)} 데이터`;
    } else {
      console.error("Invalid date values in dateRange.value");
    }
  } else {
    const index = trialrun.value.indexOf(selectedtrialrun.value);
    console.log(index);
    date_readonly.value = true;
    voyagesearch.value = true;

    const date1 = ref(setStartTime.value[index - 1]);
    const date2 = ref(setEndTime.value[index - 1]);

    // Date 객체로 변환
    startDate2.value = new Date(date1.value);
    endDate2.value = new Date(date2.value);

    // 시간 범위 설정
    dateRange.value = [startDate2.value, endDate2.value];
  }
});

watchEffect(() => {
  items.value = []; // 기존 items 초기화
  selectedItem.value = null;
  if (selectedsubComponent.value) {
    // null 체크 추가
    if (selectedsubComponent.value.includes("DGPS")) {
      items.value.push("위도", "경도", "고도", "SOG", "COG");
    }
    if (selectedsubComponent.value.includes("GYRO")) {
      items.value.push("Heading", "회전 속도");
    }
    if (selectedsubComponent.value.includes("ANEMOMETER")) {
      items.value.push("풍향", "풍속");
    }
    if (selectedsubComponent.value.includes("SPEEDLOG")) {
      items.value.push("선박 속도");
    }
    if (selectedsubComponent.value.includes("AUTOPILOT")) {
      items.value.push("스타보트 센서", "포트 센서");
    }
    if (selectedsubComponent.value.includes("NO.1ENGINEPANEL")) {
      items.value.push(
        "엔진1 속도",
        "엔진1 오일 온도",
        "엔진1 오일 압력",
        "엔진1 냉각수 량",
        "엔진1 변속기 오일 압력",
        "엔진1 충전 시스템 전압",
        "엔진1 배터리 전압",
        "엔진1 누적 가동시간",
        "엔진1 흡입 매니폴드 압력",
        "엔진1 흡입 매니폴드 온도",
        "엔진1 배기가스 온도",
        "엔진1 연료 량"
      );
    }
    if (selectedsubComponent.value.includes("NO.2ENGINEPANEL")) {
      items.value.push(
        "엔진2 속도",
        "엔진2 오일 온도",
        "엔진2 오일 압력",
        "엔진2 냉각수 량",
        "엔진2 변속기 오일 압력",
        "엔진2 충전 시스템 전압",
        "엔진2 배터리 전압",
        "엔진2 누적 가동시간",
        "엔진2 흡입 매니폴드 압력",
        "엔진2 흡입 매니폴드 온도",
        "엔진2 배기가스 온도",
        "엔진2 연료 량"
      );
    }
  }
});

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
    unit: "-",
    min: 0,
    max: 0,
    average: 0,
    rmse: 0,
    rms: 0,
    variance: 0,
    error: 0,
    median: 0,
  },
]);
const unit = ref();

// 데이트 피커
const date = ref();

const startDate = new Date();
const endDate = new Date();
onMounted(() => {
  date.value = [startDate, endDate];
});

const fetchData = async (component, type, item, trialNum, startDate, endDate) => {
  try {
    const dataType = `${component.toLowerCase()}/${type.toLowerCase()}`;
    if (voyagesearch.value) {
      return await readDataTrial(tokenid.value, dataType, trialNum);
    } else {
      return await readDataDate(tokenid.value, component, type, startDate, endDate);
    }
  } catch (error) {
    console.error(error);
    throw error; // 에러를 호출자에게 전파
  }
};
const fetchEngineData = async (url, component, type, item, trialNum, startDate, endDate) => {
  try {
    const dataType = url;
    if (voyagesearch.value) {
      return await readDataTrial(tokenid.value, dataType, trialNum);
    } else {
      return await readDataDate(tokenid.value, component, type, startDate, endDate);
    }
  } catch (error) {
    console.error(error);
    throw error; // 에러를 호출자에게 전파
  }
};

const processData = (data, timestampKey, dataKey, unitValue, contentsItemValue, analysisName) => {
  analysisData.value = data.map(item => item[dataKey]);
  analysisTime.value = data.map(item => item[timestampKey].slice(8, 19));
  unit.value = unitValue;
  selectedcontentsItem.value = contentsItemValue;
  analysis.value[0].name = analysisName;
  console.log(analysisData.value);
  console.log(analysisTime.value);
};

const searchData = async () => {
  nodata.value = true;
  loading.value = true;
  first.value = false;

  try {
    analysisData.value = [];
    analysisTime.value = [];

    if (selectedsubComponent.value !== null &&
      selectedItem.value !== null &&
      selectedtrialrun.value !== null
    ) {
      const [gga, vtg, hdt, rot, mwv, vhw, rsa, engine_SPEED,engine_OIL_TEMPERATURE1,engine_OIL_PRESSURE,transmission_OIL_PRESSURE,charging_SYSTEM_POTENTIAL,engine_TOTAL_HOURS,engine_INTAKE_MANIFOLD_NO1_PRESSURE,fuel_LEVEL_1,
    engine_SPEED2,engine_OIL_TEMPERATURE2,engine_OIL_PRESSURE2,transmission_OIL_PRESSURE2,charging_SYSTEM_POTENTIAL2,engine_TOTAL_HOURS2,engine_INTAKE_MANIFOLD_NO1_PRESSURE2,fuel_LEVEL_2,] = await Promise.all([
        fetchData("DGPS", "GGA", selectedItem.value === "위도" || selectedItem.value === "경도" ? "latitude,longitude" : "altitude", selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchData("DGPS", "VTG", selectedItem.value === "SOG" || selectedItem.value === "COG" ? "speedovergroundknots,courseovergrounddegreestrue" : null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchData("GYRO", "HDT", selectedItem.value === "Heading" ? "heading" : null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchData("GYRO", "ROT", selectedItem.value === "회전 속도" ? "rateofturn" : null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchData("ANEMOMETER", "MWV", selectedItem.value === "풍향" || selectedItem.value === "풍속" ? "anemometerangle,anemometerspeed" : null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchData("SPEEDLOG", "VHW", selectedItem.value === "선박 속도" ? "speedn" : null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchData("AUTOPILOT", "RSA", selectedItem.value === "스타보트 센서" || selectedItem.value === "포트 센서" ? "starboardruddersensor,portruddersensor" : null, selectedtrialNum.value, startDate2.value, endDate2.value),
        
        fetchEngineData("no1enginepanel/no1engine_panel_61444", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_61444", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65262", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65262", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65263", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65263", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65272", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65272", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65271", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65271", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65253", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65253", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65270", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65270", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no1enginepanel/no1engine_panel_65276", "NO.1ENGINEPANEL", "NO.1ENGINE_PANEL_65276", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_61444", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_61444", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65262", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65262", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65263", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65263", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65272", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65272", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65271", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65271", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65253", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65253", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65270", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65270", null, selectedtrialNum.value, startDate2.value, endDate2.value),
        fetchEngineData("no2enginepanel/no2engine_panel_65276", "NO.2ENGINEPANEL", "NO.2ENGINE_PANEL_65276", null, selectedtrialNum.value, startDate2.value, endDate2.value),
      ]);

      switch (selectedItem.value) {
        case "위도":
          processData(gga, "timestamp_EQUIPMENT", "latitude", "degree(°)", "gga/latitude", "latitude");
          break;
        case "경도":
          processData(gga, "timestamp_EQUIPMENT", "longitude", "degree(°)", "gga/longitude", "longitude");
          break;
        case "고도":
          processData(gga, "timestamp_EQUIPMENT", "altitude", "M", "gga/altitude", "altitude");
          break;
        case "SOG":
          processData(vtg, "timestamp_EQUIPMENT", "speedovergroundknots", "N", "vtg/speedovergroundknots", "speedovergroundknots");
          break;
        case "COG":
          processData(vtg, "timestamp_EQUIPMENT", "courseovergrounddegreestrue", "degree(°)", "vtg/courseovergrounddegreestrue", "courseovergrounddegreestrue");
          break;
        case "Heading":
          processData(hdt, "timestamp_EQUIPMENT", "heading", "degree(°)", "hdt/heading", "heading");
          break;
        case "회전 속도":
          processData(rot, "timestamp_EQUIPMENT", "rateofturn", "degree/minute", "rot/rateofturn", "rateofturn");
          break;
        case "풍향":
          processData(mwv, "timestamp_EQUIPMENT", "anemometerangle", "degree(°)", "mwv/anemometerangle", "anemometerangle");
          break;
        case "풍속":
          processData(mwv, "timestamp_EQUIPMENT", "anemometerspeed", "m/s", "mwv/anemometerspeed", "anemometerspeed");
          break;
        case "선박 속도":
          processData(vhw, "timestamp_EQUIPMENT", "speedn", "N", "vhw/speedn", "speedn");
          break;
        case "스타보트 센서":
          processData(rsa, "timestamp_EQUIPMENT", "starboardruddersensor", "degree(°)", "rsa/starboardruddersensor", "starboardruddersensor");
          break;
        case "포트 센서":
          processData(rsa, "timestamp_EQUIPMENT", "portruddersensor", "degree(°)", "rsa/portruddersensor", "portruddersensor");
          break;

        case "엔진1 속도":
          processData(engine_SPEED, "timestamp_EQUIPMENT", "engine_SPEED", "RPM", "no1engine_panel_61444/Engine Speed", "Engine Speed");
          break;
        case "엔진1 오일 온도":
          processData(engine_OIL_TEMPERATURE1, "timestamp_EQUIPMENT", "engine_OIL_TEMPERATURE1", "°C", "no1engine_panel_65262/Engine Oil Temperature", "Engine Oil Temperature");
          break;
        case "엔진1 오일 압력":
          processData(engine_OIL_PRESSURE, "timestamp_EQUIPMENT", "engine_OIL_PRESSURE", "kPa", "no1engine_panel_65263/Engine Oil Pressure", "Engine Oil Pressure");
          break;
        case "엔진1 냉각수 량":
          processData(engine_OIL_PRESSURE, "timestamp_EQUIPMENT", "engine_COOLANT_LEVEL", "%", "no1engine_panel_65263/Engine Coolant Level", "Engine Coolant Level");
          break;
        case "엔진1 변속기 오일 압력":
          processData(transmission_OIL_PRESSURE, "timestamp_EQUIPMENT", "transmission_OIL_PRESSURE", "kPa", "no1engine_panel_65272/Transmission Oil Pressure", "Transmission Oil Pressure");
          break;
        case "엔진1 충전 시스템 전압":
          processData(charging_SYSTEM_POTENTIAL, "timestamp_EQUIPMENT", "charging_SYSTEM_POTENTIAL", "V", "no1engine_panel_65271/Charging System Potential", "Charging System Potential");
          break;
        case "엔진1 배터리 전압":
          processData(charging_SYSTEM_POTENTIAL, "timestamp_EQUIPMENT", "battery_POTENTIAL", "V", "no1engine_panel_65271/Battery Potential", "Battery Potential");
          break;
        case "엔진1 누적 가동시간":
          processData(engine_TOTAL_HOURS, "timestamp_EQUIPMENT", "engine_TOTAL_HOURS", "hr", "no1engine_panel_65253/Engine total hours", "Engine total hours");
          break;
        case "엔진1 흡입 매니폴드 압력":
          processData(engine_INTAKE_MANIFOLD_NO1_PRESSURE, "timestamp_EQUIPMENT", "engine_INTAKE_MANIFOLD_NO1_PRESSURE", "kPa", "no1engine_panel_65270/Engine Intake Manifold Pressure", "Engine Intake Manifold Pressure");
          break;
        case "엔진1 흡입 매니폴드 온도":
          processData(engine_INTAKE_MANIFOLD_NO1_PRESSURE, "timestamp_EQUIPMENT", "engine_INTAKE_MANIFOLD_NO1_TEMP", "°C", "no1engine_panel_65270/Engine Intake Manifold Temp", "Engine Intake Manifold Temp");
          break;
        case "엔진1 배기가스 온도":
          processData(engine_INTAKE_MANIFOLD_NO1_PRESSURE, "timestamp_EQUIPMENT", "engine_EXHAUST_GAS_TEMPERATURE", "°C", "no1engine_panel_65270/Engine Exhaust Gas Temperature", "Engine Exhaust Gas Temperature");
          break;
        case "엔진1 연료 량":
          processData(fuel_LEVEL_1, "timestamp_EQUIPMENT", "fuel_LEVEL_1", "%", "no1engine_panel_65276/Fuel Level", "fuel_LEVEL");
          break;



        case "엔진2 속도":
          processData(engine_SPEED2, "timestamp_EQUIPMENT", "engine_SPEED", "RPM", "no2engine_panel_61444/Engine Speed", "Engine Speed");
          break;
        case "엔진2 오일 온도":
          processData(engine_OIL_TEMPERATURE2, "timestamp_EQUIPMENT", "engine_OIL_TEMPERATURE1", "°C", "no2engine_panel_65262/Engine Oil Temperature", "Engine Oil Temperature");
          break;
        case "엔진2 오일 압력":
          processData(engine_OIL_PRESSURE2, "timestamp_EQUIPMENT", "engine_OIL_PRESSURE", "kPa", "no2engine_panel_65263/Engine Oil Pressure", "Engine Oil Pressure");
          break;
        case "엔진2 냉각수 량":
          processData(engine_OIL_PRESSURE2, "timestamp_EQUIPMENT", "engine_COOLANT_LEVEL", "%", "no2engine_panel_65263/Engine Coolant Level", "Engine Coolant Level");
          break;
        case "엔진2 변속기 오일 압력":
          processData(transmission_OIL_PRESSURE2, "timestamp_EQUIPMENT", "transmission_OIL_PRESSURE", "kPa", "no2engine_panel_65272/Transmission Oil Pressure", "Transmission Oil Pressure");
          break;
        case "엔진2 충전 시스템 전압":
          processData(charging_SYSTEM_POTENTIAL2, "timestamp_EQUIPMENT", "charging_SYSTEM_POTENTIAL", "V", "no2engine_panel_65271/Charging System Potential", "Charging System Potential");
          break;
        case "엔진2 배터리 전압":
          processData(charging_SYSTEM_POTENTIAL2, "timestamp_EQUIPMENT", "battery_POTENTIAL", "V", "no2engine_panel_65271/Battery Potential", "Battery Potential");
          break;
        case "엔진2 누적 가동시간":
          processData(engine_TOTAL_HOURS2, "timestamp_EQUIPMENT", "engine_TOTAL_HOURS", "hr", "no2engine_panel_65253/Engine total hours", "Engine total hours");
          break;
        case "엔진2 흡입 매니폴드 압력":
          processData(engine_INTAKE_MANIFOLD_NO1_PRESSURE2, "timestamp_EQUIPMENT", "engine_INTAKE_MANIFOLD_NO1_PRESSURE", "kPa", "no2engine_panel_65270/Engine Intake Manifold Pressure", "Engine Intake Manifold Pressure");
          break;
        case "엔진2 흡입 매니폴드 온도":
          processData(engine_INTAKE_MANIFOLD_NO1_PRESSURE2, "timestamp_EQUIPMENT", "engine_INTAKE_MANIFOLD_NO1_TEMP", "°C", "no2engine_panel_65270/Engine Intake Manifold Temp", "Engine Intake Manifold Temp");
          break;
        case "엔진2 배기가스 온도":
          processData(engine_INTAKE_MANIFOLD_NO1_PRESSURE2, "timestamp_EQUIPMENT", "engine_EXHAUST_GAS_TEMPERATURE", "°C", "no2engine_panel_65270/Engine Exhaust Gas Temperature", "Engine Exhaust Gas Temperature");
          break;
        case "엔진2 연료 량":
          processData(fuel_LEVEL_2, "timestamp_EQUIPMENT", "fuel_LEVEL_1", "%", "no2engine_panel_65276/Fuel Level", "fuel_LEVEL");
          break;
      }
    }
    const datasetRaw2 = ref([["time", "value"]]);
      datasetRaw2.value = [];
      for (let i = 0; i <= analysisTime.value.length; i++) {
        datasetRaw2.value.push([
          analysisTime.value[i + 1],
          analysisData.value[i],
        ]);
      }
      if (analysisTime.value.length <= 0) {
        nodata.value = true;
        loading.value = false;
      } else {
        nodata.value = false;
      }
      console.log(`ROW2: ${datasetRaw2.value}`);

      option.value = {
        dataset: [
          {
            id: "dataset_raw",
            source: datasetRaw2.value,
          },
        ],
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            return `Time: ${params.value[0]}, Value: ${params.value[1]}`;
          },
          axisPointer: {
            animation: false,
          },
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1],
            height: "2%",
          },
        ],
        xAxis: {
          type: "category",
          nameLocation: "middle",
          data: analysisTime.value, // x축 데이터를 times 배열로 설정
          axisLabel: {
            color: textColor.value, // 텍스트 색상을 흰색으로 설정
          },
        },
        yAxis: {},
        series: [
          {
            type: "line",
            datasetId: "dataset_raw",
            showSymbol: false,
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            encode: {
              x: "time",
              y: "value",
              itemName: "time",
              tooltip: ["value"],
            },
          },
        ],
      };

      const minValue = ref(); // 최솟값
      const maxValue = ref(); // 최댓값
      const averageValue = ref(); // 평균값
      const standardDeviation = ref(); // 표준편차
      const rms = ref(); // 제곱평균제곱근
      const median = ref(); // 중앙값
      const standardError = ref(); // 표준오차
      const variance = ref();
      const numericValues = analysisData.value
        .map((value) => Number(value))
        .filter((value) => !isNaN(value));

      console.log( "통계:", analysisData.value); // if(analysisData)

      if (numericValues.length > 1) {
        // 최솟값 구하기
        minValue.value = Math.min(...analysisData.value);

        // 최댓값 구하기
        maxValue.value = Math.max(...analysisData.value);
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
          console.log("짝수");
        } else {
          // 홀수일 경우 중간 값이 중앙값
          median.value = sortedValues[mid.value];
          console.log("홀수");
        }
        // 표준 오차 계산
        standardError.value =
          standardDeviation.value / Math.sqrt(numericValues.length);
      } else {
        alert("..")
        averageValue.value = 0;
        standardDeviation.value = 0;
        rms.value = 0;
        median.value = 0;
        standardError.value = 0;
      }
      analysis.value[0].unit = unit.value;
      console.log(`Minimum Value: ${minValue.value}`); // 최솟값
      analysis.value[0].min = minValue.value.toFixed(4);
      console.log(`Maximum Value: ${maxValue.value}`); // 최댓값
      analysis.value[0].max = maxValue.value.toFixed(4);
      console.log(`Average Value: ${averageValue.value}`); // 평균값
      analysis.value[0].average = averageValue.value.toFixed(4);
      console.log(`Standard Deviation: ${standardDeviation.value}`); // 표준편차
      analysis.value[0].rmse = standardDeviation.value.toFixed(4);
      console.log(`RMS (Root Mean Square): ${rms.value}`); // 제곱평균제곱근
      analysis.value[0].rms = rms.value.toFixed(4);
      console.log(`Median: ${median.value}`); // 중앙값
      analysis.value[0].median = median.value.toFixed(4);
      console.log(`Standard Error: ${standardError.value}`); // 표준 오차
      analysis.value[0].error = standardError.value.toFixed(4);
      console.log(`Variance: ${variance.value}`); // 분산
      analysis.value[0].variance = variance.value.toFixed(4);

      console.log(`NaN Check: ${analysisData.value.some(isNaN)}`);
      console.log(`Empty Value Check: ${analysisData.value.includes("")}`);
      console.log(
        `Undefined Value Check: ${analysisData.value.includes(undefined)}`
      );
      console.log(
        `Non-numeric Value Check: ${analysisData.value.some(
          (value) => typeof value !== "number" || isNaN(value)
        )}`
      );
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
const datasetRaw = ref([["time", "value"]]);

const times = ref([]);
const rand = ref([]);
console.log(rand);
for (let i = 0; i <= 8000; i++) {
  datasetRaw.value.push([times.value[i], rand.value[i]]);
}

const option = ref({
  dataset: [
    {
      id: "dataset_raw",
      source: datasetRaw.value,
    },
  ],
  tooltip: {
    formatter: "{a} <br/>{b} : {c} mb",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  xAxis: {
    type: "category",
    nameLocation: "middle",
    data: times.value, // x축 데이터를 times 배열로 설정
    axisLabel: {
      color: textColor.value, // 텍스트 색상을 흰색으로 설정
    },
  },
  yAxis: {},
  series: [
    {
      type: "line",
      datasetId: "dataset_raw",
      showSymbol: false,
      encode: {
        x: "time",
        y: "value",
        itemName: "time",
        tooltip: ["value"],
      },
    },
  ],
});

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

.dp__theme_dark {
  --dp-background-color: #424242;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #999;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}

</style>
