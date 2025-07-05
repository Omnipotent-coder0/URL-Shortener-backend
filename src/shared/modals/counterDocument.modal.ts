import { Schema, model, Document } from 'mongoose';

interface CounterDocument extends Document {
  name: string;
  value: number;
}

const counterSchema = new Schema<CounterDocument>({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true, default: 0 },
});

export const Counter = model<CounterDocument>('Counter', counterSchema);