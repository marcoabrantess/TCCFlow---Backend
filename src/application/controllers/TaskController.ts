import { Request, Response } from 'express';
import { TaskFactory } from '../../domain/factories/TaskFactory';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { TaskService } from '../../domain/services/TaskService';

interface CreateTaskRequestBody {
    title: string;
    description: string;
    totalGrade: number;
    studentGrades: Array<{
        studentId: string;
        percentageGrade: number;
    }>;
}

const taskFactory = new TaskFactory();
const taskRepository = new TaskRepository(taskFactory);
const taskService = new TaskService(taskRepository);

export const createTask = async (
    req: Request<object, object, CreateTaskRequestBody>,
    res: Response
) => {
    try {
        const { title, description, totalGrade, studentGrades } = req.body;

        const taskData = {
            title,
            description,
            totalGrade,
            studentGrades: studentGrades || [],
        };

        const createdTask = await taskService.create(taskData);

        res.status(201).json({
            message: 'task created successfully',
            data: createdTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while creating the task',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getTask = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.findById(taskId);

        res.status(200).json({
            data: task,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while getting the task',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const allTasks = await taskService.getAll();

        res.status(200).json({
            data: allTasks,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while getting all tasks',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const updateTask = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const taskId = req.params.id;
        const { title, description, totalGrade, studentGrades } = req.body;

        const taskData: Partial<{
            title: string;
            description: string;
            totalGrade: number;
            studentGrades: Array<{
                studentId: string;
                percentageGrade: number;
            }>;
        }> = {};

        if (title) taskData.title = title;
        if (description) taskData.description = description;
        if (totalGrade) taskData.totalGrade = totalGrade;
        if (studentGrades) taskData.studentGrades = studentGrades;

        const updatedTask = await taskService.update(taskId, taskData);

        res.status(200).json({
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while updating the task',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const deleteTask = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const taskId = req.params.id;
        await taskService.delete(taskId);

        res.status(204).json({
            message: 'Task deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while deleting the task',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

// Task.ts
export interface StudentGrade {
    studentId: string;
    percentageGrade: number;
}

export class Task {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public totalGrade: number,
        public studentGrades: StudentGrade[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}

    public calculateStudentGrade(studentId: string): number {
        const studentGrade = this.studentGrades.find(
            (grade) => grade.studentId === studentId
        );
        if (!studentGrade) return 0;
        return (studentGrade.percentageGrade / 100) * this.totalGrade;
    }
}
