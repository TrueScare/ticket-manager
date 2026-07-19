import {ref} from "vue";

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

export function useList() {
    return { list };
}