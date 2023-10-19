<template>
  <v-row>
    <v-col cols="3">
      <v-sheet
        style="
          height: 100vh;
          padding: 30px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        "
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <div>
              <v-select
                v-model="runitem"
                :items="trialrun"
                density="compact"
                label="Compact"
                variant="outlined"
                style="margin-top: 30vh"
              ></v-select>

              <v-select
                v-model="selectedItem"
                :items="items1"
                density="compact"
                label="Compact"
                variant="outlined"
              ></v-select>

              <v-select
                v-model="selectedItem2"
                :items="itmes2"
                density="comfortable"
                label="Comfortable"
                variant="outlined"
              ></v-select>

              <v-select
                v-model="selectedItem3"
                :items="items3"
                density="comfortable"
                label="Default"
                variant="outlined"
              ></v-select>
              <v-btn-toggle v-model="toggle" divided variant="outlined">
                <v-btn icon="mdi-format-align-right"></v-btn>
                <v-btn icon="mdi-format-align-left"></v-btn>
              </v-btn-toggle>
              <v-btn-toggle v-model="toggle" divided variant="outlined">
                <v-btn icon="mdi-format-align-right"></v-btn>
              </v-btn-toggle></div
          ></v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="9">
      <v-sheet
        style="
          height: 85vh;
          padding: 1px;
          margin-top: 30px;
          padding-right: 30px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          align-items: end;
        "
      >
        <v-sheet style="display: flex; flex-direction: row;">
          <v-data-table
          style="margin: 20px;"
            v-model:page="page"
            class="elevation-1"
            :headers="headers"
            :items="desserts"
            :items-per-page="itemsPerPage"
            hide-default-footer
            item-value="name"
          >
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </template>
          </v-data-table>

          <v-data-table
          style="margin: 20px;"
            v-model:page="page"
            class="elevation-1"
            :headers="headers"
            :items="desserts"
            :items-per-page="itemsPerPage"
            hide-default-footer
            item-value="name"
          >
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-sheet>

        <v-data-table
          v-model:page="page"
          class="elevation-1"
          :headers="headers"
          :items="desserts"
          :items-per-page="itemsPerPage"
          hide-default-footer
          item-value="name"
        >
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </template>
        </v-data-table>
        <v-data-table
          style="margin-left: 10px"
          v-model:page="page1"
          class="elevation-1"
          :headers="headers"
          :items="desserts"
          :items-per-page="itemsPerPage"
          hide-default-footer
          item-value="name"
        >
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination v-model="page1" :length="pageCount1"></v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-sheet>
      <v-sheet
        style="
          height: 15vh;
          padding: 10px;
          padding-right: 30px;
          display: flex;
          align-items: start;
          justify-content: end;
        "
      >
        <v-btn @click="exportToExcel()">엑셀 다운</v-btn>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import * as XLSX from "xlsx";

// 왼쪽 셀렉바 설정
const trialrun = ref(["시운전1", "시운전2", "시운전3", "시운전4"]);
const runitem = ref(null);

const items1 = ref(["선내데이터", "관제데이터", "엔진데이터", "KASS데이터"]);
const selectedItem = ref(null);

const itmes2 = ref([]);
const Onboarddata = ref(["DGPS", "GYRO", "ANEMOMETER", "RADAR"]);
const Controldata = ref(["AIS", "VHF", "기상 정보", "물표 정보"]);
const selectedItem2 = ref(null);

const items3 = ref([]);
const DGPSdata = ref(["GLL", "GGA", "RMC", "VTG", "ZDA", "DTM"]);
const GYROdata = ref(["THS", "HDT", "ROT"]);
const AISdata = ref(["VDM", "VDO"]);
const selectedItem3 = ref(null);

const updateItems2 = () => {
  if (selectedItem.value === "선내데이터") {
    itmes2.value = Onboarddata.value;
  } else if (selectedItem.value === "관제데이터") {
    itmes2.value = Controldata.value;
  } else {
    itmes2.value = [];
  }
};

