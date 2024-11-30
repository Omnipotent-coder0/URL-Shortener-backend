import { NextFunction, Request, Response } from "express";
import { AuthorizationError, BadRequestError } from "../utils/apiError";
import { verifyJwtToken } from "../utils/helpers";

export const checkAuth = (req: Request, res : Response, next: NextFunction)=>{
    const token = req.cookies.jwtToken;
    if(!token) throw new AuthorizationError("User not logged In !!");
    const decoded = verifyJwtToken(token);
    req.body.me = decoded;
    return next();
}