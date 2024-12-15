import { IUserRepository } from './IUserRepository';
import { User } from '../entities/User';
import { IUserFactory } from '../factories/IFactory';
import { UserModel } from '../../infrastructure/database/models/UserModel';
import bcrypt from 'bcryptjs';

export class UserRepository implements IUserRepository {
    constructor(private userFactory: IUserFactory) {}

    async create(userData: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        const user = await this.userFactory.createUser(userData);

        return user;
    }

    async findById(userId: string): Promise<User | null> {
        const userDoc = await UserModel.findById(userId);
        return userDoc ? userDoc.toEntity() : null;
    }

    async update(userId: string, userData: Partial<User>): Promise<User> {
        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            userData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser.toEntity();
    }

    async delete(userId: string): Promise<void> {
        await UserModel.findByIdAndDelete(userId);
    }

    async getAll(): Promise<User[]> {
        const userDocs = await UserModel.find();
        return userDocs.map((userDoc) => userDoc.toEntity());
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ email });
        return userDoc ? userDoc.toEntity() : null;
    }
}
