import express, {Response} from 'express';
import dotenv from 'dotenv';
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const server = express();
const port = process.env.PORT || 3001;

server.get("/", (res: Response) => {
    res.send("Hello World!");
});

server.use("/tasks", taskRoutes);

server.listen(port, () => {
    console.log("Server is running on port", port);
});