<template>
  <v-card
    :style="{ backgroundColor: themeColor }"
    class="d-flex justify-center align-center"
  >
    <v-row>
      <!-- 왼쪽 큰 박스 -->
      <v-col cols="10" style="">
        <v-row>
          <!-- (최) 지도 뷰 -->
          <v-col
            :cols="getColsValue1()"
            no-gutters
            :style="{ padding: '0px', paddingLeft: '16px', paddingTop: '20px' }"
          >
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <OSMap
                    :lat="parseFloat(latitude)"
                    :lon="parseFloat(longitude)"
                    :state="mapstart"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- port rudder -->
          <v-col
            :cols="getColsValue1()"
            no-gutters
            :style="{ padding: '0px', paddingLeft: '4px', paddingTop: '20px' }"
          >
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <!-- <video ref="video" width="10%" height="100" controls muted="muted"></video> -->
                  <!-- <video ref="video" width="350" controls muted="muted"></video> -->
                  <EchartStarPort
                    :starport="parseFloat(port)"
                    :name="'PortRudder'"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- starboard rudder -->
          <v-col
            :cols="getColsValue1()"
            no-gutters
            :style="{
              padding: '0px',
              paddingLeft: '4px',
              paddingTop: '20px',
            }"
          >
            <v-sheet style="height: 34vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartStarPort
                    :starport="parseFloat(star)"
                    :name="'StarboardRudder'"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- .. -->
          <v-col
            :cols="getColsValue2()"
            no-gutters
            :style="{
              padding: '0px',
              paddingLeft: `${getPaddingLeftValue()}px`,
              paddingTop: `${getOtherPaddingTop()}px`,
            }"
          >
            <v-sheet style="display: flex">
              <v-row>
                <v-col cols="12" no-gutters>
                  <v-card style="flex: 1">
                    <v-card-item>
                      <v-row>
                        <v-col
                          :cols="getColsValue3()"
                          no-gutters
                          :style="{ paddingTop: '5px', paddingBottom: '0px' }"
                        >
                          <v-sheet
                            :style="{
                              height: `${getheightValue1()}vh`,
                              display: flex,
                            }"
                          >
                            <EchartGaugeVolt
                              :name="'SpeedN'"
                              :unit="'kt'"
                              :max_value="200"
                              :value="parseFloat(speed)"
                            />
                          </v-sheet>
                        </v-col>
                        <v-col
                          :cols="getColsValue3()"
                          no-gutters
                          :style="{ paddingTop: '5px', paddingBottom: '0px' }"
                        >
                          <v-sheet
                            :style="{
                              height: `${getheightValue1()}vh`,
                              display: flex,
                            }"
                          >
                            <EchartGaugeVolt
                              :name="'Anemometer Speed'"
                              :value="parseFloat(windspeed)"
                              :unit="'m/s'"
                              :max_value="40"
                            />
                          </v-sheet>
                        </v-col>
                        <v-col
                          :cols="getColsValue3()"
                          no-gutters
                          :style="{
                            paddingTop: `${getheadingPaddingTop()}px`,
                            paddingBottom: '0px',
                          }"
                          ><v-sheet
                            :style="{
                              height: `${getheightValue1()}vh`,
                              display: flex,
                            }"
                          >
                            <EchartHeading
                              :value="parseFloat(heading)"
                              :name="'Heading'"
                            /> </v-sheet
                        ></v-col>

                        <v-col
                          :cols="getColsValue3()"
                          no-gutters
                          :style="{
                            paddingTop: `${getheadingPaddingTop()}px`,
                            paddingBottom: '0px',
                          }"
                        >
                          <v-sheet
                            :style="{
                              height: `${getheightValue1()}vh`,
                              display: flex,
                            }"
                          >
                            <EchartHeading
                              :value="parseFloat(windangle)"
                              :name="'Anemometer Angle'"
                            />
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <!-- 엔진1 -->
          <v-col
            :cols="getEngineColsValue()"
            no-gutters
            :style="{ padding: '0px', paddingLeft: '16px', paddingTop: '4px' }"
          >
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
                        :value="parseFloat(engine1Speed)"
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
                            :value="parseFloat(engine1oilPressure)"
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
                            :value="parseFloat(engine1oilTemperature)"
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
                            :value="parseFloat(engine1transmissionPressure)"
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
                            :value="parseFloat(engine1gasTemperature)"
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
          </v-col>
          <!-- 엔진2 -->
          <v-col
            :cols="getEngineColsValue()"
            no-gutters
            :style="{
              padding: '0px',
              paddingLeft: `${getPaddingLeftValue()}px`,
              paddingTop: '4px',
            }"
          >
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
                        :value="parseFloat(engine2Speed)"
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
                            :value="parseFloat(engine2oilPressure)"
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
                            :value="parseFloat(engine2oilTemperature)"
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
                            :value="parseFloat(engine2transmissionPressure)"
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
                            :value="parseFloat(engine2gasTemperature)"
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
          </v-col>
        </v-row>

        <!-- (최) Lamp뷰 -->
        <v-row>
          <v-col
            :cols="getLampColsValue()"
            no-gutters
            :style="{ padding: '0px' }"
          >
            <v-sheet
              :style="{
                height: `${getLampheightValueALL1()}vh`,
                backgroundColor: themeColor,
                paddingTop: `${getLampPaddingTop()}px`,
                paddingLeft: `16px`,
                paddingBottom: `${getLampPaddingBottom1()}px`,
                display: 'flex',
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <EngineLampChecking
                    :checkdata="checkdata1"
                    :height="getLampheightValue1()"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>

          <!-- (최) Lamp뷰 -->

          <v-col
            :cols="getLampColsValue()"
            no-gutters
            :style="{ padding: '0px' }"
          >
            <v-sheet
              :style="{
                height: `${getLampheightValueALL2()}vh`,
                backgroundColor: themeColor,
                paddingTop: `${getLampPaddingTop()}px`,
                paddingLeft: `${getLampPaddingLeft()}px`,
                paddingBottom: `${getLampPaddingBottom2()}px`,
                display: 'flex',
              }"
            >
              <v-card style="flex: 1">
                <v-card-item>
                  <EngineLampChecking
                    :checkdata="checkdata2"
                    :height="getLampheightValue2()"
                  />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <!-- (최)데이터 확인 박스 -->
      <v-col cols="2">
        <v-sheet
          :style="{
            backgroundColor: themeColor,
            paddingTop: '8px',
            paddingLeft: '0px',
            paddingRight: '9px',
            height: `${5}vh`,
            display: 'flex',
          }"
        >
          <v-btn style="width: 100%; height: 100%" @click="openCCTV()"
            >CCTV 확인</v-btn
          >
        </v-sheet>
        <v-sheet
          :style="{
            backgroundColor: themeColor,
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '0px',
            paddingRight: '9px',
            height: `${getheightValue2() - 5}vh`,
            display: 'flex',
          }"
        >
          <v-card style="width: 100%; height: 100%">
            <v-card-item>
              <SocketChecking
                :checkdata="checkdata"
                :height="getheightValue2()"
              />
            </v-card-item>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
  <!-- CCTV 화면 -->
  <v-dialog v-model="cctvDialog" persistent max-width="1335">
    <v-card>
      <v-card-title>cctv</v-card-title>
      <v-card-text>
        <v-container>
          <v-row class="video-container">
            <video ref="videoD" controls muted="muted"></video>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeCCTV()"
          >닫기</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- <v-dialog v-model="cctvDialog">
            <video ref="videoD" width="1280" controls muted="muted"></video>
  </v-dialog> -->
