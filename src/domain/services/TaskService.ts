import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task } from '../entities/Task';
import { Question } from '../entities/Question';

export class TaskService {
    constructor(private taskRepository: ITaskRepository) {}

    async create(data: {
        title: string;
        questions?: Question[];
    }): Promise<Task> {
        if (!data.title || typeof data.title !== 'string') {
            throw new Error('Invalid task title');
        }

        const task = await this.taskRepository.create({
            title: data.title,
            questions: data.questions || [],
        });

        return task;
    }

    async getById(id: string): Promise<Task | null> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid task ID');
        }

        return await this.taskRepository.findById(id);
    }

    async update(id: string, data: Partial<Task>): Promise<void> {
        await this.taskRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }

    async addQuestionToTask(taskId: string, questionId: string): Promise<void> {
        if (!taskId || typeof taskId !== 'string') {
            throw new Error('Invalid task ID');
        }

        if (!questionId || typeof questionId !== 'string') {
            throw new Error('Invalid question ID');
        }

        const task = await this.getById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        //task.addQuestion(questionId);
        await this.taskRepository.update(taskId, task);
    }
}
