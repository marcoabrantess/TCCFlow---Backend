import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { tccRoutes } from './tccRoutes';
import { authRoutes } from './authRoutes';
import { taskRoutes } from './taskRoutes';

export const routes = Router();

routes.use(userRoutes);
routes.use(tccRoutes);
routes.use(taskRoutes);
routes.use('/auth', authRoutes);
