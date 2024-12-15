import { Router } from 'express';
import { login } from '../../application/controllers/AuthController';

export const authRoutes = Router();

// authRoutes.post('/register', register);
authRoutes.post('/login', login);
