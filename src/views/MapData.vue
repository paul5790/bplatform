<template>
  <div
    style="padding: 0px; position: relative; height: 93vh; overflow: visible"
  >
    <div id="map" style="height: 100%"></div>
    <v-btn
      icon="mdi-magnify"
      color="primary"
      fab
      @click="searchCardVisible = true"
      style="position: absolute; bottom: 16px; right: 16px; z-index: 1000"
    ></v-btn>

    <!-- --------------------------시험, 날짜 기간 검색------------------------------- -->
    <v-card
      v-if="sliderCardVisible"
      style="
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1100;
        width: 700px;
        overflow: visible;
      "
    >
      <v-card-title>
        <span>Time Slider</span>
      </v-card-title>
      <v-card-text style="padding-top: 0; padding-bottom: 0">
        <!-- 여기에 검색 창 컨텐츠를 추가하세요 -->
        <div style="position: relative; z-index: 1200">
          <v-slider
            v-model="sliderValue"
            step="1"
            :max="AisData.length - 1"
            thumb-label="always"
            class="custom-slider"
            @change="onSliderChange"
          >
            <template v-slot:thumb-label="{ modelValue }">
              <span class="thumb-label">{{
                timeData[Math.min(Math.floor(modelValue), timeData.length - 1)]
              }}</span>
            </template>
          </v-slider>
        </div>
      </v-card-text>
    </v-card>

    <!-- --------------------------시험, 날짜 기간 검색------------------------------- -->
    <v-card
      v-if="searchCardVisible"
      ref="searchCard"
      @mousedown="startDrag($event, 'searchCard')"
      style="
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 1100;
        width: 350px;
        overflow: visible;
      "
    >
      <v-card-title>
        <span>검색</span>
        <p
          @click="searchCardVisible = false"
          style="position: absolute; top: 3px; right: 8px"
        >
          <v-icon>mdi-close</v-icon>
        </p>
      </v-card-title>
      <v-card-text>
        <!-- 여기에 검색 창 컨텐츠를 추가하세요 -->
        <div style="position: relative; z-index: 1200">
          <v-select
            v-model="selectedtrialrun"
            :items="trialrun"
            label="시험 선택"
            variant="outlined"
            class="custom-select"
          ></v-select>
          <VueDatePicker
            :class="themeMode === 'dark' ? 'dp__theme_dark' : 'dp__theme_light'"
            style="--dp-input-padding: 15px"
            v-model="dateRange"
            range
            :dark="themeMode === 'dark'"
            :readonly="date_readonly"
          />
          <p style="font-size: 12px; font-weight: bold">
            &nbsp;&nbsp;* 날짜 검색은 한국 표준시를 기준으로 작성하며,
          </p>
          <p style="font-size: 12px; font-weight: bold">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;데이터는 UTC 기준으로 보여짐
          </p>
          <v-btn style="margin-top: 20px" @click="testCardVisible = true"
            >검색하기</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <!-- --------------------------항적, 웨이포인트 리스트 표출------------------------------- -->
    <v-card
      v-if="testCardVisible"
      ref="testCard"
      @mousedown="startDrag($event, 'testCard')"
      style="
        position: absolute;
        top: 316px;
        right: 16px;
        z-index: 1100;
        width: 350px;
        overflow: visible;
      "
    >
      <v-card-title>
        <span>시험 선택</span>
        <p
          @click="testCardVisible = false"
          style="position: absolute; top: 3px; right: 8px"
        >
          <v-icon>mdi-close</v-icon>
        </p>
      </v-card-title>
      <v-card-text>
        <!-- 여기에 검색 창 컨텐츠를 추가하세요 -->
        <div style="position: relative; z-index: 1200">
          <v-checkbox
            v-model="selectedTest"
            color="red"
            label="빨간항차"
            value="red"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedTest"
            color="yellow"
            label="노란항차"
            value="yellow"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedTest"
            color="blue"
            label="blue항차"
            value="blue"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedTest"
            color="green"
            label="green항차"
            value="green"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedTest"
            color="black"
            label="black항차"
            value="black"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="selectedTest"
            color="brown"
            label="brown항차"
            value="brown"
            hide-details
          ></v-checkbox>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogVisible" max-width="300">
      <v-card>
        <v-card-title class="headline">알림</v-card-title>
        <v-card-text>최대 5개까지 선택할 수 있습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogVisible = false"
            >확인</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import L from "leaflet";
