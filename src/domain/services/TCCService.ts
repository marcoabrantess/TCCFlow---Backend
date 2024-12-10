import { ITCCRepository } from '../repositories/ITCCRepository';
import { TCC } from '../entities/TCC';

export class TCCService {
    constructor(private readonly tccRepository: ITCCRepository) {}

    /**
     * Cria um novo TCC
     * @param tccData Dados do TCC
     * @returns TCC criado
     */
    async create(tccData: {
        title: string;
        authorId: string;
        contentPath: string;
    }): Promise<TCC> {
        if (!tccData.title || !tccData.authorId || !tccData.contentPath) {
            throw new Error(
                'Todos os campos (title, authorId, contentPath) são obrigatórios.'
            );
        }
        if (!tccData.contentPath.endsWith('.pdf')) {
            throw new Error('O arquivo de conteúdo deve ser um PDF.');
        }

        return this.tccRepository.create(tccData);
    }

    /**
     * Busca um TCC pelo ID
     * @param id ID do TCC
     * @returns TCC ou null se não encontrado
     */
    async findById(id: string): Promise<TCC | null> {
        return this.tccRepository.findTCCById(id);
    }

    /**
     * Atualiza um TCC existente
     * @param id ID do TCC
     * @param tccData Dados do TCC para atualizar
     */
    async update(id: string, tccData: Partial<TCC>): Promise<void> {
        if (tccData.contentPath && !tccData.contentPath.endsWith('.pdf')) {
            throw new Error('O arquivo de conteúdo deve ser um PDF.');
        }
        await this.tccRepository.updateTCC(id, tccData);
    }

    /**
     * Deleta um TCC pelo ID
     * @param id ID do TCC
     */
    async delete(id: string): Promise<void> {
        await this.tccRepository.deleteTCC(id);
    }
}
