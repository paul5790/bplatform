<template>
  <v-sheet
    style="
      height: 47vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      align-items: center;
    "
    class="scrollable-card"
  >
    <v-card-title>
      <span style="font-size: 19; font-weight: 550;">항차 테이블</span>
    </v-card-title>
    <v-data-table
      v-model:page="page"
      class="elevation-1 mgt-10"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      density="extra-dense"
      hide-default-footer
      item-value="name"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="x-large" class="me-2" @click="map(item)">
          mdi mdi-map
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
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
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>{{ maptitle }}</v-card-title>
      <v-card-text>
        <v-sheet style="display: flex">
          <v-container fluid>
            <MapView />
          </v-container>
        </v-sheet>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close()">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="close()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import MapView from "../views/MapView.vue";
import { ref, computed, watch } from "vue";

const page = ref(1);
const itemsPerPage = 9;

const headers = [
  {
    title: "항차",
    align: "start",
    key: "name",
  },
  { title: "시작시간", align: "start", key: "startdate" },
  { title: "끝시간", align: "start", key: "enddate" },
  { title: "목적", align: "start", key: "purpose" },
  { title: "해역 위치", align: "start", key: "location" },
  { title: "저장 용량", align: "start", key: "storage" },
  { title: "map", key: "actions", sortable: false },
  { title: "설명", align: "start", key: "description" },
];

const items = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});

const defaultItem = {
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
};

const formTitle = computed(() =>
  editedIndex.value === -1 ? "New Item" : "Edit Item"
);
const pageCount = computed(() => Math.ceil(items.value.length / itemsPerPage));

const dialog = ref(false);
const dialogDelete = ref(false);

watch(dialog, (val) => {
  val || close();
});

watch(dialogDelete, (val) => {
  val || closeDelete();
});

const initialize = () => {
  items.value = [
    {
      name: "시운전 #1",
      startdate: "2023-08-29T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-08-31T01:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #2",
      startdate: "2023-09-27T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-09-30T08:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #3",
      startdate: "2023-10-20T04:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-21T06:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #4",
      startdate: "2023-10-29T18:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-29T20:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #5",
      startdate: "2023-08-29T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-08-31T01:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #6",
      startdate: "2023-09-27T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-09-30T08:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #7",
      startdate: "2023-10-20T04:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-21T06:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #8",
      startdate: "2023-10-29T18:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-29T20:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #9",
      startdate: "2023-08-29T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-08-31T01:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #10",
      startdate: "2023-09-27T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-09-30T08:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #11",
      startdate: "2023-10-20T04:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-21T06:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #12",
      startdate: "2023-10-29T18:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-29T20:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #13",
      startdate: "2023-08-29T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-08-31T01:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #14",
      startdate: "2023-09-27T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-09-30T08:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #15",
      startdate: "2023-10-20T04:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-21T06:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #16",
      startdate: "2023-10-29T18:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-29T20:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #17",
      startdate: "2023-08-29T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-08-31T01:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #18",
      startdate: "2023-09-27T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-09-30T08:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #19",
      startdate: "2023-10-20T04:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-21T06:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #20",
      startdate: "2023-10-29T18:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-10-29T20:24:33",
      description: "##테스트 시운전",
    },
    {
      name: "시운전 #21",
      startdate: "2023-08-29T08:28:43",
      purpose: "%%테스트",
      location: "울산 실증센터",
      storage: "26MB",

      enddate: "2023-08-31T01:24:33",
      description: "##테스트 시운전",
    },
  ];
};

const maptitle = ref();
const map = (item) => {
  console.log(item.name + "아이템");
  maptitle.value = `${item.name}의 지도`
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = items.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = () => {
  items.value.splice(editedIndex.value, 1);
  closeDelete();
};

const close = () => {
  dialog.value = false;
};

const closeDelete = () => {
  dialogDelete.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(items.value[editedIndex.value], editedItem.value);
  } else {
    items.value.push({ ...editedItem.value });
  }
  close();
};

// Call initialize function on component creation
initialize();
</script>
<style scoped>
.mgt-10 {
  margin-top: 11px;
}
</style>
