import { ITaskRepository } from '../repositories/ITaskRepository';
import { Task, StudentGrade } from '../entities/Task';

export class TaskService {
    constructor(private taskRepository: ITaskRepository) {}

    public calculateStudentGrade(task: Task, studentId: string): number {
        const studentGrade = task.studentGrades.find(
            (grade) => grade.studentId === studentId
        );
        if (!studentGrade) return 0;
        return (studentGrade.percentageGrade / 100) * task.totalGrade;
    }

    async create(taskData: {
        title: string;
        description: string;
        totalGrade: number;
        studentGrades: StudentGrade[];
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
