import type {Task} from "@/types.ts";

export function useTaskValidation(task: Task) {
    return task.title.length > 0;
}