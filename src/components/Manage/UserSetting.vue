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
          <div class="dialog-div">
            <!-- <v-btn color="blue" @click="update()">수정하기</v-btn> -->

            <div style="display: flex">
              <v-btn :color = btnColor @click="check()"> 수정하기 </v-btn>

              <v-dialog v-model="dialog" persistent width="1024">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">유저 정보</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12"
                          ><p style="font-size: 13px">기본 정보</p></v-col
                        >
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :readonly="true"
                            label="사용자 ID"
                            required
                            v-model="selectedId"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :readonly="true"
                            label="이름"
                            hint="example of persistent helper text"
                            persistent-hint
                            v-model="selecteduserName"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :readonly="true"
                            v-model="selectedemail"
                            label="이메일"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            :readonly="true"
                            v-model="selectedphoneNumber"
                            label="전화번호"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12"
                          ><p style="font-size: 13px">유저 설정</p></v-col
                        >
                        <v-col cols="12" sm="6">
                          <v-text-field
                            label="소속"
                            type="text"
                            :rules="rules.department"
                            v-model="selecteddepartment"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['ADMIN', 'USER', 'GUEST']"
                            label="권한*"
                            v-model="selecteduserGroup"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            counter="25"
                            label="설명"
                            type="text"
                            :rules="rules.description"
                            maxlength="25"
                            v-model="selecteddescription"
                            multi-line
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="deep-orange-darken-1"
                      variant="text"
                      @click="resetPW()"
                    >
                      비밀번호 초기화
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="nullDialog"
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
            <div style="display: flex; margin-left: 15px">
              <v-btn :color = btnColor @click="check2()"> 삭제하기 </v-btn>

              <v-dialog v-model="dialog2" persistent width="400">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">유저 정보 삭제</span>
                  </v-card-title>
                  <v-card-text
                    >{{ selectedId }}의 정보를 삭제하시겠습니까?</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="deleteData()"
                      >예</v-btn
                    >
                    <v-btn
                      color="blue-darken-1"
                      variant="text"
                      @click="cancel()"
                      >아니오</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
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
          density="compact"
          hide-default-footer
          item-key="userName"
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
    <v-dialog v-model="loadDialog" max-width="400">
      <v-card>
        <v-card-text>
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              loading...
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="deep-purple-accent-4"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="(loadDialog = false), cancleLoading()"
            >취소</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  readUserData,
  deleteUserData,
  updateUserData,
  resetPassword
} from "../../api/index.js";
import {
  darkbackcolor,
  whitebackcolor,
  darkbtn,
  lightbtn,
} from "../../color/color.js";

const themeMode = ref(localStorage.getItem("themeMode") || "light");
const userId = ref(sessionStorage.getItem("id") || "");

const btnColor = ref(themeMode.value === "light" ? lightbtn : darkbtn);
watch(themeMode, (newValue) => {
  themeColor.value = newValue === "light" ? lightbtn : darkbtn;
});

const themeColor = ref(
  themeMode.value === "light" ? whitebackcolor : darkbackcolor
);
watch(themeMode, (newValue) => {
  themeColor.value = newValue === "light" ? whitebackcolor : darkbackcolor;
});
const dialog = ref(false);
const dialog2 = ref(false);
const page = ref(1);
const itemsPerPage = ref(13);

// load dialog
const loadDialog = ref(false);

const selectedId = ref();
const selecteduserName = ref();
const selecteddepartment = ref();
const selectedemail = ref();
const selecteduserGroup = ref();
const selecteddescription = ref();
const selectedphoneNumber = ref();
const message = ref("유저 정보 로딩중...");

