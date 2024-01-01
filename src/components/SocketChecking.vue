<template>
  <div class="scrollable-card-1 item-wrapper">
    <v-sheet
      :style="{
        display: 'flex',
        height: `${getheightValue()}vh`,
        flexDirection: 'column',
        overflowY: 'auto',
        alignItems: 'center'
      }"
    >
      <v-list class="scrollable-card-1" :style="{ width: `${getwidth()}px` }">
        <!-- DGPS -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="DGPS"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(0, 4)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(4, 7)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- GYRO -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="GYRO"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(7, 8)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(8, 9)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- ANEMOMETER -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="ANEMOMETER"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(9, 10)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- RADAR -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="RADAR"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(10, 11)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- AIS -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="AIS"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(11, 12)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(12, 13)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- ECDIS -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="ECDIS"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 050 50%">
                <v-sheet v-for="item in data.slice(13, 17)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- AUTOPILOT -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="AUTOPILOT"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(17, 18)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(18, 19)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- SPEEDLOG -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="SPEEDLOG"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(19, 21)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(21, 22)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>

        <!-- CanThrottle -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="CanThrottle"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(22, 26)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>

        <!-- AutoPilotContact -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="AutoPilotContact"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(26, 27)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 14px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- NO.1 -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="NO.1ENGINEPANEL"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(27, 41)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 12px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
        <!-- NO.2 -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="NO.2ENGINEPANEL"></v-list-item>
          </template>
          <v-list-item>
            <div style="height: auto; display: flex" class="scrollable-card-1">
              <v-sheet style="flex: 0 0 50%">
                <v-sheet v-for="item in data.slice(41, 55)" :key="item.key">
                  <v-icon
                    :color="getIconColor(item.key)"
                    :icon="getIconIcon(item.key)"
                    size="small"
                  ></v-icon>
                  <span style="font-size: 12px"
                    >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
                  ><br /><br />
                </v-sheet>
              </v-sheet>
            </div>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-sheet>
  </div>
</template>

<script setup props>
import { ref, defineProps, onMounted, onUnmounted } from "vue";

const props = defineProps({
  checkdata: Object, // checkdata를 객체로 받음
  height: Number,
});
const screenheight = ref(props.height);
const screenWidth = ref(window.innerWidth);
const handleResize = () => {
  screenheight.value = props.height;
  screenWidth.value = window.innerWidth;
};
const getheightValue = () => {
  return screenheight.value = props.height;
};

const getwidth = () => {
  console.log((1980*270) / screenWidth.value)
  return (screenWidth.value*270) / 1980;
};


onMounted(() => {
  window.addEventListener("resize", handleResize);
  // 초기에도 업데이트 수행
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const groupDGPS = ref(true);
const groupGYRO = ref(true);
const groupANEMOMETER = ref(true);
const groupRADAR = ref(true);
const groupAIS = ref(true);
const groupECDIS = ref(true);
const groupAUTOPILOT = ref(true);
const groupSPEEDLOG = ref(true);
const groupNO1ENGINEPANEL = ref(true);
const groupNO2ENGINEPANEL = ref(true);

const toggleGroup = (group) => {
  // 토글 함수를 사용하여 초기 상태를 설정
  switch (group) {
    case "groupDGPS":
      groupDGPS.value = !groupDGPS.value;
      break;
    case "groupGYRO":
      groupGYRO.value = !groupGYRO.value;
      break;
    // 나머지 case들도 추가
  }
};












// 총 58개 데이터
const data = [
  { key: "GLL" }, //DGPS
  { key: "GGA" },
  { key: "RMC" },
  { key: "VTG" },
  { key: "ZDA" },
  { key: "GSV" },
  { key: "GSA" },
  { key: "HDT" },
  { key: "ROT" },
  { key: "MWV" }, //ANEMOMETER
  { key: "RSCREEN" },//Radar
  { key: "VDM" }, //AIS
  { key: "VDO" },
  { key: "ROUTEINFO" }, //ECDIS
  { key: "WAYPOINTS" },
  { key: "RTZ" },
  { key: "ESCREEN" },
  { key: "RSA" }, //AUTOPILOT
  { key: "HTD" },
  { key: "VBW" }, //SPEEDLOG
  { key: "VHW" },
  { key: "VLW" },
  { key: "CAN_Online_State" },//CanThrottle
  { key: "Engine_RPM" },
  { key: "Rudder" },
  { key: "Rudder_Scale" },
  { key: "AUTOPILOTCONTACT" },
  { key: "NO1ENGINE_PANEL_61444" }, //NO.1
  { key: "NO1ENGINE_PANEL_65262" },
  { key: "NO1ENGINE_PANEL_65263" },
  { key: "NO1ENGINE_PANEL_65272" },
  { key: "NO1ENGINE_PANEL_65271" },
  { key: "NO1ENGINE_PANEL_65253" },
  { key: "NO1ENGINE_PANEL_65270" },
  { key: "NO1ENGINE_PANEL_65276" },
  { key: "NO1ENGINE_PANEL_65360" },
  { key: "NO1ENGINE_PANEL_65361_LAMP" },
  { key: "NO1ENGINE_PANEL_65361_STATUS" },
  { key: "NO1ENGINE_PANEL_65378" },
  { key: "NO1ENGINE_PANEL_65376" },
  { key: "NO1ENGINE_PANEL_65379" },
  { key: "NO2ENGINE_PANEL_61444" }, //NO.2
  { key: "NO2ENGINE_PANEL_65262" },
  { key: "NO2ENGINE_PANEL_65263" },
  { key: "NO2ENGINE_PANEL_65272" },
  { key: "NO2ENGINE_PANEL_65271" },
  { key: "NO2ENGINE_PANEL_65253" },
  { key: "NO2ENGINE_PANEL_65270" },
  { key: "NO2ENGINE_PANEL_65276" },
  { key: "NO2ENGINE_PANEL_65360" },
  { key: "NO2ENGINE_PANEL_65361_LAMP" },
  { key: "NO2ENGINE_PANEL_65361_STATUS" },
  { key: "NO2ENGINE_PANEL_65378" },
  { key: "NO2ENGINE_PANEL_65376" },
  { key: "NO2ENGINE_PANEL_65379" },
];
const getIconColor = (key) =>
  props.checkdata[key] === "ok" ? "success" : "error";
const getIconIcon = (key) =>
  props.checkdata[key] === "ok" ? "mdi-check-circle" : "mdi-alert-circle";
</script>

<style>
.item-wrapper {
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center; /* 교차 축 정렬: 세로 중앙 정렬 */
  justify-content: flex-start; /* 주 축 정렬: 가로 왼쪽 정렬 */
}
</style>
