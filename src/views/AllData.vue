<template>
  <!-- 전체화면 패딩100px -->
  <div class="my-app">
    <v-data-iterator
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items="searchFilteredData"
      :sort-by="sortBy"
    >
      <!-- 검색창 구현 -->
      <template v-slot:header>
        <div class="d-flex flex-column mt-3">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="searchQuery"
                clearable
                hide-details
                prepend-inner-icon="mdi-magnify"
                placeholder="Search"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="selectedvoyage"
                :items="voyage"
                label="voyage"
                variant="outlined"
              >
              </v-select>
            </v-col>
          </v-row>
        </div>
        <div class="d-flex flex-column mt-3">
          <v-row>
            <!-- 첫번째 선택박스 -->
            <v-col cols="3">
              <v-select
                v-model="firstSelectedItems"
                :items="firstSelect"
                label="fisrt"
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
            <v-col cols="3">
              <v-select
                v-model="secondSelectedItems"
                :items="secondSelect"
                label="second"
                variant="outlined"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <div v-if="index < 2">
                    <span>{{ item.title }}</span>
                    <!-- 선택된 항목이 2개 이상이고 현재 항목이 마지막 항목이 아니면 ','를 추가 -->
                    <span
                      v-if="
                        secondSelectedItems.length > 1 &&
                        index !== secondSelectedItems.length - 1
                      "
                      >,
                    </span>
                    <span v-else-if="secondSelectedItems.length >= 3"> </span>
                  </div>
                  <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                  >
                    (+{{ secondSelectedItems.length - 2 }} others)
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
            <v-col cols="1">
              <v-btn
                class=""
                color="blue"
                style="display: flex; height: 50px; width: 100px"
                @click="searchData"
                >검색</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </template>

      <!-- 결과 없을 때 -->
      <template v-slot:no-data>
        <v-alert class="ma-2" type="warning">No results</v-alert>
      </template>

      <!-- 결과 컴포넌트 -->
      <template v-slot:default="props">
        <v-card
          v-for="item in props.items"
          :key="item.name"
          style="border: 1px solid #aaa"
        >
          <!-- <v-card-title class="subheading font-weight-bold">
                {{ item.raw.name }}
              </v-card-title>
              <v-divider></v-divider> -->

          <v-list density="compact">
            <v-list-item
              v-for="(key, index) in filteredKeys"
              :key="index"
              :title="key"
              :subtitle="String(item.raw[key.toLowerCase()])"
              :class="{ 'text-blue': sortKey === key.toLowerCase() }"
              @click="showTable(subtitle)"
            ></v-list-item>
          </v-list>
        </v-card>
      </template>

      <template v-slot:footer>
        <div class="d-flex align-center justify-space-around pa-4">
          <v-btn color="blue" @click="dataDownload">데이터 다운로드</v-btn>
          <v-spacer></v-spacer>
          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn icon size="small" @click="prevPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon size="small" class="ml-2" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-iterator>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";

const itemsPerPage = ref(3);
const page = ref(1);
const searchQuery = ref("");
const sortKey = ref("name");
const sortOrder = ref("asc");

// 데이터 검색
const searchData = () => {
  // alert(secondSelectedItems.value);
  searchQuery.value = secondSelectedItems.value.join(", ");
  console.log(date.value);
  const startDateFormatted = date.value[0].toISOString().slice(0, 19); // ISO 기준 시간
  const endDateFormatted = date.value[1].toISOString().slice(0, 19);
  console.log(startDateFormatted); //
  console.log(endDateFormatted); //
};

const keys = ref(["Name", "Top", "Info"]);
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

const filteredKeys = computed(() => {
  return keys.value;
});

const sortBy = computed(() => {
  return [
    {
      key: sortKey.value,
      order: sortOrder.value,
    },
  ];
});

const searchFilteredData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  // 검색어를 콤마로 분리하여 배열로 만듭니다
  const searchTerms = query.split(",").map((term) => term.trim());

  // 검색어 배열이 비어있을 경우 모든 데이터를 반환합니다
  if (searchTerms.length === 0) {
    return allData.value;
  }

  // 검색어 배열의 모든 검색어가 데이터 항목에 포함되어 있는지 확인하는 함수
  const anyTermsIncluded = (terms, item) => {
    return terms.some((term) => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.top.toLowerCase().includes(term) ||
        item.info.toLowerCase().includes(term)
      );
    });
  };
  console.log(
    allData.value.filter((item) => anyTermsIncluded(searchTerms, item))
  );
  // 검색어 배열을 사용하여 데이터를 필터링합니다.
  return allData.value.filter((item) => anyTermsIncluded(searchTerms, item));
});

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
const secondSelectedItems = ref([]);

//전체 선택
const likesAllData1 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData1 = computed(() => firstSelectedItems.value.length > 0);

const likesAllData2 = computed(
  () => secondSelectedItems.value.length === secondSelect.value.length
);
const likesSomeData2 = computed(() => secondSelectedItems.value.length > 0);

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
    console.log(`선택 : ${secondSelectedItems.value[0]}`);
    secondSelectedItems.value = [];
  } else {
    secondSelectedItems.value = [...secondSelect.value];
  }
};

// select1이 변경될 때 second 배열 업데이트
watchEffect(() => {
  secondSelect.value = []; // 기존 secondSelect 초기화
  secondSelectedItems.value = [];
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

const numberOfPages = computed(() => {
  return Math.ceil(allData.value.length / itemsPerPage.value);
});

const nextPage = () => {
  if (page.value + 1 <= numberOfPages.value) {
    page.value += 1;
  }
};

const prevPage = () => {
  if (page.value - 1 >= 1) {
    page.value -= 1;
  }
};

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

// 테이블 보이기
const showTable = (data) => {
  alert(data);
};
</script>

<style scoped>
.my-app {
  padding: 50px;
  padding-left: 100px;
  padding-right: 100px;
}
</style>