const updateItems3 = () => {
  if (selectedItem2.value === "DGPS") {
    items3.value = DGPSdata.value;
  } else if (selectedItem2.value === "GYRO") {
    items3.value = GYROdata.value;
  } else if (selectedItem2.value === "AIS") {
    items3.value = AISdata.value;
  } else if (selectedItem2.value === "시운전2-2") {
    items3.value = ["시운전2-2-1", "시운전2-2-2"];
  } else {
    items3.value = ["비어있음"];
  }
};

// selectedItem이 변경될 때마다 selectedItem2와 selectedItem3를 초기화
watch(selectedItem, () => {
  selectedItem2.value = null;
  selectedItem3.value = null;
  updateItems2();
});

// selectedItem2이 변경될 때마다 selectedItem3를 초기화하고 items3를 업데이트
watch(selectedItem2, () => {
  selectedItem3.value = null;
  updateItems3();
});

// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(10);

const pageCount = computed(() => {
  return Math.ceil(desserts.value.length / itemsPerPage.value);
});

const page1 = ref(1);

const pageCount1 = computed(() => {
  return Math.ceil(desserts.value.length / itemsPerPage.value);
});

// 엑셀 설정
const exportToExcel = () => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(desserts.value);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${selectedItem3.value}_datatable.xlsx`);
};

// 데이터 테이블 헤더
const headers = ref([
  {
    title: "Dessert (100g serving)",
    align: "start",
    key: "name",
  },
  { title: "Calories", align: "end", key: "calories" },
  { title: "Fat (g)", align: "end", key: "fat" },
  { title: "Carbs (g)", align: "end", key: "carbs" },
  { title: "Protein (g)", align: "end", key: "protein" },
  { title: "Iron (%)", align: "end", key: "iron" },
]);

// 데이터 테이블 바디
const desserts = ref([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
    iron: 1,
  },
  {
    name: "Ice Cream Sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
    iron: 1,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16,
    carbs: 23,
    protein: 6,
    iron: 7,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: 8,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16,
    carbs: 49,
    protein: 3.9,
    iron: 16,
  },
  {
    name: "Jelly Bean",
    calories: 375,
    fat: 0,
    carbs: 94,
    protein: 0,
    iron: 0,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: 2,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: 45,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25,
    carbs: 51,
    protein: 4.9,
    iron: 22,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26,
    carbs: 65,
    protein: 7,
    iron: 6,
  },
  // 나머지 디저트 데이터 추가
  {
    name: "Brownie",
    calories: 380,
    fat: 12,
    carbs: 58,
    protein: 3.5,
    iron: 9,
  },
  {
    name: "Cheesecake",
    calories: 321,
    fat: 18,
    carbs: 36,
    protein: 5.8,
    iron: 3,
  },
  {
    name: "Pecan Pie",
    calories: 456,
    fat: 21,
    carbs: 63,
    protein: 3.6,
    iron: 11,
  },
  {
    name: "Red Velvet Cake",
    calories: 320,
    fat: 13,
    carbs: 47,
    protein: 3.8,
    iron: 5,
  },
  {
    name: "Tiramisu",
    calories: 452,
    fat: 25,
    carbs: 47,
    protein: 5.4,
    iron: 6,
  },
  {
    name: "Chocolate Chip Cookie",
    calories: 310,
    fat: 12,
    carbs: 47,
    protein: 3.6,
    iron: 7,
  },
  {
    name: "Apple Pie",
    calories: 320,
    fat: 13,
    carbs: 49,
    protein: 2.5,
    iron: 3,
  },
  {
    name: "Banana Bread",
    calories: 320,
    fat: 14,
    carbs: 49,
    protein: 3.2,
    iron: 4,
  },
  {
    name: "Cherry Pie",
    calories: 320,
    fat: 15,
    carbs: 52,
    protein: 2.8,
    iron: 3,
  },
  {
    name: "Lemon Bars",
    calories: 290,
    fat: 11,
    carbs: 45,
    protein: 2.3,
    iron: 2,
  },
  {
    name: "Pumpkin Pie",
    calories: 323,
    fat: 14,
    carbs: 48,
    protein: 3.6,
    iron: 4,
  },
  {
    name: "Blueberry Muffin",
    calories: 350,
    fat: 12,
    carbs: 53,
    protein: 3.4,
    iron: 5,
  },
  {
    name: "Carrot Cake",
    calories: 400,
    fat: 16,
    carbs: 58,
    protein: 4.2,
    iron: 6,
  },
  {
    name: "Coconut Macaroon",
    calories: 220,
    fat: 10,
    carbs: 32,
    protein: 2.5,
    iron: 1,
  },
  {
    name: "Peanut Butter Cookie",
    calories: 210,
    fat: 8,
    carbs: 31,
    protein: 2.7,
    iron: 2,
  },
  {
    name: "Strawberry Shortcake",
    calories: 280,
    fat: 10,
    carbs: 45,
    protein: 2.8,
    iron: 1,
  },
  {
    name: "Chocolate Eclair",
    calories: 310,
    fat: 16,
    carbs: 45,
    protein: 3.1,
    iron: 4,
  },
  {
    name: "Peach Cobbler",
    calories: 280,
    fat: 11,
    carbs: 42,
    protein: 2.6,
    iron: 2,
  },
  {
    name: "Rice Krispie Treat",
    calories: 90,
    fat: 1,
    carbs: 20,
    protein: 1,
    iron: 2,
  },
  {
    name: "Caramel Popcorn",
    calories: 140,
    fat: 5,
    carbs: 22,
    protein: 1.5,
    iron: 2,
  },
  {
    name: "Graham Cracker",
    calories: 60,
    fat: 1.5,
    carbs: 11,
    protein: 1,
    iron: 2,
  },
  {
    name: "Raisin Bran Muffin",
    calories: 120,
    fat: 2,
    carbs: 25,
    protein: 2,
    iron: 4,
  },
  {
    name: "Pineapple Upside-Down Cake",
    calories: 367,
    fat: 14,
    carbs: 59,
    protein: 2.3,
    iron: 2,
  },
  {
    name: "Lava Cake",
    calories: 420,
    fat: 19,
    carbs: 56,
    protein: 4,
    iron: 3,
  },
  {
    name: "Pumpkin Cheesecake",
    calories: 330,
    fat: 15,
    carbs: 44,
    protein: 4,
    iron: 2,
  },
  {
    name: "Oatmeal Cookie",
    calories: 120,
    fat: 5,
    carbs: 17,
    protein: 1.5,
    iron: 2,
  },
  {
    name: "Chocolate Mousse",
    calories: 220,
    fat: 12,
    carbs: 30,
    protein: 5,
    iron: 2,
  },
  {
    name: "Apple Crisp",
    calories: 180,
    fat: 8,
    carbs: 28,
    protein: 4,
    iron: 2,
  },
  {
    name: "Pumpkin Pie",
    calories: 250,
    fat: 15,
    carbs: 42,
    protein: 3.8,
    iron: 2,
  },
  {
    name: "Lemon Tart",
    calories: 210,
    fat: 9,
    carbs: 36,
    protein: 4.2,
    iron: 1.8,
  },
  {
    name: "Cheesecake",
    calories: 190,
    fat: 8.5,
    carbs: 31,
    protein: 4.1,
    iron: 2.2,
  },
  {
    name: "Fruit Parfait",
    calories: 230,
    fat: 11,
    carbs: 38,
    protein: 4.3,
    iron: 2.5,
  },
  {
    name: "Banana Split",
    calories: 260,
    fat: 14,
    carbs: 45,
    protein: 3.7,
    iron: 2.7,
  },
  {
    name: "Red Velvet Cake",
    calories: 320,
    fat: 15,
    carbs: 42,
    protein: 5,
    iron: 3,
  },
  {
    name: "Mint Chocolate Chip Ice Cream",
    calories: 230,
    fat: 10,
    carbs: 35,
    protein: 3.5,
    iron: 1,
  },
  {
    name: "Pecan Pie",
    calories: 456,
    fat: 21,
    carbs: 63,
    protein: 3.6,
    iron: 11,
  },
  {
    name: "Carrot Cake",
    calories: 400,
    fat: 16,
    carbs: 58,
    protein: 4.2,
    iron: 6,
  },
  {
    name: "Blueberry Muffin",
    calories: 350,
    fat: 12,
    carbs: 53,
    protein: 3.4,
    iron: 5,
  },
  {
    name: "Strawberry Shortcake",
    calories: 280,
    fat: 10,
    carbs: 45,
    protein: 2.8,
    iron: 1,
  },
  {
    name: "Chocolate Eclair",
    calories: 310,
    fat: 16,
    carbs: 45,
    protein: 3.1,
    iron: 4,
  },
  {
    name: "Peach Cobbler",
    calories: 280,
    fat: 11,
    carbs: 42,
    protein: 2.6,
    iron: 2,
  },
  {
    name: "Rice Krispie Treat",
    calories: 90,
    fat: 1,
    carbs: 20,
    protein: 1,
    iron: 2,
  },
  {
    name: "Caramel Popcorn",
    calories: 140,
    fat: 5,
    carbs: 22,
    protein: 1.5,
    iron: 2,
  },
  {
    name: "Graham Cracker",
    calories: 60,
    fat: 1.5,
    carbs: 11,
    protein: 1,
    iron: 2,
  },
  {
    name: "Raisin Bran Muffin",
    calories: 120,
    fat: 2,
    carbs: 25,
    protein: 2,
    iron: 4,
  },
  {
    name: "Pineapple Upside-Down Cake",
    calories: 367,
    fat: 14,
    carbs: 59,
    protein: 2.3,
    iron: 2,
  },
  {
    name: "Lava Cake",
    calories: 420,
    fat: 19,
    carbs: 56,
    protein: 4,
    iron: 3,
  },
  {
    name: "Pumpkin Cheesecake",
    calories: 330,
    fat: 15,
    carbs: 44,
    protein: 4,
    iron: 2,
  },
  {
    name: "Oatmeal Cookie",
    calories: 120,
    fat: 5,
    carbs: 17,
    protein: 1.5,
    iron: 2,
  },
  {
    name: "Chocolate Mousse Cake",
    calories: 280,
    fat: 12,
    carbs: 35,
    protein: 4,
    iron: 1.5,
  },
  {
    name: "Key Lime Pie",
    calories: 310,
    fat: 14,
    carbs: 40,
    protein: 3.8,
    iron: 2,
  },
  {
    name: "Pistachio Ice Cream",
    calories: 250,
    fat: 13,
    carbs: 34,
    protein: 4.1,
    iron: 1.7,
  },
  {
    name: "Baklava",
    calories: 320,
    fat: 16,
    carbs: 42,
    protein: 4.3,
    iron: 2.3,
  },
  {
    name: "Coconut Macaroon",
    calories: 220,
    fat: 10,
    carbs: 32,
    protein: 2.5,
    iron: 1,
  },
  {
    name: "Peanut Butter Cookie",
    calories: 210,
    fat: 8,
    carbs: 31,
    protein: 2.7,
    iron: 2,
  },
  {
    name: "Chocolate Truffle",
    calories: 180,
    fat: 9.5,
    carbs: 26,
    protein: 3.2,
    iron: 1.8,
  },
  {
    name: "Red Velvet Cupcake",
    calories: 270,
    fat: 11,
    carbs: 38,
    protein: 3.6,
    iron: 2.4,
  },
]);
</script>

<style scoped>
.scrollbar {
  overflow-y: auto;
}
</style>
