<template>
  <v-sheet
    style="
      height: 48vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      align-items: center;
    "
    class="scrollable-card"
  >
    <v-card-title>
      <span style="font-size: 19px; font-weight: 550">항차 리스트</span>
    </v-card-title>
    <v-data-table
      v-model:page="page"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      density="dense"
      hide-default-footer
      return-object
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="x-large" class="me-2" @click="map(item)">
          mdi mdi-map
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-sheet height="40vh" class="pa-1 d-flex justify-center align-center">
          <div style="text-align: center">
            <p style="font-weight: 500; font-size: 20px">
              {{ message }}
            </p>
          </div>
        </v-sheet>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-0">
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
            <MapView :trial="seatrialProps" />
          </v-container>
        </v-sheet>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import MapView from "../views/MapView.vue";
import { ref, computed, watch, defineEmits, onMounted } from "vue";
import axios from "axios";
import { readTrialData } from "../api/index.js";

const emits = defineEmits(["trial"]);
const page = ref(1);
const itemsPerPage = ref(10);

const headers = ref([
  { title: "구분", align: "start", key: "division" },
  { title: "Ship ID", align: "start", key: "shipid" },
  { title: "진행 시간", align: "start", key: "time" },
  { title: "시작시간", align: "start", key: "startdate" },
  { title: "종료시간", align: "start", key: "enddate" },
  { title: "항차 이름", align: "start", key: "name" },
  { title: "목적", align: "start", key: "purpose" },
  { title: "map", key: "actions", sortable: false },
  { title: "해역 위치", align: "start", key: "location" },
  { title: "저장 용량", align: "start", key: "storage" },
  
  { title: "설명", align: "start", key: "description" },
]);

const items = ref([]);
const message = ref("항차 테이블 정보 로딩중...");
const editedIndex = ref(-1);

const formTitle = computed(() =>
  editedIndex.value === -1 ? "New Item" : "Edit Item"
);
const pageCount = computed(() =>
  Math.ceil(items.value.length / itemsPerPage.value)
);

const dialog = ref(false);

watch(dialog, (val) => {
  val || close();
});

const tokenid = ref(sessionStorage.getItem("token") || "");
const fetchData = async () => {
  try {
    const response = await readTrialData(tokenid.value);
    
    const newItems = [];
    for (let i = 0; i < response.length; i++) {
      const startTime = new Date(response[i].startTimeUtc);
      const endTime = new Date(response[i].endTimeUtc);

      const timeDiff = endTime - startTime;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      const storageSizeFloat = parseFloat(response[i].storageSize).toFixed(2);
      newItems.push({
        division: response[i].seatrialId,
        name: response[i].name,
        shipid: response[i].shipId,
        startdate: response[i].startTimeUtc,
        purpose: response[i].testPurpose,
        location: response[i].navigationArea,
        storage: storageSizeFloat + "MB",
        enddate: response[i].endTimeUtc,
        description: response[i].description,
        time: formattedTime,
      });
    }

    console.log("Fetched data:", newItems); // 로그 추가
    items.value = newItems;
  } catch (error) {
    console.error(error);
    message.value = `api 오류(${error})`
  }
};

onMounted(() => {
  fetchData();
});

const seatrialProps = ref();
const maptitle = ref();
const map = (item) => {
  console.log(item.division);
  seatrialProps.value = `${item.division}`;
  maptitle.value = `항차: ${item.name}의 지도`;
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
};
</script>
<style scoped>
.mgt-10 {
  margin-top: 11px;
}
.custom-select {
  --v-select-menu-font-size: 10px;
}
</style>
