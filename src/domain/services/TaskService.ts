import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../entities/Task';
import { Question } from '../entities/Question';

export class TaskService {
    constructor(private taskRepository: ITaskRepository) {}

    async create(taskData: {
        title: string;
        questions?: Question[];
        isCompleted: boolean;
    }): Promise<Task> {
        return await this.taskRepository.create(taskData);
    }

    async findById(id: string): Promise<Task | null> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid task ID');
        }

        return await this.taskRepository.findById(id);
    }

    async update(id: string, data: Partial<Task>): Promise<Task | null> {
        const updatedTask = await this.taskRepository.update(id, data);
        return updatedTask;
    }

    async delete(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }

    async getAll(): Promise<Task[]> {
        return await this.taskRepository.getAll();
    }
}
