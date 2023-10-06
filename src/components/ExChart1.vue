<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12">
      <div class="center">
        <Bar :options="chartOptions" :data="chartData" />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref({
  labels: ["No.", "Name", "Value"],
  datasets: [
    {
      label: "value",
      backgroundColor: "#ff8888",
      data: [80, 20, 12],
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
