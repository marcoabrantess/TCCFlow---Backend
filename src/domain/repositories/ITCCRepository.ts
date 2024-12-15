import { TCC } from '../entities/TCC';

export interface ITCCRepository {
    create(tccData: Partial<TCC>): Promise<TCC>;
    findTCCById(id: string): Promise<TCC | null>;
    updateTCC(id: string, tccData: Partial<TCC>): Promise<TCC>;
    deleteTCC(id: string): Promise<void>;
    getAll(): Promise<TCC[]>;
    findByTitle(title: string): Promise<TCC | null>;
}
