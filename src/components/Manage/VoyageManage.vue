<template>
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
    <v-card-item style="padding-top: 10px">
      <v-row class="dialog-row">
        <!-- 종료 후 저장 -->
        <div class="dialog-div" style="display: flex; margin-right: 0">
          <v-btn
            v-if="startstate"
            :color="btnColor"
            v-bind="props"
            @click="openDialog1_1()"
          >
            시운전 진행중..(종료하기)
          </v-btn>
          <v-dialog v-model="dialog1_1" persistent width="800">
            <v-card :style="{ backgroundColor: themeColor }">
              <v-card-title>
                <span class="text-h5">시험 측정 종료</span>
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

        <!-- 추가하기 -->
        <div style="display: flex; margin: 15px; margin-left: 0">
          <v-btn :color="btnColor" v-bind="props" @click="openDialog2()">
            추가하기
          </v-btn>
          <v-dialog v-model="dialog2" persistent width="750">
            <v-card :style="{ backgroundColor: themeColor }">
              <v-card-title>
                <span class="text-h5">시험 추가</span>
              </v-card-title>
              <v-card-text style="padding-bottom: 0px">
                <v-sheet style="display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <v-container fluid>
                        <v-row>
                          <v-col cols="4" style="margin-top: 8px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 시작 시간
                              </p></v-list-subheader
                            >
                          </v-col>
                          <v-col cols="8">
                            <div class="row-container">
                              <input
                                class="date-picker"
                                type="date"
                                v-model="startDateInput"
                                min="2000-01-01"
                                max="9999-12-31"
                              />
                              <select
                                v-model="startHour"
                                class="time-select"
                                style="margin-left: 20px"
                              >
                                <option
                                  v-for="hour in hours"
                                  :key="hour"
                                  :value="hour"
                                >
                                  {{ hour }}
                                </option>
                              </select>
                              시
                              <!-- <select v-model="startMinute" class="time-select">
                                <option
                                  v-for="minute in minutes"
                                  :key="minute"
                                  :value="minute"
                                >
                                  {{ minute }}분
                                </option>
                                <option
                                  v-if="!minutes.includes(startMinute)"
                                  :value="startMinute"
                                >
                                  {{ startMinute }}분
                                </option>
                              </select> -->
                              <input
                                v-model="startMinute"
                                @input="validateMinutes"
                                type="text"
                                class="m-time-input"
                                placeholder="00"
                              />
                              분
                            </div>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 28px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 종료 시간
                              </p></v-list-subheader
                            >
                          </v-col>

                          <v-col cols="8" style="margin-top: 18px">
                            <div class="row-container">
                              <input
                                class="date-picker"
                                type="date"
                                v-model="endDateInput"
                                min="1000-01-01"
                                max="9999-12-31"
                              />

                              <select
                                v-model="endHour"
                                class="time-select"
                                style="margin-left: 20px"
                              >
                                <option
                                  v-for="hour in hours"
                                  :key="hour"
                                  :value="hour"
                                >
                                  {{ hour }}
                                </option>
                              </select>
                              시
                              <!-- <select v-model="endMinute" class="time-select">
                                <option
                                  v-for="minute in minutes"
                                  :key="minute"
                                  :value="minute"
                                >
                                  {{ minute }}분
                                </option>
                                <option
                                  v-if="!minutes.includes(endMinute)"
                                  :value="endMinute"
                                >
                                  {{ endMinute }}분
                                </option>
                              </select> -->
                              <input
                                v-model="endMinute"
                                @input="validateMinutee"
                                type="text"
                                class="m-time-input"
                                placeholder="00"
                              />
                              분
                            </div>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 28px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 이름 입력
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
                                시험선 이름
                              </p></v-list-subheader
                            >
                          </v-col>

                          <v-col cols="8">
                            <v-text-field
                              variant="outlined"
                              v-model="editshipname"
                              type="text"
                              :rules="rules1.purpose"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 8px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 목적 입력
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
                              :rules="rules1.description"
                              maxlength="25"
                              @keyup.enter="editData()"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="nullDialog2()"
                >
                  뒤로가기
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="editData()">
                  저장하기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <!-- 수정하기 -->
        <div style="display: flex; margin: 15px; margin-left: 0">
          <v-btn :color="btnColor" v-bind="props" @click="openDialog3()">
            수정하기
          </v-btn>
          <v-dialog v-model="dialog3" persistent width="750">
            <v-card :style="{ backgroundColor: themeColor }">
              <v-card-title>
                <span class="text-h5">시험 수정</span>
              </v-card-title>
              <v-card-text style="padding-bottom: 0px">
                <v-sheet style="display: flex">
                  <v-card style="flex: 1">
                    <v-card-item>
                      <v-container fluid>
                        <v-row>
                          <v-col cols="4" style="margin-top: 8px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 시작 시간
                              </p></v-list-subheader
                            >
                          </v-col>

                          <v-col cols="8">
                            <!-- 날짜 설정 -->

                            <!-- <VueDatePicker
                              :class="
                                themeMode === 'dark'
                                  ? 'dp__theme_dark'
                                  : 'dp__theme_light'
                              "
                              :dark="themeMode === 'dark'"
                              style="--dp-input-padding: 15px"
                              v-model="selectedstartdate"
                              text-input
                            /> -->

                            <div class="row-container">
                              <input
                                class="date-picker"
                                type="date"
                                v-model="startDateInput"
                                min="1000-01-01"
                                max="9999-12-31"
                              />
                              <select
                                v-model="startHour"
                                class="time-select"
                                style="margin-left: 20px"
                              >
                                <option
                                  v-for="hour in hours"
                                  :key="hour"
                                  :value="hour"
                                >
                                  {{ hour }}
                                </option>
                              </select>
                              시
                              <!-- <select v-model="startMinute" class="time-select">
                                <option
                                  v-for="minute in minutes"
                                  :key="minute"
                                  :value="minute"
                                >
                                  {{ minute }}분
                                </option>
                                <option
                                  v-if="!minutes.includes(startMinute)"
                                  :value="startMinute"
                                >
                                  {{ startMinute }}분
                                </option>
                              </select> -->
                              <input
                                v-model="startMinute"
                                @input="validateMinutes"
                                type="text"
                                class="m-time-input"
                                placeholder="00"
                              />
                              분
                            </div>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 28px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 종료 시간
                              </p></v-list-subheader
                            >
                          </v-col>

                          <v-col cols="8" style="margin-top: 18px">
                            <div class="row-container">
                              <input
                                class="date-picker"
                                type="date"
                                v-model="endDateInput"
                                min="1000-01-01"
                                max="9999-12-31"
                              />

                              <select
                                v-model="endHour"
                                class="time-select"
                                style="margin-left: 20px"
                              >
                                <option
                                  v-for="hour in hours"
                                  :key="hour"
                                  :value="hour"
                                >
                                  {{ hour }}
                                </option>
                              </select>
                              시
                              <input
                                v-model="endMinute"
                                @input="validateMinutee"
                                type="text"
                                class="m-time-input"
                                placeholder="00"
                              />
                              분
                            </div>
                            <!-- <VueDatePicker
                              :class="
                                themeMode === 'dark'
                                  ? 'dp__theme_dark'
                                  : 'dp__theme_light'
                              "
                              :dark="themeMode === 'dark'"
                              style="margin-top: 20px; --dp-input-padding: 15px"
                              v-model="selectedenddate"
                              text-input
                            /> -->
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 28px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 이름 입력
                              </p></v-list-subheader
                            >
                          </v-col>

                          <v-col cols="8">
                            <v-text-field
                              style="margin-top: 20px"
                              variant="outlined"
                              v-model="selectedname"
                              type="text"
                              readonly="true"
                              :rules="rules1.name"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 8px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험선 이름
                              </p></v-list-subheader
                            >
                          </v-col>

                          <v-col cols="8">
                            <v-text-field
                              variant="outlined"
                              v-model="selectedshipname"
                              type="text"
                              :rules="rules1.purpose"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="4" style="margin-top: 8px">
                            <v-list-subheader
                              ><p style="font-size: 17px">
                                시험 목적 입력
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
                              :rules="rules1.description"
                              maxlength="25"
                              @keyup.enter="changeData()"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-item>
                  </v-card>
                </v-sheet>
              </v-card-text>
              <v-card-actions>
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
          <v-btn :color="btnColor" @click="openDialog4()"> 삭제하기 </v-btn>

          <v-dialog v-model="dialog4" persistent width="350">
            <v-card :style="{ backgroundColor: themeColor }">
              <v-card-title>
                <span class="text-h5">시험 정보 삭제</span>
              </v-card-title>
              <v-card-text
                >{{ selectedname }}의 정보를 삭제하시겠습니까?</v-card-text
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
        style="margin-top: 20px; height: 66vh"
        v-model="selectedData"
        v-model:page="page"
        class="elevation-1"
        :headers="headers"
        :items="items"
        :items-per-page="itemsPerPage"
        :density="'dense'"
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
  <!-- 데이터 저장중 모달 persistent -->
  <!-- <v-dialog v-model="loadDialog" max-width="300" height="100" persistent>
    <v-card>
      <v-card-text>
        <v-row align-content="center" class="fill-height" justify="center">
          <v-col class="text-subtitle-1 text-center mt-3" cols="12">
            Processing
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="blue"
              height="6"
              indeterminate
              rounded
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog> -->
  <v-overlay
    v-model="overlay"
    contained
    class="align-center justify-center overlay"
  >
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script setup>
import { computed, ref, onMounted, defineEmits, watch } from "vue";
import DatePicker from "vue3-datepicker";
import {
  createTrialData,
  updateTrialData,
  deleteTrialData,
  readTrialData,
} from "../../api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";

