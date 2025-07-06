import { Request } from "express";
import { SuccessResponse } from "../../shared/utils/successResponse";
import { RecordPolicy } from "../Policies/record.policy";
import { RecordService } from "../Services/record.service";

export class RecordController{
    private service : RecordService;
    private policy : RecordPolicy;

    constructor(){
        this.service = new RecordService();
        this.policy = new RecordPolicy()
    }

    public getUserRecords = async (req: Request) => {
        const userId = this.policy.getUserId(req);
        console.log({ userId });
        const records = await this.service.getUserRecords(userId);
        return new SuccessResponse(records);
    };

    public createRecord = async (req: Request) => {
        const createRecordPayload = this.policy.getCreateRecordPayload(req);
        const createdRecord = await this.service.createRecord(createRecordPayload);
        return new SuccessResponse(createdRecord, "New Record Created Successfully !!", 201);
    };

    public getRecordById = async (req: Request) => {
        const recordId = this.policy.getRecordId(req);
        const record = await this.service.getRecordById(recordId);
        return new SuccessResponse(record);
    };

    public updateRecord = async (req: Request) => {
        const updateRecordPayload = this.policy.getUpdateRecordPayload(req);
        const updatedRecord = await this.service.updateRecord(updateRecordPayload);
        return new SuccessResponse(updatedRecord);
    };

    public deleteRocordById = async (req: Request) => {
        const recordId = this.policy.getRecordId(req);
        const deletedRecord = await this.service.deteleRecordById(recordId);
        return new SuccessResponse(deletedRecord);
    };
}