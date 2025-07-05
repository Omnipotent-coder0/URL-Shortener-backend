import { Request } from "express";
import { ICreateRecordPayload, IUpdateRecordPayload } from "../../shared/types/record.types";

export class RecordPolicy{
    
    getUserId(req: Request){
        console.log({me: req.body.me});
        const {id: userId} = req.body.me;
        return userId as string;
    }

    getCreateRecordPayload(req: Request): ICreateRecordPayload{
        const {id: userId} = req.body.me;
        const {originalURL} = req.body;
        return {
            userId: userId as string,
            originalURL: originalURL as string,
        }
    }

    getRecordId(req: Request){
        const {id: recordId} = req.params;
        return recordId as string;
    }

    getUpdateRecordPayload(req: Request): IUpdateRecordPayload{
        const id = this.getRecordId(req);
        const {originalURL} = req.body;
        return {
            id,
            originalURL: originalURL as string,
        }
    }
}