import { IQuestionRepository } from './IQuestionRepository';
import { Question } from '../entities/Question';
import { IQuestionFactory } from '../factories/IFactory';
import { QuestionModel } from '../../infrastructure/database/models/QuestionModel';

export class QuestionRepository implements IQuestionRepository {
    constructor(private questionFactory: IQuestionFactory) {}

    async create(questionData: {
        text: string;
        type: 'text' | 'multiple-choice';
        options?: string[];
    }): Promise<Question> {
        const question = await this.questionFactory.createQuestion(
            questionData
        );

        await QuestionModel.create({
            _id: question.id,
            text: question.text,
            type: question.type,
            options: question.options,
            answer: question.answer,
        });

        return question;
    }

    async findById(questionId: string): Promise<Question | null> {
        const questionDoc = await QuestionModel.findById(questionId).populate(
            'answer'
        );
        return questionDoc ? questionDoc.toEntity() : null;
    }

    async update(
        questionId: string,
        questionData: Partial<Question>
    ): Promise<void> {
        await QuestionModel.findByIdAndUpdate(questionId, questionData);
    }

    async delete(questionId: string): Promise<void> {
        await QuestionModel.findByIdAndDelete(questionId);
    }
}