const rulesdepartment = ref(false);
const rulesdescription = ref(false);
// Rules
const rules = ref({
  department: [
    (value) => {
      if (value?.length > 0) {
        rulesdepartment.value = true;
        return true;
      } else {
        rulesdepartment.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  description: [
    (value) => {
      if (value?.length <= 25) {
        rulesdescription.value = true;
        return true;
      } else {
        rulesdescription.value = false;
        return "최대 25자까지 작성 가능합니다.";
      }
    },
  ],
});

const check = () => {
  if (selectedItems.value.length > 0) {
    selectedId.value = selectedItems.value[0].userId;
    selecteduserName.value = selectedItems.value[0].userName;
    selecteddepartment.value = selectedItems.value[0].department;
    selectedemail.value = selectedItems.value[0].email;
    selecteduserGroup.value = selectedItems.value[0].userGroup;
    selecteddescription.value = selectedItems.value[0].description;
    selectedphoneNumber.value = selectedItems.value[0].phoneNumber;
    if (
      selecteduserName.value === null ||
      selecteduserName.value === "" ||
      selecteduserName.value === undefined
    ) {
      dialog.value = true;
      console.log("No user selected");
    } else {
      dialog.value = true;
    }
  } else {
    alert("유저를 선택해주세요.");
    console.log("No user selected");
  }
  console.log(selectedphoneNumber.value);

  console.log(selectedemail.value);
};
const check2 = () => {
  if (selectedItems.value.length > 0) {
    selectedId.value = selectedItems.value[0].userId;
    if (
      selecteduserName.value === null ||
      selecteduserName.value === "" ||
      selecteduserName.value === undefined
    ) {
      dialog2.value = true;
      console.log("No user selected");
    } else {
      dialog2.value = true;
    }
  } else {
    alert("유저를 선택해주세요.");
    console.log("No user selected");
  }
  console.log(selectedphoneNumber.value);

  console.log(selectedemail.value);
};

// 비밀번호 초기화
const resetPW= () => {
  let data = {
    "id":selectedId.value
  };
  console.log(data);
  try{
    resetPassword(tokenid.value, data);
    
    alert("비밀번호가 초기화 되었습니다.")
  }
  catch(error) {
    console.error(error);
    message.value = `api 오류(${error})`;
  }
}

const deleteData = async () => {
  const data = {
    id: selectedId.value,
  };
  try {
    await deleteUserData(tokenid.value, data);

    dialog2.value = false;
    alert("선택된 사용자의 정보 삭제가 완료되었습니다.");
    location.reload();
  } catch (error) {
    // 특정 에러인 경우에 따라 다르게 처리합니다.

    console.error("An error occurred in waitStart:", error);
  }
};

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const headers = ref([
  { title: "사용자 ID", key: "userId" },
  { title: "이름", key: "userName" },
  { title: "권한", key: "userGroup" },
  { title: "소속", key: "department" },
  { title: "이메일", key: "email" },
  { title: "전화번호", key: "phoneNumber" },
  { title: "설명", key: "description" },
]);

const items = ref([]);
const selectedItems = ref([]);
const tokenid = ref(sessionStorage.getItem("token") || "");
// 데이터 받아오기
const fetchData = async () => {
  try {
    const response = await readUserData(tokenid.value);
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      items.value.push({
        userId: response[i].id || "",
        userName: response[i].userName || "",
        userGroup: response[i].userGroup || "",
        department: response[i].department || "",
        phoneNumber: response[i].phoneNumber || "",
        description: response[i].description || "",
        email: response[i].email || "",
      });
      // items.value.push(response.data[i]);
    }
  } catch (error) {
    console.error(error);
    message.value = `api 오류(${error})`;
  }
};

fetchData();

const changeData = async () => {
  if (rulesdepartment.value === true && rulesdescription.value === true) {
    console.log(selectedItems.value);
    try {
      const data = {
        id: selectedId.value,
        userName: selecteduserName.value,
        userGroup: selecteduserGroup.value,
        department: selecteddepartment.value,
        phoneNumber: selectedphoneNumber.value,
        eMail: selectedemail.value,
        description: selecteddescription.value,
      };
      console.log(data);
      try {
        await updateUserData(tokenid.value, data);

        alert("선택된 사용자의 정보 수정이 완료되었습니다.");
      } catch (error) {
        console.error(error);
        alert(error.response?.data || "An error occurred during signup.");
      }
    } catch (error) {
      console.error(error);
    }
    nullDialog();
    location.reload();
  } else {
    alert("소속을 입력해주세요.");
  }
};

const cancel = () => {
  dialog2.value = false;
};

const nullDialog = () => {
  dialog.value = false;
  selectedId.value = "";
  selecteduserName.value = "";
  selecteddepartment.value = "";
  selectedemail.value = "";
  selecteduserGroup.value = "";
  selecteddescription.value = "";
  selectedphoneNumber.value = "";
};
</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
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
