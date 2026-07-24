<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {useTaskStore} from "@/stores/taskStore.ts";

const taskStore = useTaskStore();

const route = useRoute();
const item = computed(() => taskStore.getItemById(route.params.id));

const status = computed(() => {
  if(item.value.isDone){
    return "erledigt";
  }
  return "offen";
})
</script>
<template>
  <div class="task-container" v-if="item">
    <h2>{{ item.title }}</h2>
    <div><i>{{ item.id }}</i></div>
    <div>{{ status }}</div>
  </div>
  <div class="task-container" v-else>Leider wurde die Aufgabe (mit der ID {{ $route.params.id }}) nicht gefunden.</div>
</template>