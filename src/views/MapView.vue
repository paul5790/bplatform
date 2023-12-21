<template>
  <div style="padding: 0px; padding-top: 0px">
    <div id="map" style="height: 68vh"></div>
  </div>
</template>

<script setup props="props">
import L from "leaflet";
import { ref, toRefs, onMounted, defineProps } from "vue";
import axios from "axios";

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
  L.marker(startlocation.value).addTo(state.map).bindPopup("start").openPopup();

    const redIcon = new L.Icon({
    iconUrl: "/image/marker-icon-2x-red.png",
    shadowUrl: "/image/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.marker(endlocation.value, { icon: redIcon }).addTo(state.map).bindPopup("end");

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
};

onMounted(async () => {
  try {
    const waypointData = await axios.post(
      `http://192.168.0.73:8080/info/waypoints/${props.trial}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`,
        },
      }
      // `http://192.168.0.73:8080/info/waypoints/5`
    );

    const aisData = await axios.post(
      `http://192.168.0.73:8080/info/ais/${props.trial}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`,
        },
      }
      // `http://192.168.0.73:8080/info/ais/5`
    );

    // 시작점, 끝점
    const startlocation = ref([]);
    const endlocation = ref([]);

    // waypoints 설정
    const waypoints = ref([]);
    for (let i = 0; i < waypointData.data.length; i++) {
      waypoints.value.push([
        waypointData.data[i].latitude,
        waypointData.data[i].longitude,
      ]);
    }

    // ais 항적 설정
    const ais = ref([]);
    for (let i = 0; i < aisData.data.length; i++) {
      const latitude = aisData.data[i].latitude;
      const longitude = aisData.data[i].longitude;

      // latitude 또는 longitude가 null이 아닌 경우에만 데이터를 추가
      if (latitude !== null && longitude !== null) {
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
  }
});

const marker = () => {
  // Check if the map is initialized
  if (state.map !== null) {
    // Add a green marker at the specified coordinates
    const greenIcon = new L.Icon({
      iconUrl: "../../public/image/marker-icon-2x-green.png",
      shadowUrl: "../../public/image/marker-shadow.png",
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
    console.warn("waypoint");
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
