import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator"
import { BadRequestError } from "./utils/apiError";
import { StatusCodes } from "http-status-codes";

export const executeValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res
        .status(StatusCodes.BAD_REQUEST)
        .send({
          data: result,
          message: "Request Validation failed !!",
          statusCode: StatusCodes.BAD_REQUEST,
        });
        return;
    }
    return next();
};
  
export const validate = (validationChains: ValidationChain[]) => {
return [...validationChains, executeValidation];
};