import { ref, toRefs, onMounted, defineProps, watch } from "vue";
import { readTrialData } from "../api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";

const tokenid = ref(sessionStorage.getItem("token") || "");
const searchCardVisible = ref(false);
const testCardVisible = ref(false);
const sliderCardVisible = ref(true);
const searchCard = ref(null);
const testCard = ref(null);

let map = null;

// ----------------------------Slider Bar--------------------------------//
const sliderValue = ref(0);
const timeData = ref([]);

const scenario = ref({
  0: "1",
  1: "2",
  2: "3",
  3: "4",
  4: "5",
  5: "6",
  6: "7",
  7: "8",
  8: "9",
  9: "10",
  10: "11",
});

let currentPolyline;

watch(sliderValue, (newVal) => {
  aisMapping(newVal);
});

// ----------------------------select Bar--------------------------------//

// trial
const trialrun = ref(["직접 선택"]);
const selectedtrialrun = ref(null);
const selectedtrialNum = ref();
const setStartTime = ref([]);
const setEndTime = ref([]);

// date Picker
const date_readonly = ref(true);
const dateRange = ref([]);

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      setStartTime.value.push(`${response[i].startTimeUtc}`);
      setEndTime.value.push(`${response[i].endTimeUtc}`);
      selectedtrialNum.value = i + 1;
      trialrun.value.push(`항차 ${i + 1}번`);
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(getTrialDate);

watch(selectedtrialrun, (newVal) => {
  if (newVal == "직접 선택") {
    date_readonly.value = false;
  } else {
    date_readonly.value = true;
  }
});

// ---------------------------- Test CardView --------------------------------//

