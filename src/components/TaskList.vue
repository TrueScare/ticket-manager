<script setup>
import { computed } from "vue";
import TaskItem from "@/components/TaskItem.vue";
import {useStats} from '../composables/useStats.js';
import {useTaskStore} from "@/stores/taskStore.js";
import TaskForm from "@/components/TaskForm.vue";

//#region computed
const taskStore = useTaskStore();
const { countOpenTasks } = useStats(taskStore.list)

const headline = computed(() => {
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

//#region functions


//# endregion functions
</script>
<template>
  <div>
    <h2>{{ headline }}</h2>
    <TaskForm></TaskForm>
    <ul class="task-list">
      <TaskItem
          v-for="item in taskStore.list"
          :item="item"
          :key="item.id"
          @toggle-done="taskStore.toggleDone"
          @item-updated="taskStore.updateItem"
      />
    </ul>
  </div>
</template>