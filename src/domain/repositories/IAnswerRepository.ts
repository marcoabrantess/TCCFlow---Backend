import { Answer } from '../entities/Answer';

export interface IAnswerRepository {
    create(answer: Partial<Answer>): Promise<Answer>;
    findById(id: string): Promise<Answer | null>;
    update(id: string, answer: Partial<Answer>): Promise<Answer | null>;
    delete(id: string): Promise<void>;
}
