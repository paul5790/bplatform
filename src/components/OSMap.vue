<template>
  <div>
    <div id="map" style="height: 30vh"></div>
    <div style="text-align: right">
      <span style="font-size: 13px">lat: {{ latvalue }}</span
      >&nbsp;&nbsp; <span style="font-size: 13px">lon: {{ lonvalue }}</span>
    </div>
  </div>
</template>

<script setup props="props">
import L from "leaflet";
import { ref, onMounted, defineProps, onUnmounted } from "vue";

const props = defineProps({
  // #2 props 정의
  lat: Number,
  lon: Number,
  state: String,
});

let map = null;
const state = ref("wait");
let lat = ref(35.46);
let lon = ref(129.38);
let latview = ref(35.46);
let lonview = ref(129.38);
const latvalue = ref(35.46);
const lonvalue = ref(129.38);
let intervalId = null;
const updateMapCheck = ref(false);

onMounted(() => {
  // 지도 초기화
  map = L.map("map").setView([35.29, 129.26], 10);

  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // 마커 추가 (예제 마커)
  L.marker([35.29, 129.26])
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

  // setTimeout(updateValue, 5000); // 최초 실행을 setTimeout으로 변경
  updateValue();
  setInterval(updateValue, 3000);
  // intervalId = setInterval(updateValue, 3000);
  // startInterval(); // 최초 실행
  updateMap();
  intervalId = setInterval(() => {
    if (state.value === "start") {
      updateMapCheck.value = true;
      // console.log(updateMapCheck.value);
      executeUpdateMap();
    } else {
      updateMapCheck.value = false;
      // console.log(updateMapCheck.value);
    }
  }, 5000);
});

const executeUpdateMap = () => {
  if (updateMapCheck.value) {
    updateMap();
  }
};

const updateValue = () => {
  state.value = props.state;
  latview.value = props.lat;
  lonview.value = props.lon;
  // console.log("updateValue");

  latvalue.value = (props.lat / 100).toFixed(6);
  lonvalue.value = (props.lon / 100).toFixed(6);
};

// 컴포넌트가 파괴될 때 clearInterval 호출
onUnmounted(() => {
  stopInterval();
});

const updateMap = () => {
  try {
    // 기존 마커 및 맵 제거
    map.eachLayer((layer) => {
      layer.remove();
    });

    // 새로운 위치로 마커 및 맵 생성

    const blueIcon = new L.Icon({
      iconUrl: "/image/marker-icon-2x-blue.png",
      shadowUrl: "/image/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    console.log(latview.value / 100, lonview.value / 100);
    L.marker([latview.value / 100, lonview.value / 100], { icon: blueIcon })
      .addTo(map)
      .bindPopup("Realtime Location.")
      .openPopup();

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    map.setView([latview.value / 100, lonview.value / 100], 10);
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
