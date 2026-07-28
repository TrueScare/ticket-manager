import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const port = process.env.PORT || 3001;

server.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

server.listen(port, () => {
    console.log("Server is running on port", port);
});