</template>

<script setup>
// cctv
import Hls from "hls.js";
// map
import OSMap from "../components/OSMap.vue";
import SocketChecking from "../components/SocketChecking.vue";
import EngineLampChecking from "../components/EngineLampChecking.vue";
import EchartHeading from "../components/EchartGraph/EchartHeading.vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartGaugeVolt from "../components/EchartGraph/EchartGaugeVolt.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";
import { readLampTimeData, cctvUrl } from "../api/index.js";
import { darkbackcolor, whitebackcolor } from "../color/color.js";
// 웹소켓 관련, Web Socket
import {
  ref,
  inject,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import socket, { onMessage, onOpen, onClose, onError } from "vue3-websocket";
import { createApp } from "vue";
import App from "./RealtimeView.vue";

// createApp(App).use(socket, "ws://ias.bdpbackend.com/ws/shipinfo1")

const ws = new WebSocket("ws://ias.bdpbackend.com/ws/shipinfo");

ws.onopen = function (event) {
  console.log("Connection opened");
};

const headerNameC = ref();
ws.onmessage = function (event) {
  console.log("Message received: " + event.data);
  try {
    const parsedMessage = JSON.parse(event.data);
    let headerName = parsedMessage.Package.Header.Author;
    let variableName = getVariableName(headerName);
    headerNameC.value = parsedMessage.Package.Header.Author;
    checkdata.value[variableName] = parsedMessage.Package.Header.TimeSpan.End;
    clearTimeout(messageTimeout);
    // console.log(headerName);
    // console.log(parsedMessage);
    checkingData(headerName);
    // 'Package' 내의 데이터 중 "DataSet"의 첫 번째 항목 추출
    // 위치
    if (headerName === "DGPS/GGA") {
      latitude.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[2]
      ).toFixed(4);
      mapstart.value = "start";
      clearTimeout(GGAtimeout1); // 이전 타임아웃을 취소
      GGAtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        latitude.value = null;
        mapstart.value = "stop";
      }, checkTime.value);
      longitude.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[4]
      ).toFixed(4);
      clearTimeout(GGAtimeout2); // 이전 타임아웃을 취소
      GGAtimeout2 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        longitude.value = null;
      }, checkTime.value);
    }
    if (headerName === "ANEMOMETER/MWV") {
      windspeed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[3]
      ).toFixed(2);
      clearTimeout(MWVtimeout1); // 이전 타임아웃을 취소
      MWVtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        windspeed.value = null;
      }, checkTime.value);
      windangle.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[1]
      ).toFixed(2);
      clearTimeout(MWVtimeout2); // 이전 타임아웃을 취소
      MWVtimeout2 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        windangle.value = null;
      }, checkTime.value);
    }
    // 헤딩값
    if (headerName === "GYRO/HDT") {
      heading.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[1]
      ).toFixed(2);
      clearTimeout(HDTtimeout1); // 이전 타임아웃을 취소
      HDTtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        heading.value = null;
      }, checkTime.value);
    }
    // 스피드
    if (headerName === "SPEEDLOG/VHW") {
      speed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[5]
      ).toFixed(2);
      clearTimeout(VHWtimeout1); // 이전 타임아웃을 취소
      VHWtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        speed.value = null;
      }, checkTime.value);
    }
    // 러더
    if (headerName === "AUTOPILOT/RSA") {
      star.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[1]
      ).toFixed(2);
      clearTimeout(RSAtimeout1); // 이전 타임아웃을 취소
      RSAtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        star.value = null;
      }, checkTime.value);
      port.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[3]
      ).toFixed(2);
      clearTimeout(RSAtimeout2); // 이전 타임아웃을 취소
      RSAtimeout2 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        port.value = null;
      }, checkTime.value);
    }
    // 엔진1
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444") {
      engine1Speed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
      clearTimeout(NO1ENGINE_PANEL_61444timeout1); // 이전 타임아웃을 취소
      NO1ENGINE_PANEL_61444timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1Speed.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65262") {
      engine1oilTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
      clearTimeout(NO1ENGINE_PANEL_65262timeout1); // 이전 타임아웃을 취소
      NO1ENGINE_PANEL_65262timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1oilTemperature.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65263") {
      engine1oilPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
      clearTimeout(NO1ENGINE_PANEL_65263timeout1); // 이전 타임아웃을 취소
      NO1ENGINE_PANEL_65263timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1oilPressure.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65272") {
      engine1transmissionPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
      clearTimeout(NO1ENGINE_PANEL_65272timeout1); // 이전 타임아웃을 취소
      NO1ENGINE_PANEL_65272timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1transmissionPressure.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65270") {
      engine1gasTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[2]
      ).toFixed(2);
      clearTimeout(NO1ENGINE_PANEL_65270timeout1); // 이전 타임아웃을 취소
      NO1ENGINE_PANEL_65270timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1gasTemperature.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_LAMP") {
      for (let i = 0; i < 16; i++) {
        if (
          parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
            .Value[i] === "1"
        ) {
          if (i === 0) checkdata1.value[9] = "ok";
          if (i === 1) checkdata1.value[12] = "ok";
          if (i === 2) checkdata1.value[14] = "ok";
          if (i === 3) checkdata1.value[4] = "ok";
          if (i === 4) checkdata1.value[2] = "ok";
          if (i === 5) checkdata1.value[3] = "ok";
          if (i === 6) checkdata1.value[1] = "ok";
          if (i === 7) checkdata1.value[6] = "ok";
          if (i === 8) checkdata1.value[5] = "ok";
          if (i === 9) checkdata1.value[10] = "ok";
          if (i === 10) checkdata1.value[15] = "ok";
          if (i === 11) checkdata1.value[16] = "ok";
          if (i === 12) checkdata1.value[11] = "ok";
          if (i === 13) checkdata1.value[13] = "ok";
          if (i === 14) checkdata1.value[7] = "ok";
          if (i === 15) checkdata1.value[8] = "ok";
        } else {
          if (i === 0) checkdata1.value[9] = "no";
          if (i === 1) checkdata1.value[12] = "no";
          if (i === 2) checkdata1.value[14] = "no";
          if (i === 3) checkdata1.value[4] = "no";
          if (i === 4) checkdata1.value[2] = "no";
          if (i === 5) checkdata1.value[3] = "no";
          if (i === 6) checkdata1.value[1] = "no";
          if (i === 7) checkdata1.value[6] = "no";
          if (i === 8) checkdata1.value[5] = "no";
          if (i === 9) checkdata1.value[10] = "no";
          if (i === 10) checkdata1.value[15] = "no";
          if (i === 11) checkdata1.value[16] = "no";
          if (i === 12) checkdata1.value[11] = "no";
          if (i === 13) checkdata1.value[13] = "no";
          if (i === 14) checkdata1.value[7] = "no";
          if (i === 15) checkdata1.value[8] = "no";
        }
      }
      clearTimeout(NO1ENGINE_PANEL_65361_LAMPtimeout1); // 이전 타임아웃을 취소
      NO1ENGINE_PANEL_65361_LAMPtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1gasTemperature.value = null;
      }, 3000);
    }
    // 엔진2
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444") {
      engine2Speed.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
      clearTimeout(NO2ENGINE_PANEL_61444timeout1); // 이전 타임아웃을 취소
      NO2ENGINE_PANEL_61444timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine2Speed.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65262") {
      engine2oilTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0]
      ).toFixed(2);
      clearTimeout(NO2ENGINE_PANEL_65262timeout1); // 이전 타임아웃을 취소
      NO2ENGINE_PANEL_65262timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine2oilTemperature.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65263") {
      engine2oilPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
      clearTimeout(NO2ENGINE_PANEL_65263timeout1); // 이전 타임아웃을 취소
      NO2ENGINE_PANEL_65263timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine2oilPressure.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65272") {
      engine2transmissionPressure.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[0] / 100
      ).toFixed(2);
      clearTimeout(NO2ENGINE_PANEL_65272timeout1); // 이전 타임아웃을 취소
      NO2ENGINE_PANEL_65272timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine2transmissionPressure.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65270") {
      engine2gasTemperature.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[2]
      ).toFixed(2);
      clearTimeout(NO2ENGINE_PANEL_65270timeout1); // 이전 타임아웃을 취소
      NO2ENGINE_PANEL_65270timeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine2gasTemperature.value = null;
      }, checkTime.value);
    }
    if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_LAMP") {
      for (let i = 0; i < 16; i++) {
        if (
          parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
            .Value[i] === "1"
        ) {
          onlamp(i);
        } else {
          offlamp(i);
        }
      }
      clearTimeout(NO2ENGINE_PANEL_65361_LAMPtimeout1); // 이전 타임아웃을 취소
      NO2ENGINE_PANEL_65361_LAMPtimeout1 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        engine1gasTemperature.value = null;
      }, 3000);
    }
  } catch (error) {
    console.error(error);
    // resetCheckdata();
  }
};

