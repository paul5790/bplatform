<template>
  <v-card
    height="93vh"
    style="background-color: #f7f7f7"
    class="pa-1 d-flex justify-center align-center"
  >
    <v-row>
      <!-- 왼쪽 큰 박스 -->
      <v-col cols="10" style="padding: 30px; padding-right: 5px">
        <v-row>
          <!-- (최) 지도 뷰 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <!-- <OSMap /> -->
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 헤딩 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartHeading />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 속도 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartGauge
                    :name="'Speed (SPEEDLOG)'"
                    :left="'left'"
                    :unit="'kt'"
                    :center_y="'45%'"
                    :max_speed="200"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 러더 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartStarPort />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <!-- 엔진1 -->
          <v-col cols="6" no-gutters style="padding: 3px">
            <v-card style="flex: 1">
              <v-card-item>
                <v-row>
                  <!-- (최) 엔진 rpm -->
                  <v-col cols="6" no-gutters style="padding: 3px">
                    <v-sheet style="height: 34vh; padding: 5px; display: flex">
                      <EchartGauge
                        :name="'Engine Speed'"
                        :left="'center'"
                        :unit="'rpm'"
                        :center_y="'50%'"
                        :max_speed="3000"
                        :value="engine1Speed"
                      />
                    </v-sheet>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 엔진오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilPressure'"
                            :value="engine1oilPressure"
                            :unit="'bar'"
                            :max_value="10"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 엔진오일 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px"
                        ><v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilTemperature'"
                            :value="engine1oilTemperature"
                            :unit="'°C'"
                            :max_value="200"
                          /> </v-sheet
                      ></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 변속기오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'TransmissionPressure'"
                            :value="engine1transmissionPressure"
                            :unit="'bar'"
                            :max_value="40"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 배기가스 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'ExhaustGasTemperature'"
                            :value="engine1gasTemperature"
                            :unit="'°C'"
                            :max_value="900"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
            <!-- (최) Lamp뷰 -->
            <v-row>
              <v-col cols="12" no-gutters style="padding-top: 15px">
                <v-sheet style="height: 20vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <EngineLampChecking :checkdata="checkdata2" />
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          <!-- 엔진2 -->
          <v-col cols="6" no-gutters style="padding: 3px">
            <v-card style="flex: 1">
              <v-card-item>
                <v-row>
                  <!-- (최) 엔진 rpm -->
                  <v-col cols="6" no-gutters style="padding: 3px">
                    <v-sheet style="height: 34vh; padding: 5px; display: flex">
                      <EchartGauge
                        :name="'Engine Speed'"
                        :left="'center'"
                        :unit="'rpm'"
                        :center_y="'50%'"
                        :max_speed="3000"
                        :value="engine2Speed"
                      />
                    </v-sheet>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 엔진오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilPressure'"
                            :value="engine2oilPressure"
                            :unit="'kPa'"
                            :max_value="10"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 엔진오일 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px"
                        ><v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'OilTemperature'"
                            :value="engine2oilTemperature"
                            :unit="'°C'"
                            :max_value="200"
                          /> </v-sheet
                      ></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="3" no-gutters style="padding: 3px">
                    <!-- (최) 변속기오일 압력 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-bottom: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'TransmissionPressure'"
                            :value="engine2transmissionPressure"
                            :unit="'kPa'"
                            :max_value="40"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                    <!-- (최) 배기가스 온도 -->
                    <v-row>
                      <v-col cols="12" no-gutters style="padding-top: 0px">
                        <v-sheet style="height: 18vh; display: flex">
                          <EchartGaugeVolt
                            :name="'ExhaustGasTemperature'"
                            :value="engine2gasTemperature"
                            :unit="'°C'"
                            :max_value="900"
                          />
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
            <!-- (최) Lamp뷰 -->
            <v-row>
              <v-col cols="12" no-gutters style="padding-top: 15px">
                <v-sheet style="height: 20vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <EngineLampChecking :checkdata="checkdata2" />
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <!-- (최)데이터 확인 박스 -->
      <v-col cols="2">
        <v-sheet style="height: 92vh; padding-right: 0; display: flex">
          <v-card style="flex: 1">
            <v-card-item>
              <SocketChecking :checkdata="checkdata" />
            </v-card-item>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import OSMap from "../components/OSMap.vue";
import SocketChecking from "../components/SocketChecking.vue";
import EngineLampChecking from "../components/EngineLampChecking.vue";
import EchartHeading from "../components/EchartGraph/EchartHeading.vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartGaugeVolt from "../components/EchartGraph/EchartGaugeVolt.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";

