import {db} from './postgres_connector.js';
import {Task} from "@ticket-manager/shared";

async function getAllTasks(): Promise<Task[]> {
    return await db.any('SELECT * FROM task');
}

async function getTaskById(id: number): Promise<Task> {
    return await db.one(`SELECT *
                         FROM task
                         WHERE id = ${id}`);
}

async function addTask(task: Task): Promise<Task> {
    return await db.one(`INSERT INTO task(title, isDone) 
                         values ('${task.title}', ${task.isDone})
                         RETURNING *`);
}

async function updateTask(task: Task): Promise<Task> {
    return await db.one(`UPDATE task
                         set title  = '${task.title}',
                             isDone = ${task.isDone}`);
}

async function deleteTask(task: Task): Promise<Task> {
    return await db.one(`DELETE
                         FROM task
                         WHERE id = ${task.id}
                         RETURNING *`);
}

export {getAllTasks, addTask, updateTask, deleteTask, getTaskById};