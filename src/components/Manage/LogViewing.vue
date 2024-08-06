<template>
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
          <v-row
            align="center"
            style="height: 5vh; margin-top: 10px; margin-left: 10px"
          >
            <v-col
              cols="auto"
              class="d-flex align-center clickable"
              @click="searchFilterDialog = true"
            >
              <span>{{ showText }}</span>
              <v-icon style="margin-left: 4px">mdi-chevron-down</v-icon>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-window class="scrollable-card">
        <v-data-table
          style="margin-top: 20px"
          v-model:page="page"
          class="elevation-1"
          :headers="headers"
          :search="search"
          :items="filteredItems"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :density="'dense'"
          return-object
        >
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="9"
                rounded="circle"
              ></v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-window>
    </v-card-item>
  </v-card>
  <v-dialog v-model="searchFilterDialog" max-width="500">
    <v-card>
      <v-card-title>조회 조건 설정</v-card-title>
      <v-card-text style="padding-bottom: 0">
        <v-container>
          <v-row>
            <v-col cols="12"
              ><p style="font-size: 13px; margin-bottom: 0">기간선택</p></v-col
            >
            <v-col cols="12" style="padding-top: 0">
              <v-btn-toggle v-model="filter_date" mandatory style="width: 100%">
                <v-btn
                  value="3일"
                  style="width: 25%; border: 1px solid #ccc; padding: 5px"
                  >3일</v-btn
                >
                <v-btn
                  value="7일"
                  style="width: 25%; border: 1px solid #ccc; padding: 5px"
                  >7일</v-btn
                >
                <v-btn
                  value="30일"
                  style="width: 25%; border: 1px solid #ccc; padding: 5px"
                  >30일</v-btn
                >
                <v-btn
                  value="직접입력"
                  style="width: 25%; border: 1px solid #ccc; padding: 5px"
                  >직접입력</v-btn
                >
              </v-btn-toggle>
              <VueDatePicker
                v-if="filter_date === '직접입력'"
                v-model="dateRange"
                density="compact"
                range
                :enableTimePicker="false"
                style="padding-top: 5px"
                @open="adjustDialogHeight()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"
              ><p style="font-size: 13px; margin-bottom: 0">로그선택</p></v-col
            >
            <v-col cols="12" style="padding-top: 0">
              <v-btn-toggle
                v-model="filter_logtype"
                mandatory
                style="width: 100%"
              >
                <v-btn
                  value="webapp"
                  style="width: 50%; border: 1px solid #ccc; padding: 5px"
                  >웹 서버</v-btn
                >
                <v-btn
                  value="winapp"
                  style="width: 50%; border: 1px solid #ccc; padding: 5px"
                  >윈도우 앱</v-btn
                >
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :icon="rsShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="rsShow = !rsShow"
        ></v-btn>
        <p style="color: grey">자세히</p>
        <v-spacer></v-spacer>
        <v-btn
          v-show="!rsShow"
          color="blue-darken-1"
          variant="text"
          @click="filterCancle()"
          >취소</v-btn
        >
        <v-btn
          v-show="!rsShow"
          color="blue-darken-1"
          variant="text"
          @click="filterApply()"
          >적용</v-btn
        >
      </v-card-actions>
      <v-expand-transition>
        <div v-show="rsShow">
          <v-divider></v-divider>

          <v-card-text
            style="padding: 40px; padding-bottom: 0px; padding-top: 10px"
          >
            <v-container>
              <v-row v-if="filter_logtype === 'webapp'">
                <v-col cols="12"
                  ><p style="font-size: 13px; margin-bottom: 0">
                    Method 선택
                  </p></v-col
                >
                <v-col cols="12" style="padding-top: 0">
                  <v-btn-toggle
                    v-model="filter_method"
                    mandatory
                    style="width: 100%"
                  >
                    <v-btn
                      value="all"
                      style="width: 20%; border: 1px solid #ccc; padding: 5px"
                      >all</v-btn
                    >
                    <v-btn
                      value="get"
                      style="width: 20%; border: 1px solid #ccc; padding: 5px"
                      >get</v-btn
                    >
                    <v-btn
                      value="post"
                      style="width: 20%; border: 1px solid #ccc; padding: 5px"
                      >post</v-btn
                    >
                    <v-btn
                      value="put"
                      style="width: 20%; border: 1px solid #ccc; padding: 5px"
                      >put</v-btn
                    >
                    <v-btn
                      value="delete"
                      style="width: 20%; border: 1px solid #ccc; padding: 5px"
                      >delete</v-btn
                    >
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row v-if="filter_logtype === 'winapp'">
                <v-col cols="12"
                  ><p style="font-size: 13px; margin-bottom: 0">
                    Type 선택
                  </p></v-col
                >
                <v-col cols="12" style="padding-top: 0">
                  <v-btn-toggle
                    v-model="filter_type"
                    mandatory
                    style="width: 100%"
                  >
                    <v-btn
                      value="all"
                      style="width: 25%; border: 1px solid #ccc; padding: 5px"
                      >all</v-btn
                    >
                    <v-btn
                      value="Operation"
                      style="width: 33%; border: 1px solid #ccc; padding: 5px"
                      >Operation</v-btn
                    >
                    <v-btn
                      value="ConnectStatus"
                      style="width: 42%; border: 1px solid #ccc; padding: 5px"
                      >ConnectStatus</v-btn
                    >
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12"
                  ><p style="font-size: 13px; margin-bottom: 0">
                    keyword 선택
                  </p></v-col
                >
                <v-col cols="12" style="padding-top: 0">
                  <v-text-field
                    v-model="searchInput"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="filterCancle()"
              v-show="rsShow"
              >취소</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="filterApply()"
              v-show="rsShow"
              >설정</v-btn
            >
          </v-card-actions>
        </div>
      </v-expand-transition>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watchEffect, watch, onMounted, nextTick } from "vue";