// 웹소켓 관련, Web Socket
import { ref, inject, onMounted } from "vue";
import { onMessage, onOpen, onClose, onError } from "vue3-websocket";

const text = ref(""); // 보낼 데이터
const responseMsg = ref(""); // 받아온 데이터

// Props Value 데이터
let engine1_OilTemperature = ref();
let engine1_OilPressure = ref();
let engine1_TransmissionPressure = ref();
let engine1_ExhaustGasTemperature = ref();
let engine2_OilTemperature = ref();
let engine2_OilPressure = ref();
let engine2_TransmissionPressure = ref();
let engine2_ExhaustGasTemperature = ref();
let timer = null;

const updateValue = () => {
  Object.keys(checkdata.value).forEach((key) => {
    checkdata.value[key];
  });
  engine1_OilTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine1_OilTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine1_OilPressure.value = Math.floor(Math.random() * 10 + 8);
  engine1_TransmissionPressure.value = Math.floor(Math.random() * 10 + 8);
  engine1_ExhaustGasTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine2_OilTemperature.value = Math.floor(Math.random() * 10 + 8);
  engine2_OilPressure.value = Math.floor(Math.random() * 10 + 8);
  engine2_TransmissionPressure.value = Math.floor(Math.random() * 10 + 8);
  engine2_ExhaustGasTemperature.value = Math.floor(Math.random() * 10 + 8);
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});

const checkdata = ref({
  GLL: "no",
  GGA: "no",
  RMC: "no",
  VTG: "no",
  ZDA: "no",
  DTM: "no",
  GSV: "no",
  GSA: "no",
  THS: "no",
  HDT: "no",
  ROT: "no",
  MWV: "no",
  MWD: "no",
  VWR: "no",
  MTW: "no",
  VWT: "no",
  TTM: "no",
  TLL: "no",
  RSCREEN: "no",
  VDM: "no",
  VDO: "no",
  ROUTEINFO: "no",
  WAYPOINTS: "no",
  ESCREEN: "no",
  RSA: "no",
  MODE: "no",
  HTD: "no",
  VBW: "no",
  VHW: "no",
  VLW: "no",
  NO1ENGINE_PANEL_61444: "no",
  NO1ENGINE_PANEL_65262: "no",
  NO1ENGINE_PANEL_65263: "no",
  NO1ENGINE_PANEL_65272: "no",
  NO1ENGINE_PANEL_65271: "no",
  NO1ENGINE_PANEL_65253: "no",
  NO1ENGINE_PANEL_65270: "no",
  NO1ENGINE_PANEL_65276: "no",
  NO1ENGINE_PANEL_65360: "no",
  NO1ENGINE_PANEL_65361_LAMP: "no",
  NO1ENGINE_PANEL_65361_STATUS: "no",
  NO1ENGINE_PANEL_65378: "no",
  NO1ENGINE_PANEL_65376: "no",
  NO1ENGINE_PANEL_65379: "no",
  NO2ENGINE_PANEL_61444: "no",
  NO2ENGINE_PANEL_65262: "no",
  NO2ENGINE_PANEL_65263: "no",
  NO2ENGINE_PANEL_65272: "no",
  NO2ENGINE_PANEL_65271: "no",
  NO2ENGINE_PANEL_65253: "no",
  NO2ENGINE_PANEL_65270: "no",
  NO2ENGINE_PANEL_65276: "no",
  NO2ENGINE_PANEL_65360: "no",
  NO2ENGINE_PANEL_65361_LAMP: "no",
  NO2ENGINE_PANEL_65361_STATUS: "no",
  NO2ENGINE_PANEL_65378: "no",
  NO2ENGINE_PANEL_65376: "no",
  NO2ENGINE_PANEL_65379: "no",
});
var checkdata2 = {
  1: "ok",
  2: "ok",
  3: "no",
  4: "no",
  5: "no",
  6: "no",
  7: "no",
  8: "no",
  9: "no",
  10: "no",
  11: "no",
  12: "no",
  13: "no",
  14: "no",
  15: "no",
  16: "no",
};
console.log(checkdata.value.gll);
console.log(checkdata.value.gga);
console.log(checkdata.value.rmc);

const socket = inject("socket");

const sendMessage = () => socket.value.send(text.value);

// 엔진 1
const engine1Speed = ref();
const engine1oilPressure = ref();
const engine1transmissionPressure = ref();
const engine1oilTemperature = ref();
const engine1gasTemperature = ref();

// 엔진 2
const engine2Speed = ref();
const engine2oilPressure = ref();
const engine2transmissionPressure = ref();
const engine2oilTemperature = ref();
const engine2gasTemperature = ref();

