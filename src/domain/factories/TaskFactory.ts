import { Task } from '../entities/Task';
import { ITaskFactory } from './IFactory';
import crypto from 'crypto';

export class TaskFactory implements ITaskFactory {
    public async createTask(data: {
        title: string;
        questions?: string[];
    }): Promise<Task> {
        if (!data.title || typeof data.title !== 'string') {
            throw new Error('A task must have a valid title.');
        }

        return new Task(
            crypto.randomUUID(),
            data.title,
            data.questions || [],
            new Date(), // createdAt
            new Date() // updatedAt
        );
    }
}
