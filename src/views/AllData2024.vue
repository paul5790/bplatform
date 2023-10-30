<template>
  <!-- 전체화면 패딩100px -->
  <div style="padding: 100px; height: 100vh">
    <v-data-iterator
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :items="allData"
      :search="search"
      :sort-by="sortBy"
    >
      <!-- 검색창 구현 -->
      <template v-slot:header>
        <v-text-field
          style="width: 50%"
          v-model="search"
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          variant="outlined"
          density="comfortable"
        ></v-text-field>

        <!-- 버튼 그룹 -->
        <div class="d-flex flex-column mt-5">
          <v-btn-toggle v-model="dataSelect" color="blue" mandatory>
            <v-btn style="border: 1px solid #aaa" value="allbtn">전체</v-btn>
            <v-btn style="border: 1px solid #aaa" value="onboard"
              >선내데이터</v-btn
            >
            <v-btn style="border: 1px solid #aaa" value="control"
              >관제데이터</v-btn
            >
          </v-btn-toggle>
        </div>

        <!-- <v-sheet>
          <v-checkbox
            v-for="label in keys"
            :key="label"
            :value="label"
            v-model="selectedItems"
            :label="label"
          ></v-checkbox>
        </v-sheet>

        {{ selectedItems }} -->

        <!-- 선택 리스트 기능 -->
        <div class="d-flex flex-column mt-5">
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

            <!-- 세번째 선택박스 -->
            <v-col cols="3">
              <v-select
                v-model="thirdSelectedItems"
                :items="thirdSelect"
                label="third"
                variant="outlined"
                multiple
              >
                <template v-slot:prepend-item>
                  <v-list-item title="Select All" @click="selectAllItem3">
                    <template v-slot:prepend>
                      <v-checkbox-btn
                        :color="likesSomeData3 ? 'indigo-darken-4' : undefined"
                        :indeterminate="likesSomeData3 && !likesAllData3"
                        :model-value="likesSomeData3"
                      ></v-checkbox-btn>
                    </template>
                  </v-list-item>

                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>

            <!-- 검색 버튼 -->
            <v-col cols="1">
              <v-btn class="" color="blue" style="display: flex; height: 50px; width: 100px;">검색</v-btn>
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
            <v-card v-for="item in props.items"
            :key="item.name" style="border: 1px solid #aaa;">
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
                ></v-list-item>
              </v-list>
            </v-card>
      </template>

      <template v-slot:footer>
        <div class="d-flex align-center justify-space-around pa-4">
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
import { ref, computed, watchEffect } from "vue";

const itemsPerPage = ref(3);
const page = ref(1);
const search = ref("");
const sortKey = ref("name");
// const selectedItems = ref([]);

// 버튼 그룹
const dataSelect = ref("allbtn");

// 셀렉바 메뉴
const firstSelect = ref([]);
const secondSelect = ref([]);
const thirdSelect = ref([]);
const firstSelectedItems = ref([]);
const secondSelectedItems = ref([]);
const thirdSelectedItems = ref([]);

const resetItems = () => {
  firstSelectedItems.value = [];
  secondSelectedItems.value = [];
  thirdSelectedItems.value = [];
};

const likesAllData1 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData1 = computed(() => firstSelectedItems.value.length > 0);

const likesAllData2 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData2 = computed(() => firstSelectedItems.value.length > 0);

const likesAllData3 = computed(
  () => firstSelectedItems.value.length === firstSelect.value.length
);
const likesSomeData3 = computed(() => firstSelectedItems.value.length > 0);

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

const selectAllItem3 = () => {
  if (likesAllData3.value) {
    console.log(`선택 : ${thirdSelectedItems.value[0]}`);
    thirdSelectedItems.value = [];
  } else {
    thirdSelectedItems.value = [...thirdSelect.value];
  }
};

// 버튼 그룹이 변경될 때 first 배열 업데이트
watchEffect(() => {
  if (dataSelect.value === "onboard") {
    firstSelect.value = [
      "Ship Information",
      "Kass Information",
      "SYS Information",
    ];
    resetItems();
    console.log(`선내, ${firstSelect.value}`);
  } else if (dataSelect.value === "control") {
    firstSelect.value = ["Control Data"];
    resetItems();
    console.log(`관제, ${firstSelect.value}`);
  } else {
    firstSelect.value = [
      "Ship Information",
      "Kass Information",
      "SYS Information",
      "Control Data",
    ];
    resetItems();
    console.log(`올, ${firstSelect.value}`);
  }
});

// select1이 변경될 때 second 배열 업데이트
watchEffect(() => {
  secondSelect.value = []; // 기존 secondSelect 초기화
  secondSelectedItems.value = [];
  if (firstSelectedItems.value.includes("Ship Information")) {
    secondSelect.value.push("쉽1", "쉽2", "쉽3");
  }
  if (firstSelectedItems.value.includes("Kass Information")) {
    secondSelect.value.push("카스1", "카스2", "카스3");
  }
  if (firstSelectedItems.value.includes("SYS Information")) {
    secondSelect.value.push("sys1", "sys2", "sys3");
  }
  if (firstSelectedItems.value.includes("Control Data")) {
    secondSelect.value.push("cd1", "cd2", "cd3");
  }

  
});

const keys = ref([
  "Name",
  "Top",
  "Info",
]);
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
    info: "현재 이동 방향과 지상 속도를 나타냅니다."
  },
]);

const numberOfPages = computed(() => {
  return Math.ceil(allData.value.length / itemsPerPage.value);
});

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

const sortOrder = ref("asc");

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
</script>
