<template>
  <v-row :style="{ backgroundColor: themeColor }">
    <v-col cols="4" :style="{ backgroundColor: themeColor }">
      <v-sheet
        class="manager-sheet"
        :style="{ backgroundColor: themeColor }"
        style="padding: 5px; margin-bottom: 30px"
      >
        <v-card
          class="scrollable-card"
          style="
            flex: 1;
            height: 75vh;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          "
        >
          <v-card-item>
            <v-row justify="space-between">
              <v-col cols="auto"> </v-col>
              <v-col cols="5">
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
              style="margin-top: 20px"
              v-model="selectedItems"
              class="elevation-1"
              :headers="userheaders"
              :items="items"
              density="compact"
              hide-default-footer
              item-key="userName"
              select-strategy="single"
              return-object
              show-select
            >
            </v-data-table-virtual>
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>

    <!-- ////////////////////////////////////// -->
    <v-col cols="8">
      <v-sheet
        class="manager-sheet"
        :style="{ backgroundColor: themeColor }"
        style="padding: 5px; margin-bottom: 30px"
      >
        <!-- <v-btn color="blue" @click="errorMethod">오류발생 버튼</v-btn> -->

        <v-card
          style="
            flex: 1;
            height: 75vh;
            padding: 10px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          "
        >
          <v-card-item style="padding-top: 10px">
            <v-window class="scrollable-card">
              <v-data-table-virtual :items="consoles" class="limited-height">
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.name }}</td>
                    <td>
                      <v-checkbox style="padding-top: 0px" v-model="item.td1"></v-checkbox>
                    </td>
                    <td>
                      <v-checkbox v-model="item.td2"></v-checkbox>
                    </td>
                    <td>
                      <v-checkbox v-model="item.td3"></v-checkbox>
                    </td>
                    <td>
                      <v-checkbox v-model="item.td4"></v-checkbox>
                    </td>
                  </tr>
                </template>
              </v-data-table-virtual>
            </v-window>
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, watchEffect, watch, onMounted } from "vue";
import { readUserData, readAppLogData } from "../../api/index.js";
import moment from "moment";
import { darkbackcolor, whitebackcolor } from "../../color/color.js";
// 다크모드
const themeMode = ref(localStorage.getItem("themeMode") || "light");

const themeColor = ref(themeMode.value === "light" ? "#f7f7f7" : "#424242");
watch(themeMode, (newValue) => {
  themeColor.value = newValue === "light" ? whitebackcolor : darkbackcolor;
});

const page = ref(1);
const itemsPerPage = ref(12);
const selectedItems = ref([]);

watch(selectedItems, (newSelectedItems) => {
  const userId = newSelectedItems.map((item) => item.userId);
  const userName = newSelectedItems.map((item) => item.userName);
  const userGroup = newSelectedItems.map((item) => item.department);
  console.log(`Selected userId: ${userId.join(", ")}`);
  console.log(`Selected userName: ${userName.join(", ")}`);
  console.log(`Selected useruserGroup: ${userGroup.join(", ")}`);
  let aa;
  console.log(aa);
  aa = null;
  console.log(aa);
});

const search = ref();

const selectionLog = ref(["Web Dashboard Log", "Window App Log"]);
const selectedLog = ref(selectionLog.value[0]);

const consoles = ref([
  {
    name: "DGPS",
    view: false,
    capture: false,
    download: false,
    td4: true,
  },
  {
    name: "GYRO",
    view: false,
    capture: true,
    download: false,
    td4: false,
  },
  {
    name: "ANEMOMETER",
    view: false,
    capture: true,
    download: false,
    td4: false,
  },
  {
    name: "RADAR",
    view: false,
    capture: false,
    download: false,
    td4: true,
  },
  {
    name: "AIS",
    view: false,
    capture: false,
    download: true,
    td4: false,
  },
  {
    name: "ECDIS",
    view: true,
    capture: false,
    download: false,
    td4: false,
  },
    {
    name: "ECDIS",
    view: true,
    capture: false,
    download: false,
    td4: false,
  },
  
]);

watchEffect(() => {
  console.log("selectedLog changed:", selectedLog.value);
});

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const tokenid = ref(sessionStorage.getItem("token") || "");

async function api() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1));
    }, 1000);
  });
}
async function load({ done }) {
  // Perform API call
  const res = await api();

  items.value.push(...res);

  done("ok");
}

const userheaders = ref([
  { title: "사용자 아이디", key: "userId" },
  { title: "이름", key: "userName" },
  { title: "소속", key: "department" },
]);

const checkheaders = ref([
  { text: "Name", value: "name" },
  { text: "데이터 분석", value: "td1" },
  { text: "분석 데이터 캡쳐", value: "td2" },
  { text: "데이터 조회", value: "td3" },
  { text: "데이터 다운로드", value: "td4" },
]);

const items = ref([]);

const userData = async () => {
  try {
    console.log("시작");
    const response = await readUserData(tokenid.value);
    console.log("끝");
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const koreanTime = moment(response[i].timeStamp)
        .add(0, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
      items.value.push({
        userId: response[i].id || "",
        userName: response[i].userName || "",
        userGroup: response[i].userGroup || "",
        department: response[i].department || "",
        phoneNumber: response[i].phoneNumber || "",
        description: response[i].description || "",
        email: response[i].email || "",
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

onMounted(() => {
  // 컴포넌트가 마운트될 때 실행되는 코드
  userData();
});
</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
}
.table-row {
  padding-top: 4px; /* 원하는 패딩 값으로 조정 */
  padding-bottom: 4px; /* 원하는 패딩 값으로 조정 */
}
.table-row td {
  padding: 5px; /* 간격을 줄이는데 사용되는 패딩 값 */
}

.limited-height tr {
  max-height: 20px;
}
</style>
