<template>
  <div>
    <div id="map" style="height: 45vh;"></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import { ref, onMounted } from "vue";

let mapInitialized = false; // 초기화 상태를 추적하는 변수
const map = ref(null);

onMounted(() => {
  if (!mapInitialized) {
    // 지도가 아직 초기화되지 않은 경우에만 초기화
    map.value = L.map("map").setView([35.46, 129.38], 12);

    // OSM 타일 레이어 추가
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map.value);

    // 마커 추가 (예제 마커)
    L.marker([35.46, 129.38])
      .addTo(map.value)
      .bindPopup("Realtime Location.")
      .openPopup();

    mapInitialized = true; // 초기화 완료 상태로 표시
  }
});

</script>

<style scoped></style>
