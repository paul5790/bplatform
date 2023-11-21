<template>
  <v-card height="93vh" class="pa-1 d-flex justify-center align-center">
    <p>게스트페이지(이용가이드)</p>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EchartLine from "../components/EchartGraph/EchartLine.vue";
// 왼쪽 셀렉바 설정
const subComponents = ref([
  "DGPS",
  "GYRO",
  "ANEMOMETER",
  "RADAR",
  "AIS",
  "ECDIS",
  "AUTOPILOT",
  "SPEEDLOG",
  "NO.1ENGINEPANEL",
  "NO.2ENGINEPANEL",
]);
const items = ref([
  "LATITUDE",
  "LONGITUDE",
  "ALTITUDE",
  "COURSEOVERGROUNDDEGREESTRUE",
  "SPEEDOVERGROUNDKNOTS",
]);
const trialrun = ref(["시운전1", "시운전2", "시운전3", "시운전4"]);
const runitem = ref(null);

const items1 = ref([
  "SPEEDLOG/SPEEDK",
  "DGPS/SOG",
  "Engine1/EngineSpeed",
  "Engine2/EngineSpeed",
]);
const selectedItem = ref(null);
const selectedItem1 = ref(null);


// 데이터 테이블 헤더
const headers = ref([
  {
    title: "신호",
    align: "end",
    key: "name", sortable: false,
  },
  { title: "최솟값", align: "end", key: "min", sortable: false,},
  { title: "최댓값", align: "end", key: "max", sortable: false,},
  { title: "평균값", align: "end", key: "average", sortable: false,},
  { title: "표준편차", align: "end", key: "rmse", sortable: false,},
  { title: "RMS", align: "end", key: "rms", sortable: false,},
  { title: "첨도", align: "end", key: "kurtosis", sortable: false,},
  { title: "wave factor", align: "end", key: "wave", sortable: false,},
  { title: "crest factor", align: "end", key: "crest", sortable: false,},
]);

const analysis = ref([
  {
    name: "signal",
    min: 7.1123,
    max: 33.1564,
    average: 17.1789,
    rmse: 0.5317,
    rms: 0.5317,
    kurtosis: 2.8685,
    crest: 3.5781,
    wave: 3.4387,
  },
]);

// 데이트 피커
const date = ref();

const startDate = new Date();
const endDate = new Date();
onMounted(() => {
  date.value = [startDate, endDate];
});
</script>

<style scoped>
.custom-select {
  --v-select-menu-font-size: 10px;
}
</style>
