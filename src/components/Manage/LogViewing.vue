<template>
  <v-sheet class="manager-sheet">
    <v-data-table
      style="margin-top: 10px"
      v-model:page="page"
      class="elevation-1"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      hide-default-footer
      density="compact"
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="6"
            rounded="circle"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { computed, ref } from "vue";
const page = ref(1);
const itemsPerPage = ref(16);

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const headers = ref([
  { title: "시간", key: "utc" },
  { title: "타겟", key: "target" },
  { title: "위치", key: "location" },
  { title: "상태코드", key: "state" },
  { title: "호출 URL", key: "url" },
  { title: "로그", key: "log" },
]);

// 데이터 테이블 바디
const items = ref([
  {
    name: "유저 #1",
    utc: "2023-08-29T08:28:43",
    target: "window App",
    location: "realtimeview",
    state: "404",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #2",
    utc: "2023-09-27T08:28:43",
    target: "web App",
    location: "realtimeview",
    state: "404",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #3",
    utc: "2023-10-20T04:28:43",
    target: "web App",
    location: "realtimeview",
    state: "404",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #4",
    utc: "2023-10-29T18:28:43",
    target: "web App",
    location: "realtimeview",
    state: "404",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #5",
    utc: "2023-08-29T08:28:43",
    target: "window App",
    location: "realtimeview",
    state: "404",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #6",
    utc: "2023-09-27T08:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #7",
    utc: "2023-10-20T04:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #8",
    utc: "2023-10-29T18:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #9",
    utc: "2023-08-29T08:28:43",
    target: "window App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #10",
    utc: "2023-09-27T08:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #11",
    utc: "2023-10-20T04:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #12",
    utc: "2023-10-29T18:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #13",
    utc: "2023-08-29T08:28:43",
    target: "window App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #14",
    utc: "2023-09-27T08:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #15",
    utc: "2023-10-20T04:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #16",
    utc: "2023-10-29T18:28:43",
    target: "web App",
    location: "realtimeview",
    state: "400",
    url: "/shipinfo/api/dgps/gll",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #17",
    utc: "2023-08-29T08:28:43",
    target: "window App",
    location: "realtimeview",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #18",
    utc: "2023-09-27T08:28:43",
    target: "web App",
    location: "realtimeview",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #19",
    utc: "2023-10-20T04:28:43",
    target: "web App",
    location: "realtimeview",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #20",
    utc: "2023-10-29T18:28:43",
    target: "web App",
    location: "realtimeview",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
  {
    name: "유저 #21",
    utc: "2023-08-29T08:28:43",
    target: "window App",
    location: "realtimeview",
    log: "Failed to load resource: the server responded with a status of 404 (Not Found)",
  },
]);
</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
}
</style>
