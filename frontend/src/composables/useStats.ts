import {computed} from 'vue';
import type {Task} from "@/types.ts";

export function useStats(getList: () => Task[]) {
    const countOpenTasks = computed(() => {
        return getList().filter((task: Task) => !task.isDone).length;
    });
    return {countOpenTasks};
}