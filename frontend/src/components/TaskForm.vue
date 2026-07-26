<script setup lang="ts">
import {useTaskStore} from "@/stores/taskStore.ts";
import {useTaskValidation} from "@/composables/useTaskValidator.ts";
import {useDefaultTask} from "@/composables/useDefaultTask.ts";
import {ref} from "vue";

const task = ref(useDefaultTask());

const taskStore = useTaskStore();

function addTask() {
  if (useTaskValidation(task.value)) {
    if (taskStore.addTask(task.value)) {
      // get next item after insert
      task.value = useDefaultTask();
    }
  } else {
    alert("Nope!");
  }
}

</script>
<template>
  <form class="task-form-container">
    <input type="text" v-model="task.title" minlength="1" required/>
    <button type="button" @click="addTask">hinzufügen</button>
  </form>
</template>