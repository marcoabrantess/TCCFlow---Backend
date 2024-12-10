import { Answer } from '../entities/Answer';
import { IAnswerFactory } from './IFactory';
import crypto from 'crypto';

export class AnswerFactory implements IAnswerFactory {
    public async createAnswer(data: {
        content: string | string[];
        questionId: string;
    }): Promise<Answer> {
        if (
            !data.content ||
            (typeof data.content !== 'string' && !Array.isArray(data.content))
        ) {
            throw new Error(
                'Answer content must be a valid string or an array of strings.'
            );
        }

        if (!data.questionId || typeof data.questionId !== 'string') {
            throw new Error('Answer must have a valid question ID.');
        }

        return new Answer(
            crypto.randomUUID(),
            data.content,
            data.questionId,
            new Date(),
            new Date()
        );
    }
}
