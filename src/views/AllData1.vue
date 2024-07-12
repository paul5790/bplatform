<template>
  <!-- 전체화면 패딩100px -->
  <div style="height: 93vh">
    <div style="padding: 30px; padding-bottom: 0px">
      <!-- 데이터 선택창 -->

      <v-card-actions>
        <v-card
          ref="searchCard"
          style="
            position: absolute;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1100;
            width: 70%;
            height: 75px;
            overflow: visible;
          "
        >
          <v-card-text style="padding-bottom: 0px">
            <div style="display: flex; gap: 16px">
              <v-text-field
                v-model="textboxs.tb1"
                density="compact"
                append-inner-icon="mdi-roman-numeral-3"
                label="ShipData"
                variant="outlined"
                readonly
                @click="
                  (SelectedDataCardVisible = true),
                    (SelectedContentsCardVisible = false),
                    (DataTypeCardVisible = false),
                    (periodSettingCardVisible = false)
                "
                class="custom-text-field"
              ></v-text-field>
              <v-text-field
                v-model="textboxs.tb2"
                body-1
                density="compact"
                append-inner-icon="mdi-roman-numeral-1"
                label="Main Component"
                variant="outlined"
                readonly
                @click="
                  (SelectedDataCardVisible = false),
                    (SelectedContentsCardVisible = true),
                    (DataTypeCardVisible = false),
                    (periodSettingCardVisible = false)
                "
                class="custom-text-field"
              ></v-text-field>
              <v-text-field
                v-model="textboxs.tb3"
                density="compact"
                append-inner-icon="mdi-roman-numeral-2"
                label="Sub Component"
                variant="outlined"
                readonly
                @click="
                  (SelectedDataCardVisible = false),
                    (SelectedContentsCardVisible = false),
                    (DataTypeCardVisible = true),
                    (periodSettingCardVisible = false)
                "
                class="custom-text-field"
              ></v-text-field>
              <v-text-field
                v-model="textboxs.tb4"
                density="compact"
                append-inner-icon="mdi-calendar-range"
                label="Data Scope"
                variant="outlined"
                readonly
                @click="
                  (SelectedDataCardVisible = false),
                    (SelectedContentsCardVisible = false),
                    (DataTypeCardVisible = false),
                    (periodSettingCardVisible = true)
                "
                class="custom-text-field"
              ></v-text-field>
              <v-btn color="#5865f2" variant="flat" width="10%" height="40px"
                >검색</v-btn
              >
              <v-btn
                @click="test()"
                color="#5865f2"
                variant="flat"
                width="1%"
                height="40px"
                >test</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
        <!-- --------------------------시험, 날짜 기간 검색------------------------------- -->

        <!-- 0번째 데이터 타입 선택 카드 -->
        <v-card
          v-if="SelectedDataCardVisible"
          style="
            position: absolute;
            top: 180px;
            left: 15%;
            z-index: 1100;
            width: 27%;
            overflow: visible;
          "
        >
          <v-card-title>
            <span>Data</span>
          </v-card-title>
          <v-card-text>
            <div
              class="destination-container"
              style="
                margin-bottom: 15px;
                display: flex;
                justify-content: center;
              "
            >
              <v-btn
                :class="{ 'selected-button': ShipData === '선내 데이터' }"
                width="43%"
                style="flex: 1; margin: 0 10px"
                variant="outlined"
                class="secondBtn"
                @click="toggleSelectShipData('ship')"
              >
                <v-icon v-if="ShipData === '선내 데이터'" left color="red"
                  >mdi-check</v-icon
                >
                선내 데이터 (SHIP)</v-btn
              >
              <v-btn
                :class="{
                  'selected-button': ShipData === '관제 데이터',
                }"
                width="43%"
                style="flex: 1; margin: 0 10px"
                variant="outlined"
                class="secondBtn"
                @click="toggleSelectShipData('vts')"
              >
                <v-icon v-if="ShipData === '관제 데이터'" left color="red"
                  >mdi-check</v-icon
                >
                관제 데이터 (VTS)</v-btn
              >
            </div>
            <v-divider></v-divider>
            <div class="chip-container">
              <div class="recent-search">
                <p style="height: 20px"></p>
              </div>
              <v-btn
                color="#5865f2"
                width="100px"
                variant="flat"
                @click="completeData0()"
                style="position: absolute; right: 16px; bottom: 8px"
                >선택</v-btn
              >
            </div>
          </v-card-text>
        </v-card>

        <!-- 1번째 데이터 선택 카드 -->
        <v-card
          v-if="SelectedContentsCardVisible"
          style="
            position: absolute;
            top: 180px;
            left: 33%;
            z-index: 1100;
            width: 50%;
            overflow: visible;
          "
        >
          <v-card-title>
            <span>Data Select</span>
          </v-card-title>
          <v-card-text>
            <div class="destination-container">
              <v-list class="category-list category-list">
                <v-list-item-group v-model="selectedCategory">
                  <v-list-item
                    v-for="(category, index) in categories"
                    :key="index"
                    @click="toggleCategory(index)"
                    :class="{ 'selected-item': selectedCategory === index }"
                  >
                    <v-list-item-title>{{ category }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-list
                class="destination-list destination-list scrollable-card-1"
              >
                <v-list-item-group v-model="selectedDestination">
                  <v-list-item
                    v-for="(destination, index) in filteredDestinations"
                    :key="index"
                    @click="toggleDestination(destination)"
                    :class="{
                      'selected-item': selectedDestination === destination,
                    }"
                  >
                    <v-list-item-title>{{
                      destination.name
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-list
                class="destination-list destination-list scrollable-card-1"
              >
                <v-list-item-group multiple v-model="selectedItems">
                  <v-list-item
                    v-for="(subItem, index) in subItems"
                    :key="index"
                    @click="toggleSubItem(subItem)"
                    :class="{
                      'selected-item': selectedItems.includes(subItem),
                    }"
                  >
                    <v-list-item-title>{{ subItem }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
            <v-divider></v-divider>
            <div class="chip-container">
              <div class="recent-search">
                <h4>조회 데이터</h4>
                <v-chip
                  v-for="(search, index) in recentSearches"
                  :key="index"
                  close
                  @click="handleChipClick(search)"
                  class="chip-item"
                >
                  {{ search }}
                </v-chip>
              </div>
              <v-btn
                color="#5865f2"
                width="100px"
                variant="flat"
                @click="completeData1()"
                style="position: absolute; right: 16px; bottom: 8px"
                >선택</v-btn
              >
            </div>
          </v-card-text>
        </v-card>

        <!-- 2번째 데이터 타입 선택 카드 -->
        <v-card
          v-if="DataTypeCardVisible"
          style="
            position: absolute;
            top: 180px;
            left: 50%;
            z-index: 1100;
            width: 27%;
            overflow: visible;
          "
        >
          <v-card-title>
            <span>Data Format</span>
          </v-card-title>
          <v-card-text>
            <div
              class="destination-container"
              style="
                margin-bottom: 15px;
                display: flex;
                justify-content: center;
              "
            >
              <v-btn
                :class="{ 'selected-button': selectDataType === '정형 데이터' }"
                width="43%"
                variant="outlined"
                style="flex: 1; margin: 0 10px"
                class="secondBtn"
                @click="toggleSelectDataType('정형 데이터')"
              >
                <v-icon v-if="selectDataType === '정형 데이터'" left color="red"
                  >mdi-check</v-icon
                >
                정형 데이터 (TABLE)</v-btn
              >
              <v-btn
                :class="{
                  'selected-button': selectDataType === '비정형 데이터',
                }"
                width="43%"
                variant="outlined"
                style="flex: 1; margin: 0 10px"
                class="secondBtn"
                @click="toggleSelectDataType('비정형 데이터')"
              >
                <v-icon
                  v-if="selectDataType === '비정형 데이터'"
                  left
                  color="red"
                  >mdi-check</v-icon
                >
                비정형 데이터 (JSON)</v-btn
              >
            </div>
            <v-divider></v-divider>
            <div class="chip-container">
              <div class="recent-search">
                <p style="height: 20px"></p>
              </div>
              <v-btn
                color="#5865f2"
                width="100px"
                variant="flat"
                @click="completeData2()"
                style="position: absolute; right: 16px; bottom: 8px"
                >선택</v-btn
              >
            </div>
          </v-card-text>
        </v-card>

        <!-- 3번째 항차, 기간 선택 카드 -->
        <v-card
          v-if="periodSettingCardVisible"
          :style="{
            position: 'absolute',
            top: '180px',
            left: selectedTest === 0 ? '67.5%' : '76.55%',
            zIndex: 1100,
            width: selectedTest === 0 ? '35%' : '17%',
            overflow: 'visible',
            transform: 'translateX(-50%)',
          }"
        >
          <v-card-title>
            <span>Data Period</span>
          </v-card-title>
          <v-card-text>
            <div class="destination-container" style="margin-bottom: 15px">
              <v-list
                class="scrollable-card-1"
                :style="{
                  height: selectedTest === 0 ? '370px' : '250px',
                  width: selectedTest === 0 ? '30%' : '100%',
                  borderRight: '1px solid #e0e0e0',
                }"
              >
                <v-list-item-group v-model="selectedTest">
                  <v-list-item
                    v-for="(category, index) in testList"
                    :key="index"
                    @click="selectTest(index, category)"
                    :class="{ 'selected-item': selectedTest === index }"
                  >
                    <v-list-item-title>{{ category }}</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <div
                v-if="selectedTest === 0"
                :style="{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '70%',
                }"
              >
                <VueDatePicker
                  v-model="dateRange"
                  :inline="true"
                  select-text="apply"
                  density="compact"
                  range
                  style="--dp-input-padding: 8px; width: auto"
                  @update:model-value="handleDateChange"
                />
              </div>
            </div>
            <v-divider></v-divider>
            <div class="chip-container">
              <v-btn
                color="#5865f2"
                width="100px"
                variant="flat"
                @click="completeData3()"
                style="position: absolute; right: 16px; bottom: 8px"
                >선택</v-btn
              >
            </div>
            <div class="chip-container">
              <div class="recent-search">
                <h4>조회 기간</h4>
                <v-chip
                  v-if="searchTimeRange"
                  close
                  @click="handleChipClick(search)"
                  class="chip-item"
                >
                  {{ searchTimeRange }}
                </v-chip>
              </div>
              <v-btn
                color="#5865f2"
                width="100px"
                variant="flat"
                @click="completeData3()"
                style="position: absolute; right: 16px; bottom: 8px"
                >선택</v-btn
              >
            </div>
          </v-card-text>
        </v-card>

        <v-spacer></v-spacer>
      </v-card-actions>

      <v-container>
        <v-tabs v-model="activeTab">
          <v-tab v-for="(data, index) in dataKeys" :key="index">{{
            data
          }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="(data, index) in dataKeys" :key="index">
            <template v-if="activeTab === index">
            <v-data-table
              :headers="headers[data].text"
              :items="dataTables[data]"
              class="elevation-1"
            ></v-data-table>
            </template>
          </v-tab-item>
        </v-tabs-items>
      </v-container>

      <!-- 데이터 다운로드 -->
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

    <v-dialog v-model="searchDataDialog" max-width="1200">
      <v-card>
        <v-card-text>
          <v-row style="margin-top: 30px">
            <v-col cols="6">
              <v-select
                v-model="mainSelectedItems"
                :items="mainSelect"
                label="Main Components"
                variant="outlined"
              >
              </v-select>
            </v-col>
            <!-- 첫번째 선택박스 -->
            <v-col cols="6">
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
          </v-row>
          <v-row>
            <!-- 두번째 선택박스 -->
            <v-col cols="6">
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
            <v-col cols="6">
              <v-select
                v-model="contentsSelectedItems"
                :items="secondSelect"
                label="Contents"
                variant="outlined"
                multiple
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedvoyage"
                :items="voyage"
                label="voyage"
                variant="outlined"
              >
              </v-select>
            </v-col>

            <!-- 날짜 설정 -->
            <v-col cols="6">
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
          </v-row>
          <v-row>
            <!-- 검색 버튼 -->
            <v-col cols="4"></v-col>
            <v-col cols="4">
              <v-btn
                class=""
                :color="btnColor"
                style="
                  display: flex;
                  margin-top: 2px;
                  height: 50px;
                  width: 800px;
                "
                @click="searchData()"
                >검색</v-btn
              >
            </v-col>
            <v-col cols="4"></v-col>
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
import { ref, computed, watch, onMounted } from "vue";
import {
  readTrialData,
  readDataTrial,
  readDataDate,
  downloadDataFile,
  cancelDownload,
} from "../api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";
import "@/styles/datepicker-theme.css";

// 토큰
const tokenid = ref(sessionStorage.getItem("token") || "");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 데이터 선택창
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// text field
const textboxs = ref({
  tb1: "",
  tb2: "",
  tb3: "",
  tb4: "",
});

// for API Request variable
const requests = ref({
  type: "",
  data: "",
  period: "",
  index: "",
  signal: "",
});

// Main Component Card View
const SelectedDataCardVisible = ref(false);
const SelectedContentsCardVisible = ref(false);
const DataTypeCardVisible = ref(false);
const periodSettingCardVisible = ref(false);

const selectedCategory = ref(null);
const selectedDestination = ref(null);
const selectedItems = ref([]);
const subItems = ref([]);
const searchTarget = ref([]);

const selectedHour = ref(6);
const selectedMinute = ref(19);

// ------------------- 0번째 데이터 선정 Method ------------------------ //
const ShipData = ref();

const toggleSelectShipData = (data) => {
  if (data === "ship") {
    ShipData.value = "선내 데이터";
  } else if (data === "vts") {
    ShipData.value = "관제 데이터";
  } else {
    console.log("있을 수 없는 일 ㅋ");
  }
  console.log(selectDataType.value);
};

// ------------------- 1번째 데이터 선정 Method ------------------------ //

const categories = ref([
  "Ship Information",
  "Kass Information",
  "System Information",
  "Ctrl Information",
]);

// SubComponents List
const destinations = ref([
  // { name: "로스앤젤레스, CA", code: "LAX", category: 1 },
  // { name: "뉴욕 / 존 F 케네디, NY", code: "JFK", category: 3 },
  // { name: "샌프란시스코, CA", code: "SFO", category: 3 },
  // { name: "시애틀, WA", code: "SEA", category: 3 },
  // { name: "호놀룰루, HI", code: "HNL", category: 3 },
  { name: "GYRO", category: 0 },
  { name: "DGPS", category: 0 },
  { name: "ANEMOMETER", category: 0 },
  { name: "RADAR", category: 0 },
  { name: "AIS", category: 0 },
  { name: "ECDIS", category: 0 },
  { name: "AUTOPILOT", category: 0 },
  { name: "SPEEDLOG", category: 0 },
  { name: "CANTHROTTLE", category: 0 },
  { name: "AUTOPILOTCONTACT", category: 0 },
  { name: "NO1ENGINEPANEL", category: 0 },
  { name: "NO2ENGINEPANEL", category: 0 },

  { name: "MTIE1ISA", category: 1 },
  { name: "MTIE5VDGS", category: 1 },
  { name: "MTIE5DBS", category: 1 },
  { name: "MOF1ANS", category: 1 },
  { name: "MOF2SYNC", category: 1 },
  { name: "MOF1GNW", category: 1 },
  { name: "MTIE5SAS", category: 1 },
  { name: "MTIE4XINNOS_VDGS_EMUL", category: 1 },
  { name: "MTIE4XINNOS_STAS_EMUL", category: 1 },
  { name: "MTIE4XINNOS_STAS", category: 1 },
  { name: "MTIE4XINNOS_VDGS", category: 1 },

  { name: "MANAGEMENT", category: 2 },

  { name: "RUDDER", category: 3 },
  { name: "ENGINE", category: 3 },
  { name: "MODE", category: 3 },
  // Add more destinations here with corresponding category
]);
// Contents List
const destinationSubItems = {
  GYRO: ["THS", "HDT", "ROT"],
  DGPS: ["GLL", "GGA", "RMC", "VTG", "ZDA", "DTM", "GSV", "GSA"],
  ANEMOMETER: ["MWV", "MWD", "VWR", "MTW", "VWT"],
  RADAR: ["TTM", "TLL", "RSCREEN"],
  AIS: ["VDM", "VDO"],
  ECDIS: ["VDM", "VDO", "ROUTEINFO", "WAYPOINTS"],
  AUTOPILOT: ["RSA", "HTD"],
  SPEEDLOG: ["VBW", "VHW", "VLW"],
  CANTHROTTLE: ["CAN_Online_State", "Engine_RPM", "Rudder", "Rudder_Scale"],
  AUTOPILOTCONTACT: ["AUTOPILOTCONTACT"],
  NO1ENGINEPANEL: [
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
    "NO.1ENGINE_PANEL_65379",
  ],
  NO2ENGINEPANEL: [
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
    "NO.2ENGINE_PANEL_65379",
  ],

  MTIE1ISA: ["SITUATIONAL"],
  MTIE5VDGS: ["VIRTUALNAV"],
  MTIE5DBS: ["SITUATIONALAWARENESS"],
  MOF1ANS: ["ROUTEDECISION"],
  MOF2SYNC: ["MARINEGATEWAY"],
  MOF1GNW: ["WAYPOINT"],
  MTIE5SAS: ["SAS"],
  MTIE4XINNOS_VDGS_EMUL: [
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
    "VIRTUALPMS_3",
  ],
  MTIE4XINNOS_STAS_EMUL: ["ME1", "ME2"],
  MTIE4XINNOS_STAS: ["ME1", "ME2"],
  MTIE4XINNOS_VDGS: [
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
  ],

  MANAGEMENT: [
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
    "SHORE_RUDDER_CONTROL",
  ],

  RUDDER: ["REQUESTCOMMAND", "RESPONSECOMMAND"],
  ENGINE: ["REQUESTCOMMAND", "RESPONSECOMMAND"],
  MODE: ["REQUESTCOMMAND", "RESPONSECOMMAND"],

  // 필요에 따라 다른 항목 추가
};

const filteredDestinations = computed(() =>
  destinations.value.filter(
    (destination) => destination.category === selectedCategory.value
  )
);

const recentSearches = ref([]);

const toggleCategory = (index) => {
  if (selectedCategory.value === index) {
    selectedCategory.value = null;
    subItems.value = [];
  } else {
    selectedCategory.value = index;
    subItems.value = [];
  }
};

const toggleDestination = (destination) => {
  if (selectedDestination.value === destination) {
    console.log("더블");
    selectedDestination.value = null;
    subItems.value = [];
  } else {
    selectedDestination.value = destination;
    subItems.value = destinationSubItems[destination.name] || [];
    console.log("노블");
  }
};

const removeItemFromArray = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const toggleSubItem = (subItem) => {
  const itemName = `${selectedDestination.value.name}_${subItem}`;
  if (selectedItems.value.includes(subItem)) {
    selectedItems.value = selectedItems.value.filter(
      (item) => item !== subItem
    );
    removeItemFromArray(recentSearches.value, itemName);
    removeItemFromArray(searchTarget.value, itemName);
  } else {
    selectedItems.value.push(subItem);
    if (subItem === "ALL") {
      recentSearches.value.push(`${selectedDestination.value.name}`);
    } else {
      recentSearches.value.push(`${selectedDestination.value.name}_${subItem}`);
      searchTarget.value.push(`${selectedDestination.value.name}_${subItem}`);
    }
  }
};

const handleChipClick = (search) => {
  const [destination, subItem] = search.split("_");
  const destObj = destinations.value.find((dest) => dest.name === destination);

  if (subItem) {
    selectedDestination.value = destObj;
    toggleSubItem(subItem);
  } else {
    toggleDestination(destObj);
  }
};

// ------------------- 2번째 데이터 타입 Method ------------------------ //
const selectDataType = ref(null);

const toggleSelectDataType = (type) => {
  if (type === "정형 데이터") {
    selectDataType.value = "정형 데이터";
  } else if (type === "비정형 데이터") {
    selectDataType.value = "비정형 데이터";
  } else {
    console.log("가능한가?");
  }
  console.log(selectDataType.value);
};

// ------------------- 3번째 데이터 기간 Method ------------------------ //
// 초기 날짜 설정
const dateRange = ref(); // 초기 날짜를 설정합니다
const startUtc = ref(); //검색용 직접선택 시작시간
const endUtc = ref(); //검색용 직접선택 종료시간

const testList = ref(["직접 선택"]);
const selectedTest = ref();
const testStartTimeList = ref([]);
const testEndTimeList = ref([]);

const searchTimeRange = ref(null); //null로 변경

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      testStartTimeList.value.push(`${response[i].startTimeUtc}`);
      testEndTimeList.value.push(`${response[i].endTimeUtc}`);
      const testNumber = response[i].testNumber;
      testList.value.push(`항차 ${testNumber}번`);
    }
  } catch (error) {
    console.error(error);
  }
};

