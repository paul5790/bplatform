<template>
  <v-window v-model="window" show-arrows>
    <v-window-item :key="1">
      <v-card height="93vh" class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="4" sm="12" md="6" lg="4">
            <!-- 실시간 위치(지도) -->
            <v-sheet
              style="
                height: 53vh;
                padding: 10px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <OSMap />
                </v-card-item>
              </v-card>
            </v-sheet>

            <!-- DGPS 정보 (수정필요) -->
            <v-sheet
              style="
                height: 40vh;
                padding: 10px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <DgpsInfo />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <!-- 자이로 센서  -->
            <v-sheet
              style="
                height: 46.5vh;
                padding: 10px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <GyroComponent />
                </v-card-item>
              </v-card>
            </v-sheet>

            <!-- 바람 게이지 -->
            <v-sheet
              style="
                height: 46.5vh;
                padding: 10px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartWind />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <!-- 선박 속도(SPEEDK) -->
            <v-sheet
              style="
                height: 46.5vh;
                padding: 10px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartGauge
                    :name="'선박 속도'"
                    :left="'left'"
                    :unit="'kt'"
                    :center_y="'60%'"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>

            <!-- 러더 위치 -->
            <v-sheet
              style="
                height: 46.5vh;
                padding: 10px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartStarPort />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <!-- 소켓 데이터 체크 -->
            <v-sheet
              style="
                height: 93vh;
                padding: 10px;
                padding-left: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <SocketChecking :checkdata="checkdata" />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item :key="2">
      <v-card class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="5">
            <v-sheet
              style="
                height: 43vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartGauge
                    :name="'Engine Speed'"
                    :unit="'rpm'"
                    :left="'right'"
                    :center_y="'50%'"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>

            <v-sheet
              style="
                height: 25vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <v-row>
                    <v-col cols="6">
                      <EchartGaugeVolt :name="'Battery Potential'" />
                    </v-col>
                    <v-col cols="6">
                      <EchartGaugeVolt :name="'charging System'" />
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-sheet>

            <v-sheet
              style="
                height: 25vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <v-row>
                    <v-col cols="6">
                      <EchartPercentGauge :name="'Coolant Level'" />
                    </v-col>
                    <v-col cols="6">
                      <EchartPercentGauge :name="'Fuel Level'" />
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="5">
            <v-sheet
              style="
                height: 46.5vh;
                padding: 5px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartBarkPa :name="'Pressure(kPa)'" :barWidth="40" />
                </v-card-item>
              </v-card>
            </v-sheet>

            <v-sheet
              style="
                height: 46.5vh;
                padding: 5px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartBarkPa :name="'Temperature(°C)'" :barWidth="40" />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet
              style="
                height: 93vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EngineLampChecking :checkdata="checkdata2" />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item :key="3">
          <v-card class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="5">
            <v-sheet
              style="
                height: 43vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartGauge
                    :name="'Engine Speed'"
                    :unit="'rpm'"
                    :left="'right'"
                    :center_y="'50%'"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>

            <v-sheet
              style="
                height: 25vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <v-row>
                    <v-col cols="6">
                      <EchartGaugeVolt :name="'Battery Potential'" />
                    </v-col>
                    <v-col cols="6">
                      <EchartGaugeVolt :name="'charging System'" />
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-sheet>

            <v-sheet
              style="
                height: 25vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <v-row>
                    <v-col cols="6">
                      <EchartPercentGauge :name="'Coolant Level'" />
                    </v-col>
                    <v-col cols="6">
                      <EchartPercentGauge :name="'Fuel Level'" />
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="5">
            <v-sheet
              style="
                height: 46.5vh;
                padding: 5px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartBarkPa :name="'Pressure(kPa)'" :barWidth="40" />
                </v-card-item>
              </v-card>
            </v-sheet>

            <v-sheet
              style="
                height: 46.5vh;
                padding: 5px;
                padding-left: 0;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EchartBarkPa :name="'Temperature(°C)'" :barWidth="40" />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="2">
            <v-sheet
              style="
                height: 93vh;
                padding: 5px;
                padding-right: 0;
                display: flex;
              "
            >
              <v-card :color="primary" :variant="elevated" style="flex: 1">
                <v-card-item>
                  <EngineLampChecking :checkdata="checkdata2" />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script setup>
import OSMap from "../components/OSMap.vue";
import DgpsInfo from "../components/DgpsInfo.vue";
import GyroComponent from "../components/GyroComponent.vue";
import TableComponent from "../components/TableComponent.vue";
import SocketChecking from "../components/SocketChecking.vue";
import EngineLampChecking from "../components/EngineLampChecking.vue";
import EchartPercentGauge from "../components/EchartGraph/EchartPercentGauge.vue";
import EchartWind from "../components/EchartGraph/EchartWind.vue";
import EchartBarkPa from "../components/EchartGraph/EchartBarkPa.vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartGaugeVolt from "../components/EchartGraph/EchartGaugeVolt.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";

const length = ref(3);
const window = ref(0);
// 웹소켓 관련, Web Socket
import { ref, inject } from "vue";
import { onMessage, onOpen, onClose, onError } from "vue3-websocket";

const text = ref(""); // 보낼 데이터
const responseMsg = ref(""); // 받아온 데이터

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

const socket = inject("socket");

const sendMessage = () => socket.value.send(text.value);

onOpen(() => {
  console.log("WS connection is stable! ~uWu~");
});

onMessage((message) => {
  responseMsg.value = message.data;
  console.log("Got a message from the WS: ", message);
});

onClose(() => {
  console.log("No way, connection has been closed 😥");
});

onError((error) => {
  console.error("Error: ", error);
});
</script>

<style scoped></style>
