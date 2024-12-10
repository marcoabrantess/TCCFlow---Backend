import mongoose, { Schema, Document, Types } from 'mongoose';
import { Answer } from '../../../domain/entities/Answer';

export interface IAnswerDocument extends Document {
    content: string | string[];
    questionId: Types.ObjectId;
    toEntity(): Answer;
}

const AnswerSchema = new Schema<IAnswerDocument>({
    content: { type: Schema.Types.Mixed, required: true },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
});

export const AnswerModel = mongoose.model<IAnswerDocument>(
    'Answer',
    AnswerSchema
);
