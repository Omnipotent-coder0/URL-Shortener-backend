import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../utils/helpers";
import { StatusCodes } from "http-status-codes";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorized, Please Login !!" });
            return;
        }
        const decoded = verifyJwtToken(token);
        req.body.me = decoded;
        console.log({ me: req.body.me });
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({ message: "Invalid Token" });
    }
}