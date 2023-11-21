<template>
  <v-card height="93vh" class="pa-1 d-flex justify-center align-center">
    <v-row>
      <v-col cols="9">
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              style="
                height: 75vh;
                padding: 30px;
                padding-bottom: 0px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartLine />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              style="
                height: 20vh;
                padding: 30px;
                padding-top: 10px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <v-data-table-virtual
                    style=""
                    :headers="headers"
                    :items="analysis"
                    item-value="name"
                  >
                  </v-data-table-virtual>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="3">
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px">
            <v-sheet
              style="
                height: 93vh;
                padding: 30px;
                padding-bottom: 5px;
                padding-left: 10;
                display: flex;
              "
            >
              <v-card :variant="elevated" style="flex: 1">
                <v-card-item>
                  <div>
                    <v-select
                      v-model="runitem"
                      :items="subComponents"
                      label="구성 요소"
                      variant="outlined"
                      class="custom-select"
                      style="margin-top: 3vh"
                    ></v-select>

                    <v-select
                      v-model="selectedItem"
                      :items="items"
                      label="신호 선택"
                      variant="outlined"
                      class="custom-select"
                    ></v-select>

                    <v-select
                      v-model="selectedItem1"
                      :items="trialrun"
                      label="항차 선택"
                      variant="outlined"
                      class="custom-select"
                    ></v-select>
                    <VueDatePicker
                      style="--dp-input-padding: 15px"
                      v-model="date"
                      range
                      :readonly="true"
                    />

                    <v-btn
                      style="margin-top: 30px"
                      mt-xcxcbzxb
                      width="500px"
                      color="blue"
                      :variant="elevated"
                    >
                      조회하기
                    </v-btn>
                  </div>
                  <p style="margin-top: 38vh"></p>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
