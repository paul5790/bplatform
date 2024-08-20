<template>
  <div class="autocomplete-container">
    <v-select
      v-model="selectedTestName"
      label="Test Name"
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
      <v-chart
        class="chart"
        :option="option"
        autoresize
        @legendselectchanged="handleLegendSelectChange"
      />
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
} from "../../api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";

const { textColor } = themeConfig;

// 시운전 데이터
const trialrun = ref([]);
const selectedTestName = ref();

const ALL = ref({ value: 0, name: "ALL" });
const DGPS = ref({ value: 0, name: "DGPS", itemStyle: { color: "#2Fe7b3" } });
const GYRO = ref({ value: 0, name: "GYRO" });
const ANEMOMETER = ref({ value: 0, name: "ANEMOMETER" });
const RADAR = ref({ value: 0, name: "RADAR" });
const AIS = ref({ value: 0, name: "AIS" });
const ECDIS = ref({ value: 0, name: "ECDIS" });
const AUTOPILOT = ref({ value: 0, name: "AUTOPILOT" });
const SPEEDLOG = ref({ value: 0, name: "SPEEDLOG" });
const CANTHROTTLE = ref({
  value: 0,
  name: "CANTHROTTLE",
  itemStyle: { color: "#2F55b3" },
});
const AUTOPILOTCONTACT = ref({
  value: 0,
  name: "AUTOPILOTCONTACT",
  itemStyle: { color: "#fFb763" },
});
const NO1ENGINEPANEL = ref({ value: 0, name: "NO.1ENGINEPANEL" });
const NO2ENGINEPANEL = ref({ value: 0, name: "NO.2ENGINEPANEL" });
const MTIE1ISA = ref({ value: 0, name: "MTIE1ISA" });

const MTIE5VDGS = ref({ value: 0, name: "MTIE5VDGS" });
const MTIE5DBS = ref({ value: 0, name: "MTIE5DBS" });
const MOF1ANS = ref({ value: 0, name: "MOF1ANS" });
const MOF2SYNC = ref({ value: 0, name: "MOF2SYNC" });
const MOF1GNW = ref({ value: 0, name: "MOF1GNW" });
const MTIE5SAS = ref({ value: 0, name: "MTIE5SAS" });
const MTIE4XINNOS = ref({ value: 0, name: "MTIE4XINNOS" });
const MANAGEMENT = ref({ value: 0, name: "MANAGEMENT" });
const RUDDER = ref({ value: 0, name: "RUDDER" });
const ENGINE = ref({ value: 0, name: "ENGINE" });
const MODE = ref({ value: 0, name: "MODE" });

const VTSAIS = ref({ value: 0, name: "VTSAIS" });
const DYNAMICAISINFO = ref({ value: 0, name: "DYNAMICAISINFO" });
const OBJECTINFO = ref({ value: 0, name: "OBJECTINFO" });
const STATICAISINFO = ref({ value: 0, name: "STATICAISINFO" });
const WEATHERINFO = ref({ value: 0, name: "WEATHERINFO" });

const AllData = ref(0);

const tokenid = ref(sessionStorage.getItem("token") || "");
const trialNum = ref(0);

let titleData;
watch(selectedTestName, async (newTrialNum) => {
  // 항차 N번에서 N 추출
  AIS.value.value = 0;
  GYRO.value.value = 0;
  ANEMOMETER.value.value = 0;
  RADAR.value.value = 0;
  DGPS.value.value = 0;
  ECDIS.value.value = 0;
  AUTOPILOT.value.value = 0;
  SPEEDLOG.value.value = 0;
  CANTHROTTLE.value.value = 0;
  AUTOPILOTCONTACT.value.value = 0;
  NO1ENGINEPANEL.value.value = 0;
  NO2ENGINEPANEL.value.value = 0;
  MTIE1ISA.value.value = 0;

  MTIE5VDGS.value.value = 0;
  MTIE5DBS.value.value = 0;
  MOF1ANS.value.value = 0;
  MOF2SYNC.value.value = 0;
  MOF1GNW.value.value = 0;
  MTIE5SAS.value.value = 0;
  MTIE4XINNOS.value.value = 0;
  MANAGEMENT.value.value = 0;
  RUDDER.value.value = 0;
  ENGINE.value.value = 0;
  MODE.value.value = 0;

  VTSAIS.value.value = 0;
  DYNAMICAISINFO.value.value = 0;
  OBJECTINFO.value.value = 0;
  STATICAISINFO.value.value = 0;
  WEATHERINFO.value.value = 0;

  if (newTrialNum != "전체") {
    await fetchTrialData();
  } else {
    await fetchAllData();
  }

  if (AllData.value > 1048576) {
    titleData = `${(AllData.value / 1048576).toFixed(2)}TB`;
  } else if (AllData.value > 1024 && AllData.value <= 1048575) {
    titleData = `${(AllData.value / 1024).toFixed(2)}GB`;
  } else {
    titleData = `${AllData.value}MB`;
  }

  option.value.title.text = `${newTrialNum} 데이터 저장 용량 (${titleData})`;
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
  }
};

