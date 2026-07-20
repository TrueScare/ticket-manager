<script setup>
import {useStats} from "@/composables/useStats.js";
import {useTaskStore} from "@/stores/taskStore.js";

const taskStore = useTaskStore();
const { countOpenTasks } = useStats(taskStore.list);
</script>
<template>
  <span>Aktuell gibt es {{countOpenTasks}} offene Aufgaben.</span>
</template>