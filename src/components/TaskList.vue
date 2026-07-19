<script setup>
import { computed } from "vue";
import TaskItem from "@/components/TaskItem.vue";
import {useStats} from '../composables/useStats.js';
import {useList} from "@/composables/useList.js";

//#region computed
const { list } = useList();
const { countOpenTasks } = useStats(list)

const headline = computed(() => {
  if (list.value.length === 0) {
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
function toggleDone(item) {
  item.isDone = !item.isDone;
}

function updateItem(item) {
  console.log("API-Call für Item Update", item);
}

//# endregion functions
</script>
<template>
  <div>
    <h2>{{ headline }}</h2>

    <ul class="task-list">
      <TaskItem
          v-for="item in list"
          :item="item"
          :key="item.id"
          @toggle-done="toggleDone"
          @item-updated="updateItem"
      />
    </ul>
  </div>
</template>