const fetchTrialData = async () => {
  try {
    const data = await readDataTrialStorage(
      tokenid.value,
      selectedTestName.value
    );
    dataFilter1(data);
  } catch (error) {
    console.error(error);
  }
};

const dataFilter1 = (data) => {
  Object.keys(data).forEach((key) => {
    // Extracting the prefix before the underscore
    const prefix = key.split("_")[0];
    const prefix2 = key.split("_")[1];
    const compValue = Number(data[key]);

    switch (prefix) {
      case "ais":
        AIS.value.value = (Number(AIS.value.value) + compValue).toFixed(2);
        break;
      case "gyro":
        GYRO.value.value = (Number(GYRO.value.value) + compValue).toFixed(2);
        break;
      case "anemometer":
        ANEMOMETER.value.value = (
          Number(ANEMOMETER.value.value) + compValue
        ).toFixed(2);
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
        AUTOPILOT.value.value = (
          Number(AUTOPILOT.value.value) + compValue
        ).toFixed(2);
        break;
      case "speedlog":
        SPEEDLOG.value.value = (
          Number(SPEEDLOG.value.value) + compValue
        ).toFixed(2);
        break;
      case "canthrottle":
        CANTHROTTLE.value.value = (
          Number(CANTHROTTLE.value.value) + compValue
        ).toFixed(2);
        break;
      case "autopilotcontact":
        AUTOPILOTCONTACT.value.value = (
          Number(AUTOPILOTCONTACT.value.value) + compValue
        ).toFixed(2);
        break;
      case "no1ENGINEPANEL":
        NO1ENGINEPANEL.value.value = (
          Number(NO1ENGINEPANEL.value.value) + compValue
        ).toFixed(2);
        break;
      case "no2ENGINEPANEL":
        NO2ENGINEPANEL.value.value = (
          Number(NO2ENGINEPANEL.value.value) + compValue
        ).toFixed(2);
        break;
      case "mtie1isa":
        MTIE1ISA.value.value = (
          Number(MTIE1ISA.value.value) + compValue
        ).toFixed(2);
        break;
      case "mtie5vdgs":
        MTIE5VDGS.value.value = (
          Number(MTIE5VDGS.value.value) + compValue
        ).toFixed(2);
        break;
      case "mtie5dbs":
        MTIE5DBS.value.value = (
          Number(MTIE5DBS.value.value) + compValue
        ).toFixed(2);
        break;
      case "mof1ans":
        MOF1ANS.value.value = (Number(MOF1ANS.value.value) + compValue).toFixed(
          2
        );
        break;
      case "mof2sync":
        MOF2SYNC.value.value = (
          Number(MOF2SYNC.value.value) + compValue
        ).toFixed(2);
        break;
      case "mof1gnw":
        MOF1GNW.value.value = (Number(MOF1GNW.value.value) + compValue).toFixed(
          2
        );
        break;
      case "mtie5sas":
        MTIE5SAS.value.value = (
          Number(MTIE5SAS.value.value) + compValue
        ).toFixed(2);
        break;
      case "mtie4xinnos":
        MTIE4XINNOS.value.value = (
          Number(MTIE4XINNOS.value.value) + compValue
        ).toFixed(2);
        break;
      case "management":
        MANAGEMENT.value.value = (
          Number(MANAGEMENT.value.value) + compValue
        ).toFixed(2);
        break;
      case "rudder":
        RUDDER.value.value = (Number(RUDDER.value.value) + compValue).toFixed(
          2
        );
        break;
      case "engine":
        ENGINE.value.value = (Number(ENGINE.value.value) + compValue).toFixed(
          2
        );
        break;
      case "mode":
        MODE.value.value = (Number(MODE.value.value) + compValue).toFixed(2);
        break;

      case "integratedctrlsystem":
        if (prefix2 === "ais") {
          VTSAIS.value.value = (Number(VTSAIS.value.value) + compValue).toFixed(
            2
          );
        } else if (prefix2 === "dynamicaisinfo") {
          DYNAMICAISINFO.value.value = (
            Number(DYNAMICAISINFO.value.value) + compValue
          ).toFixed(2);
        } else if (prefix2 === "objectinfo") {
          OBJECTINFO.value.value = (
            Number(OBJECTINFO.value.value) + compValue
          ).toFixed(2);
        } else if (prefix2 === "staticaisinfo") {
          STATICAISINFO.value.value = (
            Number(STATICAISINFO.value.value) + compValue
          ).toFixed(2);
        } else if (prefix2 === "weatherinfo") {
          WEATHERINFO.value.value = (
            Number(WEATHERINFO.value.value) + compValue
          ).toFixed(2);
        }
        break;
    }
    AllData.value = (
      Number(AIS.value.value) +
      Number(GYRO.value.value) +
      Number(ANEMOMETER.value.value) +
      Number(RADAR.value.value) +
      Number(DGPS.value.value) +
      Number(ECDIS.value.value) +
      Number(AUTOPILOT.value.value) +
      Number(SPEEDLOG.value.value) +
      Number(CANTHROTTLE.value.value) +
      Number(AUTOPILOTCONTACT.value.value) +
      Number(NO1ENGINEPANEL.value.value) +
      Number(NO2ENGINEPANEL.value.value) +
      Number(MTIE1ISA.value.value) +
      Number(MTIE5VDGS.value.value) +
      Number(MTIE5DBS.value.value) +
      Number(MOF1ANS.value.value) +
      Number(MOF2SYNC.value.value) +
      Number(MOF1GNW.value.value) +
      Number(MTIE5SAS.value.value) +
      Number(MTIE4XINNOS.value.value) +
      Number(MANAGEMENT.value.value) +
      Number(RUDDER.value.value) +
      Number(ENGINE.value.value) +
      Number(MODE.value.value) +
      Number(VTSAIS.value.value) +
      Number(DYNAMICAISINFO.value.value) +
      Number(OBJECTINFO.value.value) +
      Number(STATICAISINFO.value.value) +
      Number(WEATHERINFO.value.value)
    ).toFixed(2);
  });
};

