import { Request, Response, RequestHandler } from 'express';
import { AuthService } from '../../domain/services/AuthService';

const authService = new AuthService();

export const login: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        const { token, user, roles } = await authService.login(email, password);

        res.status(200).json({
            token,
            user,
            roles,
        });
    } catch (err) {
        res.status(401).json({
            message: 'Failed to login',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
