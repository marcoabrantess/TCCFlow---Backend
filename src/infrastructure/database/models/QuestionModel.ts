import mongoose, { Schema, Document, Types } from 'mongoose';
import { Question } from '../../../domain/entities/Question';

export interface IQuestionDocument extends Document {
    text: string;
    type: 'text' | 'multiple-choice';
    options?: string[];
    answer: Types.ObjectId | null;
    toEntity(): Question;
}

const QuestionSchema = new Schema<IQuestionDocument>({
    text: { type: String, required: true },
    type: { type: String, enum: ['text', 'multiple-choice'], required: true },
    options: [{ type: String }],
    answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
});

QuestionSchema.methods.toEntity = function (): Question {
    return new Question(
        this._id.toString(),
        this.text,
        this.type,
        this.options,
        this.answer
    );
};

export const QuestionModel = mongoose.model<IQuestionDocument>(
    'Question',
    QuestionSchema
);