const { btnColor, themeColor, selectColor, selectTextColor } = themeConfig;
// loaddialog
const loadDialog = ref(false);

// 데이트 피커 제한
const currentDate = new Date();
const currentTime = {
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
};

const emit = defineEmits(["overlay"]);

// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(13);
const dialog1 = ref(false);
const dialog1_1 = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const dialog4 = ref(false);
const message = ref("시험 테이블 정보 로딩중...");

const overlay = ref(false);

const tokenid = ref(sessionStorage.getItem("token") || "");
const userId = ref(sessionStorage.getItem("id") || "");

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const startdate = ref("");
const enddate = ref("");
const division = ref();

// 1번째
const startstate = ref(
  sessionStorage.getItem("startstate") === "true" || false
);

const startname = ref();
const startshipname = ref();
const startTimeUtc = ref();
const endTimeUtc = ref();
const startpurpose = ref();
const startlocation = ref();
const startdescription = ref();

// 2번째
const editname = ref("");
const editshipname = ref("");
const editstartdate = ref("");
const editenddate = ref("");
const editdescription = ref("");
const editpurpose = ref("");
const editlocation = ref("");

// 3번째
const selectedData = ref([]);
const selectedname = ref();
const selectedstartdate = ref();
const selectedenddate = ref();
const selectedshipId = ref();
const selectedshipname = ref();
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
          return "겹치는 시험이 존재합니다.";
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

