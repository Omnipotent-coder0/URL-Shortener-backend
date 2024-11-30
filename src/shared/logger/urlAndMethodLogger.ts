import { NextFunction, Request, Response } from "express";

export const urlAndMethodLogger = (req: Request, res: Response, next: NextFunction)=>{
    console.log({
        method: req.method,
        originalUrl: req.originalUrl,
    });
    return next();
}