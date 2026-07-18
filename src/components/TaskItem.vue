<script setup>
const props = defineProps({
  item: {type: Object, required: true},
});

const emit = defineEmits(["toggleDone", "itemUpdated"]);
//#region functions
function onClick(){
  emit('toggleDone', props.item)
  emit('itemUpdated', props.item)
}
//#endregion functions
</script>
<template>
  <li :style="{ textDecoration: item.isDone ? 'line-through' : 'none' }"
      @click="onClick()">
    <span>{{ item.title }}</span>
  </li>
</template>