<template>
  <v-row>
    <v-col cols="3">
      <v-sheet
        style="
          height: 100vh;
          padding: 30px;
          display: flex;
        "
      >
        <v-card :variant="elevated" style="flex: 1">
          <v-card-item>
            <div>
              <v-select
                v-model="runitem"
                :items="trialrun"
                density="compact"
                label="Compact"
                variant="outlined"
                style="margin-top: 30vh"
              ></v-select>

              <v-select
                v-model="selectedItem"
                :items="items1"
                density="compact"
                label="Compact"
                variant="outlined"
              ></v-select>
              
              <v-btn width="500px" color="blue" :variant="elevated" style="margin-top: 20px;">
                조회하기
              </v-btn>
              
              </div
          ></v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="9">
      <v-sheet
        style="
          height: 95vh;
          padding: 1px;
          margin-top: 30px;
          padding-right: 30px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          align-items: end;
        "
      >
      <EchartLine/>
      </v-sheet>
      <v-sheet
        style="
          height: auto;
          padding: 10px;
          padding-right: 30px;
          display: flex;
          align-items: start;
          justify-content: end;
        "
      >
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import EchartLine from "../components/EchartGraph/EchartLine.vue";
// 왼쪽 셀렉바 설정
const trialrun = ref(["시운전1", "시운전2", "시운전3", "시운전4"]);
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
</style>
