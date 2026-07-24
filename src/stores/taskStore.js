import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useTaskValidation} from "@/composables/useTaskValidator.js";

export const useTaskStore = defineStore('taskStore', () => {
    const list = ref([]);

    const isLoading = ref(false);
    const error = ref("");

    const isInitiallyFetched = ref(false);

    function toggleDone(item) {
        item.isDone = !item.isDone;
    }

    function updateItem(item) {
        console.log("API-Call für Item Update", item);
    }

    function getItemById(item_id) {
        return list.value.find(({id}) => id === parseInt(item_id))

    }

    function addTask(item) {
        if (useTaskValidation(item)) {
            const max = Math.max(...(list.value.map((task) => task.id)));
            const nextId = max >= 0 ? max : 0;

            item.id = nextId + 1;

            list.value.push(item);
            return item;
        }
        return false;
    }

    async function fetchTasks() {
        isLoading.value = true;
        error.value = "";
        try {
            if (!isInitiallyFetched.value) {
                list.value = await new Promise((resolve) => {
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
            error.value = e;
        } finally {
            isLoading.value = false;
        }
    }

    function removeItem(item) {
        list.value.splice(list.value.indexOf(item), 1);
    }

    return {list, toggleDone, updateItem, getItemById, addTask, fetchTasks, isLoading, error, removeItem};
});