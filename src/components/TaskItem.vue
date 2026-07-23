<script setup>
import {computed} from "vue";

const props = defineProps({
  item: {type: Object, required: true},
});

const emit = defineEmits(["toggleDone", "itemUpdated", "itemDelete"]);

const modalId = computed(() => {
  return `${props.item.title}-${props.item.id}`
})

//#region functions
function onClick() {
  emit('toggleDone', props.item);
  emit('itemUpdated', props.item);
}

function onClickDelete() {
  emit('itemDelete', props.item);
}

//#endregion functions
</script>
<template>
  <li :style="{ textDecoration: item.isDone ? 'line-through' : 'none' }"
      style="list-style-type: none;">
    <div>
      <span
          @click="onClick()"
          style="cursor: pointer"
      >
        {{ item.title }}
      </span>
      <RouterLink
          :to="{name: 'TaskDetail', params: {id: item.id} }"
      >details
      </RouterLink>
      <button :commandfor="modalId" command="show-modal">Löschen</button>

      <dialog :id="modalId">
        Soll die Aufgabe "{{ item.title }}" wirklich gelöscht werden?
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