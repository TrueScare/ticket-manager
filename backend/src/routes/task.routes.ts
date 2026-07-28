import {Router, Request, Response} from "express";
import type {Task} from "@ticket-manager/shared";

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
    return res.json({task})
});
router.post('/', (req: Request, res: Response) => {

});
router.put('/:id', (req: Request, res: Response) => {

});
router.delete('/:id', (req: Request, res: Response) => {

});

export default router;