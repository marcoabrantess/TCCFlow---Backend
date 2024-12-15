import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../entities/User';

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    async create(userData: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error(
                'Todos os campos (name, email, password) são obrigatórios.'
            );
        }

        return this.userRepository.create(userData);
    }

    async findById(userId: string): Promise<User | null> {
        return this.userRepository.findById(userId);
    }

    async update(userId: string, userData: Partial<User>): Promise<User> {
        return await this.userRepository.update(userId, userData);
    }

    async delete(userId: string): Promise<void> {
        await this.userRepository.delete(userId);
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async findByEmail(userEmail: string): Promise<User | null> {
        return this.userRepository.findByEmail(userEmail);
    }
}
