<template>
  <v-sheet>
    <v-card style="margin-top: 15px">
      <v-card-item>
        <v-row>
          <v-col cols="2" class="magint5">
            <v-list-subheader
              ><p style="font-size: 14px">
                데이터 소실주기 설정
              </p></v-list-subheader
            >
          </v-col>
          <v-col cols="1" class="magint5">
            <v-text-field
              variant="outlined"
              v-model="lossdatatime"
              type="text"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="magint5"
            ><v-list-subheader
              ><p style="font-size: 14px">초</p></v-list-subheader
            ></v-col
          >
        </v-row>
      </v-card-item>
    </v-card>
    <v-card style="margin-top: 15px">
      <v-card-item>
        <v-row>
          <v-col cols="2" class="magint5">
            <v-list-subheader
              ><p style="font-size: 14px">
                LampData 알림 주기
              </p></v-list-subheader
            >
          </v-col>
          <v-col cols="1" class="magint5">
            <v-text-field
              variant="outlined"
              v-model="lampdatatime"
              type="text"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="magint5"
            ><v-list-subheader
              ><p style="font-size: 14px">초</p></v-list-subheader
            ></v-col
          >
        </v-row>
      </v-card-item>
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        width="100px"
        color="white"
        style="background-color: #009dff; margin-top: 10px"
        @click="changeData()"
        >수정하기</v-btn
      >
    </v-card-actions>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const lossdatatime = ref(5);
const lampdatatime = ref(3);
const tokenid = ref(sessionStorage.getItem("token") || "");

const changeData = async () => {
  try {
    // 서버에 POST 요청을 보내고 응답을 받음
    const response = await axios.post(
      "http://192.168.0.73:8080/info/update/timedata",
      {
        lossTime: lossdatatime.value,
        lampTime: lampdatatime.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`, // response 변수의 정의가 필요함
        },
      }
    );

    // 응답에서 토큰을 추출하거나 적절한 방식으로 처리
    console.log(response.data);

    // 이후 작업 수행 (예: 토큰을 저장하거나 처리)
    sessionStorage.setItem("lossdatatime", lossdatatime.value.toString());
    sessionStorage.setItem("lampdatatime", lampdatatime.value.toString());
    alert("수정이 완료되었습니다.")
  } catch (error) {
    console.error(error);
  }
};

const fetchData = async () => {
  try {
      const timedata = await axios.post(
    "http://192.168.0.73:8080/info/get/timedata",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenid.value}`,
      },
    }
  );
  lossdatatime.value = timedata.data.lossTime;
  lampdatatime.value = timedata.data.lampTime;
  }
   catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchData();
});

</script>

<style scoped>
.magint5 {
  padding-top: 30px;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.flex-container {
  display: flex;
  flex: 1;
  align-items: center;
}

.margin-reset {
  margin: 0;
}

.select-margin {
  width: 150px;
  margin-left: 10px;
}
</style>
