<template>
  <div>
    <!-- 사용자 이름이 'a' 일 때 대시보드를 보여줌 -->
    <div v-if="showDashboard">
      <Dashboard :username="userid" @logout="logout" />
    </div>
    <!-- 사용자 이름이 'a'가 아닐 때 로그인 양식 표시 -->
    <div v-else>
      <div class="form-signin">
        <img
          src="https://kassproject.org/include/download_img.php?idx=9b1c034190fcb2798286ff057bde5b56"
          alt=""
          width="172"
          height="137"
        />
        <p class="ml-1 text-start">로그인하기</p>
        <hr />
        <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit="login">
            <v-text-field
              type="text"
              v-model="userid"
              label="ID"
              :rules="IDRules"
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              label="Password"
              :rules="PasswordRules"
            ></v-text-field>

            <v-btn type="submit" block class="btn-skyblue"
              >Submit</v-btn
            >
          </v-form>
          <a id="forget" href="#">비밀번호가 기억나지 않으세요?</a>
          <hr />
          <v-btn type="button" class="btn-skyblue btn-width">Sign up</v-btn>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Dashboard from "../src/views/MainDashBoard.vue";

// 사용자 로그인 상태를 세션 스토리지에서 가져옵니다.
const showDashboard = ref(sessionStorage.getItem("showDashboard") === "true" || false);
const userid = ref(sessionStorage.getItem("userid") || "");
const password = ref("");
const IDRules = [
  value => {
    if (value?.length > 0) return true
    return 'First name must be at least 3 characters.'
  },
];
const PasswordRules = [
  value => {
    if (/[^0-9]/.test(value)) return true
    return 'Last name cannot contain digits.'
  },
];

// 페이지가 처음 로드될 때 사용자 로그인 상태를 확인합니다.
onMounted(() => {
  if (userid.value === "a") {
    showDashboard.value = true;
  }
});

// 로그인 및 로그아웃 로직을 구현합니다.
const login = () => {
  if (userid.value === "a") {
    showDashboard.value = true;
  }
  // 세션 스토리지에 사용자 로그인 상태를 저장합니다.
  sessionStorage.setItem("showDashboard", showDashboard.value.toString());
  sessionStorage.setItem("userid", userid.value);
};

const logout = (newUserid) => {
  userid.value = newUserid;
  showDashboard.value = false;
  // 세션 스토리지에서 사용자 로그인 상태를 저장합니다.
  sessionStorage.setItem("showDashboard", showDashboard.value.toString());
  sessionStorage.setItem("userid", userid.value);
};
</script>

<style scoped>
.form-signin {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}

#logintext {
  font-size: 14px;
}

hr {
  color: skyblue;
}

#forget {
  display: block;
  text-align: left;
  margin-top: 10px;
}

.btn-skyblue {
  color: #fff;
  background-color: #67caf1; /* 하늘색 HEX 코드 */
  border-color: #67caf1; /* 하늘색 HEX 코드 */
}

.btn-skyblue:hover {
  background-color: #5badee; /* 하늘색의 hover 상태 HEX 코드 */
  border-color: #5badee; /* 하늘색의 hover 상태 HEX 코드 */
}

.btn-width {
  width: 400px;
  color: white;
}
</style>
