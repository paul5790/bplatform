<template>
  <v-card height="93vh" class="pa-1 d-flex justify-center align-center">
    <div style="text-align: center">
      <p style="font-weight: 600; font-size: 20px">
        <span style="color: #f76060">'User 등급'</span> 이상이 되시면 사용이
        가능합니다.
      </p>
      <p style="font-weight: 400; font-size: 15px">
        현재 {{ userid }}님의 등급은 Guest입니다.
      </p>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
// 왼쪽 셀렉바 설정
const userid = ref(sessionStorage.getItem("userid"));
</script>

<style scoped>
.custom-select {
  --v-select-menu-font-size: 10px;
}
</style>
