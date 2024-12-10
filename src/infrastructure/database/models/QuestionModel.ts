import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestion extends Document {
    text: string;
    type: 'text' | 'multiple-choice';
    options?: string[];
    answer: Types.ObjectId | null;
}

const QuestionSchema = new Schema<IQuestion>({
    text: { type: String, required: true },
    type: { type: String, enum: ['text', 'multiple-choice'], required: true },
    options: [{ type: String }],
    answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
});

export const QuestionModel = mongoose.model<IQuestion>(
    'Question',
    QuestionSchema
);
