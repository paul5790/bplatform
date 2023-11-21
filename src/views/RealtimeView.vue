<template>
  <v-card height="93vh" class="pa-1 d-flex justify-center align-center">
    <v-row>
      <!-- 왼쪽 큰 박스 -->
      <v-col cols="10" style="padding: 30px; padding-right: 5px">
        <v-row>
          <!-- (최) 지도 뷰 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <!-- <OSMap /> -->
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 헤딩 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartHeading />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 속도 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartGauge
                    :name="'Speed (SPEEDLOG)'"
                    :left="'left'"
                    :unit="'kt'"
                    :center_y="'45%'"
                    :max_speed="200"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 러더 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartStarPort />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <!-- 엔진1 -->
          <v-col cols="6" no-gutters style="padding: 3px">
            <v-card style="flex: 1">
              <v-card-item>
                <v-row>
                  <!-- (최) 엔진 rpm -->
                  <v-col cols="6" no-gutters style="padding: 3px">
                    <v-sheet style="height: 34vh; padding: 5px; display: flex">
                      <EchartGauge
                        :name="'Engine Speed'"
                        :left="'center'"
                        :unit="'rpm'"
                        :center_y="'50%'"
                        :max_speed="200"
                      />
                    </v-sheet>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 엔진오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilPressure'"
                            :value="engine1_OilPressure"
                            :unit="'kPa'"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 엔진오일 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px"
                        ><v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilTemperature'"
                            :value="engine1_OilTemperature"
                            :unit="'°C'"
                          /> </v-sheet
                      ></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 변속기오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'TransmissionPressure'"
                            :value="engine1_TransmissionPressure"
                            :unit="'kPa'"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 배기가스 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'ExhaustGasTemperature'"
                            :value="engine1_ExhaustGasTemperature"
                            :unit="'°C'"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
            <!-- (최) Lamp뷰 -->
            <v-row>
              <v-col cols="12" no-gutters style="padding-top: 15px">
                <v-sheet style="height: 20vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <EngineLampChecking :checkdata="checkdata2" />
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          <!-- 엔진2 -->
          <v-col cols="6" no-gutters style="padding: 3px">
            <v-card style="flex: 1">
              <v-card-item>
                <v-row>
                  <!-- (최) 엔진 rpm -->
                  <v-col cols="6" no-gutters style="padding: 3px">
                    <v-sheet style="height: 34vh; padding: 5px; display: flex">
                      <EchartGauge
                        :name="'Engine Speed'"
                        :left="'center'"
                        :unit="'rpm'"
                        :center_y="'50%'"
                        :max_speed="200"
                      />
                    </v-sheet>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 엔진오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilPressure'"
                            :value="engine2_OilPressure"
                            :unit="'kPa'"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 엔진오일 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px"
                        ><v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilTemperature'"
                            :value="engine2_OilTemperature"
                            :unit="'°C'"
                          /> </v-sheet
                      ></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 변속기오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'TransmissionPressure'"
                            :value="engine2_TransmissionPressure"
                            :unit="'kPa'"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 배기가스 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'ExhaustGasTemperature'"
                            :value="engine2_ExhaustGasTemperature"
                            :unit="'°C'"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
            <!-- (최) Lamp뷰 -->
            <v-row>
              <v-col cols="12" no-gutters style="padding-top: 15px">
                <v-sheet style="height: 20vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <EngineLampChecking :checkdata="checkdata2" />
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <!-- (최)데이터 확인 박스 -->
      <v-col cols="2">
        <v-sheet
          style="height: 92vh; padding-right: 0; display: flex"
        >
          <v-card style="flex: 1">
            <v-card-item>
              <SocketChecking :checkdata="checkdata" />
            </v-card-item>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import OSMap from "../components/OSMap.vue";
import SocketChecking from "../components/SocketChecking.vue";
import EngineLampChecking from "../components/EngineLampChecking.vue";
import EchartHeading from "../components/EchartGraph/EchartHeading.vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartGaugeVolt from "../components/EchartGraph/EchartGaugeVolt.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";

// 웹소켓 관련, Web Socket
import { ref, inject, onMounted } from "vue";
import { onMessage, onOpen, onClose, onError } from "vue3-websocket";

