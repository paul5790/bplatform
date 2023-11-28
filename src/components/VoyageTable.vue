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
      <span style="font-size: 19px; font-weight: 550">항차 테이블</span>
    </v-card-title>
    <v-data-table
      v-model:page="page"
      class="elevation-1 mgt-10"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      density="dense"
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
            <MapView :trial="seatrialProps"/>
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
import { ref, computed, watch } from "vue";
import axios from "axios";

const page = ref(1);
const itemsPerPage = 10;

const headers = [
  { title: "항차", align: "start", key: "name",},
  { title: "Ship ID", align: "start", key: "shipid" },
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

const items1 = ref([]);

// 데이터 받아오기
const fetchData = async () => {
  try {
    const response = await axios.post("http://192.168.0.73:8080/info/seatrial");
    for (let i = 0; i < response.data.length; i++) {

      items.value.push({
        name: `${response.data[i].seatrialid}`,
        shipid: `${response.data[i].shipid.shipid}`,
        startdate: `${response.data[i].start_TIME_UTC}`,
        purpose: `${response.data[i].test_PURPOSE}`,
        location: `${response.data[i].navigation_AREA}`,
        storage: `${response.data[i].seatrialid}`,
        enddate: `${response.data[i].end_TIME_UTC}`,
        description: `${response.data[i].description}`,
      });

      console.log(`${response.data[i].seatrialid} here!!!!!!!!!!!!`);
      console.log(`${response.data[i].test_PURPOSE} here!!!!!!!!!!!!`);
    }
  } catch (error) {
    console.error(error);
  }
};

fetchData();


const seatrialProps = ref();
const maptitle = ref();
const map = (item) => {
  console.log(item.name + "아이템");
  seatrialProps.value = `${item.name}`;
  maptitle.value = `${item.name}의 지도`;
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


</script>
<style scoped>
.mgt-10 {
  margin-top: 11px;
}
</style>
