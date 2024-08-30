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
      <v-row
        align="center"
        justify="space-between"
        style="height: 5vh; margin-top: 15px; margin-left: 10px"
      >
        <v-col cols="auto" style="padding-top: 0px">
          <v-btn-toggle
            v-model="filter_date"
            mandatory
            style="width: 280px; height: 40px"
          >
            <v-btn
              value="3일"
              style="width: 20%; border: 1px solid #ccc; padding: 5px"
              >3일</v-btn
            >
            <v-btn
              value="7일"
              style="width: 20%; border: 1px solid #ccc; padding: 5px"
              >7일</v-btn
            >
            <v-btn
              value="30일"
              style="width: 20%; border: 1px solid #ccc; padding: 5px"
              >30일</v-btn
            >
            <v-btn
              value="직접입력"
              style="width: 30%; border: 1px solid #ccc; padding: 5px"
              >직접입력</v-btn
            >
          </v-btn-toggle>
        </v-col>
        <v-col
          v-if="filter_date === '직접입력'"
          cols="auto"
          style="padding-top: 0px"
        >
          <VueDatePicker
            v-model="dateRange"
            density="compact"
            range
            :enableTimePicker="false"
            style="z-index: 1200"
            @open="adjustDialogHeight()"
          />
        </v-col>

        <v-col cols="auto" style="padding-top: 0px">
          <v-btn-toggle
            v-model="filter_logtype"
            mandatory
            style="width: 200px; height: 40px"
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

        <v-col cols="auto" style="padding-top: 0px">
          <v-btn
            style="width: 100px"
            color="blue-darken-1"
            @click="filterApply()"
            >적용</v-btn
          ></v-col
        >

        <v-col cols="auto" style="padding-top: 0px">
          <v-btn
            style="width: 150px"
            color="blue-darken-1"
            @click="downloadCSV()"
            >로그 다운로드</v-btn
          ></v-col
        >

        <v-col cols="auto" style="padding-top: 0px; margin-left: auto">
          <v-text-field
            style="width: 300px"
            v-model="searchInput"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="underlined"
            hide-details
            single-line
          ></v-text-field>
        </v-col>

        <!-- <v-col
          cols="auto"
          class="d-flex align-center clickable"
          @click="searchFilterDialog = true"
        >
          <span>{{ showText }}</span>
          <v-icon style="margin-left: 4px">mdi-chevron-down</v-icon>
        </v-col> -->
      </v-row>
      <v-window class="scrollable-card">
        <v-data-table
          style="margin-top: 40px; height: 64vh"
          v-model:page="page"
          class="elevation-1"
          :headers="headers"
          :search="search"
          :items="filteredItems"
          :items-per-page="itemsPerPage"
          hide-default-footer
          :density="'dense'"
          return-object
          @click:row="handleRowClick"
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

  <!-- 클릭 시 -->
  <v-dialog v-model="detailLog" max-width="800" closable>
    <v-card>
      <v-card-title style="padding-bottom: 0px; font-size: 18px"
        >자세히</v-card-title
      >
      <v-card-text style="padding-bottom: 0px">
        <v-container style="padding-bottom: 0px; padding-top: 0px">
          <p style="font-size: 14px">{{ showDetail }}</p>
        </v-container>
      </v-card-text>
      <v-card-actions style="padding-top: 0px">
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="detailLog = false"
          >확인</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watchEffect, watch, onMounted, nextTick } from "vue";
import { readWebLogData, readAppLogData } from "../../api/index.js";
import moment from "moment";
import dayjs from "dayjs";

const page = ref(1);
const itemsPerPage = ref(22);

const search = ref("");
const searchInput = ref("");

// ----------------------------- 조회 조건 검색 다이어로그 ----------------------------- //
const showText = ref("3일 · 웹 서버 · 전체");
const searchFilterDialog = ref(false);
const detailLog = ref(false);
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
  // dateRange.value가 존재하고 배열이며 길이가 2인지 확인
  if (Array.isArray(dateRange.value) && dateRange.value.length === 2) {
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
  } else if (
    filter_method.value != "all" &&
    filter_logtype.value === "webapp"
  ) {
    search_method.value = `&request_method=${filter_method.value}`;
    text_method.value = filter_method.value;
  } else if (filter_type.value != "all" && filter_logtype.value === "winapp") {
    search_method.value = `&type=${filter_type.value}`;
    text_method.value = filter_type.value;
  } else {
    console.log("no");
  }

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
  console.log(items);
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
    response.forEach((logEntry) => {
      let logText = logEntry.log || "";

      // 원본 로그를 저장
      let originalLog = logText;

      // log가 75자 이상인 경우 자르기
      if (logText.length > 75) {
        logText = logText.slice(0, 73) + "...";
      }

      // items에 잘린 log와 원본 log 모두 추가
      items.value.push({
        timestamp: logEntry.timeStamp || "",
        type: logEntry.type || "",
        method: logEntry.requestMethod || "",
        state: logEntry.statusCode || "",
        url: logEntry.requestUrl || "",
        log: logText, // 잘린 log
        originalLog: originalLog, // 원본 log
      });
    });

    console.log(items.value.originalLog);

    // 날짜 기준으로 정렬
    items.value.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } catch (error) {
    console.error(error);
  }
};

const dialogHeight = ref("auto");
const isDatePickerOpen = ref(false);
const dialogStyle = ref({});

const adjustDialogHeight = () => {
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
  } else {
    isDatePickerOpen.value = false;
  }
});

watch(searchInput, async (newValue, oldValue) => {
  search.value = searchInput.value;
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

// CSV 파일 다운로드 함수
const downloadCSV = () => {
  console.log(items.value);
  // CSV 데이터 생성
  const csvContent = createCSV(items.value);

  // Blob 생성
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // 가상 링크를 생성하여 다운로드
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "log.csv");
  document.body.appendChild(link);

  link.click(); // 다운로드 실행
  document.body.removeChild(link); // 링크 제거
};

// CSV 데이터를 생성하는 함수
const createCSV = (data) => {
  // 헤더 생성
  const header = "timestamp,type,method,state,url,originalLog\n";

  // 데이터 생성
  const rows = data
    .map((row) => {
      return `${row.timestamp},${row.type},${row.method},${row.state},${row.url},${row.originalLog}`;
    })
    .join("\n");

  return header + rows;
};

const showDetail = ref("");
// Method to handle row click
const handleRowClick = (item, index) => {
  // if (index.item.log != index.item.originalLog) {
  detailLog.value = true;
  // }
  showDetail.value = index.item.originalLog;
  console.log(index.item.log);
  console.log(index.item.originalLog);
};
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