// ------------------------------- 데이트 피커

const startDate = ref();
const endDate = ref();

const startDateInput = ref("");
const endDateInput = ref("");
const startHour = ref("00");
const startMinute = ref("00");
const endHour = ref("");
const endMinute = ref("");

const resetDate = () => {
  startDateInput.value = "";
  endDateInput.value = "";
  startHour.value = "00";
  startMinute.value = "";
  endHour.value = "00";
  endMinute.value = "";
};

// const editStartDateSelect = ref();
// const editEndDateSelect = ref();

// const selectedTestStartTime = ref([]);
// const selectedTestEndTime = ref([]);

// 시간 및 분 옵션
const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const validateMinutes = (event) => {
  const value = validateMinute(event);
  startMinute.value = value;
};

const validateMinutee = (event) => {
  const value = validateMinute(event);
  endMinute.value = value;
};

const validateMinute = (event) => {
  let value = event.target.value;
  // 숫자만 허용 (최대 두 자리)
  value = value.replace(/[^0-9]/g, ""); // 숫자 외의 문자 제거
  if (value.length > 2) value = value.slice(0, 2); // 최대 두 자리만 허용
  if (value >= 60) value = 59;

  // 입력 값이 0~59 범위에 있는지 확인
  let minute = parseInt(value, 10);

  if (isNaN(minute)) minute = "";
  return minute;
};

