<template>
  <!-- 전체화면 패딩100px -->
  <div style="height: 93vh">
    <div class="my-app">
      <!-- 데이터 선택창 -->
      <v-sheet style="display: flex">
        <v-row>
          <!-- 첫번째 선택박스 -->
          <v-col cols="3">
            <v-select
              v-model="firstSelectedItems"
              :items="firstSelect"
              label="Sub Components"
              variant="outlined"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <div v-if="index < 2">
                  <span>{{ item.title }}</span>
                  <!-- 선택된 항목이 2개 이상이고 현재 항목이 마지막 항목이 아니면 ','를 추가 -->
                  <span
                    v-if="
                      firstSelectedItems.length > 1 &&
                      index !== firstSelectedItems.length - 1
                    "
                    >,
                  </span>
                  <span v-else-if="firstSelectedItems.length >= 3"> </span>
                </div>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ firstSelectedItems.length - 2 }} others)
                </span>
              </template>
              <template v-slot:prepend-item>
                <v-list-item title="Select All" @click="selectAllItem1">
                  <template v-slot:prepend>
                    <v-checkbox-btn
                      :color="likesSomeData1 ? 'indigo-darken-4' : undefined"
                      :indeterminate="likesSomeData1 && !likesAllData1"
                      :model-value="likesSomeData1"
                    ></v-checkbox-btn>
                  </template>
                </v-list-item>

                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>
          </v-col>

          <!-- 두번째 선택박스 -->
          <v-col cols="3">
            <v-select
              v-model="contentsSelectedItems"
              :items="secondSelect"
              label="Contents"
              variant="outlined"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <div v-if="index < 2">
                  <span>{{ item.title }}</span>
                  <!-- 선택된 항목이 2개 이상이고 현재 항목이 마지막 항목이 아니면 ','를 추가 -->
                  <span
                    v-if="
                      contentsSelectedItems.length > 1 &&
                      index !== contentsSelectedItems.length - 1
                    "
                    >,
                  </span>
                  <span v-else-if="contentsSelectedItems.length >= 3"> </span>
                </div>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ contentsSelectedItems.length - 2 }} others)
                </span>
              </template>
              <template v-slot:prepend-item>
                <v-list-item title="Select All" @click="selectAllItem2">
                  <template v-slot:prepend>
                    <v-checkbox-btn
                      :color="likesSomeData2 ? 'indigo-darken-4' : undefined"
                      :indeterminate="likesSomeData2 && !likesAllData2"
                      :model-value="likesSomeData2"
                    ></v-checkbox-btn>
                  </template>
                </v-list-item>

                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>
          </v-col>

          <v-col cols="2">
            <v-select
              v-model="selectedvoyage"
              :items="voyage"
              label="voyage"
              variant="outlined"
            >
            </v-select>
          </v-col>

          <!-- 날짜 설정 -->
          <v-col cols="3">
            <VueDatePicker
              style="--dp-input-padding: 15px"
              v-model="dateRange"
              range
              :readonly="date_readonly"
            />
          </v-col>

          <!-- 검색 버튼 -->
          <v-col cols="1">
            <v-btn
              class=""
              color="blue"
              style="display: flex; margin-top: 2px; height: 50px; width: 130px"
              @click="searchData()"
              >검색</v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div></div>
        <div style="font-size: 12px; font-weight: bold">
          * 날짜 검색은 한국 표준시를 기준으로 작성하며, 데이터는 UTC 기준으로
          보여짐&nbsp;&nbsp;
        </div>
      </v-sheet>

      <!-- 탭 기능 구현 -->
      <v-tabs
        v-if="searchstart"
        style="
          color: #a8a8a8;
          height: 5vh;
          margin-left: 15px;
          margin-right: 15px;
        "
        v-model="tab"
        color="grey-darken-4"
        align-tabs="start"
      >
        <!-- for문 사용해서 탭 늘리기 -->
        <v-tab
          :style="{ 'background-color': tab === index ? '#d9d9d9' : '#f7f7f7' }"
          :value="index"
          v-for="(item, index) in selectedData"
          :key="index"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <!-- 데이터 테이블 -->
      <v-window
        class="scrollable-card"
        v-model="tab"
        style="
          overflow-y: auto;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          height: 69vh;
        "
      >
        <v-window-item
          v-for="(item, index) in selectedData"
          :key="index"
          :value="index"
        >
          <v-card>
            <v-card-item>
              <v-sheet
                v-if="loading"
                :elevation="elevation"
                style="
                  height: 67vh;
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
                <p style="margin-top: 10px; font-weight: 400; font-size: 18px">
                  loading ({{ loadingpercent }}%)
                </p>
              </v-sheet>
              <v-data-table
                v-if="!loading"
                v-model="selectedData"
                :items-per-page="itemsPerPage"
                :density="'dense'"
                :headers="headerName"
                :items="dataSet"
                return-object
                style="padding-top: 5px"
              >
                <template v-slot:no-data>
                  <v-sheet
                    height="60vh"
                    class="pa-1 d-flex justify-center align-center"
                  >
                    <div style="text-align: center">
                      <p style="font-weight: 500; font-size: 20px">
                        {{ message }}
                      </p>
                    </div>
                  </v-sheet>
                </template>
                <template v-slot:bottom>
                  <div class="text-center pt-2 mb-5">
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                      :total-visible="8"
                    >
                    </v-pagination>
                  </div>
                </template>
              </v-data-table>
            </v-card-item>
          </v-card>
        </v-window-item>
      </v-window>
      <!-- 데이터 다운로드 -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-select
          v-model="selectDownlodFormat"
          :items="downloadFormat"
          density="compact"
          label="format"
          style="max-width: 150px; margin-top: 20px"
          variant="solo"
        ></v-select>
        <!-- <select v-model="selectDownlodFormat">
          <option value="xlsx">Excel (xlsx)</option>
          <option value="txt">Text (txt)</option>
          <option value="csv">CSV (csv)</option>
        </select> -->
        <v-btn
          :loading="downloadBtnLoading"
          color="white"
          style="background-color: #009dff; margin-top: 0px; margin-left: 20px"
          @click="dataDownload()"
          :disabled="downloadBtnDisabled"
          >데이터 다운로드</v-btn
        >
      </v-card-actions>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, watch } from "vue";
import axios from "axios";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { readTrialData, readDataTrial, readDataDate } from "../api/index.js";
import JSZip from "jszip";

const tab = ref(0);
// const initializeData = () => {
//   // contentsSelectedItems에 따라 데이터 초기화
//   fetchData();
// };
const tokenid = ref(sessionStorage.getItem("token") || "");
const itemsPerPage = ref(20);
const page = ref(1);
const headerName = ref([]); // 빈 배열로 초기화
const dataSet = ref([]); // 빈 배열로 초기화
const backDataSet = ref([]); // 빈 배열로 초기화
const selectedData = ref([]); //
const message = ref("데이터가 존재하지 않습니다.");
const searchstart = ref(false);
const loading = ref(false);
const loadingpercent = ref(0);
const beforePage = ref("GLL");
const downloadBtnDisabled = ref(true);
const downloadBtnLoading = ref(false);

watch(selectedData, (newVal, oldVal) => {
  tab.value = 0;
});

const pageCount = ref(0);

// 셀렉바 메뉴
const firstSelect = ref([
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
  "NO.1ENGINEPANEL",
  "NO.2ENGINEPANEL",
]);
const secondSelect = ref([]);
const firstSelectedItems = ref([]);
const contentsSelectedItems = ref([]);

