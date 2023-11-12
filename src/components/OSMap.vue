<template>
  <div>
    <div id="map" style="height: 49vh">
      <v-btn color="primary">버튼 1</v-btn>
    </div>
  </div>
</template>

<script setup>
import L from "leaflet";
import { ref, onMounted } from "vue";

let map = null;

let lat = ref(35.46);
let lon = ref(129.38);

onMounted(() => {
  // 지도 초기화
  map = L.map("map").setView([lat.value, lon.value], 12);
  
  // OSM 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // 마커 추가 (예제 마커)
  L.marker([35.46, 129.38])
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

  setInterval(updateValue, 5000);
  updateValue();
});

const updateValue = () => {
  // 기존 마커 및 맵 제거
  map.eachLayer((layer) => {
    layer.remove();
  });

  lat.value += Math.random() * 0.1 - 0.05;
  lon.value += Math.random() * 0.1 - 0.05;

  // 새로운 위치로 마커 및 맵 생성
  L.marker([lat.value, lon.value])
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
};
</script>

<style scoped></style>
