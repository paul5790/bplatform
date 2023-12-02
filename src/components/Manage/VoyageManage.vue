<template>
  <v-sheet class="manager-sheet">
    <v-card style="flex: 1">
      <v-card-item>
        <v-row class="dialog-row">
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
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 이름 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="startname"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

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
                                  항차 목적 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="startpurpose"
                                type="text"
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
          <!-- 종료 후 저장 -->
          <div class="dialog-div">
            <v-btn
              v-if="startstate"
              color="blue"
              v-bind="props"
              @click="openDialog1_1()"
            >
              시운전 진행중..(종료하기)
            </v-btn>
            <v-dialog v-model="dialog1_1" persistent width="600">
              <v-card>
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
                    color="blue-darken-1"
                    variant="text"
                    @click="nullDialog1_1()"
                  >
                    뒤로가기
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
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 구분
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="division"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 이름 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="editname"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

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
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4" style="margin-top: 28px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 목적 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="editpurpose"
                                type="text"
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
                                style="margin-bottom: 35px"
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
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="editData()"
                  >
                    Save
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
                  <span class="text-h5">항차 추가</span>
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
                                  항차 구분
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="selecteddivision"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="4" style="margin-top: 5px">
                              <v-list-subheader
                                ><p style="font-size: 17px">
                                  항차 이름 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                variant="outlined"
                                v-model="selectedname"
                                type="text"
                              ></v-text-field>
                            </v-col>
                          </v-row>

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
                                  항차 목적 입력
                                </p></v-list-subheader
                              >
                            </v-col>

                            <v-col cols="8">
                              <v-text-field
                                style="margin-top: 20px"
                                variant="outlined"
                                v-model="selectedpurpose"
                                type="text"
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
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="changeData()"
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
          v-model="selectedData"
          v-model:page="page"
          class="elevation-1"
          :headers="headers"
          :items="items"
          :items-per-page="itemsPerPage"
          density="compact"
          hide-default-footer
          item-value="name"
          select-strategy="single"
          return-object
          show-select
        >
          <template v-slot:no-data>
            <v-sheet
              height="40vh"
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
  </v-sheet>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import axios from "axios";

// 데이터 테이블 하단 바 설정
const page = ref(1);
const itemsPerPage = ref(13);
const dialog1 = ref(false);
const dialog1_1 = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const message = ref("항차 테이블 정보 로딩중...");

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

let isEditing = ref(false); // 수정 모드인지 여부

// 데이트 피커
startTimeUtc.value = new Date();

const openDialog1 = () => {
  dialog1.value = true;
};

const openDialog1_1 = () => {
  endTimeUtc.value = new Date();
  sessionStorage.setItem("endTimeUtc", endTimeUtc.value.toString());
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
  } else {
    alert(null);
    console.log("항차를 선택해주세요.");
  }
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

// 시작하기 후 대기
const waitStart = () => {
  try {
    sessionStorage.setItem("name", startname.value.toString());
    sessionStorage.setItem("testPurpose", startpurpose.value.toString());
    sessionStorage.setItem("navigationArea", startlocation.value.toString());
    sessionStorage.setItem("startTimeUtc", startTimeUtc.value.toString());
    sessionStorage.setItem("description", startdescription.value.toString());

    sessionStorage.setItem("startstate", "true");
    startstate.value = true;
    nullDialog1();
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
  
};

// 종료하기 후 저장
const startData = () => {
  sessionStorage.setItem("startstate", "false");
  startstate.value = false;

  const name = (sessionStorage.getItem("name")) || null;
  const testPurpose = (sessionStorage.getItem("testPurpose")) || null;
  const navigationArea = (sessionStorage.getItem("navigationArea")) || null;
  const startTimeUtc = (sessionStorage.getItem("startTimeUtc")) || null;
  const endTimeUtc = (sessionStorage.getItem("endTimeUtc")) || null;
  const description = (sessionStorage.getItem("description")) || null;

  const data = {
    seatrialId: division.value,
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
    axios.post("http://192.168.0.73:8080/admin/set/info/seatrial", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenid.value}`,
      },
    });
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("testPurpose");
    sessionStorage.removeItem("navigationArea");
    sessionStorage.removeItem("startTimeUtc");
    sessionStorage.removeItem("endTimeUtc");
    sessionStorage.removeItem("description");
    location.reload();
  } catch (error) {
    console.error(error);
    alert(error.response?.data || "An error occurred during signup.");
  }

  nullDialog1_1();
};
const editData = () => {
  const data = {
    seatrialId: division.value,
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
    axios.post("http://192.168.0.73:8080/admin/set/info/seatrial", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenid.value}`,
      },
    });
  } catch (error) {
    console.error(error);
    alert(error.response?.data || "An error occurred during signup.");
  }
  dialog2.value = false;
  nullDialog2();
  location.reload();
};

const changeData = () => {
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
      axios.post("http://192.168.0.73:8080/admin/update/info/seatrial", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`,
        },
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred during signup.");
    }
  } catch (error) {
    console.error(error);
    alert("선택된 항차 목록이 존재하지 않습니다.");
  }

  fetchData();
  dialog3.value = false;
  nullDialog3();
  location.reload();
};

// 데이터 테이블 헤더
const headers = ref([
  { title: "구분", align: "start", key: "division" },
  { title: "항차", align: "start", key: "name" },
  { title: "Ship ID", align: "start", key: "shipid" },
  { title: "시작시간", align: "start", key: "startdate" },
  { title: "끝시간", align: "start", key: "enddate" },
  { title: "목적", align: "start", key: "purpose" },
  { title: "해역 위치", align: "start", key: "location" },
  { title: "저장 용량", align: "start", key: "storage" },
  { title: "설명", align: "start", key: "description" },
  { title: "입력자", align: "end", key: "user" },
]);

const items = ref([]);

// 데이터 받아오기
const fetchData = async () => {
  try {
    const response = await axios.post("http://192.168.0.73:8080/info/seatrial");
    for (let i = 0; i < response.data.length; i++) {
      items.value.push({
        division: response.data[i].seatrialId,
        name: response.data[i].name,
        shipid: response.data[i].groupId,
        startdate: response.data[i].startTimeUtc,
        purpose: response.data[i].testPurpose,
        location: response.data[i].navigationArea,
        storage: response.data[i].storageSize,
        enddate: response.data[i].endTimeUtc,
        description: response.data[i].description,
      });
    }
    division.value = Number(response.data.length) + 1;
    sessionStorage.setItem("division", division.value.toString());
  } catch (error) {
    console.error(error);
    message.value = `api 오류(${error})`;
  }
};

onMounted(() => {
  fetchData();
});

console.log(items);
</script>

<style scoped></style>
