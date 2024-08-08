<template>
  <v-card
    :style="{ backgroundColor: themeColor }"
    class="d-flex justify-center align-center"
  >
    <v-row>
      <!-- 왼쪽 큰 박스 -->
      <v-col cols="10" style="">
        <!-- 엔진 제외 -->
        <v-row>
          <v-col cols="5">
            <v-row>
              <!-- (최) 지도 뷰 -->
              <v-col
                no-gutters
                :style="{
                  padding: '0px',
                  paddingLeft: '16px',
                  paddingTop: '20px',
                }"
              >
                <v-sheet style="height: 43vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <!-- <OSMap
                        :lat="parseFloat(latitude)"
                        :lon="parseFloat(longitude)"
                        :state="mapstart"
                      /> -->
                    </v-card-item>
                  </v-card>
                </v-sheet>
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
                    height: `12vh`,
                    backgroundColor: themeColor,
                    paddingTop: `${getLampPaddingTop()}px`,
                    paddingLeft: `16px`,
                    paddingBottom: `0px`,
                    display: 'flex',
                  }"
                >
                  <v-card style="flex: 1">
                    <v-card-item>
                      <v-row
                        class="d-flex justify-center align-center text-center"
                      >
                        <v-col class="weather-item" cols="12" sm="3">
                          <v-icon class="mr-2" size="36"
                            >mdi-thermometer</v-icon
                          >
                          <div class="weather-label">온도</div>
                          <div class="weather-value">{{ vts_tem }}°C</div>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="weather-item" cols="12" sm="3">
                          <v-icon class="mr-2" size="36"
                            >mdi-water-percent</v-icon
                          >
                          <div class="weather-label">습도</div>
                          <div class="weather-value">{{ vts_hum }}%</div>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="weather-item" cols="12" sm="3">
                          <v-icon class="mr-2" size="36"
                            >mdi-weather-windy</v-icon
                          >
                          <div class="weather-label">바람</div>
                          <div class="weather-value">
                            {{ vts_wind_angle }} {{ vts_wind_speed }} m/s
                          </div>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col class="weather-item" cols="12" sm="3">
                          <v-icon class="mr-2" size="36">mdi-binoculars</v-icon>
                          <div class="weather-label">가시거리</div>
                          <div class="weather-value">{{ vts_visible }} m</div>
                        </v-col>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="7">
            <v-row>
              <!-- (최) 지도 뷰 -->
              <v-col
                no-gutters
                :style="{
                  padding: '0px',
                  paddingLeft: '4px',
                  paddingTop: '20px',
                }"
              >
                <v-sheet style="height: 55vh; display: flex">
                  <v-card style="flex: 1">
                    <v-card-item style="padding: 0px; padding-top: 1vh">
                      <v-row>
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
                            <!-- <EchartGaugeVolt
                              :name="'SpeedN'"
                              :unit="'kt'"
                              :max_value="standardItems[0].maxValue"
                              :min_value="standardItems[0].minValue"
                              :value="parseFloat(speed)"
                            /> -->
                            <EchartGauge
                              :name="'SpeedN'"
                              :left="'center'"
                              :unit="'kt'"
                              :center_y="'40%'"
                              :splitNumber="5"
                              :max_value="standardItems[0].maxValue"
                              :min_value="standardItems[0].minValue"
                              :value="parseFloat(speed)"
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
                        >
                          <v-sheet
                            :style="{
                              height: `${getheightValue1()}vh`,
                              display: flex,
                            }"
                          >
                            <EchartGauge
                              :name="'Anemometer Speed'"
                              :left="'center'"
                              :unit="'m/s'"
                              :center_y="'40%'"
                              :splitNumber="5"
                              :max_value="standardItems[1].maxValue"
                              :min_value="standardItems[1].minValue"
                              :value="parseFloat(windspeed)"
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
                            />
                          </v-sheet>
                        </v-col>
                      </v-row>
                      <v-row>
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
                            <!-- <video ref="video" width="10%" height="100" controls muted="muted"></video> -->
                            <!-- <video ref="video" width="350" controls muted="muted"></video> -->
                            <EchartStarPort
                              :starport="parseFloat(port)"
                              :name="'PortRudder'"
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
                        >
                          <v-sheet
                            :style="{
                              height: `${getheightValue1()}vh`,
                              display: flex,
                            }"
                          >
                            <EchartStarPort
                              :starport="parseFloat(star)"
                              :name="'StarboardRudder'"
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
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- 엔진 -->
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
                        :splitNumber="10"
                        :center_y="'50%'"
                        :max_value="standardItems[2].maxValue"
                        :min_value="standardItems[2].minValue"
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
                            :max_value="standardItems[3].maxValue"
                            :min_value="standardItems[3].minValue"
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
                            :max_value="standardItems[4].maxValue"
                            :min_value="standardItems[4].minValue"
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
                            :max_value="standardItems[5].maxValue"
                            :min_value="standardItems[5].minValue"
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
                            :max_value="standardItems[6].maxValue"
                            :min_value="standardItems[6].minValue"
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
                        :splitNumber="10"
                        :center_y="'50%'"
                        :max_value="standardItems[2].maxValue"
                        :min_value="standardItems[2].minValue"
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
                            :max_value="standardItems[3].maxValue"
                            :min_value="standardItems[3].minValue"
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
                            :max_value="standardItems[4].maxValue"
                            :min_value="standardItems[4].minValue"
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
                            :max_value="standardItems[5].maxValue"
                            :min_value="standardItems[5].minValue"
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
                            :max_value="standardItems[6].maxValue"
                            :min_value="standardItems[6].minValue"
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
          <v-card
            :style="{ flex: 1, overflow: 'auto' }"
            class="scrollable-card"
          >
            <v-card-item style="padding: 0px">
              <!-- <SocketChecking
                :checkdata="checkdata"
                :height="getheightValue2()"
              /> -->
              <v-sheet
                :style="{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'auto',
                }"
              >
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      variant="accordion"
                      expand-icon="mdi-menu-down"
                      class="custom-title"
                    >
                      Ship Information
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-expansion-panels variant="accordion" multiple>
                        <v-expansion-panel
                          v-for="(group, index) in ShipGroups"
                          :key="index"
                        >
                          <v-expansion-panel-title>
                            {{ group.title }}
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <div
                              :class="
                                group.singleColumn
                                  ? 'single-column'
                                  : 'double-column'
                              "
                              style="
                                height: auto;
                                display: flex;
                                padding-left: 0;
                                padding-right: 0;
                              "
                            >
                              <v-sheet
                                v-if="group.singleColumn"
                                style="flex: 0 0 100%; box-sizing: border-box"
                              >
                                <v-sheet
                                  v-for="item in group.items"
                                  :key="item"
                                  style="width: 100%; box-sizing: border-box"
                                >
                                  <v-icon
                                    :color="getIconColor(item)"
                                    :icon="getIconIcon(item)"
                                    size="small"
                                    style="margin-right: 8px"
                                  ></v-icon>
                                  <span style="font-size: 12px">{{
                                    item
                                  }}</span>
                                  <br /><br />
                                </v-sheet>
                              </v-sheet>
                              <template v-else>
                                <v-sheet style="flex: 0 0 50%">
                                  <v-sheet
                                    v-for="item in group.items.slice(
                                      0,
                                      Math.ceil(group.items.length / 2)
                                    )"
                                    :key="item"
                                  >
                                    <v-icon
                                      :color="getIconColor(item)"
                                      :icon="getIconIcon(item)"
                                      size="small"
                                    ></v-icon>
                                    <span style="font-size: 14px"
                                      >&nbsp;&nbsp;&nbsp;{{ item }}</span
                                    >
                                    <br /><br />
                                  </v-sheet>
                                </v-sheet>
                                <v-sheet style="flex: 0 0 50%">
                                  <v-sheet
                                    v-for="item in group.items.slice(
                                      Math.ceil(group.items.length / 2)
                                    )"
                                    :key="item"
                                  >
                                    <v-icon
                                      :color="getIconColor(item)"
                                      :icon="getIconIcon(item)"
                                      size="small"
                                    ></v-icon>
                                    <span style="font-size: 14px"
                                      >&nbsp;&nbsp;&nbsp;{{ item }}</span
                                    >
                                    <br /><br />
                                  </v-sheet>
                                </v-sheet>
                              </template>
                            </div>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      variant="accordion"
                      expand-icon="mdi-menu-down"
                      class="custom-title"
                    >
                      Kass Infomation
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-expansion-panels variant="accordion" multiple>
                        <v-expansion-panel
                          v-for="(group, index) in KassGroups"
                          :key="index"
                        >
                          <v-expansion-panel-title>
                            {{ group.title }}
                          </v-expansion-panel-title>
                          <v-expansion-panel-text>
                            <div
                              :class="
                                group.singleColumn
                                  ? 'single-column'
                                  : 'double-column'
                              "
                              style="
                                height: auto;
                                display: flex;
                                padding-left: 0;
                                padding-right: 0;
                              "
                            >
                              <v-sheet
                                style="flex: 0 0 100%; box-sizing: border-box"
                              >
                                <v-sheet
                                  v-for="item in group.items"
                                  :key="item"
                                  style="width: 100%; box-sizing: border-box"
                                >
                                  <v-icon
                                    :color="getIconColor(item)"
                                    :icon="getIconIcon(item)"
                                    size="small"
                                    style="margin-right: 8px"
                                  ></v-icon>
                                  <span style="font-size: 12px">{{
                                    item
                                  }}</span>
                                  <br /><br />
                                </v-sheet>
                              </v-sheet>
                            </div>
                          </v-expansion-panel-text>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      variant="accordion"
                      expand-icon="mdi-menu-down"
                      class="custom-title"
                    >
                      System Infomation
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div v-for="(group, index) in SystemGroups" :key="index">
                        <v-sheet style="flex: 0 0 100%">
                          <v-sheet
                            v-for="item in group.items"
                            :key="item"
                            style="width: 100%"
                          >
                            <v-icon
                              :color="getIconColor(item)"
                              :icon="getIconIcon(item)"
                              size="small"
                              style="margin-right: 8px"
                            ></v-icon>
                            <span style="font-size: 12px">{{ item }}</span>
                            <br /><br />
                          </v-sheet>
                        </v-sheet>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      variant="accordion"
                      expand-icon="mdi-menu-down"
                      class="custom-title"
                    >
                      Control Information
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div v-for="(group, index) in ControlGroups" :key="index">
                        <v-sheet style="flex: 0 0 100%">
                          <v-sheet
                            v-for="item in group.items"
                            :key="item"
                            style="width: 100%"
                          >
                            <v-icon
                              :color="getIconColor(item)"
                              :icon="getIconIcon(item)"
                              size="small"
                              style="margin-right: 8px"
                            ></v-icon>
                            <span style="font-size: 12px">{{ item }}</span>
                            <br /><br />
                          </v-sheet>
                        </v-sheet>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      variant="accordion"
                      expand-icon="mdi-menu-down"
                      class="custom-title"
                    >
                      VTS Information
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div v-for="(group, index) in VtsGroups" :key="index">
                        <v-sheet style="flex: 0 0 100%">
                          <v-sheet
                            v-for="item in group.items"
                            :key="item"
                            style="width: 100%"
                          >
                            <v-icon
                              :color="getIconColor(item)"
                              :icon="getIconIcon(item)"
                              size="small"
                              style="margin-right: 8px"
                            ></v-icon>
                            <span style="font-size: 12px">{{ item }}</span>
                            <br /><br />
                          </v-sheet>
                        </v-sheet>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-sheet>
            </v-card-item>
          </v-card>
        </v-sheet>
        <v-sheet
          :style="{
            backgroundColor: themeColor,
            paddingTop: '0px',
            paddingLeft: '0px',
            paddingRight: '9px',
            height: `${5}vh`,
            display: 'flex',
          }"
        >
          <v-btn style="width: 100%; height: 90%" @click="openLamp()"
            >Engine Lamp</v-btn
          >
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
  <!-- CCTV 화면 -->
  <v-dialog v-model="cctvDialog" persistent max-width="1200">
    <v-card class="cctv-card">
      <v-toolbar flat dark color="#eeeeee">
        <v-toolbar-title>CCTV Monitoring</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeCCTV()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="cctv-card-text">
        <v-container>
          <v-row class="video-container">
            <video ref="videoD" controls muted="muted" class="cctv-video"></video>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="lampDialog" persistent max-width="1335">
    <v-card outlined class="pa-5">
      <v-card-title>Engine Lamp</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="padding-bottom: 0px;">
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12">
              <v-subheader>Engine1 Lamp</v-subheader>
              <v-sheet class="engine-lamp-container">
                <v-sheet
                  v-for="item in engine1Data"
                  :key="item.key"
                  class="engine-lamp-item"
                >
                  <v-icon
                    :color="getColor1(item.key)"
                    :icon="'mdi-alarm-light'"
                    size="small"
                    class="mr-2"
                  ></v-icon>
                  <span class="engine-lamp-text">{{ item.name }}</span>
                </v-sheet>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-subheader>Engine2 Lamp</v-subheader>
              <v-sheet class="engine-lamp-container">
                <v-sheet
                  v-for="item in engine2Data"
                  :key="item.key"
                  class="engine-lamp-item"
                >
                  <v-icon
                    :color="getColor2(item.key)"
                    :icon="'mdi-alarm-light'"
                    size="small"
                    class="mr-2"
                  ></v-icon>
                  <span class="engine-lamp-text">{{ item.name }}</span>
                </v-sheet>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
       <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeLamp()"
          >닫기</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
