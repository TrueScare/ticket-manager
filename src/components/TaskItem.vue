<script setup>
const props = defineProps({
  item: {type: Object, required: true},
});

const emit = defineEmits(["toggleDone", "itemUpdated"]);

//#region functions
function onClick() {
  emit('toggleDone', props.item)
  emit('itemUpdated', props.item)
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
      >details</RouterLink>
    </div>
  </li>
</template>