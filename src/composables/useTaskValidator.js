export function useTaskValidation(task) {
    return task.title.length > 0;
}