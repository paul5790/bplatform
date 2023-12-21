<template>
  <v-sheet class="manager-sheet">
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
        <v-row class="dialog-row">
          <!-- 종료 후 저장 -->
          <div class="dialog-div" style="display: flex; margin-right: 0">
            <v-btn
              v-if="startstate"
              color="blue"
              v-bind="props"
              @click="openDialog1_1()"
            >
              시운전 진행중..(종료하기)
            </v-btn>
            <v-dialog v-model="dialog1_1" persistent width="800">
              <v-card style="background-color: #fdfdfd;">
                <v-card-title>
                  <span class="text-h5">항차 측정 종료</span>
                </v-card-title>
                <v-card-text>
                  <v-sheet style="display: flex">
                    <v-card style="flex: 1">
                      <v-card-item>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  측정 종료 시간 :
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  {{ endTimeUtc }}
                                </p></v-list-subheader
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-item>
                    </v-card>
                  </v-sheet>
                </v-card-text>
                <v-card-actions style="margin-top: 0px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="grey-darken-1"
                    variant="text"
                    @click="nullDialog1_1()"
                  >
                    뒤로가기
                  </v-btn>
                  <v-btn
                    color="deep-orange-lighten-2"
                    variant="text"
                    @click="cancelData()"
                  >
                    측정취소
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="startData()"
                  >
                    측정종료
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- 시작하기 -->
          <div class="dialog-div">
            <v-btn
              v-if="!startstate"
              color="blue"
              v-bind="props"
              @click="openDialog1()"
            >
              시작하기
            </v-btn>
            <v-dialog v-model="dialog1" persistent width="800">
              <v-card>
                <v-card-title>
                  <span class="text-h5">항차 측정 시작</span>
                </v-card-title>
                <v-card-text>
                  <v-sheet style="display: flex">
                    <v-card style="flex: 1">
                      <v-card-item>
                        <v-container fluid>
                          <!-- <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 번호 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="startdivision"
                                type="text"
                                :rules="rules1.division"
                              ></v-text-field>
                            </v-col>
                          </v-row> -->

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 시작 시간
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <!-- 날짜 설정 -->

                              <VueDatePicker
                                style="--dp-input-padding: 15px"
                                v-model="startTimeUtc"
                                text-input
                                :readonly="true"
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 이름 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="startname"
                                type="text"
                                :rules="rules1.name"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 목적 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="startpurpose"
                                type="text"
                                :rules="rules1.purpose"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항해 해역 위치
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="startlocation"
                                type="text"
                                :rules="rules1.location"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 10px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  설명
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="startdescription"
                                type="text"
                                :rules="rules1.description"
                                maxlength="25"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-item>
                    </v-card>
                  </v-sheet>
                </v-card-text>
                <v-card-actions style="margin-top: 10px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="nullDialog1()"
                  >
                    뒤로가기
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="waitStart()"
                  >
                    측정시작
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- 추가하기 -->
          <div style="display: flex; margin: 15px; margin-left: 0">
            <v-btn color="blue" v-bind="props" @click="openDialog2()">
              추가하기
            </v-btn>
            <v-dialog v-model="dialog2" persistent width="800">
              <v-card>
                <v-card-title>
                  <span class="text-h5">항차 추가</span>
                </v-card-title>
                <v-card-text>
                  <v-sheet style="display: flex">
                    <v-card style="flex: 1">
                      <v-card-item>
                        <v-container fluid>
                          <!-- <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 번호 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="editdivision"
                                type="text"
                                :rules="rules1.division"
                              ></v-text-field>
                            </v-col>
                          </v-row> -->

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 시작 시간
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <!-- 날짜 설정 -->

                              <VueDatePicker
                                style="--dp-input-padding: 15px"
                                v-model="editstartdate"
                                text-input
                                :max-date="currentDate"
                                :max-time="currentTime"
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 종료 시간
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <VueDatePicker
                                style="
                                  margin-top: 20px;
                                  --dp-input-padding: 15px;
                                "
                                v-model="editenddate"
                                text-input
                                :max-date="currentDate"
                                :max-time="currentTime"
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 이름 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="editname"
                                type="text"
                                :rules="rules1.name"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 목적 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="editpurpose"
                                type="text"
                                :rules="rules1.purpose"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항해 해역 위치
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 0px"
                                variant="outlined"
                                v-model="editlocation"
                                type="text"
                                :rules="rules1.location"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 10px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  설명
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="editdescription"
                                type="text"
                                style="margin-bottom: 5px"
                                :rules="rules1.description"
                                maxlength="25"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-item>
                    </v-card>
                  </v-sheet>
                </v-card-text>
                <v-card-actions style="margin-top: 10px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="nullDialog2()"
                  >
                    뒤로가기
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="editData()"
                  >
                    저장하기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- 수정하기 -->
          <div style="display: flex; margin: 15px; margin-left: 0">
            <v-btn color="blue" v-bind="props" @click="openDialog3()">
              수정하기
            </v-btn>
            <v-dialog v-model="dialog3" persistent width="800">
              <v-card>
                <v-card-title>
                  <span class="text-h5">항차 수정</span>
                </v-card-title>
                <v-card-text>
                  <v-sheet style="display: flex">
                    <v-card style="flex: 1">
                      <v-card-item>
                        <v-container fluid>
                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 시작 시간
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <!-- 날짜 설정 -->

                              <VueDatePicker
                                style="--dp-input-padding: 15px"
                                v-model="selectedstartdate"
                                text-input
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 종료 시간
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <VueDatePicker
                                style="
                                  margin-top: 20px;
                                  --dp-input-padding: 15px;
                                "
                                v-model="selectedenddate"
                                text-input
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 이름 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="selectedname"
                                type="text"
                                :rules="rules1.name"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 목적 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="selectedpurpose"
                                type="text"
                                :rules="rules1.purpose"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 8px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항해 해역 위치
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 0px"
                                variant="outlined"
                                v-model="selectedlocation"
                                type="text"
                                :rules="rules1.location"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 10px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  설명
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="selecteddescription"
                                type="text"
                                style="margin-bottom: 35px"
                                :rules="rules1.description"
                                maxlength="25"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-item>
                    </v-card>
                  </v-sheet>
                </v-card-text>
                <v-card-actions style="margin-top: 10px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="nullDialog3()"
                  >
                    뒤로가기
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="changeData()"
                  >
                    저장하기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <!-- 삭제하기 -->
          <div style="display: flex; margin: 15px; margin-left: 0">
            <v-btn color="blue" @click="openDialog4()"> 삭제하기 </v-btn>

            <v-dialog v-model="dialog4" persistent width="350">
              <v-card>
                <v-card-title>
                  <span class="text-h5">항차 정보 삭제</span>
                </v-card-title>
                <v-card-text
                  >{{ selecteddivision }}항차의 정보를
                  삭제하시겠습니까?</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="deleteData()"
                    >예</v-btn
                  >
                  <v-btn color="blue-darken-1" variant="text" @click="cancel()"
                    >아니오</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-row>
        <v-data-table
          style="margin-top: 20px"
          v-model="selectedData"
          v-model:page="page"
          class="elevation-1"
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
          density="compact"
          hide-default-footer
          select-strategy="single"
          return-object
          show-select
        >
          <template v-slot:no-data>
            <v-sheet
              height="55vh"
              class="pa-1 d-flex justify-center align-center"
            >
              <div style="text-align: center">
                <p style="font-weight: 500; font-size: 20px">
                  {{ message }}
                </p>
              </div>
            </v-sheet>
          </template>
          <template v-slot:bottom>
            <div class="text-center pt-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="6"
                rounded="circle"
              ></v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card-item>
    </v-card>
    <v-overlay v-model="overlay" contained class="align-center justify-center overlay">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-sheet>
