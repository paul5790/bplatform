<template>
  <v-window v-model="window" show-arrows>
    <v-window-item :key="1">
      <v-card height="100vh" class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="3">
            <v-sheet style="height: 50vh">
              <div style="padding: 30px">
                <OSMap />
              </div>
            </v-sheet>
            <v-sheet style="height: 50vh">
              <EchartHalfDoughnut />
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <v-sheet style="height: 50vh">
              <GyroComponent />
            </v-sheet>
            <v-sheet style="height: 50vh">
              <EchartWind />
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <v-sheet style="height: 50vh">
              <EchartGauge />
            </v-sheet>
            <v-sheet style="height: 50vh">
              <EchartStarPort />
            </v-sheet>
          </v-col>
          <v-col cols="3">
            <v-sheet style="height: 100vh">
              <SocketChecking :checkdata=checkdata />
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item :key="2">
      <v-card height="100vh" class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="4">
            <v-sheet style="height: 50vh">
              <ex1 />
            </v-sheet>
            <v-sheet style="height: 50vh">
              <SaillingAnimation />
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet style="height: 50vh">
              <OSMEchartDoughnutap />
            </v-sheet>
            <v-sheet style="height: 50vh">
              <EchartDrillDown />
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet style="height: 50vh">
              <EchartDoughnut />
            </v-sheet>
            <v-sheet style="height: 50vh">
              <EchartHalfDoughnut />
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script setup>
import OSMap from "../components/OSMap.vue";
import ex1 from "../components/EchartGraph/ExChart1.vue";
import GyroComponent from "../components/GyroComponent.vue";
import SocketChecking from "../components/SocketChecking.vue";
import EchartHalfDoughnut from "../components/EchartGraph/EchartHalfDoughnut";
import EchartDoughnut from "../components/EchartGraph/EchartDoughnut.vue";
import EchartWind from "../components/EchartGraph/EchartWind.vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";
import EchartDrillDown from "../components/EchartGraph/EchartDrillDown.vue";

const length = ref(3);
const window = ref(0);
// 웹소켓 관련, Web Socket
import { ref, inject } from "vue";
import { onMessage, onOpen, onClose, onError } from "vue3-websocket";

const text = ref(""); // 보낼 데이터
const responseMsg = ref(""); // 받아온 데이터

var checkdata = {
  GLL: 'ok',
  GGA: 'ok',
  RMC: 'no',
  VTG: 'no',
  ZDA: 'no',
  DTM: 'no',
  GSV: 'no',
  GSA: 'no',
  THS: 'no',
  HDT: 'no',
  ROT: 'no',
  MWV: 'no',
  MWD: 'no',
  VWR: 'no',
  MTW: 'no',
  VWT: 'no',
  TTM: 'no',
  TLL: 'no',
  RSCREEN: 'no',
  VDM: 'no',
  VDO: 'no',
  ROUTEINFO: 'no',
  WAYPOINTS: 'no',
  ESCREEN: 'no',
  RSA: 'no',
  MODE: 'no',
  HTD: 'no',
  VBW: 'no',
  VHW: 'no',
  VLW: 'no',
  NO1ENGINE_PANEL_61444: 'no',
  NO1ENGINE_PANEL_65262: 'no',
  NO1ENGINE_PANEL_65263: 'no',
  NO1ENGINE_PANEL_65272: 'no',
  NO1ENGINE_PANEL_65271: 'no',
  NO1ENGINE_PANEL_65253: 'no',
  NO1ENGINE_PANEL_65270: 'no',
  NO1ENGINE_PANEL_65276: 'no',
  NO1ENGINE_PANEL_65360: 'no',
  NO1ENGINE_PANEL_65361_LAMP: 'no',
  NO1ENGINE_PANEL_65361_STATUS: 'no',
  NO1ENGINE_PANEL_65378: 'no',
  NO1ENGINE_PANEL_65376: 'no',
  NO1ENGINE_PANEL_65379: 'no',
  NO2ENGINE_PANEL_61444: 'no',
  NO2ENGINE_PANEL_65262: 'no',
  NO2ENGINE_PANEL_65263: 'no',
  NO2ENGINE_PANEL_65272: 'no',
  NO2ENGINE_PANEL_65271: 'no',
  NO2ENGINE_PANEL_65253: 'no',
  NO2ENGINE_PANEL_65270: 'no',
  NO2ENGINE_PANEL_65276: 'no',
  NO2ENGINE_PANEL_65360: 'no',
  NO2ENGINE_PANEL_65361_LAMP: 'no',
  NO2ENGINE_PANEL_65361_STATUS: 'no',
  NO2ENGINE_PANEL_65378: 'no',
  NO2ENGINE_PANEL_65376: 'no',
  NO2ENGINE_PANEL_65379: 'no',
}
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
