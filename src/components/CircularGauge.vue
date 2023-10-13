<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12">
      <div class="center">
        <apexchart
          width="500"
          type="radialBar"
          :options="chartOptions"
          :series="chartSeries"
        ></apexchart>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const chartOptions = ref({
  chart: {
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: "16px",
          color: undefined,
          offsetY: 120,
        },
        value: {
          offsetY: 76,
          fontSize: "22px",
          color: '#ffffff',
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
  labels: ["Median Ratio"],
});

const chartSeries = ref([67]);

onMounted(() => {
  // 여기에서 차트를 초기화하는 코드가 없어도 됩니다.
});

// 데이터나 옵션이 변경될 때 차트 업데이트
watch(chartOptions, () => {
  // 차트 옵션 변경을 감지하면 자동으로 차트가 업데이트됩니다.
});
watch(chartSeries, () => {
  // 차트 데이터 변경을 감지하면 자동으로 차트가 업데이트됩니다.
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