</template>

<script setup>
import { computed, ref, onMounted, watchEffect, defineEmits } from "vue";
import axios from "axios";
import { createTrialData, updateTrialData, deleteTrialData, readTrialData } from "../../api/index.js";

// 데이트 피커 제한
const currentDate = new Date();
const currentTime = {
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
};

const emit = defineEmits(["overlay"])

// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(13);
const dialog1 = ref(false);
const dialog1_1 = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const dialog4 = ref(false);
const message = ref("항차 테이블 정보 로딩중...");

const overlay = ref(false);

const tokenid = ref(sessionStorage.getItem("token") || "");

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const name = ref("");
const startdate = ref("");
const enddate = ref("");
const description = ref("");
const modifieduser = ref("");
const division = ref();

// 1번째
const startstate = ref(
  sessionStorage.getItem("startstate") === "true" || false
);

const startname = ref();
const startTimeUtc = ref();
const endTimeUtc = ref();
const startpurpose = ref();
const startlocation = ref();
const startdescription = ref();
const startdivision = ref();
const startshipId = ref();
const startenddate = ref();

// 2번째
const editname = ref("");
const editstartdate = ref("");
const editenddate = ref("");
const editdescription = ref("");
const editdivision = ref();
const editmodifieduser = ref("");
const editpurpose = ref("");
const editlocation = ref("");

