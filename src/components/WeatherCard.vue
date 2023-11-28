<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12">
      <v-card class="mx-auto" max-width="400">
        <v-card-item title="Florida">
          <template v-slot:subtitle>
            <v-icon
              icon="mdi-alert"
              size="18"
              color="error"
              class="me-1 pb-1"
            ></v-icon>

            Extreme Weather Alert
          </template>
        </v-card-item>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h3" cols="6"> 64&deg;F </v-col>

            <v-col cols="6" class="text-right">
              <v-icon
                color="error"
                icon="mdi-weather-hurricane"
                size="68"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>

        <div class="d-flex py-2 justify-space-between">
          <v-list-item density="compact" prepend-icon="mdi-weather-windy">
            <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
          </v-list-item>

          <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
            <v-list-item-subtitle>48%</v-list-item-subtitle>
          </v-list-item>
        </div>

        <v-expand-transition>
          <div v-if="expand">
            <div class="py-2">
              <v-slider
                v-model="time"
                :max="6"
                :step="1"
                :ticks="labels"
                class="mx-4"
                color="primary"
                density="compact"
                hide-details
                show-ticks="always"
                thumb-size="10"
              ></v-slider>
            </div>

            <v-list class="bg-transparent">
              <v-list-item
                v-for="item in forecast"
                :key="item.day"
                :title="item.day"
                :append-icon="item.icon"
                :subtitle="item.temp"
              >
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn @click="expand = !expand">
            {{ !expand ? "Full Report" : "Hide Report" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

const labels = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WED",
  4: "TH",
  5: "FR",
  6: "SA",
};
const forecast = [
  {
    day: "Tuesday",
    icon: "mdi-white-balance-sunny",
    temp: "24\u00B0/12\u00B0",
  },
  {
    day: "Wednesday",
    icon: "mdi-white-balance-sunny",
    temp: "22\u00B0/14\u00B0",
  },
  { day: "Thursday", icon: "mdi-cloud", temp: "25\u00B0/15\u00B0" },
];

const expand = ref(false);
const time = ref(0);




const axioslist = ref([
  "dgps/gll",
  "dgps/gga",
  "dgps/rmc",
  "dgps/vtg",
  "dgps/zda",
  "dgps/dtm",
  "dgps/gsv",
  "dgps/gsa",
  "gyro/ths",
  "gyro/hdt",
  "gyro/rot",
  "anemometer/mwv",
  "anemometer/mwd",
  "anemometer/vwr",
  "anemometer/mtw",
  "anemometer/vwt",
  "radar/ttm",
  "radar/tll",
  "radar/screen",
  "ais/vdm",
  "ais/vdo",
  "ecdis/routeinfo",
  "ecdis/waypoints",
  "ecdis/screen",
  "autopilot/rsa",
  "autopilot/mode",
  "autopilot/htd",
  "speedlog/vbw",
  "speedlog/vhw",
  "speedlog/vlw",
  "no1enginepanel/no1engine_panel_61444",
  "no1enginepanel/no1engine_panel_65262",
  "no1enginepanel/no1engine_panel_65263",
  "no1enginepanel/no1engine_panel_65272",
  "no1enginepanel/no1engine_panel_65271",
  "no1enginepanel/no1engine_panel_65253",
  "no1enginepanel/no1engine_panel_65270",
  "no1enginepanel/no1engine_panel_65276",
  "no1enginepanel/no1engine_panel_65360",
  "no1enginepanel/no1engine_panel_65361_lamp",
  "no1enginepanel/no1engine_panel_65361_status",
  "no1enginepanel/no1engine_panel_65378",
  "no1enginepanel/no1engine_panel_65376",
  "no1enginepanel/no1engine_panel_65379",
  "no2enginepanel/no2engine_panel_61444",
  "no2enginepanel/no2engine_panel_65262",
  "no2enginepanel/no2engine_panel_65263",
  "no2enginepanel/no2engine_panel_65272",
  "no2enginepanel/no2engine_panel_65271",
  "no2enginepanel/no2engine_panel_65253",
  "no2enginepanel/no2engine_panel_65270",
  "no2enginepanel/no2engine_panel_65276",
  "no2enginepanel/no2engine_panel_65360",
  "no2enginepanel/no2engine_panel_65361_lamp",
  "no2enginepanel/no2engine_panel_65361_status",
  "no2enginepanel/no2engine_panel_65378",
  "no2enginepanel/no2engine_panel_65376",
  "no2enginepanel/no2engine_panel_65379",
]);











</script>

<style scoped>
.full-height {
  height: 50vh;
}
</style>







