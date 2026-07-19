<script setup>
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {useList} from "@/composables/useList.js";

const { list } = useList();

const route = useRoute();
const item = computed(() => {
  return list.value.find(({id}) => id === parseInt(route.params.id))
});

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