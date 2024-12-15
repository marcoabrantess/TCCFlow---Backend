import { Request, Response } from 'express';
import { UserService } from '../../domain/services/UserService';
import { UserFactory } from '../../domain/factories/UserFactory';
import { UserRepository } from '../../domain/repositories/UserRepository';

interface CreateUserRequestBody {
    name: string;
    email: string;
    password: string;
    userGroups?: string[];
}

const userFactory = new UserFactory();
const userRepository = new UserRepository(userFactory);
const userService = new UserService(userRepository);

export const createUser = async (
    req: Request<object, object, CreateUserRequestBody>,
    res: Response
) => {
    try {
        const userData = req.body;
        const createdUser = await userService.create(userData);

        res.status(201).json({
            message: 'User created successfully',
            data: createdUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while creating the user',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userService.findById(userId);

        res.status(200).json({
            data: user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while get the user',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await userService.getAll();

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

export const updateUser = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        const updatedUser = await userService.update(userId, userData);

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while update the user',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};

export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const userId = req.params.id;

        await userService.delete(userId);

        res.status(204).json({
            message: 'User deleted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'An error occurred while update the user',
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
};
