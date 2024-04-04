<template>
  <div class="autocomplete-container">
    <v-sheet
      :elevation="elevation"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <div id="main" style="height: 400px;"></div>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { GraphicComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  GraphicComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);

// Data
const data_things = [
  ['Animals', 3, 'things', 'animals'],
  ['Fruits', 3, 'things', 'fruits'],
  ['Cars', 2, 'things', 'cars']
];

const data_animals = [
  ['Dogs', 3, 'animals', 'dogs'],
  ['Cats', 4, 'animals', 'cats'],
  ['Birds', 3, 'animals', 'birds']
];

const data_fruits = [
  ['Pomes', 3, 'fruits', 'pomes'],
  ['Berries', 4, 'fruits', 'berries'],
  ['Citrus', 9, 'fruits', 'citrus']
];

// Other data arrays...

const allLevelData = [
  data_things,
  data_animals,
  data_fruits,
  // Include other data arrays here...
];

// Options
const allOptions = {};
const optionStack = [];
let option;

allLevelData.forEach((data) => {
  const optionId = data[0][2];
  const optionValue = {
    id: optionId,
    xAxis: { type: 'category' },
    yAxis: { minInterval: 1 },
    animationDurationUpdate: 500,
    series: {
      type: 'bar',
      dimensions: ['x', 'y', 'groupId', 'childGroupId'],
      encode: {
        x: 'x',
        y: 'y',
        itemGroupId: 'groupId',
        itemChildGroupId: 'childGroupId'
      },
      data,
      universalTransition: { enabled: true, divideShape: 'clone' }
    },
    graphic: [
      {
        type: 'text',
        left: 50,
        top: 20,
        style: { text: 'Back', fontSize: 18, fill: 'grey' },
        onclick: function () {
          goBack();
        }
      }
    ]
  };
  allOptions[optionId] = optionValue;
});

option = allOptions['things'];

// ECharts initialization and event handling
let myChart;

onMounted(() => {
  const chartDom = document.getElementById('main');
  myChart = echarts.init(chartDom);
  myChart.setOption(option);

  myChart.on('click', 'series', (params) => {
    const dataItem = params.data;
    if (dataItem[3]) {
      const childGroupId = dataItem[3];
      const nextOptionId = childGroupId;
      goForward(nextOptionId);
    }
  });
});

// Functions
const goForward = (optionId) => {
  optionStack.push(myChart.getOption().id);
  myChart.setOption(allOptions[optionId]);
};

const goBack = () => {
  if (optionStack.length === 0) {
    console.log('Already in root level!');
  } else {
    console.log('Go back to previous level.');
    myChart.setOption(allOptions[optionStack.pop()]);
  }
};
</script>