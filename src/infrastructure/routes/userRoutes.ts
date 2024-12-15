import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from '../../application/controllers/UserController';

export const userRoutes = Router();

userRoutes.post('/users', createUser);
userRoutes.post('/users/:id', updateUser);

userRoutes.get('/users', getAllUsers);
userRoutes.get('/users/:id', getUser);

userRoutes.delete('/users/:id', deleteUser);