const AisData = [
  {
    latitude: "35.290000",
    longitude: "129.260000",
    test: "1",
    scenario: "1",
    type: "Menual",
    time: "2020-08-12T08:44:62.151235Z",
  },
  {
    latitude: "35.245678",
    longitude: "129.300888",
    test: "1",
    scenario: "1",
    type: "Menual",
    time: "2020-08-12T08:44:63.151235Z",
  },
  {
    latitude: "35.24878",
    longitude: "129.330888",
    test: "1",
    scenario: "1",
    type: "Menual",
    time: "2020-08-12T08:44:64.151235Z",
  },
  {
    latitude: "35.25978",
    longitude: "129.350888",
    test: "1",
    scenario: "1",
    type: "Menual",
    time: "2020-08-12T08:44:65.151235Z",
  },
  {
    latitude: "35.25978",
    longitude: "129.350888",
    test: "1",
    scenario: "2",
    type: "Auto",
    time: "2020-08-12T08:44:66.151235Z",
  },
  {
    latitude: "35.26978",
    longitude: "129.360888",
    test: "1",
    scenario: "2",
    type: "Auto",
    time: "2020-08-12T08:44:67.151235Z",
  },
  {
    latitude: "35.296000",
    longitude: "129.450000",
    test: "1",
    scenario: "2",
    type: "Auto",
    time: "2020-08-12T08:44:68.151235Z",
  },
  {
    latitude: "35.296000",
    longitude: "129.450000",
    test: "1",
    scenario: "3",
    type: "Remote",
    time: "2020-08-12T08:44:69.151235Z",
  },
  {
    latitude: "35.286000",
    longitude: "129.440000",
    test: "1",
    scenario: "3",
    type: "Remote",
    time: "2020-08-12T08:44:70.151235Z",
  },
  {
    latitude: "35.286000",
    longitude: "129.440000",
    test: "1",
    scenario: "4",
    type: "Menual",
    time: "2020-08-12T08:44:71.151235Z",
  },
  {
    latitude: "35.286000",
    longitude: "129.470000",
    test: "1",
    scenario: "4",
    type: "Menual",
    time: "2020-08-12T08:44:72.151235Z",
  },
  {
    latitude: "35.286000",
    longitude: "129.470000",
    test: "1",
    scenario: "5",
    type: "Remote",
    time: "2020-08-12T08:44:73.151235Z",
  },
  {
    latitude: "35.285000",
    longitude: "129.484000",
    test: "1",
    scenario: "5",
    type: "Remote",
    time: "2020-08-12T08:44:74.151235Z",
  },
  {
    latitude: "35.285000",
    longitude: "129.484000",
    test: "1",
    scenario: "6",
    type: "Auto",
    time: "2020-08-12T08:44:75.151235Z",
  },
  {
    latitude: "35.281000",
    longitude: "129.498000",
    test: "1",
    scenario: "6",
    type: "Auto",
    time: "2020-08-12T08:44:76.151235Z",
  },
  {
    latitude: "35.270000",
    longitude: "129.474000",
    test: "1",
    scenario: "6",
    type: "Auto",
    time: "2020-08-12T08:44:77.151235Z",
  },
  {
    latitude: "35.257000",
    longitude: "129.492000",
    test: "1",
    scenario: "6",
    type: "Auto",
    time: "2020-08-12T08:44:78.151235Z",
  },
  {
    latitude: "35.257000",
    longitude: "129.492000",
    test: "1",
    scenario: "7",
    type: "Menual",
    time: "2020-08-12T08:44:79.151235Z",
  },
  {
    latitude: "35.252000",
    longitude: "129.477000",
    test: "1",
    scenario: "7",
    type: "Menual",
    time: "2020-08-12T08:44:80.151235Z",
  },
  {
    latitude: "35.243000",
    longitude: "129.471000",
    test: "1",
    scenario: "7",
    type: "Menual",
    time: "2020-08-12T08:44:81.151235Z",
  },
  {
    latitude: "35.243000",
    longitude: "129.471000",
    test: "1",
    scenario: "8",
    type: "Menual",
    time: "2020-08-12T08:44:82.151235Z",
  },
  {
    latitude: "35.240000",
    longitude: "129.441000",
    test: "1",
    scenario: "8",
    type: "Auto",
    time: "2020-08-12T08:44:83.151235Z",
  },
  {
    latitude: "35.240000",
    longitude: "129.441000",
    test: "1",
    scenario: "9",
    type: "Auto",
    time: "2020-08-12T08:44:84.151235Z",
  },
  {
    latitude: "35.237000",
    longitude: "129.351000",
    test: "1",
    scenario: "9",
    type: "Auto",
    time: "2020-08-12T08:44:85.151235Z",
  },
  {
    latitude: "35.222000",
    longitude: "129.342000",
    test: "1",
    scenario: "9",
    type: "Remote",
    time: "2020-08-12T08:44:86.151235Z",
  },
  {
    latitude: "35.222000",
    longitude: "129.342000",
    test: "1",
    scenario: "10",
    type: "Remote",
    time: "2020-08-12T08:44:87.151235Z",
  },
  {
    latitude: "35.232000",
    longitude: "129.332000",
    test: "1",
    scenario: "10",
    type: "Menual",
    time: "2020-08-12T08:44:88.151235Z",
  },
  {
    latitude: "35.212000",
    longitude: "129.322000",
    test: "1",
    scenario: "10",
    type: "Menual",
    time: "2020-08-12T08:44:89.151235Z",
  },
  {
    latitude: "35.227000",
    longitude: "129.312000",
    test: "1",
    scenario: "10",
    type: "Remote",
    time: "2020-08-12T08:44:90.151235Z",
  },
  {
    latitude: "35.217000",
    longitude: "129.292000",
    test: "1",
    scenario: "10",
    type: "Remote",
    time: "2020-08-12T08:44:91.151235Z",
  },
  {
    latitude: "35.217000",
    longitude: "129.292000",
    test: "1",
    scenario: "11",
    type: "Auto",
    time: "2020-08-12T08:44:92.151235Z",
  },
  {
    latitude: "35.224000",
    longitude: "129.291500",
    test: "1",
    scenario: "11",
    type: "Auto",
    time: "2020-08-12T08:44:93.151235Z",
  },
  {
    latitude: "35.256400",
    longitude: "129.257000",
    test: "1",
    scenario: "11",
    type: "Auto",
    time: "2020-08-12T08:44:94.151235Z",
  },
  {
    latitude: "35.256777",
    longitude: "129.260888",
    test: "1",
    scenario: "11",
    type: "Menual",
    time: "2020-08-12T08:44:95.151235Z",
  },
];

