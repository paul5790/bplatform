<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12">
      <div class="center">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="chartSeries"
        ></apexchart>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import VueApexCharts from "vue3-apexcharts"; // ApexCharts 라이브러리 import
import "vue3-apexcharts/dist/vue3-apexcharts.css"; // 스타일 import

const chartOptions = ref({
  annotations: {
    points: [
      {
        x: "Bananas",
        seriesIndex: 0,
        label: {
          borderColor: "#775DD0",
          offsetY: 0,
          style: {
            color: "#fff",
            background: "#775DD0",
          },
          text: "Bananas are good",
        },
      },
    ],
  },
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "50%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [50, 0, 100],
    },
  },
  xaxis: {
    labels: {
      rotate: -45,
    },
    categories: [
      "Apples",
      "Oranges",
      "Strawberries",
      "Pineapples",
      "Mangoes",
      "Bananas",
      "Blackberries",
      "Pears",
      "Watermelons",
      "Cherries",
      "Pomegranates",
      "Tangerines",
      "Papayas",
    ],
    tickPlacement: "on",
  },
  yaxis: {
    title: {
      text: "Servings",
    },
  },
  stroke: {
    width: 2,
  },
  grid: {
    row: {
      colors: ["#fff", "#f2f2f2"],
    },
  },
  labels: ["Median Ratio"],
});

const chartSeries = ref([44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35]);

onMounted(() => {
  // 차트 초기화
  const chart = new VueApexCharts();
  chart.initChart("chart", chartOptions.value);
  chart.renderSeries(chartOptions.value, chartSeries.value);
});

// 데이터나 옵션이 변경될 때 차트 업데이트
watch(chartOptions, () => {
  const chart = new VueApexCharts();
  chart.updateOptions(chartOptions.value);
});

watch(chartSeries, () => {
  const chart = new VueApexCharts();
  chart.updateSeries(chartSeries.value);
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  object-fit: cover;
}

/* 이미지의 최대 너비와 높이를 설정하고 비율을 유지 */
</style>
