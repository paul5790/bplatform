<template>
  <v-card>
    <v-layout
      style="height: 100vh; display: flex; overflow-y: auto"
      class="scrollable-card"
    >
      <v-navigation-drawer v-model="drawer" app expand-on-hover rail>
        <v-list>
          <v-list-item>
            <img
              img
              src="/image/kriso.png"
              alt=""
              style="margin-left: 56px"
              width="115"
            />
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            v-if="permission === 'ADMIN' || permission === 'USER'"
            :key="0"
            :to="`/`"
            :exact="true"
            :prepend-icon="`mdi-view-dashboard`"
            :title="`대시보드`"
            :value="`/`"
            @click="handleListItemClick(`대시보드`)"
          ></v-list-item>
          <v-list-item
            v-if="permission === 'ADMIN' || permission === 'USER'"
            :key="1"
            :to="`/realtimeview`"
            :exact="true"
            :prepend-icon="`mdi-television`"
            :title="`실시간 모니터링`"
            :value="`/realtimeview`"
            @click="handleListItemClick(`실시간 모니터링`)"
          ></v-list-item>

          <v-list-item
            v-if="permission === 'ADMIN' || permission === 'USER'"
            :key="3"
            :to="`/datagraph`"
            :exact="true"
            :title="`데이터 분석`"
            :prepend-icon="`mdi-chart-line`"
            :value="`/datagraph`"
            @click="handleListItemClick(`데이터 분석`)"
          ></v-list-item>
          <v-list-item
            v-if="permission === 'ADMIN' || permission === 'USER'"
            :key="4"
            :to="`/alldata`"
            :exact="true"
            :title="`데이터 조회`"
            :prepend-icon="`mdi-database-search-outline`"
            :value="`/alldata`"
            @click="handleListItemClick(`데이터 조회`)"
          ></v-list-item>

          <v-list-item
            v-if="permission === 'Guest'"
            :key="5"
            :to="`/guest`"
            :exact="true"
            :title="`이용 가이드`"
            :value="`/guest`"
            @click="handleListItemClick(`이용 가이드`)"
          ></v-list-item>

          <v-list-item
            v-if="permission === 'ADMIN'"
            :key="9"
            :to="`/manager`"
            :exact="true"
            :prepend-icon="`mdi-cog-outline`"
            :title="`관리자 설정`"
            :value="`/manager`"
            @click="handleListItemClick(`관리자 설정`)"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-app-bar app hide-on-scroll color="white" style="height: 7vh">
          <v-app-bar-nav-icon
            @click="toggleDrawer()"
            v-if="iconshow"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>
            <p style="font-size: 23.5px; margin-top: 5px">
              {{ selected_item }}
            </p></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <p>{{ toolbarname }}</p>
          <!-- <v-btn icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn> -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in list_item"
                :key="index"
                :value="index"
                @click="handleListItemClick(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
        <router-view></router-view>
      </v-main>
    </v-layout>
    <!-- 로그아웃 확인 모달 -->
    <v-dialog v-model="logoutDialog" max-width="300">
      <v-card>
        <v-card-title>로그아웃</v-card-title>
        <v-card-text>로그아웃 하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="logout()" to="/"
            >예</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="cancelLogout()"
            >아니오</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 소실주기 설정 모달 -->
    <v-dialog v-model="settimeDialog" max-width="400">
      <v-card>
        <v-card-title>데이터 소실주기 설정</v-card-title>
        <v-card-text>
          <v-col cols="12"><p style="font-size: 13px">소실 주기</p></v-col>
          <v-col cols="12">
            <v-text-field
              label="settime (초)"
              variant="solo"
              v-model="settime"
              required
            ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cancelsettime()"
            >취소</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="axiossettime()"
            >설정</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 개인정보 수정 비밀번호 팝업 -->
    <v-dialog v-model="passwordchangeDialog" max-width="500">
      <v-card>
        <v-card-title>비밀번호 변경</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"
                ><p style="font-size: 13px">기존 비밀번호</p></v-col
              >
              <v-col cols="12">
                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  label="기존 비밀번호"
                  variant="solo"
                  :rules="rules.oldPassword"
                  required
                  v-model="pw"
                  @click:append-inner="visible = !visible"
                ></v-text-field>
              </v-col>
              <v-col cols="12"
                ><p style="font-size: 13px">변경할 비밀번호</p></v-col
              >
              <v-col cols="12">
                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  label="새로운 비밀번호"
                  variant="solo"
                  :rules="rules.Password"
                  required
                  v-model="newpw"
                  @click:append-inner="visible = !visible"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="visible ? 'text' : 'password'"
                  label="비밀번호 확인"
                  variant="solo"
                  :rules="rules.PasswordConfirmation"
                  persistent-hint
                  v-model="newpwcheck"
                  @click:append-inner="visible = !visible"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="passwordcancle()"
            >취소</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="passwordOK()"
            >입력</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 개인정보 변경 -->
    <v-dialog v-model="privacyDialog" max-width="1024">
      <v-card>
        <v-card-title>개인정보 변경</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"><p style="font-size: 13px">기본정보</p></v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="User Name"
                  variant="solo"
                  :rules="rules.Name"
                  persistent-hint
                  v-model="cname"
                  required
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6">
                <v-text-field
                  :readonly="true"
                  @click="hi()"
                  label="Change Password"
                  variant="solo"
                  required
                  v-model="cpassword"
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6">
                <v-text-field
                  label="department"
                  variant="solo"
                  :rules="rules.Affiliation"
                  type="text"
                  v-model="cdepartment"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :readonly="true"
                  label="Permission"
                  variant="solo"
                  v-model="permission"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Description"
                  variant="solo"
                  v-model="cdescription"
                ></v-text-field>
              </v-col>
              <v-col cols="12"
                ><p style="font-size: 13px">연락처 정보</p></v-col
              >
              <v-col cols="12">
                <v-text-field
                  v-model="cemail"
                  :rules="rules.Email"
                  label="User Email"
                  variant="solo"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="cphone"
                  label="Phone Number"
                  hint="선택사항"
                  variant="solo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="privacyout()"
            to="/"
            >취소</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="privacypost()"
            >수정</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import {
  ref,
  watch,
  watchEffect,
  defineEmits,
  onMounted,
  onBeforeUnmount,
} from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const visible = ref(false);
const isMiniVariant = ref(true);
const drawer = ref(true);
const iconshow = ref(true);
const dynamicTitle = ref("초기 제목");
const isAdmin = ref(true);
const emits = defineEmits(["logout"]);
const logoutDialog = ref(false);
const privacyDialog = ref(false);
const settimeDialog = ref(false);
const selected_item = ref(sessionStorage.getItem("page") || "대시보드");
const change = ref(true);
const passwordchangeDialog = ref(false);

