<template>
  <div
    :style="{
      'background-color': themeColor,
    }"
  >
    <!-- 사용자 이름이 'a' 일 때 대시보드를 보여줌 -->
    <div v-if="showDashboard">
      <Dashboard :username="userid" @logout="logout" />
    </div>

    <!-- 회원가입 기능  -->
    <div v-else-if="showSignup">
      <div class="form-signup">
        <img
          img
          src="/image/kriso.png"
          alt=""
          width="200"
          style="margin-bottom: 30px"
        />
        <v-text-field
          variant="outlined"
          v-model="newid"
          :rules="rules.ID"
          label="아이디"
        ></v-text-field>

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

        <v-text-field
          variant="outlined"
          v-model="newemail"
          :rules="rules.Email"
          label="이메일"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="newphone"
          label="전화번호"
          hint="선택사항"
        ></v-text-field>

        <v-row style="padding-top: 20px">
          <v-col cols="6">
            <v-btn
              block
              :color="btnColor"
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
              :color="btnColor"
              size="large"
              variant="tonal"
              class="halfbtn"
              @click="ruleCheck()"
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
        <img src="/image/kriso.png" alt="" width="200" />

        <v-form fast-fail style="margin-top: 30px">
          <div class="text-subtitle-1 text-medium-emphasis d-flex justify-left">
            아이디
          </div>

          <v-text-field
            placeholder="Enter your ID"
            prepend-inner-icon="mdi-account-outline"
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
            @keyup.enter="login()"
          ></v-text-field>

          <v-btn
            @click="login()"
            block
            :color="btnColor"
            size="large"
            variant="tonal"
            class="mb-8"
          >
            Log In
          </v-btn>

          <v-card-text class="text-center">
            <router-link
              to="/"
              :style="{ color: btnColor }"
              @click="movesignup()"
              class="text-decoration-none"
            >
              회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </v-form>
      </div>
    </div>

    <v-dialog v-model="termsDialog" max-width="700">
      <v-card title="서비스 이용약관 동의">
        <v-card-text style="margin-top: 20px">
          <v-card
            class="scrollable-card-1"
            style="padding: 30px; overflow-y: auto"
            max-height="550"
            variant="outlined"
            color="#333366"
          >
            <v-row style="height: 100px">
              <v-col style="margin-top: 17px"
                >1. 제공된 데이터는 신청서에 기재된 목적 및 범위에 한하여
                사용한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox1"></v-checkbox
              ></v-col>
            </v-row>

            <v-row style="height: 100px">
              <v-col style="margin-top: 10px"
                >2. 신청서 기재사항 변경(수정) 시 데이터 활용 신청서를 재송부
                하여야 한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox2"></v-checkbox
              ></v-col>
            </v-row>

            <v-row style="height: 100px">
              <v-col style="margin-top: 10px"
                >3. 자료 분석과정에서 알게 된 개별자료 및 개인정보 관련 사항에
                대한 공개 혹은 누설을 금지한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox3"></v-checkbox
              ></v-col>
            </v-row>

            <v-row style="height: 100px">
              <v-col style="margin-top: 10px"
                >4. 제공된 데이터를 인용 또는 공표 등 대외적으로 활용할 경우
                센터와 사전 협의하여야 한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox4"></v-checkbox
              ></v-col>
            </v-row>

            <v-row style="height: 100px">
              <v-col style="margin-top: 10px"
                >5. 제공된 데이터를 사용하여 도출된 모든 연구 성과에는 센터에서
                지정하는 방법에 따라 데이터의 출처를 명시한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox5"></v-checkbox
              ></v-col>
            </v-row>

            <v-row style="height: 100px">
              <v-col style="margin-top: 10px"
                >6. 센터 요청 시 자료처리 및 분석과정, 결과의 활용 등에 대한
                기술노트를 작성 및 제출하여야 한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox6"></v-checkbox
              ></v-col>
            </v-row>

            <v-row style="height: 100px">
              <v-col style="margin-top: 10px"
                >7. 준수사항 위반 시 해사안전법, 통계법, 개인정보보호법 등 관련
                규정에 의거하여 처벌될 수 있으므로 데이터가 유출되지 않도록
                한다.</v-col
              >
              <v-col cols="1">
                <v-checkbox v-model="checkbox7"></v-checkbox
              ></v-col>
            </v-row>
            <v-checkbox
              v-model="checkboxA"
              style="margin-top: 40px"
              label="전체 동의하기"
            ></v-checkbox>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="비동의"
            variant="text"
            @click="termsDialog = false"
          ></v-btn>

          <v-btn
            color="surface-variant"
            text="동의"
            variant="flat"
            @click="signupBtn()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import Dashboard from "../src/views/MainDashBoard.vue";
