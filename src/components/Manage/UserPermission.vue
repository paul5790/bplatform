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
              <table>
                <thead>
                  <tr>
                    <th>신호명</th>
                    <th>view</th>
                    <th>capture</th>
                    <th>download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background-color: #f6f2f2">
                    <td>ALL</td>
                    <td>
                      <input
                        type="checkbox"
                        v-model="allView"
                        @change="toggleAll('view')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        v-model="allCapture"
                        @change="toggleAll('capture')"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        v-model="allDownload"
                        @change="toggleAll('download')"
                      />
                    </td>
                  </tr>
                  <tr v-for="(item, index) in permission" :key="index">
                    <td>{{ item.name }}</td>
                    <td>
                      <input type="checkbox" v-model="item.view" />
                    </td>
                    <td>
                      <input type="checkbox" v-model="item.capture" />
                    </td>
                    <td>
                      <input type="checkbox" v-model="item.download" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-window>
          </v-card-item>
          <div style="display: flex; justify-content: right; padding: 10px">
            <v-btn variant="tonal" style="width: 220px; font-weight: bold">
              저장
            </v-btn>
          </div>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, watchEffect, watch, onMounted } from "vue";
import { readUserData, readAppLogData } from "../../api/index.js";
import moment from "moment";
import { themeMode, themeConfig } from "@/utils/theme.js";

const { themeColor } = themeConfig;

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

// --------------------- 전체 데이터 관리 -------------------------------
const allView = ref(false);
const allCapture = ref(false);
const allDownload = ref(false);

// --------------------- 데이터 셋 -------------------------------

const permission = ref([
  { name: "DGPS", view: true, capture: false, download: false },
  { name: "GYRO", view: false, capture: true, download: false },
  { name: "ANEMOMETER", view: false, capture: true, download: false },
  { name: "RADAR", view: false, capture: false, download: false },
  { name: "AIS", view: false, capture: false, download: true },
  { name: "ECDIS", view: true, capture: false, download: false },
  { name: "AUTOPILOT", view: false, capture: false, download: false },
  { name: "SPEEDLOG", view: false, capture: false, download: false },
  { name: "CANTHROTTLE", view: false, capture: false, download: false },
  { name: "AUTOPILOTCONTACT", view: false, capture: false, download: false },
  { name: "NO.1ENGINEPANEL", view: false, capture: false, download: false },
  { name: "NO.2ENGINEPANEL", view: false, capture: false, download: false },
  { name: "MTIE1.ISA", view: false, capture: false, download: false },
  { name: "MTIE5.VDGS", view: false, capture: false, download: false },
  { name: "MTIE5.DBS", view: false, capture: false, download: false },
  { name: "MOF1.ANS", view: false, capture: false, download: false },
  { name: "MOF2.SYNC", view: false, capture: false, download: false },
  { name: "MOF1.GNW", view: false, capture: false, download: false },
  { name: "MTIE5.SAS", view: false, capture: false, download: false },
  {
    name: "MTIE4.XINNOS_VDGS_EMUL",
    view: false,
    capture: false,
    download: false,
  },
  {
    name: "MTIE4.XINNOS_STAS_EMUL",
    view: false,
    capture: false,
    download: false,
  },
  { name: "MTIE4.XINNOS_STAS", view: false, capture: false, download: false },
  { name: "MTIE4.XINNOS_VDGS", view: false, capture: false, download: false },
  { name: "MANAGEMENT", view: false, capture: false, download: false },
  { name: "RUDDER", view: false, capture: false, download: false },
  { name: "ENGINE", view: false, capture: false, download: false },
  { name: "MODE", view: false, capture: false, download: false },
]);

const toggleAll = (type) => {
  const isChecked =
    type === "view"
      ? allView.value
      : type === "capture"
      ? allCapture.value
      : allDownload.value;
  permission.value.forEach((item) => {
    item[type] = isChecked;
  });
};

// watch를 사용하여 모든 체크박스가 동일한지 확인
watch(
  permission,
  (newVal) => {
    allView.value = newVal.every((item) => item.view);
    allCapture.value = newVal.every((item) => item.capture);
    allDownload.value = newVal.every((item) => item.download);
  },
  { deep: true }
);

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
  { text: "Name", key: "name" },
  { text: "데이터 조회", key: "view" },
  { text: "분석 데이터 캡쳐", key: "capture" },
  { text: "데이터 다운로드", key: "download" },
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}
</style>