// 시간
const receivedTime = ref({
  GLL: "",
  GGA: "",
  RMC: "",
  VTG: "",
  ZDA: "",
  DTM: "",
  GSV: "",
  GSA: "",
  THS: "",
  HDT: "",
  ROT: "",
  MWV: "",
  MWD: "",
  VWR: "",
  MTW: "",
  VWT: "",
  TTM: "",
  TLL: "",
  RSCREEN: "",
  VDM: "",
  VDO: "",
  ROUTEINFO: "",
  WAYPOINTS: "",
  ESCREEN: "",
  RSA: "",
  MODE: "",
  HTD: "",
  VBW: "",
  VHW: "",
  VLW: "",
  NO1ENGINE_PANEL_61444: "",
  NO1ENGINE_PANEL_65262: "",
  NO1ENGINE_PANEL_65263: "",
  NO1ENGINE_PANEL_65272: "",
  NO1ENGINE_PANEL_65271: "",
  NO1ENGINE_PANEL_65253: "",
  NO1ENGINE_PANEL_65270: "",
  NO1ENGINE_PANEL_65276: "",
  NO1ENGINE_PANEL_65360: "",
  NO1ENGINE_PANEL_65361_LAMP: "",
  NO1ENGINE_PANEL_65361_STATUS: "",
  NO1ENGINE_PANEL_65378: "",
  NO1ENGINE_PANEL_65376: "",
  NO1ENGINE_PANEL_65379: "",
  NO2ENGINE_PANEL_61444: "",
  NO2ENGINE_PANEL_65262: "",
  NO2ENGINE_PANEL_65263: "",
  NO2ENGINE_PANEL_65272: "",
  NO2ENGINE_PANEL_65271: "",
  NO2ENGINE_PANEL_65253: "",
  NO2ENGINE_PANEL_65270: "",
  NO2ENGINE_PANEL_65276: "",
  NO2ENGINE_PANEL_65360: "",
  NO2ENGINE_PANEL_65361_LAMP: "",
  NO2ENGINE_PANEL_65361_STATUS: "",
  NO2ENGINE_PANEL_65378: "",
  NO2ENGINE_PANEL_65376: "",
  NO2ENGINE_PANEL_65379: "",
});

onOpen(() => {
  console.log("WS connection is stable! ~uWu~");
});
const headerNameC = ref();
onMessage((message) => {
  // responseMsg.value = JSON.stringify(message.data);
  console.log(message.data);
  // 수신한 메시지의 'data' 속성을 JSON 형식으로 파싱
  try {
    const parsedMessage = JSON.parse(message.data);
    // console.log("Got a message from the WS: ", parsedMessage);
    const headerName = parsedMessage.Package.Header.Author;
    let variableName = getVariableName(headerName);
    headerNameC.value = parsedMessage.Package.Header.Author;
    checkdata.value[variableName] = parsedMessage.Package.Header.TimeSpan.End;
    let ind = 0;
    const fds = ref([]);
    for (let i = 0; i < 58; i++) {
      //
    }
    console.log(checkdata.value[variableName]);
    console.log(variableName);

    processMessage(headerName);

    // 'Package' 내의 데이터 중 "DataSet"의 첫 번째 항목 추출
    // 엔진1
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444") {
      engine1Speed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65262") {
      engine1oilTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65263") {
      engine1oilPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65272") {
      engine1transmissionPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65270") {
      engine1gasTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
    }

    // 엔진2
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444") {
      engine2Speed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65262") {
      engine2oilTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65263") {
      engine2oilPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65272") {
      engine2transmissionPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65270") {
      engine2gasTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
    }
    // else if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444") {
    //         engine1Speed.value =
    //     parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0].Value[0];
    // }

    // "Value" 배열 추출
    const values = engine2Speed.value;
    // console.log("엔진1:", engine1Speed.value,"엔진2 ", engine2Speed.value);
    console.log("Got a message from the WS: ", headerName, parsedMessage);
  } catch (error) {
    console.error(error);
  }
});

onClose(() => {
  let variableName = getVariableName(headerNameC);
  if (timer) {
    clearTimeout(timer);
  }
  checkdata.value[variableName] = "no";
  console.log("No way, connection has been closed 😥");
});

onError((error) => {
  console.error("Error: ", error);
});

const processMessage = (headerName, receivedTime) => {
  // let variableName = getVariableName(headerName);
  // // if (headerName === 'NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444') {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   checkdata.value[variableName] = 'ok';
  //   console.log(`${variableName} ok`);
  //   timer = setTimeout(() => {
  //     checkdata.value[variableName] = 'no';
  //     console.log(`${variableName} no`);
  //   }, 100);
  //}

  let variableName = getVariableName(headerName);
  if (variableName) {
    // 5초 미만이면 "on"으로 설정
    if (isWithin5Seconds(receivedTime)) {
      checkdata.value[variableName] = "ok";
    }
    // 5초가 지났다면 다시 "no"로 설정
    else {
      checkdata.value[variableName] = "no";
    }
  }
};

