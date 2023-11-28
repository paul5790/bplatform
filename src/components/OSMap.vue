<template>
  <div>
    <div id="map" style="height: 30vh"></div>
    <div style="text-align: right">
      <span style="font-size: 13px">lat: {{ latview }}</span
      >&nbsp;&nbsp; <span style="font-size: 13px">lon: {{ lonview }}</span>
    </div>
  </div>
</template>

<script setup props="props">
import L from "leaflet";
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  // #2 props 정의
  lat: Number,
  lon: Number,
});

let map = null;

let lat = ref(35.46);
let lon = ref(129.38);
let latview = ref();
let lonview = ref();

onMounted(() => {
  // 지도 초기화
  map = L.map("map").setView([35.46, 129.38], 10);

  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // 마커 추가 (예제 마커)
  L.marker([35.46, 129.38])
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

  setInterval(updateValue, 6000);
  updateValue();
});

const updateValue = () => {
  // 기존 마커 및 맵 제거
  map.eachLayer((layer) => {
    layer.remove();
  });

  // lat.value += Math.random() * 0.1 - 0.05;
  // lon.value += Math.random() * 0.1 - 0.05;

  latview.value = props.lat.toFixed(4);
  lonview.value = props.lon.toFixed(4);

  // 새로운 위치로 마커 및 맵 생성
  L.marker([lat.value, lon.value])
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
};
</script>

<style scoped>
span {
  font-size: 0;
}
</style>
