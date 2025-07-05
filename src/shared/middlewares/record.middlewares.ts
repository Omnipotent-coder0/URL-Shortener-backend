import { NextFunction, Request, Response } from "express";
import { Record } from "../modals/record.modal";
import { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";

export const checkRecordOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: userId } = req.body.me;
        const { id: recordId } = req.params;
        if (!Types.ObjectId.isValid(recordId)){
            res.status(StatusCodes.BAD_REQUEST).send({message: "Invalid MongoID !!"});
            return;
        } 
        const record = await Record.findById(recordId);
        if (!record){
            res.status(StatusCodes.NOT_FOUND).send({message: "Invalid Record !!"});
            return;
        }
        const isOwner = record.checkOwnership(userId);
        if (!isOwner){
            res.status(StatusCodes.FORBIDDEN).send({message: "Forbidden. You are not allowed to access this resource. !!"});
            return;
        }
        return next();
    } catch (error) {
        next(error);
    }
}