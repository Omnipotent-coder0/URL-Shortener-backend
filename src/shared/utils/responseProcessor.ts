import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "./successResponse";
import { ApiError } from "./apiError";
import { StatusCodes } from "http-status-codes";

type AsyncFunction=(
    req: Request,
    res: Response,
    next: NextFunction,
)=> Promise<any>;

export const responseProcessor = (handlerFunctions : AsyncFunction)=>
    async (req: Request, res: Response, next: NextFunction)=>{
        Promise.resolve(handlerFunctions(req, res, next)).then((response: SuccessResponse)=>{
            return res.status(response.statusCode).send(response);
        }).catch((error)=>{
            if(error instanceof ApiError){
                return res.status(error.statusCode).send({
                    statusCode: error.statusCode,
                    message: error.message,
                    data: {},
                });
            }else{
                return res.status(StatusCodes.BAD_REQUEST).send({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "Some error occurred while processing request",
                    data: {},
                })
            }
        })
    }