const text = ref(""); // 보낼 데이터
const responseMsg = ref(""); // 받아온 데이터

// Props Value 데이터
let engine1_OilTemperature = ref();
let engine1_OilPressure = ref();
let engine1_TransmissionPressure = ref();
let engine1_ExhaustGasTemperature = ref();
let engine2_OilTemperature = ref();
let engine2_OilPressure = ref();
let engine2_TransmissionPressure = ref();
let engine2_ExhaustGasTemperature = ref();

const updateValue = () => {
  engine1_OilTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine1_OilTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine1_OilPressure.value = Math.floor(Math.random() * 10 + 8);
  engine1_TransmissionPressure.value = Math.floor(Math.random() * 10 + 8);
  engine1_ExhaustGasTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine2_OilTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine2_OilPressure.value = Math.floor(Math.random() * 10 + 8);
  engine2_TransmissionPressure.value = Math.floor(Math.random() * 10 + 8);
  engine2_ExhaustGasTemperature.value = Math.floor(Math.random() * 10 + 8);
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});

var checkdata = {
  GLL: "ok",
  GGA: "ok",
  RMC: "no",
  VTG: "no",
  ZDA: "no",
  DTM: "no",
  GSV: "no",
  GSA: "no",
  THS: "no",
  HDT: "no",
  ROT: "no",
  MWV: "no",
  MWD: "no",
  VWR: "no",
  MTW: "no",
  VWT: "no",
  TTM: "no",
  TLL: "no",
  RSCREEN: "no",
  VDM: "no",
  VDO: "no",
  ROUTEINFO: "no",
  WAYPOINTS: "no",
  ESCREEN: "no",
  RSA: "no",
  MODE: "no",
  HTD: "no",
  VBW: "no",
  VHW: "no",
  VLW: "no",
  NO1ENGINE_PANEL_61444: "no",
  NO1ENGINE_PANEL_65262: "no",
  NO1ENGINE_PANEL_65263: "no",
  NO1ENGINE_PANEL_65272: "no",
  NO1ENGINE_PANEL_65271: "no",
  NO1ENGINE_PANEL_65253: "no",
  NO1ENGINE_PANEL_65270: "no",
  NO1ENGINE_PANEL_65276: "no",
  NO1ENGINE_PANEL_65360: "no",
  NO1ENGINE_PANEL_65361_LAMP: "no",
  NO1ENGINE_PANEL_65361_STATUS: "no",
  NO1ENGINE_PANEL_65378: "no",
  NO1ENGINE_PANEL_65376: "no",
  NO1ENGINE_PANEL_65379: "no",
  NO2ENGINE_PANEL_61444: "no",
  NO2ENGINE_PANEL_65262: "no",
  NO2ENGINE_PANEL_65263: "no",
  NO2ENGINE_PANEL_65272: "no",
  NO2ENGINE_PANEL_65271: "no",
  NO2ENGINE_PANEL_65253: "no",
  NO2ENGINE_PANEL_65270: "no",
  NO2ENGINE_PANEL_65276: "no",
  NO2ENGINE_PANEL_65360: "no",
  NO2ENGINE_PANEL_65361_LAMP: "no",
  NO2ENGINE_PANEL_65361_STATUS: "no",
  NO2ENGINE_PANEL_65378: "no",
  NO2ENGINE_PANEL_65376: "no",
  NO2ENGINE_PANEL_65379: "no",
};
var checkdata2 = {
  1: "ok",
  2: "ok",
  3: "no",
  4: "no",
  5: "no",
  6: "no",
  7: "no",
  8: "no",
  9: "no",
  10: "no",
  11: "no",
  12: "no",
  13: "no",
  14: "no",
  15: "no",
  16: "no",
};
console.log(checkdata.gll);
console.log(checkdata.gga);
console.log(checkdata.rmc);

// const socket = inject("socket");

// const sendMessage = () => socket.value.send(text.value);

// onOpen(() => {
//   console.log("WS connection is stable! ~uWu~");
// });

// onMessage((message) => {
//   responseMsg.value = message.data;
//   console.log("Got a message from the WS: ", message);
// });

// onClose(() => {
//   console.log("No way, connection has been closed 😥");
// });

// onError((error) => {
//   console.error("Error: ", error);
// });
</script>

<style scoped></style>
