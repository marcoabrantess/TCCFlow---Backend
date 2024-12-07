import { UserService } from '../../domain/services/UserService';
import { User } from '../../domain/entities/User';

export class CreateUser {
    constructor(private readonly userService: UserService) {}

    async execute(data: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        return this.userService.create(data);
    }
}
