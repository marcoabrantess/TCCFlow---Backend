import { QuestionModel } from '../../infrastructure/database/models/QuestionModel';
import { Question } from '../entities/Question';
import { IQuestionFactory } from './IFactory';
import crypto from 'crypto';

export class QuestionFactory implements IQuestionFactory {
    public async createQuestion(data: {
        text: string;
        answer: string;
    }): Promise<Question> {
        const question = new Question(
            crypto.randomUUID(),
            data.text,
            data.answer
        );

        await QuestionModel.create({
            _id: question._id,
            text: question.text,
            answer: question.answer,
        });

        return question;
    }
}