// cctv
import Hls from "hls.js";
// map
import OSMap from "../components/OSMap.vue";
import SocketChecking from "../components/SocketChecking.vue";
import EngineLampChecking from "../components/EngineLampChecking.vue";
import EchartHeading from "../components/EchartGraph/EchartHeading.vue";
import BridgeHeading from "../components/OpenBridge/HeadingGraph.vue";
import BridgeRudder from "../components/OpenBridge/RudderGraph.vue";
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartGaugeVolt from "../components/EchartGraph/EchartGaugeVolt.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";
import { readLampTimeData, cctvUrl, readRealtimeMinMax } from "../api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";

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

const ws = new WebSocket("ws://bdpback.ias.xinnos.com/ws/shipinfo");

ws.onopen = function (event) {
  console.log("Connection opened");
};

ws.onmessage = function (event) {
  console.log("Message received: " + event.data);
  try {
    const parsedMessage = JSON.parse(event.data);
    let headerName = parsedMessage.Package.Header.Author;
    // headerNameC.value = parsedMessage.Package.Header.Author;
    // checkdata.value[variableName] = parsedMessage.Package.Header.TimeSpan.End;
    // console.log(headerName);
    // console.log(parsedMessage);
    checkingData(headerName);
    // 'Package' 내의 데이터 중 "DataSet"의 첫 번째 항목 추출
    // 위치

    // 관제 기상정보
    if (headerName === "WeatherInfo") {
      vts_tem.value =
        Number(
          parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
            .Value[5]
        ) / 10;
      vts_hum.value =
        Number(
          parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
            .Value[6]
        ) / 10;
      const angle = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[3]
      );
      vts_wind_angle.value = getWindDirection(angle);
      console.log(angle); // 방향 값을 콘솔에 출력
      console.log(vts_wind_angle.value); // 방향 값을 콘솔에 출력
      vts_wind_speed.value =
        Number(
          parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
            .Value[2]
        ) / 10;
      vts_visible.value =
        Number(
          parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
            .Value[4]
        ) / 10;
      clearTimeout(vtsTimeout); // 이전 타임아웃을 취소
      vtsTimeout = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        vts_tem.value = null;
        vts_hum.value = null;
        vts_wind_angle.value = null;
        vts_wind_speed.value = null;
        vts_visible.value = null;
      }, checkTime.value * 10);
    }

    if (headerName === "DGPS/GGA") {
      latitude.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[2]
      );
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
      );
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
        star.value = 0;
      }, checkTime.value);
      port.value = Number(
        parsedMessage.Package.TimeSeriesData[0].TabularData[0].DataSet[0]
          .Value[3]
      ).toFixed(2);
      clearTimeout(RSAtimeout2); // 이전 타임아웃을 취소
      RSAtimeout2 = setTimeout(() => {
        // 3초 이상 데이터가 오지 않으면 "no"로 변경
        port.value = 0;
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

const { themeColor } = themeConfig;

const tokenid = ref(sessionStorage.getItem("token") || "");

const checkTime = ref();

// -------------------- Min,Max ------------------------ //

// -------------------- CCTV --------------------------- //
const videoD = ref(null);

const cctvDialog = ref(false);
let hls1; // Hls 인스턴스를 전역 변수로 선언

const openCCTV = () => {
  if (sessionStorage.getItem("isAdmin") != "ADMIN") {
    alert("ADMIN 이상만 사용 가능합니다.");
    return;
  }
  cctvDialog.value = true;
  setCCTV();
};

const lampDialog = ref(false);
const openLamp = () => {
  lampDialog.value = true;
};

const closeLamp = () => {
  lampDialog.value = false;
};

const setCCTV = () => {
  const url = cctvUrl;
  nextTick(() => {
    hls1 = new Hls();
    hls1.config.xhrSetup = (xhr) => {
      xhr.setRequestHeader("Authorization", `Bearer ${tokenid.value}`);
    };
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
  if (hls1) {
    hls1.detachMedia(); // 비디오 요소 연결 해제
    hls1.stopLoad(); // 로드 중단
    hls1.destroy(); // Hls 인스턴스 파기
    hls1 = null; // 변수 초기화
  }
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

  SITUATIONAL: "no",
  VIRTUALNAV: "no",
  SITUATIONALAWARENESS: "no",
  ROUTEDECISION: "no",
  MARINEGATEWAY: "no",
  WAYPOINT: "no",
  SAS: "no",
  ME1: "no",
  ME2: "no",
  NO_1ENGINE_PANEL_61444: "no",
  NO_1ENGINE_PANEL_65262: "no",
  NO_1ENGINE_PANEL_65263: "no",
  NO_1ENGINE_PANEL_65271: "no",
  NO_1ENGINE_PANEL_65270: "no",
  NO_1ENGINE_PANEL_65360: "no",
  NO_1ENGINE_PANEL_65361_LAMP: "no",
  NO_1ENGINE_PANEL_65272: "no",
  NO_1ENGINE_PANEL_65253: "no",
  NO_1ENGINE_PANEL_65276: "no",
  NO_2ENGINE_PANEL_61444: "no",
  NO_2ENGINE_PANEL_65262: "no",
  NO_2ENGINE_PANEL_65263: "no",
  NO_2ENGINE_PANEL_65271: "no",
  NO_2ENGINE_PANEL_65270: "no",
  NO_2ENGINE_PANEL_65360: "no",
  NO_2ENGINE_PANEL_65361_LAMP: "no",
  NO_2ENGINE_PANEL_65272: "no",
  NO_2ENGINE_PANEL_65253: "no",
  NO_2ENGINE_PANEL_65276: "no",
  NO_1ENGINE_PANEL_65361_STATUS: "no",
  NO_1ENGINE_PANEL_65378: "no",
  NO_1ENGINE_PANEL_65376: "no",
  NO_1ENGINE_PANEL_65379: "no",
  NO_2ENGINE_PANEL_65361_STATUS: "no",
  NO_2ENGINE_PANEL_65378: "no",
  NO_2ENGINE_PANEL_65376: "no",
  NO_2ENGINE_PANEL_65379: "no",
  SUBSCRIBELIST: "no",
  CONNECTSTATE: "no",
  SYSTEMSTATE: "no",
  ALARMINFO: "no",
  MODEINFO: "no",
  COM: "no",
  ENGINECONTROL: "no",
  RUDDERCONTROL: "no",
  SHORE_MODE_REQUEST: "no",
  SHORE_ENGINE_CONTROL: "no",
  SHORE_RUDDER_CONTROL: "no",
  REQUESTCOMMAND_R: "no",
  RESPONSECOMMAND_R: "no",
  REQUESTCOMMAND_E: "no",
  RESPONSECOMMAND_E: "no",
  REQUESTCOMMAND_M: "no",
  RESPONSECOMMAND_M: "no",
  Object_Info: "no",
  Weather_Info: "no",
  AIS_vts: "no",
});

const ShipGroups = ref([
  {
    title: "DGPS",
    items: ["GLL", "GGA", "RMC", "VTG", "ZDA", "GSV", "GSA"],
    singleColumn: false,
  },
  {
    title: "GYRO",
    items: ["HDT", "ROT"],
    singleColumn: false,
  },
  {
    title: "ANEMOMETER",
    items: ["MWV"],
    singleColumn: false,
  },
  {
    title: "RADAR",
    items: ["RSCREEN"],
    singleColumn: true,
  },
  {
    title: "AIS",
    items: ["VDM", "VDO"],
    singleColumn: false,
  },
  {
    title: "ECDIS",
    items: ["ROUTEINFO", "WAYPOINTS", "RTZ", "ESCREEN"],
    singleColumn: true,
  },
  {
    title: "AUTOPILOT",
    items: ["RSA", "HTD"],
    singleColumn: false,
  },
  {
    title: "SPEEDLOG",
    items: ["VBW", "VHW", "VLW"],
    singleColumn: false,
  },
  {
    title: "CANTHROTTLE",
    items: ["CAN_ONLINE_STATE", "ENGINE_RPM", "RUDDER", "RUDDER_SCALE"],
    singleColumn: true,
  },
  {
    title: "AUTOPILOTCONTACT",
    items: ["AUTOPILOTCONTACT"],
    singleColumn: true,
  },
  {
    title: "NO.1ENGINEPANEL",
    items: [
      "NO1ENGINE_PANEL_61444",
      "NO1ENGINE_PANEL_65262",
      "NO1ENGINE_PANEL_65263",
      "NO1ENGINE_PANEL_65272",
      "NO1ENGINE_PANEL_65271",
      "NO1ENGINE_PANEL_65253",
      "NO1ENGINE_PANEL_65270",
      "NO1ENGINE_PANEL_65276",
      "NO1ENGINE_PANEL_65360",
      "NO1ENGINE_PANEL_65361_LAMP",
      "NO1ENGINE_PANEL_65361_STATUS",
      "NO1ENGINE_PANEL_65378",
      "NO1ENGINE_PANEL_65376",
      "NO1ENGINE_PANEL_65379",
    ],
    singleColumn: true,
  },
  {
    title: "NO.2ENGINEPANEL",
    items: [
      "NO2ENGINE_PANEL_61444",
      "NO2ENGINE_PANEL_65262",
      "NO2ENGINE_PANEL_65263",
      "NO2ENGINE_PANEL_65272",
      "NO2ENGINE_PANEL_65271",
      "NO2ENGINE_PANEL_65253",
      "NO2ENGINE_PANEL_65270",
      "NO2ENGINE_PANEL_65276",
      "NO2ENGINE_PANEL_65360",
      "NO2ENGINE_PANEL_65361_LAMP",
      "NO2ENGINE_PANEL_65361_STATUS",
      "NO2ENGINE_PANEL_65378",
      "NO2ENGINE_PANEL_65376",
      "NO2ENGINE_PANEL_65379",
    ],
    singleColumn: true,
  },
]);

const KassGroups = ref([
  {
    title: "MTIE1ISA",
    items: ["SITUATIONAL"],
    singleColumn: true,
  },
  {
    title: "MTIE5VDGS",
    items: ["VIRTUALNAV"],
    singleColumn: true,
  },
  {
    title: "MTIE5DBS",
    items: ["SITUATIONALAWARENESS"],
    singleColumn: true,
  },
  {
    title: "MOF1ANS",
    items: ["ROUTEDECISION"],
    singleColumn: true,
  },
  {
    title: "MOF2SYNC",
    items: ["MARINEGATEWAY"],
    singleColumn: true,
  },
  {
    title: "MOF1GNW",
    items: ["WAYPOINT"],
    singleColumn: true,
  },
  {
    title: "MTIE5SAS",
    items: ["SAS"],
    singleColumn: true,
  },
  {
    title: "MTIE4.XINNOS_STAS",
    items: ["ME1", "ME2"],
    singleColumn: true,
  },
  {
    title: "MTIE4XINNOS_VDGS",
    items: [
      "V_NO1ENGINE_PANEL_61444",
      "V_NO1ENGINE_PANEL_65262",
      "V_NO1ENGINE_PANEL_65263",
      "V_NO1ENGINE_PANEL_65271",
      "V_NO1ENGINE_PANEL_65270",
      "V_NO1ENGINE_PANEL_65360",
      "V_NO1ENGINE_PANEL_65361_LAMP",
      "V_NO1ENGINE_PANEL_65272",
      "V_NO1ENGINE_PANEL_65253",
      "V_NO1ENGINE_PANEL_65276",
      "V_NO2ENGINE_PANEL_61444",
      "V_NO2ENGINE_PANEL_65262",
      "V_NO2ENGINE_PANEL_65263",
      "V_NO2ENGINE_PANEL_65271",
      "V_NO2ENGINE_PANEL_65270",
      "V_NO2ENGINE_PANEL_65360",
      "V_NO2ENGINE_PANEL_65361_LAMP",
      "V_NO2ENGINE_PANEL_65272",
      "V_NO2ENGINE_PANEL_65253",
      "V_NO2ENGINE_PANEL_65276",
      "V_NO1ENGINE_PANEL_65361_STATUS",
      "V_NO1ENGINE_PANEL_65378",
      "V_NO1ENGINE_PANEL_65376",
      "V_NO1ENGINE_PANEL_65379",
      "V_NO2ENGINE_PANEL_65361_STATUS",
      "V_NO2ENGINE_PANEL_65378",
      "V_NO2ENGINE_PANEL_65376",
      "V_NO2ENGINE_PANEL_65379",
    ],
    singleColumn: true,
  },
]);

const SystemGroups = ref([
  {
    title: "MANAGEMENT",
    items: [
      "SUBSCRIBELIST",
      "CONNECTSTATE",
      "SYSTEMSTATE",
      "ALARMINFO",
      "MODEINFO",
      "COM",
      "ENGINECONTROL",
      "RUDDERCONTROL",
      "SHORE_MODE_REQUEST",
      "SHORE_ENGINE_CONTROL",
      "SHORE_RUDDER_CONTROL",
    ],
    singleColumn: true,
  },
]);

const ControlGroups = ref([
  {
    title: "Object Info",
    items: ["REQUESTCOMMAND_R", "RESPONSECOMMAND_R"],
    singleColumn: true,
  },
  {
    title: "ENGINE",
    items: ["REQUESTCOMMAND_E", "RESPONSECOMMAND_E"],
    singleColumn: true,
  },
  {
    title: "MODE",
    items: ["REQUESTCOMMAND_M", "RESPONSECOMMAND_M"],
    singleColumn: true,
  },
]);

const VtsGroups = ref([
  {
    title: "vts",
    items: ["Object_Info", "Weather_Info", "AIS_vts"],
    singleColumn: true,
  },
]);

const getIconColor = (key) =>
  checkdata.value[key] === "ok" ? "success" : "error";
const getIconIcon = (key) =>
  checkdata.value[key] === "ok" ? "mdi-check-circle" : "mdi-alert-circle";

const getColor1 = (key) => (checkdata1.value[key] === "ok" ? "error" : "#bbbbbb");
const getColor2 = (key) => (checkdata2.value[key] === "ok" ? "error" : "#bbbbbb");

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

const engine1Data = [
  { key: 1, name: " Low Volt" },
  { key: 2, name: " Fuel Leak" },
  { key: 3, name: " Over Speed" },
  { key: 4, name: " Battery Charge" },
  { key: 5, name: " Low Fuel Level" },
  { key: 6, name: " Low Water Level" },
  { key: 7, name: " Engine Shutdown" },
  { key: 8, name: " Low Engine Speed" },
  { key: 9, name: " Water Temperature" },
  { key: 10, name: " Engine Oil Over Heat" },
  { key: 11, name: " Low Boost Air Pressure" },
  { key: 12, name: " Low Engine Oil Pressure" },
  { key: 13, name: " High Boost Air Pressure" },
  { key: 14, name: " Low Gearbox Oil Pressure" },
  { key: 15, name: " Main connector Removed" },
  { key: 16, name: " High Exhaust Gas Temperature" },
];

const engine2Data = [
  { key: 1, name: " Low Volt" },
  { key: 2, name: " Fuel Leak" },
  { key: 3, name: " Over Speed" },
  { key: 4, name: " Battery Charge" },
  { key: 5, name: " Low Fuel Level" },
  { key: 6, name: " Low Water Level" },
  { key: 7, name: " Engine Shutdown" },
  { key: 8, name: " Low Engine Speed" },
  { key: 9, name: " Water Temperature" },
  { key: 10, name: " Engine Oil Over Heat" },
  { key: 11, name: " Low Boost Air Pressure" },
  { key: 12, name: " Low Engine Oil Pressure" },
  { key: 13, name: " High Boost Air Pressure" },
  { key: 14, name: " Low Gearbox Oil Pressure" },
  { key: 15, name: " Main connector Removed" },
  { key: 16, name: " High Exhaust Gas Temperature" },
];

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

const vts_tem = ref();
const vts_hum = ref();
const vts_wind_angle = ref();
const vts_wind_speed = ref();
const vts_visible = ref();

const getWindDirection = (angle) => {
  if ((angle >= 0 && angle < 225) || (angle >= 3375 && angle <= 3600)) {
    return "북";
  } else if (angle >= 225 && angle < 675) {
    return "북동";
  } else if (angle >= 675 && angle < 1125) {
    return "동";
  } else if (angle >= 1125 && angle < 1575) {
    return "남동 ";
  } else if (angle >= 1575 && angle < 2025) {
    return "남";
  } else if (angle >= 2025 && angle < 2475) {
    return "남서";
  } else if (angle >= 2475 && angle < 2925) {
    return "서";
  } else if (angle >= 2925 && angle < 3375) {
    return "북서";
  } else {
    return "알 수 없음"; // 예외 처리
  }
};

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
let timeouts = {
  GLL: null,
  GGA: null,
  RMC: null,
  VTG: null,
  ZDA: null,
  DTM: null,
  GSV: null,
  GSA: null,
  THS: null,
  HDT: null,
  ROT: null,
  MWV: null,
  MWD: null,
  VWR: null,
  MTW: null,
  VWT: null,
  TTM: null,
  TLL: null,
  RSCREEN: null,
  VDM: null,
  VDO: null,
  ROUTEINFO: null,
  WAYPOINTS: null,
  RTZ: null,
  ESCREEN: null,
  RSA: null,
  MODE: null,
  HTD: null,
  VBW: null,
  VHW: null,
  VLW: null,
  CAN_ONLINE_STATE: null,
  ENGINE_RPM: null,
  RUDDER: null,
  RUDDER_SCALE: null,
  AUTOPILOTCONTACT: null,
  NO1ENGINE_PANEL_61444: null,
  NO1ENGINE_PANEL_65262: null,
  NO1ENGINE_PANEL_65263: null,
  NO1ENGINE_PANEL_65272: null,
  NO1ENGINE_PANEL_65271: null,
  NO1ENGINE_PANEL_65253: null,
  NO1ENGINE_PANEL_65270: null,
  NO1ENGINE_PANEL_65276: null,
  NO1ENGINE_PANEL_65360: null,
  NO1ENGINE_PANEL_65361_LAMP: null,
  NO1ENGINE_PANEL_65361_STATUS: null,
  NO1ENGINE_PANEL_65378: null,
  NO1ENGINE_PANEL_65376: null,
  NO1ENGINE_PANEL_65379: null,
  NO2ENGINE_PANEL_61444: null,
  NO2ENGINE_PANEL_65262: null,
  NO2ENGINE_PANEL_65263: null,
  NO2ENGINE_PANEL_65272: null,
  NO2ENGINE_PANEL_65271: null,
  NO2ENGINE_PANEL_65253: null,
  NO2ENGINE_PANEL_65270: null,
  NO2ENGINE_PANEL_65276: null,
  NO2ENGINE_PANEL_65360: null,
  NO2ENGINE_PANEL_65361_LAMP: null,
  NO2ENGINE_PANEL_65361_STATUS: null,
  NO2ENGINE_PANEL_65378: null,
  NO2ENGINE_PANEL_65376: null,
  NO2ENGINE_PANEL_65379: null,

  SITUATIONAL: null,
  VIRTUALNAV: null,
  SITUATIONALAWARENESS: null,
  ROUTEDECISION: null,
  MARINEGATEWAY: null,
  WAYPOINT: null,
  SAS: null,
  ME1: null,
  ME2: null,
  V_NO1ENGINE_PANEL_61444: null,
  V_NO1ENGINE_PANEL_65262: null,
  V_NO1ENGINE_PANEL_65263: null,
  V_NO1ENGINE_PANEL_65271: null,
  V_NO1ENGINE_PANEL_65270: null,
  V_NO1ENGINE_PANEL_65360: null,
  V_NO1ENGINE_PANEL_65361_LAMP: null,
  V_NO1ENGINE_PANEL_65272: null,
  V_NO1ENGINE_PANEL_65253: null,
  V_NO1ENGINE_PANEL_65276: null,
  V_NO2ENGINE_PANEL_61444: null,
  V_NO2ENGINE_PANEL_65262: null,
  V_NO2ENGINE_PANEL_65263: null,
  V_NO2ENGINE_PANEL_65271: null,
  V_NO2ENGINE_PANEL_65270: null,
  V_NO2ENGINE_PANEL_65360: null,
  V_NO2ENGINE_PANEL_65361_LAMP: null,
  V_NO2ENGINE_PANEL_65272: null,
  V_NO2ENGINE_PANEL_65253: null,
  V_NO2ENGINE_PANEL_65276: null,
  V_NO1ENGINE_PANEL_65361_STATUS: null,
  V_NO1ENGINE_PANEL_65378: null,
  V_NO1ENGINE_PANEL_65376: null,
  V_NO1ENGINE_PANEL_65379: null,
  V_NO2ENGINE_PANEL_65361_STATUS: null,
  V_NO2ENGINE_PANEL_65378: null,
  V_NO2ENGINE_PANEL_65376: null,
  V_NO2ENGINE_PANEL_65379: null,
  SUBSCRIBELIST: null,
  CONNECTSTATE: null,
  SYSTEMSTATE: null,
  ALARMINFO: null,
  MODEINFO: null,
  COM: null,
  ENGINECONTROL: null,
  RUDDERCONTROL: null,
  SHORE_MODE_REQUEST: null,
  SHORE_ENGINE_CONTROL: null,
  SHORE_RUDDER_CONTROL: null,
  REQUESTCOMMAND_R: null,
  RESPONSECOMMAND_R: null,
  REQUESTCOMMAND_E: null,
  RESPONSECOMMAND_E: null,
  REQUESTCOMMAND_M: null,
  RESPONSECOMMAND_M: null,
};
let vtsTimeout = null;
let ggaTimeout1 = null;
let GGAtimeout1 = null;
let GGAtimeout2 = null;
let HDTtimeout1 = null;
let MWVtimeout1 = null;
let MWVtimeout2 = null;
let RSAtimeout1 = null;
let RSAtimeout2 = null;
let VHWtimeout1 = null;
let NO1ENGINE_PANEL_61444timeout1 = null;
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

const checkingData = (headerName) => {
  const variable = getVariableName(headerName);
  if (variable) {
    checkdata.value[variable] = "ok";
    clearTimeout(timeouts[variable]);
    timeouts[variable] = setTimeout(() => {
      checkdata.value[variable] = "no";
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

    "CANTHROTTLE/CAN ONLINE STATE": "CAN_ONLINE_STATE",
    "CANTHROTTLE/ENGINE RPM": "ENGINE_RPM",
    "CANTHROTTLE/RUDDER": "RUDDER",
    "CANTHROTTLE/RUDDER SCALE": "RUDDER_SCALE",

    "AUTOPILOTCONTACT/AUTOPILOTCONTACT": "AUTOPILOTCONTACT",

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

    "MTIE1ISA/SITUATIONAL": "SITUATIONAL",
    "MTIE5VDGS/VIRTUALNAV": "VIRTUALNAV",
    "MTIE5DBS/SITUATIONALAWARENESS": "SITUATIONALAWARENESS",
    "MOF1ANS/ROUTEDECISION": "ROUTEDECISION",
    "MOF2SYNC/MARINEGATEWAY": "MARINEGATEWAY",
    "MOF1GNW/WAYPOINT": "WAYPOINT",
    "MTIE5SAS/SAS": "SAS",
    "MTIE4.XINNOS_STAS/ME1": "ME1",
    "MTIE4.XINNOS_STAS/ME2": "ME2",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_61444": "V_NO1ENGINE_PANEL_61444",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65262": "V_NO1ENGINE_PANEL_65262",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65263": "V_NO1ENGINE_PANEL_65263",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65271": "V_NO1ENGINE_PANEL_65271",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65270": "V_NO1ENGINE_PANEL_65270",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65360": "V_NO1ENGINE_PANEL_65360",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_LAMP":
      "V_NO1ENGINE_PANEL_65361_LAMP",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65272": "V_NO1ENGINE_PANEL_65272",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65253": "V_NO1ENGINE_PANEL_65253",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65276": "V_NO1ENGINE_PANEL_65276",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_61444": "V_NO2ENGINE_PANEL_61444",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65262": "V_NO2ENGINE_PANEL_65262",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65263": "V_NO2ENGINE_PANEL_65263",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65271": "V_NO2ENGINE_PANEL_65271",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65270": "V_NO2ENGINE_PANEL_65270",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65360": "V_NO2ENGINE_PANEL_65360",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_LAMP":
      "V_NO2ENGINE_PANEL_65361_LAMP",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65272": "V_NO2ENGINE_PANEL_65272",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65253": "V_NO2ENGINE_PANEL_65253",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65276": "V_NO2ENGINE_PANEL_65276",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65361_STATUS":
      "V_NO1ENGINE_PANEL_65361_STATUS",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65378": "V_NO1ENGINE_PANEL_65378",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65376": "V_NO1ENGINE_PANEL_65376",
    "MTIE4XINNOS_VDGS/V_NO1ENGINE_PANEL_65379": "V_NO1ENGINE_PANEL_65379",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65361_STATUS":
      "V_NO2ENGINE_PANEL_65361_STATUS",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65378": "V_NO2ENGINE_PANEL_65378",
    "MTIE4XINNOS_VDGS/V_NO2ENGINE_PANEL_65376": "V_NO2ENGINE_PANEL_65376",
    "MTIE4XINNOS_VDGS/NO2ENGINE_PANEL_65379": "V_NO2ENGINE_PANEL_65379",

    "MANAGEMENT/SUBSCRIBELIST": "SUBSCRIBELIST",
    "MANAGEMENT/CONNECTSTATE": "CONNECTSTATE",
    "MANAGEMENT/SYSTEMSTATE": "SYSTEMSTATE",
    "MANAGEMENT/ALARMINFO": "ALARMINFO",
    "MANAGEMENT/MODEINFO": "MODEINFO",
    "MANAGEMENT/COM": "COM",
    "MANAGEMENT/ENGINECONTROL": "ENGINECONTROL",
    "MANAGEMENT/RUDDERCONTROL": "RUDDERCONTROL",
    "MANAGEMENT/SHORE_MODE_REQUEST": "SHORE_MODE_REQUEST",
    "MANAGEMENT/SHORE_ENGINE_CONTROL": "SHORE_ENGINE_CONTROL",
    "MANAGEMENT/SHORE_RUDDER_CONTROL": "SHORE_RUDDER_CONTROL",

    "RUDDER/REQUESTCOMMAND": "REQUESTCOMMAND_R",
    "RUDDER/RESPONSECOMMAND": "RESPONSECOMMAND_R",
    "ENGINE/REQUESTCOMMAND": "REQUESTCOMMAND_E",
    "ENGINE/RESPONSECOMMAND": "RESPONSECOMMAND_E",
    "MODE/REQUESTCOMMAND": "REQUESTCOMMAND_M",
    "MODE/RESPONSECOMMAND": "RESPONSECOMMAND_M",

    WeatherInfo: "Weather_Info",
    ObjectInfo: "Object_Info",
    "AIS 원문": "AIS_vts",

    // 다른 headerName에 대한 매핑 추가
  };

  return nameMappings[headerName];
};

// ---------------------- 게이지 min-max값 설정 ----------------------------- //
const standardItems = ref([
  { signalName: "Ship Speed", minValue: "0", maxValue: "11" },
  { signalName: "Wind Speed", minValue: "0", maxValue: "12" },
  { signalName: "Engine Speed", minValue: "0", maxValue: "13" },
  { signalName: "Oil Pressure", minValue: "0", maxValue: "14" },
  { signalName: "Oil Temp", minValue: "0", maxValue: "15" },
  { signalName: "Trans Pressure", minValue: "0", maxValue: "16" },
  { signalName: "Gas Temp", minValue: "0", maxValue: "17" },
]);

// standardItems.value[0].minValue

const getMinMax = async () => {
  const response = await readRealtimeMinMax(tokenid.value);

  // 표준 항목을 response의 데이터로 업데이트
  standardItems.value = response.map((item) => {
    return {
      signalName: item.signalName,
      minValue: item.minValue,
      maxValue: item.maxValue,
    };
  });
  console.log(standardItems.value);
};

onMounted(() => {
  getMinMax();
  // 초기에도 업데이트 수행
});

// -------------------- 화면 비율 변경 시 발생하는 이벤트 --------------------------- //

const screenWidth = ref(window.innerWidth);

const getColsValue1 = () => {
  return screenWidth.value <= 1800 ? 4 : 6;
};

const getColsValue2 = () => {
  return screenWidth.value <= 1800 ? 12 : 3;
};

const getColsValue3 = () => {
  return screenWidth.value <= 1800 ? 3 : 4;
};

const getEngineColsValue = () => {
  return screenWidth.value <= 1800 ? 12 : 6;
};

const getLampColsValue = () => {
  return screenWidth.value <= 1890 ? 12 : 12;
};

const getheightValue1 = () => {
  return screenWidth.value <= 1800 ? 27 : 27;
};

const getheightValue2 = () => {
  return screenWidth.value <= 1800
    ? 184 // 1800 이하일 경우 130 반환
    : screenWidth.value <= 1890
    ? 115 // 1800 초과이면서 1890 이하일 경우 120 반환
    : 88; // 그 외의 경우 93 반환
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


.custom-title {
  font-size: 16px;
  padding-left: 15px;
}

.custom-e-text {
  padding: 0;
}

v-sheet {
  box-sizing: border-box;
}

.double-column {
  flex-direction: row;
}

.single-column {
  flex-direction: column;
}

.engine-lamp-container {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  padding: 10px;
}

.engine-lamp-item {
  flex: 1 0 21%; /* 21% 정도로 설정하여 한 줄에 4개가 들어가도록 합니다. */
  display: flex;
  align-items: center;
  margin: 10px 1%; /* 아이템 사이의 간격을 줍니다. */
  padding: 5px;
  border: 1px solid #f0f0f0; /* 각 아이템에 연한 테두리를 추가합니다. */
  border-radius: 4px;
  background-color: #fbfbfb; /* 배경색을 추가합니다. */
}

.engine-lamp-text {
  font-size: 14px;
}

.pa-5 {
  padding: 20px;
}

.pb-0 {
  padding-bottom: 0px
}

.cctv-card {
  border-radius: 10px;
  overflow: hidden;
}

.cctv-card-text {
  background-color: #fbfbfb;
  padding: 0px;
}

.video-container video {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  padding-bottom: 0px;
  height: 70vh; /* 비디오가 차지하는 높이 조절 */
}

.cctv-video {
  width: 100%;
  max-width: 1280px;
  border: 5px solid #eee;
  border-radius: 8px;
}

.v-toolbar-title {
  font-weight: bold;
}

.cctv-card-actions {
  background-color: #888888;
}
</style>
