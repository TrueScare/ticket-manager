import express, {Response, Request} from 'express';
import dotenv from 'dotenv';
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const server = express();
server.use(express.json());
const port = process.env.PORT || 3001;

server.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

server.use("/tasks", taskRoutes);


server.listen(port, () => {
    console.log("Server is running on port", port);
});