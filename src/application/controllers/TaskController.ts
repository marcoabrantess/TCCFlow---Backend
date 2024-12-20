import { Request, Response } from 'express';
import { TaskFactory } from '../../domain/factories/TaskFactory';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { TaskService } from '../../domain/services/TaskService';

import { QuestionFactory } from '../../domain/factories/QuestionFactory';
import { QuestionRepository } from '../../domain/repositories/QuestionRepository';
import { QuestionService } from '../../domain/services/QuestionService';

interface QuestionObject {
    text: string;
    answer: string;
}

const questionFactory = new QuestionFactory();
const questionRepository = new QuestionRepository(questionFactory);
const questionService = new QuestionService(questionRepository);

interface CreateTaskRequestBody {
    title: string;
    questions: QuestionObject[];
    isCompleted: boolean;
}

const taskFactory = new TaskFactory();
const taskRepository = new TaskRepository(taskFactory);
const taskService = new TaskService(taskRepository);

export const createTask = async (
    req: Request<object, object, CreateTaskRequestBody>,
    res: Response
) => {
    try {
        const { title, questions, isCompleted } = req.body;

        const createdQuestions = await Promise.all(
            questions.map(
                async (question) =>
                    await questionService.create({
                        text: question.text,
                        answer: question.answer,
                    })
            )
        );

        const taskData = {
            title,
            questions: createdQuestions,
            isCompleted,
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
            message: 'An error occurred while get the task',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const allUsers = await taskService.getAll();

        res.status(200).json({
            data: allUsers,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while get all users',
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
        const { title, questions, isCompleted } = req.body;

        const createdQuestions = await Promise.all(
            questions.map(
                async (question: QuestionObject) =>
                    await questionService.create({
                        text: question.text,
                        answer: question.answer,
                    })
            )
        );

        const taskData: Partial<{
            title: string;
            questions: typeof createdQuestions;
            isCompleted: boolean;
        }> = {};
        if (title) taskData.title = title;
        if (createdQuestions) taskData.questions = createdQuestions;
        if (isCompleted) taskData.isCompleted = isCompleted;

        const updatedTask = await taskService.update(taskId, taskData);

        res.status(200).json({
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while update the task',
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
            message: 'An error occurred while update the task',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
