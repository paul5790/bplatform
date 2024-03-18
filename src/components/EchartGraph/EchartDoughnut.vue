<template>
  <div class="autocomplete-container">
    <v-select
      v-model="selectedtrialNum"
      label="select"
      :items="trialrun"
      variant="underlined"
      style="width: 120px; height: 5vh"
      position="top right"
      density="compact"
    ></v-select>
    <v-sheet
      :elevation="elevation"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <v-chart class="chart" :option="option" autoresize />
    </v-sheet>
  </div>
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
import { ref, provide, watch, onMounted } from "vue";
import {
  readTrialData,
  readDataStorage,
  readDataTrialStorage,
  createErrorData,
} from "../../api/index.js";
import { darkText, lightText } from "../../color/color.js";

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const textColor = ref(themeMode.value === "light" ? lightText : darkText);
watch(themeMode, (newValue) => {
  textColor.value = newValue === "light" ? lightText : darkText;
});

// 시운전 데이터
const trialrun = ref([]);
const selectedtrialNum = ref();

const DGPS = ref({ value: 0, name: "DGPS", itemStyle: { color: "#2Fe7b3" } });
const GYRO = ref({ value: 0, name: "GYRO" });
const ANEMOMETER = ref({ value: 0, name: "ANEMOMETER" });
const RADAR = ref({ value: 0, name: "RADAR" });
const AIS = ref({ value: 0, name: "AIS" });
const ECDIS = ref({ value: 0, name: "ECDIS" });
const AUTOPILOT = ref({ value: 0, name: "AUTOPILOT" });
const SPEEDLOG = ref({ value: 0, name: "SPEEDLOG" });
const Canthrottle = ref({
  value: 0,
  name: "Canthrottle",
  itemStyle: { color: "#2F55b3" },
});
const AUTOPILOTCONTACT = ref({
  value: 0,
  name: "AUTOPILOTCONTACT",
  itemStyle: { color: "#fFb763" },
});
const NO1ENGINEPANEL = ref({ value: 0, name: "NO.1ENGINEPANEL" });
const NO2ENGINEPANEL = ref({ value: 0, name: "NO.2ENGINEPANEL" });

const tokenid = ref(sessionStorage.getItem("token") || "");
const trialNum = ref(0);

watch(selectedtrialNum, (newTrialNum) => {
  console.log(selectedtrialNum.value);
  option.value.title.text = `${newTrialNum} 데이터 저장 용량`;
  // 항차 N번에서 N 추출
  AIS.value.value = 0;
  GYRO.value.value = 0;
  ANEMOMETER.value.value = 0;
  RADAR.value.value = 0;
  DGPS.value.value = 0;
  ECDIS.value.value = 0;
  AUTOPILOT.value.value = 0;
  SPEEDLOG.value.value = 0;
  Canthrottle.value.value = 0;
  AUTOPILOTCONTACT.value.value = 0;
  NO1ENGINEPANEL.value.value = 0;
  NO2ENGINEPANEL.value.value = 0;

  if (newTrialNum != "전체") {
    const num = parseInt(newTrialNum.match(/\d+/)[0]);
    fetchTrialData(num);
  } else {
    fetchAllData();
  }
  // const num = parseInt(newTrialNum.match(/\d+/)[0]);
  // trialNum.value = num;
  // fetchData();
});

const fetchAllData = async () => {
  try {
    const data = await readDataStorage(tokenid.value);
    dataFilter(data);
  } catch (error) {
    console.error(error);
    errorLog(error);
  }
};

const fetchTrialData = async (trialnum) => {
  try {
    const data = await readDataTrialStorage(tokenid.value, trialnum);
    dataFilter1(data);
  } catch (error) {
    console.error(error);
    errorLog(error);
  }
};

