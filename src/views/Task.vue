<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {useTaskStore} from "@/stores/taskStore.ts";
import type {Task} from "@/types.ts";

const taskStore = useTaskStore();

const route = useRoute();

const task = computed<Task | undefined>(() => taskStore.getTaskById(parseInt(<string>route.params.id)));

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