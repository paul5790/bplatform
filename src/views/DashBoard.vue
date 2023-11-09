<template>
  <v-row>
    <v-col>
      <!-- <v-sheet style="height: 50vh">
        <ex1 />
      </v-sheet> -->
      <v-sheet
        style="height: 50vh; padding: 10px; padding-right: 0; display: flex"
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <VoyageTable />
          </v-card-item>
        </v-card>
      </v-sheet>
      <v-sheet
        style="height: 50vh; padding: 10px; padding-right: 0; display: flex"
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <SaillingAnimation />
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="4" sm="12" md="6" lg="4">
      <v-sheet
        style="
          height: 50vh;
          padding: 10px;
          padding-right: 0;
          padding-left: 0;
          display: flex;
        "
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <EchartBar />
          </v-card-item>
        </v-card>
      </v-sheet>
      <v-sheet
        style="
          height: 50vh;
          padding: 10px;
          padding-right: 0;
          padding-left: 0;
          display: flex;
        "
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <EchartDrillDown />
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="4" sm="12" md="6" lg="4">
      <v-sheet
        style="height: 50vh; padding: 10px; padding-left: 0; display: flex"
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <EchartDoughnut />
          </v-card-item>
        </v-card>
      </v-sheet>
      <v-sheet
        style="height: 50vh; padding: 10px; padding-left: 0; display: flex"
      >
        <v-card :color="primary" :variant="elevated" style="flex: 1">
          <v-card-item>
            <EchartHalfDoughnut />
          </v-card-item>
        </v-card>
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
import VoyageTable from "../components/VoyageTable.vue";
import SaillingAnimation from "../components/SaillingLottie.vue";
import EchartHalfDoughnut from "../components/EchartGraph/EchartHalfDoughnut";
import EchartDoughnut from "../components/EchartGraph/EchartDoughnut.vue";
import EchartBar from "../components/EchartGraph/EchartBar.vue";
import EchartDrillDown from "../components/EchartGraph/EchartDrillDown.vue";
</script>

<style scoped></style>
