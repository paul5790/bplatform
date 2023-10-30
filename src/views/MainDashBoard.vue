<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
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
              :key="2"
              :to="`/trialrundata`"
              :exact="true"
              :title="`시운전 별 데이터`"
              :value="`/trialrundata`"
            ></v-list-item>
            <v-list-item
              :key="3"
              :to="`/alldata`"
              :exact="true"
              :title="`전체 데이터`"
              :value="`/alldata`"
            ></v-list-item>
          </v-list-group>

          <v-list-item
            v-if="isAdmin"
            :key="5"
            :to="`/realtimeview`"
            :exact="true"
            :prepend-icon="`mdi-television`"
            :title="`권한 제어`"
            :value="`/realtimeview`"
          ></v-list-item>
          <v-list-item
            v-if="isAdmin"
            :key="6"
            :to="`/realtimeview`"
            :exact="true"
            :prepend-icon="`mdi-television`"
            :title="`기록 조회`"
            :value="`/realtimeview`"
          ></v-list-item>

          <v-list-item
            :key="4"
            :to="`/usersetting`"
            :exact="true"
            :prepend-icon="`mdi-cog-outline`"
            :title="`환경 설정`"
            :value="`/usersetting`"
          ></v-list-item>
        </v-list>
        <!-- 항상 맨 아래에 붙어있는 리스트 -->
        <template v-slot:append>
          <v-list-item
            :key="5"
            @click="confirmLogout"
            :exact="true"
            :prepend-icon="`mdi-link`"
            :title="`로그아웃`"
          ></v-list-item>
        </template>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
    <!-- 로그아웃 확인 모달 -->
    <v-dialog v-model="logoutDialog" max-width="300">
      <v-card>
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
import { ref, defineEmits } from "vue";

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
</script>

<style scoped></style>
