<template>
  <v-row>
    <v-col cols="9">
      <v-sheet
        style=" padding: 30px; padding-right: 0; display: flex"
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <EchartLine />
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="3">
      <v-sheet style="height: 43vh; padding: 30px; display: flex">
        <v-card :variant="elevated" style="flex: 1">
          <v-card-item>
            <div>
              <v-select
                v-model="runitem"
                :items="trialrun"
                density="compact"
                label="Compact"
                variant="outlined"
                class="custom-select"
                style="margin-top: 10vh; width: 130px; height: 50%px;"
              ></v-select>

              <v-select
                v-model="selectedItem"
                :items="items1"
                density="compact"
                label="Compact"
                variant="outlined"
              ></v-select>

              <v-btn mt-xcxcbzxb width="500px" color="blue" :variant="elevated">
                조회하기
              </v-btn>
            </div></v-card-item
          >
        </v-card>
      </v-sheet>
      <v-sheet style="height: 50vh; padding: 30px; display: flex">
        <v-card :variant="elevated" style="flex: 1">
          <v-card-item>
            <div>
              date : 11-11

            </div></v-card-item
          >
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import EchartLine from "../components/EchartGraph/EchartLines.vue";
// 왼쪽 셀렉바 설정
const trialrun = ref(["풍속", "시운전2", "시운전3", "시운전4"]);
const runitem = ref(null);

const items1 = ref([
  "SPEEDLOG/SPEEDK",
  "DGPS/SOG",
  "Engine1/EngineSpeed",
  "Engine2/EngineSpeed",
]);
const selectedItem = ref(null);
</script>

<style scoped>
.custom-select {
  --v-select-menu-font-size: 10px;
}</style>
