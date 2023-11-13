<template>
  <div class="table-container">
    <v-table>
      <thead class="custom-header">
        <tr>
          <td v-for="header in headerName" :key="header">{{ header }}</td>
        </tr>
      </thead>
    </v-table>
      <div class="full-width-line"></div> <!-- 가로선 -->
    <v-table>
      <tbody class="custom-body">
        <tr class="data_row"
          v-for="(item) in dataSet"
          :key="item.no"
          @click="handleRowClick(item)"
        >
        <!-- <td><input type="checkbox" @click.stop></td> -->
          <td>
            <div class="column">{{ item.no }}</div>
          </td>
          <td>
            <div class="column">{{ item.name }}</div>
          </td>
          <td>
            <div class="column">{{ item.value }}</div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const headerName = ref([]); // 빈 배열로 초기화
const dataSet = ref([]); // 빈 배열로 초기화
const selectedData = ref([]);

const handleRowClick = (item) => {
  console.log("룰루");
  // 클릭된 행의 데이터 가져오기
  selectedData.value[0] = item.no;
  selectedData.value[1] = item.name;
  selectedData.value[2] = item.value;
  console.log("선택된 행 정보:", selectedData);
  alert(selectedData.value);
  alert(selectedData.value[0])
};

const fetchData = () => {
  axios
    .post("http://192.168.0.99:13000/data/monitoring")
    .then((response) => {
      headerName.value = response.data.headers;
      dataSet.value = response.data.data;
      console.log(dataSet);
    })
    .catch((error) => {
      console.error(error);
    });
};

// 초기 데이터 요청 및 주기적 데이터 업데이트 설정
fetchData(); // 초기 데이터 요청

// 일정한 간격으로 데이터 업데이트 (예: 5초마다)
// setInterval(() => {
//   fetchData(); // 데이터 업데이트
// }, 5000); // 5000ms = 5초

// try {
//   axios
//     .post("http://192.168.0.99:13000/data/monitoring")
//     .then((response) => {
//       headerName.value = response.data.headers;
//       dataSet.value = response.data.data;
//       console.log(dataSet);
//       // 로그인 정보 확인
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// } catch (error) {
//   console.log(error);
// }
</script>

<style scoped>
/* 글자 크기를 12px로 지정 */
.custom-header {
  font-size: 14px;
}
.custom-header td {
  text-align: center; /* 가운데 정렬 추가 */
}

.custom-body td {
  font-size: 12px;
  text-align: center;
}
.selected-row {
  background-color: lightblue;
}

.table-container {
  height: 55vh; /* Set the height to 500px */
  overflow-y: auto; /* 테이블 바디가 넘치는 경우 스크롤 생성 */
  border: 1px solid #ccc; /* Add border to create a box around the component */
  border-radius: 4px; /* Optional: Add border radius to round the corners */
  padding: 10px; /* Optional: Add padding to create some space between the component and the border */
}

.full-width-line {
  width: 100%;
  height: 2px;
  background-color: #bbb;
}

/* 각 열의 데이터를 나누는 줄 스타일 */
.column {
  border-right: 1px solid #ccc;
  padding-right: 5px;
}
.column:last-child {
  border-right: none;
}

.data_row:hover {
  /* background-color: aqua; */
}
</style>


