<template>
  <div style="padding: 0px; padding-top: 0px">
    <!-- <v-sheet style="height: 7vh; display: flex">
      <v-row>
        <v-col cols="3">
          <v-select
            style="margin-top: 1px"
            v-model="sailingselect"
            :items="items1"
            density="comfortable"
            label="Comfortable"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            style="margin-top: 1px"
            v-model="sailingselect"
            :items="items1"
            density="comfortable"
            label="Default"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="1">
          <v-btn @click="test()" style="width: 100px; margin-top: 10px"
            >조회하기</v-btn
          >
        </v-col>
        <v-col cols="1">
          <v-btn @click="marker()" style="width: 100px; margin-top: 10px"
            >마커추가</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet> -->
    <div id="map" style="height: 68vh"></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import { ref, toRefs, onMounted } from "vue";
import axios from "axios";

const state = toRefs({
  items1: [
    "Ship Information",
    "Kass Information",
    "SYS Information",
    "Control Data",
  ],
  trialdata: [
    [35.46, 129.38],
    [35.47, 129.39],
    [35.48, 129.4],
  ],
  pathCoordinates: null,
  sailingselect: null,
  map: null, // 추가: 맵 객체를 저장할 변수
});

// 맵을 초기화하는 함수
const initializeMap = () => {
  state.pathCoordinates = state.trialdata;

  // 맵 객체 생성 및 저장
  state.map = L.map("map").setView([35.46, 129.38], 12);

  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
    state.map
  );

  // pathCoordinates가 정의되어 있고, 길이가 2 이상인 경우에만 폴리라인(선)을 그려서 지도에 추가
  if (state.pathCoordinates && state.pathCoordinates.length >= 2) {
    L.polyline(state.pathCoordinates, { color: "blue" }).addTo(state.map);
  }

  // 마커 추가 (예제 마커)
  L.marker([35.46, 129.38])
    .addTo(state.map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    .openPopup();
};

onMounted(() => {
  // 초기에 한 번만 맵을 설정
  initializeMap();
});

const marker = () => {
  // Check if the map is initialized
  if (state.map !== null) {
    // Add a green marker at the specified coordinates
    const greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker([35.47, 129.39], { icon: greenIcon })
      .addTo(state.map)
      .bindPopup("Marker.")
      .openPopup();
  } else {
    console.warn("Map is not initialized. Please load data first.");
  }
};

const test = () => {
  axios
    .post("http://192.168.0.24:8080/info/ais/11")
    .then((response) => {
      // 유효한 값을 필터링하여 state.trialdata에 할당
      console.log(response.data);
      state.trialdata = response.data
        .filter(
          (item) =>
            item.latitude !== null &&
            item.longitude !== null &&
            !isNaN(parseFloat(item.latitude)) &&
            !isNaN(parseFloat(item.longitude))
        )
        .map((item) => [parseFloat(item.latitude), parseFloat(item.longitude)]);

      state.pathCoordinates = state.trialdata;

      // 초기화할 맵 객체가 있는 경우에만 초기화
      if (state.map !== null) {
        // 맵 객체 제거
        state.map.remove();
        state.map = null;

        // 다시 맵 초기화
        initializeMap();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<!-- <script setup>
import L from "leaflet";
import { ref, onMounted } from "vue";
const items1 = ref([
  "Ship Information",
  "Kass Information",
  "SYS Information",
  "Control Data",
]);
const sailingselect = ref(null);
onMounted(() => {
  const map = L.map("map").setView([35.46, 129.38], 12);
  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  // 경로 좌표 배열 (예제 경로)
  const pathCoordinates = [
    [35.50458908081055, 129.3654022216797],
    [35.50455856323242, 129.36538696289062],
    [35.50459671020508, 129.36541748046875],
    // ... 다른 경로 좌표
  ];
  // 폴리라인(선)을 그려서 지도에 추가
  L.polyline(pathCoordinates, { color: "blue" }).addTo(map);
  // 마커 추가 (예제 마커)
  L.marker([35.46, 129.38])
    .addTo(map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    .openPopup();
});
</script> -->

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
</style>