ws.onerror = function (event) {
  console.error("WebSocket error observed:", event);
  resetCheckdata();
  offlamp(16);
};

ws.onclose = function (event) {
  console.log("Connection closed");
  resetCheckdata();
  offlamp(16);
};

onBeforeUnmount(() => {
  // 페이지(컴포넌트)가 종료되기 전에 웹소켓 연결을 닫습니다.
  ws.close();
  console.log("bye");
});

const themeMode = ref(localStorage.getItem("themeMode") || "light");

const themeColor = ref(
  themeMode.value === "light" ? whitebackcolor : darkbackcolor
);
watch(themeMode, (newValue) => {
  themeColor.value = newValue === "light" ? whitebackcolor : darkbackcolor;
});

const text = ref(""); // 보낼 데이터
const responseMsg = ref(""); // 받아온 데이터
const checktime = ref(3000);

const tokenid = ref(sessionStorage.getItem("token") || "");

const checkTime = ref();

const videoD = ref(null);

const cctvDialog = ref(false);
let hls1; // Hls 인스턴스를 전역 변수로 선언

const openCCTV = () => {
  cctvDialog.value = true;
  if (sessionStorage.getItem("isAdmin") != "ADMIN") {
    alert("ADMIN 이상만 사용 가능합니다.");
    return;
  }
  setCCTV();
};

const setCCTV = () => {
  const url = cctvUrl;
  nextTick(() => {
    hls1 = new Hls();
    hls1.loadSource(url);
    hls1.attachMedia(videoD.value);
    hls1.on(Hls.Events.MANIFEST_PARSED, () => {
      videoD.value.play().catch((error) => {
        console.error("비디오 재생 오류:", error);
      });
    });
  });
};

const closeCCTV = () => {
  cctvDialog.value = false;
};

const fetchData = async () => {
  try {
    const timedata = await readLampTimeData(tokenid.value);
    console.log(`설정타임 : ${timedata.lampTime}`);
    checkTime.value = Number(timedata.lampTime) * 1000;
    console.log(`checkTime : ${checkTime.value}`);
  } catch (error) {
    //console.error(error);
    console.log(`설정타임에러`);
  }
};

onMounted(() => {
  sessionStorage.setItem("page", "실시간 모니터링");
  fetchData();
});

