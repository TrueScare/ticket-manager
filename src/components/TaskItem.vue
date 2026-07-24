<script setup lang="ts">
import {computed} from "vue";
import type {Task} from "@/types.ts";

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{
  "toggleDone": [task: Task],
  "taskUpdated": [task: Task],
  "taskDelete": [task: Task],
}>();

const modalId = computed(() => {
  return `${props.task.title}-${props.task.id}`
})

//#region functions
function onClick() {
  emit('toggleDone', props.task);
  emit('taskUpdated', props.task);
}

function onClickDelete() {
  emit('taskDelete', props.task);
}

//#endregion functions
</script>
<template>
  <li :style="{ textDecoration: task.isDone ? 'line-through' : 'none' }"
      style="list-style-type: none;">
    <div>
      <span
          @click="onClick()"
          style="cursor: pointer"
      >
        {{ task.title }}
      </span>
      <RouterLink
          :to="{name: 'TaskDetail', params: {id: task.id} }"
      >details
      </RouterLink>
      <button :commandfor="modalId" command="show-modal">Löschen</button>

      <dialog :id="modalId">
        Soll die Aufgabe "{{ task.title }}" wirklich gelöscht werden?
        <button :commandfor="modalId" command="close">abbrechen</button>
        <button
            :commandfor="modalId"
            command="close"
            @click="onClickDelete();"
        >Löschen
        </button>
      </dialog>
    </div>
  </li>
</template>