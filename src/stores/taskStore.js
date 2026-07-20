import {ref} from 'vue';
import {defineStore} from 'pinia';

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

    return {list, toggleDone, updateItem, getItemById};
});