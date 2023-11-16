<template>
  <!-- 전체화면 패딩100px -->
  <div class="my-app">
    <!-- 데이터 선택창 -->
    <v-sheet style="height: 8vh; display: flex">
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="selectedvoyage"
            :items="voyage"
            label="voyage"
            variant="outlined"
          >
          </v-select>
        </v-col>
        <!-- 첫번째 선택박스 -->
        <v-col cols="2">
          <v-select
            v-model="firstSelectedItems"
            :items="firstSelect"
            label="Sub Components"
            variant="outlined"
            multiple
          >
            <template v-slot:selection="{ item, index }">
              <div v-if="index < 2">
                <span>{{ item.title }}</span>
                <!-- 선택된 항목이 2개 이상이고 현재 항목이 마지막 항목이 아니면 ','를 추가 -->
                <span
                  v-if="
                    firstSelectedItems.length > 1 &&
                    index !== firstSelectedItems.length - 1
                  "
                  >,
                </span>
                <span v-else-if="firstSelectedItems.length >= 3"> </span>
              </div>
              <span
                v-if="index === 2"
                class="text-grey text-caption align-self-center"
              >
                (+{{ firstSelectedItems.length - 2 }} others)
              </span>
            </template>
            <template v-slot:prepend-item>
              <v-list-item title="Select All" @click="selectAllItem1">
                <template v-slot:prepend>
                  <v-checkbox-btn
                    :color="likesSomeData1 ? 'indigo-darken-4' : undefined"
                    :indeterminate="likesSomeData1 && !likesAllData1"
                    :model-value="likesSomeData1"
                  ></v-checkbox-btn>
                </template>
              </v-list-item>

              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>

        <!-- 두번째 선택박스 -->
        <v-col cols="2">
          <v-select
            v-model="contentsSelectedItems"
            :items="secondSelect"
            label="Contents"
            variant="outlined"
            multiple
          >
            <template v-slot:selection="{ item, index }">
              <div v-if="index < 2">
                <span>{{ item.title }}</span>
                <!-- 선택된 항목이 2개 이상이고 현재 항목이 마지막 항목이 아니면 ','를 추가 -->
                <span
                  v-if="
                    contentsSelectedItems.length > 1 &&
                    index !== contentsSelectedItems.length - 1
                  "
                  >,
                </span>
                <span v-else-if="contentsSelectedItems.length >= 3"> </span>
              </div>
              <span
                v-if="index === 2"
                class="text-grey text-caption align-self-center"
              >
                (+{{ contentsSelectedItems.length - 2 }} others)
              </span>
            </template>
            <template v-slot:prepend-item>
              <v-list-item title="Select All" @click="selectAllItem2">
                <template v-slot:prepend>
                  <v-checkbox-btn
                    :color="likesSomeData2 ? 'indigo-darken-4' : undefined"
                    :indeterminate="likesSomeData2 && !likesAllData2"
                    :model-value="likesSomeData2"
                  ></v-checkbox-btn>
                </template>
              </v-list-item>

              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>

        <!-- 날짜 설정 -->
        <v-col cols="3">
          <VueDatePicker
            style="--dp-input-padding: 15px"
            v-model="date"
            range
          />
        </v-col>

        <!-- 검색 버튼 -->
        <v-col cols="2">
          <v-btn
            class=""
            color="blue"
            style="display: flex; margin-top: 2px; height: 50px; width: 130px"
            @click="searchData"
            >검색</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>

    <v-tabs
      style="height: 5vh; margin-left: 15px"
      v-model="tab"
      color="#009dff"
      align-tabs="start"
    >
      <!-- for문 사용해서 탭 늘리기 -->
      <v-tab :value="1">{{}}</v-tab>
      <v-tab :value="2">{{}}</v-tab>
      <v-tab :value="3">{{}}</v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      style="
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin-top: 8px;
      "
    >
      <v-window-item v-for="n in 3" :key="n" :value="n">
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <div v-if="tab === 1">
              <!-- Move v-if here -->
              <v-sheet style="height: 34vh; display: flex">
                <v-card :color="primary" :variant="elevated" style="flex: 1">
                  <v-card-item>
                    <v-data-table
                      v-model="selected"
                      v-model:page="page"
                      :items-per-page="itemsPerPage"
                      density="compact"
                      class="elevation-1"
                      :headers="headerName"
                      :items="dataSet"
                      :search="searchData"
                      item-value="name"
                      return-object
                      style="margin-top: 20px"
                    >
                      <template v-slot:bottom>
                        <div class="text-center pt-2">
                          <v-pagination
                            v-model="page"
                            :length="pageCount"
                          ></v-pagination>
                        </div>
                      </template>
                    </v-data-table>
                  </v-card-item>
                </v-card>
              </v-sheet>
            </div>
            <div v-if="tab === 2">
              <!-- Move v-if here -->
              <v-sheet style="height: 34vh; display: flex">
                <v-card :color="primary" :variant="elevated" style="flex: 1">
                  <v-card-item>
                    <v-data-table
                      v-model="selected"
                      v-model:page="page"
                      :items-per-page="itemsPerPage"
                      density="compact"
                      class="elevation-1"
                      :headers="headerName"
                      :items="dataSet"
                      :search="searchData"
                      item-value="name"
                      return-object
                      style="margin-top: 20px"
                    >
                      <template v-slot:bottom>
                        <div class="text-center pt-2">
                          <v-pagination
                            v-model="page"
                            :length="pageCount"
                          ></v-pagination>
                        </div>
                      </template>
                    </v-data-table>
                  </v-card-item>
                </v-card>
              </v-sheet>
            </div>
            <div v-if="tab === 3">
              <!-- Move v-if here -->
              <div class="component-container">
                <v-sheet style="height: 34vh; display: flex">
                  <v-card :color="primary" :variant="elevated" style="flex: 1">
                    <v-card-item>
                      <v-data-table
                        v-model="selected"
                        v-model:page="page"
                        :items-per-page="itemsPerPage"
                        density="compact"
                        class="elevation-1"
                        :headers="headerName"
                        :items="dataSet"
                        :search="searchData"
                        item-value="name"
                        return-object
                        style="margin-top: 20px"
                      >
                        <template v-slot:bottom>
                          <div class="text-center pt-2">
                            <v-pagination
                              v-model="page"
                              :length="pageCount"
                            ></v-pagination>
                          </div>
                        </template>
                      </v-data-table>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-window-item>
    </v-window>

    <div
      class="d-flex align-center justify-space-around pa-4"
      style="justify-content: flex-end"
    >
      <v-btn color="blue" @click="dataDownload">데이터 다운로드</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import axios from "axios";