const zeroFormat = () => {
  startMinute.value = String(startMinute.value).padStart(2, "0");
  endMinute.value = String(endMinute.value).padStart(2, "0");
};

const updateDate = () => {
  let start;
  let end;

  // 시작 날짜와 시간을 합쳐서 Date 객체로 변환
  start = new Date(
    `${startDateInput.value}T${String(startHour.value).padStart(
      2,
      "0"
    )}:${String(startMinute.value).padStart(2, "0")}:00`
  );

  // 종료 날짜와 시간을 합쳐서 Date 객체로 변환
  end = new Date(
    `${endDateInput.value}T${String(endHour.value).padStart(2, "0")}:${String(
      endMinute.value
    ).padStart(2, "0")}:00`
  );

  // 시간대 변환
  start.setHours(start.getHours() + 9);
  end.setHours(end.getHours() + 9);

  // 유효한 날짜인지 확인
  if (!isNaN(start) && !isNaN(end)) {
    startDate.value = start.toISOString();
    endDate.value = end.toISOString();
  } else {
    console.error("Invalid date values in dateRange.value");
  }
};

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
  resetDate();
  dialog2.value = true;
};

const openDialog3 = () => {
  resetDate;
  if (selectedData.value.length > 0) {
    selecteddivision.value = selectedData.value[0].division;
    selectedname.value = selectedData.value[0].testName;
    selectedstartdate.value = selectedData.value[0].startdate;
    console.log(selectedData.value[0].startdate);
    selectedenddate.value = selectedData.value[0].enddate;
    selectedshipId.value = selectedData.value[0].shipid;
    selectedshipname.value = selectedData.value[0].name;
    selectedpurpose.value = selectedData.value[0].purpose;
    selectedlocation.value = selectedData.value[0].location;
    selecteddescription.value = selectedData.value[0].description;

    const startDay = selectedData.value[0].startdate.split("T")[0]; // 2024-08-20
    const endDay = selectedData.value[0].enddate.split("T")[0]; // 2024-08-20

    // 시간 값 추출
    const startTimePart = selectedData.value[0].startdate.split("T")[1]; // '00:18:59.000000Z'
    const startHH = startTimePart.split(":")[0]; // '00'
    const startMM = startTimePart.split(":")[1]; // '18'

    const endTimePart = selectedData.value[0].enddate.split("T")[1]; // '00:18:59.000000Z'
    const endHH = endTimePart.split(":")[0]; // '00'
    const endMM = endTimePart.split(":")[1]; // '18'

    startDateInput.value = startDay;
    startHour.value = startHH;
    startMinute.value = startMM;

    endDateInput.value = endDay;
    endHour.value = endHH;
    endMinute.value = endMM;

    console.log(startDay);
    console.log(endDay);
    console.log(startHH);
    console.log(startMM);
    console.log(endHH);
    console.log(endMM);

    dialog3.value = true;
  } else {
    alert("시험을 선택해주세요.");
    console.log("시험을 선택해주세요.");
  }
};

const openDialog4 = () => {
  if (selectedData.value.length > 0) {
    selectedname.value = selectedData.value[0].testName;
    dialog4.value = true;
  } else {
    alert("시험을 선택해주세요.");
    console.log("시험을 선택해주세요.");
  }
};

const nullDialog1 = () => {
  dialog1.value = false;
  startname.value = null;
  startshipname.value = null;
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
  zeroFormat();
  dialog2.value = false;
  editname.value = null;
  editshipname.value = null;
  editstartdate.value = null;
  editenddate.value = null;
  editdescription.value = null;
  editlocation.value = null;
  editpurpose.value = null;
};
const nullDialog3 = () => {
  dialog3.value = false;
  selectedname.value = "";
  selectedshipname.value = "";
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
    alert("빈칸을 전부 기입하세요.");
  } else {
    try {
      sessionStorage.setItem("name", startname.value.toString());
      sessionStorage.setItem("shipname", startshipname.value.toString());
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
      alert("시험 측정이 시작됩니다.");
      location.reload();
    } catch (error) {
      // 특정 에러인 경우에 따라 다르게 처리합니다.
      if (error instanceof TypeError && error.message.includes("toString")) {
        alert("시험 정보를 전부 입력해 주세요.");
        console.error("toString error occurred in waitStart:", error.message);
      } else {
        console.error("An error occurred in waitStart:", error);
      }
    }
  }
};