const dataFilter1 = (data) => {
  Object.keys(data).forEach((key) => {
    // Extracting the prefix before the underscore
    const prefix = key.split("_")[0];
    //console.log("prefix = " + prefix);
    //console.log("value = " + data[key]);
    const compValue = Number(data[key]);

    switch (prefix) {
      case "ais":
        AIS.value.value = (Number(AIS.value.value) + compValue).toFixed(2);
        break;
      case "gyro":
        GYRO.value.value = (Number(GYRO.value.value) + compValue).toFixed(2);
        break;
      case "anemometer":
        ANEMOMETER.value.value = (Number(ANEMOMETER.value.value) + compValue).toFixed(2);
        break;
      case "radar":
        RADAR.value.value = (Number(RADAR.value.value) + compValue).toFixed(2);
        break;
      case "dgps":
        DGPS.value.value = (Number(DGPS.value.value) + compValue).toFixed(2);
        break;
      case "ecdis":
        ECDIS.value.value = (Number(ECDIS.value.value) + compValue).toFixed(2);
        break;
      case "autopilot":
        AUTOPILOT.value.value = (Number(AUTOPILOT.value.value) + compValue).toFixed(2);
        break;
      case "speedlog":
        SPEEDLOG.value.value = (Number(SPEEDLOG.value.value) + compValue).toFixed(2);
        break;
      case "canthrottle":
        Canthrottle.value.value = (Number(Canthrottle.value.value) + compValue).toFixed(2);
        break;
      case "autopilotcontact":
        AUTOPILOTCONTACT.value.value = (Number(AUTOPILOTCONTACT.value.value) + compValue).toFixed(2);
        break;
      case "no1ENGINEPANEL":
        NO1ENGINEPANEL.value.value = (Number(NO1ENGINEPANEL.value.value) + compValue).toFixed(2);
        break;
      case "no2ENGINEPANEL":
        NO2ENGINEPANEL.value.value = (Number(NO2ENGINEPANEL.value.value) + compValue).toFixed(2);
        break;
    }
  });
};

const dataFilter = (data) => {
  data.forEach((item) => {
    // Extracting the prefix before the underscore
    const prefix = item.tableName.split("_")[0];

    // Adding dataLength to the corresponding variable based on the prefix
    switch (prefix) {
      case "ais":
        AIS.value.value += Number(item.tableSize);
        break;
      case "gyro":
        GYRO.value.value += Number(item.tableSize);
        break;
      case "anemometer":
        ANEMOMETER.value.value += Number(item.tableSize);
        break;
      case "radar":
        RADAR.value.value += Number(item.tableSize);
        break;
      case "dgps":
        DGPS.value.value += Number(item.tableSize);
        break;
      case "ecdis":
        ECDIS.value.value += Number(item.tableSize);
        break;
      case "autopilot":
        AUTOPILOT.value.value += Number(item.tableSize);
        break;
      case "speedlog":
        SPEEDLOG.value.value += Number(item.tableSize);
        break;
      case "canthrottle":
        Canthrottle.value.value += Number(item.tableSize);
        break;
      case "autopilotcontact":
        AUTOPILOTCONTACT.value.value += Number(item.tableSize);
        break;
      case "no1enginepanel":
        NO1ENGINEPANEL.value.value += Number(item.tableSize);
        break;
      case "no2enginepanel":
        NO2ENGINEPANEL.value.value += Number(item.tableSize);
        break;
    }
  });
};

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    trialrun.value.push("전체");
    for (let i = 0; i < response.length; i++) {
      trialrun.value.push(`항차 ${i + 1}번`);
      selectedtrialNum.value = trialrun.value[0];
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(getTrialDate);
fetchAllData();

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
    text: '',
    left: "center",
    textStyle: {
      fontSize: 19, // 폰트 크기 설정
      fontWeight: 550,
      color: textColor.value,
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c}MB ({d}%)",
  },
  legend: {
    orient: "vertical", // 수직 방향으로 표시
    top: "40", // 수직 정렬을 중앙으로 설정
    right: "10%",
    textStyle: {
      color: textColor.value, // 텍스트 컬러 설정
    },
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["30%", "55%"], // 이 부분을 수정하여 위치 조절
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

const errorLog = (error) => {
  let errorItem = {
    id: sessionStorage.getItem("userid") || "",
    requestMethod: error.response ? error.response.config.method : "unknown",
    requestUrl: error.response ? error.response.request.responseURL : "unknown",
    statusCode: error.response ? error.response.status : "unknown",
    log: error.name ? error.name : "unknown",
  };
  try {
    createErrorData(tokenid.value, errorItem);
    alert("데이터 오류");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.chart {
  margin-top: 3vh;
  height: 37vh;
  padding: 5px;
}
body {
  margin: 0;
}
.autocomplete-container {
  position: relative;
}

.v-select {
  margin-top: 5px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
