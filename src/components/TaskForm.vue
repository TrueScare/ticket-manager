<script setup>
import {useTaskStore} from "@/stores/taskStore.js";
import {useTaskValidation} from "@/composables/useTaskValidator.js";
import {useDefaultItem} from "@/composables/useDefaultItem.js";
import {ref} from "vue";

const item = ref(useDefaultItem());

const taskStore = useTaskStore();

function addTask() {
  if (useTaskValidation(item.value)) {
    if (taskStore.addTask(item.value)) {
      // get next item after insert
      item.value = useDefaultItem();
    }
  } else {
    alert("Nope!");
  }
}

</script>
<template>
  <form class="task-form-container">
    <input type="text" v-model="item.title" minlength="1" required/>
    <button type="button" @click="addTask">hinzufügen</button>
  </form>
</template>