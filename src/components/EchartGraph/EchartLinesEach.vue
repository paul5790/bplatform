<template>
  <div>
    <v-chart
      v-if="selectedGraph === 'Email'"
      class="chart"
      :option="emailOption"
      autoresize
    />
    <v-chart
      v-if="selectedGraph === 'Union Ads'"
      class="chart"
      :option="unionAdsOption"
      autoresize
    />
    <v-chart
      v-if="selectedGraph === 'Video Ads'"
      class="chart"
      :option="videoAdsOption"
      autoresize
    />
    <v-chart
      v-if="selectedGraph === 'Direct'"
      class="chart"
      :option="directOption"
      autoresize
    />
    <v-chart
      v-if="selectedGraph === 'Search Engine'"
      class="chart"
      :option="searchEngineOption"
      autoresize
    />

    <v-btn @click="selectGraph('Email')">이메일</v-btn>
    <v-btn @click="selectGraph('Union Ads')">유니언 광고</v-btn>
    <v-btn @click="selectGraph('Video Ads')">비디오 광고</v-btn>
    <v-btn @click="selectGraph('Direct')">직접 방문</v-btn>
    <v-btn @click="selectGraph('Search Engine')">검색 엔진</v-btn>
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts"; // BarChart로 변경
import { UniversalTransition } from "echarts/features";
import {
  DatasetComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  TransformComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  DataZoomComponent,
]);

provide(THEME_KEY);

const selectedGraph = ref(null);

const selectGraph = (graphName) => {
  selectedGraph.value = selectedGraph.value === graphName ? null : graphName;
};

const emailOption = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
    ],
  },
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [
        120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 132, 101,
        134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230,
        210,
      ],
    },
  ],
});
const unionAdsOption = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
    ],
  },
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  series: [
    
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [
        220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310, 182,
        191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310, 182, 191, 234,
        290, 330, 310,
      ],
    },
    
  ],
});
const videoAdsOption = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
    ],
  },
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  series: [
    
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [
        150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232,
        201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410, 232, 201, 154,
        190, 330, 410,
      ],
    },
    
  ],
});
const directOption = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
    ],
  },
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  series: [
    
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [
        320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330, 320, 332,
        301, 334, 390, 330, 320, 332, 301, 334, 390, 330, 320, 332, 301, 334,
        390, 330, 320,
      ],
    },

  ],
});
const searchEngineOption = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
      "2023-08-29T08:28:43",
    ],
  },
  yAxis: {
    type: "value",
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1],
      height: "2%",
    },
  ],
  series: [
    
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [
        820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320,
        932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330, 1320, 932,
        901, 934, 1290, 1330, 1320,
      ],
    },
  ],
});

</script>

<style scoped>
.chart {
  height: 87vh;
}
body {
  margin: 0;
}
</style>
