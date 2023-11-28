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
            v-if="permission === 'Admin' || permission === 'User'"
            :key="0"
            :to="`/`"
            :exact="true"
            :prepend-icon="`mdi-view-dashboard`"
            :title="`대시보드`"
            :value="`/`"
            @click="handleListItemClick(`대시보드`)"
          ></v-list-item>
          <v-list-item
            v-if="permission === 'Admin' || permission === 'User'"
            :key="1"
            :to="`/realtimeview`"
            :exact="true"
            :prepend-icon="`mdi-television`"
            :title="`실시간 모니터링`"
            :value="`/realtimeview`"
            @click="handleListItemClick(`실시간 모니터링`)"
          ></v-list-item>

          <v-list-item
            v-if="permission === 'Admin' || permission === 'User'"
            :key="3"
            :to="`/datagraph`"
            :exact="true"
            :title="`데이터 분석`"
            :prepend-icon="`mdi-chart-line`"
            :value="`/datagraph`"
            @click="handleListItemClick(`데이터 분석`)"
          ></v-list-item>
          <v-list-item
            v-if="permission === 'Admin' || permission === 'User'"
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
            v-if="permission === 'Admin'"
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
          <v-btn @click="logout" to="/">예</v-btn>
          <v-btn @click="cancelLogout">아니오</v-btn>
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
                  :readonly="change"
                  label="User ID"
                  variant="solo"
                  required
                  v-model="cuserid"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :readonly="change"
                  label="User Name"
                  variant="solo"
                  persistent-hint
                  v-model="cname"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :readonly="change"
                  label="Affiliation"
                  variant="solo"
                  type="text"
                  v-model="caffiliation"
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
              <v-col cols="12"
                ><p style="font-size: 13px">연락처 정보</p></v-col
              >
              <v-col cols="12">
                <v-text-field
                  :readonly="change"
                  v-model="cemail"
                  label="User Email"
                  variant="solo"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  :readonly="change"
                  v-model="cnumber"
                  label="Phone Number"
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
            @click="privacychange"
            to="/"
            >수정하기</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="privacyout"
            >완료</v-btn
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
import { useRoute } from "vue-router";

const isMiniVariant = ref(true);
const drawer = ref(true);
const iconshow = ref(true);
const dynamicTitle = ref("초기 제목");
const isAdmin = ref(true);
const emits = defineEmits(["logout"]);
const logoutDialog = ref(false);
const privacyDialog = ref(false);
const selected_item = ref(sessionStorage.getItem("page") || "대시보드");
const change = ref(true);
watchEffect(() => {
  //
});

const getSelectedMenuItemFromURL = () => {
  return useRoute().name;
};

const handleListItemClick = (itemTitle) => {
  if (itemTitle === "로그 아웃") {
    logoutDialog.value = true;
  } else {
    selected_item.value = itemTitle;
    sessionStorage.setItem("page", itemTitle.toString());
    if (itemTitle === "개인정보 변경") {
      logoutDialog.value = false;
      privacyDialog.value = true;
    } else {
      logoutDialog.value = false;
      privacyDialog.value = false;
    }
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

// 개인 정보 변경
const cuserid = ref();
const cname = ref();
const cemail = ref();
const caffiliation = ref();
const cnumber = ref();
const privacyout = () => {
  privacyDialog.value = false;
  change.value = true;
};

const privacychange = () => {
  privacyDialog.value = true;
  change.value = false;

};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  console.log(drawer.value);
};

const checkScreenSize = () => {
  iconshow.value = window.innerWidth <= 1280; // 여기서 1280은 lg 사이즈의 임계값입니다.
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// 툴바 사용자 설정
const list_item = ref([{ title: "개인정보 변경" }, { title: "로그 아웃" }]);

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
const permission = ref("Admin");
const userid = ref(sessionStorage.getItem("userid"));
const toolbarname = ref(`${userid.value}(${permission.value})`);
</script>
