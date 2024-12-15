import { QuestionRepository } from '../repositories/QuestionRepository';
import { Question } from '../entities/Question';

export class QuestionService {
    constructor(private questionRepository: QuestionRepository) {}

    async create(questionData: {
        text: string;
        answer: string;
    }): Promise<Question> {
        return this.questionRepository.create(questionData);
    }

    async findById(id: string): Promise<Question | null> {
        return this.questionRepository.findById(id);
    }

    async update(
        id: string,
        data: Partial<Question>
    ): Promise<Question | null> {
        const updatedQuesiton = this.questionRepository.update(id, data);
        return updatedQuesiton;
    }

    async delete(id: string): Promise<void> {
        await this.questionRepository.delete(id);
    }
}
