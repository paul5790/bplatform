<template>
  <div>
    <v-data-table
      style="margin: 20px"
      v-model:page="page"
      class="elevation-1"
      :headers="headers"
      :items="desserts"
      :items-per-page="itemsPerPage"
      hide-default-footer
      item-value="name"
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";


const page = ref(1);
const itemsPerPage = ref(5);

const pageCount = computed(() => {
  return Math.ceil(desserts.value.length / itemsPerPage.value);
});

const headers = ref([
  {
    title: "항차",
    align: "start",
    key: "sail",
  },
  { title: "시작시간", align: "end", key: "start" },
  { title: "도착시간", align: "end", key: "end" },
  { title: "설명", align: "end", key: "comment" },
]);

const desserts = ref([
  {
    sail: "시운전1",
    start: 231106.1107,
    end: 231106.1108,
    comment: "울산실증센터 가나다라마바사",
  },
    {
    sail: "시운전2",
    start: 231106.1107,
    end: 231106.1108,
    comment: "울산실증센터 가나다라마바사",
  },
    {
    sail: "시운전3",
    start: 231106.1107,
    end: 231106.1108,
    comment: "울산실증센터 가나다라마바사",
  },
    {
    sail: "시운전4",
    start: 231106.1107,
    end: 231106.1108,
    comment: "울산실증센터 가나다라마바사",
  },
    {
    sail: "시운전5",
    start: 231106.1107,
    end: 231106.1108,
    comment: "울산실증센터 가나다라마바사",
  },
    {
    sail: "시운전6",
    start: 231106.1107,
    end: 231106.1108,
    comment: "울산실증센터 가나다라마바사",
  },


]);

</script>

<style scoped>
.centered-content {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  min-height: 50vh; /* 화면 높이에 맞게 최소 높이 설정 */
}</style>
