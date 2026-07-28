import {Task} from "@ticket-manager/shared";

export function validateTask(task: Task) {
    return validateTaskTitle(task);
}

function validateTaskTitle(task: Task) {
    return task.title.length > 0;
}