const checkdata = ref({
  GLL: "no",
  GGA: "no",
  RMC: "no",
  VTG: "no",
  ZDA: "no",
  // DTM: "no",
  GSV: "no",
  GSA: "no",
  // THS: "no",
  HDT: "no",
  ROT: "no",
  MWV: "no",
  // MWD: "no",
  // VWR: "no",
  // MTW: "no",
  // VWT: "no",
  // TTM: "no",
  // TLL: "no",
  RSCREEN: "no",
  VDM: "no",
  VDO: "no",
  ROUTEINFO: "no",
  WAYPOINTS: "no",
  RTZ: "no",
  ESCREEN: "no",
  RSA: "no",
  // MODE: "no",
  HTD: "no",
  VBW: "no",
  VHW: "no",
  VLW: "no",
  CAN_ONLINE_STATE: "no",
  ENGINE_RPM: "no",
  RUDDER: "no",
  RUDDER_SCALE: "no",
  AUTOPILOTCONTACT: "no",
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
const checkdata1 = ref({
  1: "no", // "Low Volt"
  2: "no", // "Fuel Leak"
  3: "no", // "Over Speed"
  4: "no", // "Battery Charge"
  5: "no", // "Low Fuel Level"
  6: "no", // "Low Water Level"
  7: "no", // "Engine Shutdown"
  8: "no", // "Low Engine Speed"
  9: "no", // "Water Temperature"
  10: "no", // "Engine Oil Over Heat"
  11: "no", // "Low Boost Air Pressure"
  12: "no", // "Low Engine Oil Pressure"
  13: "no", // "High Boost Air Pressure"
  14: "no", // "Low Gearbox Oil Pressure"
  15: "no", // "Main connector Removed"
  16: "no", // "High Exhaust Gas Temperature"
});
const checkdata2 = ref({
  1: "no", // "Low Volt"
  2: "no", // "Fuel Leak"
  3: "no", // "Over Speed"
  4: "no", // "Battery Charge"
  5: "no", // "Low Fuel Level"
  6: "no", // "Low Water Level"
  7: "no", // "Engine Shutdown"
  8: "no", // "Low Engine Speed"
  9: "no", // "Water Temperature"
  10: "no", // "Engine Oil Over Heat"
  11: "no", // "Low Boost Air Pressure"
  12: "no", // "Low Engine Oil Pressure"
  13: "no", // "High Boost Air Pressure"
  14: "no", // "Low Gearbox Oil Pressure"
  15: "no", // "Main connector Removed"
  16: "no", // "High Exhaust Gas Temperature"
});
console.log(checkdata.value.gll);
console.log(checkdata.value.gga);
console.log(checkdata.value.rmc);

// const socket1 = inject("socket");

// const sendMessage = () => socket1.value.send(text.value);

// 센서 데이터
const latitude = ref();
const longitude = ref();
const mapstart = ref("wait");
const heading = ref();
const speed = ref();
const star = ref();
const port = ref();
const windspeed = ref();
const windangle = ref();

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
let ggaTimeout1 = null;
let GLLtimeout = null;
let GGAtimeout = null;
let GGAtimeout1 = null;
let GGAtimeout2 = null;
let RMCtimeout = null;
let VTGtimeout = null;
let ZDAtimeout = null;
let DTMtimeout = null;
let GSVtimeout = null;
let GSAtimeout = null;
let THStimeout = null;
let HDTtimeout = null;
let HDTtimeout1 = null;
let ROTtimeout = null;
let MWVtimeout = null;
let MWVtimeout1 = null;
let MWVtimeout2 = null;
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
let RTZtimeout = null;
let ESCREENtimeout = null;
let RSAtimeout = null;
let RSAtimeout1 = null;
let RSAtimeout2 = null;
let MODEtimeout = null;
let HTDtimeout = null;
let VBWtimeout = null;
let VHWtimeout = null;
let VHWtimeout1 = null;
let VLWtimeout = null;
let CAN_ONLINE_STATEtimeout = null;
let ENGINE_RPMtimeout = null;
let RUDDERtimeout = null;
let RUDDER_SCALEtimeout = null;
let AUTOPILOTCONTACTtimeout = null;
let NO1ENGINE_PANEL_61444timeout = null;
let NO1ENGINE_PANEL_61444timeout1 = null;
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
let NO1ENGINE_PANEL_65262timeout1 = null;
let NO1ENGINE_PANEL_65263timeout1 = null;
let NO1ENGINE_PANEL_65272timeout1 = null;
let NO1ENGINE_PANEL_65270timeout1 = null;
let NO1ENGINE_PANEL_65361_LAMPtimeout1 = null;
let NO2ENGINE_PANEL_61444timeout1 = null;
let NO2ENGINE_PANEL_65262timeout1 = null;
let NO2ENGINE_PANEL_65263timeout1 = null;
let NO2ENGINE_PANEL_65272timeout1 = null;
let NO2ENGINE_PANEL_65270timeout1 = null;
let NO2ENGINE_PANEL_65361_LAMPtimeout1 = null;
let messageTimeout;

// onOpen(() => {
//   console.log("WS connection is stable! ~uWu~");
// });
// const headerNameC = ref();

// onMessage((message) => {
//   try {
//     const parsedMessage = JSON.parse(message.data);
//     let headerName = parsedMessage.Package.Header.Author;
//     let variableName = getVariableName(headerName);
//     headerNameC.value = parsedMessage.Package.Header.Author;
//     checkdata.value[variableName] = parsedMessage.Package.Header.TimeSpan.End;

//     clearTimeout(messageTimeout);
//     // console.log(headerName);
//     // console.log(parsedMessage);
//     checkingData(headerName);
//     // 'Package' 내의 데이터 중 "DataSet"의 첫 번째 항목 추출
//     // 위치
//     if (headerName === "DGPS/GGA") {
//       latitude.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[2]
//       ).toFixed(4);
//       mapstart.value = "start";
//       clearTimeout(GGAtimeout1); // 이전 타임아웃을 취소
//       GGAtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         latitude.value = null;
//         mapstart.value = "stop";
//       }, checkTime.value);
//       longitude.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[4]
//       ).toFixed(4);
//       clearTimeout(GGAtimeout2); // 이전 타임아웃을 취소
//       GGAtimeout2 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         longitude.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "ANEMOMETER/MWV") {
//       windspeed.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[3]
//       ).toFixed(2);
//       clearTimeout(MWVtimeout1); // 이전 타임아웃을 취소
//       MWVtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         windspeed.value = null;
//       }, checkTime.value);

//       windangle.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[1]
//       ).toFixed(2);
//       clearTimeout(MWVtimeout2); // 이전 타임아웃을 취소
//       MWVtimeout2 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         windangle.value = null;
//       }, checkTime.value);
//     }

//     // 헤딩값
//     if (headerName === "GYRO/HDT") {
//       heading.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[1]
//       ).toFixed(2);
//       clearTimeout(HDTtimeout1); // 이전 타임아웃을 취소
//       HDTtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         heading.value = null;
//       }, checkTime.value);
//     }
//     // 스피드
//     if (headerName === "SPEEDLOG/VHW") {
//       speed.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[5]
//       ).toFixed(2);
//       clearTimeout(VHWtimeout1); // 이전 타임아웃을 취소
//       VHWtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         speed.value = null;
//       }, checkTime.value);
//     }
//     // 러더
//     if (headerName === "AUTOPILOT/RSA") {
//       star.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[1]
//       ).toFixed(2);
//       clearTimeout(RSAtimeout1); // 이전 타임아웃을 취소
//       RSAtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         star.value = null;
//       }, checkTime.value);
//       port.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[3]
//       ).toFixed(2);
//       clearTimeout(RSAtimeout2); // 이전 타임아웃을 취소
//       RSAtimeout2 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         port.value = null;
//       }, checkTime.value);
//     }

//     // 엔진1
//     if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444") {
//       engine1Speed.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0]
//       ).toFixed(2);
//       clearTimeout(NO1ENGINE_PANEL_61444timeout1); // 이전 타임아웃을 취소
//       NO1ENGINE_PANEL_61444timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1Speed.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65262") {
//       engine1oilTemperature.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0]
//       ).toFixed(2);
//       clearTimeout(NO1ENGINE_PANEL_65262timeout1); // 이전 타임아웃을 취소
//       NO1ENGINE_PANEL_65262timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1oilTemperature.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65263") {
//       engine1oilPressure.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0] / 100
//       ).toFixed(2);
//       clearTimeout(NO1ENGINE_PANEL_65263timeout1); // 이전 타임아웃을 취소
//       NO1ENGINE_PANEL_65263timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1oilPressure.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65272") {
//       engine1transmissionPressure.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0] / 100
//       ).toFixed(2);
//       clearTimeout(NO1ENGINE_PANEL_65272timeout1); // 이전 타임아웃을 취소
//       NO1ENGINE_PANEL_65272timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1transmissionPressure.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65270") {
//       engine1gasTemperature.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[2]
//       ).toFixed(2);
//       clearTimeout(NO1ENGINE_PANEL_65270timeout1); // 이전 타임아웃을 취소
//       NO1ENGINE_PANEL_65270timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1gasTemperature.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_LAMP") {
//       for (let i = 0; i < 16; i++) {
//         if (
//           parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//             .Value[i] === "1"
//         ) {
//           if (i === 0) checkdata1.value[9] = "ok";
//           if (i === 1) checkdata1.value[12] = "ok";
//           if (i === 2) checkdata1.value[14] = "ok";
//           if (i === 3) checkdata1.value[4] = "ok";
//           if (i === 4) checkdata1.value[2] = "ok";
//           if (i === 5) checkdata1.value[3] = "ok";
//           if (i === 6) checkdata1.value[1] = "ok";
//           if (i === 7) checkdata1.value[6] = "ok";
//           if (i === 8) checkdata1.value[5] = "ok";
//           if (i === 9) checkdata1.value[10] = "ok";
//           if (i === 10) checkdata1.value[15] = "ok";
//           if (i === 11) checkdata1.value[16] = "ok";
//           if (i === 12) checkdata1.value[11] = "ok";
//           if (i === 13) checkdata1.value[13] = "ok";
//           if (i === 14) checkdata1.value[7] = "ok";
//           if (i === 15) checkdata1.value[8] = "ok";
//         } else {
//           if (i === 0) checkdata1.value[9] = "no";
//           if (i === 1) checkdata1.value[12] = "no";
//           if (i === 2) checkdata1.value[14] = "no";
//           if (i === 3) checkdata1.value[4] = "no";
//           if (i === 4) checkdata1.value[2] = "no";
//           if (i === 5) checkdata1.value[3] = "no";
//           if (i === 6) checkdata1.value[1] = "no";
//           if (i === 7) checkdata1.value[6] = "no";
//           if (i === 8) checkdata1.value[5] = "no";
//           if (i === 9) checkdata1.value[10] = "no";
//           if (i === 10) checkdata1.value[15] = "no";
//           if (i === 11) checkdata1.value[16] = "no";
//           if (i === 12) checkdata1.value[11] = "no";
//           if (i === 13) checkdata1.value[13] = "no";
//           if (i === 14) checkdata1.value[7] = "no";
//           if (i === 15) checkdata1.value[8] = "no";
//         }
//       }
//       clearTimeout(NO1ENGINE_PANEL_65361_LAMPtimeout1); // 이전 타임아웃을 취소
//       NO1ENGINE_PANEL_65361_LAMPtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1gasTemperature.value = null;
//       }, 3000);
//     }

//     // 엔진2
//     if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444") {
//       engine2Speed.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0]
//       ).toFixed(2);
//       clearTimeout(NO2ENGINE_PANEL_61444timeout1); // 이전 타임아웃을 취소
//       NO2ENGINE_PANEL_61444timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine2Speed.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65262") {
//       engine2oilTemperature.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0]
//       ).toFixed(2);
//       clearTimeout(NO2ENGINE_PANEL_65262timeout1); // 이전 타임아웃을 취소
//       NO2ENGINE_PANEL_65262timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine2oilTemperature.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65263") {
//       engine2oilPressure.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0] / 100
//       ).toFixed(2);
//       clearTimeout(NO2ENGINE_PANEL_65263timeout1); // 이전 타임아웃을 취소
//       NO2ENGINE_PANEL_65263timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine2oilPressure.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65272") {
//       engine2transmissionPressure.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[0] / 100
//       ).toFixed(2);
//       clearTimeout(NO2ENGINE_PANEL_65272timeout1); // 이전 타임아웃을 취소
//       NO2ENGINE_PANEL_65272timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine2transmissionPressure.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65270") {
//       engine2gasTemperature.value = Number(
//         parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//           .Value[2]
//       ).toFixed(2);
//       clearTimeout(NO2ENGINE_PANEL_65270timeout1); // 이전 타임아웃을 취소
//       NO2ENGINE_PANEL_65270timeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine2gasTemperature.value = null;
//       }, checkTime.value);
//     }
//     if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_LAMP") {
//       for (let i = 0; i < 16; i++) {
//         if (
//           parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
//             .Value[i] === "1"
//         ) {
//           onlamp(i);
//         } else {
//           offlamp(i);
//         }
//       }
//       clearTimeout(NO2ENGINE_PANEL_65361_LAMPtimeout1); // 이전 타임아웃을 취소
//       NO2ENGINE_PANEL_65361_LAMPtimeout1 = setTimeout(() => {
//         // 3초 이상 데이터가 오지 않으면 "no"로 변경
//         engine1gasTemperature.value = null;
//       }, 3000);
//     }
//   } catch (error) {
//     console.error(error);
//     // resetCheckdata();
//   }
// });

// onClose(() => {
//   console.log("No way, connection has been closed 😥");
//   resetCheckdata();
//   offlamp(16);
// });

// onError((error) => {
//   console.error("Error: ", error);
//   resetCheckdata();
//   offlamp(16);
// });

const checkingData = (headerName) => {
  if (headerName === "DGPS/GLL") {
    checkdata.value.GLL = "ok";
    clearTimeout(GLLtimeout);
    GLLtimeout = setTimeout(() => {
      checkdata.value.GLL = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/GGA") {
    checkdata.value.GGA = "ok";
    clearTimeout(GGAtimeout);
    GGAtimeout = setTimeout(() => {
      checkdata.value.GGA = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/RMC") {
    checkdata.value.RMC = "ok";
    clearTimeout(RMCtimeout);
    RMCtimeout = setTimeout(() => {
      checkdata.value.RMC = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/VTG") {
    checkdata.value.VTG = "ok";
    clearTimeout(VTGtimeout);
    VTGtimeout = setTimeout(() => {
      checkdata.value.VTG = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/ZDA") {
    checkdata.value.ZDA = "ok";
    clearTimeout(ZDAtimeout);
    ZDAtimeout = setTimeout(() => {
      checkdata.value.ZDA = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/DTM") {
    checkdata.value.DTM = "ok";
    clearTimeout(DTMtimeout);
    DTMtimeout = setTimeout(() => {
      checkdata.value.DTM = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/GSV") {
    checkdata.value.GSV = "ok";
    clearTimeout(GSVtimeout);
    GSVtimeout = setTimeout(() => {
      checkdata.value.GSV = "no";
    }, checkTime.value);
  }
  if (headerName === "DGPS/GSA") {
    checkdata.value.GSA = "ok";
    clearTimeout(GSAtimeout);
    GSAtimeout = setTimeout(() => {
      checkdata.value.GSA = "no";
    }, checkTime.value);
  }
  if (headerName === "GYRO/THS") {
    checkdata.value.THS = "ok";
    clearTimeout(THStimeout);
    THStimeout = setTimeout(() => {
      checkdata.value.THS = "no";
    }, checkTime.value);
  }
  if (headerName === "GYRO/HDT") {
    checkdata.value.HDT = "ok";
    clearTimeout(HDTtimeout);
    HDTtimeout = setTimeout(() => {
      checkdata.value.HDT = "no";
    }, checkTime.value);
  }
  if (headerName === "GYRO/ROT") {
    checkdata.value.ROT = "ok";
    clearTimeout(ROTtimeout);
    ROTtimeout = setTimeout(() => {
      checkdata.value.ROT = "no";
    }, checkTime.value);
  }
  if (headerName === "ANEMOMETER/MWV") {
    checkdata.value.MWV = "ok";
    clearTimeout(MWVtimeout);
    MWVtimeout = setTimeout(() => {
      checkdata.value.MWV = "no";
    }, checkTime.value);
  }
  if (headerName === "ANEMOMETER/MWD") {
    checkdata.value.MWD = "ok";
    clearTimeout(MWDtimeout);
    MWDtimeout = setTimeout(() => {
      checkdata.value.MWD = "no";
    }, checkTime.value);
  }
  if (headerName === "ANEMOMETER/VWR") {
    checkdata.value.VWR = "ok";
    clearTimeout(VWRtimeout);
    VWRtimeout = setTimeout(() => {
      checkdata.value.VWR = "no";
    }, checkTime.value);
  }
  if (headerName === "ANEMOMETER/MTW") {
    checkdata.value.MTW = "ok";
    clearTimeout(MTWtimeout);
    MTWtimeout = setTimeout(() => {
      checkdata.value.MTW = "no";
    }, checkTime.value);
  }
  if (headerName === "ANEMOMETER/VWT") {
    checkdata.value.VWT = "ok";
    clearTimeout(VWTtimeout);
    VWTtimeout = setTimeout(() => {
      checkdata.value.VWT = "no";
    }, checkTime.value);
  }
  if (headerName === "RADAR/TTM") {
    checkdata.value.TTM = "ok";
    clearTimeout(TTMtimeout);
    TTMtimeout = setTimeout(() => {
      checkdata.value.TTM = "no";
    }, checkTime.value);
  }
  if (headerName === "RADAR/TLL") {
    checkdata.value.TLL = "ok";
    clearTimeout(TLLtimeout);
    TLLtimeout = setTimeout(() => {
      checkdata.value.TLL = "no";
    }, checkTime.value);
  }
  if (headerName === "RADAR/RADAR SCREEN") {
    checkdata.value.RSCREEN = "ok";
    clearTimeout(RSCREENtimeout);
    RSCREENtimeout = setTimeout(() => {
      checkdata.value.RSCREEN = "no";
    }, checkTime.value);
  }
  if (headerName === "AIS/VDM") {
    checkdata.value.VDM = "ok";
    clearTimeout(VDMtimeout);
    VDMtimeout = setTimeout(() => {
      checkdata.value.VDM = "no";
    }, checkTime.value);
  }
  if (headerName === "AIS/VDO") {
    checkdata.value.VDO = "ok";
    clearTimeout(VDOtimeout);
    VDOtimeout = setTimeout(() => {
      checkdata.value.VDO = "no";
    }, checkTime.value);
  }
  if (headerName === "ECDIS/ROUTEINFO") {
    checkdata.value.ROUTEINFO = "ok";
    clearTimeout(ROUTEINFOtimeout);
    ROUTEINFOtimeout = setTimeout(() => {
      checkdata.value.ROUTEINFO = "no";
    }, checkTime.value);
  }
  if (headerName === "ECDIS/WAYPOINTS") {
    checkdata.value.WAYPOINTS = "ok";
    clearTimeout(WAYPOINTStimeout);
    WAYPOINTStimeout = setTimeout(() => {
      checkdata.value.WAYPOINTS = "no";
    }, checkTime.value);
  }
  if (headerName === "ECDIS/RTZ") {
    checkdata.value.RTZ = "ok";
    clearTimeout(RTZtimeout);
    RTZtimeout = setTimeout(() => {
      checkdata.value.RTZ = "no";
    }, checkTime.value);
  }
  if (headerName === "ECDIS/ECDIS SCREEN") {
    checkdata.value.ESCREEN = "ok";
    clearTimeout(ESCREENtimeout);
    ESCREENtimeout = setTimeout(() => {
      checkdata.value.ESCREEN = "no";
    }, checkTime.value);
  }
  if (headerName === "AUTOPILOT/RSA") {
    checkdata.value.RSA = "ok";
    clearTimeout(RSAtimeout);
    RSAtimeout = setTimeout(() => {
      checkdata.value.RSA = "no";
    }, checkTime.value);
  }
  if (headerName === "AUTOPILOT/MODE") {
    checkdata.value.MODE = "ok";
    clearTimeout(MODEtimeout);
    MODEtimeout = setTimeout(() => {
      checkdata.value.MODE = "no";
    }, checkTime.value);
  }
  if (headerName === "AUTOPILOT/HTD") {
    checkdata.value.HTD = "ok";
    clearTimeout(HTDtimeout);
    HTDtimeout = setTimeout(() => {
      checkdata.value.HTD = "no";
    }, checkTime.value);
  }
  if (headerName === "SPEEDLOG/VBW") {
    checkdata.value.VBW = "ok";
    clearTimeout(VBWtimeout);
    VBWtimeout = setTimeout(() => {
      checkdata.value.VBW = "no";
    }, checkTime.value);
  }
  if (headerName === "SPEEDLOG/VHW") {
    checkdata.value.VHW = "ok";
    clearTimeout(VHWtimeout);
    VHWtimeout = setTimeout(() => {
      checkdata.value.VHW = "no";
    }, checkTime.value);
  }
  if (headerName === "SPEEDLOG/VLW") {
    checkdata.value.VLW = "ok";
    clearTimeout(VLWtimeout);
    VLWtimeout = setTimeout(() => {
      checkdata.value.VLW = "no";
    }, checkTime.value);
  }
  if (headerName === "CANTHROTTLE/CAN ONLINE STATE") {
    checkdata.value.CAN_ONLINE_STATE = "ok";
    clearTimeout(CAN_ONLINE_STATEtimeout);
    CAN_ONLINE_STATEtimeout = setTimeout(() => {
      checkdata.value.CAN_ONLINE_STATE = "no";
    }, checkTime.value);
  }
  if (headerName === "CANTHROTTLE/ENGINE RPM") {
    checkdata.value.ENGINE_RPM = "ok";
    clearTimeout(ENGINE_RPMtimeout);
    ENGINE_RPMtimeout = setTimeout(() => {
      checkdata.value.ENGINE_RPM = "no";
    }, checkTime.value);
  }
  if (headerName === "CANTHROTTLE/RUDDER") {
    checkdata.value.RUDDER = "ok";
    clearTimeout(RUDDERtimeout);
    RUDDERtimeout = setTimeout(() => {
      checkdata.value.RUDDER = "no";
    }, checkTime.value);
  }
  if (headerName === "CANTHROTTLE/RUDDER SCALE") {
    checkdata.value.RUDDER_SCALE = "ok";
    clearTimeout(RUDDER_SCALEtimeout);
    RUDDER_SCALEtimeout = setTimeout(() => {
      checkdata.value.RUDDER_SCALE = "no";
    }, checkTime.value);
  }
  if (headerName === "AUTOPILOTCONTACT/AUTOPILOTCONTACT") {
    checkdata.value.AUTOPILOTCONTACT = "ok";
    clearTimeout(AUTOPILOTCONTACTtimeout);
    AUTOPILOTCONTACTtimeout = setTimeout(() => {
      checkdata.value.AUTOPILOTCONTACT = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_61444") {
    checkdata.value.NO1ENGINE_PANEL_61444 = "ok";
    clearTimeout(NO1ENGINE_PANEL_61444timeout);
    NO1ENGINE_PANEL_61444timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_61444 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65262") {
    checkdata.value.NO1ENGINE_PANEL_65262 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65262timeout);
    NO1ENGINE_PANEL_65262timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65262 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65263") {
    checkdata.value.NO1ENGINE_PANEL_65263 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65263timeout);
    NO1ENGINE_PANEL_65263timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65263 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65272") {
    checkdata.value.NO1ENGINE_PANEL_65272 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65272timeout);
    NO1ENGINE_PANEL_65272timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65272 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65271") {
    checkdata.value.NO1ENGINE_PANEL_65271 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65271timeout);
    NO1ENGINE_PANEL_65271timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65271 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65253") {
    checkdata.value.NO1ENGINE_PANEL_65253 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65253timeout);
    NO1ENGINE_PANEL_65253timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65253 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65270") {
    checkdata.value.NO1ENGINE_PANEL_65270 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65270timeout);
    NO1ENGINE_PANEL_65270timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65270 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65276") {
    checkdata.value.NO1ENGINE_PANEL_65276 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65276timeout);
    NO1ENGINE_PANEL_65276timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65276 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65360") {
    checkdata.value.NO1ENGINE_PANEL_65360 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65360timeout);
    NO1ENGINE_PANEL_65360timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65360 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_LAMP") {
    checkdata.value.NO1ENGINE_PANEL_65361_LAMP = "ok";
    clearTimeout(NO1ENGINE_PANEL_65361_LAMPtimeout);
    NO1ENGINE_PANEL_65361_LAMPtimeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65361_LAMP = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65361_STATUS") {
    checkdata.value.NO1ENGINE_PANEL_65361_STATUS = "ok";
    clearTimeout(NO1ENGINE_PANEL_65361_STATUStimeout);
    NO1ENGINE_PANEL_65361_STATUStimeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65361_STATUS = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65378") {
    checkdata.value.NO1ENGINE_PANEL_65378 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65378timeout);
    NO1ENGINE_PANEL_65378timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65378 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65376") {
    checkdata.value.NO1ENGINE_PANEL_65376 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65376timeout);
    NO1ENGINE_PANEL_65376timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65376 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.1ENGINEPANEL/NO.1ENGINE_PANEL_65379") {
    checkdata.value.NO1ENGINE_PANEL_65379 = "ok";
    clearTimeout(NO1ENGINE_PANEL_65379timeout);
    NO1ENGINE_PANEL_65379timeout = setTimeout(() => {
      checkdata.value.NO1ENGINE_PANEL_65379 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_61444") {
    checkdata.value.NO2ENGINE_PANEL_61444 = "ok";
    clearTimeout(NO2ENGINE_PANEL_61444timeout);
    NO2ENGINE_PANEL_61444timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_61444 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65262") {
    checkdata.value.NO2ENGINE_PANEL_65262 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65262timeout);
    NO2ENGINE_PANEL_65262timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65262 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65263") {
    checkdata.value.NO2ENGINE_PANEL_65263 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65263timeout);
    NO2ENGINE_PANEL_65263timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65263 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65272") {
    checkdata.value.NO2ENGINE_PANEL_65272 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65272timeout);
    NO2ENGINE_PANEL_65272timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65272 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65271") {
    checkdata.value.NO2ENGINE_PANEL_65271 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65271timeout);
    NO2ENGINE_PANEL_65271timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65271 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65253") {
    checkdata.value.NO2ENGINE_PANEL_65253 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65253timeout);
    NO2ENGINE_PANEL_65253timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65253 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65270") {
    checkdata.value.NO2ENGINE_PANEL_65270 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65270timeout);
    NO2ENGINE_PANEL_65270timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65270 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65276") {
    checkdata.value.NO2ENGINE_PANEL_65276 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65276timeout);
    NO2ENGINE_PANEL_65276timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65276 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65360") {
    checkdata.value.NO2ENGINE_PANEL_65360 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65360timeout);
    NO2ENGINE_PANEL_65360timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65360 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_LAMP") {
    checkdata.value.NO2ENGINE_PANEL_65361_LAMP = "ok";
    clearTimeout(NO2ENGINE_PANEL_65361_LAMPtimeout);
    NO2ENGINE_PANEL_65361_LAMPtimeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65361_LAMP = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65361_STATUS") {
    checkdata.value.NO2ENGINE_PANEL_65361_STATUS = "ok";
    clearTimeout(NO2ENGINE_PANEL_65361_STATUStimeout);
    NO2ENGINE_PANEL_65361_STATUStimeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65361_STATUS = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65378") {
    checkdata.value.NO2ENGINE_PANEL_65378 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65378timeout);
    NO2ENGINE_PANEL_65378timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65378 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65376") {
    checkdata.value.NO2ENGINE_PANEL_65376 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65376timeout);
    NO2ENGINE_PANEL_65376timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65376 = "no";
    }, checkTime.value);
  }
  if (headerName === "NO.2ENGINEPANEL/NO.2ENGINE_PANEL_65379") {
    checkdata.value.NO2ENGINE_PANEL_65379 = "ok";
    clearTimeout(NO2ENGINE_PANEL_65379timeout);
    NO2ENGINE_PANEL_65379timeout = setTimeout(() => {
      checkdata.value.NO2ENGINE_PANEL_65379 = "no";
    }, checkTime.value);
  }
};

