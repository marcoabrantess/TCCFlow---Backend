import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import { User } from '../entities/User';
import { UserFactory } from '../factories/UserFactory';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from './UserService';

const userFactory = new UserFactory();
const userRepository = new UserRepository(userFactory);
const userService = new UserService(userRepository);

interface LoginResult {
    token: string;
    user: {
        name: string;
        email: string;
    };
    roles: string[];
}

export class AuthService {
    // async register(
    //     name: string,
    //     email: string,
    //     password: string
    // ): Promise<User> {
    //     const existingUser = await userService.findByEmail(email);
    //     if (existingUser) {
    //         throw new Error('Email already in use');
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = new User('', name, email, hashedPassword);
    //     return await userService.create(user);
    // }

    async login(email: string, password: string): Promise<LoginResult> {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email');
        }

        const isPasswordValid = await bcrypt.compare(
            password.trim(),
            user.password.trim()
        );
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign({ id: user._id }, secret!, {
            expiresIn: '1d',
        });

        return { token, user, roles: user.userGroups };
    }

    verifyToken(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, process.env.JWT_SECRET!);
    }
}
