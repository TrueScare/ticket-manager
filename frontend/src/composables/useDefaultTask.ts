import type {Task} from "@ticket-manager/shared";

export function useDefaultTask(): Task {
    return {
        id: -20,
        title: "",
        isDone: false,
    };
}