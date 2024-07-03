<template>
  <!-- 전체화면 패딩100px -->
  <div style="height: 93vh">
    <div style="padding: 30px; padding-bottom: 0px">
      <!-- 데이터 선택창 -->

      <v-card-actions>
        <!-- --------------------------시험, 날짜 기간 검색------------------------------- -->
        <v-card
          ref="searchCard"
          style="
            position: absolute;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1100;
            width: 70%;
            height: 150px;
            overflow: visible;
          "
        >
          <v-card-text>
            <!-- 여기에 검색 창 컨텐츠를 추가하세요 -->
            <v-tabs v-model="tabs">
              <v-tab :value="1">선내 데이터</v-tab>
              <v-tab :value="2">관제 데이터 </v-tab>
            </v-tabs>
            <v-tabs-window v-model="tabs">
              <v-tabs-window-item :value="1">
                <v-card>
                  <v-card-text style="padding-bottom: 0px">
                    <div style="display: flex; gap: 16px">
                      <v-text-field
                        style="padding-bottom: 0px"
                        v-model="MainComponent"
                        body-1
                        density="compact"
                        append-inner-icon="mdi-roman-numeral-1"
                        label="Main Component"
                        variant="outlined"
                        readonly
                        class="custom-text-field"
                      ></v-text-field>
                      <v-text-field
                        v-model="SubComponent"
                        density="compact"
                        append-inner-icon="mdi-roman-numeral-2"
                        label="Sub Component"
                        variant="outlined"
                        class="custom-text-field"
                      ></v-text-field>
                      <v-text-field
                        v-model="Contents"
                        density="compact"
                        append-inner-icon="mdi-roman-numeral-3"
                        label="Contents"
                        variant="outlined"
                        class="custom-text-field"
                      ></v-text-field>
                      <v-text-field
                        v-model="DataScope"
                        density="compact"
                        append-inner-icon="mdi-calendar-range"
                        label="Data Scope"
                        variant="outlined"
                        class="custom-text-field"
                      ></v-text-field>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tabs-window-item>
              <v-tabs-window-item :value="2">
                <v-card> </v-card>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
        </v-card>

        <v-card
          v-if="MainComponentCardVisible"
          style="
            position: absolute;
            top: 260px;
            left: 15%;
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
                <h4>최근 검색</h4>
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
                variant="flat"
                @click="completeData()"
                style="position: absolute; right: 16px; bottom: 8px"
                >선택</v-btn
              >
            </div>
          </v-card-text>
        </v-card>

        <v-spacer></v-spacer>
      </v-card-actions>

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
                style="
                  padding-top: 5px;
                  padding-bottom: 10px;
                  background-image: url('/image/kriso_kren.png');
                  background-size: auto 85%;
                  background-position: top center;
                  background-repeat: no-repeat;
                "
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
                      variant="solo-inverted"
                      style="
                        max-width: 70px;
                        margin-left: 10px;
                        text-align: center;
                      "
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
import { ref, computed, watch } from "vue";

const tabs = ref();

const MainComponent = ref();
const SubComponent = ref();
const Contents = ref();
const DataScope = ref();

// Main Component Card View
const MainComponentCardVisible = ref(true);
const selectedCategory = ref(null);
const selectedDestination = ref(null);
const selectedItems = ref([]);
const subItems = ref([]);

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

const toggleSubItem = (subItem) => {
  if (selectedItems.value.includes(subItem)) {
    selectedItems.value = selectedItems.value.filter(
      (item) => item !== subItem
    );
    const index = recentSearches.value.indexOf(
      `${selectedDestination.value.name}_${subItem}`
    );
    if (index > -1) {
      recentSearches.value.splice(index, 1);
    }
  } else {
    selectedItems.value.push(subItem);
    if (subItem === "ALL") {
      recentSearches.value.push(`${selectedDestination.value.name}`);
    } else {
      recentSearches.value.push(`${selectedDestination.value.name}_${subItem}`);
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

// ------------------- Complete Method ------------------------ //



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

.destination-list {
  width: 35%;
  height: 250px;
}

.recent-search {
  margin-top: 16px;
}

.custom-text-field {
  width: 300px !important;
  font-size: 8px !important;
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
</style>

<style>
.pagination-center {
  margin: -50 auto;
}
</style>
