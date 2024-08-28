<template>
  <v-data-table
    :headers="headers"
    :items="plants"
    density="compact"
    item-key="name"
  ></v-data-table>
  <v-btn @click="downloadCSV">다운로드</v-btn>
</template>

<script setup>
import { ref } from "vue";

const headers = ref([
  { title: "Plant", align: "start", sortable: false, key: "name" },
  { title: "Light", align: "end", key: "light" },
  { title: "Height", align: "end", key: "height" },
  { title: "Pet Friendly", align: "end", key: "petFriendly" },
  { title: "Price ($)", align: "end", key: "price" },
]);

const plants = ref([
  {
    name: "Fern",
    light: "Low",
    height: "20cm",
    petFriendly: "Yes",
    price: 20,
  },
  {
    name: "Snake Plant",
    light: "Low",
    height: "50cm",
    petFriendly: "No",
    price: 35,
  },
  {
    name: "Monstera",
    light: "Medium",
    height: "60cm",
    petFriendly: "No",
    price: 50,
  },
  {
    name: "Pothos",
    light: "Low to medium",
    height: "40cm",
    petFriendly: "Yes",
    price: 25,
  },
  {
    name: "ZZ Plant",
    light: "Low to medium",
    height: "90cm",
    petFriendly: "Yes",
    price: 30,
  },
  {
    name: "Spider Plant",
    light: "Bright, indirect",
    height: "30cm",
    petFriendly: "Yes",
    price: 15,
  },
  {
    name: "Air Plant",
    light: "Bright, indirect",
    height: "15cm",
    petFriendly: "Yes",
    price: 10,
  },
  {
    name: "Peperomia",
    light: "Bright, indirect",
    height: "25cm",
    petFriendly: "Yes",
    price: 20,
  },
  {
    name: "Aloe Vera",
    light: "Bright, direct",
    height: "30cm",
    petFriendly: "Yes",
    price: 15,
  },
  {
    name: "Jade Plant",
    light: "Bright, direct",
    height: "40cm",
    petFriendly: "Yes",
    price: 25,
  },
]);

// CSV 파일 다운로드 함수
const downloadCSV = () => {
  // CSV 데이터 생성
  const csvContent = createCSV(plants.value);

  // Blob 생성
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // 가상 링크를 생성하여 다운로드
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'plants.csv');
  document.body.appendChild(link);

  link.click(); // 다운로드 실행
  document.body.removeChild(link); // 링크 제거
};

// CSV 데이터를 생성하는 함수
const createCSV = (data) => {
  // 헤더 생성
  const header = headers.value.map((header) => header.title).join(",") + "\n";

  // 데이터 생성
  const rows = data.map((row) => {
    return `${row.name},${row.light},${row.height},${row.petFriendly},${row.price}`;
  }).join("\n");

  return header + rows;
};
</script>

<style scoped></style>
