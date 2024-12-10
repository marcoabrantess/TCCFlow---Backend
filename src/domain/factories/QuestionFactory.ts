import { Question } from '../entities/Question';
import { IQuestionFactory } from './IFactory';
import crypto from 'crypto';

export class QuestionFactory implements IQuestionFactory {
    public async createQuestion(data: {
        text: string;
        type: 'text' | 'multiple-choice';
        options?: string[];
    }): Promise<Question> {
        if (!data.text || typeof data.text !== 'string') {
            throw new Error('A question must have a valid text.');
        }

        if (!['text', 'multiple-choice'].includes(data.type)) {
            throw new Error(
                'Question type must be either "text" or "multiple-choice".'
            );
        }

        if (
            data.type === 'multiple-choice' &&
            (!data.options || data.options.length === 0)
        ) {
            throw new Error(
                'Multiple-choice questions must have at least one option.'
            );
        }

        return new Question(
            crypto.randomUUID(),
            data.text,
            data.type,
            data.options || [],
            null
        );
    }
}
