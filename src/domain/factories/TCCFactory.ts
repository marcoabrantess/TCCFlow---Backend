import { TCC } from '../entities/TCC';
import { ITCCFactory } from './IFactory';
import crypto from 'crypto';

export class TCCFactory implements ITCCFactory {
    public async createTCC(data: {
        title: string;
        authorId: string;
        contentPath: string;
    }): Promise<TCC> {
        if (!data.contentPath.endsWith('.pdf')) {
            throw new Error('O arquivo de conteúdo deve ser um PDF.');
        }

        return new TCC(
            crypto.randomUUID(),
            data.title,
            data.authorId,
            data.contentPath,
            new Date(),
            new Date()
        );
    }
}
