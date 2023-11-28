<template>
  <v-card
    height="93vh"
    style="background-color: #f7f7f7"
    class="pa-1 d-flex justify-center align-center"
  >
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              style="
                height: 75vh;
                padding: 30px;
                padding-bottom: 0px;
                padding-right: 0;
                display: flex;
                background-color: #f7f7f7;
              "
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <v-card-title>
                    <span class="text-h6">Contents/Item</span>
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
              style="
                height: 20vh;
                padding: 30px;
                padding-top: 10px;
                padding-right: 0;
                display: flex;
                background-color: #f7f7f7;
              "
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <v-data-table-virtual
                    style=""
                    :headers="headers"
                    :items="analysis"
                    item-value="name"
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
              style="
                height: 93vh;
                padding: 30px;
                padding-bottom: 5px;
                padding-left: 10;
                display: flex;
                background-color: #f7f7f7;
              "
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
                      style="--dp-input-padding: 15px"
                      v-model="dateRange"
                      range
                      :readonly="true"
                    />

                    <v-btn
                      style="margin-top: 30px"
                      mt-xcxcbzxb
                      width="500px"
                      color="blue"
                      @click="searchData()"
                    >
                      조회하기
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
import EchartLine from "../components/EchartGraph/EchartLine.vue";
import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent,
]);
provide(THEME_KEY);
// 왼쪽 셀렉바 설정
const analysisData = ref([]);
const analysisTime = ref([]);
const subComponents = ref([
  "DGPS",
  "GYRO",
  "ANEMOMETER",
  "AUTOPILOT",
  "SPEEDLOG",
  "NO.1ENGINEPANEL",
  "NO.2ENGINEPANEL",
]);
const items = ref([]);
const trialrun = ref([]);
const setStartTime = ref([]);
const setEndTime = ref([]);

