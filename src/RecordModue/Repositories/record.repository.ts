import { IRecordInput, Record } from "../../shared/modals/record.modal"
import { IUpdateRecordPayload } from "../../shared/types/record.types";

export class RecordRepository {
    public name: string;
    constructor() {
        this.name = 'Record';
    }
    async getRecordsByUserId(userId: string) {
        const records = await Record.find({ userId });
        return records;
    }
    async createRecord(recordInput: IRecordInput) {
        const newRecord = await Record.create({ ...recordInput });
        return newRecord;
    }
    async getRecordById(id: string) {
        const record = await Record.findById(id);
        return record;
    }
    async updateRecord(payload: IUpdateRecordPayload) {
        const record = await Record.findByIdAndUpdate(
            payload.id, 
            { originalURL: payload.originalURL }, 
            { new: true, runValidators: true }
        );
        return record;
    }
    async deleteRecordById(id: string){
        const record = await Record.findByIdAndDelete(id);
        return record;
    }
    async getRecordByShortURL(shortURL: string){
        const record = await Record.findOneAndUpdate({shortURL}, { $inc: { counter: 1 }}, {new: true});
        return record;
    }
}