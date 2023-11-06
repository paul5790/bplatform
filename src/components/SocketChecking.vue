<template>
  <div style="padding-top: 20px;">
    <v-row>
      <v-col cols="12">
        <v-card
          :color="primary"
          :variant="elevated"
          style="flex: 1; max-height: 95vh; overflow-y: auto"
        >
          <v-card-item>
            <v-sheet v-for="item in data" :key="item.key">
              <v-icon
                :color="getIconColor(item.key)"
                :icon="getIconIcon(item.key)"
                size="small"
              ></v-icon>
              <span style="font-size: 14px"
                >&nbsp;&nbsp;&nbsp;{{ item.key }}</span
              ><br /><br />
            </v-sheet>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup props>
import { defineProps } from "vue";

const props = defineProps({
  checkdata: Object, // checkdata를 객체로 받음
});

const data = [
  {
    key: "GLL",
  },
  {
    key: "GGA",
  },
  {
    key: "RMC",
  },
  {
    key: "VTG",
  },
  {
    key: "ZDA",
  },
  {
    key: "DTM",
  },
  {
    key: "GSV",
  },
  {
    key: "GSA",
  },
  {
    key: "THS",
  },
  {
    key: "HDT",
  },
  {
    key: "ROT",
  },
  {
    key: "MWV",
  },
  {
    key: "MWD",
  },
  {
    key: "VWR",
  },
  {
    key: "MTW",
  },
  {
    key: "VWT",
  },
  {
    key: "TTM",
  },
  {
    key: "TLL",
  },
  {
    key: "RSCREEN",
  },
  {
    key: "VDM",
  },
  {
    key: "VDO",
  },
  {
    key: "ROUTEINFO",
  },
  {
    key: "WAYPOINTS",
  },
  {
    key: "ESCREEN",
  },
  {
    key: "RSA",
  },
  {
    key: "MODE",
  },
  {
    key: "HTD",
  },
  {
    key: "VBW",
  },
  {
    key: "VHW",
  },
  {
    key: "VLW",
  },
  {
    key: "NO1ENGINE_PANEL_61444",
  },
  {
    key: "NO1ENGINE_PANEL_65262",
  },
  {
    key: "NO1ENGINE_PANEL_65263",
  },
  {
    key: "NO1ENGINE_PANEL_65272",
  },
  {
    key: "NO1ENGINE_PANEL_65271",
  },
  {
    key: "NO1ENGINE_PANEL_65253",
  },
  {
    key: "NO1ENGINE_PANEL_65270",
  },
  {
    key: "NO1ENGINE_PANEL_65276",
  },
  {
    key: "NO1ENGINE_PANEL_65360",
  },
  {
    key: "NO1ENGINE_PANEL_65361_LAMP",
  },
  {
    key: "NO1ENGINE_PANEL_65361_STATUS",
  },
  {
    key: "NO1ENGINE_PANEL_65378",
  },
  {
    key: "NO1ENGINE_PANEL_65376",
  },
  {
    key: "NO1ENGINE_PANEL_65379",
  },
  {
    key: "NO2ENGINE_PANEL_61444",
  },
  {
    key: "NO2ENGINE_PANEL_65262",
  },
  {
    key: "NO2ENGINE_PANEL_65263",
  },
  {
    key: "NO2ENGINE_PANEL_65272",
  },
  {
    key: "NO2ENGINE_PANEL_65271",
  },
  {
    key: "NO2ENGINE_PANEL_65253",
  },
  {
    key: "NO2ENGINE_PANEL_65270",
  },
  {
    key: "NO2ENGINE_PANEL_65276",
  },
  {
    key: "NO2ENGINE_PANEL_65360",
  },
  {
    key: "NO2ENGINE_PANEL_65361_LAMP",
  },
  {
    key: "NO2ENGINE_PANEL_65361_STATUS",
  },
  {
    key: "NO2ENGINE_PANEL_65378",
  },
  {
    key: "NO2ENGINE_PANEL_65376",
  },
  {
    key: "NO2ENGINE_PANEL_65379",
  },
];
const getIconColor = (key) =>
  props.checkdata[key] === "ok" ? "success" : "error";
const getIconIcon = (key) =>
  props.checkdata[key] === "ok" ? "mdi-check-circle" : "mdi-alert-circle";
</script>