const tab = ref(null);

const itemsPerPage = ref(10);
const page = ref(1);
const searchData = ref();

const headerName = ref([]); // 빈 배열로 초기화
const dataSet = ref([]); // 빈 배열로 초기화
const selectedData = ref([]);

const handleRowClick = (item) => {
  console.log("룰루");
  // 클릭된 행의 데이터 가져오기
  selectedData.value[0] = item.no;
  selectedData.value[1] = item.name;
  selectedData.value[2] = item.value;
  console.log("선택된 행 정보:", selectedData);
  alert(selectedData.value);
  alert(selectedData.value[0]);
};

const fetchData = () => {
  axios
    .post("http://192.168.0.24:8080/shipinfo/api/dgps/gll")
    .then((response) => {
      console.log(response.data);

      const dataheader = ref(
        Object.keys(response.data[0]).map((key) => ({
          title: key,
          align: "start",
          key,
        }))
      );

      if (dataheader.value == null) {
        console.log("null");
      } else {
        console.log(dataheader.value);
        headerName.value = dataheader.value;
      }

      // headerName.value = response.data.headers;
      dataSet.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

// 초기 데이터 요청 및 주기적 데이터 업데이트 설정
fetchData(); // 초기 데이터 요청

const pageCount = computed(() => {
  return Math.ceil(dataSet.value.length / itemsPerPage.value);
});

const allData = ref([
  {
    name: "GLL",
    top: "DGPS",
    info: "GPS 수신기의 현재 위치를 위도와 경도로 표현하는 역할을 합니다.",
  },
  {
    name: "GGA",
    top: "DGPS",
    info: "현재 위치, 위성 신호 품질, 해발고도 등의 정보를 제공하는 역할을 합니다.",
  },
  {
    name: "RMC",
    top: "DGPS",
    info: "GPS 수신기의 권장 최소 탐색 정보를 제공합니다.",
  },
  {
    name: "VTG",
    top: "DGPS",
    info: "현재 이동 방향과 지상 속도를 나타냅니다.",
  },
]);

console.log(dataSet);
console.log(allData);

// 항차 선택
const voyage = ref([
  "시운전1",
  "시운전2",
  "시운전3",
  "시운전4",
  "시운전5",
  "시운전6",
  "시운전7",
]);

const selectedvoyage = ref();

// 셀렉바 메뉴
const firstSelect = ref([
  "DGPS",
  "GYRO",
  "ANEMOMETER",
  "RADAR",
  "AIS",
  "ECDIS",
  "AUTOPILOT",
  "SPEEDLOG",
  "NO.1ENGINEPANEL",
  "NO.2ENGINEPANEL",
]);
const secondSelect = ref([]);
const firstSelectedItems = ref([]);
const contentsSelectedItems = ref([]);

//전체 선택
const likesAllData1 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData1 = computed(() => firstSelectedItems.value.length > 0);

const likesAllData2 = computed(
  () => contentsSelectedItems.value.length === secondSelect.value.length
);
const likesSomeData2 = computed(() => contentsSelectedItems.value.length > 0);

// 전체 선택
const selectAllItem1 = () => {
  if (likesAllData1.value) {
    console.log(`선택 : ${firstSelectedItems.value[0]}`);
    firstSelectedItems.value = [];
  } else {
    firstSelectedItems.value = [...firstSelect.value];
  }
};

const selectAllItem2 = () => {
  if (likesAllData2.value) {
    console.log(`선택 : ${contentsSelectedItems.value[0]}`);
    contentsSelectedItems.value = [];
  } else {
    contentsSelectedItems.value = [...secondSelect.value];
  }
};

// select1이 변경될 때 second 배열 업데이트
watchEffect(() => {
  secondSelect.value = []; // 기존 secondSelect 초기화
  contentsSelectedItems.value = [];
  if (firstSelectedItems.value.includes("DGPS")) {
    secondSelect.value.push("GLL", "GGA", "RMC", "VTG", "ZDA", "GSV", "GSA");
  }
  if (firstSelectedItems.value.includes("GYRO")) {
    secondSelect.value.push("THS", "HDT", "ROT");
  }
  if (firstSelectedItems.value.includes("ANEMOMETER")) {
    secondSelect.value.push("MWV", "MTW");
  }
  if (firstSelectedItems.value.includes("RADAR")) {
    secondSelect.value.push();
  }
  if (firstSelectedItems.value.includes("AIS")) {
    secondSelect.value.push("VDM", "VDO");
  }
  if (firstSelectedItems.value.includes("ECDIS")) {
    secondSelect.value.push("ROUTEINFO", "WAYPOINTS");
  }
  if (firstSelectedItems.value.includes("AUTOPILOT")) {
    secondSelect.value.push("RSA", "HTD");
  }
  if (firstSelectedItems.value.includes("SPEEDLOG")) {
    secondSelect.value.push("VBW", "VHW", "VLW");
  }
  if (firstSelectedItems.value.includes("NO.1ENGINEPANEL")) {
    secondSelect.value.push(
      "NO.1ENGINE_PANEL_61444",
      "NO.1ENGINE_PANEL_65262",
      "NO.1ENGINE_PANEL_65263",
      "NO.1ENGINE_PANEL_65272",
      "NO.1ENGINE_PANEL_65271",
      "NO.1ENGINE_PANEL_65253",
      "NO.1ENGINE_PANEL_65270",
      "NO.1ENGINE_PANEL_65276",
      "NO.1ENGINE_PANEL_65360",
      "NO.1ENGINE_PANEL_65361_LAMP",
      "NO.1ENGINE_PANEL_65361_STATUS",
      "NO.1ENGINE_PANEL_65378",
      "NO.1ENGINE_PANEL_65376",
      "NO.1ENGINE_PANEL_65379"
    );
  }
  if (firstSelectedItems.value.includes("NO.2ENGINEPANEL")) {
    secondSelect.value.push(
      "NO.2ENGINE_PANEL_61444",
      "NO.2ENGINE_PANEL_65262",
      "NO.2ENGINE_PANEL_65263",
      "NO.2ENGINE_PANEL_65272",
      "NO.2ENGINE_PANEL_65271",
      "NO.2ENGINE_PANEL_65253",
      "NO.2ENGINE_PANEL_65270",
      "NO.2ENGINE_PANEL_65276",
      "NO.2ENGINE_PANEL_65360",
      "NO.2ENGINE_PANEL_65361_LAMP",
      "NO.2ENGINE_PANEL_65361_STATUS",
      "NO.2ENGINE_PANEL_65378",
      "NO.2ENGINE_PANEL_65376",
      "NO.2ENGINE_PANEL_65379"
    );
  }
});

// 데이트 피커
const date = ref();

const startDate = new Date();
const endDate = new Date();
onMounted(() => {
  date.value = [startDate, endDate];
});

// 데이터 다운로드
const dataDownload = () => {
  alert("다운로드 시작");
};
</script>

<style scoped>
.my-app {
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
  height: 93vh;
}
</style>
