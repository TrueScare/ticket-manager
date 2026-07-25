import {createRouter, createWebHistory, type RouteLocationNormalized, type RouteRecordRaw} from 'vue-router';
import Home from "@/views/Home.vue";
import Tasks from "@/views/Tasks.vue";
import Stats from "@/views/Stats.vue";
import Task from "@/views/Task.vue";
import {useTaskStore} from "@/stores/taskStore.ts";

const routes: RouteRecordRaw[] = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/tasks', component: Tasks, name: 'Tasks'},
    {
        path: '/tasks/:id(\\d+)',
        component: Task,
        name: 'TaskDetail',
        beforeEnter: async (to: RouteLocationNormalized) => {
            await useTaskStore().fetchTasks();

            if (!useTaskStore().getTaskById(parseInt(<string>to.params.id))) {
                return {name: 'Home'};
            }
            return true;
        }
    },
    {path: '/stats', component: Stats, name: 'Stats'},
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});