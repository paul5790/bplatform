<template>
  <!-- 전체화면 패딩100px -->
  <div class="my-app">
    <!-- 데이터 선택창 -->
    <v-sheet style="height: 7vh; display: flex">
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="selectedvoyage"
            :items="voyage"
            label="voyage"
            variant="outlined"
          >
          </v-select>
        </v-col>
        <!-- 첫번째 선택박스 -->
        <v-col cols="2">
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

        <!-- 날짜 설정 -->
        <v-col cols="3">
          <VueDatePicker
            style="--dp-input-padding: 15px"
            v-model="date"
            range
          />
        </v-col>

        <!-- 검색 버튼 -->
        <v-col cols="2">
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

    <!-- 탭 기능 구현 -->
    <v-tabs
      style="height: 5vh; margin-left: 15px"
      v-model="tab"
      color="#009dff"
      align-tabs="start"
    >
      <!-- for문 사용해서 탭 늘리기 -->
      <v-tab :value="index" v-for="(item, index) in selectedData" :key="index">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      style="
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        height: 72vh;
      "
    >
      <v-window-item
        v-for="(item, index) in selectedData"
        :key="index"
        :value="index"
      >
        <v-card style="flex: 1">
          <v-card-item>
            <v-data-table
              v-model="selectedData"
              v-model:page="page"
              :items-per-page="itemsPerPage"
              density="compact"
              class="elevation-1"
              :headers="headerName"
              :items="dataSet"
              :search="searchData"
              item-value="name"
              return-object
              style="height: 70vh"
            >
              <template v-slot:bottom>
                <div class="text-center pt-2">
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                    :total-visible="8"
                  ></v-pagination>
                </div>
              </template>
            </v-data-table>
          </v-card-item>
        </v-card>
      </v-window-item>
    </v-window>

    <div
      class="d-flex align-center justify-space-around pa-4"
      style="justify-content: flex-end"
    >
      <v-btn color="blue" @click="dataDownload">데이터 다운로드</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import axios from "axios";

const tab = ref(0);
// const initializeData = () => {
//   // contentsSelectedItems에 따라 데이터 초기화
//   fetchData();
// };

const itemsPerPage = ref(10);
const page = ref(1);

const pageCount = computed(() => {
  return Math.ceil(dataSet.value.length / itemsPerPage.value);
});

const allData = ref([
  {
    name: "GLL",
    top: "DGPS",
    info: "GPS 수신기의 현재 위치를 위도와 경도로 표현하는 역할을 합니다.",
  },
  {
    name: "GGA",
    top: "DGPS",
    info: "현재 위치, 위성 신호 품질, 해발고도 등의 정보를 제공하는 역할을 합니다.",
  },
  {
    name: "RMC",
    top: "DGPS",
    info: "GPS 수신기의 권장 최소 탐색 정보를 제공합니다.",
  },
  {
    name: "VTG",
    top: "DGPS",
    info: "현재 이동 방향과 지상 속도를 나타냅니다.",
  },
]);

// 항차 선택
const voyage = ref([
  "시운전1",
  "시운전2",
  "시운전3",
  "시운전4",
  "시운전5",
  "시운전6",
  "시운전7",
]);

