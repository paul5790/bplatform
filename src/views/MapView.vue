<template>
  <div style="padding: 28px; padding-top: 0px;">
    <v-sheet
      style="height: 7vh; padding-left: 50; padding-right: 50; display: flex"
    >
      <v-card :color="primary" :variant="elevated" style="flex: 1">
        <v-card-item>
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
              <v-btn style="width: 100px; margin-top: 10px">조회하기</v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-sheet>
    <div id="map" style="height: 83vh"></div>
  </div>
</template>

<script setup>
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
    [35.46, 129.38],
    [35.47, 129.39],
    [35.48, 129.4],
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
</script>

<style scoped></style>
