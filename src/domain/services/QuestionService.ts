import { QuestionRepository } from '../repositories/QuestionRepository';
import { Question } from '../entities/Question';

export class QuestionService {
    constructor(private questionRepository: QuestionRepository) {}

    async create(questionData: {
        text: string;
        type: 'text' | 'multiple-choice';
        options: string[];
    }): Promise<Question> {
        if (!questionData.text || !questionData.type) {
            throw new Error('Invalid question data');
        }

        const question = new Question(
            Math.random().toString(36).substring(2),
            questionData.text,
            questionData.type,
            questionData.options || []
        );

        return this.questionRepository.create(question);
    }

    async findById(id: string): Promise<Question | null> {
        return this.questionRepository.findById(id);
    }

    async update(id: string, data: Partial<Question>): Promise<void> {
        return this.questionRepository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.questionRepository.delete(id);
    }
}
