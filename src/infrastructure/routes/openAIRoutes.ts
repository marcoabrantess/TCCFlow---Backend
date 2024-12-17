import { Router } from 'express';
import { generateText } from '../../application/controllers/OpenAIController';

export const openAIRoutes = Router();

// authRoutes.post('/register', register);
openAIRoutes.post('/generateText', generateText);
