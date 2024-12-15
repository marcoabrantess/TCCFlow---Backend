import { ITCCRepository } from '../repositories/ITCCRepository';
import { TCC } from '../entities/TCC';

export class TCCService {
    constructor(private readonly tccRepository: ITCCRepository) {}

    async create(tccData: {
        title: string;
        authorName: string;
        contentPath: string;
        advisorName: string;
        coadvisorName?: string;
    }): Promise<TCC> {
        if (
            !tccData.title ||
            !tccData.authorName ||
            !tccData.contentPath ||
            !tccData.advisorName
        ) {
            throw new Error(
                'Todos os campos (title, authorName, contentPath, advisorName, advisorName) são obrigatórios.'
            );
        }

        return this.tccRepository.create(tccData);
    }

    async findById(id: string): Promise<TCC | null> {
        return this.tccRepository.findTCCById(id);
    }

    async update(id: string, tccData: Partial<TCC>): Promise<TCC> {
        const updatedTCC = await this.tccRepository.updateTCC(id, tccData);
        return updatedTCC;
    }

    async delete(id: string): Promise<void> {
        await this.tccRepository.deleteTCC(id);
    }

    async getAll(): Promise<TCC[]> {
        return await this.tccRepository.getAll();
    }

    async findByTitle(id: string): Promise<TCC | null> {
        return this.tccRepository.findByTitle(id);
    }
}
