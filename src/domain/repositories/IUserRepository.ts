import { User } from '../entities/User';

export interface IUserRepository {
    create(userData: Partial<User>): Promise<User>;
    findById(userId: string): Promise<User | null>;
    update(userId: string, userData: Partial<User>): Promise<void>;
    delete(userId: string): Promise<void>;
}
