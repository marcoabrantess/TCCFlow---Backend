import { ITCCRepository } from './ITCCRepository';
import { TCC } from '../entities/TCC';
import { ITCCFactory } from '../factories/IFactory';
import { TCCModel } from '../../infrastructure/database/models/TCCModel';

export class TCCRepository implements ITCCRepository {
    constructor(private tccFactory: ITCCFactory) {}

    async create(tccData: {
        title: string;
        authorId: string;
        contentPath: string;
    }): Promise<TCC> {
        const tcc = await this.tccFactory.createTCC(tccData);

        await TCCModel.create({
            _id: tcc.id,
            title: tcc.title,
            authorId: tcc.authorId,
            contentPath: tcc.contentPath,
            createdAt: tcc.createdAt,
            updatedAt: tcc.updatedAt,
        });

        return tcc;
    }

    async findTCCById(tccId: string): Promise<TCC | null> {
        const tccDoc = await TCCModel.findById(tccId);
        return tccDoc ? tccDoc.toEntity() : null;
    }

    async updateTCC(tccId: string, tccData: Partial<TCC>): Promise<void> {
        await TCCModel.findByIdAndUpdate(tccId, tccData);
    }

    async deleteTCC(tccId: string): Promise<void> {
        await TCCModel.findByIdAndDelete(tccId);
    }
}