const dataFilter = (data) => {
  data.forEach((item) => {
    // Extracting the prefix before the underscore
    const prefix = item.tableName.split("_")[0];
    const prefix2 = item.tableName.split("_")[1];
    // Adding dataLength to the corresponding variable based on the prefix
    switch (prefix) {
      case "ais": // ok
        AIS.value.value += Number(item.tableSize);
        break;
      case "gyro": // ok
        GYRO.value.value += Number(item.tableSize);
        break;
      case "anemometer": // ok
        ANEMOMETER.value.value += Number(item.tableSize);
        break;
      case "radar":
        RADAR.value.value += Number(item.tableSize);
        break;
      case "dgps": // ok
        DGPS.value.value += Number(item.tableSize);
        break;
      case "ecdis": // ok
        ECDIS.value.value += Number(item.tableSize);
        break;
      case "autopilot": // ok
        AUTOPILOT.value.value += Number(item.tableSize);
        break;
      case "speedlog":
        SPEEDLOG.value.value += Number(item.tableSize);
        break;
      case "canthrottle": // ok
        CANTHROTTLE.value.value += Number(item.tableSize);
        break;
      case "autopilotcontact": // ok
        AUTOPILOTCONTACT.value.value += Number(item.tableSize);
        break;
      case "no1enginepanel":
        NO1ENGINEPANEL.value.value += Number(item.tableSize);
        break;
      case "no2enginepanel":
        NO2ENGINEPANEL.value.value += Number(item.tableSize);
        break;
      case "mtie1isa": // ok
        MTIE1ISA.value.value += Number(item.tableSize);
        break;
      case "mtie5vdgs":
        MTIE5VDGS.value.value += Number(item.tableSize);
        break;
      case "mtie5dbs":
        MTIE5DBS.value.value += Number(item.tableSize);
        break;
      case "mof1ans": // ok
        MOF1ANS.value.value += Number(item.tableSize);
        break;
      case "mof2sync": // ok
        MOF2SYNC.value.value += Number(item.tableSize);
        break;
      case "mof1gnw": // ok
        MOF1GNW.value.value += Number(item.tableSize);
        break;
      case "mtie5sas":
        MTIE5SAS.value.value += Number(item.tableSize);
        break;
      case "mtie4xinnos":
        MTIE4XINNOS.value.value += Number(item.tableSize);
        break;
      case "management": // ok
        MANAGEMENT.value.value += Number(item.tableSize);
        break;
      case "rudder":
        RUDDER.value.value += Number(item.tableSize);
        break;
      case "engine": // ok
        ENGINE.value.value += Number(item.tableSize);
        break;
      case "mode": // ok
        MODE.value.value += Number(item.tableSize);
        break;
      case "integratedctrlsystem": // ok
        if (prefix2 === "ais") {
          VTSAIS.value.value += Number(item.tableSize);
        } else if (prefix2 === "dynamicaisinfo") {
          DYNAMICAISINFO.value.value += Number(item.tableSize);
        } else if (prefix2 === "objectinfo") {
          OBJECTINFO.value.value += Number(item.tableSize);
        } else if (prefix2 === "staticaisinfo") {
          STATICAISINFO.value.value += Number(item.tableSize);
        } else if (prefix2 === "weatherinfo") {
          WEATHERINFO.value.value += Number(item.tableSize);
        }
        break;
    }
    AllData.value =
      Number(AIS.value.value) +
      Number(GYRO.value.value) +
      Number(ANEMOMETER.value.value) +
      Number(RADAR.value.value) +
      Number(DGPS.value.value) +
      Number(ECDIS.value.value) +
      Number(AUTOPILOT.value.value) +
      Number(SPEEDLOG.value.value) +
      Number(CANTHROTTLE.value.value) +
      Number(AUTOPILOTCONTACT.value.value) +
      Number(NO1ENGINEPANEL.value.value) +
      Number(NO2ENGINEPANEL.value.value) +
      Number(MTIE1ISA.value.value) +
      Number(MTIE5VDGS.value.value) +
      Number(MTIE5DBS.value.value) +
      Number(MOF1ANS.value.value) +
      Number(MOF2SYNC.value.value) +
      Number(MOF1GNW.value.value) +
      Number(MTIE5SAS.value.value) +
      Number(MTIE4XINNOS.value.value) +
      Number(MANAGEMENT.value.value) +
      Number(RUDDER.value.value) +
      Number(ENGINE.value.value) +
      Number(MODE.value.value) +
      Number(VTSAIS.value.value) +
      Number(DYNAMICAISINFO.value.value) +
      Number(OBJECTINFO.value.value) +
      Number(STATICAISINFO.value.value) +
      Number(WEATHERINFO.value.value);
  });
};

