import {computed} from 'vue';

export function useStats(list) {
    const countOpenTasks = computed(() => list.value.filter((item) => !item.isDone).length);
    return {countOpenTasks};
}