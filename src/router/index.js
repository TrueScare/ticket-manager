import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import Tasks from "@/views/Tasks.vue";
import Stats from "@/views/Stats.vue";
import Task from "@/views/Task.vue";

const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/tasks', component: Tasks, name: 'Tasks'},
    {path: '/tasks/:id(\\d+)', component: Task, name: 'TaskDetail'},
    {path: '/stats', component: Stats, name: 'Stats'},
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});