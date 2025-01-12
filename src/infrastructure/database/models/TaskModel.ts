import mongoose, { Schema, Document } from 'mongoose';
import { Task, StudentGrade } from '../../../domain/entities/Task';

export interface ITaskDocument extends Document {
    title: string;
    description: string;
    totalGrade: number;
    studentGrades: StudentGrade[];
    createdAt: Date;
    updatedAt: Date;
    toEntity(): Task;
}

const studentGradeSchema = new Schema<StudentGrade>(
    {
        studentId: { type: String, required: true },
        percentageGrade: { type: Number, required: true, min: 0, max: 100 },
    },
    { _id: false }
);

const taskSchema = new Schema<ITaskDocument>({
    _id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    totalGrade: { type: Number, required: true, min: 0 },
    studentGrades: [studentGradeSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

taskSchema.methods.toEntity = function (): Task {
    return new Task(
        this._id.toString(),
        this.title,
        this.description,
        this.totalGrade,
        this.studentGrades,
        this.createdAt,
        this.updatedAt
    );
};

export const TaskModel = mongoose.model<ITaskDocument>('Task', taskSchema);