const selectTest = (index, category) => {
  selectedTest.value = index;
  if (index == 0) {
    handleDateChange();
  } else {
    searchTimeRange.value = category;
  }
};

const handleDateChange = () => {
  if (dateRange.value) {
    startUtc.value = dateRange.value[0].toISOString();
    endUtc.value = dateRange.value[1].toISOString();

    searchTimeRange.value = `${startUtc.value} - ${endUtc.value}`;
  } else {
    searchTimeRange.value = "날짜를 선택 후 apply를 클릭하세요.";
  }
};

// ------------------- Complete Method ------------------------ //
const completeData0 = () => {
  // 데이터 선택 박스 text 할당
  textboxs.value.tb1 = ShipData.value;

  // 검색 조건 할당
  requests.value.data =
    ShipData.value === "선내 데이터" ? "information" : "vts";

  // 다음 선택 시, 다음 조건 CardView로 이동
  SelectedDataCardVisible.value = false;
  SelectedContentsCardVisible.value = true;
};

const completeData1 = () => {
  // 데이터 선택 박스 text 할당
  textboxs.value.tb2 = searchTarget.value[0];

  let signalParams = "";

  for (let i = 0; i < recentSearches.value.length; i++) {
    signalParams += `&signal_name=${recentSearches.value[i]}`;
  }

  requests.value.signal = signalParams;

  console.log(requests.value.signal);

  // 다음 선택 시, 다음 조건 CardView로 이동
  SelectedContentsCardVisible.value = false;
  DataTypeCardVisible.value = true;
};

