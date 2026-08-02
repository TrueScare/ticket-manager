<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed, onMounted, ref} from "vue";
import {useTaskStore} from "@/stores/taskStore.ts";
import type {Task} from "@ticket-manager/shared";

onMounted(async () => {
  task.value = await taskStore.getTaskById(parseInt(<string>route.params.id));
});

const task = ref<Task>();

const taskStore = useTaskStore();

const route = useRoute();

const status = computed(() => {
  if(!task.value){
    return "unbekannt"
  }
  if(task.value.isDone){
    return "erledigt";
  }
  return "offen";
})
</script>
<template>
  <div class="task-container" v-if="task">
    <h2>{{ task.title }}</h2>
    <div><i>{{ task.id }}</i></div>
    <div>{{ status }}</div>
  </div>
  <div class="task-container" v-else>Leider wurde die Aufgabe (mit der ID {{ $route.params.id }}) nicht gefunden.</div>
</template>