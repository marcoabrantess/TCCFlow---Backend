import { ITCCRepository } from './ITCCRepository';
import { TCC } from '../entities/TCC';
import { ITCCFactory } from '../factories/IFactory';
import { TCCModel } from '../../infrastructure/database/models/TCCModel';

export class TCCRepository implements ITCCRepository {
    constructor(private tccFactory: ITCCFactory) {}

    async create(tccData: {
        title: string;
        authorName: string;
        advisorName: string;
        coadvisorName: string;
        contentPath: string;
    }): Promise<TCC> {
        const tcc = await this.tccFactory.createTCC(tccData);

        return tcc;
    }

    async findTCCById(tccId: string): Promise<TCC | null> {
        const tccDoc = await TCCModel.findById(tccId);
        return tccDoc ? tccDoc.toEntity() : null;
    }

    async updateTCC(tccId: string, tccData: Partial<TCC>): Promise<TCC> {
        const updatedTCC = await TCCModel.findByIdAndUpdate(tccId, tccData, {
            new: true,
        });

        if (!updatedTCC) {
            throw new Error('TCC not found');
        }

        return updatedTCC.toEntity();
    }

    async deleteTCC(tccId: string): Promise<void> {
        await TCCModel.findByIdAndDelete(tccId);
    }

    async getAll(): Promise<TCC[]> {
        const tccDocs = await TCCModel.find();
        return tccDocs.map((tccDoc) => tccDoc.toEntity());
    }

    async findByTitle(title: string) {
        const tccDoc = await TCCModel.findOne({ title });
        return tccDoc ? tccDoc.toEntity() : null;
    }
}