const completeData2 = () => {
  // 데이터 선택 박스 text 할당
  textboxs.value.tb3 = selectDataType.value;

  // 검색 조건 할당
  requests.value.type =
    selectDataType.value === "정형 데이터" ? "table_data" : "collection_data";

  // 다음 선택 시, 다음 조건 CardView로 이동
  DataTypeCardVisible.value = false;
  periodSettingCardVisible.value = true;
};

const completeData3 = () => {
  // 데이터 선택 박스 text 할당
  textboxs.value.tb4 = searchTimeRange.value;

  if (selectedTest.value === 0) {
    // 직접 선택이라면
    requests.value.period = `period?start_utctime=${startUtc.value}&end_utctime=${endUtc.value}`;
  } else {
    // 시험 선택이라면
    requests.value.period = `test?test_number=${selectedTest.value}`;
  }

  // 다음 선택 시, 다음 조건 CardView로 이동
  periodSettingCardVisible.value = false;

  if (
    textboxs.value.tb1 &&
    textboxs.value.tb2 &&
    textboxs.value.tb3 &&
    textboxs.value.tb4
  ) {
    console.log("모든 텍스트 박스가 빈 값이 아닙니다.");
    let apiReq = `table_data        /       information    /   test?test_number=2     &signal_name=ais_vdo&signal_name=ais_vdm`;
    apiReq = `${requests.value.type}/${requests.value.data}/${requests.value.period}${requests.value.signal}`;
    console.log(apiReq);
  }
};

