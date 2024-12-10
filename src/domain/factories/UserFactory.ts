import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import { IFactory } from './IFactory';

export class UserFactory implements IFactory {
    public async createUser(data: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return new User(
            crypto.randomUUID(),
            data.name,
            data.email,
            hashedPassword,
            new Date(), // createdAt
            new Date(), // updatedAt
            data.userGroups || []
        );
    }
}
