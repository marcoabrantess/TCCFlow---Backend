import { TCC } from '../entities/TCC';

export interface ITCCRepository {
    create(tccData: Partial<TCC>): Promise<TCC>;
    findTCCById(id: string): Promise<TCC | null>;
    updateTCC(id: string, tccData: Partial<TCC>): Promise<void>;
    deleteTCC(id: string): Promise<void>;
}
