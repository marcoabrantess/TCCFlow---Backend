import { IAnswerRepository } from '../repositories/IAnswerRepository';
import { Answer } from '../entities/Answer';

export class AnswerService {
    constructor(private answerRepo: IAnswerRepository) {}

    async createAnswer(data: {
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

        return await this.answerRepo.create(data);
    }

    async getAnswerById(id: string): Promise<Answer | null> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid answer ID');
        }

        return await this.answerRepo.findAnswerById(id);
    }

    async updateAnswer(
        id: string,
        data: Partial<Answer>
    ): Promise<Answer | null> {
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

        return await this.answerRepo.updateAnswer(id, data);
    }

    async deleteAnswer(id: string): Promise<void> {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid answer ID');
        }

        await this.answerRepo.deleteAnswer(id);
    }
}