import { checkLogin, createMineData, readMineData } from "./api/index.js";
import { themeMode, themeConfig } from "@/utils/theme.js";

const { btnColor, themeColor } = themeConfig;

sessionStorage.setItem("downloading", false);

const visible = ref(false);
const decodedTokenData = ref(null);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const alertShow = ref(sessionStorage.getItem("showDashboard") === "true");
    if (
      (error.response.status === 401 || error.response.status === 500) &&
      error.response.data === "Token Expired" &&
      alertShow.value
    ) {
      // 401 또는 500 상태 코드가 발생한 경우 로그아웃 처리
      logout(); // 로그아웃 처리 함수 호출
      location.reload();
      // alert("토큰 시간 만료\n다시 로그인 해주세요.")
      alert(error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

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
const newphone = ref("");

const rulesid = ref(false);
const rulespw = ref(false);
const rulescpw = ref(false);
const rulesemail = ref(false);
const rulesname = ref(false);
const rulesaf = ref(false);

const termsDialog = ref(false);
const checkbox1 = ref(false);
const checkbox2 = ref(false);
const checkbox3 = ref(false);
const checkbox4 = ref(false);
const checkbox5 = ref(false);
const checkbox6 = ref(false);
const checkbox7 = ref(false);
const checkboxA = ref(false);

// checkboxValue 변수의 변경을 감시하고 상태가 변경될 때마다 호출될 함수
watch(checkboxA, (newValue, oldValue) => {
  if (newValue == true) {
    checkbox1.value = true;
    checkbox2.value = true;
    checkbox3.value = true;
    checkbox4.value = true;
    checkbox5.value = true;
    checkbox6.value = true;
    checkbox7.value = true;
  } else {
    checkbox1.value = false;
    checkbox2.value = false;
    checkbox3.value = false;
    checkbox4.value = false;
    checkbox5.value = false;
    checkbox6.value = false;
    checkbox7.value = false;
  }
});

// 회원 가입 관리
const showSignup = ref(
  sessionStorage.getItem("showSignup") === "true" || false
);

const movesignup = () => {
  userid.value = "";
  password.value = "";
  showSignup.value = true;
  sessionStorage.setItem("showSignup", showSignup.value.toString());
};

const ruleCheck = () => {
  if (
      rulesid.value &&
      rulespw.value &&
      rulescpw.value &&
      rulesemail.value &&
      rulesname.value &&
      rulesaf.value === true
    ) {
      termsDialog.value = true
    } else {
      // 유효성 검사를 통과하지 못한 경우
      alert(
        "입력을 하지 않았거나 유효성 검사를 통과하지 못한 항목이 있습니다.\n다시 확인해주세요."
      );
      // showSignup을 true로 유지
    }
}

const signupBtn = async () => {

  if (
    checkbox1.value == true &&
    checkbox2.value == true &&
    checkbox3.value == true &&
    checkbox4.value == true &&
    checkbox5.value == true &&
    checkbox6.value == true &&
    checkbox7.value == true
  ) {
    
      // 유효성 검사를 모두 통과한 경우

      // 데이터 활용 신청서의 데이터 사용자 준수사항 등에 대한 약관 동의 절차

      const data = {
        id: `${newid.value}`,
        password: `${newpassword.value}`,
        userName: `${newname.value}`,
        department: `${newaffiliation.value}`,
        eMail: `${newemail.value}`,
        phoneNumber: `${newphone.value}`,
      };

      try {
        // 회원가입 기능
        const response = await createMineData(data);
        alert("가입이 완료되었습니다.");

        termsDialog.value = false;
        showSignup.value = false;
        checkbox1.value = false;
        checkbox2.value = false;
        checkbox3.value = false;
        checkbox4.value = false;
        checkbox5.value = false;
        checkbox6.value = false;
        checkbox7.value = false;
        sessionStorage.setItem("showSignup", showSignup.value.toString());

        newid.value = "";
        newpassword.value = "";
        checknewpassword.value = "";
        newemail.value = "";
        newname.value = "";
        newaffiliation.value = "";
        newphone.value = "";
      } catch (error) {
        console.error(error);
        alert(error.response?.data || "An error occurred during signup.");
      }
  } else {
    alert("모든 약관을 확인하고 체크박스에 체크해주세요.");
  }
};

const signfinish = () => {
  newid.value = "";
  newpassword.value = "";
  checknewpassword.value = "";
  newemail.value = "";
  newname.value = "";
  newaffiliation.value = "";
  newphone.value = "";
  showSignup.value = false;
  sessionStorage.setItem("showSignup", showSignup.value.toString());
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
        return "1글자 이상 입력하세요";
      }
    },
  ],
  Affiliation: [
    (value) => {
      if (value?.length > 0) {
        rulesaf.value = true;
        return true;
      } else {
        rulesaf.value = false;
        return "1글자 이상 입력하세요";
      }
    },
  ],
  ID: [
    (value) => {
      if (value?.length > 3) {
        rulesid.value = true;
        return true;
      } else {
        rulesid.value = false;
        return "아이디는 최소 4글자를 입력해주세요";
      }
    },
  ],
  Password: [
    (value) => {
      if (value?.length >= 6 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
        rulespw.value = true;
        return true;
      } else {
        rulespw.value = false;
        return "비밀번호는 최소 6글자를 입력하고, 문자를 포함해주세요";
      }
    },
  ],
  PasswordConfirmation: [
    (value) => {
      if (newpassword.value === checknewpassword.value && value?.length > 0) {
        rulescpw.value = true;
        return true;
      } else {
        rulescpw.value = false;
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
        return "이메일 형식으로 입력해주세요";
      }
    },
  ],
});

