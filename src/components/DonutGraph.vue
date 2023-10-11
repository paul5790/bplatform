<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12">
      <div class="center">
        <Doughnut :options="chartOptions" :data="chartData" />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  datasets: [
    {
      labels: ["value", "money"],
      backgroundColor: ["#ff8888", "#8888ff"],
      data: [80, 20],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

// If you want to update the chart data dynamically, you can do so like this:
// chartData.value.datasets[0].data = [50, 30, 22]
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  object-fit: cover;
  height: 200px;
}

/* 이미지의 최대 너비와 높이를 설정하고 비율을 유지 */
</style>
