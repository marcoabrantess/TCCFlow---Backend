import { Task } from '../entities/Task';

export interface ITaskRepository {
    create(task: Partial<Task>): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    update(id: string, task: Partial<Task>): Promise<Task | null>;
    delete(id: string): Promise<void>;
    getAll(): Promise<Task[]>;
}
