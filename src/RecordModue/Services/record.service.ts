import { Types } from "mongoose";
import { ICreateRecordPayload, IUpdateRecordPayload } from "../../shared/types/record.types";
import { getNextSequence, toUrlSafeBase64 } from "../../shared/utils/helpers";
import { RecordRepository } from "../Repositories/record.repository";

export class RecordService {
    private repository: RecordRepository;
    constructor() {
        this.repository = new RecordRepository();
    }

    public async getUserRecords(userId: string) {
        const records = await this.repository.getRecordsByUserId(userId);
        return records || [];
    }

    public async createRecord(payload: ICreateRecordPayload) {
        if (!Types.ObjectId.isValid(payload.userId)) {
            throw new Error("Invalid userId");
        }
        const currCount: number = await getNextSequence(this.repository.name);
        const shortURL = toUrlSafeBase64(currCount);
        const record = await this.repository.createRecord({
            userId: new Types.ObjectId(payload.userId), // Safe now
            originalURL: payload.originalURL,
            shortURL,
            counter: 0,
        });
        return record;
    }

    public async getRecordById(recordId: string) {
        const record = await this.repository.getRecordById(recordId);
        return record;
    }

    public async updateRecord(payload: IUpdateRecordPayload) {
        const updatedRecord = await this.repository.updateRecord(payload);
        return updatedRecord;
    }

    public async deteleRecordById(id:string) {
        const deleted = await this.repository.deleteRecordById(id);
        return deleted;
    }

}