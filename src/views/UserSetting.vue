<template>
  <div class="my-app">
    <h1>Setting</h1>
    <EchartGauge/>
    <EchartBar/>
    <EchartLine/>
    <EchartStarPort/>
  </div>
</template>

<script setup>
import EchartGauge from "../components/EchartGraph/EchartGauge.vue";
import EchartBar from "../components/EchartGraph/EchartBar.vue";
import EchartLine from "../components/EchartGraph/EchartLine.vue";
import EchartStarPort from "../components/EchartGraph/EchartStarPort.vue";
</script>

<style scoped>

</style>