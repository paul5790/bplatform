<template>
  <v-row>
    <v-col cols="3">
      <v-sheet style="height: 80vh; padding: 30px; display: flex">
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <div style="height: 66vh">
              <v-card
                class="mx-auto scrollable-card"
                max-width="300"
                style="
                  flex: 1;
                  max-height: 63vh;
                  overflow-y: auto;
                  margin-top: 25px;
                "
              >
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="selectItem(item)"
                  >
                    {{ item.name }}
                  </v-list-item>
                </v-list>
              </v-card>
            </div>
            <div style="height: 6vh; display: flex; justify-content: center">
              <v-btn width="300" height="40">시작하기</v-btn>
            </div>
            <div style="height: 6vh; display: flex; justify-content: center">
              <v-btn width="300" height="40">추가하기</v-btn>
            </div>
            <div style="height: 17vh; display: flex; justify-content: center">
              <v-btn width="300" height="40">삭제하기</v-btn>
            </div>
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="9">
      <v-sheet
        style="height: 93vh; padding: 30px; padding-left: 0; display: flex"
      >
        <v-card
          :color="primary"
          :variant="elevated"
          style="flex: 1; padding: 50px"
        >
          <v-card-item>
            <v-container fluid>
              <v-row>
                <v-col cols="4" style="margin-top: 5px">
                  <v-list-subheader
                    >Enter vessel navigation information</v-list-subheader
                  >
                </v-col>

                <v-col cols="8">
                  <v-text-field
                    variant="outlined"
                    v-model="name"
                    type="text"
                    :readonly="!isEditing"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" style="margin-top: 8px">
                  <v-list-subheader>Ship voyage start time</v-list-subheader>
                </v-col>

                <v-col cols="8">
                  <!-- 날짜 설정 -->

                  <VueDatePicker
                    style="--dp-input-padding: 15px"
                    v-model="startdate"
                    text-input
                    :readonly="!isEditing"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" style="margin-top: 28px">
                  <v-list-subheader>Ship voyage end time</v-list-subheader>
                </v-col>

                <v-col cols="8">
                  <VueDatePicker
                    style="margin-top: 20px; --dp-input-padding: 15px"
                    v-model="enddate"
                    text-input
                    :readonly="!isEditing"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" style="margin-top: 28px">
                  <v-list-subheader>Explanation on sailing</v-list-subheader>
                </v-col>

                <v-col cols="8">
                  <v-text-field
                    style="margin-top: 20px"
                    variant="outlined"
                    v-model="description"
                    type="text"
                    :readonly="!isEditing"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" style="margin-top: 10px">
                  <v-list-subheader>Last modified user</v-list-subheader>
                </v-col>

                <v-col cols="8">
                  <v-text-field
                    variant="outlined"
                    v-model="modifieduser"
                    type="text"
                    :readonly="!isEditing"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <div
              style="
                margin-top: 100px;
                height: auto;
                padding: 15px;
                display: flex;
                align-items: start;
                justify-content: end;
              "
            >
              <v-btn
                @click="editData()"
                style="width: 180px; height: 40px; margin-right: 20px"
                >항차 수정</v-btn
              >
              <v-btn @click="saveData()" style="width: 180px; height: 40px"
                >항차 저장</v-btn
              >
            </div>
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

let selectedData = ref(null);
let name = ref("");
let startdate = ref("");
let enddate = ref("");
let description = ref("");
let modifieduser = ref("");
let isEditing = ref(false); // 수정 모드인지 여부

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

const items = ref([
  {
    name: "시운전 #1",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #2",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #3",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #4",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #5",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #6",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #7",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #8",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #9",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #10",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #11",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #12",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #13",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #14",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #15",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #16",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #17",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #18",
    startdate: "2023-09-27T08:28:43",
    enddate: "2023-09-30T08:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #19",
    startdate: "2023-10-20T04:28:43",
    enddate: "2023-10-21T06:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #20",
    startdate: "2023-10-29T18:28:43",
    enddate: "2023-10-29T20:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
  {
    name: "시운전 #21",
    startdate: "2023-08-29T08:28:43",
    enddate: "2023-08-31T01:24:33",
    description: "##테스트 시운전",
    username: username.value,
  },
]);

</script>

<style scoped></style>
