import { Question } from '../entities/Question';

export interface IQuestionRepository {
    create(question: Partial<Question>): Promise<Question>;
    findById(id: string): Promise<Question | null>;
    update(id: string, question: Partial<Question>): Promise<Question | null>;
    delete(id: string): Promise<void>;
}
