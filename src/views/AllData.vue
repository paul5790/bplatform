<template>
  <!-- 전체화면 패딩100px -->
  <div style="height: 93vh">
    <div style="padding: 30px; padding-bottom: 0px">
      <!-- 데이터 선택창 -->
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="mainSelectedItems"
            :items="mainSelect"
            label="Main Components"
            variant="outlined"
          >
          </v-select>
        </v-col>
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
                    :indeterminate="likesSomeData2 && !likesAllData2"
                    :model-value="likesSomeData2"
                  ></v-checkbox-btn>
                </template>
              </v-list-item>

              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-sheet style="display: flex; height: 8vh">
        <v-row>
          <v-col cols="6"></v-col>
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
              :class="
                themeMode === 'dark' ? 'dp__theme_dark' : 'dp__theme_light'
              "
              style="--dp-input-padding: 15px"
              v-model="dateRange"
              range
              :dark="themeMode === 'dark'"
              :readonly="date_readonly"
            />
          </v-col>

          <!-- 검색 버튼 -->
          <v-col cols="1">
            <v-btn
              class=""
              :color="btnColor"
              style="display: flex; margin-top: 2px; height: 50px; width: 130px"
              @click="searchData()"
              >검색</v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet
        style="
          height: 2vh;
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
        :style="{
          color: '#f7f7f7',
          height: '5vh',
          marginLeft: '15px',
          marginRight: '15px',
        }"
        v-model="tab"
        align-tabs="start"
      >
        <!-- for문 사용해서 탭 늘리기 -->
        <v-tab
          :style="{
            'background-color':
              tab === index ? themeSelectedTabColor : themeNoNSelectedTabColor,
            color:
              tab === index
                ? themeSelectedTabTextColor
                : themeNoNSelectedTabTextColor,
          }"
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
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          height: 64vh;
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
                  height: 68vh;
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
                  loading
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
                :style="tableStyle"
                @update:options="handleSortUpdate"
              >
                <template v-slot:no-data>
                  <v-sheet
                    height="49vh"
                    class="pa-1 d-flex justify-center align-center"
                  >
                    <div v-if="lastloading" style="text-align: center">
                      <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                      <p style="font-weight: 500; font-size: 20px">loading!</p>
                    </div>
                    <div v-if="!lastloading" style="text-align: center">
                      <p style="font-weight: 500; font-size: 20px">
                        {{ message }}
                      </p>
                    </div>
                  </v-sheet>
                </template>
                <template v-slot:bottom>
                  <div
                    class="text-center pt-2 mb-5"
                    style="display: flex; justify-content: center"
                  >
                    <v-pagination
                      v-model="page"
                      :length="pageCount"
                      :total-visible="10"
                    ></v-pagination>
                    <v-text-field
                      label="Page"
                      variant="outlined"
                      style="max-width: 70px; margin-left: 10px; text-align: center;"
                      @keyup.enter="keyPage"
                      v-model="page"
                    ></v-text-field>
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
        <!-- <v-btn
          :loading="downloadBtnLoading"
          :color="textColor"
          :style="{
            'background-color': btnColor,
            'margin-top': '0px',
            'margin-left': '20px',
          }"
          @click="dataload()"
          :disabled="downloadBtnDisabled"
          >{{ downloadBtnLoadingpercent }}</v-btn
        > -->

        <v-btn
          :loading="downloadBtnLoading"
          :color="textColor"
          :style="{
            'background-color': btnColor,
            'margin-top': '0px',
            'margin-left': '20px',
            width: '200px',
          }"
          @click="dataDownloadServer()"
          :disabled="downloadBtnDisabled"
          >데이터 다운로드</v-btn
        >
      </v-card-actions>
    </div>
    <!-- 데이터 저장중 모달 persistent -->
    <v-dialog v-model="downloadDialog" max-width="300">
      <v-card>
        <v-card-text>
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              Getting files
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="deep-purple-accent-4"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue"
            variant="text"
            @click="(downloadDialog = false), cancleLoading()"
            >취소</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted, watch } from "vue";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  readTrialData,
  readDataTrial,
  readDataDate,
  downloadDataFile,
  cancelDownload,
} from "../api/index.js";
import JSZip from "jszip";
import {
  darkbackcolor,
  whitebackcolor,
  darkselectedTab,
  darkNonSelectedTab,
  darkselectedTabText,
  darkNoNselectedTabText,
  lightselectedTab,
  lightNonSelectedTab,
  lightselectedTabText,
  lightNoNselectedTabText,
  darkbtn,
  lightbtn,
  darkbtnText,
  lightbtnText,
} from "../color/color.js";

// 다크모드
const themeMode = ref(localStorage.getItem("themeMode") || "light");

const btnColor = ref(themeMode.value === "light" ? lightbtn : darkbtn);
watch(themeMode, (newValue) => {
  themeColor.value = newValue === "light" ? lightbtn : darkbtn;
});

const textColor = ref(themeMode.value === "light" ? lightbtnText : darkbtnText);
const themeColor = ref(
  themeMode.value === "light" ? whitebackcolor : darkbackcolor
);
const themeSelectedTabColor = ref(
  themeMode.value === "light" ? lightselectedTab : darkselectedTab
);
const themeNoNSelectedTabColor = ref(
  themeMode.value === "light" ? lightNonSelectedTab : darkNonSelectedTab
);
const themeSelectedTabTextColor = ref(
  themeMode.value === "light" ? lightselectedTabText : darkselectedTabText
);
const themeNoNSelectedTabTextColor = ref(
  themeMode.value === "light" ? lightNoNselectedTabText : darkNoNselectedTabText
);
watch(themeMode, (newValue) => {
  themeColor.value = newValue === "light" ? whitebackcolor : darkbackcolor;
});

const tableStyle = computed(() => {
  const imageUrl = themeMode.value === "light" ? '/image/kriso_kren_n.png' : '/image/kriso_kren_d.png';
  return {
    paddingTop: '5px',
    paddingBottom: '10px',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'auto 60%',
    backgroundPosition: 'center 30%',
    backgroundRepeat: 'no-repeat'
  };
});

const tab = ref(0);

// 토큰
const tokenid = ref(sessionStorage.getItem("token") || "");
const userId = ref(sessionStorage.getItem("id") || "");
const downloadBtnLoading = ref(false);

// 데이터 테이블
const itemsPerPage = ref(18);
const page = ref(1);
const headerName = ref([]); // 빈 배열로 초기화
const dataSet = ref([]); // 빈 배열로 초기화
const selectedData = ref([]); //
const message = ref("데이터가 존재하지 않습니다.");
const searchstart = ref(false);
const loading = ref(false);
const lastloading = ref(false);
const beforePage = ref("GLL");
const downloadBtnDisabled = ref(true);

// dialog
const downloadDialog = ref(false);

// 데이터 조회
const postType = ref();

// 데이터 다운로드
let variableName;
const canceling = ref(false);
const startTime = ref();
const endTime = ref();
const startISOTime = ref();
const endISOTime = ref();

const selectedvoyage = ref();

// 시운전 시간 받아오기
const date_readonly = ref(true);
const dateRange = ref(); // 반응적인(ref) 배열로 초기화

const startDate = ref(); // 현재 날짜와 시간을 기본값으로 사용
const endDate = ref(); // 현재 날짜와 시간을 기본값으로 사용

const searchType = ref("N/A");
const searchStart = ref();
const searchEnd = ref();

// 다운로드
const downloadFormat = ref(["csv", "txt"]);
const selectDownlodFormat = ref("csv");

const pageCount = ref(0);
const keyPage = (event) => {
  const inputNumber = parseInt(event.target.value);
  if (!isNaN(inputNumber)) {
    page.value = inputNumber;
  }
};

// 셀렉바 메뉴
const mainSelect = ref([
  "Ship Information",
  "Kass Information",
  "System Information",
  "Control Information",
]);
const firstSelect = ref([]);
const secondSelect = ref([]);
const mainSelectedItems = ref([]);
const firstSelectedItems = ref([]);
const contentsSelectedItems = ref([]);

//전체 선택
const likesAllData = computed(
  () => mainSelectedItems.value.length === mainSelect.value.length
);

const likesAllData1 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData1 = computed(() => firstSelectedItems.value.length > 0);

const likesAllData2 = computed(
  () => contentsSelectedItems.value.length === secondSelect.value.length
);
const likesSomeData2 = computed(() => contentsSelectedItems.value.length > 0);

const selectAllItem1 = () => {
  if (likesAllData1.value) {
    firstSelectedItems.value = [];
  } else {
    firstSelectedItems.value = [...firstSelect.value];
  }
};