const Waypoint = [
  {
    latitude: "35.25978",
    longitude: "129.350888",
    test: "1",
    scenario: "1",
    type: "Menual",
  },
  {
    latitude: "35.296000",
    longitude: "129.450000",
    test: "1",
    scenario: "2",
    type: "Auto",
  },
  {
    latitude: "35.286000",
    longitude: "129.440000",
    test: "1",
    scenario: "3",
    type: "Remote",
  },
  {
    latitude: "35.286000",
    longitude: "129.470000",
    test: "1",
    scenario: "4",
    type: "Menual",
  },
  {
    latitude: "35.285000",
    longitude: "129.484000",
    test: "1",
    scenario: "5",
    type: "Remote",
  },
  {
    latitude: "35.257000",
    longitude: "129.492000",
    test: "1",
    scenario: "6",
    type: "Auto",
  },
  {
    latitude: "35.243000",
    longitude: "129.471000",
    test: "1",
    scenario: "7",
    type: "Menual",
  },
  {
    latitude: "35.240000",
    longitude: "129.441000",
    test: "1",
    scenario: "8",
    type: "Auto",
  },
  {
    latitude: "35.222000",
    longitude: "129.342000",
    test: "1",
    scenario: "9",
    type: "Remote",
  },
  {
    latitude: "35.217000",
    longitude: "129.292000",
    test: "1",
    scenario: "10",
    type: "Remote",
  },
  {
    latitude: "35.256777",
    longitude: "129.260888",
    test: "1",
    scenario: "11",
    type: "Auto",
  },
];

AisData.forEach((data) => timeData.value.push(data.time));

const selectedTest = ref([]);
const dialogVisible = ref(false);
let currentPolylines = [];
let currentScenario = null;
const aisData = {};
let waypointMarkers = [];
let waypointLine = null;

