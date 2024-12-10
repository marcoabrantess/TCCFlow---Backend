import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../entities/Task';

export class TaskService {
    constructor(private taskRepo: ITaskRepository) {}

    async createTask(data: {
        title: string;
        questions?: string[];
    }): Promise<Task> {
        if (!data.title || typeof data.title !== 'string') {
            throw new Error('Invalid task title');
        }

        const task = await this.taskRepo.create({
            title: data.title,
            questions: data.questions || [],
        });

        return task;
    }

    async getTaskById(id: string): Promise<Task | null> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid task ID');
        }

        return await this.taskRepo.findTaskById(id);
    }

    async updateTask(id: string, data: Partial<Task>): Promise<Task | null> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid task ID');
        }

        if (data.title && typeof data.title !== 'string') {
            throw new Error('Invalid task title');
        }

        return await this.taskRepo.updateTask(id, data);
    }

    async deleteTask(id: string): Promise<void> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid task ID');
        }

        await this.taskRepo.deleteTask(id);
    }

    async addQuestionToTask(
        taskId: string,
        questionId: string
    ): Promise<Task | null> {
        if (!taskId || typeof taskId !== 'string') {
            throw new Error('Invalid task ID');
        }

        if (!questionId || typeof questionId !== 'string') {
            throw new Error('Invalid question ID');
        }

        const task = await this.getTaskById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        task.addQuestion(questionId);
        return await this.taskRepo.updateTask(taskId, task);
    }
}