// 종료하기 후 저장
const startData = async () => {
  //overlay.value = true;
  loadDialog.value = true;
  dialog1_1.value = false;
  sessionStorage.setItem("startstate", "false");
  startstate.value = false;
  const name = sessionStorage.getItem("name") || null;
  const shipname = sessionStorage.getItem("shipname") || null;
  const testPurpose = sessionStorage.getItem("testPurpose") || null;
  const navigationArea = sessionStorage.getItem("navigationArea") || null;
  const startTimeUtc = sessionStorage.getItem("startTimeUtc") || null;
  const endTimeUtc = sessionStorage.getItem("endTimeUtc") || null;
  const description = sessionStorage.getItem("description") || null;

  const data = {
    testName: name,
    shipName: shipname,
    shipId: "440714900",
    testPurpose: testPurpose,
    navigationArea: navigationArea,
    startTimeUtc: startTimeUtc,
    endTimeUtc: endTimeUtc,
    description: description,
    storageSize: 0,
  };
  try {
    await createTrialData(tokenid.value, data);

    sessionStorage.removeItem("name");
    sessionStorage.removeItem("shipname");
    sessionStorage.removeItem("testPurpose");
    sessionStorage.removeItem("navigationArea");
    sessionStorage.removeItem("startTimeUtc");
    sessionStorage.removeItem("endTimeUtc");
    sessionStorage.removeItem("description");

    // console.log(response.data);
    overlay.value = false;
    alert("시험 측정이 종료됩니다.");
    location.reload();
  } catch (error) {
    console.error(error);
    alert(error.response?.data || "An error occurred during signup.");
    overlay.value = false;
    alert("");
  }

  nullDialog1_1();
};

// 종료하기 후 취소
const cancelData = async () => {
  sessionStorage.removeItem("name");
  sessionStorage.removeItem("shipname");
  sessionStorage.removeItem("testPurpose");
  sessionStorage.removeItem("navigationArea");
  sessionStorage.removeItem("startTimeUtc");
  sessionStorage.removeItem("endTimeUtc");
  sessionStorage.removeItem("description");
  sessionStorage.setItem("startstate", "false");
  startstate.value = false;
  alert("시험 측정이 종료됩니다.");
  location.reload();
  nullDialog1_1();
};

// ------------------- 시험 추가하기 ---------------------- //
const editData = async () => {
  updateDate();

  console.log(startDate.value);
  console.log(endDate.value);
  zeroFormat();
  if (
    editname.value === "" ||
    editpurpose.value === "" ||
    editlocation.value === "" ||
    editdescription.value === "" ||
    startDate.value === "" ||
    startDate.value === null ||
    endDate.value === null ||
    endDate.value === ""
  ) {
    alert("시험 정보를 전부 올바르게 입력해 주세요.");
  } else if (startDate.value > endDate.value) {
    alert("종료시간이 시작시간보다 더 빠릅니다.");
  } else if (startDate.value === endDate.value) {
    alert("시작시간과 종료시간이 같습니다.");
  } else {
    try {
      //overlay.value = true;
      loadDialog.value = true;
      dialog2.value = false;

      const data = {
        testName: editname.value,
        shipName: editshipname.value,
        shipId: "440714900",
        testPurpose: editpurpose.value,
        navigationArea: editlocation.value,
        startTimeUtc: startDate.value,
        endTimeUtc: endDate.value,
        description: editdescription.value,
      };
      startDate.value = null;
      endDate.value = null;

      try {
        await createTrialData(tokenid.value, data);
        overlay.value = false;

        alert("시험 추가가 완료되었습니다.");
        nullDialog2();
        // console.log("API 응답 데이터:", response.data);
        location.reload();
      } catch (error) {
        // 특정 에러인 경우에 따라 다르게 처리합니다.
        if (error instanceof TypeError && error.message.includes("toString")) {
          alert("시험 정보를 전부 입력해 주세요.");
          console.error("toString error occurred in waitStart:", error.message);
        } else {
          console.error("An error occurred in waitStart:", error);
        }
      }
    } catch (error) {
      console.error("An error occurred in waitStart:", error);
    }
  }
};

