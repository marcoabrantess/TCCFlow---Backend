import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../entities/User';

export class UserService {
    constructor(private readonly userRepository: IUserRepository) {}

    /**
     * Cria um novo usuário
     * @param userData Dados do usuário
     * @returns Usuário criado
     */
    async create(userData: {
        name: string;
        email: string;
        password: string;
        userGroups?: string[];
    }): Promise<User> {
        // Validações adicionais antes de criar o usuário
        if (!userData.name || !userData.email || !userData.password) {
            throw new Error(
                'Todos os campos (name, email, password) são obrigatórios.'
            );
        }

        return this.userRepository.create(userData);
    }

    /**
     * Busca um usuário pelo ID
     * @param userId ID do usuário
     * @returns Usuário ou null se não encontrado
     */
    async findById(userId: string): Promise<User | null> {
        return this.userRepository.findById(userId);
    }

    /**
     * Atualiza os dados de um usuário
     * @param userId ID do usuário
     * @param userData Dados para atualizar
     */
    async update(userId: string, userData: Partial<User>): Promise<void> {
        await this.userRepository.update(userId, userData);
    }

    /**
     * Deleta um usuário pelo ID
     * @param userId ID do usuário
     */
    async delete(userId: string): Promise<void> {
        await this.userRepository.delete(userId);
    }
}
