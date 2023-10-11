<template>
  <v-row>
    <v-col cols="3">
      <v-sheet class="bg-surface-variant" style="height: 100vh; justify-content: center; padding: 30px;">
        <div>
          <v-select v-model="selectedItem" :items="items1" density="compact" label="Compact" style="margin-top: 30vh;"></v-select>

          <v-select v-model="selectedItem2" :items="dynamicItems" density="comfortable" label="Comfortable"></v-select>

          <v-select v-model="selectedItem3" :items="items3" density="comfortable" label="Default"></v-select>
        </div>
      </v-sheet>
    </v-col>
    <v-col cols="9">
      <v-sheet style="height: 100vh"> {{ selectedItem3 }} </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch } from 'vue';

const items1 = ref(['시운전1', '시운전2', '시운전3', '시운전4']);
const selectedItem = ref(null);

const dynamicItems = ref([]);
const selectedItem2 = ref(null);

const items3 = ref([]);
const selectedItem3 = ref(null);

const updateDynamicItems = () => {
  if (selectedItem.value === '시운전1') {
    dynamicItems.value = ['시운전1-1', '시운전1-2'];
  } else if (selectedItem.value === '시운전2') {
    dynamicItems.value = ['시운전2-1', '시운전2-2'];
  } else {
    dynamicItems.value = [];
  }
};

const updateItems3 = () => {
  if (selectedItem2.value === '시운전1-1') {
    items3.value = ['시운전1-1-1', '시운전1-1-2'];
  } else if (selectedItem2.value === '시운전1-2') {
    items3.value = ['시운전1-2-1', '시운전1-2-2'];
  } else if (selectedItem2.value === '시운전2-1') {
    items3.value = ['시운전2-1-1', '시운전2-1-2'];
  } else if (selectedItem2.value === '시운전2-2') {
    items3.value = ['시운전2-2-1', '시운전2-2-2'];
  } else {
    items3.value = [];
  }
};

// selectedItem이 변경될 때마다 selectedItem2와 selectedItem3를 초기화
watch(selectedItem, () => {
  selectedItem2.value = null;
  selectedItem3.value = null;
  updateDynamicItems();
});

// selectedItem2이 변경될 때마다 selectedItem3를 초기화하고 items3를 업데이트
watch(selectedItem2, () => {
  selectedItem3.value = null;
  updateItems3();
});
</script>

<style scoped></style>