import { readWebLogData, readAppLogData } from "../../api/index.js";
import moment from "moment";
import dayjs from "dayjs";

const page = ref(1);
const itemsPerPage = ref(20);

const search = ref("");
const searchInput = ref("");

// ----------------------------- 조회 조건 검색 다이어로그 ----------------------------- //
const showText = ref("3일 · 웹 서버 · 전체");
const searchFilterDialog = ref(false);
const rsShow = ref(false);

const filter_date = ref("3일");
const filter_logtype = ref("webapp");
const filter_method = ref("all");
const filter_type = ref("all");

const search_method = ref("");

// text
const text_app = ref("");
const text_method = ref("");

const startTime = ref();
const endTime = ref();
// 시간 구하기
const dateRange = ref();
const updateTimes = () => {
  const now = dayjs();
  if (filter_date.value === "3일") {
    startTime.value = now
      .subtract(3, "day")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    endTime.value = now.endOf("day").format("YYYY-MM-DD HH:mm:ss");
  } else if (filter_date.value === "7일") {
    startTime.value = now
      .subtract(7, "day")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    endTime.value = now.endOf("day").format("YYYY-MM-DD HH:mm:ss");
  } else if (filter_date.value === "30일") {
    startTime.value = now
      .subtract(30, "day")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    endTime.value = now.endOf("day").format("YYYY-MM-DD HH:mm:ss");
  }
};

const updateManualTimes = () => {
  if (dateRange.value.length === 2) {
    startTime.value = dayjs(dateRange.value[0])
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    endTime.value = dayjs(dateRange.value[1])
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
  }
};

watch(filter_date, updateTimes, { immediate: true });
watch(dateRange, updateManualTimes);

const filterCancle = () => {
  searchFilterDialog.value = false;
};

