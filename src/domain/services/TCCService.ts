import { ITCCRepository } from '../repositories/ITCCRepository';
import { TCC } from '../entities/TCC';

export class TCCService {
    constructor(private readonly tccRepository: ITCCRepository) {}

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

    async findById(id: string): Promise<TCC | null> {
        return this.tccRepository.findTCCById(id);
    }

    async update(id: string, tccData: Partial<TCC>): Promise<void> {
        if (tccData.contentPath && !tccData.contentPath.endsWith('.pdf')) {
            throw new Error('O arquivo de conteúdo deve ser um PDF.');
        }
        await this.tccRepository.updateTCC(id, tccData);
    }

    async delete(id: string): Promise<void> {
        await this.tccRepository.deleteTCC(id);
    }
}
