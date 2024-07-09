<!-- dialog/setting/realtimeStandard.vue -->
<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Real-time Data Standard Setting</v-card-title>
      <v-card-text>
        <!-- 다이얼로그 콘텐츠를 여기에 추가 -->
        실시간 모니터링의 게이지에 기준을 설정합니다.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(false);

const closeDialog = () => {
  dialog.value = false;
};
</script>
