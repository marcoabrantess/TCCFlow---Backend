import { ITaskRepository } from './ITaskRepository';
import { Task } from '../entities/Task';
import { ITaskFactory } from '../factories/IFactory';
import { TaskModel } from '../../infrastructure/database/models/TaskModel';
import { Question } from '../entities/Question';
import { QuestionRepository } from './QuestionRepository';

export class TaskRepository implements ITaskRepository {
    constructor(private taskFactory: ITaskFactory) {}

    async create(taskData: {
        title: string;
        questions?: Question[];
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

    async findById(taskId: string): Promise<Task | null> {
        const taskDoc = await TaskModel.findById(taskId).populate('questions');
        return taskDoc ? taskDoc.toEntity() : null;
    }

    async update(taskId: string, taskData: Partial<Task>): Promise<void> {
        await TaskModel.findByIdAndUpdate(taskId, taskData);
    }

    async delete(taskId: string): Promise<void> {
        await TaskModel.findByIdAndDelete(taskId);
    }
}
