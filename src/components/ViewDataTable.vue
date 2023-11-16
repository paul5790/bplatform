<template>
  <div class="table-container">
    <v-data-table
    v-model="selected"
    class="elevation-1"
    :headers="headerName"
    :items="dataSet"
    items-per-page="5"
    item-value="name"
    return-object
    show-select
  ></v-data-table>
    <!-- <v-table>
      <thead class="custom-header">
        <tr>
          <td v-for="title in headerName" :key="title">{{ title }}</td>
        </tr>
      </thead>
    </v-table>
    <div class="full-width-line"></div>
    
    <v-table>
      <tbody class="custom-body">
        <tr
          class="data_row"
          v-for="item in dataSet"
          :key="item.no"
          @click="handleRowClick(item)"
        >
          
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
    </v-table> -->
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
  alert(selectedData.value[0]);
};

const fetchData = () => {
  axios
    .post("http://192.168.0.24:8080/shipinfo/api/dgps/gll")
    .then((response) => {
      console.log(response.data);

      const dataheader = ref(
        Object.keys(response.data[0]).map((key) => ({
          title: key,
          align: "start",
          key,
        }))
      );
      
      if (dataheader.value == null){
        console.log('null');
      }
      else{
        console.log(dataheader.value);
        headerName.value = dataheader.value
      }
      

      // headerName.value = response.data.headers;
      dataSet.value = response.data;
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

const GLL = ref([
  {
    id: 13953,
    shipid: "440714900",
    checksum: "0",
    longitude: "2603.186",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "466.1398",
    utctime: "170952",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:46.125583",
  },
  {
    id: 13952,
    shipid: "440714900",
    checksum: "0",
    longitude: "2604.706",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "469.8235",
    utctime: "169390",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:45.109964",
  },
  {
    id: 13951,
    shipid: "440714900",
    checksum: "0",
    longitude: "2543.351",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "477.9984",
    utctime: "165644",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:44.094606",
  },
  {
    id: 13950,
    shipid: "440714900",
    checksum: "0",
    longitude: "2520.105",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "471.0762",
    utctime: "167565",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:43.078615",
  },
  {
    id: 13949,
    shipid: "440714900",
    checksum: "0",
    longitude: "2473.214",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "479.8297",
    utctime: "167927",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:42.064131",
  },
  {
    id: 13948,
    shipid: "440714900",
    checksum: "0",
    longitude: "2470.195",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "481.0389",
    utctime: "166644",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:41.049957",
  },
  {
    id: 13947,
    shipid: "440714900",
    checksum: "0",
    longitude: "2456.394",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "473.8978",
    utctime: "167027",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:40.036099",
  },
  {
    id: 13946,
    shipid: "440714900",
    checksum: "0",
    longitude: "2421.321",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "480.3032",
    utctime: "167148",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:39.022406",
  },
  {
    id: 13945,
    shipid: "440714900",
    checksum: "0",
    longitude: "2455.553",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "475.0421",
    utctime: "168718",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:38.007267",
  },
  {
    id: 13944,
    shipid: "440714900",
    checksum: "0",
    longitude: "2466.724",
    messageid: "$GPGLL",
    modeindicator: "D",
    latitude: "466.0678",
    utctime: "173188",
    datasetquaility: "A",
    longitudedirection: "E",
    latitudedirection: "N",
    time_DATECREATED: "2023-10-12 12:55:36.997128",
  },
]);


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
