import type {Task} from "@ticket-manager/shared";
import {validateTask} from "@ticket-manager/shared";


export function useTaskValidation(task: Task) {
    return validateTask(task);
}