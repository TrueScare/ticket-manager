import {computed} from 'vue';

export function useStats(getList) {
    const countOpenTasks = computed(() => getList().filter((item) => !item.isDone).length);
    return {countOpenTasks};
}