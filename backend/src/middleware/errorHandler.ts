import {Request, Response, NextFunction} from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).send({details:"Ein unerwarteter Fehler ist aufgetaucht. Leider konnte Ihre Anfrage nicht abschließend bearbeitet werden."});
}

export default errorHandler;