// 수정하기
const changeData = async () => {
  updateDate();
  loadDialog.value = true;
  //overlay.value = true;

  const saveTimeRange = timeRange.value.slice();
  timeRange.value.splice(selectedData.value[0].index, 1);
  timeRange.value = saveTimeRange;
  if (
    selectedname.value === "" ||
    selectedpurpose.value === "" ||
    selectedlocation.value === "" ||
    selecteddescription.value === "" ||
    startDate.value === "" ||
    startDate.value === null ||
    endDate.value === null ||
    endDate.value === ""
  ) {
    alert("시험 정보를 전부 올바르게 입력해 주세요.");
  } else if (startDate.value > endDate.value) {
    alert("종료시간이 시작시간보다 더 빠릅니다.");
  } else if (startDate.value === endDate.value) {
    alert("시작시간과 종료시간이 같습니다.");
  } else {
    // console.log(selectedData.value[0].division);
    try {
      const data = {
        testName: selectedname.value,
        shipName: selectedshipname.value,
        shipId: "440714900",
        testPurpose: selectedpurpose.value,
        navigationArea: selectedlocation.value,
        startTimeUtc: startDate.value,
        endTimeUtc: endDate.value,
        description: selecteddescription.value,
      };
      startDate.value = null;
      endDate.value = null;
      try {
        await updateTrialData(tokenid.value, data);
        nullDialog3();
        alert("선택된 시험의 수정이 완료되었습니다.");
        dialog3.value = false;
        location.reload();
      } catch (error) {
        if (error instanceof TypeError && error.message.includes("toString")) {
          alert("시험 정보를 올바르게 입력해 주세요.");
          console.error("toString error occurred in waitStart:", error.message);
        } else {
          console.error("An error occurred in waitStart:", error);
        }
      }
    } catch (error) {
      console.error(error);
      alert("선택된 시험 목록이 존재하지 않습니다.");
    }
  }
};

// 삭제하기
const deleteData = async () => {
  loadDialog.value = true;
  //overlay.value = true;
  overlayemit(true);
  dialog4.value = false;
  const data = {
    testName: selectedname.value,
  };
  try {
    await deleteTrialData(tokenid.value, data);

    alert("선택한 시험의 삭제가 완료되었습니다.");
    overlayemit(false);
    overlay.value = false;
    location.reload();
  } catch (error) {
    console.log("삭제 에러");
  }
};

// emits
const overlayemit = (data) => {
  // 로그아웃 로직을 구현
  emit("overlay", data);
};

// 데이터 테이블 헤더
const headers = ref([
  { title: "시험", align: "start", sortable: true, key: "testName" },
  { title: "시작시간", align: "start", key: "startdate", sortable: true },
  { title: "종료시간", align: "start", key: "enddate" },
  { title: "진행 시간", align: "start", key: "time" },
  { title: "Ship ID", align: "start", key: "shipid" },
  { title: "선박 이름", align: "start", key: "name" },
  { title: "목적", align: "start", key: "purpose" },
  { title: "해역 위치", align: "start", key: "location" },
  { title: "저장 용량", align: "start", key: "storage" },
  { title: "설명", align: "start", key: "description" },
  // { title: "입력자", align: "end", key: "user" },
]);

