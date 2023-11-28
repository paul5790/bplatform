<template>
  <v-card
    height="93vh"
    style="background-color: #f7f7f7"
    class="pa-1 d-flex justify-center align-center"
  >
    <v-row>
      <!-- 왼쪽 큰 박스 -->
      <v-col cols="12" style="padding: 30px;">
        <v-row>
          <!-- (최) 지도 뷰 -->
          <v-col cols="4" no-gutters style="padding: 3px">
            <v-sheet style="height: 43vh; background-color: #f7f7f7;  padding-top: 7px; display: flex;">
              <v-card style="flex: 1;">
                <v-card-item>
                  <EchartDrillDown />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 헤딩 그래프 -->
          <v-col cols="4" no-gutters style="padding: 3px">
            <v-sheet style="height: 43vh; background-color: #f7f7f7;  padding-top: 7px; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartDoughnut />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
          <!-- (최) 러더 그래프 -->
          <v-col cols="4" no-gutters style="padding: 3px">
            <v-sheet style="height: 43vh; background-color: #f7f7f7;  padding-top: 7px; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <EchartHalfDoughnut />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" no-gutters style="padding: 3px;">
            <v-sheet style="height: 49vh; display: flex">
              <v-card style="flex: 1">
                <v-card-item>
                  <VoyageTable />
                </v-card-item>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <!-- <v-row>
      <v-col style="background-color: #f7f7f7">
        <v-sheet
          style="
            height: 51vh;
            padding-right: 10px;
            padding-left: 10px;
            background-color: #f7f7f7;
          "
        >
          <v-card style="flex: 1">
            <v-card-item>
              <VoyageTable />
            </v-card-item>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row> -->
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import VoyageTable from "../components/VoyageTable.vue";
import EchartHalfDoughnut from "../components/EchartGraph/EchartHalfDoughnut1";
import EchartDoughnut from "../components/EchartGraph/EchartDoughnut.vue";
import EchartDrillDown from "../components/EchartGraph/EchartDrillDown.vue";
</script>

<style scoped></style>
