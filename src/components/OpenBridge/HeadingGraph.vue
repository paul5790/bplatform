<template>
  <div>
    <ob-hdg-large 
      class="large-component"
      :heading="heading"
      :showSetPoint="true"
      :northUp="true" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


// heading과 courseOverGround 값을 ref로 정의합니다.
const heading = ref(0);

// 랜덤 값을 생성하는 함수
const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const updateValues = () => {
  heading.value = getRandomValue(0, 360);
};

let interval;

onMounted(() => {
  // 1초마다 heading과 courseOverGround 값을 업데이트하는 interval 설정
  interval = setInterval(updateValues, 1000);
});

onUnmounted(() => {
  // 컴포넌트가 언마운트될 때 interval을 클리어하여 메모리 누수를 방지합니다.
  clearInterval(interval);
});

</script>

<style>


</style>