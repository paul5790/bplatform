<template>
  <div style="padding: 0px; padding-top: 0px">
    <div id="map" style="height: 68vh"></div>
  </div>
</template>

<script setup props="props">
import L from "leaflet";
import { ref, toRefs, onMounted, defineProps } from "vue";
import { readWaypoint, readAis, createErrorData } from "../api/index.js";

const tokenid = ref(sessionStorage.getItem("token") || "");
const props = defineProps({
  // #2 props 정의
  trial: String,
});

const state = toRefs({
  items1: [
    "Ship Information",
    "Kass Information",
    "SYS Information",
    "Control Data",
  ],
  trialdata: [],
  pathCoordinates: null,
  sailingselect: null,
  map: null, // 추가: 맵 객체를 저장할 변수
});

// 맵을 초기화하는 함수
const initializeMap = (waypoints, ais, startlocation, endlocation) => {
  try {
    state.pathCoordinates = state.trialdata;

    // 맵 객체 생성 및 저장
    state.map = L.map("map").setView(startlocation.value, 13);

    // OSM 타일 레이어 추가
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      state.map
    );
    // 폴리라인(선)을 그려서 지도에 추가
    L.polyline(ais.value, { color: "blue", weight: 2 }).addTo(state.map);

    // 마커 추가 (예제 마커)
    L.marker(startlocation.value)
      .addTo(state.map)
      .bindPopup("start")
      .openPopup();

    const redIcon = new L.Icon({
      iconUrl: "/image/marker-icon-2x-red.png",
      shadowUrl: "/image/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.marker(endlocation.value, { icon: redIcon })
      .addTo(state.map)
      .bindPopup("end");

    const greenIcon = new L.Icon({
      iconUrl: "/image/marker-icon-2x-green.png",
      shadowUrl: "/image/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    // 추가 마커
    for (let i = 0; i < waypoints.value.length; i++) {
      L.marker(waypoints.value[i], { icon: greenIcon })
        .addTo(state.map)
        .bindPopup(`waypoint${i + 1}`);
    }
  } catch (error) {
    let errorItem = {
      id: sessionStorage.getItem("userid") || "",
      requestMethod: error.response ? error.response.config.method : "unknown",
      requestUrl: error.response
        ? error.response.request.responseURL
        : "unknown",
      statusCode: error.response ? error.response.status : "unknown",
      log: error.name ? error.name : "unknown",
    };
    console.log(errorItem);
    try {
      createErrorData(tokenid.value, errorItem);
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(async () => {
  try {
    const waypointData = await readWaypoint(tokenid.value, props.trial);
    const aisData = await readAis(tokenid.value, props.trial);
    const uniqueWaypoints = new Set();
    // waypointData의 중복을 제거하고 A에 저장
    for (let i = 0; i < waypointData.length; i++) {
      const key = waypointData[i].latitude + "," + waypointData[i].longitude;
      uniqueWaypoints.add(key);
    }
    const uniqueWaypointsArray = Array.from(uniqueWaypoints);
    // 시작점, 끝점
    const startlocation = ref([]);
    const endlocation = ref([]);

    // waypoints 설정
    const waypoints = ref([]);

    for (let i = 0; i < uniqueWaypointsArray.length; i++) {
      // waypoints.value.push([
      //   uniqueWaypointsArray[i].latitude,
      //   uniqueWaypointsArray[i].longitude,
      // ]);
      const [latitude, longitude] = uniqueWaypointsArray[i].split(",");
      waypoints.value.push([latitude, longitude]);
    }

    // ais 항적 설정
    const ais = ref([]);
    for (let i = 0; i < aisData.length; i++) {
      const latitude = aisData[i].latitude;
      const longitude = aisData[i].longitude;

      // latitude 또는 longitude가 null이 아닌 경우에만 데이터를 추가
      if (
        latitude !== null &&
        longitude !== null &&
        latitude < 90 &&
        longitude < 180
      ) {
        ais.value.push([latitude, longitude]);
      }
    }

    startlocation.value = ais.value[0];
    endlocation.value = ais.value[ais.value.length - 1];

    console.log(startlocation.value);
    console.log(endlocation.value);
    initializeMap(waypoints, ais, startlocation, endlocation);
  } catch (error) {
    console.error(error);
    let errorItem = {
      id: sessionStorage.getItem("userid") || "",
      requestMethod: error.response ? error.response.config.method : "unknown",
      requestUrl: error.response ? error.response.request.responseURL : "unknown",
      statusCode: error.response ? error.response.status : "unknown",
      log: error.name ? error.name : "no-data",
    };
    console.log(errorItem);
    try {
      createErrorData(tokenid.value, errorItem);
    } catch (error) {
      console.error(error);
    }
  }
});
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
</style>
