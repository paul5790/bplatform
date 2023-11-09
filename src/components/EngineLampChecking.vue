<template>
  <div style="padding-top: 40px">
    <v-sheet v-for="item in data" :key="item.key">
      <v-icon
        :color="getIconColor(item.key)"
        :icon="getIconIcon(item.key)"
        size="small"
      ></v-icon>
      <span style="font-size: 14px">&nbsp;&nbsp;&nbsp;{{ item.name }}</span
      ><br /><br />
    </v-sheet>
  </div>
</template>

<script setup props>
import { defineProps } from "vue";

const props = defineProps({
  checkdata: Object, // checkdata를 객체로 받음
});

const data = [
  { key: 1, name: "Water Temperature" },
  { key: 2, name: "Low Engine Oil Pressure" },
  { key: 3, name: "Low Gearbox Oil Pressure" },
  { key: 4, name: "Battery Charge" },
  { key: 5, name: "Fuel Leak" },
  { key: 6, name: "Over Speed" },
  { key: 7, name: "Low Volt." },
  { key: 8, name: "Low Water Level" },
  { key: 9, name: "Low Fuel Level" },
  { key: 10, name: "Engine Oil Over Heat" },
  { key: 11, name: "Main connector Removed" },
  { key: 12, name: "High Exhaust Gas Temperature" },
  { key: 13, name: "Low Boost Air Pressure" },
  { key: 14, name: "High Boost Air Pressure" },
  { key: 15, name: "Engine Shutdown" },
  { key: 16, name: "Low Engine Speed" },
];
const getIconColor = (key) =>
  props.checkdata[key] === "ok" ? "success" : "error";
const getIconIcon = (key) =>
  props.checkdata[key] === "ok" ? "mdi-check-circle" : "mdi-alert-circle";
</script>
