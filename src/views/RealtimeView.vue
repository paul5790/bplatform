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
                  <OSMap :lat="parseFloat(latitude)" :lon="parseFloat(longitude)"/>
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 헤딩 그래프 -->
          <v-col cols="3" no-gutters style="padding: 3px">
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartHeading :value="Number(heading)" />
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
                    :value="Number(speed)"
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
                        :value="Number(engine1Speed)"
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
                        :value="Number(engine2Speed)"
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

// 센서 데이터
const latitude = ref();
const longitude = ref();
const heading = ref();
const speed = ref();
const star = ref();
const port = ref();

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
let ggaTimeout = null;
let GLLtimeout = null;
let GGAtimeout = null;
let RMCtimeout = null;
let VTGtimeout = null;
let ZDAtimeout = null;
let DTMtimeout = null;
let GSVtimeout = null;
let GSAtimeout = null;
let THStimeout = null;
let HDTtimeout = null;
let ROTtimeout = null;
let MWVtimeout = null;
let MWDtimeout = null;
let VWRtimeout = null;
let MTWtimeout = null;
let VWTtimeout = null;
let TTMtimeout = null;
let TLLtimeout = null;
let RSCREENtimeout = null;
let VDMtimeout = null;
let VDOtimeout = null;
let ROUTEINFOtimeout = null;
let WAYPOINTStimeout = null;
let ESCREENtimeout = null;
let RSAtimeout = null;
let MODEtimeout = null;
let HTDtimeout = null;
let VBWtimeout = null;
let VHWtimeout = null;
let VLWtimeout = null;
let NO1ENGINE_PANEL_61444timeout = null;
let NO1ENGINE_PANEL_65262timeout = null;
let NO1ENGINE_PANEL_65263timeout = null;
let NO1ENGINE_PANEL_65272timeout = null;
let NO1ENGINE_PANEL_65271timeout = null;
let NO1ENGINE_PANEL_65253timeout = null;
let NO1ENGINE_PANEL_65270timeout = null;
let NO1ENGINE_PANEL_65276timeout = null;
let NO1ENGINE_PANEL_65360timeout = null;
let NO1ENGINE_PANEL_65361_LAMPtimeout = null;
let NO1ENGINE_PANEL_65361_STATUStimeout = null;
let NO1ENGINE_PANEL_65378timeout = null;
let NO1ENGINE_PANEL_65376timeout = null;
let NO1ENGINE_PANEL_65379timeout = null;
let NO2ENGINE_PANEL_61444timeout = null;
let NO2ENGINE_PANEL_65262timeout = null;
let NO2ENGINE_PANEL_65263timeout = null;
let NO2ENGINE_PANEL_65272timeout = null;
let NO2ENGINE_PANEL_65271timeout = null;
let NO2ENGINE_PANEL_65253timeout = null;
let NO2ENGINE_PANEL_65270timeout = null;
let NO2ENGINE_PANEL_65276timeout = null;
let NO2ENGINE_PANEL_65360timeout = null;
let NO2ENGINE_PANEL_65361_LAMPtimeout = null;
let NO2ENGINE_PANEL_65361_STATUStimeout = null;
let NO2ENGINE_PANEL_65378timeout = null;
let NO2ENGINE_PANEL_65376timeout = null;
let NO2ENGINE_PANEL_65379timeout = null;

onOpen(() => {
  console.log("WS connection is stable! ~uWu~");
});
const headerNameC = ref();
onMessage((message) => {
  try {
    const parsedMessage = JSON.parse(message.data);
    let headerName = parsedMessage.Package.Header.Author;
    let variableName = getVariableName(headerName);
    headerNameC.value = parsedMessage.Package.Header.Author;
    checkdata.value[variableName] = parsedMessage.Package.Header.TimeSpan.End;

    console.log(headerName);
    console.log(parsedMessage);
    checkingData(headerName);
    // 'Package' 내의 데이터 중 "DataSet"의 첫 번째 항목 추출
    // 위치
    if (headerName === "DGPS/GGA") {
      // checkdata.value.GGA = "ok";
      // clearTimeout(ggaTimeout); // 이전 타임아웃을 취소
      // ggaTimeout = setTimeout(() => {
      //   // 3초 이상 데이터가 오지 않으면 "no"로 변경
      //   checkdata.value.GGA = "no";
      // }, 1000);
      latitude.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[2]
      ).toFixed(4);
      longitude.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[4]
      ).toFixed(4);
    }
    // 헤딩값
    if (headerName === "GYRO/HDT") {
      heading.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[1]
      ).toFixed(2);
    }
    // 스피드
    if (headerName === "SPEEDLOG/VHW") {
      speed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[5]
      ).toFixed(2);
    }
    // 러더
    if (headerName === "AUTOPILOT/RSA") {
      star.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[1]
      ).toFixed(2);
      port.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[3]
      ).toFixed(2);
    }

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
    
  } catch (error) {
    console.error(error);
    // resetCheckdata();
  }
});

