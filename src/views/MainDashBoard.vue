<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer 
      v-model="drawer" app
      expand-on-hover 
      rail  >
        <v-list>
          <v-list-item
            prepend-avatar="S"
            :title="dynamicTitle"
            subtitle="sandra_a88@gmailcom"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <!-- <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route"
            :exact="true"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.route"
          ></v-list-item> -->
          <v-list-item
            :key="0"
            :to="`/`"
            :exact="true"
            :prepend-icon="`mdi-view-dashboard`"
            :title="`대시보드`"
            :value="`/`"
          ></v-list-item>
          <v-list-item
            :key="1"
            :to="`/realtimeview`"
            :exact="true"
            :prepend-icon="`mdi-television`"
            :title="`모니터링`"
            :value="`/realtimeview`"
          ></v-list-item>
          <v-list-item
            :key="2"
            :to="`/mapview`"
            :exact="true"
            :prepend-icon="`mdi-map-outline`"
            :title="`지도`"
            :value="`/mapview`"
          ></v-list-item>
          <v-list-item
            :key="3"
            :to="`/datagraph`"
            :exact="true"
            :title="`데이터 분석`"
            :prepend-icon="`mdi-chart-line`"
            :value="`/datagraph`"
          ></v-list-item>
          <v-list-item
            :key="4"
            :to="`/alldata`"
            :exact="true"
            :title="`데이터 조회`"
            :prepend-icon="`mdi-database-search-outline`"
            :value="`/alldata`"
          ></v-list-item>

          <!-- <v-list-item
            :key="2"
            :to="`/trialrundata`"
            :exact="true"
            :prepend-icon="`mdi-database-search-outline`"
            :title="`데이터 열람`"
            :value="`/trialrundata`"
          ></v-list-item> -->

          <v-list-group value="trialrundata">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="데이터 열람"
                :prepend-icon="`mdi-database-search-outline`"
              ></v-list-item>
            </template>
            <v-list-item
              :key="3"
              :to="`/datagraph`"
              :exact="true"
              :title="`데이터 그래프`"
              :prepend-icon="`mdi-chart-line`"
              :value="`/datagraph`"
            ></v-list-item>

          <v-list-item
              :key="3"
              :to="`/trialrundata`"
              :exact="true"
              :title="`시운전 별 데이터`"
              :value="`/trialrundata`"
            ></v-list-item>
          <v-list-item
              :key="4"
              :to="`/alldata`"
              :exact="true"
              :title="`전체 데이터`"
              :prepend-icon="`mdi-text-search`"
              :value="`/alldata`"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            v-if="isAdmin"
            :key="5"
            :to="`/voyagedata`"
            :exact="true"
            :prepend-icon="`mdi mdi-ferry`"
            :title="`항차 데이터`"
            :value="`/voyagedata`"
          ></v-list-item>

          <v-list-item
            v-if="isAdmin"
            :key="6"
            :to="`/authority`"
            :exact="true"
            :prepend-icon="`mdi-account`"
            :title="`사용자 관리`"
            :value="`/authority`"
          ></v-list-item>
          <v-list-item
            v-if="isAdmin"
            :key="7"
            :to="`/adminview`"
            :exact="true"
            :prepend-icon="`mdi-file-search-outline`"
            :title="`기록 조회`"
            :value="`/adminview`"
          ></v-list-item>

          <v-list-item
            :key="8"
            :to="`/usersetting`"
            :exact="true"
            :prepend-icon="`mdi-cog-outline`"
            :title="`환경 설정`"
            :value="`/usersetting`"
          ></v-list-item>

                    <v-list-item
            :key="9"
            :to="`/manager`"
            :exact="true"
            :prepend-icon="`mdi-cog-outline`"
            :title="`관리자 설정`"
            :value="`/manager`"
          ></v-list-item>
        </v-list>
        <!-- 항상 맨 아래에 붙어있는 리스트 -->
        <!-- <template v-slot:append>
          <v-list density="compact" nav>
            <v-list-item
              :key="9"
              @click="confirmLogout"
              :exact="true"
              :prepend-icon="`mdi-logout`"
              :title="`로그아웃`"
            ></v-list-item>
          </v-list>
        </template> -->
      </v-navigation-drawer>
      <v-main>
        <v-app-bar app hide-on-scroll color="white" style="height: 7vh">
          
          <v-app-bar-nav-icon
            @click="toggleDrawer()"
            v-if="iconshow"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>My App</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-app-bar>
        <!-- <v-toolbar color="white" style="height: 7vh;">
          <v-toolbar-title>{{ dynamicTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="confirmLogout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        </v-toolbar> -->
        <router-view></router-view>
      </v-main>
    </v-layout>
    <!-- 로그아웃 확인 모달 -->
    <v-dialog v-model="logoutDialog" max-width="300">
      <v-card
        >t
        <v-card-title>로그아웃</v-card-title>
        <v-card-text>로그아웃 하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-btn @click="logout">예</v-btn>
          <v-btn @click="cancelLogout">아니오</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, defineEmits, onMounted, onBeforeUnmount } from "vue";

const isMiniVariant = ref(true);
const drawer = ref(true);
const iconshow = ref(true);
const dynamicTitle = ref("초기 제목");
const isAdmin = ref(true);
const emits = defineEmits(["logout"]);
const logoutDialog = ref(false);

const confirmLogout = () => {
  logoutDialog.value = true;
};

const logout = () => {
  // 로그아웃 로직을 구현
  emits("logout", "b");
  logoutDialog.value = false;
};

const cancelLogout = () => {
  logoutDialog.value = false;
};

const toggleDrawer = () => {
  drawer.value = !drawer.value
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

</script>