//전체 선택
const likesAllData1 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData1 = computed(() => firstSelectedItems.value.length > 0);

const likesAllData2 = computed(
  () => contentsSelectedItems.value.length === secondSelect.value.length
);
const likesSomeData2 = computed(() => contentsSelectedItems.value.length > 0);

// 전체 선택
const selectAllItem1 = () => {
  if (likesAllData1.value) {
    console.log(`선택 : ${firstSelectedItems.value[0]}`);
    firstSelectedItems.value = [];
  } else {
    firstSelectedItems.value = [...firstSelect.value];
  }
};

const selectAllItem2 = () => {
  if (likesAllData2.value) {
    console.log(`선택 : ${contentsSelectedItems.value[0]}`);
    contentsSelectedItems.value = [];
  } else {
    contentsSelectedItems.value = [...secondSelect.value];
  }
};

// select1이 변경될 때 second 배열 업데이트
watchEffect(() => {
  secondSelect.value = []; // 기존 secondSelect 초기화
  contentsSelectedItems.value = [];
  if (firstSelectedItems.value.includes("DGPS")) {
    secondSelect.value.push("GLL", "GGA", "RMC", "VTG", "ZDA", "GSV", "GSA");
  }
  if (firstSelectedItems.value.includes("GYRO")) {
    secondSelect.value.push("HDT", "ROT");
  }
  if (firstSelectedItems.value.includes("ANEMOMETER")) {
    secondSelect.value.push("MWV");
  }
  if (firstSelectedItems.value.includes("RADAR")) {
    secondSelect.value.push("RADAR_SCREEN");
  }
  if (firstSelectedItems.value.includes("AIS")) {
    secondSelect.value.push("VDM", "VDO");
  }
  if (firstSelectedItems.value.includes("ECDIS")) {
    secondSelect.value.push("ROUTEINFO", "WAYPOINTS", "RTZ", "ECDIS_SCREEN");
  }
  if (firstSelectedItems.value.includes("AUTOPILOT")) {
    secondSelect.value.push("RSA", "HTD");
  }
  if (firstSelectedItems.value.includes("SPEEDLOG")) {
    secondSelect.value.push("VBW", "VHW", "VLW");
  }
  if (firstSelectedItems.value.includes("CanThrottle")) {
    secondSelect.value.push(
      "CAN_Online_State",
      "Engine_RPM",
      "Rudder",
      "Rudder_Scale"
    );
  }
  if (firstSelectedItems.value.includes("AUTOPILOTCONTACT")) {
    secondSelect.value.push("AUTOPILOTCONTACT");
  }
  if (firstSelectedItems.value.includes("NO.1ENGINEPANEL")) {
    secondSelect.value.push(
      "NO.1ENGINE_PANEL_61444",
      "NO.1ENGINE_PANEL_65262",
      "NO.1ENGINE_PANEL_65263",
      "NO.1ENGINE_PANEL_65272",
      "NO.1ENGINE_PANEL_65271",
      "NO.1ENGINE_PANEL_65253",
      "NO.1ENGINE_PANEL_65270",
      "NO.1ENGINE_PANEL_65276",
      "NO.1ENGINE_PANEL_65360",
      "NO.1ENGINE_PANEL_65361_LAMP",
      "NO.1ENGINE_PANEL_65361_STATUS",
      "NO.1ENGINE_PANEL_65378",
      "NO.1ENGINE_PANEL_65376",
      "NO.1ENGINE_PANEL_65379"
    );
  }
  if (firstSelectedItems.value.includes("NO.2ENGINEPANEL")) {
    secondSelect.value.push(
      "NO.2ENGINE_PANEL_61444",
      "NO.2ENGINE_PANEL_65262",
      "NO.2ENGINE_PANEL_65263",
      "NO.2ENGINE_PANEL_65272",
      "NO.2ENGINE_PANEL_65271",
      "NO.2ENGINE_PANEL_65253",
      "NO.2ENGINE_PANEL_65270",
      "NO.2ENGINE_PANEL_65276",
      "NO.2ENGINE_PANEL_65360",
      "NO.2ENGINE_PANEL_65361_LAMP",
      "NO.2ENGINE_PANEL_65361_STATUS",
      "NO.2ENGINE_PANEL_65378",
      "NO.2ENGINE_PANEL_65376",
      "NO.2ENGINE_PANEL_65379"
    );
  }
});

// 항차 선택
const voyage = ref(["직접 선택"]);

// 데이트 피커
const setStartTime = ref([]);
const setEndTime = ref([]);
const selectedtrialNum = ref();

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      setStartTime.value.push(`${response[i].startTimeUtc}`);
      setEndTime.value.push(`${response[i].endTimeUtc}`);
      voyage.value.push(`항차 ${i + 1}번`);
    }
  } catch (error) {
    console.error(error);
  }
  console.log(setStartTime.value);
};
onMounted(getTrialDate);
const selectedvoyage = ref();

// 시운전 시간 받아오기
const date_readonly = ref(true);
const dateRange = ref([new Date(), new Date()]); // 반응적인(ref) 배열로 초기화

const startDate = ref(); // 현재 날짜와 시간을 기본값으로 사용
const endDate = ref(); // 현재 날짜와 시간을 기본값으로 사용

const voyagesearch = ref(false);

const daterange = ref([startDate.value, endDate.value]);

const searchStart = ref();
const searchEnd = ref();

watchEffect(() => {
  console.log(daterange.value);
  const index = voyage.value.indexOf(selectedvoyage.value);
  selectedtrialNum.value = index;
  if (selectedvoyage.value === "직접 선택") {
    date_readonly.value = false;
    voyagesearch.value = false;
    console.log(dateRange.value);

    let start, end;
    console.log(dateRange.value[0], dateRange.value[1]);
    if (
      !isNaN(Date.parse(dateRange.value[0])) &&
      !isNaN(Date.parse(dateRange.value[1]))
    ) {
      start = dateRange.value[0].toISOString();
      end = dateRange.value[1].toISOString();

      console.log(start);
      console.log(end);
    } else {
      // 예외처리: dateRange.value[0] 또는 dateRange.value[1]이 Invalid Date인 경우
      console.error("Invalid date values in dateRange");
      // 여기에서 적절한 대체 값이나 오류 처리를 추가할 수 있습니다.
    }
    searchStart.value = start;
    searchEnd.value = end;
  } else {
    const index = voyage.value.indexOf(selectedvoyage.value);
    console.log(index);
    date_readonly.value = true;
    voyagesearch.value = true;

    const date1 = ref(setStartTime.value[index - 1]);
    const date2 = ref(setEndTime.value[index - 1]);

    // Date 객체로 변환
    startDate.value = new Date(date1.value);
    endDate.value = new Date(date2.value);

    // 시간 범위 설정
    dateRange.value = [startDate.value, endDate.value];

    startDate.value.setHours(startDate.value.getHours());
    endDate.value.setHours(endDate.value.getHours());
  }
});
let dataValues1 = [];

