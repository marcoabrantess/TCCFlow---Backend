import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import { IUserFactory } from './IFactory';
import { UserModel } from '../../infrastructure/database/models/UserModel';

export class UserFactory implements IUserFactory {
    public async createUser(data: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
        isActive?: boolean;
    }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new User(
            crypto.randomUUID(),
            data.name,
            data.email,
            hashedPassword,
            new Date(), // createdAt
            new Date(), // updatedAt
            data.userGroups || [],
            data.isActive || true
        );

        await UserModel.create({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            userGroups: user.userGroups,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        return user;
    }
}
