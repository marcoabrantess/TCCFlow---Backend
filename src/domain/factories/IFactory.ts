import { User } from '../entities/User';
import { TCC } from '../entities/TCC';

export interface IUserFactory {
    createUser(data: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User>;
}

export interface ITCCFactory {
    createTCC(data: {
        title: string;
        authorId: string;
        contentPath: string;
    }): Promise<TCC>;
}
