import {Router, Request, Response} from "express";
import type {Task} from "@ticket-manager/shared";
import {validateTask} from "@ticket-manager/shared";

const router = Router();
const list: Task[] = [
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
];
router.get('/', (req: Request, res: Response) => {
    return res.json({
        data: list
    })
});
router.get('/:id', (req: Request, res: Response) => {
    const task = list.find(task => task.id === parseInt(<string>req.params.id));
    if (!task) {
        return res.status(404).json({details: `Task with id not found. Given id: ${req.params.id}`});
    }
    return res.status(200).json({task});
});
router.post('/', (req: Request, res: Response) => {
    const task: Task = req.body;
    if (!validateTask(task)) {
        res.status(422).json({details: `Invalid format for task: ${task}`});
    }
    list.push(task);
    return res.status(200).json({details: list});
});
router.put('/:id', (req: Request, res: Response) => {
    const task= list.find(({id}) => id === parseInt(<string>req.params.id));
    if (!task) {
        return res.status(404).json({details: `Kein Task vorhanden für id: ${req.params.id}`});
    }
    const updatedTask: Task = req.body;
    if(!validateTask(updatedTask)) {
        res.status(422).json({details: `Invalid format for task: ${task}`});
    }
    list[list.indexOf(task)] = updatedTask;
    return res.status(200).json({details: list});
});
router.delete('/:id', (req: Request, res: Response) => {
    const task: Task | undefined = list.find(({id}) => id === parseInt(<string>req.params.id));
    if (!task) {
        res.status(404).json({details: `Kein Task vorhanden für id: ${req.params.id}`});
    }
    list.splice(list.indexOf(<Task>task), 1);
    return res.status(200).json({details: list});
});

export default router;