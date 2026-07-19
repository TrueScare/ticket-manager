<script setup>
import {useList} from "@/composables/useList.js";
import {useStats} from "@/composables/useStats.js";

const { list } = useList();
const { countOpenTasks } = useStats(list);
</script>
<template>
  <span>Aktuell gibt es {{countOpenTasks}} offene Aufgaben.</span>
</template>