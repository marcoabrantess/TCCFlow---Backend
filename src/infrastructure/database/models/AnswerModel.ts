import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAnswer extends Document {
    content: string | string[];
    questionId: Types.ObjectId;
}

const AnswerSchema = new Schema<IAnswer>({
    content: { type: Schema.Types.Mixed, required: true },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    }, // Relacionamento com Question
});

export const AnswerModel = mongoose.model<IAnswer>('Answer', AnswerSchema);
