import { Task } from '../entities/Task';

export interface ITaskRepository {
    create(task: Partial<Task>): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    update(id: string, task: Partial<Task>): Promise<void>;
    delete(id: string): Promise<void>;
    addQuestion(questionId: string): Promise<void>;
}
