import { IQuestionRepository } from './IQuestionRepository';
import { Question } from '../entities/Question';
import { IQuestionFactory } from '../factories/IFactory';
import { QuestionModel } from '../../infrastructure/database/models/QuestionModel';

export class QuestionRepository implements IQuestionRepository {
    constructor(private questionFactory: IQuestionFactory) {}

    async create(questionData: {
        text: string;
        answer: string;
    }): Promise<Question> {
        const question = await this.questionFactory.createQuestion(
            questionData
        );

        return question;
    }

    async findById(questionId: string): Promise<Question | null> {
        const questionDoc = await QuestionModel.findById(questionId);
        return questionDoc ? questionDoc.toEntity() : null;
    }

    async update(
        questionId: string,
        questionData: Partial<Question>
    ): Promise<Question | null> {
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(
            questionId,
            questionData,
            {
                new: true,
            }
        );

        if (!updatedQuestion) {
            throw new Error('Question not found');
        }

        return updatedQuestion.toEntity();
    }

    async delete(questionId: string): Promise<void> {
        await QuestionModel.findByIdAndDelete(questionId);
    }
}