// 데이터를 가져오는 함수
const fetchData = async () => {
  try {
    AisData.forEach(({ latitude, longitude, type, scenario }) => {
      if (!aisData[scenario]) {
        aisData[scenario] = [];
      }
      aisData[scenario].push([
        parseFloat(latitude),
        parseFloat(longitude),
        type,
      ]);
    });
    console.log(aisData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

watch(selectedTest, (newVal) => {
  if (newVal.length > 5) {
    selectedTest.value.pop(); // 가장 마지막에 추가된 항목 제거
    alert("최대 5개까지 선택할 수 있습니다.");
  }
  console.log(aisData);
});

// 슬라이더 값이 변경될 때 호출되는 함수
const onSliderChange = (newVal) => {
  const index = Math.floor(newVal);
  if (index < 0 || index >= AisData.length) {
    return;
  }
  aisMapping(index);
};

const aisMapping = (index) => {
  if (map && index >= 0 && index < AisData.length) {
    const scenario = AisData[index]?.scenario;

    // 시나리오가 변경되면 기존 폴리라인 제거
    if (currentScenario !== scenario) {
      currentPolylines.forEach((polyline) => map.removeLayer(polyline));
      currentPolylines = [];
      currentScenario = scenario;
    }

    // 현재 시나리오의 데이터를 순차적으로 추가
    const dataToShow = AisData.slice(0, index + 1).filter(
      (data) => data.scenario === scenario
    );

    // 기존 폴리라인 제거
    currentPolylines.forEach((polyline) => map.removeLayer(polyline));
    currentPolylines = [];

    if (dataToShow.length > 0) {
      let latlngs = dataToShow.map((data) => [
        parseFloat(data.latitude),
        parseFloat(data.longitude),
      ]);
      let dashtype;

      if (dataToShow[0].type === "Menual") {
        dashtype = "1";
      } else if (dataToShow[0].type === "Auto") {
        dashtype = "5, 5";
      } else if (dataToShow[0].type === "Remote") {
        dashtype = "10, 5, 1, 5";
      } else {
        dashtype = "1";
      }

      const polyline = L.polyline(latlngs, {
        color: "blue",
        weight: 2,
        dashArray: dashtype,
      }).addTo(map);

      currentPolylines.push(polyline);
    }
  }
};

const addWaypoints = () => {
  Waypoint.forEach((point) => {
    const latlng = [parseFloat(point.latitude), parseFloat(point.longitude)];
    const redIcon = new L.Icon({
      iconUrl: "/image/marker-icon-2x-black.png",
      shadowUrl: "/image/marker-shadow.png",
      iconSize: [12, 20],
      iconAnchor: [7, 20],
      popupAnchor: [1, -34],
      shadowSize: [20, 20],
    });
    const marker = L.marker(latlng, { icon: redIcon })
      .addTo(map)
      .bindPopup(`Scenario: ${point.scenario}`);
    waypointMarkers.push(marker);
  });

  const waypointLatLngs = Waypoint.map((point) => [
    parseFloat(point.latitude),
    parseFloat(point.longitude),
  ]);
  waypointLine = L.polyline(waypointLatLngs, {
    color: "black",
    weight: 0.2,
  }).addTo(map);
};

// ---------------------------- Map View --------------------------------//

onMounted(() => {
  // 지도 초기화
  map = L.map("map").setView([35.29, 129.26], 10);

  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const shipIcon = new L.Icon({
    iconUrl: "/image/ShipImg32.png",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });

  L.marker([35.27678, 129.315888], { icon: shipIcon })
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

  addWaypoints();
  aisMapping(sliderValue.value);
});

// const aisMapping = (newVal) => {
//   if (map) {
//     if (currentPolyline) {
//       map.removeLayer(currentPolyline);
//     }

//     // newVal 값에 해당하는 aisData를 가져옵니다.
//     const data = aisData[newVal + 1];
//     // 폴리라인을 그립니다.
//     if (data) {
//       let dashtype;

//       // 색상에 따른 dashArray 값을 설정합니다.
//       if (data[0][2] === "Menual") {
//         // blue와 green을 나타내는 예시
//         dashtype = "1";
//       } else if (data[0][2] === "Auto") {
//         // brown과 black을 나타내는 예시
//         dashtype = "5, 5";
//       } else if (data[0][2] === "Remote") {
//         // brown과 black을 나타내는 예시
//         dashtype = "10, 5, 1, 5";
//       } else {
//         dashtype = "1";
//       }

//       currentPolyline = L.polyline(data, {
//         color: "blue",
//         weight: 2,
//         dashArray: dashtype,
//       }).addTo(map);
//     }
//   }
// };

const startDrag = (event, cardName) => {
  let card;
  if (cardName === "searchCard") card = searchCard;
  else if (cardName === "testCard") card = testCard;

  const cardElement = card.value.$el;
  const initialX = event.clientX;
  const initialY = event.clientY;
  const rect = cardElement.getBoundingClientRect();
  const offsetX = initialX - rect.left + 60;
  const offsetY = initialY - rect.top + 65;

  const onMouseMove = (moveEvent) => {
    cardElement.style.left = `${moveEvent.clientX - offsetX}px`;
    cardElement.style.top = `${moveEvent.clientY - offsetY}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
</script>

<style scoped>
/* 추가: 마커의 스타일을 지정하는 CSS */
.custom-slider .thumb-label {
  font-size: 14px; /* Adjust the font size as needed */
  padding: 8px;
  max-width: 150px; /* Adjust the max width as needed */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-marker {
  width: 20px;
  height: 20px;
  margin: -10px -10px;
}

.marker-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
