<template>
  <div>
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    <div>
      <p>Zoom Range: {{ zoomRange }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
const zoomRange = ref('');

let myChart = null;

const initChart = () => {
  myChart = echarts.init(chartRef.value);
  const option = {
    title: {
      text: 'Line Chart with Data Zoom'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Data',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0
      },
      {
        type: 'slider',
        xAxisIndex: 0
      }
    ]
  };
  myChart.setOption(option);

  // Add event listener for dataZoom
  myChart.on('dataZoom', (params) => {
    const xAxis = option.xAxis.data;
    const startIndex = Math.round(params.start / 100 * (xAxis.length - 1));
    const endIndex = Math.round(params.end / 100 * (xAxis.length - 1));
    zoomRange.value = `${xAxis[startIndex]} to ${xAxis[endIndex]}`;
  });
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});
</script>

<style scoped>
/* 필요한 스타일을 추가할 수 있습니다 */
</style>