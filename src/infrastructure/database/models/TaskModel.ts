import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
    title: string;
    questions: Types.ObjectId[];
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