const filterApply = () => {
  if (
    (filter_method.value === "all" && filter_logtype.value === "webapp") ||
    (filter_type.value === "all" && filter_logtype.value === "winapp")
  ) {
    search_method.value = "";
    text_method.value = "전체";
    console.log("1");
  } else if (
    filter_method.value != "all" &&
    filter_logtype.value === "webapp"
  ) {
    search_method.value = `&request_method=${filter_method.value}`;
    text_method.value = filter_method.value;
    console.log("2");
  } else if (filter_type.value != "all" && filter_logtype.value === "winapp") {
    search_method.value = `&type=${filter_type.value}`;
    text_method.value = filter_type.value;
    console.log("3");
  } else {
    console.log("망함 ㅋㅋ");
  }

  console.log(search_method.value);

  if (filter_logtype.value === "webapp") {
    headers.value = [
      { title: "timestamp", key: "timestamp" },
      { title: "type", key: "type" },
      { title: "method", key: "method" },
      { title: "state", key: "state" },
      { title: "url", key: "url" },
      { title: "log", key: "log" },
    ];
  } else {
    headers.value = [
      { title: "timestamp", key: "timestamp" },
      { title: "type", key: "type" },
      { title: "details", key: "details" },
      { title: "log", key: "log" },
    ];
  }

  webData();
  search.value = searchInput.value;
  text_app.value = filter_logtype.value === "webapp" ? "웹 서버" : "윈도우 앱";
  showText.value = `${filter_date.value} · ${text_app.value} · ${text_method.value}`;
};

// --------------------------

const selectionLog = ref(["Web Dashboard Log", "Window App Log"]);
const selectedLog = ref(selectionLog.value[0]);

const pageCount = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value);
});

const filteredItems = computed(() => {
  if (!search.value) {
    return items.value;
  }
  return items.value.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

const tokenid = ref(sessionStorage.getItem("token") || "");

const items = ref([]);

const headers = ref([
  { title: "timestamp", key: "timestamp" },
  { title: "type", key: "type" },
  { title: "method", key: "method" },
  { title: "state", key: "state" },
  { title: "url", key: "url" },
  { title: "log", key: "log" },
]);

const webData = async () => {
  items.value = [];
  let apiReq = `${filter_logtype.value}?start_time=${startTime.value}&end_time=${endTime.value}${search_method.value}`;
  try {
    const response = await readWebLogData(tokenid.value, apiReq);
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      items.value.push({
        timestamp: response[i].timeStamp || "",
        details: response[i].details || "",
        // id: response[i].userId || "",
        type: response[i].type || "",
        method: response[i].requestMethod || "",
        state: response[i].statusCode || "",
        url: response[i].requestUrl || "",
        log: response[i].log || "",
      });
      // items.value.push(response.data[i]);
    }
    items.value.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA;
    });
  } catch (error) {
    console.error(error);
  }
};

const dialogHeight = ref("auto");
const isDatePickerOpen = ref(false);
const dialogStyle = ref({});

const adjustDialogHeight = () => {
  alert("열림!");
  dialogStyle.value = { height: "500px" };
};

// const resetDialogHeight = () => {
//   alert("닫힘!");
// };

// watch(isDatePickerOpen, async (newValue, oldValue) => {
//   if (newValue === true) {
//     await nextTick(); // 다음 DOM 업데이트 후 실행
//     isDatePickerOpen.value = true;
//   } else {
//     isDatePickerOpen.value = false;
//   }
// });

watch(filter_date, async (newValue, oldValue) => {
  if (newValue === "직접입력") {
    isDatePickerOpen.value = true;
    alert("1");
  } else {
    isDatePickerOpen.value = false;
    alert("2");
  }
});

// watch(isDatePickerOpen, async (newValue) => {
//   if (!newValue) {
//     await nextTick(); // 다음 DOM 업데이트 후 실행
//     resetDialogHeight();
//   }
// });

onMounted(() => {
  // 컴포넌트가 마운트될 때 실행되는 코드
  webData();
});
</script>

<style scoped>
.log-table {
  width: 100%;
  overflow-x: auto;
}

.log-table .v-data-table__wrapper {
  overflow-x: auto;
}

.log-table .v-data-table__wrapper table {
  table-layout: fixed;
  width: 100%;
}

.log-table .v-data-table__wrapper th,
.log-table .v-data-table__wrapper td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 150px; /* Adjust this value as needed */
}

.log-table .v-data-table__wrapper th:nth-child(6),
.log-table .v-data-table__wrapper td:nth-child(6) {
  max-width: 400px; /* Adjust this value for the log column */
}
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
}

.clickable:hover {
  cursor: pointer; /* 커서가 손가락 모양으로 변경 */
}
</style>
