<template>
  <div
    style="padding: 0px; position: relative; height: 93vh; overflow: visible"
  >
    <div id="map" style="height: 100%"></div>
    <v-btn
      icon="mdi-magnify"
      color="primary"
      fab
      @click="(searchCardVisible = true), (metadataCardVisible = false)"
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
            :max="maxValue - 1"
            thumb-label="always"
            class="custom-slider"
            @change="onSliderChange"
          >
            <template v-slot:thumb-label="{ modelValue }">
              <span class="thumb-label">{{
                timeData[
                  Math.min(Math.floor(modelValue), timeData.length - 1) + 1
                ]
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
          <v-btn @click="searchMapdata()">검색하기</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- --------------------------메타 데이터 표시------------------------------- -->
    <v-card
      v-if="metadataCardVisible"
      ref="searchCard"
      @mousedown="startDrag($event, 'searchCard')"
      style="
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 1100;
        width: 500px;
        overflow: visible;
      "
    >
      <v-card-title>
        <span>현재 데이터</span>
        <p
          @click="metadataCardVisible = false"
          style="position: absolute; top: 3px; right: 8px"
        >
          <v-icon>mdi-close</v-icon>
        </p>
      </v-card-title>
      <v-card-text style="padding-bottom: 0px">
        <!-- 여기에 검색 창 컨텐츠를 추가하세요 -->
        <div style="position: relative; z-index: 1100">
          <v-row>
            <v-col cols="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>시험이름</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.test
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>운항모드</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.mode
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>위도</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.latitude
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>경도</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.longitude
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>시나리오 번호</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.scenario
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>시험 경로 이름</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.routeName
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>시간</v-list-item-title>
                  <v-list-item-subtitle>{{
                    metadata.time
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-list-item style="padding-bottom: 0px">
            <v-list-item-content>
              <v-list-item-subtitle
                ><v-checkbox
                  v-model="nonScenario"
                  :label="`경로 이어보기`"
                ></v-checkbox
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
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
import { readWaypoint, readAis } from "../api/index.js";

const tokenid = ref(sessionStorage.getItem("token") || "");
const searchCardVisible = ref(false);
const metadataCardVisible = ref(false);
const testCardVisible = ref(false);
const sliderCardVisible = ref(false);
const searchCard = ref(null);
const testCard = ref(null);

let map = null;

// ----------------------------Slider Bar--------------------------------//
const maxValue = ref(0);
const sliderValue = ref(1);
const timeData = ref([]);

let currentPolyline;

watch(sliderValue, (newVal) => {
  aisMapping(newVal);
});

// ----------------------------select Bar--------------------------------//

// trial
const trialrun = ref([]);
const selectedtrialrun = ref(null);
const selectedtrialNum = ref();

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

// ----------------------------select Bar--------------------------------//

// metadata
const metadata = ref({
  test: null,
  mode: null,
  latitude: null,
  longitude: null,
  time: null,
  routeName: null,
  scenario: null,
});

// 항적 쌓기 체크박스
const nonScenario = ref(false);

watch(nonScenario, (newVal) => {
  sliderValue.value = 0;
});

// ---------------------------- Test CardView --------------------------------//

const selectedTest = ref([]);
const dialogVisible = ref(false);
let currentPolylines = [];
let currentScenario = null;
let aisData = ref({});
let waypointMarkers = [];
let waypointLine = null;

const shipIcon = new L.Icon({
  iconUrl: "/image/shipicon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

const searchMapdata = async () => {
  try {
    if (selectedtrialrun.value) {
      testAis.value = [];
      aisData.value = {};
      let waypoint = [];
      let ais = [];
      try {
        waypoint = await readWaypoint(tokenid.value, selectedtrialrun.value);
        ais = await readAis(tokenid.value, selectedtrialrun.value);
      } catch (error) {
        alert("선택한 항차의 항적 정보가 없습니다.");
        console.error("error:", error);
        return; // 에러 발생 시 함수 종료
      }

      console.log(ais);
      maxValue.value = ais.length;

      testAis.value = ais;
      testWaypoint.value = waypoint;
      fetchData();
      sliderCardVisible.value = true;

      if (map) {
        map.remove(); // 기존 지도 제거
      }

      defalutMap();
      // aisMapping(sliderValue.value);
      sliderValue.value = 0;
      addWaypoints();
      // shipMarker 다시 추가
      if (shipMarker) {
        const latlng = [
          parseFloat(testAis.value[sliderValue.value].latitude),
          parseFloat(testAis.value[sliderValue.value].longitude),
        ];
        shipMarker = L.marker(latlng, { icon: shipIcon }).addTo(map);
      }

      searchCardVisible.value = false;
      metadataCardVisible.value = true;
    } else {
      alert("항차를 선택하세요.");
    }
  } catch (error) {
    console.log(error);
    if (error.request.response == 'argument "content" is null') {
      console.error('Error: argument "content" is null');
    }
  }
};

const testAis = ref([
  {
    latitude: "35.290000",
    longitude: "129.260000",
    test: "",
    scenarioNumber: "",
    modeType: "",
    time: "",
  },
]);

const testWaypoint = ref([]);

const testArea = [
  {
    latitude: "35.4944",
    longitude: "129.4517",
  },
  {
    latitude: "35.5650",
    longitude: "129.4850",
  },
  {
    latitude: "35.5350",
    longitude: "129.5533",
  },
  {
    latitude: "35.4533",
    longitude: "129.5333",
  },
  {
    latitude: "35.4944",
    longitude: "129.4517",
  },
];

// 데이터를 가져오는 함수
const fetchData = async () => {
  try {
    testAis.value.forEach((data) => timeData.value.push(data.routeName));
    testAis.value.forEach(
      ({ latitude, longitude, modeType, scenarioNumber }) => {
        if (!aisData.value[scenarioNumber]) {
          aisData.value[scenarioNumber] = [];
        }
        aisData.value[scenarioNumber].push([
          parseFloat(latitude),
          parseFloat(longitude),
          modeType,
        ]);
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

// 슬라이더 값이 변경될 때 호출되는 함수
const onSliderChange = (newVal) => {
  const index = Math.floor(newVal);
  if (index < 0 || index >= testAis.value.length) {
    return;
  }
  aisMapping(index);
};

let shipMarker = null;
let lastValidAngle = 0; // 마지막 유효한 각도 저장

const getDirection = (degreeLati, degreeLongi) => {
  const angle = Math.atan2(degreeLongi, degreeLati) * (180 / Math.PI); // 동쪽 기준 0도
  return ((angle + 90 + 360) % 360); // 0-360도 범위로 변환
};
const aisMapping = (index) => {
  const latlng = [
    parseFloat(testAis.value[index].latitude),
    parseFloat(testAis.value[index].longitude),
  ];

  // console.log(`\n index(n) : ${index}, lati(n) : ${testAis.value[index].latitude}, longi(n) : ${testAis.value[index].longitude} \n
  // index(n) : ${index+1}, lati(n+1) : ${testAis.value[index+1].latitude}, longi(n+1) : ${testAis.value[index+1].longitude}`);

  const degreeLati =
    testAis.value[index + 1].latitude - testAis.value[index].latitude;
  const degreeLongi =
    testAis.value[index + 1].longitude - testAis.value[index].longitude;

  let angle = lastValidAngle; // 기본값은 마지막 유효한 각도

  if (degreeLati !== 0 || degreeLongi !== 0) {
    // 좌표 변화가 있을 경우에만 방향 업데이트
    angle = getDirection(degreeLati, degreeLongi);
    lastValidAngle = angle; // 마지막 유효한 각도 업데이트
  }

  console.log(`배의 방향: ${angle} degrees`);

  const iconUrl = "/image/shipicon.png";
  const iconSize = [48, 48];
  const iconAnchor = [16, 16];
  const popupAnchor = [0, -18];

  const shipIcon = new L.DivIcon({
    html: `<div style="transform: rotate(${angle}deg); width: ${iconSize[0]}px; height: ${iconSize[1]}px; background: url(${iconUrl}) no-repeat center center; background-size: contain;"></div>`,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
    popupAnchor: popupAnchor,
    className: "", // 기본 클래스를 비우면 기본 스타일이 적용되지 않습니다.
  });

  // shipMarker가 이미 존재하면 위치를 업데이트하고, 그렇지 않으면 새로운 마커를 생성합니다.
  if (shipMarker) {
    shipMarker.setLatLng(latlng);
    shipMarker.setIcon(shipIcon);
  } else {
    shipMarker = L.marker(latlng, { icon: shipIcon }).addTo(map);
  }

  if (map && index >= 0 && index < testAis.value.length) {
    const scenario = testAis.value[index]?.scenarioNumber;

    // 시나리오가 변경되면 기존 폴리라인 제거
    if (currentScenario !== scenario) {
      currentPolylines.forEach((polyline) => map.removeLayer(polyline));
      currentPolylines = [];
      currentScenario = scenario;
    }

    // 현재 시나리오의 데이터를 순차적으로 추가
    let dataToShow;
    if (nonScenario.value) {
      dataToShow = testAis.value.slice(0, index + 1);
    } else {
      dataToShow = testAis.value
        .slice(0, index + 1)
        .filter((data) => data.scenarioNumber === scenario);
    }
    // 기존 폴리라인 제거
    currentPolylines.forEach((polyline) => map.removeLayer(polyline));
    currentPolylines = [];

    if (dataToShow.length > 0) {
      let latlngs = dataToShow.map((data) => [
        parseFloat(data.latitude),
        parseFloat(data.longitude),
      ]);
      let dashtype;

      if (dataToShow[0].modeType === "1") {
        dashtype = "1";
      } else if (dataToShow[0].modeType === "2") {
        dashtype = "5, 5";
      } else if (dataToShow[0].modeType === "3") {
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

  //metadata view
  metadata.value.test = testAis.value[index].testName;
  metadata.value.mode =
    testAis.value[index].modeType === "1"
      ? "Menual"
      : testAis.value[index].modeType === "2"
      ? "Auto"
      : testAis.value[index].modeType === "3"
      ? "REMOTE"
      : "";
  metadata.value.latitude = testAis.value[index].latitude;
  metadata.value.longitude = testAis.value[index].longitude;
  metadata.value.time = testAis.value[index].time;
  metadata.value.routeName = testAis.value[index].routeName;
  metadata.value.scenario = testAis.value[index].scenarioNumber;
};

const addWaypoints = () => {
  // Waypoints와 폴리라인이 이미 존재하면 제거
  waypointMarkers.forEach((marker) => map.removeLayer(marker));
  waypointMarkers = [];
  if (waypointLine) {
    map.removeLayer(waypointLine);
    waypointLine = null;
  }

  if (testWaypoint.value.length > 0) {
    testWaypoint.value.forEach((point) => {
      const latlng = [parseFloat(point.latitude), parseFloat(point.longitude)];
      const circleMarker = L.circleMarker(latlng, {
        color: "#555555", // 테두리 색상
        fillColor: "grey", // 채우기 색상
        fillOpacity: 0.5, // 채우기 투명도
        radius: 1, // 점의 크기
      })
        .addTo(map)
        .bindPopup(`Scenario: ${point.scenarioNumber}`);
      waypointMarkers.push(circleMarker);
    });

    const waypointLatLngs = testWaypoint.value.map((point) => [
      parseFloat(point.latitude),
      parseFloat(point.longitude),
    ]);
    waypointLine = L.polyline(waypointLatLngs, {
      color: "#555555",
      weight: 1,
    }).addTo(map);
  }
};

// ---------------------------- Map View --------------------------------//

onMounted(() => {
  defalutMap();
});

const defalutMap = () => {
  // 지도 초기화
  map = L.map("map").setView([35.4944, 129.4517], 13);

  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // testArea의 위경도 값을 이어서 빨간색 선으로 그리기
  const latlngs = testArea.map((point) => [
    parseFloat(point.latitude),
    parseFloat(point.longitude),
  ]);

  L.polyline(latlngs, {
    color: "red",
    weight: 2,
  }).addTo(map);

  // addWaypoints();
  // aisMapping(sliderValue.value);
};

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
.custom-select {
  margin-top: 20px;
}

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
