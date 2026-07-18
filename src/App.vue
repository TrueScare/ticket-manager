<script setup>
import TaskList from "@/components/TaskList.vue";
import {onMounted} from "vue";

//#region lifecycle hooks
onMounted(()=>{
  console.log("App wurde gemounted, hier würde ich Daten laden")
});
//#endregion lifecycle hooks
</script>

<template>
  <TaskList></TaskList>
</template>

<style scoped></style>
