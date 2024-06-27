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
            label="항차 선택"
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
const searchCard = ref(null);
const testCard = ref(null);

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
const selectedTest = ref([]);
const dialogVisible = ref(false);

const layers = {
  red: { polyline: null, markers: [] },
  yellow: { polyline: null, markers: [] },
  blue: { polyline: null, markers: [] },
  green: { polyline: null, markers: [] },
  black: { polyline: null, markers: [] },
  brown: { polyline: null, markers: [] },
};

const aisData = {
  red: [
    [35.29, 130.1],
    [35.19, 129.96],
    [35.29, 129.76],
    [35.19, 129.66],
    [35.29, 129.26],
  ],
  yellow: [
    [35.19, 130.1],
    [35.09, 129.96],
    [35.19, 129.76],
    [35.09, 129.66],
    [35.19, 129.26],
  ],
  blue: [
    [35.39, 130.1],
    [35.29, 129.96],
    [35.39, 129.76],
    [35.29, 129.66],
    [35.39, 129.26],
  ],
  green: [
    [35.49, 130.1],
    [35.39, 129.96],
    [35.49, 129.76],
    [35.39, 129.66],
    [35.49, 129.26],
  ],
  black: [
    [35.59, 130.1],
    [35.49, 129.96],
    [35.59, 129.76],
    [35.49, 129.66],
    [35.59, 129.26],
  ],
  brown: [
    [35.69, 130.1],
    [35.59, 129.96],
    [35.69, 129.76],
    [35.59, 129.66],
    [35.69, 129.26],
  ],
};

// 데이터를 가져오는 함수
const fetchData = async () => {
  try {
    const jsonData = [
      {
        latitude: "35.290000",
        longitude: "129.760000",
        test: "1",
      },
      {
        latitude: "35.291000",
        longitude: "129.761000",
        test: "1",
      },
      {
        latitude: "35.292000",
        longitude: "129.763000",
        test: "1",
      },
      {
        latitude: "35.293000",
        longitude: "129.765000",
        test: "1",
      },
      {
        latitude: "35.294000",
        longitude: "129.757000",
        test: "1",
      },
      {
        latitude: "35.295000",
        longitude: "129.769000",
        test: "1",
      },
      {
        latitude: "35.296000",
        longitude: "129.750000",
        test: "1",
      },
      {
        latitude: "35.291000",
        longitude: "129.771000",
        test: "2",
      },
      {
        latitude: "35.292000",
        longitude: "129.773000",
        test: "2",
      },
      {
        latitude: "35.293000",
        longitude: "129.775000",
        test: "2",
      },
      {
        latitude: "35.294000",
        longitude: "129.777000",
        test: "2",
      },
      {
        latitude: "35.295000",
        longitude: "129.779000",
        test: "2",
      },
      {
        latitude: "35.296000",
        longitude: "129.770000",
        test: "2",
      },
      {
        latitude: "35.296000",
        longitude: "129.770000",
        test: "3",
      },
    ];

        // test 값에 따른 데이터를 저장할 임시 객체
    const tempData = {};

    // jsonData를 순회하며 test 값에 따른 데이터 분류
    jsonData.forEach(item => {
      const testValue = item.test;
      const latitude = parseFloat(item.latitude);
      const longitude = parseFloat(item.longitude);

      // test 값에 해당하는 배열이 없으면 새로 생성
      if (!tempData[testValue]) {
        tempData[testValue] = [];
      }

      // test 값에 해당하는 배열에 위도와 경도를 추가
      tempData[testValue].push([latitude, longitude]);
    });

    // 기존 데이터를 초기화
    Object.keys(aisData).forEach(key => {
      aisData[key] = [];
    });

    // 임시 데이터를 순서대로 aisData에 할당
    const colors = ['red', 'yellow', 'blue', 'green', 'black', 'brown'];
    let colorIndex = 0;

    Object.values(tempData).forEach((dataArray, index) => {
      if (colorIndex < colors.length) {
        aisData[colors[colorIndex]] = dataArray;
        colorIndex++;
      }
    });

    console.log(aisData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();

let map = null;

watch(selectedTest, (newVal) => {
  if (newVal.length > 5) {
    selectedTest.value.pop(); // 가장 마지막에 추가된 항목 제거
    alert("최대 5개까지 선택할 수 있습니다.");
  }
  console.log(aisData);

  if (map) {
    Object.keys(layers).forEach((color) => {
      const layer = layers[color];
      if (newVal.includes(color)) {
        if (!layer.polyline) {
          layer.polyline = L.polyline(aisData[color], {
            color: color,
            weight: 2,
            dashArray: color === "blue" || color === "green" ? "5, 5" : "1",
          }).addTo(map);
        }
        if (layer.markers.length === 0) {
          const iconUrl = `/image/marker-icon-${color}.png`;
          const icon = new L.Icon({
            iconUrl: iconUrl,
            iconSize: [17, 28],
            iconAnchor: [9, 28],
            popupAnchor: [1, -34],
          });
          aisData[color].forEach((coords) => {
            const marker = L.marker(coords, { icon: icon }).bindPopup(
              `waypoint: ${coords}`
            );
            marker.addTo(map);
            layer.markers.push(marker);
          });
        }
      } else {
        if (layer.polyline) {
          map.removeLayer(layer.polyline);
          layer.polyline = null;
        }
        layer.markers.forEach((marker) => {
          map.removeLayer(marker);
        });
        layer.markers = [];
      }
    });
  }
});

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
});

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
