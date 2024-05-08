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
              @click="termsDialog = true"
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

    <v-dialog v-model="termsDialog" max-width="800">
      <v-card title="서비스 이용약관 동의">
        <v-card-text>
          1.<br />
          Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit.
          Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris
          cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo,
          augue in, duis erat proin condimentum in a eget, sed fermentum sed
          vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor.
          Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi
          ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut
          mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus
          luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla
          aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus
          magna neque pellentesque, nulla vel erat.

          <br /><br /><br />

          2.<br />
          Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus
          gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui
          integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo
          taciti odio, amet viverra scelerisque quis quis et tortor, curabitur
          morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae
          tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque
          aenean quia vitae nostra, tempus elit enim id dui, at egestas
          pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis
          fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam.
          Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis
          duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit
          pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum
          risus, quam ac egestas.

          <br /><br /><br />

          3.<br />
          Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a
          dictumst cras augue, purus imperdiet non. Varius montes cursus varius
          vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis
          vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede
          mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut
          est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor,
          maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor
          vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend
          vel eu, nullam maecenas mauris nec nunc euismod, tortor porta
          ridiculus potenti, massa tristique nam magna, et wisi placerat et erat
          ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac
          tortor sociis et non animi tristique, rhoncus malesuada, ut arcu
          volutpat scelerisque sollicitudin, elit curabitur dui pede purus
          dolor, integer aenean risus taciti nulla eleifend accumsan. At
          pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac
          placerat eget justo semper, purus sociis curabitur mi ipsum consequat
          ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris,
          commodo quisque, praesent semper suscipit lobortis nam. Justo
          malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc,
          montes lectus purus fermentum.

          <br /><br /><br />

          4.<br />
          Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus
          arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi,
          purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi
          eu placerat aliquam erat, lectus morbi lobortis at assumenda.
          Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec,
          suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum
          erat tellus habitasse est, erat sem ornare, vitae quisque ultricies.
          Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae.
          Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras
          quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et
          rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu
          justo. Cursus pretium venenatis. Cras pellentesque vel sodales
          accumsan aenean. Feugiat metus sit nec in aliquet amet, porttitor
          pretium vulputate massa. Consequat ipsum luctus quisque adipiscing
          libero. Wisi sollicitudin. Eget vitae ac lobortis, lorem natoque
          vestibulum et, aliquet faucibus at morbi nibh, vel condimentum. Massa
          unde orci sed id sed, odio donec congue nec praesent amet. Hymenaeos
          velit lacus, quis vivamus libero tempus duis, eu nisi eu, ipsum at
          accumsan pede justo morbi donec, massa et libero sit risus neque
          tortor. Ut sed sed etiam hendrerit dapibus, quis metus suspendisse
          nibh.

          <br /><br /><br />

          5.<br />
          Fringilla tempor felis augue magna. Cum arcu a, id vitae. Pellentesque
          pharetra in cras sociis adipiscing est. Nibh nec mattis at maecenas,
          nisl orci aliquam nulla justo egestas venenatis, elementum duis vel
          porta eros, massa vitae, eligendi imperdiet amet. Nec neque luctus
          suscipit, justo sem praesent, ut nisl quisque, volutpat torquent wisi
          tellus aliquam reprehenderit, curabitur cras at quis massa porttitor
          mauris. Eros sed ultrices. Amet dignissim justo urna feugiat mauris
          litora, etiam accumsan, lobortis a orci suspendisse. Semper ac mauris,
          varius bibendum pretium, orci urna nunc ullamcorper auctor, saepe sem
          integer quam, at feugiat egestas duis. Urna ligula ante. Leo elementum
          nonummy. Sagittis mauris est in ipsum, nulla amet non justo, proin id
          potenti platea posuere sit ut, nunc sit erat bibendum. Nibh id auctor,
          ab nulla vivamus ultrices, posuere morbi nunc tellus gravida vivamus.

          <br /><br /><br />

          6.<br />
          Mauris nec, facilisi quam fermentum, ut mauris integer, orci tellus
          tempus diam ut in pellentesque. Wisi faucibus tempor et odio leo diam,
          eleifend quis integer curabitur sit scelerisque ac, mauris consequat
          luctus quam penatibus fringilla dis, vitae lacus in, est eu ac tempus.
          Consectetuer amet ipsum amet dui, sed blandit id sed. Tellus integer,
          dignissim id pede sodales quis, felis dolorem id mauris orci, orci
          tempus ut. Nullam hymenaeos. Curabitur in a, tortor ut praesent
          placerat tincidunt interdum, ac dignissim metus nonummy hendrerit
          wisi, etiam ut.

          <br /><br /><br />

          7.<br />
          Semper praesent integer fusce, tortor suspendisse, augue ligula orci
          ante asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus
          nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu
          mollis ante congue elementum, inceptos eget optio quam pellentesque
          quis lobortis, sollicitudin sed vestibulum sollicitudin, lectus
          parturient nullam, leo orci ligula ultrices. At tincidunt enim,
          suspendisse est sit sem ac. Amet tellus molestie est purus magna
          augue, non etiam et in wisi id. Non commodo, metus lorem facilisi
          lobortis ac velit, montes neque sed risus consectetuer fringilla
          dolor. Quam justo et integer aliquam, cursus nulla enim orci, nam
          cursus adipiscing, integer torquent non, fringilla per maecenas.
          Libero ipsum sed tellus purus et. Duis molestie placerat erat donec
          ut. Dolor enim erat massa faucibus ultrices in, ante ultricies orci
          lacus, libero consectetuer mauris magna feugiat neque dapibus, donec
          pretium et. Aptent dui, aliquam et et amet nostra ligula.

          <br /><br /><br />

          8.<br />
          Augue curabitur duis dui volutpat, tempus sed ut pede donec. Interdum
          luctus, lectus nulla aenean elit, id sit magna, vulputate ultrices
          pellentesque vel id fermentum morbi. Tortor et. Adipiscing augue lorem
          cum non lacus, rutrum sodales laoreet duis tortor, modi placerat
          facilisis et malesuada eros ipsum, vehicula tempus. Ac vivamus amet
          non aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu
          odio. Blandit orci nec nec, posuere in pretium, enim ut, consectetuer
          nullam urna, risus vel. Nullam odio vehicula massa sed, etiam sociis
          mauris, lacus ullamcorper, libero imperdiet non sodales placerat justo
          vehicula. Nec morbi imperdiet. Fermentum sem libero iaculis bibendum
          et eros, eget maecenas non nunc, ad pellentesque. Ut nec diam
          elementum interdum. Elementum vitae tellus lacus vitae, ipsum
          phasellus, corporis vehicula in ac sed massa vivamus, rutrum elit,
          ultricies metus volutpat.

          <br /><br /><br />

          9.<br />
          Semper wisi et, sollicitudin nunc vestibulum, cursus accumsan nunc
          pede tempus mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis
          eu aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia
          arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac
          vivamus. Nam libero orci, pulvinar nulla, enim pellentesque
          consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu donec,
          dictum cursus ullamcorper viverra. Ultricies quis orci lorem,
          suspendisse ut vestibulum integer, purus sed lorem pulvinar habitasse
          turpis.
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
            @click="(termsDialog = false), signupBtn()"
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
import {
  darkbackcolor,
  whitebackcolor,
  darkbtn,
  lightbtn,
} from "./color/color.js";

