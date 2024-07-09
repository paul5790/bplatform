<template>
  <div
    :style="{
      height: '93vh',
      backgroundColor: themeColor,
      padding: '60px',
      paddingTop: '40px',
    }"
  >
    <v-tabs
      :style="{
        color:
          tab === index
            ? themeSelectedTabTextColor
            : themeNoNSelectedTabTextColor,
      }"
      style="height: 5vh; margin-left: 15px"
      v-model="tab"
      :color="btnColor"
      align-tabs="start"
    >
      <v-tab :value="1">시험 설정</v-tab>
      <v-tab :value="2">사용자 설정</v-tab>
      <v-tab :value="3">로그 관리</v-tab>
      <v-tab :value="4">사용자 별 권한 관리</v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      style="
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0);
        border-radius: 8px;
        margin-top: 8px;
      "
    >
      <v-window-item v-for="n in 4" :key="n" :value="n">
        <v-card class="no-shadow" style="flex: 1;">
          <v-card-item style="padding: 0px;">
            <div v-if="tab === 1">
              <!-- Move v-if here -->
              <div class="component-container">
                <VoyageManage @overlayemit="overlayEmit" />
              </div>
            </div>
            <div v-if="tab === 2">
              <!-- Move v-if here -->
              <div class="component-container">
                <UserSetting />
              </div>
            </div>
            <div v-if="tab === 3">
              <div class="component-container">
                <LogViewing />
                <!-- <SettingAll/> -->
              </div>
            </div>
            <div v-if="tab === 4">
              <div>
                <UserPermission />
                <!-- <SettingAll/> -->
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-window-item>
    </v-window>
    <!-- 로딩 오버레이 설정 -->
    <v-overlay v-model="overlay" contained class="align-center justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import VoyageManage from "../components/Manage/VoyageManage";
import UserSetting from "../components/Manage/UserSetting";
import LogViewing from "../components/Manage/LogViewing";
import UserPermission from "../components/Manage/UserPermission";
import { themeMode, themeConfig } from "@/utils/theme.js";

onMounted(() => {
  sessionStorage.setItem("page", "관리자 설정");
});

// 다크모드
const { btnColor, textColor, themeColor, tableStyle } = themeConfig;

const overlay = ref(false);
const tab = ref(Number(sessionStorage.getItem("admintab")) || null);
watch(tab, (newValue, oldValue) => {
  console.log(`Tab changed from ${oldValue} to ${newValue}`);
  sessionStorage.setItem("admintab", newValue.toString());
});


const overlayEmit = (dataFromChild) => {
  console.log(3);
  // 여기서 다른 로직을 수행하거나 최상위 부모로 다시 데이터를 전달할 수 있음
  console.log(dataFromChild);
};
</script>

<style>
.manager-sheet {
}

.no-shadow {
  box-shadow: none !important;
}
</style>
