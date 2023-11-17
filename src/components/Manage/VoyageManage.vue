<template>
  <v-sheet class="manager-sheet">
    <v-card :color="primary" :variant="elevated" style="flex: 1">
      <v-card-item>
        <v-row class="dialog-row">
          <!-- 시작하기 -->
          <div class="dialog-div">
            <v-dialog v-model="dialog1" persistent width="800">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="openDialog1()"> 시작하기 </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">항차 시작</span>
                </v-card-title>
                <v-card-text>
                  <v-sheet style="display: flex">
                    <v-card
                      :color="primary"
                      :variant="elevated"
                      style="flex: 1"
                    >
                      <v-card-item>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                >항차 정보 입력</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="name"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                >항차 시작 시간</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <!-- 날짜 설정 -->

                              <VueDatePicker
                                style="--dp-input-padding: 15px"
                                v-model="date"
                                text-input
                                :readonly="true"
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                >항차 목적 입력</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="purpose"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                >항해 해역 위치</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="location"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 10px">
                              <v-list-subheader>설명</v-list-subheader>
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="description"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-item>
                    </v-card>
                  </v-sheet>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions style="margin-top: 50px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="editData(), (dialog1 = false)"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="saveData(), (dialog1 = false)"
                  >
                    Start
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- 추가하기 -->
          <div style="display: flex; margin: 15px; margin-left: 0">
            <v-dialog v-model="dialog2" persistent width="800">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="openDialog2()"> 추가하기 </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">항차 추가</span>
                </v-card-title>
                <v-card-text>
                  <v-sheet style="display: flex">
                    <v-card
                      :color="primary"
                      :variant="elevated"
                      style="flex: 1"
                    >
                      <v-card-item>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                >항차 정보 입력</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="name"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                >항차 시작 시간</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <!-- 날짜 설정 -->

                              <VueDatePicker
                                style="--dp-input-padding: 15px"
                                v-model="edit_startdate"
                                text-input
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                >항차 종료 시간</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <VueDatePicker
                                style="
                                  margin-top: 20px;
                                  --dp-input-padding: 15px;
                                "
                                v-model="enddate"
                                text-input
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                >항차 목적 입력</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="purpose"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                >항해 해역 위치</v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="location"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 10px">
                              <v-list-subheader>설명</v-list-subheader>
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="description"
                                type="text"
                                style="margin-bottom: 15px;"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-item>
                    </v-card>
                  </v-sheet>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions style="margin-top: 50px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="editData(), (dialog2 = false)"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="saveData(), (dialog2 = false)"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-row>
        <v-data-table
          style="margin-top: 20px"
          v-model="selectedItems"
          v-model:page="page"
          class="elevation-1"
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
          density="extra-dense"
          hide-default-footer
          item-value="name"
          select-strategy="single"
          show-select
        >
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :size="small"
                :total-visible="6"
                rounded="circle"
              ></v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card-item>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(13);
const dialog1 = ref(false);
const dialog2 = ref(false);

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

let selectedData = ref(null);
let name = ref("");
let startdate = ref("");
let enddate = ref("");
let description = ref("");
let modifieduser = ref("");
let purpose = ref("");
let location = ref("");

let isEditing = ref(false); // 수정 모드인지 여부

// 데이트 피커
const date = new Date();


const openDialog1 = () => {
  dialog1.value = true;
};

const openDialog2 = () => {
  dialog2.value = true;
};

const username = ref("홍길동");

const selectItem = (item) => {
  alert(item.name);
  selectedData.value = item;
  name.value = item.name;
  startdate.value = item.startdate;
  enddate.value = item.enddate;
  description.value = item.description;
  modifieduser.value = item.username;
};

const editData = () => {
  isEditing.value = true;
};

const saveData = () => {
  // 수정한 데이터를 저장하거나 다른 작업 수행
  // ...

  isEditing.value = false; // 수정 모드를 비활성화
};

// 데이터 테이블 헤더
const headers = ref([
  {
    title: "항차",
    align: "start",
    key: "name",
  },
  { title: "시작시간", align: "end", key: "startdate" },
  { title: "끝시간", align: "end", key: "enddate" },
  { title: "목적", align: "end", key: "purpose" },
  { title: "해역 위치", align: "end", key: "location" },
  { title: "저장 용량", align: "end", key: "storage" },
  { title: "설명", align: "end", key: "description" },
  { title: "입력자", align: "end", key: "user" },
]);

// 데이터 테이블 바디
const items = ref([
  {
    name: "시운전 #1",
    startdate: "2023-08-29T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #2",
    startdate: "2023-09-27T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #3",
    startdate: "2023-10-20T04:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #4",
    startdate: "2023-10-29T18:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #5",
    startdate: "2023-08-29T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #6",
    startdate: "2023-09-27T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #7",
    startdate: "2023-10-20T04:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #8",
    startdate: "2023-10-29T18:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #9",
    startdate: "2023-08-29T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #10",
    startdate: "2023-09-27T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #11",
    startdate: "2023-10-20T04:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #12",
    startdate: "2023-10-29T18:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #13",
    startdate: "2023-08-29T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #14",
    startdate: "2023-09-27T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #15",
    startdate: "2023-10-20T04:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #16",
    startdate: "2023-10-29T18:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #17",
    startdate: "2023-08-29T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #18",
    startdate: "2023-09-27T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #19",
    startdate: "2023-10-20T04:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #20",
    startdate: "2023-10-29T18:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #21",
    startdate: "2023-08-29T08:28:43",
    purpose: "%%테스트",
    location: "울산 실증센터",
    storage: "26MB",
    map: "",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
]);

console.log(items);
</script>

<style scoped></style>
