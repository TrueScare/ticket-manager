import type {Task} from "@/types.ts";

export function useDefaultTask(): Task {
    return {
        id: -20,
        title: "",
        isDone: false,
    };
}