// const customSort = (items, index, isDesc) => {
//   alert('gd')
//   items.sort((a, b) => {
//     if (index[0] === 'starttime') {
//       if (!isDesc[0]) {
//         return new Date(`2022-01-01 ${b[index]}`) - new Date(`2022-01-01 ${a[index]}`);
//       } else {
//         return new Date(`2022-01-01 ${a[index]}`) - new Date(`2022-01-01 ${b[index]}`);
//       }
//     } else {
//       // 다른 열의 정렬 로직 추가
//     }
//   });
//   return items;
// };

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
      const size = parseFloat(response[i].storageSize).toFixed(1);
      const startUtc = response[i].startTimeUtc.substring(0, 22);
      const endUtc = response[i].endTimeUtc.substring(0, 22);
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      const storageSizeFloat = parseFloat(response[i].storageSize).toFixed(2);

      let Storage = "";
      if (storageSizeFloat === "NaN") {
        Storage = "0.00MB";
      } else if (storageSizeFloat > 1048576) {
        Storage = `${(storageSizeFloat / 1048576).toFixed(2)}TB`;
      } else if (storageSizeFloat > 1024 && storageSizeFloat <= 1048575) {
        Storage = `${(storageSizeFloat / 1024).toFixed(2)}GB`;
      } else {
        Storage = `${storageSizeFloat}MB`;
      }
      items.value.push({
        index: i,
        division: response[i].testId, // 필요없으면 없애도댐
        testName: response[i].testName,
        name: response[i].shipName,
        shipid: response[i].shipId,
        startdate: startUtc + "Z",
        purpose: response[i].testPurpose,
        location: response[i].navigationArea,
        storage: Storage,
        enddate: endUtc + "Z",
        description: response[i].description,
        time: formattedTime,
      });
      if (i === response.length - 1) {
        sessionStorage.setItem("division", Number(response[i].testId) + 1);
      }
    }
    items.value.sort((a, b) => {
      const dateA = new Date(a.startdate);
      const dateB = new Date(b.startdate);
      return dateB - dateA;
    });

    division.value = Number(response.length);
    // sessionStorage.setItem("division", division.value.toString());
  } catch (error) {
    console.error(error);
    message.value = `api 오류(${error})`;
  }
};

onMounted(() => {
  fetchData();
});

// const checkIfRangeExists = (range) => {
//   // 선택한 범위와 시련 기간을 비교하여 겹치는 부분이 있는지 확인하는 함수
//   // 선택한 범위와 시련 기간을 비교하여 겹치는 부분이 있는지 확인하는 함수
//   const isOverlap = (selectedRange, trialRange) => {
//     const [selectedStart, selectedEnd] = selectedRange
//       .split("~")
//       .map((dateString) => new Date(dateString));
//     const [trialStart, trialEnd] = trialRange
//       .split("~")
//       .map((dateString) => new Date(dateString));

//     // 겹치는 부분이 있으면 true를 반환
//     return (
//       (selectedStart >= trialStart && selectedStart <= trialEnd) ||
//       (selectedEnd >= trialStart && selectedEnd <= trialEnd) ||
//       (trialStart >= selectedStart && trialStart <= selectedEnd) ||
//       (trialEnd >= selectedStart && trialEnd <= selectedEnd)
//     );
//   };

//   // 선택한 범위
//   const selectedRange = range;

//   // 시련 기간을 반복하여 겹치는 부분이 있는지 확인
//   const isExist = timeRange.value.some((trialRange) =>
//     isOverlap(selectedRange, trialRange)
//   );

//   return isExist;
// };
</script>

<style scoped>
/* DatePicker 테두리 스타일 추가 */
.date-picker {
  border: 1px solid #ccc;
  padding: 0.3rem;
  border-radius: 4px;
  width: 194px;
  box-sizing: border-box;
}

.time-select {
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px;
  width: 50px;
}

.m-time-input {
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px;
  width: 50px;
}

.time-divider {
  margin-right: 5px;
  font-size: 18px;
}

/* 시간 입력 필드 스타일 */
.time-input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  width: 50px;
  text-align: center;
  margin: 0 5px;
}

.time-input:focus {
  outline: none;
  border-color: #007bff;
}

.date-input {
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
}

.row-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 3px; /* 요소 간 간격 조절 */
}

.span-title {
  margin-top: 30px;
  font-size: 16px;
  font-weight: 550;
}
select.time-select {
  background-color: selectColor; /* 어두운 배경 */
  color: selectTextColor; /* 텍스트 색상 */
  border-radius: 4px;
  padding: 5px;
}

/* 옵션 목록의 스타일 */
select.time-select option {
  background-color: selectColor; /* 옵션 배경색 */
  color: selectTextColor; /* 옵션 텍스트 색상 */
}

/* 커서 포인터 추가 */
select.time-select {
  cursor: pointer;
}

.dp__theme_dark {
  --dp-background-color: #424242;
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #999;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>
