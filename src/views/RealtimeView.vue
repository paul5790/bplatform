<template>
  <v-window v-model="window" show-arrows>
    <v-window-item :key="1">
      <v-card height="100vh" class="d-flex justify-center align-center">
        <v-row>
          <v-col cols="2">
            <v-sheet style="height: 50vh">
              <ex1 />
            </v-sheet>
          </v-col>
          <v-col cols="4">
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
              <ex1 />
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
import SaillingAnimation from "../components/SaillingLottie.vue";
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
