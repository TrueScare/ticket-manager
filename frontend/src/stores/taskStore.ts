import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useTaskValidation} from "@/composables/useTaskValidator.ts";
import type {ApiResponse, Task} from "@ticket-manager/shared";
import axios from "axios";

export const useTaskStore = defineStore('taskStore', () => {
    const api_url = import.meta.env.VITE_API_URL + 'tasks/';

    const list = ref<Task[]>([]);

    const isLoading = ref<boolean>(false);
    const error = ref<string>("");

    const isInitiallyFetched = ref<boolean>(false);

    async function toggleDone(task: Task) {
        task.isDone = !task.isDone;
        return await updateTask(task);
    }

    async function updateTask(task: Task) {
        return await handleFetch(async () => {
            const response = await axios.put<ApiResponse<Task>>(api_url + task.id, task);
            const index = list.value.findIndex((element: Task) => task.id === element.id);
            list.value[index] = response.data.details;
            return response.data.details;
        });
    }

    async function getItemById(item_id: number) {
        return await handleFetch(async () => {
            const reponse = await axios.get<ApiResponse<Task>>(api_url + item_id);
            return reponse.data.details;
        });
    }

    async function addTask(task: Task) {
        return await handleFetch(async () => {
            if (useTaskValidation(task)) {
                const response = await axios.post<ApiResponse<Task>>(api_url, task);
                const db_task = response.data.details;

                list.value.push(db_task);

                return db_task;
            }
            return false;
        });
    }

    async function fetchTasks() {
        if (isLoading.value) {
            return;
        }
        await handleFetch(async () => {

            if (!isInitiallyFetched.value) {
                const response = await axios.get<ApiResponse<Task[]>>(api_url);
                list.value = response.data.details;
                isInitiallyFetched.value = true;
            }
        });
    }

    async function removeItem(task: Task) {
        await handleFetch(async () => {
            const response = await axios.delete(api_url + task.id);
            list.value.splice(list.value.indexOf(response.data.details.id), 1);
        });
    }

    async function handleFetch<T>(fetchFunction: () => Promise<T>) {
        isLoading.value = true;
        error.value = "";
        try {
            return await fetchFunction();
        } catch (e) {
            if (e instanceof Error) {
                error.value = e.toString();
            } else {
                error.value = "Ein unbekannter Fehler ist aufgetreten. Bitte schauen sie in der Konsole für genauere Infos."
                console.error(e);
            }
        } finally {
            isLoading.value = false;
        }
    }

    return {
        list,
        toggleDone,
        updateTask: updateTask,
        getTaskById: getItemById,
        addTask,
        fetchTasks,
        isLoading,
        error,
        removeTask: removeItem
    };
});