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

        <v-form fast-fail @submit="login">
          <div class="text-subtitle-1 text-medium-emphasis d-flex justify-left">
            Account
          </div>

          <v-text-field
            density="compact"
            placeholder="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            type="text"
            v-model="userid"
            :rules="IDRules"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            Password

            <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Forgot login password?</a
            >
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            v-model="password"
            :rules="PasswordRules"
            density="compact"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>

          <v-card class="mb-12" color="surface-variant" variant="tonal">
            <v-card-text class="text-medium-emphasis text-caption">
              Warning: After 3 consecutive failed login attempts, you account
              will be temporarily locked for three hours. If you must login now,
              you can also click "Forgot login password?" below to reset the
              login password.
            </v-card-text>
          </v-card>

          <v-btn
            type="submit"
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
          >
            Log In
          </v-btn>

          <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text>
        </v-form>

        <!-- <hr />
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

            <v-btn type="submit" block class="btn-skyblue">Submit</v-btn>
          </v-form>
          <a id="forget" href="#">비밀번호가 기억나지 않으세요?</a>
          <hr />
          <v-btn type="button" class="btn-skyblue btn-width">Sign up</v-btn>
        </v-sheet> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Dashboard from "../src/views/MainDashBoard.vue";

const visible = ref(false);
const isAdmin = ref(false);

// 사용자 로그인 상태를 세션 스토리지에서 가져옵니다.
const showDashboard = ref(
  sessionStorage.getItem("showDashboard") === "true" || false
);
const userid = ref(sessionStorage.getItem("userid") || "");
const password = ref("");
const IDRules = [
  (value) => {
    if (value?.length > 0) return true;
    return "First name must be at least 3 characters.";
  },
];
const PasswordRules = [
  (value) => {
    if (/[^0-9]/.test(value)) return true;
    return "Last name cannot contain digits.";
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
  sessionStorage.setItem("isAdmin", userid.value);
};

const logout = (newUserid) => {
  userid.value = newUserid;
  showDashboard.value = false;
  // 세션 스토리지에서 사용자 로그인 상태를 저장합니다.
  sessionStorage.setItem("showDashboard", showDashboard.value.toString());
  sessionStorage.setItem("userid", userid.value);
  sessionStorage.setItem("isAdmin", userid.value);
};
</script>

<style>
.my-app {
  min-height: 100vh; /* 최소 높이를 화면 높이(100vh)로 설정합니다. */
  overflow-y: auto; /* 세로 스크롤 바를 표시합니다. */
}
.scroll {
  overflow-y: auto;
}
.scrollable-card {
  scrollbar-width: none; /* Firefox에 대한 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE에 대한 스크롤바 숨김 */
}

.scrollable-card::-webkit-scrollbar {
  width: 0.2em; /* 스크롤바 너비 조절 */
}

.scrollable-card::-webkit-scrollbar-thumb {
  background-color: transparent; /* 스크롤바 썸 네일 배경색 투명으로 설정하여 숨김 */
}
</style>

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
