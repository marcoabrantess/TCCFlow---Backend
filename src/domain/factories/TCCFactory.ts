import { TCCModel } from '../../infrastructure/database/models/TCCModel';
import { TCC } from '../entities/TCC';
import { ITCCFactory } from './IFactory';
import crypto from 'crypto';

export class TCCFactory implements ITCCFactory {
    public async createTCC(data: {
        title: string;
        authorName: string;
        advisorName: string;
        coadvisorName?: string;
        contentPath: string;
    }): Promise<TCC> {
        const tcc = new TCC(
            crypto.randomUUID(),
            data.title,
            data.authorName,
            data.advisorName,
            data.coadvisorName || '',
            data.contentPath,
            new Date(),
            new Date()
        );

        await TCCModel.create({
            _id: tcc._id,
            title: tcc.title,
            authorName: tcc.authorName,
            advisorName: tcc.advisorName,
            coadvisorName: tcc.coadvisorName,
            contentPath: tcc.contentPath,
            createdAt: tcc.createdAt,
            updatedAt: tcc.updatedAt,
        });

        return tcc;
    }
}