// Test 중
const activeTab = ref(0);
const dataTables = ref({});
const dataKeys = ref([]);
const headers = ref({});

const test = async () => {
  let apiReq = `table_data/information/period?start_utctime=2023-08-08T08:34:28.488521Z&end_utctime=2023-08-08T08:45:38.739842Z&signal_name=ais_vdm&signal_name=ais_vdo`;
  const response = await readDataTrial(tokenid.value, apiReq);
  console.log(response);
  processData(response);
};

const processData = (response) => {
  dataKeys.value = Object.keys(response);
  dataKeys.value.forEach((key) => {
    if (response[key].length > 0) {
      headers.value[key] = Object.keys(response[key][0]).map((field) => ({
        text: field,
        value: field,
        class: `header-${field.toLowerCase()}` // 클래스 이름 추가
      }));
    }
    dataTables.value[key] = response[key];
  });
};

//

const windowClick = () => {
  SelectedDataCardVisible.value = false;
  SelectedContentsCardVisible.value = false;
  DataTypeCardVisible.value = false;
  periodSettingCardVisible.value = false;
};

////////////////////// watch //////////////////////
watch(selectedCategory, (newVal) => {
  //console.log("1 : " + newVal);
});

watch(selectedDestination, (newVal) => {
  // console.log("2 : " + selectedDestination.value.name);
});

