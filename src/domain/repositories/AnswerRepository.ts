import { IAnswerRepository } from './IAnswerRepository';
import { Answer } from '../entities/Answer';
import { IAnswerFactory } from '../factories/IFactory';
import { AnswerModel } from '../../infrastructure/database/models/AnswerModel';

export class AnswerRepository implements IAnswerRepository {
    constructor(private answerFactory: IAnswerFactory) {}

    async create(answerData: {
        content: string | string[];
        questionId: string;
    }): Promise<Answer> {
        const answer = await this.answerFactory.createAnswer(answerData);

        await AnswerModel.create({
            _id: answer.id,
            content: answer.content,
            questionId: answer.questionId,
            createdAt: answer.createdAt,
            updatedAt: answer.updatedAt,
        });

        return answer;
    }

    async findAnswerById(answerId: string): Promise<Answer | null> {
        const answerDoc = await AnswerModel.findById(answerId);
        return answerDoc ? answerDoc.toEntity() : null;
    }

    async updateAnswer(
        answerId: string,
        answerData: Partial<Answer>
    ): Promise<void> {
        await AnswerModel.findByIdAndUpdate(answerId, answerData);
    }

    async deleteAnswer(answerId: string): Promise<void> {
        await AnswerModel.findByIdAndDelete(answerId);
    }
}
