import { Document, model, Model, Schema, SchemaTypes, Types } from "mongoose";

interface IRecordInput{
    userId: Types.ObjectId, 
    originalURL: string, 
    shortURL: string,
    counter: number
}

interface RecordDocument extends IRecordInput, Document{
    createdAt: Date;
    updatedAt: Date;
    getCounter(): number;
    incCounter(): void;
    checkOwnership(userId: Types.ObjectId): boolean;
}

interface RecordModel extends Model<RecordDocument>{

}

const recordSchema = new Schema<RecordDocument, RecordModel>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    originalURL: {
        type: String,
        required: true,
    },
    shortURL: {
        type: String,
        required: true,
        unique: true,
    },
    counter:{
        type: Number,
        default: 0,
    },
}, {timestamps: true});

recordSchema.methods.getCounter = function(): number{
    return this.counter;
}

recordSchema.methods.incCounter = function(): void{
    this.counter++;
}

recordSchema.methods.checkOwnership = function(userId: Types.ObjectId): boolean{
    return this.userId.equals(userId);
}

const Record = model<RecordDocument, RecordModel>("Record", recordSchema);

export {
    Record,
    IRecordInput,
    RecordDocument
}