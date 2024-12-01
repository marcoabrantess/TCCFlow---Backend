import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class CreateUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(data: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        return this.userRepository.create(data);
    }
}