const selectedvoyage = ref();

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
    secondSelect.value.push(
      "GLL",
      "GGA",
      "RMC",
      "VTG",
      "ZDA",
      "DTM",
      "GSV",
      "GSA"
    );
  }
  if (firstSelectedItems.value.includes("GYRO")) {
    secondSelect.value.push("THS", "HDT", "ROT");
  }
  if (firstSelectedItems.value.includes("ANEMOMETER")) {
    secondSelect.value.push("MWV", "MWD", "VWR", "MTW");
  }
  if (firstSelectedItems.value.includes("RADAR")) {
    secondSelect.value.push("TTM", "TLL", "RSCREEN");
  }
  if (firstSelectedItems.value.includes("AIS")) {
    secondSelect.value.push("VDM", "VDO");
  }
  if (firstSelectedItems.value.includes("ECDIS")) {
    secondSelect.value.push("ROUTEINFO", "WAYPOINTS", "ESCREEN");
  }
  if (firstSelectedItems.value.includes("AUTOPILOT")) {
    secondSelect.value.push("RSA", "HTD", "MODE");
  }
  if (firstSelectedItems.value.includes("SPEEDLOG")) {
    secondSelect.value.push("VBW", "VHW", "VLW");
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

// 데이트 피커
const date = ref();

const startDate = new Date();
const endDate = new Date();
onMounted(() => {
  date.value = [startDate, endDate];
});

// 데이터 다운로드
const dataDownload = () => {
  alert("다운로드 시작");
};

// 데이터 조회

const headerName = ref([]); // 빈 배열로 초기화
const dataSet = ref([]); // 빈 배열로 초기화
const selectedData = ref([]); //

const fetchData = async () => {
  try {
    const response = await axios.post(
      "http://192.168.0.73:8080/data/dgps/gll/1"
    );
    console.log(response.data);

    const dataheader = ref(
      Object.keys(response.data[0]).map((key) => ({
        title: key,
        align: "start",
        key,
      }))
    );

    if (dataheader.value == null) {
      console.log("null");
    } else {
      console.log(dataheader.value);
      GLLheader.value = dataheader.value;
    }

    GLL.value = response.data;
    console.log(`${response.data[0]} dataheaderdata!!`);
    console.log(`${response.data} responsedata!!`);
  } catch (error) {
    console.error(error);
  }
};

// 초기 데이터 요청 및 주기적 데이터 업데이트 설정
fetchData(); // 초기 데이터 요청

const ftchData = () => {
  // console.log(`${contentsSelectedItems.value[`${tab.value}`]}`);
  // console.log(GLL.value);
  // dataSet.value = GLL.value;
  const selectedTab = contentsSelectedItems.value[tab.value];

  // Find the selected data based on the tab value
  switch (selectedTab) {
    case "GLL":
      dataSet.value = GLL.value;
      headerName.value = GLLheader.value;
      break;
    case "GGA":
      dataSet.value = GGA.value;
      headerName.value = GGAheader.value;
      break;
    case "RMC":
      dataSet.value = RMC.value;
      headerName.value = RMCheader.value;
      break;
    case "VTG":
      dataSet.value = VTG.value;
      headerName.value = VTGheader.value;
      break;
    case "ZDA":
      dataSet.value = ZDA.value;
      headerName.value = ZDAheader.value;
      break;
    case "DTM":
      dataSet.value = DTM.value;
      headerName.value = DTMheader.value;
      break;
    case "GSV":
      dataSet.value = GSV.value;
      headerName.value = GSVheader.value;
      break;
    case "GSA":
      dataSet.value = GSA.value;
      headerName.value = GSAheader.value;
      break;
    case "THS":
      dataSet.value = THS.value;
      headerName.value = THSheader.value;
      break;
    case "HDT":
      dataSet.value = HDT.value;
      headerName.value = HDTheader.value;
      break;
    case "ROT":
      dataSet.value = ROT.value;
      headerName.value = ROTheader.value;
      break;
    case "MWV":
      dataSet.value = MWV.value;
      headerName.value = MWVheader.value;
      break;
    case "MWD":
      dataSet.value = MWD.value;
      headerName.value = MWDheader.value;
      break;
    case "VWR":
      dataSet.value = VWR.value;
      headerName.value = VWRheader.value;
      break;
    case "MTW":
      dataSet.value = MTW.value;
      headerName.value = MTWheader.value;
      break;
    case "VWT":
      dataSet.value = VWT.value;
      headerName.value = VWTheader.value;
      break;
    case "TTM":
      dataSet.value = TTM.value;
      headerName.value = TTMheader.value;
      break;
    case "TLL":
      dataSet.value = TLL.value;
      headerName.value = TLLheader.value;
      break;
    case "RSCREEN":
      dataSet.value = RSCREEN.value;
      headerName.value = RSCREENheader.value;
      break;
    case "VDM":
      dataSet.value = VDM.value;
      headerName.value = VDMheader.value;
      break;
    case "VDO":
      dataSet.value = VDO.value;
      headerName.value = VDOheader.value;
      break;
    case "ROUTEINFO":
      dataSet.value = ROUTEINFO.value;
      headerName.value = ROUTEINFOheader.value;
      break;
    case "WAYPOINTS":
      dataSet.value = WAYPOINTS.value;
      headerName.value = WAYPOINTSheader.value;
      break;
    case "ESCREEN":
      dataSet.value = ESCREEN.value;
      headerName.value = ESCREENheader.value;
      break;
    case "RSA":
      dataSet.value = RSA.value;
      headerName.value = RSAheader.value;
      break;
    case "MODE":
      dataSet.value = MODE.value;
      headerName.value = MODEheader.value;
      break;
    case "HTD":
      dataSet.value = HTD.value;
      headerName.value = HTDheader.value;
      break;
    case "VBW":
      dataSet.value = VBW.value;
      headerName.value = VBWheader.value;
      break;
    case "VHW":
      dataSet.value = VHW.value;
      headerName.value = VHWheader.value;
      break;
    case "VLW":
      dataSet.value = VLW.value;
      headerName.value = VLWheader.value;
      break;
    case "NO.1ENGINE_PANEL_61444":
      dataSet.value = NO1ENGINE_PANEL_61444.value;
      headerName.value = NO1ENGINE_PANEL_61444header.value;
      break;
    case "NO.1ENGINE_PANEL_65262":
      dataSet.value = NO1ENGINE_PANEL_65262.value;
      headerName.value = NO1ENGINE_PANEL_65262header.value;
      break;
    case "NO.1ENGINE_PANEL_65263":
      dataSet.value = NO1ENGINE_PANEL_65263.value;
      headerName.value = NO1ENGINE_PANEL_65263header.value;
      break;
    case "NO.1ENGINE_PANEL_65272":
      dataSet.value = NO1ENGINE_PANEL_65272.value;
      headerName.value = NO1ENGINE_PANEL_65272header.value;
      break;
    case "NO.1ENGINE_PANEL_65271":
      dataSet.value = NO1ENGINE_PANEL_65271.value;
      headerName.value = NO1ENGINE_PANEL_65271header.value;
      break;
    case "NO.1ENGINE_PANEL_65253":
      dataSet.value = NO1ENGINE_PANEL_65253.value;
      headerName.value = NO1ENGINE_PANEL_65253header.value;
      break;
    case "NO.1ENGINE_PANEL_65270":
      dataSet.value = NO1ENGINE_PANEL_65270.value;
      headerName.value = NO1ENGINE_PANEL_65270header.value;
      break;
    case "NO.1ENGINE_PANEL_65276":
      dataSet.value = NO1ENGINE_PANEL_65276.value;
      headerName.value = NO1ENGINE_PANEL_65276header.value;
      break;
    case "NO.1ENGINE_PANEL_65360":
      dataSet.value = NO1ENGINE_PANEL_65360.value;
      headerName.value = NO1ENGINE_PANEL_65360header.value;
      break;
    case "NO.1ENGINE_PANEL_65361_LAMP":
      dataSet.value = NO1ENGINE_PANEL_65361_LAMP.value;
      headerName.value = NO1ENGINE_PANEL_65361_LAMPheader.value;
      break;
    case "NO.1ENGINE_PANEL_65361_STATUS":
      dataSet.value = NO1ENGINE_PANEL_65361_STATUS.value;
      headerName.value = NO1ENGINE_PANEL_65361_STATUSheader.value;
      break;
    case "NO.1ENGINE_PANEL_65378":
      dataSet.value = NO1ENGINE_PANEL_65378.value;
      headerName.value = NO1ENGINE_PANEL_65378header.value;
      break;
    case "NO.1ENGINE_PANEL_65376":
      dataSet.value = NO1ENGINE_PANEL_65376.value;
      headerName.value = NO1ENGINE_PANEL_65376header.value;
      break;
    case "NO.1ENGINE_PANEL_65379":
      dataSet.value = NO1ENGINE_PANEL_65379.value;
      headerName.value = NO1ENGINE_PANEL_65379header.value;
      break;
    case "NO.2ENGINE_PANEL_61444":
      dataSet.value = NO2ENGINE_PANEL_61444.value;
      headerName.value = NO2ENGINE_PANEL_61444header.value;
      break;
    case "NO.2ENGINE_PANEL_65262":
      dataSet.value = NO2ENGINE_PANEL_65262.value;
      headerName.value = NO2ENGINE_PANEL_65262header.value;
      break;
    case "NO.2ENGINE_PANEL_65263":
      dataSet.value = NO2ENGINE_PANEL_65263.value;
      headerName.value = NO2ENGINE_PANEL_65263header.value;
      break;
    case "NO.2ENGINE_PANEL_65272":
      dataSet.value = NO2ENGINE_PANEL_65272.value;
      headerName.value = NO2ENGINE_PANEL_65272header.value;
      break;
    case "NO.2ENGINE_PANEL_65271":
      dataSet.value = NO2ENGINE_PANEL_65271.value;
      headerName.value = NO2ENGINE_PANEL_65271header.value;
      break;
    case "NO.2ENGINE_PANEL_65253":
      dataSet.value = NO2ENGINE_PANEL_65253.value;
      headerName.value = NO2ENGINE_PANEL_65253header.value;
      break;
    case "NO.2ENGINE_PANEL_65270":
      dataSet.value = NO2ENGINE_PANEL_65270.value;
      headerName.value = NO2ENGINE_PANEL_65270header.value;
      break;
    case "NO.2ENGINE_PANEL_65276":
      dataSet.value = NO2ENGINE_PANEL_65276.value;
      headerName.value = NO2ENGINE_PANEL_65276header.value;
      break;
    case "NO.2ENGINE_PANEL_65360":
      dataSet.value = NO2ENGINE_PANEL_65360.value;
      headerName.value = NO2ENGINE_PANEL_65360header.value;
      break;
    case "NO.2ENGINE_PANEL_65361_LAMP":
      dataSet.value = NO2ENGINE_PANEL_65361_LAMP.value;
      headerName.value = NO2ENGINE_PANEL_65361_LAMPheader.value;
      break;
    case "NO.2ENGINE_PANEL_65361_STATUS":
      dataSet.value = NO2ENGINE_PANEL_65361_STATUS.value;
      headerName.value = NO2ENGINE_PANEL_65361_STATUSheader.value;
      break;
    case "NO.2ENGINE_PANEL_65378":
      dataSet.value = NO2ENGINE_PANEL_65378.value;
      headerName.value = NO2ENGINE_PANEL_65378header.value;
      break;
    case "NO.2ENGINE_PANEL_65376":
      dataSet.value = NO2ENGINE_PANEL_65376.value;
      headerName.value = NO2ENGINE_PANEL_65376header.value;
      break;
    case "NO.2ENGINE_PANEL_65379":
      dataSet.value = NO2ENGINE_PANEL_65379.value;
      headerName.value = NO2ENGINE_PANEL_65379header.value;
      break;
    default:
      console.error("Invalid tab value:", selectedTab);
  }
};

const initializeData = () => {
  // dataSet.value = []; // dataSet 초기화
};
watchEffect(() => {
  // ftchData(); // Fetch data when selected items change
  initializeData();
});

// 검색 이벤트
const searchData = () => {
  selectedData.value = [];
  selectedData.value = contentsSelectedItems.value;
  // fetchData(); // 초기 데이터 요청
  ftchData(); // Fetch data when selected items change
};

const GLLheader = ref([]);
const GGAheader = ref([]);
const RMCheader = ref([]);
const VTGheader = ref([]);
const ZDAheader = ref([]);
const DTMheader = ref([]);
const GSVheader = ref([]);
const GSAheader = ref([]);
const THSheader = ref([]);
const HDTheader = ref([]);
const ROTheader = ref([]);
const MWVheader = ref([]);
const MWDheader = ref([]);
const VWRheader = ref([]);
const MTWheader = ref([]);
const VWTheader = ref([]);
const TTMheader = ref([]);
const TLLheader = ref([]);
const RSCREENheader = ref([]);
const VDMheader = ref([]);
const VDOheader = ref([]);
const ROUTEINFOheader = ref([]);
const WAYPOINTSheader = ref([]);
const ESCREENheader = ref([]);
const RSAheader = ref([]);
const MODEheader = ref([]);
const HTDheader = ref([]);
const VBWheader = ref([]);
const VHWheader = ref([]);
const VLWheader = ref([]);
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
const DTM = ref([]);
const GSV = ref([]);
const GSA = ref([]);
const THS = ref([]);
const HDT = ref([]);
const ROT = ref([]);
const MWV = ref([]);
const MWD = ref([]);
const VWR = ref([]);
const MTW = ref([]);
const VWT = ref([]);
const TTM = ref([]);
const TLL = ref([]);
const RSCREEN = ref([]);
const VDM = ref([]);
const VDO = ref([]);
const ROUTEINFO = ref([]);
const WAYPOINTS = ref([]);
const ESCREEN = ref([]);
const RSA = ref([]);
const MODE = ref([]);
const HTD = ref([]);
const VBW = ref([]);
const VHW = ref([]);
const VLW = ref([]);
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
</script>

<style scoped>
.my-app {
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
  height: 93vh;
}
</style>
