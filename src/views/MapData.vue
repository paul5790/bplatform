<template>
  <div style="padding: 0px; padding-top: 0px">
    <div id="map" style="height: 93vh"></div>
  </div>
</template>

<script setup>
import L from "leaflet";
import { ref, toRefs, onMounted, defineProps } from "vue";

const tokenid = ref(sessionStorage.getItem("token") || "");

let map = null;
const ais1 = ref([
  [35.29, 130.10],
  [35.19, 129.96],
  [35.29, 129.76],
  [35.19, 129.66],
  [35.29, 129.26],
]);

const ais2 = ref([
  [35.19, 130.10],
  [35.09, 129.96],
  [35.19, 129.76],
  [35.09, 129.66],
  [35.19, 129.26],
]);

const ais3 = ref([
  [35.39, 130.10],
  [35.29, 129.96],
  [35.39, 129.76],
  [35.29, 129.66],
  [35.39, 129.26],
]);

const ais4 = ref([
  [35.49, 130.10],
  [35.39, 129.96],
  [35.49, 129.76],
  [35.39, 129.66],
  [35.49, 129.26],
]);

const ais5 = ref([
  [35.59, 130.10],
  [35.49, 129.96],
  [35.59, 129.76],
  [35.49, 129.66],
  [35.59, 129.26],
]);

const ais6 = ref([
  [35.69, 130.10],
  [35.59, 129.96],
  [35.69, 129.76],
  [35.59, 129.66],
  [35.69, 129.26],
]);

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

  L.polyline(ais1.value, { color: "red", weight: 2, dashArray: "1" }).addTo(
    map
  );
  L.polyline(ais2.value, { color: "yellow", weight: 2, dashArray: "1" }).addTo(
    map
  );
  L.polyline(ais3.value, { color: "blue", weight: 2, dashArray: "5, 5" }).addTo(
    map
  );
  L.polyline(ais4.value, {
    color: "green",
    weight: 2,
    dashArray: "5, 5",
  }).addTo(map);
  L.polyline(ais5.value, {
    color: "black",
    weight: 2,
    dashArray: "25, 5, 2, 5",
  }).addTo(map);
  L.polyline(ais6.value, {
    color: "brown",
    weight: 2,
    dashArray: "25, 5, 2, 5",
  }).addTo(map);

  const redIcon = new L.Icon({
    iconUrl: "/image/marker-icon-red.png",
    iconSize: [17, 28],
    iconAnchor: [9, 28],
    popupAnchor: [1, -34],
  });

  const greenIcon = new L.Icon({
    iconUrl: "/image/marker-icon-green.png",
    iconSize: [17, 28],
    iconAnchor: [9, 28],
    popupAnchor: [1, -34],
  });

  const blueIcon = new L.Icon({
    iconUrl: "/image/marker-icon-blue.png",
    iconSize: [17, 28],
    iconAnchor: [9, 28],
    popupAnchor: [1, -34],
  });

  const yellowIcon = new L.Icon({
    iconUrl: "/image/marker-icon-gold.png",
    iconSize: [17, 28],
    iconAnchor: [9, 28],
    popupAnchor: [1, -34],
  });

  const blackIcon = new L.Icon({
    iconUrl: "/image/marker-icon-black.png",
    iconSize: [17, 28],
    iconAnchor: [9, 28],
    popupAnchor: [1, -34],
  });

  const orangeIcon = new L.Icon({
    iconUrl: "/image/marker-icon-orange.png",
    iconSize: [17, 28],
    iconAnchor: [9, 28],
    popupAnchor: [1, -34],
  });

  for (let i = 0; i < ais1.value.length; i++) {
    L.marker(ais1.value[i], { icon: redIcon })
      .addTo(map)
      .bindPopup(`waypoint: ${ais1.value[i]}`);
  }

  for (let i = 0; i < ais2.value.length; i++) {
    L.marker(ais2.value[i], { icon: yellowIcon })
      .addTo(map)
      .bindPopup(`waypoint: ${ais2.value[i]}`);
  }

  for (let i = 0; i < ais3.value.length; i++) {
    L.marker(ais3.value[i], { icon: blueIcon })
      .addTo(map)
      .bindPopup(`waypoint: ${ais3.value[i]}`);
  }

  for (let i = 0; i < ais4.value.length; i++) {
    L.marker(ais4.value[i], { icon: greenIcon })
      .addTo(map)
      .bindPopup(`waypoint: ${ais4.value[i]}`);
  }

  for (let i = 0; i < ais5.value.length; i++) {
    L.marker(ais5.value[i], { icon: blackIcon })
      .addTo(map)
      .bindPopup(`waypoint: ${ais5.value[i]}`);
  }

  for (let i = 0; i < ais6.value.length; i++) {
    L.marker(ais6.value[i], { icon: orangeIcon })
      .addTo(map)
      .bindPopup(`waypoint: ${ais6.value[i]}`);
  }

  
    L.marker([35.27678, 129.315888], { icon: shipIcon })
    .addTo(map)
    .bindPopup("Realtime Location.")
    .openPopup();

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
