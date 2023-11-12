<template>
  <v-sheet style="height: 93vh; padding: 80px; padding-top: 40px; display: flex">
    <v-card :color="primary" :variant="elevated" style="flex: 1">
      <v-card-item>
        <v-data-table
          style="margin-top: 10px"
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
      </v-card-item>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { computed, ref } from "vue";

const dialog = ref(false);
const page = ref(1);
const itemsPerPage = ref(11);

const selected = ref([]);

const username = ref("홍길동");

const openDialog = () => {
  if (selected.value === null || selected.value === "") {
    dialog.value = false;
  } else {
    dialog.value = true;
  }
};

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const headers = ref([
  { title: "User ID", key: "name" },
  { title: "Name", key: "username" },
  { title: "Affiliation", key: "affiliation" },
  { title: "E-mail", key: "enddate" },
  { title: "Permission", key: "permission" },
  { title: "description", key: "description" },
]);

// 데이터 테이블 바디
const items = ref([
  {
    name: "유저 #1",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 유저",
    permission: "admin",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #2",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 유저",
    permission: "admin",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #3",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 유저",
    permission: "admin",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #4",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 유저",
    permission: "admin",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #5",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 유저",
    permission: "admin",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #6",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #7",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #8",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #9",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #10",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #11",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #12",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #13",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #14",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #15",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #16",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 유저",
    permission: "user",
    affiliation: "지노스",
    username: username.value,
  },
  {
    name: "유저 #17",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 유저",
    username: username.value,
  },
  {
    name: "유저 #18",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 유저",
    username: username.value,
  },
  {
    name: "유저 #19",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 유저",
    username: username.value,
  },
  {
    name: "유저 #20",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 유저",
    username: username.value,
  },
  {
    name: "유저 #21",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 유저",
    username: username.value,
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
