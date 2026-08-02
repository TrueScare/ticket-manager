import {db} from './postgres_connector.js';
import {Task} from "@ticket-manager/shared";

async function getAllTasks(): Promise<Task[]> {
    return await db.any('SELECT * FROM task');
}

async function getTaskById(id: number): Promise<Task> {
    return await db.one('SELECT * FROM task WHERE id = $1', [id]);
}

async function addTask(task: Task): Promise<Task> {
    return await db.one('INSERT INTO task(title, isDone) values ($1, $2) RETURNING *', [task.title, task.isDone]);
}

async function updateTask(task: Task): Promise<Task> {
    return await db.one('UPDATE task set title  = $1, isDone = $2  where id = $3 RETURNING *', [task.title, task.isDone, task.id]);
}

async function deleteTask(task: Task): Promise<Task> {
    return await db.one('DELETE FROM task WHERE id = $1 RETURNING *', [task.id]);
}

export {getAllTasks, addTask, updateTask, deleteTask, getTaskById};