// 3번째
const selectedData = ref([]);
const selectedname = ref();
const selectedstartdate = ref();
const selectedenddate = ref();
const selectedshipId = ref();
const selecteddivision = ref();
const selectedpurpose = ref();
const selectedlocation = ref();
const selecteddescription = ref();

const divisiontrue = ref(false);
const nametrue = ref(false);
const purposetrue = ref(false);
const locationtrue = ref(false);
const descriptiontrue = ref(false);
const rules1 = ref({
  division: [
    (value) => {
      for (let i = 0; i < division.value - 1; i++) {
        if (items.value[i].division === value) {
          divisiontrue.value = false;
          return "겹치는 항차가 존재합니다.";
        }
      }
      if (/^\d+$/.test(value)) {
        if (value.length >= 5 || parseInt(value) >= 10000) {
          divisiontrue.value = false;
          return "9999이하의 숫자를 사용하세요";
        } else {
          divisiontrue.value = true;
          return true;
        }
      } else {
        divisiontrue.value = false;
        return "숫자만 입력하세요";
      }
    },
  ],
  name: [
    (value) => {
      if (value?.length > 0) {
        nametrue.value = true;
        return true;
      } else {
        nametrue.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  purpose: [
    (value) => {
      if (value?.length > 0) {
        purposetrue.value = true;
        return true;
      } else {
        purposetrue.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  location: [
    (value) => {
      if (value?.length > 0) {
        locationtrue.value = true;
        return true;
      } else {
        locationtrue.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  description: [
    (value) => {
      if (value?.length <= 25 && value?.length > 0) {
        descriptiontrue.value = true;
        return true;
      } else {
        descriptiontrue.value = false;
        return "최대 25자까지 작성 가능합니다.";
      }
    },
  ],
});

let isEditing = ref(false); // 수정 모드인지 여부

// 데이트 피커
startTimeUtc.value = new Date();

const openDialog1 = () => {
  dialog1.value = true;
};

const openDialog1_1 = () => {
  // 현재 endTimeUtc.value의 값을 Date 객체로 변환

  endTimeUtc.value = new Date();

  const endTime = new Date(endTimeUtc.value);
  // endTime.setHours(endTime.getHours() + 9);
  // sessionStorage.setItem("endTimeUtc", endTimeUtc.value.toString());
  sessionStorage.setItem("endTimeUtc", endTime.toISOString());
  dialog1_1.value = true;
};

const openDialog2 = () => {
  dialog2.value = true;
};

const openDialog3 = () => {
  if (selectedData.value.length > 0) {
    selecteddivision.value = selectedData.value[0].division;
    selectedname.value = selectedData.value[0].name;
    selectedstartdate.value = selectedData.value[0].startdate;
    selectedenddate.value = selectedData.value[0].enddate;
    selectedshipId.value = selectedData.value[0].shipid;
    selectedpurpose.value = selectedData.value[0].purpose;
    selectedlocation.value = selectedData.value[0].location;
    selecteddescription.value = selectedData.value[0].description;
    dialog3.value = true;
    console.log(selectedData.value[0].index);
  } else {
    alert("항차를 선택해주세요.");
    console.log("항차를 선택해주세요.");
  }
};

const openDialog4 = () => {
  if (selectedData.value.length > 0) {
    selecteddivision.value = selectedData.value[0].division;
    dialog4.value = true;
  } else {
    alert("항차를 선택해주세요.");
    console.log("항차를 선택해주세요.");
  }
};

const nullDialog1 = () => {
  dialog1.value = false;
  startname.value = null;
  startdate.value = null;
  enddate.value = null;
  startdescription.value = null;
  startlocation.value = null;
  startpurpose.value = null;
};
const nullDialog1_1 = () => {
  dialog1_1.value = false;
};
const nullDialog2 = () => {
  dialog2.value = false;
  editname.value = null;
  editstartdate.value = null;
  editenddate.value = null;
  editdescription.value = null;
  editlocation.value = null;
  editpurpose.value = null;
};
const nullDialog3 = () => {
  dialog3.value = false;
  selectedname.value = "";
  selectedstartdate.value = "";
  selectedenddate.value = "";
  selectedpurpose.value = "";
  selectedlocation.value = "";
  selecteddescription.value = "";
  selecteddivision.value = "";
};
const cancel = () => {
  dialog4.value = false;
};

const timeRange = ref([]);

// 시작하기 후 대기
const waitStart = () => {
  if (
    nametrue.value === false ||
    purposetrue.value === false ||
    locationtrue.value === false ||
    descriptiontrue.value === false
  ) {
    console.log(startname.value);
    alert("빈칸을 전부 기입하세요.");
  } else {
    try {
      sessionStorage.setItem("name", startname.value.toString());
      sessionStorage.setItem("testPurpose", startpurpose.value.toString());
      sessionStorage.setItem("navigationArea", startlocation.value.toString());
      const startTime = new Date();

      // 9시간을 더함
      // startTime.setHours(startTime.getHours() + 9);
      sessionStorage.setItem("startTimeUtc", startTime.toISOString());
      sessionStorage.setItem("description", startdescription.value.toString());

      sessionStorage.setItem("startstate", "true");
      startstate.value = true;
      nullDialog1();
      alert("항차 측정이 시작됩니다.");
      location.reload();
    } catch (error) {
      // 특정 에러인 경우에 따라 다르게 처리합니다.
      if (error instanceof TypeError && error.message.includes("toString")) {
        alert("항차 정보를 전부 입력해 주세요.");
        console.error("toString error occurred in waitStart:", error.message);
      } else {
        console.error("An error occurred in waitStart:", error);
      }
    }
  }
};

// 종료하기 후 저장
const startData = async () => {
  overlay.value = true;
  dialog1_1.value = false;
  sessionStorage.setItem("startstate", "false");
  startstate.value = false;

  const division = sessionStorage.getItem("division") || null;
  const name = sessionStorage.getItem("name") || null;
  const testPurpose = sessionStorage.getItem("testPurpose") || null;
  const navigationArea = sessionStorage.getItem("navigationArea") || null;
  const startTimeUtc = sessionStorage.getItem("startTimeUtc") || null;
  const endTimeUtc = sessionStorage.getItem("endTimeUtc") || null;
  const description = sessionStorage.getItem("description") || null;

  const data = {
    seatrialId: division,
    name: name,
    shipId: "440714900",
    groupId: "1",
    testPurpose: testPurpose,
    navigationArea: navigationArea,
    startTimeUtc: startTimeUtc,
    endTimeUtc: endTimeUtc,
    description: description,
    storageSize: 0,
  };
  console.log(data);
  try {
    await createTrialData(tokenid.value, data);

    sessionStorage.removeItem("name");
    sessionStorage.removeItem("testPurpose");
    sessionStorage.removeItem("navigationArea");
    sessionStorage.removeItem("startTimeUtc");
    sessionStorage.removeItem("endTimeUtc");
    sessionStorage.removeItem("description");

    // console.log(response.data);
    overlay.value = false;
    alert("항차 측정이 종료됩니다.");
    location.reload();
  } catch (error) {
    console.error(error);
    alert(error.response?.data || "An error occurred during signup.");
  }

  nullDialog1_1();
};

// 종료하기 후 취소
const cancelData= async () => {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("testPurpose");
    sessionStorage.removeItem("navigationArea");
    sessionStorage.removeItem("startTimeUtc");
    sessionStorage.removeItem("endTimeUtc");
    sessionStorage.removeItem("description");
    sessionStorage.setItem("startstate", "false");
    startstate.value = false;
    alert("항차 측정이 종료됩니다.");
    location.reload();
    nullDialog1_1();
}

//추가하기
const editData = async () => {
  console.log(items.value.division);
  console.log(editstartdate.value.getTime(), editenddate.value.getTime());
  console.log(editstartdate.value.getTime() === editenddate.value.getTime());
  if (
    editname.value === "" ||
    editpurpose.value === "" ||
    editlocation.value === "" ||
    editdescription.value === "" ||
    editstartdate.value === "" ||
    editstartdate.value === null ||
    editenddate.value === null ||
    editenddate.value === ""
  ) {
    alert("항차 정보를 전부 올바르게 입력해 주세요.");
  } else if (editstartdate.value > editenddate.value) {
    alert("종료시간이 시작시간보다 더 빠릅니다.");
  } else if (editstartdate.value.getTime() === editenddate.value.getTime()) {
    alert("시작시간과 종료시간이 같습니다.");
  } else {
    console.log("e");
    let start = new Date(editstartdate.value).toISOString().slice(0, 19);
    let end = new Date(editenddate.value).toISOString().slice(0, 19);
    console.log(start);
    console.log(end);
    let range = `${start}~${end}`;
    console.log(range);
    let check = checkIfRangeExists(range);
    console.log(check);
    if (check) {
      alert("선택된 날짜에 항차가 이미 존재합니다.");
    } else {
      try {
        overlay.value = true;
        dialog2.value = false;
        const division = sessionStorage.getItem("division") || null;
        const data = {
          seatrialId: division,
          name: editname.value,
          shipId: "440714900",
          groupId: "1",
          testPurpose: editpurpose.value,
          navigationArea: editlocation.value,
          startTimeUtc: editstartdate.value,
          endTimeUtc: editenddate.value,
          description: editdescription.value,
          storageSize: 0,
        };
        console.log(data);
        try {
          await createTrialData(tokenid.value, data);
          overlay.value = false;
          alert("항차 추가가 완료되었습니다.");
          nullDialog2();
          // console.log("API 응답 데이터:", response.data);
          location.reload();
        } catch (error) {
          // 특정 에러인 경우에 따라 다르게 처리합니다.
          if (
            error instanceof TypeError &&
            error.message.includes("toString")
          ) {
            alert("항차 정보를 전부 입력해 주세요.");
            console.error(
              "toString error occurred in waitStart:",
              error.message
            );
          } else {
            console.error("An error occurred in waitStart:", error);
          }
        }
      } catch (error) {
        console.error("An error occurred in waitStart:", error);
      }
    }
  }
};

// 수정하기
const changeData = async () => {
  overlay.value = true;
  dialog3.value = false;
  const startDate = new Date(selectedstartdate.value);
  const endDate = new Date(selectedenddate.value);

  console.log("Start Date:", startDate);
  console.log("End Date:", endDate);

  const saveTimeRange = timeRange.value.slice();
  console.log(saveTimeRange);
  console.log(timeRange.value);
  console.log(selectedData.value[0].startdate);
  console.log(selectedData.value[0].startdate === selectedstartdate.value);
  let start = new Date(selectedstartdate.value).toISOString().slice(0, 19);
  let end = new Date(selectedenddate.value).toISOString().slice(0, 19);
  let range = `${start}~${end}`;
  timeRange.value.splice(selectedData.value[0].index, 1);
  console.log(saveTimeRange);
  console.log(timeRange.value);
  let check = checkIfRangeExists(range);
  timeRange.value = saveTimeRange;
  console.log(saveTimeRange);
  console.log(timeRange.value);
  if (
    check === false
    // || selectedData.value[0].startdate === selectedstartdate.value
  ) {
    if (
      selectedname.value === "" ||
      selectedpurpose.value === "" ||
      selectedlocation.value === "" ||
      selecteddescription.value === "" ||
      selectedstartdate.value === "" ||
      selectedstartdate.value === null ||
      selectedenddate.value === null ||
      selectedenddate.value === ""
    ) {
      alert("항차 정보를 전부 올바르게 입력해 주세요.");
    } else if (startDate > endDate) {
      alert("종료시간이 시작시간보다 더 빠릅니다.");
    } else if (startDate.getTime() === endDate.getTime()) {
      alert("시작시간과 종료시간이 같습니다.");
    } else {
      console.log(selectedData.value);
      try {
        const data = {
          seatrialId: selecteddivision.value,
          name: selectedname.value,
          shipId: "440714900",
          groupId: "1",
          testPurpose: selectedpurpose.value,
          navigationArea: selectedlocation.value,
          startTimeUtc: selectedstartdate.value,
          endTimeUtc: selectedenddate.value,
          description: selecteddescription.value,
          storageSize: 0,
        };
        console.log(data);
        try {
          await updateTrialData(tokenid.value, data);
          
          alert("선택된 항차의 수정이 완료되었습니다.");
          overlay.value = false;
          nullDialog3();
          location.reload();
        } catch (error) {
          console.log(1127);
          if (
            error instanceof TypeError &&
            error.message.includes("toString")
          ) {
            alert("항차 정보를 올바르게 입력해 주세요.");
            console.error(
              "toString error occurred in waitStart:",
              error.message
            );
          } else {
            console.error("An error occurred in waitStart:", error);
          }
        }
      } catch (error) {
        console.error(error);
        alert("선택된 항차 목록이 존재하지 않습니다.");
        console.log(1145);
      }
    }
  } else {
    alert("선택된 날짜에 항차가 이미 존재합니다.");
    console.log(1151);
  }
};

// 삭제하기
const deleteData = async () => {
  // overlay.value = true;
  overlayemit(true);
  dialog4.value = false;
  const data = {
    seatrialId: selecteddivision.value,
  };
  try {
    await deleteTrialData(tokenid.value, data);

    alert("선택한 항차의 삭제가 완료되었습니다.");
    overlayemit(false);
    overlay.value = false;
    location.reload();
  } catch (error) {
    console.error("An error occurred in waitStart:", error);
  }
};

// emits
const overlayemit = (data) => {
  // 로그아웃 로직을 구현
  console.log(1);
  emit("overlay", data);
  console.log(2);
};



// 데이터 테이블 헤더
const headers = ref([
  { title: "항차", align: "start", key: "division" },
  { title: "시작시간", align: "start", key: "startdate" },
  { title: "끝시간", align: "start", key: "enddate" },
  { title: "진행 시간", align: "start", key: "time" },
  { title: "Ship ID", align: "start", key: "shipid" },
  { title: "이름", align: "start", key: "name" },
  { title: "목적", align: "start", key: "purpose" },
  { title: "해역 위치", align: "start", key: "location" },
  { title: "저장 용량", align: "start", key: "storage" },
  { title: "설명", align: "start", key: "description" },
  // { title: "입력자", align: "end", key: "user" },
]);

const items = ref([]);
// 데이터 받아오기
const fetchData = async () => {
  try {
    items.value = [];
    const response = await readTrialData(tokenid.value);
    for (let i = 0; i < response.length; i++) {
      const startTime = new Date(response[i].startTimeUtc);
      const endTime = new Date(response[i].endTimeUtc);

      const timeDiff = endTime - startTime;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      timeRange.value.push(
        `${response[i].startTimeUtc.slice(0, 19)}~${response[
          i
        ].endTimeUtc.slice(0, 19)}`
      );
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      items.value.push({
        index: i,
        division: response[i].seatrialId,
        name: response[i].name,
        shipid: response[i].shipId,
        startdate: response[i].startTimeUtc,
        purpose: response[i].testPurpose,
        location: response[i].navigationArea,
        storage: response[i].storageSize + "MB",
        enddate: response[i].endTimeUtc,
        description: response[i].description,
        time: formattedTime,
      });
      if (i === response.length - 1) {
        sessionStorage.setItem(
          "division",
          Number(response[i].seatrialId) + 1
        );
      }
    }
    items.value.sort((a, b) => {
      const dateA = new Date(a.startdate);
      const dateB = new Date(b.startdate);
      return dateB - dateA;
    });
    
    division.value = Number(response.length);
    console.log(timeRange.value);
    // sessionStorage.setItem("division", division.value.toString());
  } catch (error) {
    console.error(error);
    message.value = `api 오류(${error})`;
  }
};

onMounted(() => {
  fetchData();
});

const checkIfRangeExists = (range) => {
  // 선택한 범위와 시련 기간을 비교하여 겹치는 부분이 있는지 확인하는 함수
  // 선택한 범위와 시련 기간을 비교하여 겹치는 부분이 있는지 확인하는 함수
  const isOverlap = (selectedRange, trialRange) => {
    const [selectedStart, selectedEnd] = selectedRange
      .split("~")
      .map((dateString) => new Date(dateString));
    const [trialStart, trialEnd] = trialRange
      .split("~")
      .map((dateString) => new Date(dateString));

    // 겹치는 부분이 있으면 true를 반환
    return (
      (selectedStart >= trialStart && selectedStart <= trialEnd) ||
      (selectedEnd >= trialStart && selectedEnd <= trialEnd) ||
      (trialStart >= selectedStart && trialStart <= selectedEnd) ||
      (trialEnd >= selectedStart && trialEnd <= selectedEnd)
    );
  };

  // 선택한 범위
  const selectedRange = range;

  // 시련 기간을 반복하여 겹치는 부분이 있는지 확인
  const isExist = timeRange.value.some((trialRange) =>
    isOverlap(selectedRange, trialRange)
  );

  return isExist;
};

console.log(items);
</script>

<style scoped>

</style>
