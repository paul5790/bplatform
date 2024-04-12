<template>
  <v-sheet class="manager-sheet">
    <!-- <v-btn color="blue" @click="errorMethod">오류발생 버튼</v-btn> -->
    <v-card
      style="
        flex: 1;
        height: 75vh;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      "
    >
      <v-card-item style="padding-top: 0px">
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-select
              v-model="selectedLog"
              :items="selectionLog"
              variant="solo"
              style="
                width: 210px;
                height: 5vh;
                margin-top: 10px;
                margin-left: 10px;
              "
              density="compact"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="underlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table-virtual
          style="margin-top: 10px"
          
          class="elevation-1"
          :headers="selectedLog === 'Web Dashboard Log' ? webheaders : appheaders"
          :search="search"
          :items="items"
          
          hide-default-footer
          density="compact"
        >
          <!-- <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="6"
                rounded="circle"
              ></v-pagination>
            </div>
          </template> -->
        </v-data-table-virtual>
      </v-card-item>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { computed, ref, watchEffect, watch, onMounted } from "vue";
import { readWebLogData, createErrorData, readAppLogData } from "../../api/index.js";
import moment from "moment";
const page = ref(1);
const itemsPerPage = ref(16);

const search = ref();

const selectionLog = ref(["Web Dashboard Log", "Window App Log"]);
const selectedLog = ref(selectionLog.value[0]);

watch(selectedLog, (newValue, oldValue) => {
  switch (newValue) {
    case 'Web Dashboard Log':
      console.log('Selected Option 1');
      items.value = [];
      webData();
      break;
    case 'Window App Log':
      console.log('Selected Option 2');
      items.value = [];
      appData();
      break;
    default:
      console.log('Unknown option selected');
  }
});

watchEffect(() => {
  console.log("selectedLog changed:", selectedLog.value);
});

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const tokenid = ref(sessionStorage.getItem("token") || "");

const webheaders = ref([
  { title: "유저", key: "id" },
  { title: "시간", key: "utc", width: 180  },
  { title: "상태", key: "state" },
  { title: "타입", key: "type" },
  { title: "URL", key: "url" },
  { title: "로그", key: "log" },
]);

const appheaders = ref([
  { title: "유저", key: "id", width: 90 },
  { title: "시간1", key: "utc", width: 180 },
  { title: "타입", key: "type" },
  { title: "로그", key: "log", width: 400 },
  { title: "상세", key: "details" },
]);

const items = ref([]);

const webData = async () => {
  try {
    console.log("시작");
    const response = await readWebLogData(tokenid.value);
    console.log("끝");
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const koreanTime = moment(response[i].timeStamp)
        .add(0, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      items.value.push({
        id: response[i].userId || "",
        utc: koreanTime || "",
        type: response[i].type || "",
        method: response[i].requestMethod || "",
        state: response[i].statusCode || "",
        url: response[i].requestUrl || "",
        log: response[i].log || "",
      });
      // items.value.push(response.data[i]);
    }
    items.value.sort((a, b) => {
      const dateA = new Date(a.utc);
      const dateB = new Date(b.utc);
      return dateB - dateA;
    });
  } catch (error) {
    console.error(error);
  }
};

const appData = async () => {
  try {
    const response = await readAppLogData(tokenid.value);
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const koreanTime = moment(response[i].timeStamp)
        .add(9, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      items.value.push({
        id: response[i].id || "",
        utc: koreanTime || "",
        type: response[i].type || "",
        log: response[i].log || "",
        details: response[i].details || "",
      });
      // items.value.push(response.data[i]);
    }
    items.value.sort((a, b) => {
      const dateA = new Date(a.utc);
      const dateB = new Date(b.utc);
      return dateB - dateA;
    });
  } catch (error) {
    console.error(error);
  }
};


const errorMethod = () => {
  let errorItem = {
    id: sessionStorage.getItem("userid") || "",
    requestMethod: "post",
    requestUrl: "http://192.168.0.19:3911/#/manager",
    statusCode: "400",
    log: "virtual error data",
  };
  console.log(errorItem);
  try {
    createErrorData(tokenid.value, errorItem);
    alert("에러 설정 완료.");
    location.reload();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  // 컴포넌트가 마운트될 때 실행되는 코드
  webData();
});

// // 데이터 테이블 바디
// const items = ref([
//   {
//     name: "유저 #1",
//     utc: "2023-08-29T08:28:43",
//     target: "window App",
//     location: "post",
//     state: "404",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #2",
//     utc: "2023-09-27T08:28:43",
//     target: "web App",
//     location: "post",
//     state: "404",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #3",
//     utc: "2023-10-20T04:28:43",
//     target: "web App",
//     location: "post",
//     state: "404",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #4",
//     utc: "2023-10-29T18:28:43",
//     target: "web App",
//     location: "post",
//     state: "404",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #5",
//     utc: "2023-08-29T08:28:43",
//     target: "window App",
//     location: "post",
//     state: "404",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #6",
//     utc: "2023-09-27T08:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #7",
//     utc: "2023-10-20T04:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #8",
//     utc: "2023-10-29T18:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #9",
//     utc: "2023-08-29T08:28:43",
//     target: "window App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #10",
//     utc: "2023-09-27T08:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #11",
//     utc: "2023-10-20T04:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #12",
//     utc: "2023-10-29T18:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #13",
//     utc: "2023-08-29T08:28:43",
//     target: "window App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #14",
//     utc: "2023-09-27T08:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #15",
//     utc: "2023-10-20T04:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #16",
//     utc: "2023-10-29T18:28:43",
//     target: "web App",
//     location: "post",
//     state: "400",
//     url: "/shipinfo/api/dgps/gll",
//     log: "No value present",
//   },
//   {
//     name: "유저 #17",
//     utc: "2023-08-29T08:28:43",
//     target: "window App",
//     location: "post",
//     log: "No value present",
//   },
//   {
//     name: "유저 #18",
//     utc: "2023-09-27T08:28:43",
//     target: "web App",
//     location: "post",
//     log: "No value present",
//   },
//   {
//     name: "유저 #19",
//     utc: "2023-10-20T04:28:43",
//     target: "web App",
//     location: "post",
//     log: "No value present",
//   },
//   {
//     name: "유저 #20",
//     utc: "2023-10-29T18:28:43",
//     target: "web App",
//     location: "post",
//     log: "No value present",
//   },
//   {
//     name: "유저 #21",
//     utc: "2023-08-29T08:28:43",
//     target: "window App",
//     location: "post",
//     log: "No value present",
//   },
// ]);
</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
}
</style>
