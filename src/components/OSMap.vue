<template>
  <div>
    <div id="map" style="height: 39vh"></div>
    <div style="text-align: right">
      <span style="font-size: 13px">lat: {{ latvalue }}</span
      >&nbsp;&nbsp; <span style="font-size: 13px">lon: {{ lonvalue }}</span>
    </div>
  </div>
</template>

<script setup props="props">
import L from "leaflet";
import { ref, onMounted, defineProps, onUnmounted, watch } from "vue";

let currentMarker = null; // 기존 마커를 저장할 변수

const props = defineProps({
  // #2 props 정의
  lat: Number,
  lon: Number,
  state: String,
});

watch(
  [() => props.lat, () => props.lon, () => props.state],
  ([newLat, newLon, newState]) => {
    if (newState === "stop") {
      // state가 "stop"이면 latvalue를 0.0으로 설정하고 업데이트 중지
      latvalue.value = null;
      lonvalue.value = null;
      console.log("State is 'stop'. Values reset to 0.0.");
      return;
    } else if (newState === "start") {
      // state가 "start"이면 업데이트 실행
      if (isNaN(newLat) || isNaN(newLon)) {
        console.warn("Invalid coordinates detected. Skipping update.");
        return;
      }

      updateValue();
      console.log(`Latitude changed to: ${newLat}, Longitude changed to: ${newLon}`);
      console.log(latview.value);
      console.log(lonview.value);

      // 기존 마커가 존재하면 제거
      if (currentMarker) {
        map.removeLayer(currentMarker);
      }

      // 새로운 마커 생성 및 추가
      currentMarker = L.marker([latview.value, lonview.value], { icon: shipIcon })
        .addTo(map)
        .bindPopup("Realtime Location.");
    }
  }
);

let map = null;
const state = ref("wait");
let lat = ref(35.46);
let lon = ref(129.38);
let latview = ref(35.504503);
let lonview = ref(129.365417);
const latvalue = ref(null);
const lonvalue = ref(null);
let intervalId = null;
const updateMapCheck = ref(false);
const zoomLevel = ref(12);
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

const shipIcon = new L.Icon({
  iconUrl: "/image/shipicon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
});

onMounted(() => {
  // 지도 초기화
  map = L.map("map").setView([35.50, 129.36], zoomLevel.value);

  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // 줌 레벨 변경 이벤트 리스너 추가
  map.on("zoomend", () => {
    zoomLevel.value = map.getZoom();
  });

  const latlngs = testArea.map((point) => [
    parseFloat(point.latitude),
    parseFloat(point.longitude),
  ]);

  L.polyline(latlngs, {
    color: "red",
    weight: 2,
  }).addTo(map);

  // setTimeout(updateValue, 5000); // 최초 실행을 setTimeout으로 변경
  // updateValue();
  // setInterval(updateValue, 3000);
  // intervalId = setInterval(updateValue, 3000);
  // startInterval(); // 최초 실행
  // updateMap();
  // intervalId = setInterval(() => {
  //   if (state.value === "start") {
  //     updateMapCheck.value = true;
  //     executeUpdateMap();
  //   } else {
  //     updateMapCheck.value = false;
  //   }
  // }, 5000);
});

const executeUpdateMap = () => {
  if (updateMapCheck.value) {
    // updateMap();
  }
};

const updateValue = () => {
  state.value = props.state;
  latview.value = props.lat;
  lonview.value = props.lon;
  latvalue.value = props.lat.toFixed(6);
  lonvalue.value = props.lon.toFixed(6);
};

// 컴포넌트가 파괴될 때 clearInterval 호출
onUnmounted(() => {
  stopInterval();
});

const updateMap = () => {
  try {
    // 기존 마커 및 맵 제거
    // map.eachLayer((layer) => {
    //   layer.remove();
    // });

    L.marker([latview.value, lonview.value], { icon: shipIcon })
      .addTo(map)
      .bindPopup("Realtime Location.")
      .openPopup();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    map.setView([latview.value, lonview.value], zoomLevel.value);
  } catch (error) {
    console.error("Caught an error:", error);
    // stopInterval();
    map.eachLayer((layer) => {
      layer.remove();
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );
    latview.value = "NaN";
    lonview.value = "NaN";
  }
};

const startInterval = () => {};

const stopInterval = () => {
  clearInterval();
};
</script>

<style scoped>
span {
  font-size: 0;
}
</style>
