<template>
  <div class="dashboard">
    <div
      class="dashboard-item"
      v-for="(item, index) in items"
      :key="index"
      :style="{ gridColumn: item.title === 'UTC' ? 'span 2' : 'span 1' }"
    >
      <div class="dashboard-title">{{ item.title }}</div>
      <div class="dashboard-subtitle">
        <template v-if="item.subtitle">
          {{ item.subtitle() }}
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

const data = reactive({
  latdata: 34.12,
  londata: 134.12,
  cogdata: 0.0,
  sogdata: 0.0,
  utcdata: '2023-08-29T08:28:43',
});

const items = ref([
  {
    title: "Lat",
    subtitle: () => data.latdata.toFixed(2),
  },
  {
    title: "Lon",
    subtitle: () => data.londata.toFixed(2),
  },
  {
    title: "COG",
    subtitle: () => data.cogdata.toFixed(1),
  },
  {
    title: "SOG",
    subtitle: () => data.sogdata.toFixed(1),
  },
  {
    title: "UTC",
    subtitle: () => formatUtc(data.utcdata),
  },
]);

const formatUtc = (utcString) => {
  const date = new Date(utcString);
  date.setSeconds(date.getSeconds());

  // 날짜, 시간, 분을 추출하여 직접 문자열로 만들기
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const updateValue = () => {
  data.latdata = Math.random() * 100;
  data.londata = Math.random() * 100;
  data.cogdata = Math.random() * 100;
  data.sogdata = Math.random() * 100;

  const currentDate = new Date(data.utcdata);
  currentDate.setSeconds(currentDate.getSeconds() + 1);

  data.utcdata = formatUtc(currentDate.toISOString());
};

onMounted(() => {
  setInterval(updateValue, 1000);
  updateValue();
});
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin: 8px;

}

.dashboard-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.dashboard-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.dashboard-subtitle {
  color: #555555;
}
</style>


analysis.value[0].name = "heading";