watch(selectedItems.value, (newVal) => {
  console.log("3 : " + selectedItems.value);
});

watch(recentSearches.value, (newVal) => {
  console.log("z" + selectedItems.value);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 데이터 검색 및 저장
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//----------------------데이터 검색--------------------------//

onMounted(() => {
  getTrialDate();
  sessionStorage.setItem("page", "데이터 조회");
});
</script>

<style scoped>
.selected-item {
  background-color: #d0d0d0;
}

.all-app {
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
}

.destination-container {
  display: flex;
}

.category-list {
  width: 30%;
  border-right: 1px solid #e0e0e0;
}

.category-list40 {
  width: 40%;
  border-right: 1px solid #e0e0e0;
}

.destination-list {
  width: 35%;
  height: 350px;
}

.recent-search {
  margin-top: 16px;
}

.custom-text-field {
  width: 300px !important;
}

.destination-container > .v-list {
  margin-right: 10px;
}

.chip-container .v-chip {
  margin-right: 10px;
}
.chip-item {
  margin-top: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.secondBtn {
  margin-right: 20px;
  height: 40px;
}

.selected-button {
  border: 1px solid red;
  color: red;
}

/* Select 버튼을 숨기는 스타일 */
.vue3-date-picker__actions {
  display: none !important;
}

.vue3-date-picker__select-button {
  display: none !important;
}

.v-data-table__wrapper {
  overflow-x: auto;
}

.v-tabs .v-tab {
  text-transform: none;
}

.header-timestamp_equipment,
.header-timestamp_publish {
  min-width: 200px;
  /* 필요한 경우 더 조정할 수 있습니다 */
}

</style>

<style>
.pagination-center {
  margin: -50 auto;
}
</style>
