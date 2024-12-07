import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';
import { IUserFactory } from '../factories/IFactory';
import { UserModel } from '../../infrastructure/database/models/UserModel';

export class UserRepository implements IUserRepository {
    constructor(private userFactory: IUserFactory) {}

    async create(userData: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        const user = await this.userFactory.createUser(userData);

        await UserModel.create({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            userGroups: user.userGroups,
        });

        return user;
    }

    async findById(userId: string): Promise<User | null> {
        const userDoc = await UserModel.findById(userId);
        return userDoc ? userDoc.toEntity() : null;
    }

    async update(userId: string, userData: Partial<User>): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, userData);
    }

    async delete(userId: string): Promise<void> {
        await UserModel.findByIdAndDelete(userId);
    }
}
