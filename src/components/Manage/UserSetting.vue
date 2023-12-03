<template>
  <v-sheet class="manager-sheet">
    <v-card class="scrollable-card" style="flex: 1; height: 75vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;">
      <v-card-item>
        <v-row class="dialog-row">
          <div class="dialog-div">
            <!-- <v-btn color="blue" @click="update()">수정하기</v-btn> -->

            <v-btn color="blue" @click="check()"> 수정하기 </v-btn>

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
                          label="사용자 ID"
                          
                          required
                          v-model="selectedId"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          label="이름"
                          
                          hint="example of persistent helper text"
                          persistent-hint
                          v-model="selecteduserName"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="selectedemail"
                          label="이메일"
                          
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
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
                          label="설명"
                          type="text"
                          maxlength="120"
                          v-model="selecteddescription"
                          multi-line
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="nullDialog"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="changeData(), (dialog = false)"
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
          density="compact"
          hide-default-footer
          item-key="userName"
          item-value="name"
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
  </v-sheet>
</template>

<script setup>
import { computed, ref } from "vue";
import axios from "axios";

const dialog = ref(false);
const page = ref(1);
const itemsPerPage = ref(13);

const selectedId = ref();
const selecteduserName = ref();
const selecteddepartment = ref();
const selectedemail = ref();
const selecteduserGroup = ref();
const selecteddescription = ref();
const selectedphoneNumber = ref();
const readonly = ref(true);
const message = ref("유저 정보 로딩중...");

const username = ref("홍길동");

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
    console.log("No user selected");
  }
  console.log(selectedphoneNumber.value);

  console.log(selectedemail.value);
};

const saveData = () => {};

const pageCount = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage.value);
});

const headers = ref([
  { title: "userName", key: "userName" },
  { title: "department", key: "department" },
  { title: "email", key: "email" },
  { title: "userGroup", key: "userGroup" },
  { title: "phoneNumber", key: "phoneNumber" },
  { title: "description", key: "description" },
]);

const items = ref([]);
const selectedItems = ref([]);
const tokenid = ref(sessionStorage.getItem("token") || "");
// 데이터 받아오기
const fetchData = async () => {
  try {
    const response = await axios.post(
      "http://192.168.0.73:8080/admin/auth/userinfo/all",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`,
        },
      }
    );
    console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
      items.value.push({
        userId: response.data[i].id || "",
        userName: response.data[i].userName || "",
        userGroup: response.data[i].userGroup || "",
        department: response.data[i].department || "",
        phoneNumber: response.data[i].phoneNumber || "",
        description: response.data[i].description || "",
        email: response.data[i].email || "",
      });
      // items.value.push(response.data[i]);
    }
  } catch (error) {
    console.error(error);
    message.value = `api 오류(${error})`;
  }
};

fetchData();

const changeData = () => {
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
      axios.post("http://192.168.0.73:8080/admin/auth/userinfo/update", data, {
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
  nullDialog();
  location.reload();
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

// 데이터 테이블 바디
const items1 = ref([
  
]);
</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
}
</style>
