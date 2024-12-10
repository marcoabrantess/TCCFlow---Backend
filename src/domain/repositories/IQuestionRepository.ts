import { Question } from '../entities/Question';

export interface IQuestionRepository {
    create(question: Partial<Question>): Promise<Question>;
    findById(id: string): Promise<Question | null>;
    update(id: string, question: Partial<Question>): Promise<void>;
    delete(id: string): Promise<void>;
}
