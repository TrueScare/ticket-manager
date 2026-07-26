<script setup lang="ts">
import {useStats} from "@/composables/useStats.ts";
import {useTaskStore} from "@/stores/taskStore.ts";

const taskStore = useTaskStore();
const { countOpenTasks } = useStats(() => taskStore.list);
</script>
<template>
  <span>Aktuell gibt es {{countOpenTasks}} offene Aufgaben.</span>
</template>