watchEffect(() => {
  //
});

const getSelectedMenuItemFromURL = () => {
  return useRoute().name;
};

const handleListItemClick = (itemTitle) => {
  if (itemTitle === "로그 아웃") {
    logoutDialog.value = true;
  } else if (itemTitle === "개인정보 변경") {
    fetchData();
    privacyDialog.value = true;
  } else if (itemTitle === "소실주기 설정") {
    fetchData();
    settimeDialog.value = true;
  } else if (itemTitle === "비밀번호 변경") {
    fetchData();
    passwordchangeDialog.value = true;
  } else {
    selected_item.value = itemTitle;
    sessionStorage.setItem("page", itemTitle.toString());

    logoutDialog.value = false;
    privacyDialog.value = false;
  }
};

const confirmLogout = () => {
  logoutDialog.value = true;
};

const logout = () => {
  // 로그아웃 로직을 구현
  emits("logout");
  logoutDialog.value = false;
};

const cancelLogout = () => {
  logoutDialog.value = false;
};

const rulesid = ref(false);
const rulespassword = ref(false);
const rulespw = ref(false);
const rulescpw = ref(false);
const rulesemail = ref(false);
const rulesname = ref(false);
const rulesaf = ref(false);

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
  oldPassword: [
    (value) => {
      if (value?.length >= 6 && /[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
        rulespassword.value = true;
        return true;
      } else {
        rulespassword.value = false;
        return "비밀번호는 최소 6글자를 입력하고, 문자를 포함해주세요";
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
    () => {
      if (newpw.value === newpwcheck.value) {
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

// 데이터 소실주기 설정
const settime = ref();

const axiossettime = async () => {
  try {
    // 서버에 POST 요청을 보내고 응답을 받음
    const response = await axios.post(
      "http://192.168.0.73:8080/info/update/settime",
      {
        lossTime: settime.value,
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
    location.reload();

    // 이후 작업 수행 (예: 토큰을 저장하거나 처리)
    alert("수정이 완료되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

const cancelsettime = () => {
  settimeDialog.value = false;
};

// 개인 정보 변경
const cdescription = ref();
const cname = ref();
const cemail = ref();
const cdepartment = ref();
const cphone = ref();
const cgroup = ref();
const cpassword = ref();
const pw = ref();
const newpw = ref();
const newpwcheck = ref();
const privacypost = () => {
  if (
    rulesname.value === true &&
    rulesaf.value === true &&
    rulesemail.value === true
  ) {
    const data = {
      userName: cname.value,
      department: cdepartment.value,
      phoneNumber: cphone.value,
      eMail: cemail.value,
      description: cdescription.value,
    };
    console.log(data);
    try {
      axios.post("http://192.168.0.73:8080/auth/userinfo/update/mine", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`,
        },
      });
      alert("개인정보가 변경되었습니다.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred during signup.");
    }

    cpassword.value = null;
    newpw.value = null;
    newpwcheck.value = null;
    rulespw.value = false;
    privacyDialog.value = false;
    change.value = true;
  } else {
    alert("정보를 모두 알맞게 입력하세요.");
  }
};

const privacyout = () => {
  privacyDialog.value = false;
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  console.log(drawer.value);
};

// 비밀번호 바꾸기

const passwordOK = () => {
  if (rulespassword.value && rulespw.value && rulescpw.value) {
    const data = {
      password: pw.value,
      newPassword: newpw.value,
    };
    console.log(data);
    try {
      axios.post(
        "http://192.168.0.73:8080/auth/userinfo/update/password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenid.value}`,
          },
        }
      );
      alert("개인정보가 변경되었습니다.");

      cpassword.value = "입력완료";
      passwordchangeDialog.value = false;
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred during signup.");
    }
  } else {
    alert("입력을 하지 않았거나 유효성 검사를 통과하지 못한 항목이 있습니다.");
  }
};

const passwordcancle = () => {
  cpassword.value = null;
  newpw.value = null;
  newpwcheck.value = null;
  passwordchangeDialog.value = false;
};

const checkScreenSize = () => {
  iconshow.value = window.innerWidth <= 1280; // 여기서 1280은 lg 사이즈의 임계값입니다.
};

const tokenid = ref(sessionStorage.getItem("token") || "");
const fetchData = async () => {
  try {
    const userDataResponse = await axios.post(
      "http://192.168.0.73:8080/auth/userinfo/mine",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenid.value}`,
        },
      }
    );
    cname.value = userDataResponse.data.userName;
    cgroup.value = userDataResponse.data.userGroup;
    cdepartment.value = userDataResponse.data.department;
    cphone.value = userDataResponse.data.phoneNumber;
    cdescription.value = userDataResponse.data.description;
    cemail.value = userDataResponse.data.email;
    settime.value = userDataResponse.data.lossTime;
  } catch (error) {
    console.error(error);
  }
};


onMounted(() => {
  checkScreenSize();
  fetchData();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// 툴바 사용자 설정

// const handleListItemClick = (title) => {
//   selected_item.value = title; // Update selected_item when a v-list-item is clicked
//   console.log(selected_item.value);

//   if (title === "로그 아웃") {
//     logoutDialog.value = true;
//   } else if (title === "개인정보 변경") {
//     logoutDialog.value = false;
//   } else {
//     logoutDialog.value = false;
//   }
// };

watch(useRoute, () => {
  selected_item.value = getSelectedMenuItemFromURL();
});

// 권한별 메뉴
const permission = ref(sessionStorage.getItem("isAdmin"));
const userid = ref(sessionStorage.getItem("userid"));
const toolbarname = ref(`${userid.value}(${permission.value})`);

const list_item = ref([]);
if (permission.value === "GUEST") {
  list_item.value = [
    { title: "개인정보 변경" },
    { title: "비밀번호 변경" },
    { title: "로그 아웃" },
  ];
} else {
  list_item.value = [
    { title: "소실주기 설정" },
    { title: "개인정보 변경" },
    { title: "비밀번호 변경" },
    { title: "로그 아웃" },
  ];
}
</script>
