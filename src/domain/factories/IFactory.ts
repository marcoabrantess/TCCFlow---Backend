import { User } from '../entities/User';

export interface IFactory {
    createUser(data: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User>;
}
