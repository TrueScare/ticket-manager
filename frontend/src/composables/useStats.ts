import {computed} from 'vue';
import type {Task} from "@ticket-manager/shared";

export function useStats(getList: () => Task[]) {
    const countOpenTasks = computed(() => {
        return getList().filter((task: Task) => !task.isDone).length;
    });
    return {countOpenTasks};
}