// 선택된 데이터
const selectedsubComponent = ref(null);
const selectedItem = ref(null);
const selectedtrialrun = ref(null);
const selectedtrialNum = ref();
const getTrialDate = async () => {
  try {
    const response = await axios.post("http://192.168.0.73:8080/info/seatrial");
    for (let i = 0; i < response.data.length; i++) {
      setStartTime.value.push(`${response.data[i].start_TIME_UTC}`);
      setEndTime.value.push(`${response.data[i].end_TIME_UTC}`);
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
watchEffect(() => {
  const index = trialrun.value.indexOf(selectedtrialrun.value);
  selectedtrialNum.value = index + 1;
  console.log(selectedtrialNum.value);
  const date1 = ref(setStartTime.value[index]);
  const date2 = ref(setEndTime.value[index]);

  // Date 객체로 변환
  const startDate = new Date(date1.value);
  const endDate = new Date(date2.value);

  // 시간 범위 설정
  dateRange.value = [startDate, endDate];
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
  { title: "최솟값", align: "end", key: "min", sortable: false },
  { title: "최댓값", align: "end", key: "max", sortable: false },
  { title: "평균값", align: "end", key: "average", sortable: false },
  { title: "중앙값", align: "end", key: "median", sortable: false },
  { title: "분산", align: "end", key: "variance", sortable: false },
  { title: "표준편차", align: "end", key: "rmse", sortable: false },
  { title: "표준오차", align: "end", key: "error", sortable: false },
  { title: "RMS", align: "end", key: "rms", sortable: false },
]);

const analysis = ref([
  {
    name: "signal",
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

// 데이트 피커
const date = ref();

const startDate = new Date();
const endDate = new Date();
onMounted(() => {
  date.value = [startDate, endDate];
});

const searchData = async () => {
  analysisData.value = [];
  analysisTime.value = [];
  if (
    selectedsubComponent.value !== null &&
    selectedItem.value !== null &&
    selectedtrialrun.value !== null
  ) {
    if (selectedsubComponent.value === "DGPS") {
      try {
        const gga = await axios.post(
          `http://192.168.0.73:8080/data2/dgps/gga/${selectedtrialNum.value}`
        );
        const vtg = await axios.post(
          `http://192.168.0.73:8080/data2/dgps/vtg/${selectedtrialNum.value}`
        );
        switch (selectedItem.value) {
          case "위도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < gga.data.length; i++) {
              analysisData.value.push(gga.data[i].latitude / 100);

              analysisTime.value.push(
                gga.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "latitude";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
          case "경도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < gga.data.length; i++) {
              analysisData.value.push(gga.data[i].longitude / 100);

              analysisTime.value.push(
                gga.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "longitude";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
          case "고도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < gga.data.length; i++) {
              analysisData.value.push(gga.data[i].altitude);

              analysisTime.value.push(
                gga.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "altitude";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
          case "SOG":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < vtg.data.length; i++) {
              analysisData.value.push(vtg.data[i].speedovergroundknots);

              analysisTime.value.push(
                vtg.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "speedovergroundknots";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
          case "COG":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < vtg.data.length; i++) {
              analysisData.value.push(vtg.data[i].courseovergrounddegreestrue);

              analysisTime.value.push(
                vtg.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "courseovergrounddegreestrue";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedsubComponent.value === "GYRO") {
      try {
        const hdt = await axios.post(
          `http://192.168.0.73:8080/data2/gyro/hdt/${selectedtrialNum.value}`
        );
        const rot = await axios.post(
          `http://192.168.0.73:8080/data2/gyro/rot/${selectedtrialNum.value}`
        );
        switch (selectedItem.value) {
          case "Heading":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < hdt.data.length; i++) {
              analysisData.value.push(hdt.data[i].heading);

              analysisTime.value.push(
                hdt.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "회전 속도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < rot.data.length; i++) {
              analysisData.value.push(rot.data[i].rateofturn);

              analysisTime.value.push(
                rot.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "rateofturn";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedsubComponent.value === "ANEMOMETER") {
      try {
        const mwv = await axios.post(
          `http://192.168.0.73:8080/data2/anemometer/mwv/${selectedtrialNum.value}`
        );
        switch (selectedItem.value) {
          case "풍향":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < mwv.data.length; i++) {
              analysisData.value.push(mwv.data[i].anemometerangle);

              analysisTime.value.push(
                mwv.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "anemometerangle";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "풍속":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < mwv.data.length; i++) {
              analysisData.value.push(mwv.data[i].anemometerspeed);

              analysisTime.value.push(
                mwv.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "anemometerspeed";
            analysis.value[0].name = "heading";
            analysis.value[0].name = "heading";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedsubComponent.value === "SPEEDLOG") {
      try {
        const vhw = await axios.post(
          `http://192.168.0.73:8080/data2/speedlog/vhw/${selectedtrialNum.value}`
        );
        switch (selectedItem.value) {
          case "선박 속도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < vhw.data.length; i++) {
              if (vhw.data[i].speedn <= 0) {
                analysisData.value.push("0");
              } else {
                analysisData.value.push(vhw.data[i].speedn);
              }

              analysisTime.value.push(
                vhw.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "speedn";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedsubComponent.value === "NO.1ENGINEPANEL") {
      try {
        const no1engine_panel_61444 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_61444/${selectedtrialNum.value}`
        );
        const no1engine_panel_65262 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65262/${selectedtrialNum.value}`
        );
        const no1engine_panel_65263 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65263/${selectedtrialNum.value}`
        );
        const no1engine_panel_65272 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65272/${selectedtrialNum.value}`
        );
        const no1engine_panel_65271 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65271/${selectedtrialNum.value}`
        );
        const no1engine_panel_65253 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65253/${selectedtrialNum.value}`
        );
        const no1engine_panel_65270 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65270/${selectedtrialNum.value}`
        );
        const no1engine_panel_65276 = await axios.post(
          `http://192.168.0.73:8080/data2/no1enginepanel/no1engine_panel_65276/${selectedtrialNum.value}`
        );
        switch (selectedItem.value) {
          case "엔진1 속도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_61444.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_61444.data[i].engine_SPEED
              );

              analysisTime.value.push(
                no1engine_panel_61444.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_SPEED";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 오일 온도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65262.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65262.data[i].engine_OIL_TEMPERATURE1
              );

              analysisTime.value.push(
                no1engine_panel_65262.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_OIL_TEMPERATURE1";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 오일 압력":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65263.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65263.data[i].engine_OIL_PRESSURE
              );

              analysisTime.value.push(
                no1engine_panel_65263.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_OIL_PRESSURE";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 냉각수 량":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65263.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65263.data[i].engine_COOLANT_LEVEL
              );

              analysisTime.value.push(
                no1engine_panel_65263.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_COOLANT_LEVEL";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 변속기 오일 압력":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65272.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65272.data[i].transmission_OIL_PRESSURE
              );

              analysisTime.value.push(
                no1engine_panel_65272.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "transmission_OIL_PRESSURE";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 충전 시스템 전압":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65271.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65271.data[i].charging_SYSTEM_POTENTIAL
              );

              analysisTime.value.push(
                no1engine_panel_65271.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "charging_SYSTEM_POTENTIAL";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 배터리 전압":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65271.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65271.data[i].battery_POTENTIAL
              );

              analysisTime.value.push(
                no1engine_panel_65271.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "battery_POTENTIAL";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 누적 가동시간":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65253.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65253.data[i].engine_TOTAL_HOURS
              );

              analysisTime.value.push(
                no1engine_panel_65253.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_TOTAL_HOURS";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 흡입 매니폴드 압력(대기)":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65270.data.length; i++) {
              analysisData.value.push(no1engine_panel_65270.data[i]);

              analysisTime.value.push(
                no1engine_panel_65270.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 흡입 매니폴드 온도(대기)":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65270.data.length; i++) {
              analysisData.value.push(no1engine_panel_65270.data[i]);

              analysisTime.value.push(
                no1engine_panel_65270.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 배기가스 온도(대기)":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65270.data.length; i++) {
              analysisData.value.push(no1engine_panel_65270.data[i]);

              analysisTime.value.push(
                no1engine_panel_65270.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진1 연료 량":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no1engine_panel_65276.data.length; i++) {
              analysisData.value.push(
                no1engine_panel_65276.data[i].fuel_LEVEL_1
              );

              analysisTime.value.push(
                no1engine_panel_65276.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "fuel_LEVEL_1";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedsubComponent.value === "NO.2ENGINEPANEL") {
      try {
        const no2engine_panel_61444 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_61444/${selectedtrialNum.value}`
        );
        const no2engine_panel_65262 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65262/${selectedtrialNum.value}`
        );
        const no2engine_panel_65263 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65263/${selectedtrialNum.value}`
        );
        const no2engine_panel_65272 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65272/${selectedtrialNum.value}`
        );
        const no2engine_panel_65271 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65271/${selectedtrialNum.value}`
        );
        const no2engine_panel_65253 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65253/${selectedtrialNum.value}`
        );
        const no2engine_panel_65270 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65270/${selectedtrialNum.value}`
        );
        const no2engine_panel_65276 = await axios.post(
          `http://192.168.0.73:8080/data2/no2enginepanel/no2engine_panel_65276/${selectedtrialNum.value}`
        );
        switch (selectedItem.value) {
          case "엔진2 속도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_61444.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_61444.data[i].engine_SPEED
              );

              analysisTime.value.push(
                no2engine_panel_61444.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_SPEED";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 오일 온도":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65262.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65262.data[i].engine_OIL_TEMPERATURE1
              );

              analysisTime.value.push(
                no2engine_panel_65262.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_OIL_TEMPERATURE1";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 오일 압력":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65263.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65263.data[i].engine_OIL_PRESSURE
              );

              analysisTime.value.push(
                no2engine_panel_65263.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_OIL_PRESSURE";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 냉각수 량":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65263.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65263.data[i].engine_COOLANT_LEVEL
              );

              analysisTime.value.push(
                no2engine_panel_65263.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_COOLANT_LEVEL";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 변속기 오일 압력":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65272.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65272.data[i].transmission_OIL_PRESSURE
              );

              analysisTime.value.push(
                no2engine_panel_65272.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "transmission_OIL_PRESSURE";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 충전 시스템 전압":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65271.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65271.data[i].charging_SYSTEM_POTENTIAL
              );

              analysisTime.value.push(
                no2engine_panel_65271.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "charging_SYSTEM_POTENTIAL";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 배터리 전압":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65271.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65271.data[i].battery_POTENTIAL
              );

              analysisTime.value.push(
                no2engine_panel_65271.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "battery_POTENTIAL";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 누적 가동시간":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65253.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65253.data[i].engine_TOTAL_HOURS
              );

              analysisTime.value.push(
                no2engine_panel_65253.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "engine_TOTAL_HOURS";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 흡입 매니폴드 압력(대기)":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65270.data.length; i++) {
              analysisData.value.push(no2engine_panel_65270.data[i]);

              analysisTime.value.push(
                no2engine_panel_65270.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 흡입 매니폴드 온도(대기)":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65270.data.length; i++) {
              analysisData.value.push(no2engine_panel_65270.data[i]);

              analysisTime.value.push(
                no2engine_panel_65270.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 배기가스 온도(대기)":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65270.data.length; i++) {
              analysisData.value.push(no2engine_panel_65270.data[i]);

              analysisTime.value.push(
                no2engine_panel_65270.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
          case "엔진2 연료 량":
            analysisData.value = [];
            analysisTime.value = [];
            for (let i = 0; i < no2engine_panel_65276.data.length; i++) {
              analysisData.value.push(
                no2engine_panel_65276.data[i].fuel_LEVEL_1
              );

              analysisTime.value.push(
                no2engine_panel_65276.data[i].timestamp_DATACONF.slice(11, 19)
              );
            }
            analysis.value[0].name = "fuel_LEVEL_1";
            console.log(analysisData.value);
            console.log(analysisTime.value);
            console.log(selectedtrialNum.value);
            break;
        }
      } catch (error) {
        console.error(error);
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
    };

    // analysisData.value = [];
    // analysisData.value = [
    //   "1",
    //   "2",
    //   "3",
    //   "4",
    //   "5",
    //   "4",
    //   "3",
    //   "2",
    //   "1",
    //   "1",
    //   "1",
    // ];

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
      averageValue.value = 0;
      standardDeviation.value = 0;
      rms.value = 0;
      median.value = 0;
      standardError.value = 0;
    }

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
  } else {
    alert("null man~");
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
</style>
