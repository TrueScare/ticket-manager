import {ref} from 'vue';
import {defineStore} from 'pinia';
import {useTaskValidation} from "@/composables/useTaskValidator.js";

export const useTaskStore = defineStore('taskStore', () => {
    const list = ref([
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
        if(useTaskValidation(item)) {
            const nextId = Math.max(...(list.value.map((task) => task.id )));
            item.id = nextId +1;

            list.value.push(item);
            return item;
        }
        return false;
    }

    return {list, toggleDone, updateItem, getItemById, addTask};
});