<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" app expand-on-hover rail>
        <v-list>
          <v-list-item>
            <img
              :src="require('../../public/image/kriso.png')"
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
            <p style="font-size: 23px; margin-top: 5px">
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
  </v-card>
</template>

<script setup>
import { ref, watch, watchEffect, defineEmits, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const isMiniVariant = ref(true);
const drawer = ref(true);
const iconshow = ref(true);
const dynamicTitle = ref("초기 제목");
const isAdmin = ref(true);
const emits = defineEmits(["logout"]);
const logoutDialog = ref(false);
const selected_item = ref(sessionStorage.getItem("page") || "대시보드");
watchEffect(() => {
  //
})

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
    } else {
      logoutDialog.value = false;
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
