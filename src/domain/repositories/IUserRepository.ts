import { User } from '../entities/User';

export interface IUserRepository {
    create(userData: Partial<User>): Promise<User>;
    findById(userId: string): Promise<User | null>;
    update(userId: string, userData: Partial<User>): Promise<User>;
    delete(userId: string): Promise<void>;
    getAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
}
