<script setup lang="ts">
import {onMounted} from "vue";
import Header from "@/components/Header.vue";

//#region lifecycle hooks
onMounted(() => {
  console.log("App wurde gemounted, hier würde ich Daten laden")
});
//#endregion lifecycle hooks
</script>

<template>
  <div class="app-container">
    <Header></Header>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
