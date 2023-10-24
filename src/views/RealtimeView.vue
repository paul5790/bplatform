<template>
  <v-row>
    <v-col cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <WeatherCard class="pa-2" />
      </v-sheet>
    </v-col>
    <v-col cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <CircularGauge class="pa-2" />
      </v-sheet>
    </v-col>
    <v-col cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <DonutGraph />
      </v-sheet>
    </v-col>
    <v-col cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <SaillingAnimation />
      </v-sheet>
    </v-col>

    <v-responsive width="100%"></v-responsive>

    <v-col cols="6">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <v-text-field v-model="text" />
        <v-btn @click="sendMessage">Send a message</v-btn>
        <v-text-field v-model="responseMsg" />
      </v-sheet>
    </v-col>
    <v-col cols="6">
      <v-sheet style="height: 50vh"> .v-col-auto </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import WeatherCard from "../components/WeatherCard.vue";
import CircularGauge from "../components/CircularGauge.vue";
import SaillingAnimation from "../components/SaillingLottie.vue";
import DonutGraph from "../components/DonutGraph.vue";


// 웹소켓 관련, Web Socket
import { ref, inject } from 'vue';
import { onMessage, onOpen, onClose, onError } from 'vue3-websocket';

const text = ref(''); // 보낼 데이터
const responseMsg = ref(''); // 받아온 데이터

const socket = inject('socket')

const sendMessage = () => socket.value.send(text.value)

onOpen(() => {
    console.log('WS connection is stable! ~uWu~')
})

onMessage(message => {
  responseMsg.value = message.data;
    console.log('Got a message from the WS: ', message)
})

onClose(() => {
    console.log('No way, connection has been closed 😥')
})

onError(error => {
    console.error('Error: ', error)
})



</script>

<style scoped></style>
