<template>
  <v-row align="center" justify="center" class="full-height">
    <v-col cols="12">
      <Vue3Lottie :animationData="AstronautJSON"/>
    </v-col>
  </v-row>

</template>
<script setup>
import { Vue3Lottie } from "vue3-lottie";
import AstronautJSON from "../assets/saillinganimation.json";
</script>