const selectAllItem2 = () => {
  if (likesAllData2.value) {
    contentsSelectedItems.value = [];
  } else {
    contentsSelectedItems.value = [...secondSelect.value];
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Method
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
};

onMounted(() => {
  getTrialDate();
  sessionStorage.setItem("page", "데이터 조회");
});

// 검색 이벤트
const searchData = async () => {
  if (
    !firstSelectedItems.value ||
    !contentsSelectedItems.value ||
    !selectedvoyage.value
  ) {
    alert("조회할 데이터 범위를 선택해주세요.");
  } else {
    try {
      loading.value = true;
      lastloading.value = true;
      downloadBtnDisabled.value = false;
      selectedData.value = contentsSelectedItems.value;
      variableName = getVariableName(selectedData.value).value;

      let start = new Date(dateRange.value[0]);
      let end = new Date(dateRange.value[1]);

      startISOTime.value = start.toISOString().slice(0, 19);
      endISOTime.value = end.toISOString().slice(0, 19);

      start.setHours(start.getHours() + 9);
      end.setHours(end.getHours() + 9);
      startDate.value = start.toISOString();
      endDate.value = end.toISOString();

      tab.value = 0;

      startTime.value = start.toISOString().slice(0, 19);
      endTime.value = end.toISOString().slice(0, 19);
      console.log(variableName);

      await fetchData(variableName); // 초기 데이터 요청

      console.log("dataSetv = " + dataSet.value.length);
      if (dataSet.value.length <= 0) {
        loading.value = false;
      }
      lastloading.value = false;

      searchstart.value = true;
    } catch {
      loading.value = false;
      lastloading.value = false;
      alert("조회할 데이터 범위를 선택해주세요.");
    }
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fetchData = async (data) => {
  if (data.length != 0) {
    for (let i = 0; i < data.length; i++) {
      try {
        const [Sc, Co] = data[i].split("/");

        let dataFomat;
        if (postType.value == "period") {
          dataFomat = {
            subComponent: Sc,
            content: Co,
            seatrialNumber: "N/A",
            period: [searchStart.value, searchEnd.value],
          };
        } else if (postType.value == "seatrial") {
          dataFomat = {
            subComponent: Sc,
            content: Co,
            seatrialNumber: selectedtrialNum.value,
            period: ["N/A", "N/A"],
          };
        }
        console.log("dataSet : " + JSON.stringify(dataFomat));
        const response = await readDataTrial(
          tokenid.value,
          dataFomat,
          postType.value
        );

        // dataSet.value = response;

        const dataheader = ref();
        const importantKeys = [
          "seatrial_ID",
          "timestamp_EQUIPMENT",
          "timestamp_PUBLISH",
          "ship_ID",
        ];
        dataheader.value = [
          ...importantKeys,
          ...Object.keys(response[0]).filter(
            (key) => !importantKeys.includes(key)
          ),
        ].map((key) => {
          let modifiedKey = key;
          return {
            title: modifiedKey,
            align: "start",
            key,
            width:
              key === "timestamp_PUBLISH" || key === "timestamp_EQUIPMENT"
                ? 280
                : undefined,
          };
        });
        updateTable();
        await switchValue(data[i], dataheader, response);

        if (data.length === 1) {
          loading.value = false;
        } else {
          if (i === 1) {
            loading.value = false;
          }
          if (i == data.length - 1) {
            lastloading.value = false;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    alert("데이터를 선택하세요.");
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const dataDownloadServer = async () => {
  if (sessionStorage.getItem("isAdmin") != "ADMIN") {
    alert("ADMIN 이상만 사용 가능합니다.");
    return;
  }
  try {
    canceling.value = false;
    // downloadDialog.value = true;
    downloadBtnLoading.value = true;
    sessionStorage.setItem("downloading", true);
    //searchStart
    console.log(searchStart.value);
    console.log(startTime.value);
    console.log(startISOTime.value);
    let period = ["N/A", "N/A"];
    let seatrial = "N/A";
    if (searchType.value == "period") {
      period = [searchStart.value, searchEnd.value];
      seatrial = "N/A";
    } else {
      period = [startISOTime.value, endISOTime.value];
      seatrial = selectedtrialNum.value;
    }

    let setData = {
      type: selectDownlodFormat.value,
      findBy: searchType.value,
      period: period,
      seatrial: seatrial,
      signals: variableName,
    };
    console.log("setData = " + setData.signals);
    const loadData = await downloadDataFile(tokenid.value, setData);

    sessionStorage.setItem("downloading", false);
    downloadBtnLoading.value = false;
    // 다운로드할 파일 이름 추출
    const contentDispositionHeader = loadData.headers["content-disposition"];
    const match = contentDispositionHeader.match(/filename=([^;]+)/);
    const fileName = match ? match[1] : "downloaded-file";

    console.log(contentDispositionHeader);
    console.log(match);
    console.log("File name:", fileName);

    const blob = new Blob([loadData.data]);
    // Blob 객체를 다운로드할 수 있는 URL로 변환
    const url = window.URL.createObjectURL(blob);

    // <a> 태그를 생성하고 다운로드 링크 설정
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // 다운로드할 ZIP 파일의 이름 설정
    document.body.appendChild(link);

    // 다운로드 링크 클릭하여 파일 다운로드
    link.click();

    // 사용이 끝난 URL 객체 제거
    window.URL.revokeObjectURL(url);

    // downloadDialog.value = false;
  } catch (error) {
    downloadBtnLoading.value = false;
    // downloadDialog.value = false;
    if (canceling.value) {
      alert("데이터 다운로드를 취소합니다.");
      downloadBtnLoading.value = false;
      canceling.value = false;
    } else {
      alert("다운로드 할 데이터를 다시 확인해주세요.");
    }
  }
};

const cancleLoading = () => {
  canceling.value = true;
  downloadBtnLoading.value = false;
  cancelDownload();
  //location.reload();
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

    NO1ENGINE_PANEL_61444: "no1enginepanel/no1engine_panel_61444",
    NO1ENGINE_PANEL_65262: "no1enginepanel/no1engine_panel_65262",
    NO1ENGINE_PANEL_65263: "no1enginepanel/no1engine_panel_65263",
    NO1ENGINE_PANEL_65272: "no1enginepanel/no1engine_panel_65272",
    NO1ENGINE_PANEL_65271: "no1enginepanel/no1engine_panel_65271",
    NO1ENGINE_PANEL_65253: "no1enginepanel/no1engine_panel_65253",
    NO1ENGINE_PANEL_65270: "no1enginepanel/no1engine_panel_65270",
    NO1ENGINE_PANEL_65276: "no1enginepanel/no1engine_panel_65276",
    NO1ENGINE_PANEL_65360: "no1enginepanel/no1engine_panel_65360",
    NO1ENGINE_PANEL_65361_LAMP: "no1enginepanel/no1engine_panel_65361_lamp",
    NO1ENGINE_PANEL_65361_STATUS: "no1enginepanel/no1engine_panel_65361_status",

    NO1ENGINE_PANEL_65378: "no1enginepanel/no1engine_panel_65378",
    NO1ENGINE_PANEL_65376: "no1enginepanel/no1engine_panel_65376",
    NO1ENGINE_PANEL_65379: "no1enginepanel/no1engine_panel_65379",
    NO2ENGINE_PANEL_61444: "no2enginepanel/no2engine_panel_61444",
    NO2ENGINE_PANEL_65262: "no2enginepanel/no2engine_panel_65262",
    NO2ENGINE_PANEL_65263: "no2enginepanel/no2engine_panel_65263",
    NO2ENGINE_PANEL_65272: "no2enginepanel/no2engine_panel_65272",
    NO2ENGINE_PANEL_65271: "no2enginepanel/no2engine_panel_65271",
    NO2ENGINE_PANEL_65253: "no2enginepanel/no2engine_panel_65253",
    NO2ENGINE_PANEL_65270: "no2enginepanel/no2engine_panel_65270",
    NO2ENGINE_PANEL_65276: "no2enginepanel/no2engine_panel_65276",
    NO2ENGINE_PANEL_65360: "no2enginepanel/no2engine_panel_65360",
    NO2ENGINE_PANEL_65361_LAMP: "no2enginepanel/no2engine_panel_65361_lamp",
    NO2ENGINE_PANEL_65361_STATUS: "no2enginepanel/no2engine_panel_65361_status",

    NO2ENGINE_PANEL_65378: "no2enginepanel/no2engine_panel_65378",
    NO2ENGINE_PANEL_65376: "no2enginepanel/no2engine_panel_65376",
    NO2ENGINE_PANEL_65379: "no2enginepanel/no2engine_panel_65379",

    SITUATIONAL: "MTIE1ISA/SITUATIONAL",
    VIRTUALNAV: "MTIE5VDGS/VIRTUALNAV",
    SITUATIONALAWARENESS: "MTIE5DBS/SITUATIONALAWARENESS",
    ROUTEDECISION: "MOF1ANS/ROUTEDECISION",
    MARINEGATEWAY: "MOF2SYNC/MARINEGATEWAY",
    WAYPOINT: "MOF1GNW/WAYPOINT",
    SAS: "MTIE5SAS/SAS",

    ME1: "MTIE4.XINNOS_STAS/ME1",
    ME2: "MTIE4.XINNOS_STAS/ME2",

    V_NO1ENGINE_PANEL_61444: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_61444",
    V_NO1ENGINE_PANEL_65262: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65262",
    V_NO1ENGINE_PANEL_65263: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65263",
    V_NO1ENGINE_PANEL_65271: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65271",
    V_NO1ENGINE_PANEL_65270: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65270",
    V_NO1ENGINE_PANEL_65360: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65360",
    V_NO1ENGINE_PANEL_65361_LAMP:
      "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_LAMP",
    V_NO1ENGINE_PANEL_65272: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65272",
    V_NO1ENGINE_PANEL_65253: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65253",
    V_NO1ENGINE_PANEL_65276: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65276",
    V_NO2ENGINE_PANEL_61444: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_61444",
    V_NO2ENGINE_PANEL_65262: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65262",
    V_NO2ENGINE_PANEL_65263: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65263",
    V_NO2ENGINE_PANEL_65271: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65271",
    V_NO2ENGINE_PANEL_65270: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65270",
    V_NO2ENGINE_PANEL_65360: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65360",
    V_NO2ENGINE_PANEL_65361_LAMP:
      "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_LAMP",
    V_NO2ENGINE_PANEL_65272: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65272",
    V_NO2ENGINE_PANEL_65253: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65253",
    V_NO2ENGINE_PANEL_65276: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65276",
    V_NO1ENGINE_PANEL_65361_STATUS:
      "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_STATUS",
    V_NO1ENGINE_PANEL_65378: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65378",
    V_NO1ENGINE_PANEL_65376: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65376",
    V_NO1ENGINE_PANEL_65379: "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65379",
    V_NO2ENGINE_PANEL_65361_STATUS:
      "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_STATUS",
    V_NO2ENGINE_PANEL_65378: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65378",
    V_NO2ENGINE_PANEL_65376: "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65376",
    V_NO2ENGINE_PANEL_65379: "MTIE4XINNOS_VDGS/NO2ENGINE_PANEL_65379",

    SUBSCRIBELIST: "MANAGEMENT/SUBSCRIBELIST",
    CONNECTSTATE: "MANAGEMENT/CONNECTSTATE",
    SYSTEMSTATE: "MANAGEMENT/SYSTEMSTATE",
    ALARMINFO: "MANAGEMENT/ALARMINFO",
    MODEINFO: "MANAGEMENT/MODEINFO",
    COM: "MANAGEMENT/COM",
    ENGINECONTROL: "MANAGEMENT/ENGINECONTROL",
    RUDDERCONTROL: "MANAGEMENT/RUDDERCONTROL",
    SHORE_MODE_REQUEST: "MANAGEMENT/SHORE_MODE_REQUEST",
    SHORE_ENGINE_CONTROL: "MANAGEMENT/SHORE_ENGINE_CONTROL",
    SHORE_RUDDER_CONTROL: "MANAGEMENT/SHORE_RUDDER_CONTROL",

    REQUESTCOMMAND_R: "RUDDER/REQUESTCOMMAND_R",
    RESPONSECOMMAND_R: "RUDDER/RESPONSECOMMAND_R",
    REQUESTCOMMAND_E: "ENGINE/REQUESTCOMMAND_E",
    RESPONSECOMMAND_E: "ENGINE/RESPONSECOMMAND_E",
    REQUESTCOMMAND_M: "MODE/REQUESTCOMMAND_M",
    RESPONSECOMMAND_M: "MODE/RESPONSECOMMAND_M",

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

const updateData = async (data, header, page) => {
  // 미리 보여질 일부 데이터를 설정
  const initialData = data.slice(0 + (page - 1) * 18, 18 + (page - 1) * 18);
  headerName.value = header;
  dataSet.value = initialData;
};

const updateTable = async () => {
  const selectedTab = selectedData.value[tab.value];
  itemsPerPage.value = 18;
  if (beforePage.value != selectedTab) {
    page.value = 1;
    beforePage.value = selectedTab;
  }
  switch (selectedTab) {
    case "GLL":
      GLL.value.sort((a, b) => {});
      // 정렬에 필요한 조건을 여기에 추가
      pageCount.value = Math.ceil(GLL.value.length / itemsPerPage.value);
      updateData(GLL.value, GLLheader.value, page.value);
      break;
    case "GGA":
      pageCount.value = Math.ceil(GGA.value.length / itemsPerPage.value);
      updateData(GGA.value, GGAheader.value, page.value);
      break;
    case "RMC":
      pageCount.value = Math.ceil(RMC.value.length / itemsPerPage.value);
      updateData(RMC.value, RMCheader.value, page.value);
      break;
    case "VTG":
      pageCount.value = Math.ceil(VTG.value.length / itemsPerPage.value);
      updateData(VTG.value, VTGheader.value, page.value);
      break;
    case "ZDA":
      pageCount.value = Math.ceil(ZDA.value.length / itemsPerPage.value);
      updateData(ZDA.value, ZDAheader.value, page.value);
      break;
    case "GSV":
      pageCount.value = Math.ceil(GSV.value.length / itemsPerPage.value);
      updateData(GSV.value, GSVheader.value, page.value);
      break;
    case "GSA":
      pageCount.value = Math.ceil(GSA.value.length / itemsPerPage.value);
      updateData(GSA.value, GSAheader.value, page.value);
      break;
    case "HDT":
      pageCount.value = Math.ceil(HDT.value.length / itemsPerPage.value);
      updateData(HDT.value, HDTheader.value, page.value);
      break;
    case "ROT":
      pageCount.value = Math.ceil(ROT.value.length / itemsPerPage.value);
      updateData(ROT.value, ROTheader.value, page.value);
      break;
    case "MWV":
      pageCount.value = Math.ceil(MWV.value.length / itemsPerPage.value);
      updateData(MWV.value, MWVheader.value, page.value);
      break;
    case "RADAR_SCREEN":
      pageCount.value = Math.ceil(
        RADAR_SCREEN.value.length / itemsPerPage.value
      );
      updateData(RADAR_SCREEN.value, RADAR_SCREENheader.value, page.value);
      break;
    case "VDM":
      pageCount.value = Math.ceil(VDM.value.length / itemsPerPage.value);
      updateData(VDM.value, VDMheader.value, page.value);
      break;
    case "VDO":
      pageCount.value = Math.ceil(VDO.value.length / itemsPerPage.value);
      updateData(VDO.value, VDOheader.value, page.value);
      break;
    case "ROUTEINFO":
      pageCount.value = Math.ceil(ROUTEINFO.value.length / itemsPerPage.value);
      updateData(ROUTEINFO.value, ROUTEINFOheader.value, page.value);
      break;
    case "WAYPOINTS":
      pageCount.value = Math.ceil(WAYPOINTS.value.length / itemsPerPage.value);
      updateData(WAYPOINTS.value, WAYPOINTSheader.value, page.value);
      break;
    case "RTZ":
      pageCount.value = Math.ceil(RTZ.value.length / itemsPerPage.value);
      updateData(RTZ.value, RTZheader.value, page.value);
      break;
    case "ECDIS_SCREEN":
      pageCount.value = Math.ceil(
        ECDIS_SCREEN.value.length / itemsPerPage.value
      );
      updateData(ECDIS_SCREEN.value, ECDIS_SCREENheader.value, page.value);
      break;
    case "RSA":
      pageCount.value = Math.ceil(RSA.value.length / itemsPerPage.value);
      updateData(RSA.value, RSAheader.value, page.value);
      break;
    case "HTD":
      pageCount.value = Math.ceil(HTD.value.length / itemsPerPage.value);
      updateData(HTD.value, HTDheader.value, page.value);
      break;
    case "VBW":
      pageCount.value = Math.ceil(VBW.value.length / itemsPerPage.value);
      updateData(VBW.value, VBWheader.value, page.value);
      break;
    case "VHW":
      pageCount.value = Math.ceil(VHW.value.length / itemsPerPage.value);
      updateData(VHW.value, VHWheader.value, page.value);
      break;
    case "VLW":
      pageCount.value = Math.ceil(VLW.value.length / itemsPerPage.value);
      updateData(VLW.value, VLWheader.value, page.value);
      break;
    case "CAN_Online_State":
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
      pageCount.value = Math.ceil(Engine_RPM.value.length / itemsPerPage.value);
      updateData(Engine_RPM.value, Engine_RPMheader.value, page.value);
      break;
    case "Rudder":
      pageCount.value = Math.ceil(Rudder.value.length / itemsPerPage.value);
      updateData(Rudder.value, Rudderheader.value, page.value);
      break;
    case "Rudder_Scale":
      pageCount.value = Math.ceil(
        Rudder_Scale.value.length / itemsPerPage.value
      );
      updateData(Rudder_Scale.value, Rudder_Scaleheader.value, page.value);
      break;
    case "AUTOPILOTCONTACT":
      pageCount.value = Math.ceil(
        AUTOPILOTCONTACT.value.length / itemsPerPage.value
      );
      updateData(
        AUTOPILOTCONTACT.value,
        AUTOPILOTCONTACTheader.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_61444":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_61444.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_61444.value,
        NO1ENGINE_PANEL_61444header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65262":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65262.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65262.value,
        NO1ENGINE_PANEL_65262header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65263":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65263.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65263.value,
        NO1ENGINE_PANEL_65263header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65272":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65272.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65272.value,
        NO1ENGINE_PANEL_65272header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65271":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65271.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65271.value,
        NO1ENGINE_PANEL_65271header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65253":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65253.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65253.value,
        NO1ENGINE_PANEL_65253header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65270":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65270.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65270.value,
        NO1ENGINE_PANEL_65270header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65276":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65276.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65276.value,
        NO1ENGINE_PANEL_65276header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65360":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65360.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65360.value,
        NO1ENGINE_PANEL_65360header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65361_LAMP":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65361_LAMP.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65361_LAMP.value,
        NO1ENGINE_PANEL_65361_LAMPheader.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65361_STATUS":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65361_STATUS.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65361_STATUS.value,
        NO1ENGINE_PANEL_65361_STATUSheader.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65378":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65378.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65378.value,
        NO1ENGINE_PANEL_65378header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65376":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65376.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65376.value,
        NO1ENGINE_PANEL_65376header.value,
        page.value
      );
      break;
    case "NO1ENGINE_PANEL_65379":
      pageCount.value = Math.ceil(
        NO1ENGINE_PANEL_65379.value.length / itemsPerPage.value
      );
      updateData(
        NO1ENGINE_PANEL_65379.value,
        NO1ENGINE_PANEL_65379header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_61444":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_61444.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_61444.value,
        NO2ENGINE_PANEL_61444header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65262":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65262.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65262.value,
        NO2ENGINE_PANEL_65262header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65263":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65263.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65263.value,
        NO2ENGINE_PANEL_65263header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65272":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65272.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65272.value,
        NO2ENGINE_PANEL_65272header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65271":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65271.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65271.value,
        NO2ENGINE_PANEL_65271header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65253":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65253.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65253.value,
        NO2ENGINE_PANEL_65253header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65270":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65270.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65270.value,
        NO2ENGINE_PANEL_65270header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65276":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65276.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65276.value,
        NO2ENGINE_PANEL_65276header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65360":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65360.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65360.value,
        NO2ENGINE_PANEL_65360header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65361_LAMP":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65361_LAMP.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65361_LAMP.value,
        NO2ENGINE_PANEL_65361_LAMPheader.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65361_STATUS":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65361_STATUS.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65361_STATUS.value,
        NO2ENGINE_PANEL_65361_STATUSheader.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65378":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65378.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65378.value,
        NO2ENGINE_PANEL_65378header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65376":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65376.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65376.value,
        NO2ENGINE_PANEL_65376header.value,
        page.value
      );
      break;
    case "NO2ENGINE_PANEL_65379":
      pageCount.value = Math.ceil(
        NO2ENGINE_PANEL_65379.value.length / itemsPerPage.value
      );
      updateData(
        NO2ENGINE_PANEL_65379.value,
        NO2ENGINE_PANEL_65379header.value,
        page.value
      );
      break;

    case "SITUATIONAL":
      pageCount.value = Math.ceil(
        SITUATIONAL.value.length / itemsPerPage.value
      );
      updateData(SITUATIONAL.value, SITUATIONALheader.value, page.value);
      break;
    case "VIRTUALNAV":
      pageCount.value = Math.ceil(VIRTUALNAV.value.length / itemsPerPage.value);
      updateData(VIRTUALNAV.value, VIRTUALNAVheader.value, page.value);
      break;
    case "SITUATIONALAWARENESS":
      pageCount.value = Math.ceil(
        SITUATIONALAWARENESS.value.length / itemsPerPage.value
      );
      updateData(
        SITUATIONALAWARENESS.value,
        SITUATIONALAWARENESSheader.value,
        page.value
      );
      break;
    case "ROUTEDECISION":
      pageCount.value = Math.ceil(
        ROUTEDECISION.value.length / itemsPerPage.value
      );
      updateData(ROUTEDECISION.value, ROUTEDECISIONheader.value, page.value);
      break;
    case "MARINEGATEWAY":
      pageCount.value = Math.ceil(
        MARINEGATEWAY.value.length / itemsPerPage.value
      );
      updateData(MARINEGATEWAY.value, MARINEGATEWAYheader.value, page.value);
      break;
    case "WAYPOINT":
      pageCount.value = Math.ceil(WAYPOINT.value.length / itemsPerPage.value);
      updateData(WAYPOINT.value, WAYPOINTheader.value, page.value);
      break;
    case "SAS":
      pageCount.value = Math.ceil(SAS.value.length / itemsPerPage.value);
      updateData(SAS.value, SASheader.value, page.value);
      break;
    case "ME1":
      pageCount.value = Math.ceil(ME1.value.length / itemsPerPage.value);
      updateData(ME1.value, ME1header.value, page.value);
      break;
    case "ME2":
      pageCount.value = Math.ceil(ME2.value.length / itemsPerPage.value);
      updateData(ME2.value, ME2header.value, page.value);
      break;
    case "V_NO1ENGINE_PANEL_61444":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_61444.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_61444.value,
        V_NO1ENGINE_PANEL_61444header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65262":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65262.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65262.value,
        V_NO1ENGINE_PANEL_65262header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65263":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65263.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65263.value,
        V_NO1ENGINE_PANEL_65263header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65271":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65271.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65271.value,
        V_NO1ENGINE_PANEL_65271header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65270":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65270.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65270.value,
        V_NO1ENGINE_PANEL_65270header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65360":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65360.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65360.value,
        V_NO1ENGINE_PANEL_65360header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65361_LAMP":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65361_LAMP.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65361_LAMP.value,
        V_NO1ENGINE_PANEL_65361_LAMPheader.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65272":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65272.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65272.value,
        V_NO1ENGINE_PANEL_65272header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65253":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65253.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65253.value,
        V_NO1ENGINE_PANEL_65253header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65276":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65276.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65276.value,
        V_NO1ENGINE_PANEL_65276header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_61444":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_61444.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_61444.value,
        V_NO2ENGINE_PANEL_61444header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65262":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65262.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65262.value,
        V_NO2ENGINE_PANEL_65262header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65263":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65263.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65263.value,
        V_NO2ENGINE_PANEL_65263header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65271":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65271.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65271.value,
        V_NO2ENGINE_PANEL_65271header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65270":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65270.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65270.value,
        V_NO2ENGINE_PANEL_65270header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65360":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65360.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65360.value,
        V_NO2ENGINE_PANEL_65360header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65361_LAMP":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65361_LAMP.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65361_LAMP.value,
        V_NO2ENGINE_PANEL_65361_LAMPheader.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65272":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65272.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65272.value,
        V_NO2ENGINE_PANEL_65272header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65253":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65253.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65253.value,
        V_NO2ENGINE_PANEL_65253header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65276":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65276.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65276.value,
        V_NO2ENGINE_PANEL_65276header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65361_STATUS":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65361_STATUS.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65361_STATUS.value,
        V_NO1ENGINE_PANEL_65361_STATUSheader.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65378":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65378.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65378.value,
        V_NO1ENGINE_PANEL_65378header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65376":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65376.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65376.value,
        V_NO1ENGINE_PANEL_65376header.value,
        page.value
      );
      break;
    case "V_NO1ENGINE_PANEL_65379":
      pageCount.value = Math.ceil(
        V_NO1ENGINE_PANEL_65379.value.length / itemsPerPage.value
      );
      updateData(
        V_NO1ENGINE_PANEL_65379.value,
        V_NO1ENGINE_PANEL_65379header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65361_STATUS":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65361_STATUS.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65361_STATUS.value,
        V_NO2ENGINE_PANEL_65361_STATUSheader.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65378":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65378.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65378.value,
        V_NO2ENGINE_PANEL_65378header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65376":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65376.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65376.value,
        V_NO2ENGINE_PANEL_65376header.value,
        page.value
      );
      break;
    case "V_NO2ENGINE_PANEL_65379":
      pageCount.value = Math.ceil(
        V_NO2ENGINE_PANEL_65379.value.length / itemsPerPage.value
      );
      updateData(
        V_NO2ENGINE_PANEL_65379.value,
        V_NO2ENGINE_PANEL_65379header.value,
        page.value
      );
      break;
    case "SUBSCRIBELIST":
      pageCount.value = Math.ceil(
        SUBSCRIBELIST.value.length / itemsPerPage.value
      );
      updateData(SUBSCRIBELIST.value, SUBSCRIBELISTheader.value, page.value);
      break;
    case "CONNECTSTATE":
      pageCount.value = Math.ceil(
        CONNECTSTATE.value.length / itemsPerPage.value
      );
      updateData(CONNECTSTATE.value, CONNECTSTATEheader.value, page.value);
      break;
    case "SYSTEMSTATE":
      pageCount.value = Math.ceil(
        SYSTEMSTATE.value.length / itemsPerPage.value
      );
      updateData(SYSTEMSTATE.value, SYSTEMSTATEheader.value, page.value);
      break;
    case "ALARMINFO":
      pageCount.value = Math.ceil(ALARMINFO.value.length / itemsPerPage.value);
      updateData(ALARMINFO.value, ALARMINFOheader.value, page.value);
      break;
    case "MODEINFO":
      pageCount.value = Math.ceil(MODEINFO.value.length / itemsPerPage.value);
      updateData(MODEINFO.value, MODEINFOheader.value, page.value);
      break;
    case "COM":
      pageCount.value = Math.ceil(COM.value.length / itemsPerPage.value);
      updateData(COM.value, COMheader.value, page.value);
      break;
    case "ENGINECONTROL":
      pageCount.value = Math.ceil(
        ENGINECONTROL.value.length / itemsPerPage.value
      );
      updateData(ENGINECONTROL.value, ENGINECONTROLheader.value, page.value);
      break;
    case "RUDDERCONTROL":
      pageCount.value = Math.ceil(
        RUDDERCONTROL.value.length / itemsPerPage.value
      );
      updateData(RUDDERCONTROL.value, RUDDERCONTROLheader.value, page.value);
      break;
    case "SHORE_MODE_REQUEST":
      pageCount.value = Math.ceil(
        SHORE_MODE_REQUEST.value.length / itemsPerPage.value
      );
      updateData(
        SHORE_MODE_REQUEST.value,
        SHORE_MODE_REQUESTheader.value,
        page.value
      );
      break;
    case "SHORE_ENGINE_CONTROL":
      pageCount.value = Math.ceil(
        SHORE_ENGINE_CONTROL.value.length / itemsPerPage.value
      );
      updateData(
        SHORE_ENGINE_CONTROL.value,
        SHORE_ENGINE_CONTROLheader.value,
        page.value
      );
      break;
    case "SHORE_RUDDER_CONTROL":
      pageCount.value = Math.ceil(
        SHORE_RUDDER_CONTROL.value.length / itemsPerPage.value
      );
      updateData(
        SHORE_RUDDER_CONTROL.value,
        SHORE_RUDDER_CONTROLheader.value,
        page.value
      );
      break;
    case "REQUESTCOMMAND_R":
      pageCount.value = Math.ceil(
        REQUESTCOMMAND_R.value.length / itemsPerPage.value
      );
      updateData(
        REQUESTCOMMAND_R.value,
        REQUESTCOMMAND_Rheader.value,
        page.value
      );
      break;
    case "RESPONSECOMMAND_R":
      pageCount.value = Math.ceil(
        RESPONSECOMMAND_R.value.length / itemsPerPage.value
      );
      updateData(
        RESPONSECOMMAND_R.value,
        RESPONSECOMMAND_Rheader.value,
        page.value
      );
      break;
    case "REQUESTCOMMAND_E":
      pageCount.value = Math.ceil(
        REQUESTCOMMAND_E.value.length / itemsPerPage.value
      );
      updateData(
        REQUESTCOMMAND_E.value,
        REQUESTCOMMAND_Eheader.value,
        page.value
      );
      break;
    case "RESPONSECOMMAND_E":
      pageCount.value = Math.ceil(
        RESPONSECOMMAND_E.value.length / itemsPerPage.value
      );
      updateData(
        RESPONSECOMMAND_E.value,
        RESPONSECOMMAND_Eheader.value,
        page.value
      );
      break;
    case "REQUESTCOMMAND_M":
      pageCount.value = Math.ceil(
        REQUESTCOMMAND_M.value.length / itemsPerPage.value
      );
      updateData(
        REQUESTCOMMAND_M.value,
        REQUESTCOMMAND_Mheader.value,
        page.value
      );
      break;
    case "RESPONSECOMMAND_M":
      pageCount.value = Math.ceil(
        RESPONSECOMMAND_M.value.length / itemsPerPage.value
      );
      updateData(
        RESPONSECOMMAND_M.value,
        RESPONSECOMMAND_Mheader.value,
        page.value
      );
      break;

    default:
      console.error("Invalid tab value:", selectedTab);
  }
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

const SITUATIONALheader = ref([]);
const VIRTUALNAVheader = ref([]);
const SITUATIONALAWARENESSheader = ref([]);
const ROUTEDECISIONheader = ref([]);
const MARINEGATEWAYheader = ref([]);
const WAYPOINTheader = ref([]);
const SASheader = ref([]);
const ME1header = ref([]);
const ME2header = ref([]);
const V_NO1ENGINE_PANEL_61444header = ref([]);
const V_NO1ENGINE_PANEL_65262header = ref([]);
const V_NO1ENGINE_PANEL_65263header = ref([]);
const V_NO1ENGINE_PANEL_65271header = ref([]);
const V_NO1ENGINE_PANEL_65270header = ref([]);
const V_NO1ENGINE_PANEL_65360header = ref([]);
const V_NO1ENGINE_PANEL_65361_LAMPheader = ref([]);
const V_NO1ENGINE_PANEL_65272header = ref([]);
const V_NO1ENGINE_PANEL_65253header = ref([]);
const V_NO1ENGINE_PANEL_65276header = ref([]);
const V_NO2ENGINE_PANEL_61444header = ref([]);
const V_NO2ENGINE_PANEL_65262header = ref([]);
const V_NO2ENGINE_PANEL_65263header = ref([]);
const V_NO2ENGINE_PANEL_65271header = ref([]);
const V_NO2ENGINE_PANEL_65270header = ref([]);
const V_NO2ENGINE_PANEL_65360header = ref([]);
const V_NO2ENGINE_PANEL_65361_LAMPheader = ref([]);
const V_NO2ENGINE_PANEL_65272header = ref([]);
const V_NO2ENGINE_PANEL_65253header = ref([]);
const V_NO2ENGINE_PANEL_65276header = ref([]);
const V_NO1ENGINE_PANEL_65361_STATUSheader = ref([]);
const V_NO1ENGINE_PANEL_65378header = ref([]);
const V_NO1ENGINE_PANEL_65376header = ref([]);
const V_NO1ENGINE_PANEL_65379header = ref([]);
const V_NO2ENGINE_PANEL_65361_STATUSheader = ref([]);
const V_NO2ENGINE_PANEL_65378header = ref([]);
const V_NO2ENGINE_PANEL_65376header = ref([]);
const V_NO2ENGINE_PANEL_65379header = ref([]);

const SUBSCRIBELISTheader = ref([]);
const CONNECTSTATEheader = ref([]);
const SYSTEMSTATEheader = ref([]);
const ALARMINFOheader = ref([]);
const MODEINFOheader = ref([]);
const COMheader = ref([]);
const ENGINECONTROLheader = ref([]);
const RUDDERCONTROLheader = ref([]);
const SHORE_MODE_REQUESTheader = ref([]);
const SHORE_ENGINE_CONTROLheader = ref([]);
const SHORE_RUDDER_CONTROLheader = ref([]);

const REQUESTCOMMAND_Rheader = ref([]);
const RESPONSECOMMAND_Rheader = ref([]);
const REQUESTCOMMAND_Eheader = ref([]);
const RESPONSECOMMAND_Eheader = ref([]);
const REQUESTCOMMAND_Mheader = ref([]);
const RESPONSECOMMAND_Mheader = ref([]);

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

const SITUATIONAL = ref([]);
const VIRTUALNAV = ref([]);
const SITUATIONALAWARENESS = ref([]);
const ROUTEDECISION = ref([]);
const MARINEGATEWAY = ref([]);
const WAYPOINT = ref([]);
const SAS = ref([]);
const ME1 = ref([]);
const ME2 = ref([]);
const V_NO1ENGINE_PANEL_61444 = ref([]);
const V_NO1ENGINE_PANEL_65262 = ref([]);
const V_NO1ENGINE_PANEL_65263 = ref([]);
const V_NO1ENGINE_PANEL_65271 = ref([]);
const V_NO1ENGINE_PANEL_65270 = ref([]);
const V_NO1ENGINE_PANEL_65360 = ref([]);
const V_NO1ENGINE_PANEL_65361_LAMP = ref([]);
const V_NO1ENGINE_PANEL_65272 = ref([]);
const V_NO1ENGINE_PANEL_65253 = ref([]);
const V_NO1ENGINE_PANEL_65276 = ref([]);
const V_NO2ENGINE_PANEL_61444 = ref([]);
const V_NO2ENGINE_PANEL_65262 = ref([]);
const V_NO2ENGINE_PANEL_65263 = ref([]);
const V_NO2ENGINE_PANEL_65271 = ref([]);
const V_NO2ENGINE_PANEL_65270 = ref([]);
const V_NO2ENGINE_PANEL_65360 = ref([]);
const V_NO2ENGINE_PANEL_65361_LAMP = ref([]);
const V_NO2ENGINE_PANEL_65272 = ref([]);
const V_NO2ENGINE_PANEL_65253 = ref([]);
const V_NO2ENGINE_PANEL_65276 = ref([]);
const V_NO1ENGINE_PANEL_65361_STATUS = ref([]);
const V_NO1ENGINE_PANEL_65378 = ref([]);
const V_NO1ENGINE_PANEL_65376 = ref([]);
const V_NO1ENGINE_PANEL_65379 = ref([]);
const V_NO2ENGINE_PANEL_65361_STATUS = ref([]);
const V_NO2ENGINE_PANEL_65378 = ref([]);
const V_NO2ENGINE_PANEL_65376 = ref([]);
const V_NO2ENGINE_PANEL_65379 = ref([]);

const SUBSCRIBELIST = ref([]);
const CONNECTSTATE = ref([]);
const SYSTEMSTATE = ref([]);
const ALARMINFO = ref([]);
const MODEINFO = ref([]);
const COM = ref([]);
const ENGINECONTROL = ref([]);
const RUDDERCONTROL = ref([]);
const SHORE_MODE_REQUEST = ref([]);
const SHORE_ENGINE_CONTROL = ref([]);
const SHORE_RUDDER_CONTROL = ref([]);

const REQUESTCOMMAND_R = ref([]);
const RESPONSECOMMAND_R = ref([]);
const REQUESTCOMMAND_E = ref([]);
const RESPONSECOMMAND_E = ref([]);
const REQUESTCOMMAND_M = ref([]);
const RESPONSECOMMAND_M = ref([]);

const dataHandlers = {
  "dgps/gll": { header: GLLheader, data: GLL },
  "dgps/gga": { header: GGAheader, data: GGA },
  "dgps/rmc": { header: RMCheader, data: RMC },
  "dgps/vtg": { header: VTGheader, data: VTG },
  "dgps/zda": { header: ZDAheader, data: ZDA },
  "dgps/gsv": { header: GSVheader, data: GSV },
  "dgps/gsa": { header: GSAheader, data: GSA },
  "gyro/hdt": { header: HDTheader, data: HDT },
  "gyro/rot": { header: ROTheader, data: ROT },
  "anemometer/mwv": { header: MWVheader, data: MWV },
  "radar/screen": {
    header: RADAR_SCREENheader,
    data: RADAR_SCREEN,
  },
  "ais/vdm": { header: VDMheader, data: VDM },
  "ais/vdo": { header: VDOheader, data: VDO },
  "ecdis/routeinfo": {
    header: ROUTEINFOheader,
    data: ROUTEINFO,
  },
  "ecdis/waypoints": {
    header: WAYPOINTSheader,
    data: WAYPOINTS,
  },
  "ecdis/rtz": { header: RTZheader, data: RTZ },
  "ecdis/screen": {
    header: ECDIS_SCREENheader,
    data: ECDIS_SCREEN,
  },
  "autopilot/rsa": { header: RSAheader, data: RSA },
  "autopilot/htd": { header: HTDheader, data: HTD },
  "speedlog/vbw": { header: VBWheader, data: VBW },
  "speedlog/vhw": { header: VHWheader, data: VHW },
  "speedlog/vlw": { header: VLWheader, data: VLW },
  "canthrottle/canonlinestate": {
    header: CAN_Online_Stateheader,
    data: CAN_Online_State,
  },
  "canthrottle/enginerpm": {
    header: Engine_RPMheader,
    data: Engine_RPM,
  },
  "canthrottle/rudder": {
    header: Rudderheader,
    data: Rudder,
  },
  "canthrottle/rudderscale": {
    header: Rudder_Scaleheader,
    data: Rudder_Scale,
  },
  "autopilotcontact/autopilotcontact": {
    header: AUTOPILOTCONTACTheader,
    data: AUTOPILOTCONTACT,
  },
  "no1enginepanel/no1engine_panel_61444": {
    header: NO1ENGINE_PANEL_61444header,
    data: NO1ENGINE_PANEL_61444,
  },
  "no1enginepanel/no1engine_panel_65262": {
    header: NO1ENGINE_PANEL_65262header,
    data: NO1ENGINE_PANEL_65262,
  },
  "no1enginepanel/no1engine_panel_65263": {
    header: NO1ENGINE_PANEL_65263header,
    data: NO1ENGINE_PANEL_65263,
  },
  "no1enginepanel/no1engine_panel_65272": {
    header: NO1ENGINE_PANEL_65272header,
    data: NO1ENGINE_PANEL_65272,
  },
  "no1enginepanel/no1engine_panel_65271": {
    header: NO1ENGINE_PANEL_65271header,
    data: NO1ENGINE_PANEL_65271,
  },
  "no1enginepanel/no1engine_panel_65253": {
    header: NO1ENGINE_PANEL_65253header,
    data: NO1ENGINE_PANEL_65253,
  },
  "no1enginepanel/no1engine_panel_65270": {
    header: NO1ENGINE_PANEL_65270header,
    data: NO1ENGINE_PANEL_65270,
  },
  "no1enginepanel/no1engine_panel_65276": {
    header: NO1ENGINE_PANEL_65276header,
    data: NO1ENGINE_PANEL_65276,
  },
  "no1enginepanel/no1engine_panel_65360": {
    header: NO1ENGINE_PANEL_65360header,
    data: NO1ENGINE_PANEL_65360,
  },
  "no1enginepanel/no1engine_panel_65361_lamp": {
    header: NO1ENGINE_PANEL_65361_LAMPheader,
    data: NO1ENGINE_PANEL_65361_LAMP,
  },
  "no1enginepanel/no1engine_panel_65361_status": {
    header: NO1ENGINE_PANEL_65361_STATUSheader,
    data: NO1ENGINE_PANEL_65361_STATUS,
  },
  "no1enginepanel/no1engine_panel_65378": {
    header: NO1ENGINE_PANEL_65378header,
    data: NO1ENGINE_PANEL_65378,
  },
  "no1enginepanel/no1engine_panel_65376": {
    header: NO1ENGINE_PANEL_65376header,
    data: NO1ENGINE_PANEL_65376,
  },
  "no1enginepanel/no1engine_panel_65379": {
    header: NO1ENGINE_PANEL_65379header,
    data: NO1ENGINE_PANEL_65379,
  },
  "no2enginepanel/no2engine_panel_61444": {
    header: NO2ENGINE_PANEL_61444header,
    data: NO2ENGINE_PANEL_61444,
  },
  "no2enginepanel/no2engine_panel_65262": {
    header: NO2ENGINE_PANEL_65262header,
    data: NO2ENGINE_PANEL_65262,
  },
  "no2enginepanel/no2engine_panel_65263": {
    header: NO2ENGINE_PANEL_65263header,
    data: NO2ENGINE_PANEL_65263,
  },
  "no2enginepanel/no2engine_panel_65272": {
    header: NO2ENGINE_PANEL_65272header,
    data: NO2ENGINE_PANEL_65272,
  },
  "no2enginepanel/no2engine_panel_65271": {
    header: NO2ENGINE_PANEL_65271header,
    data: NO2ENGINE_PANEL_65271,
  },
  "no2enginepanel/no2engine_panel_65253": {
    header: NO2ENGINE_PANEL_65253header,
    data: NO2ENGINE_PANEL_65253,
  },
  "no2enginepanel/no2engine_panel_65270": {
    header: NO2ENGINE_PANEL_65270header,
    data: NO2ENGINE_PANEL_65270,
  },
  "no2enginepanel/no2engine_panel_65276": {
    header: NO2ENGINE_PANEL_65276header,
    data: NO2ENGINE_PANEL_65276,
  },
  "no2enginepanel/no2engine_panel_65360": {
    header: NO2ENGINE_PANEL_65360header,
    data: NO2ENGINE_PANEL_65360,
  },
  "no2enginepanel/no2engine_panel_65361_lamp": {
    header: NO2ENGINE_PANEL_65361_LAMPheader,
    data: NO2ENGINE_PANEL_65361_LAMP,
  },
  "no2enginepanel/no2engine_panel_65361_status": {
    header: NO2ENGINE_PANEL_65361_STATUSheader,
    data: NO2ENGINE_PANEL_65361_STATUS,
  },
  "no2enginepanel/no2engine_panel_65378": {
    header: NO2ENGINE_PANEL_65378header,
    data: NO2ENGINE_PANEL_65378,
  },
  "no2enginepanel/no2engine_panel_65376": {
    header: NO2ENGINE_PANEL_65376header,
    data: NO2ENGINE_PANEL_65376,
  },
  "no2enginepanel/no2engine_panel_65379": {
    header: NO2ENGINE_PANEL_65379header,
    data: NO2ENGINE_PANEL_65379,
  },
  "MTIE1ISA/SITUATIONAL": {
    header: SITUATIONALheader,
    data: SITUATIONAL,
  },
  "MTIE5VDGS/VIRTUALNAV": {
    header: VIRTUALNAVheader,
    data: VIRTUALNAV,
  },
  "MTIE5DBS/SITUATIONALAWARENESS": {
    header: SITUATIONALAWARENESSheader,
    data: SITUATIONALAWARENESS,
  },
  "MOF1ANS/ROUTEDECISION": {
    header: ROUTEDECISIONheader,
    data: ROUTEDECISION,
  },
  "MOF2SYNC/MARINEGATEWAY": {
    header: MARINEGATEWAYheader,
    data: MARINEGATEWAY,
  },
  "MOF1GNW/WAYPOINT": {
    header: WAYPOINTheader,
    data: WAYPOINT,
  },
  "MTIE5SAS/SAS": {
    header: SASheader,
    data: SAS,
  },
  "MTIE4.XINNOS_STAS/ME1": {
    header: ME1header,
    data: ME1,
  },
  "MTIE4.XINNOS_STAS/ME2": {
    header: ME2header,
    data: ME2,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_61444": {
    header: V_NO1ENGINE_PANEL_61444header,
    data: V_NO1ENGINE_PANEL_61444,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65262": {
    header: V_NO1ENGINE_PANEL_65262header,
    data: V_NO1ENGINE_PANEL_65262,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65263": {
    header: V_NO1ENGINE_PANEL_65263header,
    data: V_NO1ENGINE_PANEL_65263,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65271": {
    header: V_NO1ENGINE_PANEL_65271header,
    data: V_NO1ENGINE_PANEL_65271,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65270": {
    header: V_NO1ENGINE_PANEL_65270header,
    data: V_NO1ENGINE_PANEL_65270,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65360": {
    header: V_NO1ENGINE_PANEL_65360header,
    data: V_NO1ENGINE_PANEL_65360,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_LAMP": {
    header: V_NO1ENGINE_PANEL_65361_LAMPheader,
    data: V_NO1ENGINE_PANEL_65361_LAMP,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65272": {
    header: V_NO1ENGINE_PANEL_65272header,
    data: V_NO1ENGINE_PANEL_65272,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65253": {
    header: V_NO1ENGINE_PANEL_65253header,
    data: V_NO1ENGINE_PANEL_65253,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65276": {
    header: V_NO1ENGINE_PANEL_65276header,
    data: V_NO1ENGINE_PANEL_65276,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_61444": {
    header: V_NO2ENGINE_PANEL_61444header,
    data: V_NO2ENGINE_PANEL_61444,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65262": {
    header: V_NO2ENGINE_PANEL_65262header,
    data: V_NO2ENGINE_PANEL_65262,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65263": {
    header: V_NO2ENGINE_PANEL_65263header,
    data: V_NO2ENGINE_PANEL_65263,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65271": {
    header: V_NO2ENGINE_PANEL_65271header,
    data: V_NO2ENGINE_PANEL_65271,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65270": {
    header: V_NO2ENGINE_PANEL_65270header,
    data: V_NO2ENGINE_PANEL_65270,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65360": {
    header: V_NO2ENGINE_PANEL_65360header,
    data: V_NO2ENGINE_PANEL_65360,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_LAMP": {
    header: V_NO2ENGINE_PANEL_65361_LAMPheader,
    data: V_NO2ENGINE_PANEL_65361_LAMP,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65272": {
    header: V_NO2ENGINE_PANEL_65272header,
    data: V_NO2ENGINE_PANEL_65272,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65253": {
    header: V_NO2ENGINE_PANEL_65253header,
    data: V_NO2ENGINE_PANEL_65253,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65276": {
    header: V_NO2ENGINE_PANEL_65276header,
    data: V_NO2ENGINE_PANEL_65276,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_STATUS": {
    header: V_NO1ENGINE_PANEL_65361_STATUSheader,
    data: V_NO1ENGINE_PANEL_65361_STATUS,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65378": {
    header: V_NO1ENGINE_PANEL_65378header,
    data: V_NO1ENGINE_PANEL_65378,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65376": {
    header: V_NO1ENGINE_PANEL_65376header,
    data: V_NO1ENGINE_PANEL_65376,
  },
  "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65379": {
    header: V_NO1ENGINE_PANEL_65379header,
    data: V_NO1ENGINE_PANEL_65379,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_STATUS": {
    header: V_NO2ENGINE_PANEL_65361_STATUSheader,
    data: V_NO2ENGINE_PANEL_65361_STATUS,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65378": {
    header: V_NO2ENGINE_PANEL_65378header,
    data: V_NO2ENGINE_PANEL_65378,
  },
  "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65376": {
    header: V_NO2ENGINE_PANEL_65376header,
    data: V_NO2ENGINE_PANEL_65376,
  },
  "MTIE4XINNOS_VDGS/NO2ENGINE_PANEL_65379": {
    header: V_NO2ENGINE_PANEL_65379header,
    data: V_NO2ENGINE_PANEL_65379,
  },
  "MANAGEMENT/SUBSCRIBELIST": {
    header: SUBSCRIBELISTheader,
    data: SUBSCRIBELIST,
  },
  "MANAGEMENT/CONNECTSTATE": {
    header: CONNECTSTATEheader,
    data: CONNECTSTATE,
  },
  "MANAGEMENT/SYSTEMSTATE": {
    header: SYSTEMSTATEheader,
    data: SYSTEMSTATE,
  },
  "MANAGEMENT/ALARMINFO": {
    header: ALARMINFOheader,
    data: ALARMINFO,
  },
  "MANAGEMENT/MODEINFO": {
    header: MODEINFOheader,
    data: MODEINFO,
  },
  "MANAGEMENT/COM": {
    header: COMheader,
    data: COM,
  },
  "MANAGEMENT/ENGINECONTROL": {
    header: ENGINECONTROLheader,
    data: ENGINECONTROL,
  },
  "MANAGEMENT/RUDDERCONTROL": {
    header: RUDDERCONTROLheader,
    data: RUDDERCONTROL,
  },
  "MANAGEMENT/SHORE_MODE_REQUEST": {
    header: SHORE_MODE_REQUESTheader,
    data: SHORE_MODE_REQUEST,
  },
  "MANAGEMENT/SHORE_ENGINE_CONTROL": {
    header: SHORE_ENGINE_CONTROLheader,
    data: SHORE_ENGINE_CONTROL,
  },
  "MANAGEMENT/SHORE_RUDDER_CONTROL": {
    header: SHORE_RUDDER_CONTROLheader,
    data: SHORE_RUDDER_CONTROL,
  },
  "RUDDER/REQUESTCOMMAND_R": {
    header: REQUESTCOMMAND_Rheader,
    data: REQUESTCOMMAND_R,
  },
  "RUDDER/RESPONSECOMMAND_R": {
    header: RESPONSECOMMAND_Rheader,
    data: RESPONSECOMMAND_R,
  },
  "ENGINE/REQUESTCOMMAND_E": {
    header: REQUESTCOMMAND_Eheader,
    data: REQUESTCOMMAND_E,
  },
  "ENGINE/RESPONSECOMMAND_E": {
    header: RESPONSECOMMAND_Eheader,
    data: RESPONSECOMMAND_E,
  },
  "MODE/REQUESTCOMMAND_M": {
    header: REQUESTCOMMAND_Mheader,
    data: REQUESTCOMMAND_M,
  },
  "MODE/RESPONSECOMMAND_M": {
    header: RESPONSECOMMAND_Mheader,
    data: RESPONSECOMMAND_M,
  },
};

const switchValue = (axiosItem, dataheader, response) => {
  const handler = dataHandlers[axiosItem];
  if (handler) {
    handler.header.value = dataheader.value;
    handler.data.value = response;
  }
};

const handleSortUpdate = (newOptions) => {
  // 정렬 옵션이 변경될 때 발생하는 이벤트 처리

  // 예를 들어, 다른 이벤트를 호출하거나 특정 동작을 수행할 수 있습니다.
  // 정렬 키와 순서 가져오기
  const sortByKey = newOptions.sortBy && newOptions.sortBy[0]?.key;
  const sortOrder = newOptions.sortBy && newOptions.sortBy[0]?.order;

  switch (selectedData.value[tab.value]) {
    case "GLL":
      sortData(GLL.value, sortByKey, sortOrder);
      break;
    case "GGA":
      sortData(GGA.value, sortByKey, sortOrder);
      break;
    case "RMC":
      sortData(RMC.value, sortByKey, sortOrder);
      break;
    case "VTG":
      sortData(VTG.value, sortByKey, sortOrder);
      break;
    case "ZDA":
      sortData(ZDA.value, sortByKey, sortOrder);
      break;
    case "GSV":
      sortData(GSV.value, sortByKey, sortOrder);
      break;
    case "GSA":
      sortData(GSA.value, sortByKey, sortOrder);
      break;
    case "HDT":
      sortData(HDT.value, sortByKey, sortOrder);
      break;
    case "ROT":
      sortData(ROT.value, sortByKey, sortOrder);
      break;
    case "MWV":
      sortData(MWV.value, sortByKey, sortOrder);
      break;
    case "RADAR_SCREEN":
      sortData(RADAR_SCREEN.value, sortByKey, sortOrder);
      break;
    case "VDM":
      sortData(VDM.value, sortByKey, sortOrder);
      break;
    case "VDO":
      sortData(VDO.value, sortByKey, sortOrder);
      break;
    case "ROUTEINFO":
      sortData(ROUTEINFO.value, sortByKey, sortOrder);
      break;
    case "WAYPOINTS":
      sortData(WAYPOINTS.value, sortByKey, sortOrder);
      break;
    case "RTZ":
      sortData(RTZ.value, sortByKey, sortOrder);
      break;
    case "ECDIS_SCREEN":
      sortData(ECDIS_SCREEN.value, sortByKey, sortOrder);
      break;
    case "RSA":
      sortData(RSA.value, sortByKey, sortOrder);
      break;
    case "HTD":
      sortData(HTD.value, sortByKey, sortOrder);
      break;
    case "VBW":
      sortData(VBW.value, sortByKey, sortOrder);
      break;
    case "VHW":
      sortData(VHW.value, sortByKey, sortOrder);
      break;
    case "VLW":
      sortData(VLW.value, sortByKey, sortOrder);
      break;
    case "CAN_Online_State":
      sortData(CAN_Online_State.value, sortByKey, sortOrder);
      break;
    case "Engine_RPM":
      sortData(Engine_RPM.value, sortByKey, sortOrder);
      break;
    case "Rudder":
      sortData(Rudder.value, sortByKey, sortOrder);
      break;
    case "Rudder_Scale":
      sortData(Rudder_Scale.value, sortByKey, sortOrder);
      break;
    case "AUTOPILOTCONTACT":
      sortData(AUTOPILOTCONTACT.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_61444":
      sortData(NO1ENGINE_PANEL_61444.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65262":
      sortData(NO1ENGINE_PANEL_65262.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65263":
      sortData(NO1ENGINE_PANEL_65263.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65272":
      sortData(NO1ENGINE_PANEL_65272.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65271":
      sortData(NO1ENGINE_PANEL_65271.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65253":
      sortData(NO1ENGINE_PANEL_65253.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65270":
      sortData(NO1ENGINE_PANEL_65270.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65276":
      sortData(NO1ENGINE_PANEL_65276.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65360":
      sortData(NO1ENGINE_PANEL_65360.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65361_LAMP":
      sortData(NO1ENGINE_PANEL_65361_LAMP.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65361_STATUS":
      sortData(NO1ENGINE_PANEL_65361_STATUS.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65378":
      sortData(NO1ENGINE_PANEL_65378.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65376":
      sortData(NO1ENGINE_PANEL_65376.value, sortByKey, sortOrder);
      break;
    case "NO1ENGINE_PANEL_65379":
      sortData(NO1ENGINE_PANEL_65379.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_61444":
      sortData(NO2ENGINE_PANEL_61444.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65262":
      sortData(NO2ENGINE_PANEL_65262.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65263":
      sortData(NO2ENGINE_PANEL_65263.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65272":
      sortData(NO2ENGINE_PANEL_65272.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65271":
      sortData(NO2ENGINE_PANEL_65271.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65253":
      sortData(NO2ENGINE_PANEL_65253.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65270":
      sortData(NO2ENGINE_PANEL_65270.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65276":
      sortData(NO2ENGINE_PANEL_65276.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65360":
      sortData(NO2ENGINE_PANEL_65360.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65361_LAMP":
      sortData(NO2ENGINE_PANEL_65361_LAMP.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65361_STATUS":
      sortData(NO2ENGINE_PANEL_65361_STATUS.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65378":
      sortData(NO2ENGINE_PANEL_65378.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65376":
      sortData(NO2ENGINE_PANEL_65376.value, sortByKey, sortOrder);
      break;
    case "NO2ENGINE_PANEL_65379":
      sortData(NO2ENGINE_PANEL_65379.value, sortByKey, sortOrder);
      break;

    case "SITUATIONAL":
      sortData(SITUATIONAL.value, sortByKey, sortOrder);
      break;
    case "VIRTUALNAV":
      sortData(VIRTUALNAV.value, sortByKey, sortOrder);
      break;
    case "SITUATIONALAWARENESS":
      sortData(SITUATIONALAWARENESS.value, sortByKey, sortOrder);
      break;
    case "ROUTEDECISION":
      sortData(ROUTEDECISION.value, sortByKey, sortOrder);
      break;
    case "MARINEGATEWAY":
      sortData(MARINEGATEWAY.value, sortByKey, sortOrder);
      break;
    case "WAYPOINT":
      sortData(WAYPOINT.value, sortByKey, sortOrder);
      break;
    case "SAS":
      sortData(SAS.value, sortByKey, sortOrder);
      break;
    case "ME1":
      sortData(ME1.value, sortByKey, sortOrder);
      break;
    case "ME2":
      sortData(ME2.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_61444":
      sortData(V_NO1ENGINE_PANEL_61444.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65262":
      sortData(V_NO1ENGINE_PANEL_65262.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65263":
      sortData(V_NO1ENGINE_PANEL_65263.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65271":
      sortData(V_NO1ENGINE_PANEL_65271.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65270":
      sortData(V_NO1ENGINE_PANEL_65270.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65360":
      sortData(V_NO1ENGINE_PANEL_65360.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65361_LAMP":
      sortData(V_NO1ENGINE_PANEL_65361_LAMP.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65272":
      sortData(V_NO1ENGINE_PANEL_65272.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65253":
      sortData(V_NO1ENGINE_PANEL_65253.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65276":
      sortData(V_NO1ENGINE_PANEL_65276.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_61444":
      sortData(V_NO2ENGINE_PANEL_61444.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65262":
      sortData(V_NO2ENGINE_PANEL_65262.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65263":
      sortData(V_NO2ENGINE_PANEL_65263.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65271":
      sortData(V_NO2ENGINE_PANEL_65271.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65270":
      sortData(V_NO2ENGINE_PANEL_65270.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65360":
      sortData(V_NO2ENGINE_PANEL_65360.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65361_LAMP":
      sortData(V_NO2ENGINE_PANEL_65361_LAMP.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65272":
      sortData(V_NO2ENGINE_PANEL_65272.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65253":
      sortData(V_NO2ENGINE_PANEL_65253.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65276":
      sortData(V_NO2ENGINE_PANEL_65276.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65361_STATUS":
      sortData(V_NO1ENGINE_PANEL_65361_STATUS.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65378":
      sortData(V_NO1ENGINE_PANEL_65378.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65376":
      sortData(V_NO1ENGINE_PANEL_65376.value, sortByKey, sortOrder);
      break;
    case "V_NO1ENGINE_PANEL_65379":
      sortData(V_NO1ENGINE_PANEL_65379.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65361_STATUS":
      sortData(V_NO2ENGINE_PANEL_65361_STATUS.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65378":
      sortData(V_NO2ENGINE_PANEL_65378.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65376":
      sortData(V_NO2ENGINE_PANEL_65376.value, sortByKey, sortOrder);
      break;
    case "V_NO2ENGINE_PANEL_65379":
      sortData(V_NO2ENGINE_PANEL_65379.value, sortByKey, sortOrder);
      break;
    case "SUBSCRIBELIST":
      sortData(SUBSCRIBELIST.value, sortByKey, sortOrder);
      break;
    case "CONNECTSTATE":
      sortData(CONNECTSTATE.value, sortByKey, sortOrder);
      break;
    case "SYSTEMSTATE":
      sortData(SYSTEMSTATE.value, sortByKey, sortOrder);
      break;
    case "ALARMINFO":
      sortData(ALARMINFO.value, sortByKey, sortOrder);
      break;
    case "MODEINFO":
      sortData(MODEINFO.value, sortByKey, sortOrder);
      break;
    case "COM":
      sortData(COM.value, sortByKey, sortOrder);
      break;
    case "ENGINECONTROL":
      sortData(ENGINECONTROL.value, sortByKey, sortOrder);
      break;
    case "RUDDERCONTROL":
      sortData(RUDDERCONTROL.value, sortByKey, sortOrder);
      break;
    case "SHORE_MODE_REQUEST":
      sortData(SHORE_MODE_REQUEST.value, sortByKey, sortOrder);
      break;
    case "SHORE_ENGINE_CONTROL":
      sortData(SHORE_ENGINE_CONTROL.value, sortByKey, sortOrder);
      break;
    case "SHORE_RUDDER_CONTROL":
      sortData(SHORE_RUDDER_CONTROL.value, sortByKey, sortOrder);
      break;
    case "REQUESTCOMMAND_R":
      sortData(REQUESTCOMMAND_R.value, sortByKey, sortOrder);
      break;
    case "RESPONSECOMMAND_R":
      sortData(RESPONSECOMMAND_R.value, sortByKey, sortOrder);
      break;
    case "REQUESTCOMMAND_E":
      sortData(REQUESTCOMMAND_E.value, sortByKey, sortOrder);
      break;
    case "RESPONSECOMMAND_E":
      sortData(RESPONSECOMMAND_E.value, sortByKey, sortOrder);
      break;
    case "REQUESTCOMMAND_M":
      sortData(REQUESTCOMMAND_M.value, sortByKey, sortOrder);
      break;
    case "RESPONSECOMMAND_M":
      sortData(RESPONSECOMMAND_M.value, sortByKey, sortOrder);
      break;
    // 다른 데이터에 대한 처리 추가
    // ...
    default:
      console.error("Invalid tab value:", selectedData.value[tab.value]);
  }
};

// main이 변경될 때 select1 배열 업데이트
watchEffect(() => {
  firstSelect.value = []; // 기존 초기화
  firstSelectedItems.value = [];
  if (mainSelectedItems.value.includes("Ship Information")) {
    firstSelect.value.push(
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
      "NO1ENGINEPANEL",
      "NO2ENGINEPANEL"
    );
  }
  if (mainSelectedItems.value.includes("Kass Information")) {
    firstSelect.value.push(
      "MTIE1ISA",
      "MTIE5VDGS",
      "MTIE5DBS",
      "MOF1ANS",
      "MOF2SYNC",
      "MOF1GNW",
      "MTIE5SAS",
      "MTIE4XINNOS_VDGS_EMUL",
      "MTIE4XINNOS_STAS_EMUL",
      "MTIE4XINNOS_STAS",
      "MTIE4XINNOS_VDGS"
    );
  }
  if (mainSelectedItems.value.includes("System Information")) {
    firstSelect.value.push("MANAGEMENT");
    firstSelectedItems.value.push("MANAGEMENT");
  }
  if (mainSelectedItems.value.includes("Control Information")) {
    firstSelect.value.push("RUDDER", "ENGINE", "MODE");
  }
  if (mainSelectedItems.value.includes("관제 Information")) {
    firstSelect.value.push("AIS", "VTS");
  }
});

// select1이 변경될 때 second 배열 업데이트
watchEffect(() => {
  secondSelect.value = []; // 기존 secondSelect 초기화
  contentsSelectedItems.value = [];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ship Infomation
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  if (firstSelectedItems.value.includes("CANTHROTTLE")) {
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
  if (firstSelectedItems.value.includes("NO1ENGINEPANEL")) {
    secondSelect.value.push(
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
      "NO1ENGINE_PANEL_65379"
    );
  }
  if (firstSelectedItems.value.includes("NO2ENGINEPANEL")) {
    secondSelect.value.push(
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
      "NO2ENGINE_PANEL_65379"
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Kass Infomation
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (firstSelectedItems.value.includes("MTIE1ISA")) {
    secondSelect.value.push("SITUATIONAL");
  }
  if (firstSelectedItems.value.includes("MTIE5VDGS")) {
    secondSelect.value.push("VIRTUALNAV");
  }
  if (firstSelectedItems.value.includes("MTIE5DBS")) {
    secondSelect.value.push("SITUATIONALAWARENESS");
  }
  if (firstSelectedItems.value.includes("MOF1ANS")) {
    secondSelect.value.push("ROUTEDECISION");
  }
  if (firstSelectedItems.value.includes("MOF2SYNC")) {
    secondSelect.value.push("MARINEGATEWAY");
  }
  if (firstSelectedItems.value.includes("MTIE5SAS")) {
    secondSelect.value.push("SAS");
  }
  if (firstSelectedItems.value.includes("MTIE4XINNOS_VDGS_EMUL")) {
    secondSelect.value.push(
      "VIRTUALME1_1",
      "VIRTUALME1_2",
      "VIRTUALME1_3",
      "VIRTUALME1_4",
      "VIRTUALME1_5",
      "VIRTUALME1_6",
      "VIRTUALME1_7",
      "VIRTUALME1_8",
      "VIRTUALME1_9",
      "VIRTUALME1_10",
      "VIRTUALME1_11",
      "VIRTUALME1_12",
      "VIRTUALME1_13",
      "VIRTUALME1_14",
      "VIRTUALME2_1",
      "VIRTUALME2_2",
      "VIRTUALME2_3",
      "VIRTUALME2_4",
      "VIRTUALME2_5",
      "VIRTUALME2_6",
      "VIRTUALME2_7",
      "VIRTUALME2_8",
      "VIRTUALME2_9",
      "VIRTUALME2_10",
      "VIRTUALME2_11",
      "VIRTUALME2_12",
      "VIRTUALME2_13",
      "VIRTUALME2_14",
      "VIRTUALMP1_1",
      "VIRTUALMP1_2",
      "VIRTUALMP1_3",
      "VIRTUALMP1_4",
      "VIRTUALMP1_5",
      "VIRTUALMP2_1",
      "VIRTUALMP2_2",
      "VIRTUALMP2_3",
      "VIRTUALMP2_4",
      "VIRTUALMP2_5",
      "VIRTUALPMS_1",
      "VIRTUALPMS_2",
      "VIRTUALPMS_3"
    );
  }
  if (firstSelectedItems.value.includes("MOF1GNW")) {
    secondSelect.value.push("WAYPOINT");
  }
  if (firstSelectedItems.value.includes("MTIE4XINNOS_STAS_EMUL")) {
    secondSelect.value.push("ME1_EMUL", "ME2_EMUL");
  }
  if (firstSelectedItems.value.includes("MTIE4XINNOS_STAS")) {
    secondSelect.value.push("ME1", "ME2");
  }
  if (firstSelectedItems.value.includes("MTIE4XINNOS_VDGS")) {
    secondSelect.value.push(
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
      "NO2ENGINE_PANEL_65379"
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Control Infomation
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (firstSelectedItems.value.includes("RUDDER")) {
    secondSelect.value.push("REQUESTCOMMAND", "RESPONSECOMMAND");
  }
  if (firstSelectedItems.value.includes("ENGINE")) {
    secondSelect.value.push("REQUESTCOMMAND", "RESPONSECOMMAND");
  }
  if (firstSelectedItems.value.includes("MODE")) {
    secondSelect.value.push("REQUESTCOMMAND", "RESPONSECOMMAND");
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // System Infomation
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (firstSelectedItems.value.includes("MANAGEMENT")) {
    secondSelect.value.push(
      "SUBSCRIBELIST",
      "CONNECTSTATE",
      "SYSTEMSTATE",
      "ALARMINFO",
      "MODEINFO",
      "COM",
      "ENGINECONTROL",
      "RUDDERCONTROL",
      "SHORE_MODE_REQUEST",
      "SHORE_ENGINE_CONTROL",
      "SHORE_RUDDER_CONTROL"
    );
  }
});

watch(selectedData, () => {
  tab.value = 0;
});

watch(dateRange, (newValue, oldValue) => {
  searchStart.value = newValue[0].toISOString();
  searchEnd.value = newValue[1].toISOString();
  // 여기에 추가적인 로직을 넣을 수 있습니다.
});

watch(selectedvoyage, (newValue, oldValue) => {
  const index = voyage.value.indexOf(selectedvoyage.value);
  selectedtrialNum.value = index;
  if (newValue === "직접 선택") {
    date_readonly.value = false;
    postType.value = "period";
    console.log("직접 선택");

    date_readonly.value = false;
    searchType.value = "period";
    console.log(dateRange.value[0].toISOString());
    console.log(dateRange.value[1].toISOString());
    if (
      !isNaN(Date.parse(dateRange.value[0])) &&
      !isNaN(Date.parse(dateRange.value[1]))
    ) {
      searchStart.value = dateRange.value[0].toISOString();
      searchEnd.value = dateRange.value[1].toISOString();
    } else {
      // 예외처리: dateRange.value[0] 또는 dateRange.value[1]이 Invalid Date인 경우
      console.error("Invalid date values in dateRange");
    }
  } else {
    date_readonly.value = true;
    postType.value = "seatrial";
    console.log("직접 선택이 아님");

    const index = voyage.value.indexOf(selectedvoyage.value);
    date_readonly.value = true;
    searchType.value = "seatrial";

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

const sortData = (data, sortByKey, sortOrder) => {
  if (!data || !data.length || !sortByKey) {
    return;
  }

  data.sort((a, b) => {
    const valueA = a[sortByKey];
    const valueB = b[sortByKey];

    // 숫자로 변환 가능한지 체크
    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);

    // 숫자로 변환 가능한 경우
    if (valueA == numA && valueB == numB) {
      console.log("숫자");
      if (sortOrder === "asc") {
        return numA - numB;
      } else if (sortOrder === "desc") {
        return numB - numA;
      }
    } else {
      console.log("문자");
      // 숫자로 변환 불가능한 경우, 문자열로 정렬
      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else if (sortOrder === "desc") {
        return valueB.localeCompare(valueA);
      }
    }

    // 기본적으로 정렬하지 않음
    return 0;
  });
};
</script>

<style scoped>

.all-app {
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

.auto-width {
  width: auto;
}
</style>

<style>
.pagination-center {
  margin: -50 auto;
}


</style>
