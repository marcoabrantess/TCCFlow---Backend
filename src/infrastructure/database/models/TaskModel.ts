import mongoose, { Schema, Document } from 'mongoose';
import { Task } from '../../../domain/entities/Task';
import { Question } from '../../../domain/entities/Question';
import { questionSchema } from './QuestionModel';

export interface ITaskDocument extends Document {
    title: string;
    questions: Question[];
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    toEntity(): Task;
}

const taskSchema = new Schema<ITaskDocument>({
    _id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    questions: [questionSchema],
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

taskSchema.methods.toEntity = function (): Task {
    return new Task(
        this._id.toString(),
        this.title,
        this.questions,
        this.isCompleted,
        this.createdAt,
        this.updatedAt
    );
};

export const TaskModel = mongoose.model<ITaskDocument>('Task', taskSchema);
