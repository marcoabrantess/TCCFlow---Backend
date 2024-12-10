import { ITaskRepository } from './ITaskRepository';
import { Task } from '../entities/Task';
import { ITaskFactory } from '../factories/IFactory';
import { TaskModel } from '../../infrastructure/database/models/TaskModel';

export class TaskRepository implements ITaskRepository {
    constructor(private taskFactory: ITaskFactory) {}

    async create(taskData: {
        title: string;
        questions?: string[];
    }): Promise<Task> {
        const task = await this.taskFactory.createTask(taskData);

        await TaskModel.create({
            _id: task.id,
            title: task.title,
            questions: task.questions,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        });

        return task;
    }

    async findTaskById(taskId: string): Promise<Task | null> {
        const taskDoc = await TaskModel.findById(taskId).populate('questions');
        return taskDoc ? taskDoc.toEntity() : null;
    }

    async updateTask(taskId: string, taskData: Partial<Task>): Promise<void> {
        await TaskModel.findByIdAndUpdate(taskId, taskData);
    }

    async deleteTask(taskId: string): Promise<void> {
        await TaskModel.findByIdAndDelete(taskId);
    }
}