onClose(() => {
  console.log("No way, connection has been closed 😥");
  resetCheckdata();
});

onError((error) => {
  console.error("Error: ", error);
  resetCheckdata();
});

const checkingData = ( headerName ) => {
if (headerName === "DGPS/GLL"){
  checkdata.value.GLL = "ok";
  clearTimeout(GLLtimeout);
  GLLtimeout = setTimeout(() => {
    checkdata.value.GLL = "no";
  }, 1000);
}
if (headerName === "DGPS/GGA"){
  checkdata.value.GGA = "ok";
  clearTimeout(GGAtimeout);
  GGAtimeout = setTimeout(() => {
    checkdata.value.GGA = "no";
  }, 1000);
}
if (headerName === "DGPS/RMC"){
  checkdata.value.RMC = "ok";
  clearTimeout(RMCtimeout);
  RMCtimeout = setTimeout(() => {
    checkdata.value.RMC = "no";
  }, 1000);
}
if (headerName === "DGPS/VTG"){
  checkdata.value.VTG = "ok";
  clearTimeout(VTGtimeout);
  VTGtimeout = setTimeout(() => {
    checkdata.value.VTG = "no";
  }, 1000);
}
if (headerName === "DGPS/ZDA"){
  checkdata.value.ZDA = "ok";
  clearTimeout(ZDAtimeout);
  ZDAtimeout = setTimeout(() => {
    checkdata.value.ZDA = "no";
  }, 1000);
}
if (headerName === "DGPS/DTM"){
  checkdata.value.DTM = "ok";
  clearTimeout(DTMtimeout);
  DTMtimeout = setTimeout(() => {
    checkdata.value.DTM = "no";
  }, 1000);
}
if (headerName === "DGPS/GSV"){
  checkdata.value.GSV = "ok";
  clearTimeout(GSVtimeout);
  GSVtimeout = setTimeout(() => {
    checkdata.value.GSV = "no";
  }, 1000);
}
if (headerName === "DGPS/GSA"){
  checkdata.value.GSA = "ok";
  clearTimeout(GSAtimeout);
  GSAtimeout = setTimeout(() => {
    checkdata.value.GSA = "no";
  }, 1000);
}
if (headerName === "GYRO/THS"){
  checkdata.value.THS = "ok";
  clearTimeout(THStimeout);
  THStimeout = setTimeout(() => {
    checkdata.value.THS = "no";
  }, 1000);
}
if (headerName === "GYRO/HDT"){
  checkdata.value.HDT = "ok";
  clearTimeout(HDTtimeout);
  HDTtimeout = setTimeout(() => {
    checkdata.value.HDT = "no";
  }, 1000);
}
if (headerName === "GYRO/ROT"){
  checkdata.value.ROT = "ok";
  clearTimeout(ROTtimeout);
  ROTtimeout = setTimeout(() => {
    checkdata.value.ROT = "no";
  }, 1000);
}
if (headerName === "ANEMOMETER/MWV"){
  checkdata.value.MWV = "ok";
  clearTimeout(MWVtimeout);
  MWVtimeout = setTimeout(() => {
    checkdata.value.MWV = "no";
  }, 1000);
}
if (headerName === "ANEMOMETER/MWD"){
  checkdata.value.MWD = "ok";
  clearTimeout(MWDtimeout);
  MWDtimeout = setTimeout(() => {
    checkdata.value.MWD = "no";
  }, 1000);
}
if (headerName === "ANEMOMETER/VWR"){
  checkdata.value.VWR = "ok";
  clearTimeout(VWRtimeout);
  VWRtimeout = setTimeout(() => {
    checkdata.value.VWR = "no";
  }, 1000);
}
if (headerName === "ANEMOMETER/MTW"){
  checkdata.value.MTW = "ok";
  clearTimeout(MTWtimeout);
  MTWtimeout = setTimeout(() => {
    checkdata.value.MTW = "no";
  }, 1000);
}
if (headerName === "ANEMOMETER/VWT"){
  checkdata.value.VWT = "ok";
  clearTimeout(VWTtimeout);
  VWTtimeout = setTimeout(() => {
    checkdata.value.VWT = "no";
  }, 1000);
}
if (headerName === "RADAR/TTM"){
  checkdata.value.TTM = "ok";
  clearTimeout(TTMtimeout);
  TTMtimeout = setTimeout(() => {
    checkdata.value.TTM = "no";
  }, 1000);
}
if (headerName === "RADAR/TLL"){
  checkdata.value.TLL = "ok";
  clearTimeout(TLLtimeout);
  TLLtimeout = setTimeout(() => {
    checkdata.value.TLL = "no";
  }, 1000);
}
if (headerName === "RADAR/SCREEN"){
  checkdata.value.RSCREEN = "ok";
  clearTimeout(RSCREENtimeout);
  RSCREENtimeout = setTimeout(() => {
    checkdata.value.RSCREEN = "no";
  }, 1000);
}
if (headerName === "AIS/VDM"){
  checkdata.value.VDM = "ok";
  clearTimeout(VDMtimeout);
  VDMtimeout = setTimeout(() => {
    checkdata.value.VDM = "no";
  }, 1000);
}
if (headerName === "AIS/VDO"){
  checkdata.value.VDO = "ok";
  clearTimeout(VDOtimeout);
  VDOtimeout = setTimeout(() => {
    checkdata.value.VDO = "no";
  }, 1000);
}
if (headerName === "ECDIS/ROUTEINFO"){
  checkdata.value.ROUTEINFO = "ok";
  clearTimeout(ROUTEINFOtimeout);
  ROUTEINFOtimeout = setTimeout(() => {
    checkdata.value.ROUTEINFO = "no";
  }, 1000);
}
if (headerName === "ECDIS/WAYPOINTS"){
  checkdata.value.WAYPOINTS = "ok";
  clearTimeout(WAYPOINTStimeout);
  WAYPOINTStimeout = setTimeout(() => {
    checkdata.value.WAYPOINTS = "no";
  }, 1000);
}
if (headerName === "ECDIS/SCREEN"){
  checkdata.value.ESCREEN = "ok";
  clearTimeout(ESCREENtimeout);
  ESCREENtimeout = setTimeout(() => {
    checkdata.value.ESCREEN = "no";
  }, 1000);
}
if (headerName === "AUTOPILOT/RSA"){
  checkdata.value.RSA = "ok";
  clearTimeout(RSAtimeout);
  RSAtimeout = setTimeout(() => {
    checkdata.value.RSA = "no";
  }, 1000);
}
if (headerName === "AUTOPILOT/MODE"){
  checkdata.value.MODE = "ok";
  clearTimeout(MODEtimeout);
  MODEtimeout = setTimeout(() => {
    checkdata.value.MODE = "no";
  }, 1000);
}
if (headerName === "AUTOPILOT/HTD"){
  checkdata.value.HTD = "ok";
  clearTimeout(HTDtimeout);
  HTDtimeout = setTimeout(() => {
    checkdata.value.HTD = "no";
  }, 1000);
}
if (headerName === "SPEEDLOG/VBW"){
  checkdata.value.VBW = "ok";
  clearTimeout(VBWtimeout);
  VBWtimeout = setTimeout(() => {
    checkdata.value.VBW = "no";
  }, 1000);
}
if (headerName === "SPEEDLOG/VHW"){
  checkdata.value.VHW = "ok";
  clearTimeout(VHWtimeout);
  VHWtimeout = setTimeout(() => {
    checkdata.value.VHW = "no";
  }, 1000);
}
if (headerName === "SPEEDLOG/VLW"){
  checkdata.value.VLW = "ok";
  clearTimeout(VLWtimeout);
  VLWtimeout = setTimeout(() => {
    checkdata.value.VLW = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444"){
  checkdata.value.NO1ENGINE_PANEL_61444 = "ok";
  clearTimeout(NO1ENGINE_PANEL_61444timeout);
  NO1ENGINE_PANEL_61444timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_61444 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65262"){
  checkdata.value.NO1ENGINE_PANEL_65262 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65262timeout);
  NO1ENGINE_PANEL_65262timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65262 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65263"){
  checkdata.value.NO1ENGINE_PANEL_65263 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65263timeout);
  NO1ENGINE_PANEL_65263timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65263 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65272"){
  checkdata.value.NO1ENGINE_PANEL_65272 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65272timeout);
  NO1ENGINE_PANEL_65272timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65272 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65271"){
  checkdata.value.NO1ENGINE_PANEL_65271 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65271timeout);
  NO1ENGINE_PANEL_65271timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65271 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65253"){
  checkdata.value.NO1ENGINE_PANEL_65253 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65253timeout);
  NO1ENGINE_PANEL_65253timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65253 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65270"){
  checkdata.value.NO1ENGINE_PANEL_65270 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65270timeout);
  NO1ENGINE_PANEL_65270timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65270 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65276"){
  checkdata.value.NO1ENGINE_PANEL_65276 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65276timeout);
  NO1ENGINE_PANEL_65276timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65276 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65360"){
  checkdata.value.NO1ENGINE_PANEL_65360 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65360timeout);
  NO1ENGINE_PANEL_65360timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65360 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_LAMP"){
  checkdata.value.NO1ENGINE_PANEL_65361_LAMP = "ok";
  clearTimeout(NO1ENGINE_PANEL_65361_LAMPtimeout);
  NO1ENGINE_PANEL_65361_LAMPtimeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65361_LAMP = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_STATUS"){
  checkdata.value.NO1ENGINE_PANEL_65361_STATUS = "ok";
  clearTimeout(NO1ENGINE_PANEL_65361_STATUStimeout);
  NO1ENGINE_PANEL_65361_STATUStimeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65361_STATUS = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65378"){
  checkdata.value.NO1ENGINE_PANEL_65378 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65378timeout);
  NO1ENGINE_PANEL_65378timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65378 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65376"){
  checkdata.value.NO1ENGINE_PANEL_65376 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65376timeout);
  NO1ENGINE_PANEL_65376timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65376 = "no";
  }, 1000);
}
if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65379"){
  checkdata.value.NO1ENGINE_PANEL_65379 = "ok";
  clearTimeout(NO1ENGINE_PANEL_65379timeout);
  NO1ENGINE_PANEL_65379timeout = setTimeout(() => {
    checkdata.value.NO1ENGINE_PANEL_65379 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444"){
  checkdata.value.NO2ENGINE_PANEL_61444 = "ok";
  clearTimeout(NO2ENGINE_PANEL_61444timeout);
  NO2ENGINE_PANEL_61444timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_61444 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65262"){
  checkdata.value.NO2ENGINE_PANEL_65262 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65262timeout);
  NO2ENGINE_PANEL_65262timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65262 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65263"){
  checkdata.value.NO2ENGINE_PANEL_65263 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65263timeout);
  NO2ENGINE_PANEL_65263timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65263 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65272"){
  checkdata.value.NO2ENGINE_PANEL_65272 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65272timeout);
  NO2ENGINE_PANEL_65272timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65272 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65271"){
  checkdata.value.NO2ENGINE_PANEL_65271 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65271timeout);
  NO2ENGINE_PANEL_65271timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65271 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65253"){
  checkdata.value.NO2ENGINE_PANEL_65253 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65253timeout);
  NO2ENGINE_PANEL_65253timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65253 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65270"){
  checkdata.value.NO2ENGINE_PANEL_65270 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65270timeout);
  NO2ENGINE_PANEL_65270timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65270 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65276"){
  checkdata.value.NO2ENGINE_PANEL_65276 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65276timeout);
  NO2ENGINE_PANEL_65276timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65276 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65360"){
  checkdata.value.NO2ENGINE_PANEL_65360 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65360timeout);
  NO2ENGINE_PANEL_65360timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65360 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_LAMP"){
  checkdata.value.NO2ENGINE_PANEL_65361_LAMP = "ok";
  clearTimeout(NO2ENGINE_PANEL_65361_LAMPtimeout);
  NO2ENGINE_PANEL_65361_LAMPtimeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65361_LAMP = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_STATUS"){
  checkdata.value.NO2ENGINE_PANEL_65361_STATUS = "ok";
  clearTimeout(NO2ENGINE_PANEL_65361_STATUStimeout);
  NO2ENGINE_PANEL_65361_STATUStimeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65361_STATUS = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65378"){
  checkdata.value.NO2ENGINE_PANEL_65378 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65378timeout);
  NO2ENGINE_PANEL_65378timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65378 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65376"){
  checkdata.value.NO2ENGINE_PANEL_65376 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65376timeout);
  NO2ENGINE_PANEL_65376timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65376 = "no";
  }, 1000);
}
if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65379"){
  checkdata.value.NO2ENGINE_PANEL_65379 = "ok";
  clearTimeout(NO2ENGINE_PANEL_65379timeout);
  NO2ENGINE_PANEL_65379timeout = setTimeout(() => {
    checkdata.value.NO2ENGINE_PANEL_65379 = "no";
  }, 1000);
}
}

const resetCheckdata = () => {
  Object.keys(checkdata.value).forEach((key) => {
    checkdata.value[key] = "no";
  });
  clearTimeout(ggaTimeout); // 타임아웃도 초기화
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
</script>

<style scoped></style>
