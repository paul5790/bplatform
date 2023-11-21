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
          :src="require('../public/image/kriso.png')"
          alt=""
          width="200"
          style="margin-bottom: 30px"
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
            <v-btn
              color="blue"
              block
              size="large"
              variant="tonal"
              @click="checkid()"
              style="height: 55px"
            >
              중복확인
            </v-btn>
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
          :rules="rules.Name"
          label="이름"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newaffiliation"
          :rules="rules.Affiliation"
          label="소속"
        ></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-btn
              block
              color="blue"
              size="large"
              variant="tonal"
              class="halfbtn"
              @click="signfinish()"
              to="/"
            >
              돌아가기
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              color="blue"
              size="large"
              variant="tonal"
              class="halfbtn"
              @click="signupBtn()"
            >
              가입하기
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- 사용자 이름이 'a'가 아닐 때 로그인 양식 표시 -->
    <div v-else>
      <div class="form-signin">
        <img :src="require('../public/image/kriso.png')" alt="" width="200" />

        <v-form fast-fail style="margin-top: 30px">
          <div class="text-subtitle-1 text-medium-emphasis d-flex justify-left">
            아이디
          </div>

          <v-text-field
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
            비밀번호
          </div>

          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            v-model="password"
            :rules="PasswordRules"
            placeholder="Enter your password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
          <!-- 
          <v-card class="mb-12" color="surface-variant" variant="tonal">
            <v-card-text class="text-medium-emphasis text-caption">
              Warning: After 3 consecutive failed login attempts, you account
              will be temporarily locked for three hours. If you must login now,
              you can also click "Forgot login password?" below to reset the
              login password.
            </v-card-text>
          </v-card> -->

          <v-btn
            @click="login()"
            block
            color="blue"
            size="large"
            variant="tonal"
            class="mb-8"
          >
            Log In
          </v-btn>

          <v-card-text class="text-center">
            <router-link
              to="/signup"
              @click="movesignup()"
              class="text-blue text-decoration-none"
            >
              회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, router } from "vue";
import axios from "axios";
import Dashboard from "../src/views/MainDashBoard.vue";

const visible = ref(false);
const isAdmin = ref(false);

// 사용자 로그인 상태를 세션 스토리지에서 가져옵니다.
const showDashboard = ref(
  sessionStorage.getItem("showDashboard") === "true" || false
);
const userid = ref(sessionStorage.getItem("userid") || "");
const password = ref("");
// 회원 정보
const newid = ref("");
const newpassword = ref("");
const checknewpassword = ref("");
const newemail = ref("");
const newname = ref("");
const newaffiliation = ref("");

const rulesid = ref(false);
const rulespw = ref(false);
const rulescpw = ref(false);
const rulesemail = ref(false);
const rulesname = ref(false);
const rulesaf = ref(false);

// 회원 가입 관리
const showSignup = ref(
  sessionStorage.getItem("showSignup") === "true" || false
);

const movesignup = () => {
  showSignup.value = true;
  sessionStorage.setItem("showSignup", showSignup.value.toString());
};

const signupBtn = () => {
  console.log(newid.value);

  if (
    `${
      rulesid.value &&
      rulespw.value &&
      rulescpw.value &&
      rulesemail.value &&
      rulesname.value &&
      rulesaf.value
    }` === "true"
  ) {
    // 유효성 검사를 모두 통과한 경우

    const data = {
      userName: `${newid.value}`,
      password: `${newpassword.value}`,
    };
    // 회원가입 기능

    axios
      .post("http://192.168.0.73:8080/api/v1/users/join", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    showSignup.value = false;
    sessionStorage.setItem("showSignup", showSignup.value.toString());
  } else {
    // 유효성 검사를 통과하지 못한 경우
    alert(
      "입력을 하지 않았거나 유효성 검사를 통과하지 못한 항목이 있습니다.\n다시 확인해주세요."
    );
    // showSignup을 true로 유지
  }
};

const signfinish = () => {
  showSignup.value = false;
  sessionStorage.setItem("showSignup", showSignup.value.toString());
};

const checkid = () => {
  alert("중복확인");
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.73:8080/info/seatrial"
      );
      for (let i = 0; i < response.data.length; i++) {
        console.log(`${response.data[i].seatrialid} here!!!!!!!!!!!!`);
        console.log(`${response.data[i].test_PURPOSE} here!!!!!!!!!!!!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
};

// Rules
const rules = ref({
  Name: [
    (value) => {
      if (value?.length > 0) {
        rulesname.value = true;
        return true;
      } else {
        rulesname.value = false;
        return "Must be at least 1 character.";
      }
    },
  ],
  Affiliation: [
    (value) => {
      if (value?.length > 0) {
        rulesaf.value = true;
        return true;
      } else {
        rulesname.value = false;
        return "Must be at least 1 character.";
      }
    },
  ],
  ID: [
    (value) => {
      if (value?.length > 3) {
        rulesid.value = true;
        return true;
      } else {
        rulesname.value = false;
        return "ID must be at least 4 characters.";
      }
    },
  ],
  Password: [
    (value) => {
      if (value?.length >= 6 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
        rulespw.value = true;
        return true;
      } else {
        rulesname.value = false;
        return "Password must be at least 6 characters and contain numbers and letters..";
      }
    },
  ],
  PasswordConfirmation: [
    () => {
      if (newpassword.value === checknewpassword.value) {
        rulescpw.value = true;
        return true;
      } else {
        rulesname.value = false;
        return "Passwords do not match.";
      }
    },
  ],
  Email: [
    (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // return pattern.test(value) || "Invalid e-mail.";
      if (pattern.test(value)) {
        rulesemail.value = true;
        return true;
      } else {
        rulesemail.value = false;
        return "Invalid e-mail.";
      }
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
  const data = {
    userName: `${userid.value}`,
    password: `${password.value}`,
  };

  axios
    .post("http://192.168.0.73:8080/api/v1/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      showDashboard.value = true;
      sessionStorage.setItem("showDashboard", true);
      userid.value = '';
      password.value = '';
    })
    .catch((error) => {
      console.error(error.response.data);
      alert(error.response.data);
    });

  // 세션 스토리지에 사용자 로그인 상태를 저장합니다.
  sessionStorage.setItem("showDashboard", showDashboard.value.toString());
  sessionStorage.setItem("userid", userid.value);
  sessionStorage.setItem("isAdmin", userid.value);
};

const logout = () => {
  userid.value = "";
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

.scrollable-card-1 {
  scrollbar-width: thin; /* Firefox에 대한 스크롤바 조절 */
  -ms-overflow-style: none; /* IE에 대한 스크롤바 숨김 */
}

.scrollable-card-1::-webkit-scrollbar {
  width: 3px; /* 스크롤바 너비 5px로 조절 */
}

.scrollable-card-1::-webkit-scrollbar-thumb {
  background-color: #ccc; /* 스크롤바 썸 네일 배경색 설정 (원하는 색상으로 변경 가능) */
  border-radius: 3px; /* 스크롤바 썸 네일의 모서리를 둥글게 조절 */
}

.dialog-row {
  justify-content: flex-end;
  height: 6vh;
}
.dialog-div {
  display: flex;
  margin: 15px;
}
</style>

<style scoped>
.form-signin {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 150px;
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
