<template>
  <div>
    <input class="date-picker"  type="date" id="start" name="trip-start" value="2024-08-09" min="2018-01-01" max="2018-12-31" />
  </div>
</template>

<script setup>
import { ref } from 'vue'


</script>

<style scoped>
label {
  display: block;
  font:
    1rem 'Fira Sans',
    sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}

.date-picker {
  border: 1px solid #ccc;
  padding: 0.3rem;
  border-radius: 4px;
  width: 200px;
  box-sizing: border-box;
}
</style>

