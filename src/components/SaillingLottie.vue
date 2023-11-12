<template>
  <Vue3Lottie :animationData="AstronautJSON" style="height: 45vh"/>
</template>
<script setup>
import { Vue3Lottie } from "vue3-lottie";
import AstronautJSON from "../assets/saillinganimation.json";
</script>
