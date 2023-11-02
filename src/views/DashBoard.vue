<template>
  <v-row>
    <v-col cols="4">
      <v-sheet style="height: 50vh">
        <ex1 />
      </v-sheet>
      <v-sheet style="height: 50vh">
        <SaillingAnimation />
      </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-sheet style="height: 50vh">
        <EchartBar />
      </v-sheet>
      <v-sheet style="height: 50vh">
        <EchartDrillDown />
      </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-sheet style="height: 50vh">
        <EchartDoughnut />
      </v-sheet>
      <v-sheet style="height: 50vh">
        <EchartHalfDoughnut />
      </v-sheet>
    </v-col>

    <!-- <v-col cols="4">
      <v-sheet class="bg-surface-variant" >
        <SaillingAnimation />
      </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-sheet style="height: 50vh"> .v-col-auto </v-sheet>
    </v-col>
    <v-col cols="4">
      <v-sheet style="height: 50vh"> .v-col-auto </v-sheet>
    </v-col> -->
  </v-row>
</template>

<script setup>
import ex1 from "../components/EchartGraph/ExChart1.vue";
import SaillingAnimation from "../components/SaillingLottie.vue";
import EchartHalfDoughnut from "../components/EchartGraph/EchartHalfDoughnut";
import EchartDoughnut from "../components/EchartGraph/EchartDoughnut.vue";
import EchartBar from "../components/EchartGraph/EchartBar.vue";
import EchartDrillDown from "../components/EchartGraph/EchartDrillDown.vue";
</script>

<style scoped></style>
