import { User } from '../entities/User';
import { TCC } from '../entities/TCC';
import { Task } from '../entities/Task';
import { Question } from '../entities/Question';
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
        authorName: string;
        advisorName: string;
        coadvisorName?: string;
        contentPath: string;
    }): Promise<TCC>;
}

export interface ITaskFactory {
    createTask(data: { title: string; questions?: Question[] }): Promise<Task>;
}

export interface IQuestionFactory {
    createQuestion(data: { text: string; answer: string }): Promise<Question>;
}
