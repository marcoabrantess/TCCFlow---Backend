import { TaskModel } from '../../infrastructure/database/models/TaskModel';
import { Task, StudentGrade } from '../entities/Task';
import { ITaskFactory } from './IFactory';
import crypto from 'crypto';

export class TaskFactory implements ITaskFactory {
    public async createTask(data: {
        title: string;
        description: string;
        totalGrade: number;
        studentGrades: StudentGrade[];
    }): Promise<Task> {
        const task = new Task(
            crypto.randomUUID(),
            data.title,
            data.description,
            data.totalGrade,
            data.studentGrades || [],
            new Date(),
            new Date()
        );

        await TaskModel.create({
            _id: task._id,
            title: task.title,
            description: task.description,
            totalGrade: task.totalGrade,
            studentGrades: task.studentGrades,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        });

        return task;
    }
}
