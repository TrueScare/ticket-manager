import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useTaskValidation} from "@/composables/useTaskValidator.ts";
import type { Task } from '@/types';

export const useTaskStore = defineStore('taskStore', () => {
    const list = ref<Task[]>([]);

    const isLoading = ref<boolean>(false);
    const error = ref<string>("");

    const isInitiallyFetched = ref<boolean>(false);

    function toggleDone(task: Task) {
        task.isDone = !task.isDone;
    }

    function updateTask(task: Task) {
        console.log("API-Call für Item Update", task);
    }

    function getItemById(item_id: number) {
        return list.value.find(({id}) => id === item_id)
    }

    function addTask(task: Task) {
        if (useTaskValidation(task)) {
            const max = Math.max(...(list.value.map((task: Task) => task.id)));
            const nextId = max >= 0 ? max : 0;

            task.id = nextId + 1;

            list.value.push(task);
            return task;
        }
        return false;
    }

    async function fetchTasks() {
        isLoading.value = true;
        error.value = "";
        try {
            if (!isInitiallyFetched.value) {
                list.value = await new Promise<Task[]>((resolve) => {
                    setTimeout(() => {
                        resolve([
                            {
                                id: 1,
                                title: "Einkaufsliste",
                                isDone: false
                            },
                            {
                                id: 2,
                                title: "Vue lernen",
                                isDone: false
                            }
                        ]);
                    }, 1000);
                });
                isInitiallyFetched.value = true;
            }
        } catch (e) {
            if(e instanceof Error) {
                error.value = e.toString();
            } else {
                error.value = "Ein unbekannter Fehler ist aufgetreten. Bitte schauen sie in der Konsole für genauere Infos."
                console.error(e);
            }
        } finally {
            isLoading.value = false;
        }
    }

    function removeItem(task: Task) {
        list.value.splice(list.value.indexOf(task), 1);
    }

    return {list, toggleDone, updateTask: updateTask, getItemById, addTask, fetchTasks, isLoading, error, removeTask: removeItem};
});