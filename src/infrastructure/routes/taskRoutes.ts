import { Router } from 'express';
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask,
} from '../../application/controllers/TaskController';

export const taskRoutes = Router();

taskRoutes.post('/tasks', createTask);
taskRoutes.post('/tasks/:id', updateTask);

taskRoutes.get('/tasks', getAllTasks);
taskRoutes.get('/tasks/:id', getTask);

taskRoutes.delete('/tasks/:id', deleteTask);