const downloadFormat = ref(["xlsx", "csv", "txt"]);
const selectDownlodFormat = ref("xlsx");
// 데이터 다운로드
const dataDownload = async () => {
  if (!selectedData.value || selectedData.value.length === 0) {
    alert("선택안됌");
  } else {
    try {
      const zip = new JSZip();
      const dataValues = Object.values(selectedData.value);

      if (selectDownlodFormat.value === "xlsx") {
        // xlsx 선택 시
        const workbook = XLSX.utils.book_new();
        for (let i = 0; i < downloadData.length; i++) {
          const worksheet = XLSX.utils.json_to_sheet(downloadData[i].value);
          XLSX.utils.book_append_sheet(workbook, worksheet, dataValues1[i]);
        }
        XLSX.writeFile(workbook, `${daterange.value}_xlsx.xlsx`);
      } else {
        for (let i = 0; i < downloadData.length; i++) {
          let content, fileName;

          if (selectDownlodFormat.value === "csv") {
            // csv 선택 시
            content = Papa.unparse(downloadData[i].value);
            fileName = `${dataValues[i]}_csv.csv`;
          } else if (selectDownlodFormat.value === "txt") {
            // txt 선택 시
            content = JSON.stringify(downloadData[i].value, null, 2);
            fileName = `${dataValues[i]}_txt.txt`;
          }

          // xlsx가 아닌 경우 파일을 zip에 추가
          if (selectDownlodFormat.value !== "xlsx") {
            zip.file(fileName, content);
          }
        }
        // zip 파일 다운로드
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${daterange.value}_${selectDownlodFormat.value}.zip`);
      }
    } catch (error) {
      alert(
        `다운로드 할 데이터가 존재하지 않습니다. 선택한 형식: ${selectDownlodFormat.value}`
      );
      console.error(error);
    }
  }
};

// 검색 이벤트
const searchData = () => {
  loading.value = true;
  headerVariables.forEach((variable) => (variable.value = []));
  dataVariables.forEach((variable) => (variable.value = []));
  downloadData = [];
  dataValues1 = [];
  selectedData.value = contentsSelectedItems.value;
  let variableName = getVariableName(selectedData.value).value;

  let start = new Date(dateRange.value[0]);
  let end = new Date(dateRange.value[1]);
  start.setHours(start.getHours() + 9);
  end.setHours(end.getHours() + 9);
  startDate.value = start.toISOString();
  endDate.value = end.toISOString();
  tab.value = 0;
  fetchData(variableName); // 초기 데이터 요청

  if (!isNaN(start) && !isNaN(end)) {
    // 유효한 날짜인 경우에만 ISO 문자열로 변환
    console.log("start.toISOString():", start.toISOString().slice(0, 19));
    console.log("end.toISOString():", end.toISOString().slice(0, 19));
    if (selectedvoyage.value === "직접 선택") {
      daterange.value = `${start.toISOString().slice(0, 19)}~${end
        .toISOString()
        .slice(0, 19)} 데이터`;
      console.log(daterange.value);
    } else {
      daterange.value = `${start.toISOString().slice(0, 19)}~${end
        .toISOString()
        .slice(0, 19)}, ${selectedtrialNum.value}항차 데이터`;
      console.log(daterange.value);
    }
  } else {
    console.error("Invalid date values in dateRange.value");
  }
  searchstart.value = true;
};

const getVariableName = (item) => {
  const nameMappings = {
    GLL: "dgps/gll",
    GGA: "dgps/gga",
    RMC: "dgps/rmc",
    VTG: "dgps/vtg",
    ZDA: "dgps/zda",
    GSV: "dgps/gsv",
    GSA: "dgps/gsa",

    HDT: "gyro/hdt",
    ROT: "gyro/rot",

    MWV: "anemometer/mwv",
    RADAR_SCREEN: "radar/radarscreen",

    VDM: "ais/vdm",
    VDO: "ais/vdo",

    ROUTEINFO: "ecdis/routeinfo",
    WAYPOINTS: "ecdis/waypoints",
    RTZ: "ecdis/rtz",
    ECDIS_SCREEN: "ecdis/ecdisscreen",

    RSA: "autopilot/rsa",
    HTD: "autopilot/htd",

    VBW: "speedlog/vbw",
    VHW: "speedlog/vhw",
    VLW: "speedlog/vlw",

    CAN_Online_State: "canthrottle/canonlinestate",
    Engine_RPM: "canthrottle/enginerpm",
    Rudder: "canthrottle/rudder",
    Rudder_Scale: "canthrottle/rudderscale",

    AUTOPILOTCONTACT: "autopilotcontact/autopilotcontact",

    "NO.1ENGINE_PANEL_61444": "no1enginepanel/no1engine_panel_61444",
    "NO.1ENGINE_PANEL_65262": "no1enginepanel/no1engine_panel_65262",
    "NO.1ENGINE_PANEL_65263": "no1enginepanel/no1engine_panel_65263",
    "NO.1ENGINE_PANEL_65272": "no1enginepanel/no1engine_panel_65272",
    "NO.1ENGINE_PANEL_65271": "no1enginepanel/no1engine_panel_65271",
    "NO.1ENGINE_PANEL_65253": "no1enginepanel/no1engine_panel_65253",
    "NO.1ENGINE_PANEL_65270": "no1enginepanel/no1engine_panel_65270",
    "NO.1ENGINE_PANEL_65276": "no1enginepanel/no1engine_panel_65276",
    "NO.1ENGINE_PANEL_65360": "no1enginepanel/no1engine_panel_65360",
    "NO.1ENGINE_PANEL_65361_LAMP": "no1enginepanel/no1engine_panel_65361_lamp",
    "NO.1ENGINE_PANEL_65361_STATUS":
      "no1enginepanel/no1engine_panel_65361_status",

    "NO.1ENGINE_PANEL_65378": "no1enginepanel/no1engine_panel_65378",
    "NO.1ENGINE_PANEL_65376": "no1enginepanel/no1engine_panel_65376",
    "NO.1ENGINE_PANEL_65379": "no1enginepanel/no1engine_panel_65379",
    "NO.2ENGINE_PANEL_61444": "no2enginepanel/no2engine_panel_61444",
    "NO.2ENGINE_PANEL_65262": "no2enginepanel/no2engine_panel_65262",
    "NO.2ENGINE_PANEL_65263": "no2enginepanel/no2engine_panel_65263",
    "NO.2ENGINE_PANEL_65272": "no2enginepanel/no2engine_panel_65272",
    "NO.2ENGINE_PANEL_65271": "no2enginepanel/no2engine_panel_65271",
    "NO.2ENGINE_PANEL_65253": "no2enginepanel/no2engine_panel_65253",
    "NO.2ENGINE_PANEL_65270": "no2enginepanel/no2engine_panel_65270",
    "NO.2ENGINE_PANEL_65276": "no2enginepanel/no2engine_panel_65276",
    "NO.2ENGINE_PANEL_65360": "no2enginepanel/no2engine_panel_65360",
    "NO.2ENGINE_PANEL_65361_LAMP": "no2enginepanel/no2engine_panel_65361_lamp",
    "NO.2ENGINE_PANEL_65361_STATUS":
      "no2enginepanel/no2engine_panel_65361_status",

    "NO.2ENGINE_PANEL_65378": "no2enginepanel/no2engine_panel_65378",
    "NO.2ENGINE_PANEL_65376": "no2enginepanel/no2engine_panel_65376",
    "NO.2ENGINE_PANEL_65379": "no2enginepanel/no2engine_panel_65379",
    // 다른 headerName에 대한 매핑 추가
  };

  if (Array.isArray(item)) {
    // 만약 item이 배열이면 각 요소에 대해 매핑된 값을 가져와 새로운 배열 생성
    return ref(item.map((element) => nameMappings[element]));
  } else {
    // item이 배열이 아니면 단일 값에 대한 매핑 찾아 반환
    return ref(nameMappings[item]);
  }
};

const fetchData = async (data) => {
  downloadBtnDisabled.value = true;
  loadingpercent.value = 0.0;
  console.log(data, "여깁니다요");
  if (voyagesearch.value) {
    for (let i = 0; i < data.length; i++) {
      try {
        const response = await readDataTrial(
          tokenid.value,
          data[i],
          selectedtrialNum.value
        );
        dataSet.value = response;
        if (response && response.length > 0) {
          const dataheader = ref(
            Object.keys(response[0]).reduce((acc, key) => {
              if (key.toLowerCase() !== "id") {
                let modifiedKey = key;
                if (key === "timestamp_PUBLISH") {
                  modifiedKey = "timestamp_PUBLISH(UTC+9)";
                } else if (key === "timestamp_EQUIPMENT") {
                  modifiedKey = "timestamp_EQUIPMENT(UTC+9)";
                }

                acc.push({ title: modifiedKey, align: "start", key });
              }
              return acc;
            }, [])
          );

          if (dataheader.value == null) {
            console.log("null");
          } else {
            updateTable();
            switchValue(data[i], dataheader, response);
          }
        } else {
          updateTable();
          console.log("Response data is empty or undefined");
        }
        loadingpercent.value = ((i + 1) / 1) * 100;
        if (data.length === 1) {
          loading.value = false;
        } else {
          if (i === 1) {
            loading.value = false;
          } else if (i == data.length - 1) {
            downloadBtnDisabled.value = false;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      const upperData = ref(data[i].toUpperCase());
      const subComponunt = ref();
      const content = ref();
      console.log(startDate.value);
      [subComponunt.value, content.value] = upperData.value.split("/");
      // alert(`${startDate.value}`, `${endDate.value}`);
      console.log(searchStart.value);
      console.log(searchEnd.value);
      try {
        const response = await readDataDate(
          tokenid.value,
          subComponunt.value,
          content.value,
          searchStart.value,
          searchEnd.value
        );
        dataSet.value = response;
        if (response && response.length > 0) {
          const dataheader = ref(
            Object.keys(response[0]).reduce((acc, key) => {
              if (key.toLowerCase() !== "id") {
                let modifiedKey = key;
                if (key === "timestamp_PUBLISH") {
                  modifiedKey = "timestamp_PUBLISH(UTC+9)";
                } else if (key === "timestamp_EQUIPMENT") {
                  modifiedKey = "timestamp_EQUIPMENT(UTC+9)";
                }
                acc.push({ title: modifiedKey, align: "start", key });
              }
              return acc;
            }, [])
          );
          updateTable();
          switchValue(data[i], dataheader, response);
        } else {
          updateTable();
          console.log("Response data is empty or undefined");
        }
        loadingpercent.value = ((i / (data.length - 1)) * 100).toFixed(1);
        if (data.length === 1) {
          loading.value = false;
        } else {
          if (i === 1) {
            loading.value = false;
          } else if (i == data.length - 1) {
            downloadBtnDisabled.value = false;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const updateData = async (data, header, page) => {
  // 미리 보여질 일부 데이터를 설정
  const initialData = data.slice(0 + (page - 1) * 21, 21 + (page - 1) * 21);
  headerName.value = header;
  dataSet.value = initialData;
};

const updateTable = async () => {
  const selectedTab = selectedData.value[tab.value];
  // page.value = 1;
  itemsPerPage.value = 21;
  if (beforePage.value != selectedTab) {
    page.value = 1;
    beforePage.value = selectedTab;
  }
  switch (selectedTab) {
    case "GLL":
      backDataSet.value = GLL.value;
      pageCount.value = Math.ceil(GLL.value.length / itemsPerPage.value);
      updateData(GLL.value, GLLheader.value, page.value);
      break;
    case "GGA":
      backDataSet.value = GGA.value;
      pageCount.value = Math.ceil(GGA.value.length / itemsPerPage.value);
      updateData(GGA.value, GGAheader.value, page.value);
      break;
    case "RMC":
      backDataSet.value = RMC.value;
      pageCount.value = Math.ceil(RMC.value.length / itemsPerPage.value);
      updateData(RMC.value, RMCheader.value, page.value);
      break;
    case "VTG":
      backDataSet.value = VTG.value;
      pageCount.value = Math.ceil(VTG.value.length / itemsPerPage.value);
      updateData(VTG.value, VTGheader.value, page.value);
      break;
    case "ZDA":
      backDataSet.value = ZDA.value;
      pageCount.value = Math.ceil(ZDA.value.length / itemsPerPage.value);
      updateData(ZDA.value, ZDAheader.value, page.value);
      break;
    case "GSV":
      backDataSet.value = GSV.value;
      pageCount.value = Math.ceil(GSV.value.length / itemsPerPage.value);
      updateData(GSV.value, GSVheader.value, page.value);
      break;
    case "GSA":
      backDataSet.value = GSA.value;
      pageCount.value = Math.ceil(GSA.value.length / itemsPerPage.value);
      updateData(GSA.value, GSAheader.value, page.value);
      break;
    case "HDT":
      backDataSet.value = HDT.value;
      pageCount.value = Math.ceil(HDT.value.length / itemsPerPage.value);
      updateData(HDT.value, HDTheader.value, page.value);
      break;
    case "ROT":
      backDataSet.value = ROT.value;
      pageCount.value = Math.ceil(ROT.value.length / itemsPerPage.value);
      updateData(ROT.value, ROTheader.value, page.value);
      break;
    case "MWV":
      backDataSet.value = MWV.value;
      pageCount.value = Math.ceil(MWV.value.length / itemsPerPage.value);
      updateData(MWV.value, MWVheader.value, page.value);
      break;
    case "RADAR_SCREEN":
      backDataSet.value = RADAR_SCREEN.value;
      pageCount.value = Math.ceil(
        RADAR_SCREEN.value.length / itemsPerPage.value
      );
      updateData(RADAR_SCREEN.value, RADAR_SCREENheader.value, page.value);
      break;
    case "VDM":
      backDataSet.value = VDM.value;
      pageCount.value = Math.ceil(VDM.value.length / itemsPerPage.value);
      updateData(VDM.value, VDMheader.value, page.value);
      break;
    case "VDO":
      backDataSet.value = VDO.value;
      pageCount.value = Math.ceil(VDO.value.length / itemsPerPage.value);
      updateData(VDO.value, VDOheader.value, page.value);
      break;
    case "ROUTEINFO":
      backDataSet.value = ROUTEINFO.value;
      pageCount.value = Math.ceil(ROUTEINFO.value.length / itemsPerPage.value);
      updateData(ROUTEINFO.value, ROUTEINFOheader.value, page.value);
      break;
    case "WAYPOINTS":
      backDataSet.value = WAYPOINTS.value;
      pageCount.value = Math.ceil(WAYPOINTS.value.length / itemsPerPage.value);
      updateData(WAYPOINTS.value, WAYPOINTSheader.value, page.value);
      break;
    case "RTZ":
      backDataSet.value = RTZ.value;
      pageCount.value = Math.ceil(RTZ.value.length / itemsPerPage.value);
      updateData(RTZ.value, RTZheader.value, page.value);
      break;
    case "ECDIS_SCREEN":
      backDataSet.value = ECDIS_SCREEN.value;
      pageCount.value = Math.ceil(
        ECDIS_SCREEN.value.length / itemsPerPage.value
      );
      updateData(ECDIS_SCREEN.value, ECDIS_SCREENheader.value, page.value);
      break;
    case "RSA":
      backDataSet.value = RSA.value;
      pageCount.value = Math.ceil(RSA.value.length / itemsPerPage.value);
      updateData(RSA.value, RSAheader.value, page.value);
      break;
    case "HTD":
      backDataSet.value = HTD.value;
      pageCount.value = Math.ceil(HTD.value.length / itemsPerPage.value);
      updateData(HTD.value, HTDheader.value, page.value);
      break;
    case "VBW":
      backDataSet.value = VBW.value;
      pageCount.value = Math.ceil(VBW.value.length / itemsPerPage.value);
      updateData(VBW.value, VBWheader.value, page.value);
      break;
    case "VHW":
      backDataSet.value = VHW.value;
      pageCount.value = Math.ceil(VHW.value.length / itemsPerPage.value);
      updateData(VHW.value, VHWheader.value, page.value);
      break;
    case "VLW":
      backDataSet.value = VLW.value;
      pageCount.value = Math.ceil(VLW.value.length / itemsPerPage.value);
      updateData(VLW.value, VLWheader.value, page.value);
      break;
    case "CAN_Online_State":
      backDataSet.value = CAN_Online_State.value;
      pageCount.value = Math.ceil(
        CAN_Online_State.value.length / itemsPerPage.value
      );
      updateData(
        CAN_Online_State.value,
        CAN_Online_Stateheader.value,
        page.value
      );
      break;
    case "Engine_RPM":
      backDataSet.value = Engine_RPM.value;
      pageCount.value = Math.ceil(Engine_RPM.value.length / itemsPerPage.value);
      updateData(Engine_RPM.value, Engine_RPMheader.value, page.value);
      break;
    case "Rudder":
      backDataSet.value = Rudder.value;
      pageCount.value = Math.ceil(Rudder.value.length / itemsPerPage.value);
      updateData(Rudder.value, Rudderheader.value, page.value);
      break;
    case "Rudder_Scale":
      backDataSet.value = Rudder_Scale.value;
      pageCount.value = Math.ceil(
        Rudder_Scale.value.length / itemsPerPage.value
      );
      updateData(Rudder_Scale.value, Rudder_Scaleheader.value, page.value);
      break;
    case "AUTOPILOTCONTACT":
      backDataSet.value = AUTOPILOTCONTACT.value;
      pageCount.value = Math.ceil(
        AUTOPILOTCONTACT.value.length / itemsPerPage.value
      );
      updateData(
        AUTOPILOTCONTACT.value,
        AUTOPILOTCONTACTheader.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_61444":
      backDataSet.value = NO1ENGINE_PANEL_61444.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_61444.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_61444.value,
        NO1ENGINE_PANEL_61444header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65262":
      backDataSet.value = NO1ENGINE_PANEL_65262.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65262.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65262.value,
        NO1ENGINE_PANEL_65262header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65263":
      backDataSet.value = NO1ENGINE_PANEL_65263.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65263.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65263.value,
        NO1ENGINE_PANEL_65263header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65272":
      backDataSet.value = NO1ENGINE_PANEL_65272.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65272.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65272.value,
        NO1ENGINE_PANEL_65272header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65271":
      backDataSet.value = NO1ENGINE_PANEL_65271.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65271.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65271.value,
        NO1ENGINE_PANEL_65271header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65253":
      backDataSet.value = NO1ENGINE_PANEL_65253.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65253.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65253.value,
        NO1ENGINE_PANEL_65253header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65270":
      backDataSet.value = NO1ENGINE_PANEL_65270.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65270.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65270.value,
        NO1ENGINE_PANEL_65270header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65276":
      backDataSet.value = NO1ENGINE_PANEL_65276.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65276.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65276.value,
        NO1ENGINE_PANEL_65276header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65360":
      backDataSet.value = NO1ENGINE_PANEL_65360.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65360.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65360.value,
        NO1ENGINE_PANEL_65360header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65361_LAMP":
      backDataSet.value = NO1ENGINE_PANEL_65361_LAMP.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65361_LAMP.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65361_LAMP.value,
        NO1ENGINE_PANEL_65361_LAMPheader.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65361_STATUS":
      backDataSet.value = NO1ENGINE_PANEL_65361_STATUS.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65361_STATUS.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65361_STATUS.value,
        NO1ENGINE_PANEL_65361_STATUSheader.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65378":
      backDataSet.value = NO1ENGINE_PANEL_65378.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65378.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65378.value,
        NO1ENGINE_PANEL_65378header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65376":
      backDataSet.value = NO1ENGINE_PANEL_65376.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65376.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65376.value,
        NO1ENGINE_PANEL_65376header.value,
        page.value
      );
      break;
    case "NO.1ENGINE_PANEL_65379":
      backDataSet.value = NO1ENGINE_PANEL_65379.value;
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65379.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65379.value,
        NO1ENGINE_PANEL_65379header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_61444":
      backDataSet.value = NO2ENGINE_PANEL_61444.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_61444.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_61444.value,
        NO2ENGINE_PANEL_61444header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65262":
      backDataSet.value = NO2ENGINE_PANEL_65262.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65262.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65262.value,
        NO2ENGINE_PANEL_65262header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65263":
      backDataSet.value = NO2ENGINE_PANEL_65263.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65263.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65263.value,
        NO2ENGINE_PANEL_65263header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65272":
      backDataSet.value = NO2ENGINE_PANEL_65272.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65272.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65272.value,
        NO2ENGINE_PANEL_65272header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65271":
      backDataSet.value = NO2ENGINE_PANEL_65271.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65271.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65271.value,
        NO2ENGINE_PANEL_65271header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65253":
      backDataSet.value = NO2ENGINE_PANEL_65253.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65253.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65253.value,
        NO2ENGINE_PANEL_65253header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65270":
      backDataSet.value = NO2ENGINE_PANEL_65270.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65270.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65270.value,
        NO2ENGINE_PANEL_65270header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65276":
      backDataSet.value = NO2ENGINE_PANEL_65276.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65276.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65276.value,
        NO2ENGINE_PANEL_65276header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65360":
      backDataSet.value = NO2ENGINE_PANEL_65360.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65360.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65360.value,
        NO2ENGINE_PANEL_65360header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65361_LAMP":
      backDataSet.value = NO2ENGINE_PANEL_65361_LAMP.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65361_LAMP.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65361_LAMP.value,
        NO2ENGINE_PANEL_65361_LAMPheader.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65361_STATUS":
      backDataSet.value = NO2ENGINE_PANEL_65361_STATUS.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65361_STATUS.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65361_STATUS.value,
        NO2ENGINE_PANEL_65361_STATUSheader.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65378":
      backDataSet.value = NO2ENGINE_PANEL_65378.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65378.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65378.value,
        NO2ENGINE_PANEL_65378header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65376":
      backDataSet.value = NO2ENGINE_PANEL_65376.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65376.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65376.value,
        NO2ENGINE_PANEL_65376header.value,
        page.value
      );
      break;
    case "NO.2ENGINE_PANEL_65379":
      backDataSet.value = NO2ENGINE_PANEL_65379.value;
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65379.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65379.value,
        NO2ENGINE_PANEL_65379header.value,
        page.value
      );
      break;
    default:
      console.error("Invalid tab value:", selectedTab);
  }
  console.log("updateTable");
};

watchEffect(() => {
  updateTable();
});

const GLLheader = ref([]);
const GGAheader = ref([]);
const RMCheader = ref([]);
const VTGheader = ref([]);
const ZDAheader = ref([]);
const GSVheader = ref([]);
const GSAheader = ref([]);
const HDTheader = ref([]);
const ROTheader = ref([]);
const MWVheader = ref([]);
const RADAR_SCREENheader = ref([]);
const VDMheader = ref([]);
const VDOheader = ref([]);
const ROUTEINFOheader = ref([]);
const WAYPOINTSheader = ref([]);
const RTZheader = ref([]);
const ECDIS_SCREENheader = ref([]);
const RSAheader = ref([]);
const HTDheader = ref([]);
const VBWheader = ref([]);
const VHWheader = ref([]);
const VLWheader = ref([]);
const CAN_Online_Stateheader = ref([]);
const Engine_RPMheader = ref([]);
const Rudderheader = ref([]);
const Rudder_Scaleheader = ref([]);
const AUTOPILOTCONTACTheader = ref([]);

const NO1ENGINE_PANEL_61444header = ref([]);
const NO1ENGINE_PANEL_65262header = ref([]);
const NO1ENGINE_PANEL_65263header = ref([]);
const NO1ENGINE_PANEL_65272header = ref([]);
const NO1ENGINE_PANEL_65271header = ref([]);
const NO1ENGINE_PANEL_65253header = ref([]);
const NO1ENGINE_PANEL_65270header = ref([]);
const NO1ENGINE_PANEL_65276header = ref([]);
const NO1ENGINE_PANEL_65360header = ref([]);
const NO1ENGINE_PANEL_65361_LAMPheader = ref([]);
const NO1ENGINE_PANEL_65361_STATUSheader = ref([]);
const NO1ENGINE_PANEL_65378header = ref([]);
const NO1ENGINE_PANEL_65376header = ref([]);
const NO1ENGINE_PANEL_65379header = ref([]);
const NO2ENGINE_PANEL_61444header = ref([]);
const NO2ENGINE_PANEL_65262header = ref([]);
const NO2ENGINE_PANEL_65263header = ref([]);
const NO2ENGINE_PANEL_65272header = ref([]);
const NO2ENGINE_PANEL_65271header = ref([]);
const NO2ENGINE_PANEL_65253header = ref([]);
const NO2ENGINE_PANEL_65270header = ref([]);
const NO2ENGINE_PANEL_65276header = ref([]);
const NO2ENGINE_PANEL_65360header = ref([]);
const NO2ENGINE_PANEL_65361_LAMPheader = ref([]);
const NO2ENGINE_PANEL_65361_STATUSheader = ref([]);
const NO2ENGINE_PANEL_65378header = ref([]);
const NO2ENGINE_PANEL_65376header = ref([]);
const NO2ENGINE_PANEL_65379header = ref([]);

const GLL = ref([]);
const GGA = ref([]);
const RMC = ref([]);
const VTG = ref([]);
const ZDA = ref([]);
const GSV = ref([]);
const GSA = ref([]);
const HDT = ref([]);
const ROT = ref([]);
const MWV = ref([]);
const RADAR_SCREEN = ref([]);
const VDM = ref([]);
const VDO = ref([]);
const ROUTEINFO = ref([]);
const WAYPOINTS = ref([]);
const RTZ = ref([]);
const ECDIS_SCREEN = ref([]);
const RSA = ref([]);
const HTD = ref([]);
const VBW = ref([]);
const VHW = ref([]);
const VLW = ref([]);
const CAN_Online_State = ref([]);
const Engine_RPM = ref([]);
const Rudder = ref([]);
const Rudder_Scale = ref([]);
const AUTOPILOTCONTACT = ref([]);
const NO1ENGINE_PANEL_61444 = ref([]);
const NO1ENGINE_PANEL_65262 = ref([]);
const NO1ENGINE_PANEL_65263 = ref([]);
const NO1ENGINE_PANEL_65272 = ref([]);
const NO1ENGINE_PANEL_65271 = ref([]);
const NO1ENGINE_PANEL_65253 = ref([]);
const NO1ENGINE_PANEL_65270 = ref([]);
const NO1ENGINE_PANEL_65276 = ref([]);
const NO1ENGINE_PANEL_65360 = ref([]);
const NO1ENGINE_PANEL_65361_LAMP = ref([]);
const NO1ENGINE_PANEL_65361_STATUS = ref([]);
const NO1ENGINE_PANEL_65378 = ref([]);
const NO1ENGINE_PANEL_65376 = ref([]);
const NO1ENGINE_PANEL_65379 = ref([]);
const NO2ENGINE_PANEL_61444 = ref([]);
const NO2ENGINE_PANEL_65262 = ref([]);
const NO2ENGINE_PANEL_65263 = ref([]);
const NO2ENGINE_PANEL_65272 = ref([]);
const NO2ENGINE_PANEL_65271 = ref([]);
const NO2ENGINE_PANEL_65253 = ref([]);
const NO2ENGINE_PANEL_65270 = ref([]);
const NO2ENGINE_PANEL_65276 = ref([]);
const NO2ENGINE_PANEL_65360 = ref([]);
const NO2ENGINE_PANEL_65361_LAMP = ref([]);
const NO2ENGINE_PANEL_65361_STATUS = ref([]);
const NO2ENGINE_PANEL_65378 = ref([]);
const NO2ENGINE_PANEL_65376 = ref([]);
const NO2ENGINE_PANEL_65379 = ref([]);

const headerVariables = [
  GLLheader,
  GGAheader,
  RMCheader,
  VTGheader,
  ZDAheader,
  GSVheader,
  GSAheader,
  HDTheader,
  ROTheader,
  MWVheader,
  RADAR_SCREENheader,
  VDMheader,
  VDOheader,
  ROUTEINFOheader,
  WAYPOINTSheader,
  RTZheader,
  ECDIS_SCREENheader,
  RSAheader,
  HTDheader,
  VBWheader,
  VHWheader,
  VLWheader,
  CAN_Online_Stateheader,
  Engine_RPMheader,
  Rudderheader,
  Rudder_Scaleheader,
  AUTOPILOTCONTACTheader,
  NO1ENGINE_PANEL_61444header,
  NO1ENGINE_PANEL_65262header,
  NO1ENGINE_PANEL_65263header,
  NO1ENGINE_PANEL_65272header,
  NO1ENGINE_PANEL_65271header,
  NO1ENGINE_PANEL_65253header,
  NO1ENGINE_PANEL_65270header,
  NO1ENGINE_PANEL_65276header,
  NO1ENGINE_PANEL_65360header,
  NO1ENGINE_PANEL_65361_LAMPheader,
  NO1ENGINE_PANEL_65361_STATUSheader,
  NO1ENGINE_PANEL_65378header,
  NO1ENGINE_PANEL_65376header,
  NO1ENGINE_PANEL_65379header,
  NO2ENGINE_PANEL_61444header,
  NO2ENGINE_PANEL_65262header,
  NO2ENGINE_PANEL_65263header,
  NO2ENGINE_PANEL_65272header,
  NO2ENGINE_PANEL_65271header,
  NO2ENGINE_PANEL_65253header,
  NO2ENGINE_PANEL_65270header,
  NO2ENGINE_PANEL_65276header,
  NO2ENGINE_PANEL_65360header,
  NO2ENGINE_PANEL_65361_LAMPheader,
  NO2ENGINE_PANEL_65361_STATUSheader,
  NO2ENGINE_PANEL_65378header,
  NO2ENGINE_PANEL_65376header,
  NO2ENGINE_PANEL_65379header,
];

const dataVariables = [
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
  RADAR_SCREEN,
  VDM,
  VDO,
  ROUTEINFO,
  WAYPOINTS,
  RTZ,
  ECDIS_SCREEN,
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

let downloadData = [];

const switchValue = (axiosItem, dataheader, response) => {
  switch (axiosItem) {
    case "dgps/gll":
      GLLheader.value = dataheader.value;
      GLL.value = response;
      downloadData.push(GLL);
      dataValues1.push("GLL");
      break;
    case "dgps/gga":
      GGAheader.value = dataheader.value;
      GGA.value = response;
      downloadData.push(GGA);
      dataValues1.push("GGA");
      break;
    case "dgps/rmc":
      RMCheader.value = dataheader.value;
      RMC.value = response;
      downloadData.push(RMC);
      dataValues1.push("RMC");
      break;
    case "dgps/vtg":
      VTGheader.value = dataheader.value;
      VTG.value = response;
      downloadData.push(VTG);
      dataValues1.push("VTG");
      break;
    case "dgps/zda":
      ZDAheader.value = dataheader.value;
      ZDA.value = response;
      downloadData.push(ZDA);
      dataValues1.push("ZDA");
      break;
    case "dgps/gsv":
      GSVheader.value = dataheader.value;
      GSV.value = response;
      downloadData.push(GSV);
      dataValues1.push("GSV");
      break;
    case "dgps/gsa":
      GSAheader.value = dataheader.value;
      GSA.value = response;
      downloadData.push(GSA);
      dataValues1.push("GSA");
      break;
    case "gyro/hdt":
      HDTheader.value = dataheader.value;
      HDT.value = response;
      downloadData.push(HDT);
      dataValues1.push("HDT");
      break;
    case "gyro/rot":
      ROTheader.value = dataheader.value;
      ROT.value = response;
      downloadData.push(ROT);
      dataValues1.push("ROT");
      break;
    case "anemometer/mwv":
      MWVheader.value = dataheader.value;
      MWV.value = response;
      downloadData.push(MWV);
      dataValues1.push("MWV");
      break;
    case "radar/screen":
      RADAR_SCREENheader.value = dataheader.value;

      RADAR_SCREEN.value = response;
      downloadData.push(RADAR_SCREEN);
      dataValues1.push("RADAR_SCREEN");
      break;
    case "ais/vdm":
      VDMheader.value = dataheader.value;
      VDM.value = response;
      downloadData.push(VDM);
      dataValues1.push("VDM");
      break;
    case "ais/vdo":
      VDOheader.value = dataheader.value;
      VDO.value = response;
      downloadData.push(VDO);
      dataValues1.push("VDO");
      break;
    case "ecdis/routeinfo":
      ROUTEINFOheader.value = dataheader.value;
      ROUTEINFO.value = response;
      downloadData.push(ROUTEINFO);
      dataValues1.push("ROUTEINFO");
      break;
    case "ecdis/waypoints":
      WAYPOINTSheader.value = dataheader.value;
      WAYPOINTS.value = response;
      downloadData.push(WAYPOINTS);
      dataValues1.push("WAYPOINTS");
      break;
    case "ecdis/rtz":
      RTZheader.value = dataheader.value;
      RTZ.value = response;
      downloadData.push(RTZ);
      dataValues1.push("RTZ");
      break;
    case "ecdis/screen":
      ECDIS_SCREENheader.value = dataheader.value;
      ECDIS_SCREEN.value = response;
      downloadData.push(ECDIS_SCREEN);
      dataValues1.push("ECDIS_SCREEN");
      break;
    case "autopilot/rsa":
      RSAheader.value = dataheader.value;
      RSA.value = response;
      downloadData.push(RSA);
      dataValues1.push("RSA");
      break;
    case "autopilot/htd":
      HTDheader.value = dataheader.value;
      HTD.value = response;
      downloadData.push(HTD);
      dataValues1.push("HTD");
      break;
    case "speedlog/vbw":
      VBWheader.value = dataheader.value;
      VBW.value = response;
      downloadData.push(VBW);
      dataValues1.push("VBW");
      break;
    case "speedlog/vhw":
      VHWheader.value = dataheader.value;
      VHW.value = response;
      downloadData.push(VHW);
      dataValues1.push("VHW");
      break;
    case "speedlog/vlw":
      VLWheader.value = dataheader.value;
      VLW.value = response;
      downloadData.push(VLW);
      dataValues1.push("VLW");
      break;

    case "CAN_Online_State":
      CAN_Online_Stateheader.value = dataheader.value;
      CAN_Online_State.value = response;
      downloadData.push(CAN_Online_State);
      dataValues1.push("CAN_Online_State");
      break;
    case "Engine_RPM":
      Engine_RPMheader.value = dataheader.value;
      Engine_RPM.value = response;
      downloadData.push(Engine_RPM);
      dataValues1.push("Engine_RPM");
      break;
    case "Rudder":
      Rudderheader.value = dataheader.value;
      Rudder.value = response;
      downloadData.push(Rudder);
      dataValues1.push("Rudder");
      break;
    case "Rudder_Scale":
      Rudder_Scaleheader.value = dataheader.value;
      Rudder_Scale.value = response;
      downloadData.push(Rudder_Scale);
      dataValues1.push("Rudder_Scale");
      break;
    case "AUTOPILOTCONTACT":
      AUTOPILOTCONTACTheader.value = dataheader.value;
      AUTOPILOTCONTACT.value = response;
      downloadData.push(AUTOPILOTCONTACT);
      dataValues1.push("AUTOPILOTCONTACT");
      break;
    case "no1enginepanel/no1engine_panel_61444":
      NO1ENGINE_PANEL_61444header.value = dataheader.value;
      NO1ENGINE_PANEL_61444.value = response;
      downloadData.push(NO1ENGINE_PANEL_61444);
      dataValues1.push("NO.1ENGINE_PANEL_61444");
      break;
    case "no1enginepanel/no1engine_panel_65262":
      NO1ENGINE_PANEL_65262header.value = dataheader.value;
      NO1ENGINE_PANEL_65262.value = response;
      downloadData.push(NO1ENGINE_PANEL_65262);
      dataValues1.push("NO.1ENGINE_PANEL_65262");
      break;
    case "no1enginepanel/no1engine_panel_65263":
      NO1ENGINE_PANEL_65263header.value = dataheader.value;
      NO1ENGINE_PANEL_65263.value = response;
      downloadData.push(NO1ENGINE_PANEL_65263);
      dataValues1.push("NO.1ENGINE_PANEL_65263");
      break;
    case "no1enginepanel/no1engine_panel_65272":
      NO1ENGINE_PANEL_65272header.value = dataheader.value;
      NO1ENGINE_PANEL_65272.value = response;
      downloadData.push(NO1ENGINE_PANEL_65272);
      dataValues1.push("NO.1ENGINE_PANEL_65272");
      break;
    case "no1enginepanel/no1engine_panel_65271":
      NO1ENGINE_PANEL_65271header.value = dataheader.value;
      NO1ENGINE_PANEL_65271.value = response;
      downloadData.push(NO1ENGINE_PANEL_65271);
      dataValues1.push("NO1ENGINE_PANEL_65271");
      break;
    case "no1enginepanel/no1engine_panel_65253":
      NO1ENGINE_PANEL_65253header.value = dataheader.value;
      NO1ENGINE_PANEL_65253.value = response;
      downloadData.push(NO1ENGINE_PANEL_65253);
      dataValues1.push("NO1ENGINE_PANEL_65253");
      break;
    case "no1enginepanel/no1engine_panel_65270":
      NO1ENGINE_PANEL_65270header.value = dataheader.value;
      NO1ENGINE_PANEL_65270.value = response;
      downloadData.push(NO1ENGINE_PANEL_65270);
      dataValues1.push("NO1ENGINE_PANEL_65270");
      break;
    case "no1enginepanel/no1engine_panel_65276":
      NO1ENGINE_PANEL_65276header.value = dataheader.value;
      NO1ENGINE_PANEL_65276.value = response;
      downloadData.push(NO1ENGINE_PANEL_65276);
      dataValues1.push("NO1ENGINE_PANEL_65276");
      break;
    case "no1enginepanel/no1engine_panel_65360":
      NO1ENGINE_PANEL_65360header.value = dataheader.value;
      NO1ENGINE_PANEL_65360.value = response;
      downloadData.push(NO1ENGINE_PANEL_65360);
      dataValues1.push("NO1ENGINE_PANEL_65360");
      break;
    case "no1enginepanel/no1engine_panel_65361_lamp":
      NO1ENGINE_PANEL_65361_LAMPheader.value = dataheader.value;
      NO1ENGINE_PANEL_65361_LAMP.value = response;
      downloadData.push(NO1ENGINE_PANEL_65361_LAMP);
      dataValues1.push("NO1ENGINE_PANEL_65361_LAMP");
      break;
    case "no1enginepanel/no1engine_panel_65361_status":
      NO1ENGINE_PANEL_65361_STATUSheader.value = dataheader.value;
      NO1ENGINE_PANEL_65361_STATUS.value = response;
      downloadData.push(NO1ENGINE_PANEL_65361_STATUS);
      dataValues1.push("NO1ENGINE_PANEL_65361_STATUS");
      break;
    case "no1enginepanel/no1engine_panel_65378":
      NO1ENGINE_PANEL_65378header.value = dataheader.value;
      NO1ENGINE_PANEL_65378.value = response;
      downloadData.push(NO1ENGINE_PANEL_65378);
      dataValues1.push("NO1ENGINE_PANEL_65378");
      break;
    case "no1enginepanel/no1engine_panel_65376":
      NO1ENGINE_PANEL_65376header.value = dataheader.value;
      NO1ENGINE_PANEL_65376.value = response;
      downloadData.push(NO1ENGINE_PANEL_65376);
      dataValues1.push("NO1ENGINE_PANEL_65376");
      break;
    case "no1enginepanel/no1engine_panel_65379":
      NO1ENGINE_PANEL_65379header.value = dataheader.value;
      NO1ENGINE_PANEL_65379.value = response;
      downloadData.push(NO1ENGINE_PANEL_65379);
      dataValues1.push("NO1ENGINE_PANEL_65379");
      break;
    case "no2enginepanel/no2engine_panel_61444":
      NO2ENGINE_PANEL_61444header.value = dataheader.value;
      NO2ENGINE_PANEL_61444.value = response;
      downloadData.push(NO2ENGINE_PANEL_61444);
      dataValues1.push("NO2ENGINE_PANEL_61444");
      break;
    case "no2enginepanel/no2engine_panel_65262":
      NO2ENGINE_PANEL_65262header.value = dataheader.value;
      NO2ENGINE_PANEL_65262.value = response;
      downloadData.push(NO2ENGINE_PANEL_65262);
      dataValues1.push("NO2ENGINE_PANEL_65262");
      break;
    case "no2enginepanel/no2engine_panel_65263":
      NO2ENGINE_PANEL_65263header.value = dataheader.value;
      NO2ENGINE_PANEL_65263.value = response;
      downloadData.push(NO2ENGINE_PANEL_65263);
      dataValues1.push("NO2ENGINE_PANEL_65263");
      break;
    case "no2enginepanel/no2engine_panel_65272":
      NO2ENGINE_PANEL_65272header.value = dataheader.value;
      NO2ENGINE_PANEL_65272.value = response;
      downloadData.push(NO2ENGINE_PANEL_65272);
      dataValues1.push("NO2ENGINE_PANEL_65272");
      break;
    case "no2enginepanel/no2engine_panel_65271":
      NO2ENGINE_PANEL_65271header.value = dataheader.value;
      NO2ENGINE_PANEL_65271.value = response;
      downloadData.push(NO2ENGINE_PANEL_65271);
      dataValues1.push("NO2ENGINE_PANEL_65271");
      break;
    case "no2enginepanel/no2engine_panel_65253":
      NO2ENGINE_PANEL_65253header.value = dataheader.value;
      NO2ENGINE_PANEL_65253.value = response;
      downloadData.push(NO2ENGINE_PANEL_65253);
      dataValues1.push("NO2ENGINE_PANEL_65253");
      break;
    case "no2enginepanel/no2engine_panel_65270":
      NO2ENGINE_PANEL_65270header.value = dataheader.value;
      NO2ENGINE_PANEL_65270.value = response;
      downloadData.push(NO2ENGINE_PANEL_65270);
      dataValues1.push("NO2ENGINE_PANEL_65270");
      break;
    case "no2enginepanel/no2engine_panel_65276":
      NO2ENGINE_PANEL_65276header.value = dataheader.value;
      NO2ENGINE_PANEL_65276.value = response;
      downloadData.push(NO2ENGINE_PANEL_65276);
      dataValues1.push("NO2ENGINE_PANEL_65276");
      break;
    case "no2enginepanel/no2engine_panel_65360":
      NO2ENGINE_PANEL_65360header.value = dataheader.value;
      NO2ENGINE_PANEL_65360.value = response;
      downloadData.push(NO2ENGINE_PANEL_65360);
      dataValues1.push("NO2ENGINE_PANEL_65360");
      break;
    case "no2enginepanel/no2engine_panel_65361_lamp":
      NO2ENGINE_PANEL_65361_LAMPheader.value = dataheader.value;
      NO2ENGINE_PANEL_65361_LAMP.value = response;
      downloadData.push(NO2ENGINE_PANEL_65361_LAMP);
      dataValues1.push("NO2ENGINE_PANEL_65361_LAMP");
      break;
    case "no2enginepanel/no2engine_panel_65361_status":
      NO2ENGINE_PANEL_65361_STATUSheader.value = dataheader.value;
      NO2ENGINE_PANEL_65361_STATUS.value = response;
      downloadData.push(NO2ENGINE_PANEL_65361_STATUS);
      dataValues1.push("NO2ENGINE_PANEL_65361_STATUS");
      break;
    case "no2enginepanel/no2engine_panel_65378":
      NO2ENGINE_PANEL_65378header.value = dataheader.value;
      NO2ENGINE_PANEL_65378.value = response;
      downloadData.push(NO2ENGINE_PANEL_65378);
      dataValues1.push("NO2ENGINE_PANEL_65378");
      break;
    case "no2enginepanel/no2engine_panel_65376":
      NO2ENGINE_PANEL_65376header.value = dataheader.value;
      NO2ENGINE_PANEL_65376.value = response;
      downloadData.push(NO2ENGINE_PANEL_65376);
      dataValues1.push("NO2ENGINE_PANEL_65376");
      break;
    case "no2enginepanel/no2engine_panel_65379":
      NO2ENGINE_PANEL_65379header.value = dataheader.value;
      NO2ENGINE_PANEL_65379.value = response;
      downloadData.push(NO2ENGINE_PANEL_65379);
      dataValues1.push("NO2ENGINE_PANEL_65379");
      break;

    default:
      console.error("Unknown axiosItem:", axiosItem);
  }
};
</script>

<style scoped>
.my-app {
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
}
.d-flex {
  display: flex;
}
select {
  text-align: center;
  margin-right: 7px;
  margin-top: 10px;
  padding: 4px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

select:hover,
select:focus {
  border-color: #007bff;
}
</style>
