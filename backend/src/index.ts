import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
const port = process.env.PORT || 3001;

server.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
});

server.listen(port, () => {
    console.log("Server is running on port", port);
});