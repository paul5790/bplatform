<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import axios from "axios";

const DGPS = ref({ value: 0, name: "DGPS", itemStyle: { color: "#2Fe7b3" }  });
const GYRO = ref({ value: 0, name: "GYRO" });
const ANEMOMETER = ref({ value: 0, name: "ANEMOMETER" });
const RADAR = ref({ value: 0, name: "RADAR" });
const AIS = ref({ value: 0, name: "AIS" });
const ECDIS = ref({ value: 0, name: "ECDIS" });
const AUTOPILOT = ref({ value: 0, name: "AUTOPILOT" });
const SPEEDLOG = ref({ value: 0, name: "SPEEDLOG" });
const Canthrottle = ref({ value: 0, name: "Canthrottle", itemStyle: { color: "#2F55b3" }  });
const AUTOPILOTCONTACT = ref({ value: 0, name: "AUTOPILOTCONTACT", itemStyle: { color: "#fFb763" }  });
const NO1ENGINEPANEL = ref({ value: 0, name: "NO.1ENGINEPANEL" });
const NO2ENGINEPANEL = ref({ value: 0, name: "NO.2ENGINEPANEL" });

const fetchData = async () => {
  try {
    const response = await axios.post('http://192.168.0.73:8080/info/storage/table');
    const data = response.data;

    data.forEach((item) => {
      // Extracting the prefix before the underscore
      const prefix = item.tableName.split('_')[0];

      // Adding dataLength to the corresponding variable based on the prefix
      switch (prefix) {
        case 'ais':
          AIS.value.value += Number(item.tableSize);
          break;
        case 'gyro':
          GYRO.value.value += Number(item.tableSize);
          break;
        case 'anemometer':
          ANEMOMETER.value.value += Number(item.tableSize);
          break;
        case 'radar':
          RADAR.value.value += Number(item.tableSize);
          break;
        case 'dgps':
          DGPS.value.value += Number(item.tableSize);
          break;
        case 'ecdis':
          ECDIS.value.value += Number(item.tableSize);
          break;
        case 'autopilot':
          AUTOPILOT.value.value += Number(item.tableSize);
          break;
        case 'speedlog':
          SPEEDLOG.value.value += Number(item.tableSize);
          break;
        case 'canthrottle':
          Canthrottle.value.value += Number(item.tableSize);
          break;
        case 'autopilotcontact':
          AUTOPILOTCONTACT.value.value += Number(item.tableSize);
          break;
        case 'no1enginepanel':
          NO1ENGINEPANEL.value.value += Number(item.tableSize);
          break;
        case 'no2enginepanel':
          NO2ENGINEPANEL.value.value += Number(item.tableSize);
          break;
      }
    });

    // Log the calculated values
    console.log('AIS:', AIS.value);
    console.log('GYRO:', GYRO.value);
    console.log('ANEMOMETER:', ANEMOMETER.value);
    console.log('RADAR:', RADAR.value);
    console.log('DGPS:', DGPS.value);
    console.log('ECDIS:', ECDIS.value);
    console.log('AUTOPILOT:', AUTOPILOT.value);
    console.log('SPEEDLOG:', SPEEDLOG.value);
    console.log('NO.1ENGINEPANEL:', NO1ENGINEPANEL.value);
    console.log('NO.2ENGINEPANEL:', NO2ENGINEPANEL.value);
  } catch (error) {
    console.error(error);
  }
};

fetchData();

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY);

const option = ref({
  title: {
    text: "전체 데이터 저장 용량",
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}MB ({d}%)",
  },
  legend: {
    orient: "vertical", // 수직 방향으로 표시
    top: "middle", // 수직 정렬을 중앙으로 설정
    right: "10%",
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["30%", "50%"], // 이 부분을 수정하여 위치 조절
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        DGPS.value,
        GYRO.value,
        ANEMOMETER.value,
        RADAR.value,
        AIS.value,
        ECDIS.value,
        AUTOPILOT.value,
        SPEEDLOG.value,
        Canthrottle.value,
        AUTOPILOTCONTACT.value,
        NO1ENGINEPANEL.value,
        NO2ENGINEPANEL.value,
      ],
    },
  ],
});
</script>

<style scoped>
.chart {
  margin-top: 2vh;
  height: 40vh;
  padding: 5px;
}
body {
  margin: 0;
}
</style>
