import {computed} from 'vue';

export function useStats(list) {
    const countOpenTasks = computed(() => list.filter((item) => !item.isDone).length);
    return {countOpenTasks};
}