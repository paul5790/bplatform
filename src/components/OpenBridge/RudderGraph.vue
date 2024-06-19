<template>
  <v-sheet class="manager-sheet">
<ob-rudder-medium :rudderAngle="0"></ob-rudder-medium>
    <p style="font-size: 15px; font-weight: 700">{{ (rudderAngle / 3).toFixed(1) }}˚</p>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const rudderAngle = ref(0);
const rudderSetPointAngle = ref(0);

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const updateRudderAngle = () => {
  rudderAngle.value = getRandomValue(-120, 120); // -120도에서 120도 사이의 랜덤 값
  rudderSetPointAngle.value = getRandomValue(-45, 45); // -45도에서 45도 사이의 랜덤 값
};

let interval;

onMounted(() => {
  interval = setInterval(updateRudderAngle, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style>
.manager-sheet {
  padding: 20px;
}
</style>