<script setup>
import {computed, onMounted} from "vue";
import TaskItem from "@/components/TaskItem.vue";
import {useStats} from '../composables/useStats.js';
import {useTaskStore} from "@/stores/taskStore.js";
import TaskForm from "@/components/TaskForm.vue";

onMounted(() => {
  taskStore.fetchTasks();
})

//#region computed

const taskStore = useTaskStore();
const {countOpenTasks} = useStats(() => taskStore.list);
const headline = computed(() => {
  if (taskStore.isLoading) {
    return "Lädt..."
  }
  if (taskStore.error) {
    return "Ein Fehler ist aufgetreten..."
  }
  if (taskStore.list.length === 0) {
    return "keine Aufgaben vorhanden"
  }
  if (countOpenTasks.value > 0) {
    return countOpenTasks.value + " offene Aufgaben"
  } else {
    return "alle Aufgaben erledigt"
  }
});
//#endregion computed
</script>
<template>
  <div>
    <h2>{{ headline }}</h2>
    <TaskForm></TaskForm>
    <ul class="task-list">
      <template v-if="taskStore.isLoading">
        <li>Lädt...</li>
      </template>
      <template v-else-if="taskStore.error">
        <li>{{ taskStore.error }}</li>
      </template>
      <template v-else>
        <TaskItem
            v-for="item in taskStore.list"
            :item="item"
            :key="item.id"
            @toggle-done="taskStore.toggleDone"
            @item-updated="taskStore.updateItem"
            @item-delete="taskStore.removeItem"
        />
      </template>
    </ul>
  </div>
</template>