sessionStorage.setItem("downloading", false);
const themeMode = ref(localStorage.getItem("themeMode") || "light");

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

const signupBtn = async () => {
  console.log(newid.value);

  if (
    rulesid.value &&
    rulespw.value &&
    rulescpw.value &&
    rulesemail.value &&
    rulesname.value &&
    rulesaf.value === true
  ) {
    // 유효성 검사를 모두 통과한 경우

    // 데이터 활용 신청서의 데이터 사용자 준수사항 등에 대한 약관 동의 절차

    const data = {
      id: `${newid.value}`,
      password: `${newpassword.value}`,
      userName: `${newname.value}`,
      department: `${newaffiliation.value}`,
      email: `${newemail.value}`,
      phoneNumber: `${newphone.value}`,
    };

    try {
      // 회원가입 기능
      const response = await createMineData(data);

      console.log(response.data);
      alert("가입이 완료되었습니다.");

      showSignup.value = false;
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
    console.log(
      rulesid.value,
      rulespw.value,
      rulescpw.value,
      rulesemail.value,
      rulesname.value,
      rulesaf.value
    );
    // 유효성 검사를 통과하지 못한 경우
    alert(
      "입력을 하지 않았거나 유효성 검사를 통과하지 못한 항목이 있습니다.\n다시 확인해주세요."
    );
    // showSignup을 true로 유지
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
    console.log("userlog : " + userDataResponse.value);

    const tokenPayload = jwtDecode(response);
    decodedTokenData.value = tokenPayload;
    const id = tokenPayload.id;

    console.log(decodedTokenData.value);

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
