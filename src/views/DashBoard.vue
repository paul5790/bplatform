<template>
  <v-row style="height: 42vh; background-color: #f7f7f7">
    <v-col cols="4" style="background-color: #f7f7f7">
      <!-- <v-sheet style="height: 50vh">
        <ex1 />
      </v-sheet> -->
      <v-sheet
        style="
          height: 42vh;
          padding: 10px;
          padding-right: 0;
          display: flex;
          background-color: #f7f7f7;
        "
        elevation="2"
      >
        <v-card style="flex: 1">
          <v-card-item>
            <EchartDrillDown />
          </v-card-item>
        </v-card>
      </v-sheet>
      <!-- <v-sheet
        style="height: 50vh; padding: 10px; padding-right: 0; display: flex"
      >
        <v-card style="flex: 1">
          <v-card-item>
            <SaillingAnimation />
          </v-card-item>
        </v-card>
      </v-sheet> -->
    </v-col>
    <v-col cols="4" style="background-color: #f7f7f7">
      <v-sheet
        style="
          height: 42vh;
          padding: 10px;
          padding-right: 0;
          padding-left: 0;
          display: flex;
          background-color: #f7f7f7;
        "
      >
        <v-card style="flex: 1">
          <v-card-item>
            <EchartDoughnut />
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
    <v-col cols="4" style="background-color: #f7f7f7">
      <v-sheet
        style="
          height: 42vh;
          padding: 10px;
          padding-left: 0;
          display: flex;
          background-color: #f7f7f7;
        "
      >
        <v-card style="flex: 1">
          <v-card-item>
            <EchartHalfDoughnut />
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row>
    <v-col style="background-color: #f7f7f7">
      <v-sheet style="height: 51vh; padding-right: 10px; padding-left: 10px; background-color: #f7f7f7">
        <v-card style="flex: 1">
          <v-card-item>
            <VoyageTable />
          </v-card-item>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import VoyageTable from "../components/VoyageTable.vue";
import EchartHalfDoughnut from "../components/EchartGraph/EchartHalfDoughnut1";
import EchartDoughnut from "../components/EchartGraph/EchartDoughnut.vue";
import EchartDrillDown from "../components/EchartGraph/EchartDrillDown.vue";
</script>

<style scoped></style>