const expirationTime = ref(); // 초 단위를 밀리초로 변환
const tokenlogin = ref();
let intervalId;

// 로그인 및 로그아웃 로직을 구현합니다.
const login = async () => {
  const data = {
    id: `${userid.value}`,
    password: `${password.value}`,
  };

  try {
    // 로그인 요청
    const response = await checkLogin(data);

    sessionStorage.setItem("token", response);

    // 사용자 정보 요청
    const userDataResponse = await readMineData(response);

    const tokenPayload = jwtDecode(response);
    decodedTokenData.value = tokenPayload;
    const id = tokenPayload.id;

    expirationTime.value = decodedTokenData.value.exp * 1000; // 초 단위를 밀리초로 변환
    tokenlogin.value = true;
    if (!intervalId) {
      checkTokenExpiration();
    }

    // 토큰이 유효한 경우에 수행할 작업 (예: 로그인 후의 동작)
    // ...
    const userName = userDataResponse.userName;
    const userGroup = userDataResponse.userGroup;
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("userid", userName);
    sessionStorage.setItem("isAdmin", userGroup);

    // 이후 작업 수행 (예: 토큰을 저장하거나 처리)

    showDashboard.value = true;
    sessionStorage.setItem("showDashboard", true);
    userid.value = "";
    password.value = "";

    // 세션 스토리지에 사용자 로그인 상태를 저장
    sessionStorage.setItem("showDashboard", showDashboard.value.toString());

    // 이벤트 로그 메시지
  } catch (error) {
    alert(error.response?.data || error.message);
    console.error(error.response?.data || error.message);
    // 에러메시지

    // userid.value = "";
    // password.value = "";
  }
};
const checkTokenExpiration = () => {
  intervalId = setInterval(() => {
    if (tokenlogin.value && expirationTime.value > 0) {
      const currentTime = new Date().getTime();
      const remainingTime = expirationTime.value - currentTime;

      if (remainingTime <= 0) {
        // 토큰이 만료되었음을 처리 (예: 로그아웃)
        alert("토큰시간 만료");
        logout();

        // setInterval을 멈춤
        clearInterval(intervalId);
      } else {
        // 토큰이 유효한 경우에 수행할 작업
        // console.log("남은 시간: " + remainingTime + "밀리초");
      }
    }
  }, 5000); // 5초 간격으로 체크
};

const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const logout = () => {
  userid.value = "";
  showDashboard.value = false;
  tokenlogin.value = false;
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
  padding-top: 150px;
  height: 100vh;
}

.form-signup {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 100px;
  height: 100vh;
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

.halfbtn {
  width: 400px;
  height: 40px;
}
</style>