const getTrialDate = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    trialrun.value.push("전체");
    for (let i = 0; i < response.length; i++) {
      const testName = response[i].testName;
      trialrun.value.push(testName);
      selectedTestName.value = trialrun.value[0];
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

watch(
  [
    DGPS.value,
    GYRO.value,
    ANEMOMETER.value,
    RADAR.value,
    AIS.value,
    ECDIS.value,
    AUTOPILOT.value,
    SPEEDLOG.value,
    CANTHROTTLE.value,
    AUTOPILOTCONTACT.value,
    NO1ENGINEPANEL.value,
    NO2ENGINEPANEL.value,
    MTIE1ISA.value,
    MTIE5VDGS.value,
    MTIE5DBS.value,
    MOF1ANS.value,
    MOF2SYNC.value,
    MOF1GNW.value,
    MTIE5SAS.value,
    MTIE4XINNOS.value,
    MANAGEMENT.value,
    RUDDER.value,
    ENGINE.value,
    MODE.value,
    VTSAIS.value,
    DYNAMICAISINFO.value,
    OBJECTINFO.value,
    STATICAISINFO.value,
    WEATHERINFO.value,
  ],
  () => {
    option.value.legend.data = getLegendData(); // 데이터 변경 시 legend 업데이트
  }
);

function getLegendData() {
  const legendData = [
    { name: "ALL", icon: "circle", value: ALL.value.value },
    { name: "DGPS", icon: "circle", value: DGPS.value.value },
    { name: "GYRO", icon: "circle", value: GYRO.value.value },
    { name: "ANEMOMETER", icon: "circle", value: ANEMOMETER.value.value },
    { name: "RADAR", icon: "circle", value: RADAR.value.value },
    { name: "AIS", icon: "circle", value: AIS.value.value },
    { name: "ECDIS", icon: "circle", value: ECDIS.value.value },
    { name: "AUTOPILOT", icon: "circle", value: AUTOPILOT.value.value },
    { name: "SPEEDLOG", icon: "circle", value: SPEEDLOG.value.value },
    { name: "CANTHROTTLE", icon: "circle", value: CANTHROTTLE.value.value },
    {
      name: "AUTOPILOTCONTACT",
      icon: "circle",
      value: AUTOPILOTCONTACT.value.value,
    },
    {
      name: "NO.1ENGINEPANEL",
      icon: "circle",
      value: NO1ENGINEPANEL.value.value,
    },
    {
      name: "NO.2ENGINEPANEL",
      icon: "circle",
      value: NO2ENGINEPANEL.value.value,
    },
    { name: "MTIE1ISA", icon: "circle", value: MTIE1ISA.value.value },

    { name: "MTIE5VDGS", icon: "circle", value: MTIE5VDGS.value.value },
    { name: "MTIE5DBS", icon: "circle", value: MTIE5DBS.value.value },
    { name: "MOF1ANS", icon: "circle", value: MOF1ANS.value.value },
    { name: "MOF2SYNC", icon: "circle", value: MOF2SYNC.value.value },
    { name: "MOF1GNW", icon: "circle", value: MOF1GNW.value.value },
    { name: "MTIE5SAS", icon: "circle", value: MTIE5SAS.value.value },
    {
      name: "MTIE4XINNOS",
      icon: "circle",
      value: MTIE4XINNOS.value.value,
    },
    { name: "MANAGEMENT", icon: "circle", value: MANAGEMENT.value.value },
    { name: "RUDDER", icon: "circle", value: RUDDER.value.value },
    { name: "ENGINE", icon: "circle", value: ENGINE.value.value },
    { name: "MODE", icon: "circle", value: MODE.value.value },

    { name: "VTSAIS", icon: "circle", value: VTSAIS.value.value },
    {
      name: "DYNAMICAISINFO",
      icon: "circle",
      value: DYNAMICAISINFO.value.value,
    },
    { name: "OBJECTINFO", icon: "circle", value: OBJECTINFO.value.value },
    { name: "STATICAISINFO", icon: "circle", value: STATICAISINFO.value.value },
    { name: "WEATHERINFO", icon: "circle", value: WEATHERINFO.value.value },
    // 다른 항목들도 추가합니다.
  ];

  // 데이터가 0이거나 null인 항목은 필터링하여 제외합니다.
  return legendData;
}

const option = ref({
  title: {
    text: "",
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
    data: getLegendData(),
    orient: "vertical", // 수직 방향으로 표시
    top: "40", // 수직 정렬을 중앙으로 설정
    right: "0%",
    textStyle: {
      color: textColor.value, // 텍스트 컬러 설정
      fontSize: 12, // 텍스트 크기를 줄임 (기본값: 12)
    },
    itemGap: 8, // 항목 간의 간격을 줄임 (기본값: 10)

    itemWidth: 9, // 아이콘의 너비
    itemHeight: 9, // 아이콘의 높이
    formatter: (name) => {
      if (name === "ALL") {
        return `${name} (${titleData})`;
      }
      const item = option.value.legend.data.find((d) => d.name === name);
      if (item) {
        if (item.value > 1048576) {
          return `${item.name} (${(item.value / 1048576).toFixed(2)}TB)`;
        } else if (item.value > 1024 && item.value <= 1048575) {
          return `${item.name} (${(item.value / 1024).toFixed(2)}GB)`;
        } else {
          return `${item.name} (${item.value}MB)`;
        }
      }
      return name;
    },
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["21%", "55%"], // 이 부분을 수정하여 위치 조절
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
        ALL.value,
        DGPS.value,
        GYRO.value,
        ANEMOMETER.value,
        RADAR.value,
        AIS.value,
        ECDIS.value,
        AUTOPILOT.value,
        SPEEDLOG.value,
        CANTHROTTLE.value,
        AUTOPILOTCONTACT.value,
        NO1ENGINEPANEL.value,
        NO2ENGINEPANEL.value,
        MTIE1ISA.value,
        MTIE5VDGS.value,
        MTIE5DBS.value,
        MOF1ANS.value,
        MOF2SYNC.value,
        MOF1GNW.value,
        MTIE5SAS.value,
        MTIE4XINNOS.value,
        MANAGEMENT.value,
        RUDDER.value,
        ENGINE.value,
        MODE.value,
        VTSAIS.value,
        DYNAMICAISINFO.value,
        OBJECTINFO.value,
        STATICAISINFO.value,
        WEATHERINFO.value,
      ],
    },
  ],
});

function handleLegendSelectChange(params) {
  if (params.name === "ALL") {
    const isSelected = params.selected["ALL"];
    const newSelected = {};
    option.value.legend.data.forEach((item) => {
      newSelected[item.name] = isSelected;
    });
    option.value.legend.selected = newSelected;
  }
}
</script>

<style scoped>
.chart {
  margin-top: 3vh;
  height: 42vh;
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