const resetCheckdata = () => {
  Object.keys(checkdata.value).forEach((key) => {
    checkdata.value[key] = "no";
  });
  clearTimeout(ggaTimeout1); // 타임아웃도 초기화
};

const onlamp = (i) => {
  if (i === 0) checkdata2.value[9] = "ok";
  if (i === 1) checkdata2.value[12] = "ok";
  if (i === 2) checkdata2.value[14] = "ok";
  if (i === 3) checkdata2.value[4] = "ok";
  if (i === 4) checkdata2.value[2] = "ok";
  if (i === 5) checkdata2.value[3] = "ok";
  if (i === 6) checkdata2.value[1] = "ok";
  if (i === 7) checkdata2.value[6] = "ok";
  if (i === 8) checkdata2.value[5] = "ok";
  if (i === 9) checkdata2.value[10] = "ok";
  if (i === 10) checkdata2.value[15] = "ok";
  if (i === 11) checkdata2.value[16] = "ok";
  if (i === 12) checkdata2.value[11] = "ok";
  if (i === 13) checkdata2.value[13] = "ok";
  if (i === 14) checkdata2.value[7] = "ok";
  if (i === 15) checkdata2.value[8] = "ok";
};

const offlamp = (i) => {
  if (i === 0) checkdata2.value[9] = "no";
  if (i === 1) checkdata2.value[12] = "no";
  if (i === 2) checkdata2.value[14] = "no";
  if (i === 3) checkdata2.value[4] = "no";
  if (i === 4) checkdata2.value[2] = "no";
  if (i === 5) checkdata2.value[3] = "no";
  if (i === 6) checkdata2.value[1] = "no";
  if (i === 7) checkdata2.value[6] = "no";
  if (i === 8) checkdata2.value[5] = "no";
  if (i === 9) checkdata2.value[10] = "no";
  if (i === 10) checkdata2.value[15] = "no";
  if (i === 11) checkdata2.value[16] = "no";
  if (i === 12) checkdata2.value[11] = "no";
  if (i === 13) checkdata2.value[13] = "no";
  if (i === 14) checkdata2.value[7] = "no";
  if (i === 15) checkdata2.value[8] = "no";
  if (i === 16) {
    // i가 16인 경우 checkdata2의 값들을 전부 "no"로 변경
    for (let key in checkdata2.value) {
      checkdata2.value[key] = "no";
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

const screenWidth = ref(window.innerWidth);

const getColsValue1 = () => {
  return screenWidth.value <= 1800 ? 4 : 3;
};

const getColsValue2 = () => {
  return screenWidth.value <= 1800 ? 12 : 3;
};

const getColsValue3 = () => {
  return screenWidth.value <= 1800 ? 3 : 6;
};

const getEngineColsValue = () => {
  return screenWidth.value <= 1800 ? 12 : 6;
};

const getLampColsValue = () => {
  return screenWidth.value <= 1890 ? 12 : 6;
};

const getheightValue1 = () => {
  return screenWidth.value <= 1800 ? 27 : 17;
};

const getheightValue2 = () => {
  return screenWidth.value <= 1800
    ? 184 // 1800 이하일 경우 130 반환
    : screenWidth.value <= 1890
    ? 120 // 1800 초과이면서 1890 이하일 경우 120 반환
    : 93; // 그 외의 경우 93 반환
};

const getLampheightValue1 = () => {
  return screenWidth.value <= 1890 ? 24 : 21;
};
const getLampheightValue2 = () => {
  return screenWidth.value <= 1890 ? 25 : 21;
};
const getLampheightValueALL1 = () => {
  return screenWidth.value <= 1890 ? 24 : 21;
};
const getLampheightValueALL2 = () => {
  return screenWidth.value <= 1890 ? 25 : 21;
};

const getLampPaddingLeft = () => {
  return screenWidth.value <= 1890 ? 16 : 4;
};

const getLampPaddingTop = () => {
  return screenWidth.value <= 1890 ? 4 : 4;
};

const getLampPaddingBottom1 = () => {
  return screenWidth.value <= 1890 ? 0 : 4;
};

const getLampPaddingBottom2 = () => {
  return screenWidth.value <= 1890 ? 15 : 4;
};

const getheadingPaddingTop = () => {
  return screenWidth.value <= 1800 ? 5 : 0;
};

const getOtherPaddingTop = () => {
  return screenWidth.value <= 1800 ? 4 : 20;
};

const getPaddingLeftValue = () => {
  return screenWidth.value <= 1800 ? 16 : 4;
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

// 컴포넌트가 마운트될 때 이벤트 리스너 등록
onMounted(() => {
  window.addEventListener("resize", handleResize);
  // 초기에도 업데이트 수행
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* 비디오가 차지하는 높이 조절 */
}

.video-container video {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}
</style>
