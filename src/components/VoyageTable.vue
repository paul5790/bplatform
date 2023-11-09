<template>
  <v-sheet
    style="
      height: 50vh;
      padding: 1px;
      margin-top: 10px;
      padding-right: 30px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      align-items: end;
    "
    class="scrollable-card"
  >
    <v-data-table
      v-model:page="page"
      class="elevation-1"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      hide-default-footer
      item-value="name"
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { computed, ref } from "vue";

// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(5);

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const username = ref("홍길동");

// 데이터 테이블 헤더
const headers = ref([
  {
    title: "항차",
    align: "start",
    key: "name",
  },
  { title: "start_time", align: "end", key: "startdate" },
  { title: "end_time", align: "end", key: "enddate" },
  { title: "description", align: "end", key: "description" },
]);

// 데이터 테이블 바디
const items = ref([
  {
    name: "시운전 #1",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #2",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #3",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #4",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #5",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #6",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #7",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #8",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #9",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #10",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #11",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #12",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #13",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #14",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #15",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #16",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #17",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #18",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #19",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #20",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #21",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
]);
</script>

<style scoped></style>
