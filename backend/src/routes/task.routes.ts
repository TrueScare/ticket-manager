import {Router, Request, Response} from "express";
import {Task, validateTask} from "@ticket-manager/shared";
import {addTask, deleteTask, getAllTasks, getTaskById, updateTask} from "../database/task.js";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const tasks = await getAllTasks();
    return res.json({details: tasks});
});

router.get('/:id', async (req: Request, res: Response) => {
    const task = await getTaskById(parseInt(<string>req.params.id));
    if (!task) {
        return res.status(404).json({details: `Task with id not found. Given id: ${req.params.id}`});
    }
    return res.status(200).json({details: task});
});

router.post('/', async (req: Request, res: Response) => {
    const task: Task = req.body;
    if (!validateTask(task)) {
        return res.status(422).json({details: `Invalid format for task: ${task}, ${req.body}`});
    }
    const db_task = await addTask(task);
    return res.status(201).json({details: db_task});
});

router.put('/:id', async (req: Request, res: Response) => {
    const task = await getTaskById(parseInt(<string>req.params.id));
    if (!task) {
        return res.status(404).json({details: `Kein Task vorhanden für id: ${req.params.id}`});
    }
    const updatedTask: Task = req.body;
    if (!validateTask(updatedTask)) {
        return res.status(422).json({details: `Invalid format for task: ${task}`});
    }
    const db_task = await updateTask(updatedTask);
    return res.status(200).json({details: db_task});
});

router.delete('/:id', async (req: Request, res: Response) => {
    const task: Task | undefined = await getTaskById(parseInt(<string>req.params.id));
    if (!task) {
        return res.status(404).json({details: `Kein Task vorhanden für id: ${req.params.id}`});
    }

    const db_task = await deleteTask(task);
    return res.status(200).json({details: db_task});
});

export default router;