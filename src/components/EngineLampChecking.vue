<template>
  <div
    :style="{
      display: 'flex',
      height: `${getheightValue()}vh`,
      overflowY: 'auto',
    }"
    class="scrollable-card-1"
  >
    <v-sheet style="flex: 20%">
      <v-sheet v-for="item in data.slice(0, 4)" :key="item.key">
        <v-icon
          :color="getIconColor(item.key)"
          :icon="getIconIcon(item.key)"
          size="small"
        ></v-icon>
        <span style="font-size: 14px">{{ item.name }}</span
        ><br /><br />
      </v-sheet>
    </v-sheet>

    <v-sheet style="flex: 22%">
      <v-sheet v-for="item in data.slice(4, 8)" :key="item.key">
        <v-icon
          :color="getIconColor(item.key)"
          :icon="getIconIcon(item.key)"
          size="small"
        ></v-icon>
        <span style="font-size: 14px">{{ item.name }}</span
        ><br /><br />
      </v-sheet>
    </v-sheet>

    <v-sheet style="flex: 28%">
      <v-sheet v-for="item in data.slice(8, 12)" :key="item.key">
        <v-icon
          :color="getIconColor(item.key)"
          :icon="getIconIcon(item.key)"
          size="small"
        ></v-icon>
        <span style="font-size: 14px">{{ item.name }}</span
        ><br /><br />
      </v-sheet>
    </v-sheet>

    <v-sheet style="flex: 30%">
      <v-sheet v-for="item in data.slice(12, 16)" :key="item.key">
        <v-icon
          :color="getIconColor(item.key)"
          :icon="getIconIcon(item.key)"
          size="small"
        ></v-icon>
        <span style="font-size: 14px">{{ item.name }}</span
        ><br /><br />
      </v-sheet>
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
const handleResize = () => {
  screenheight.value = props.height;
};
const getheightValue = () => {
  return (screenheight.value = props.height);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  // 초기에도 업데이트 수행
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const data = [
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
const getIconColor = (key) =>
  props.checkdata[key] === "ok" ? "error" : "grey-lighten-1";
const getIconIcon = (key) =>
  props.checkdata[key] === "ok" ? "mdi-alarm-light" : "mdi-alarm-light";
</script>
