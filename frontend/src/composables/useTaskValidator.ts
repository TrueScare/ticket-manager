import type {Task} from "@/types.ts";
import type {Task} from "@ticket-manager/shared";

export function useTaskValidation(task: Task) {
    return task.title.length > 0;
}