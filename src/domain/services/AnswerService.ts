import { IAnswerRepository } from '../repositories/IAnswerRepository';
import { Answer } from '../entities/Answer';

export class AnswerService {
    constructor(private answerRepository: IAnswerRepository) {}

    async create(data: {
        content: string | string[];
        questionId: string;
    }): Promise<Answer> {
        if (
            !data.content ||
            (typeof data.content !== 'string' && !Array.isArray(data.content))
        ) {
            throw new Error('Invalid answer content');
        }

        if (!data.questionId || typeof data.questionId !== 'string') {
            throw new Error('Invalid question ID');
        }

        return await this.answerRepository.create(data);
    }

    async getById(id: string): Promise<Answer | null> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid answer ID');
        }

        return await this.answerRepository.findById(id);
    }

    async update(id: string, data: Partial<Answer>): Promise<void> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid answer ID');
        }

        if (
            data.content &&
            typeof data.content !== 'string' &&
            !Array.isArray(data.content)
        ) {
            throw new Error('Invalid answer content');
        }
    }

    async delete(id: string): Promise<void> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid answer ID');
        }

        await this.answerRepository.delete(id);
    }
}