const getVariableName = (headerName) => {
  const nameMappings = {
    "DGPS/GLL": "GLL",
    "DGPS/GGA": "GGA",
    "DGPS/RMC": "RMC",
    "DGPS/VTG": "VTG",
    "DGPS/ZDA": "ZDA",
    "DGPS/DTM": "DTM",
    "DGPS/GSV": "GSV",
    "DGPS/GSA": "GSA",

    "GYRO/THS": "THS",
    "GYRO/HDT": "HDT",
    "GYRO/ROT": "ROT",

    "ANEMOMETER/MWV": "MWV",
    "ANEMOMETER/MWD": "MWD",
    "ANEMOMETER/VWR": "VWR",
    "ANEMOMETER/MTW": "MTW",
    "ANEMOMETER/VWT": "VWT",

    "RADAR/TTM": "TTM",
    "RADAR/TLL": "TLL",
    "RADAR/RSCREEN": "RSCREEN",

    "AIS/VDM": "VDM",
    "AIS/VDO": "VDO",

    "ECDIS/ROUTEINFO": "ROUTEINFO",
    "ECDIS/WAYPOINTS": "WAYPOINTS",
    "ECDIS/ESCREEN": "ESCREEN",

    "AUTOPILOT/RSA": "RSA",
    "AUTOPILOT/MODE": "MODE",
    "AUTOPILOT/HTD": "HTD",

    "SPEEDLOG/VBW": "VBW",
    "SPEEDLOG/VHW": "VHW",
    "SPEEDLOG/VLW": "VLW",

    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444": "NO1ENGINE_PANEL_61444",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65262": "NO1ENGINE_PANEL_65262",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65263": "NO1ENGINE_PANEL_65263",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65272": "NO1ENGINE_PANEL_65272",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65271": "NO1ENGINE_PANEL_65271",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65253": "NO1ENGINE_PANEL_65253",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65270": "NO1ENGINE_PANEL_65270",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65276": "NO1ENGINE_PANEL_65276",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65360": "NO1ENGINE_PANEL_65360",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_LAMP": "NO1ENGINE_PANEL_65361_LAMP",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_STATUS":
      "NO1ENGINE_PANEL_65361_STATUS",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65378": "NO1ENGINE_PANEL_65378",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65376": "NO1ENGINE_PANEL_65376",
    "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65379": "NO1ENGINE_PANEL_65379",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444": "NO2ENGINE_PANEL_61444",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65262": "NO2ENGINE_PANEL_65262",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65263": "NO2ENGINE_PANEL_65263",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65272": "NO2ENGINE_PANEL_65272",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65271": "NO2ENGINE_PANEL_65271",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65253": "NO2ENGINE_PANEL_65253",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65270": "NO2ENGINE_PANEL_65270",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65276": "NO2ENGINE_PANEL_65276",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65360": "NO2ENGINE_PANEL_65360",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_LAMP": "NO2ENGINE_PANEL_65361_LAMP",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_STATUS":
      "NO2ENGINE_PANEL_65361_STATUS",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65378": "NO2ENGINE_PANEL_65378",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65376": "NO2ENGINE_PANEL_65376",
    "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65379": "NO2ENGINE_PANEL_65379",

    // 다른 headerName에 대한 매핑 추가
  };

  return nameMappings[headerName];
};

const isWithin5Seconds = (receivedTime) => {
  //   const currentTimeString = new Date().toISOString();
  // const elapsedTimeInSeconds = (currentTimeString - receivedTime) / 1000;
  // console.log("@",currentTimeString, receivedTime, elapsedTimeInSeconds,)
  // return elapsedTimeInSeconds < 5;
  // 현재 시간을 문자열로 변환하여 동일한 포맷으로 만듭니다.
  // 현재 시간의 문자열 포맷을 만듭니다.
  const currentTimeString = new Date().toISOString();

  // 수신 시간을 문자열로 변환하여 동일한 포맷으로 만듭니다.
  const receivedTimeString = new Date(receivedTime).toISOString();

  // 현재 시간과 수신 시간 간의 차이 계산
  const elapsedTimeInSeconds =
    (new Date(currentTimeString) - new Date(receivedTimeString)) / 1000 - 32400;
  return elapsedTimeInSeconds < 5;
};
</script>

<style scoped></style>
