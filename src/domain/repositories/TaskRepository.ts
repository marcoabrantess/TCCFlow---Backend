import { ITaskRepository } from './ITaskRepository';
import { Task, StudentGrade } from '../entities/Task';
import { ITaskFactory } from '../factories/IFactory';
import { TaskModel } from '../../infrastructure/database/models/TaskModel';

export class TaskRepository implements ITaskRepository {
    constructor(private taskFactory: ITaskFactory) {}

    async create(taskData: {
        title: string;
        description: string;
        totalGrade: number;
        studentGrades: StudentGrade[];
    }): Promise<Task> {
        const task = await this.taskFactory.createTask(taskData);
        return task;
    }

    async findById(taskId: string): Promise<Task | null> {
        const taskDoc = await TaskModel.findById(taskId);
        return taskDoc ? taskDoc.toEntity() : null;
    }

    async update(
        taskId: string,
        taskData: Partial<Task>
    ): Promise<Task | null> {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            taskData,
            { new: true }
        );

        if (!updatedTask) throw new Error('Task not found');

        return updatedTask.toEntity();
    }

    async delete(taskId: string): Promise<void> {
        await TaskModel.findByIdAndDelete(taskId);
    }

    async getAll(): Promise<Task[]> {
        const taskDocs = await TaskModel.find();
        return taskDocs.map((taskDoc) => taskDoc.toEntity());
    }
}
