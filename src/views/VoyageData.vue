<template>
  <!-- <v-row>
    <v-col cols="1">

    </v-col>
        <v-col cols="10">
            <v-sheet
        style="
          height: 15vh;
          padding-top: 30px;
          display: flex;
        "
      >
    <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <div>
              
</div
          ></v-card-item>
        </v-card>
    
    </v-sheet>
    </v-col>
        <v-col cols="1">
      
    </v-col>
  </v-row> -->
  <v-row>
    <v-col cols="3">
      <v-sheet
        style="
          height: 100vh;
          padding: 30px;
          display: flex;
        "
      >
      
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <div>
                <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list :items="items"></v-list>
  </v-card>
              
              </div
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
        <v-sheet style="display: flex; flex-direction: row">
          <v-col cols="6">
            <v-data-table
              style="margin: 20px"
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
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="6">
            <v-data-table
              style="margin: 20px"
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
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>
              </template>
            </v-data-table>
          </v-col>
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
          height: auto;
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
import { computed, ref } from "vue";

// 왼쪽 셀렉바 설정
const trialrun = ref(["시운전1", "시운전2", "시운전3", "시운전4"]);
const runitem = ref(null);

const items = ref([
  {
    title: '시운전 #1',
    value: '1'
  },
    {
    title: '시운전 #2',
    value: '2'
  },
    {
    title: '시운전 #3',
    value: '4'
  },
    {
    title: '시운전 #4',
    value: '4'
  },
])



// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(10);

const pageCount = computed(() => {
  return Math.ceil(itemsPerPage.value);
});


</script>

<style scoped>
</style>
