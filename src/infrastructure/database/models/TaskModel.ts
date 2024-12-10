import mongoose, { Schema, Document, Types } from 'mongoose';
import { Task } from '../../../domain/entities/Task';

export interface ITaskDocument extends Document {
    title: string;
    questions: Types.ObjectId[];
    toEntity(): Task;
}

const TaskSchema = new Schema<ITaskDocument>({
    title: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

TaskSchema.methods.toEntity = function (): Task {
    return new Task(
        this._id.toString(),
        this.title,
        this.questions,
        this.createdAt,
        this.updatedAt
    );
};

export const TaskModel = mongoose.model<ITaskDocument>('TCC', TaskSchema);
