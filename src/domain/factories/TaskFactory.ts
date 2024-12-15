import { TaskModel } from '../../infrastructure/database/models/TaskModel';
import { Question } from '../entities/Question';
import { Task } from '../entities/Task';
import { ITaskFactory } from './IFactory';
import crypto from 'crypto';

export class TaskFactory implements ITaskFactory {
    public async createTask(data: {
        title: string;
        questions?: Question[];
        isCompleted: boolean;
    }): Promise<Task> {
        const task = new Task(
            crypto.randomUUID(),
            data.title,
            data.questions || [],
            data.isCompleted || false,
            new Date(),
            new Date()
        );

        await TaskModel.create({
            _id: task._id,
            title: task.title,
            questions: task.questions,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        });

        return task;
    }
}
