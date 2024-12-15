import mongoose, { Schema, Document } from 'mongoose';
import { Question } from '../../../domain/entities/Question';

export interface IQuestionDocument extends Document {
    text: string;
    answer: string;
    toEntity(): Question;
}

export const questionSchema = new Schema<IQuestionDocument>({
    _id: { type: String, required: true },
    text: { type: String, required: true, trim: true },
    answer: { type: String, default: '' },
});

questionSchema.methods.toEntity = function (): Question {
    return new Question(this._id.toString(), this.text, this.answer);
};

export const QuestionModel = mongoose.model<IQuestionDocument>(
    'Question',
    questionSchema
);
