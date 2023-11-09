<template>
  <div>
    <!-- 사용자 이름이 'a' 일 때 대시보드를 보여줌 -->
    <div v-if="showDashboard">
      <Dashboard :username="userid" @logout="logout" />
    </div>

    <!-- 회원가입 기능  -->
    <div v-else-if="showSignup">
      <div class="form-signup">
        <img
          src="https://kassproject.org/include/download_img.php?idx=9b1c034190fcb2798286ff057bde5b56"
          alt=""
          width="112"
          height="87"
        />
        <v-row>
          <v-col cols="9">
            <v-text-field
              variant="outlined"
              v-model="newid"
              :rules="rules.ID"
              label="아이디"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn @click="checkid()" style="height: 55px"> 중복확인 </v-btn>
          </v-col>
        </v-row>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          v-model="newpassword"
          :rules="rules.Password"
          label="비밀번호"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          :type="visible ? 'text' : 'password'"
          variant="outlined"
          v-model="checknewpassword"
          :rules="rules.PasswordConfirmation"
          label="비밀번호 확인"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newemail"
          :rules="rules.Email"
          label="이메일"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newname"
          :rules="rules.Basic"
          label="이름"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newaffiliation"
          :rules="rules.Basic"
          label="소속"
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-btn
              color="blue"
              class="halfbtn"
              @click="signfinish()"
              to="/"
            >
              돌아가기
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="blue" class="halfbtn" @click="checkid()" to="/">
              가입하기
            </v-btn>
          </v-col>
        </v-row>

        <v-btn @click="signfinish()" to="/">돌아가기</v-btn>
      </div>
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
            <router-link
              to="/signup"
              @click="signupBtn()"
              class="text-blue text-decoration-none"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </v-form>
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
const email = ref("");

// 회원 정보
let newid = ref("");
let newpassword = ref("");
let checknewpassword = ref("");
let newemail = ref("");
let newname = ref("");
let newaffiliation = ref("");

// Rules
const rules = ref({
  Basic: [
    (value) => {
      if (value?.length > 0) return true;
      return "Must be at least 1 character.";
    },
  ],
  ID: [
    (value) => {
      if (value?.length > 3) return true;
      return "ID must be at least 4 characters.";
    },
  ],
  Password: [
    (value) => {
      if (value?.length >= 6 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value))
        return true;
      return "Password must be at least 6 characters and contain numbers and letters..";
    },
  ],
  PasswordConfirmation: [
    () => {
      if (newpassword.value === checknewpassword.value) return true;
      return "Passwords do not match.";
    },
  ],
  Email: [
    (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    },
  ],
});

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

// 회원 가입 관리
const showSignup = ref(
  sessionStorage.getItem("showSignup") === "true" || false
);

const signupBtn = () => {
  showSignup.value = true;
  sessionStorage.setItem("showSignup", showSignup.value.toString());
};

const signfinish = () => {
  showSignup.value = false;
  sessionStorage.setItem("showSignup", showSignup.value.toString());
};

const checkid = () => {
  alert("중복확인");
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

.form-signup {
  text-align: center;
  max-width: 500px;
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

.halfbtn {
  width: 400px;
  height: 40px;
}
</style>
