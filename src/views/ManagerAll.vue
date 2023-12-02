<template>
  <div style="height: 93vh; background-color: #f7f7f7; padding: 60px ;padding-top: 40px;">
    <v-tabs style="height: 5vh; margin-left: 15px;" v-model="tab" color="#009dff" align-tabs="start">
      <v-tab :value="1">항차 설정</v-tab>
      <v-tab :value="2">사용자 설정</v-tab>
      <v-tab :value="3">기타 설정</v-tab>
    </v-tabs>
    <v-window v-model="tab" style="box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 8px;">
      <v-window-item v-for="n in 3" :key="n" :value="n">
            <v-card style="flex: 1">
      <v-card-item>
        <div v-if="tab === 1">
          <!-- Move v-if here -->
          <div class="component-container">
            <VoyageManage />
            
          </div>
        </div>
        <div v-if="tab === 2">
          <!-- Move v-if here -->
          <div class="component-container">
            <UserSetting />
          </div>
        </div>
        <div v-if="tab === 3">
          <!-- Move v-if here -->
          <div class="component-container">
            <!-- <LogViewing /> -->
            <SettingAll/>
          </div>
        </div>
        </v-card-item>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import SettingAll from "../components/Manage/SettingAll.vue";
import VoyageManage from "../components/Manage/VoyageManage";
import UserSetting from "../components/Manage/UserSetting";
import LogViewing from "../components/Manage/LogViewing";


const tab = ref(Number(sessionStorage.getItem("admintab")) || null);
watch(tab, (newValue, oldValue) => {
  console.log(`Tab changed from ${oldValue} to ${newValue}`);
  sessionStorage.setItem("admintab", newValue.toString());
});


</script>

<style>
.manager-sheet {
  height: 75vh;  
  display: flex;
}

</style>
