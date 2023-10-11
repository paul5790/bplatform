<template>
  <v-row>
    <v-col  cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <WeatherCard class="pa-2"/>
      </v-sheet>
    </v-col>
    <v-col  cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh"> 
        <ex1  class="pa-2"/> 
      </v-sheet>
    </v-col>
    <v-col  cols="3">
      <v-sheet class="bg-surface-variant"  style="height: 50vh">
        
        <DonutGraph/>
      </v-sheet>
    </v-col>
    <v-col  cols="3">
      <v-sheet class="bg-surface-variant" style="height: 50vh">
        <SaillingAnimation/>
      </v-sheet>
    </v-col>

    <v-responsive width="100%"></v-responsive>

    <v-col  cols="6">
      <v-sheet  style="height: 50vh"> .v-col-auto </v-sheet>
    </v-col>
    <v-col  cols="6">
      <v-sheet  style="height: 50vh"> .v-col-auto </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import WeatherCard from "../components/WeatherCard.vue";
import ex1 from "../components/ExChart1.vue";
import SaillingAnimation from "../components/SaillingLottie.vue";
import DonutGraph from "../components/DonutGraph.vue";

</script>

<style scoped></style>
