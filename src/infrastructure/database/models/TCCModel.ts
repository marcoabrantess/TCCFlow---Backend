import mongoose, { Schema, Document } from 'mongoose';
import { TCC } from '../../../domain/entities/TCC';

export interface ITCCDocument extends Document {
    title: string;
    authorId: string;
    contentPath: string;
    createdAt: Date;
    updatedAt: Date;
    toEntity(): TCC;
}

const tccSchema = new Schema<ITCCDocument>(
    {
        title: { type: String, required: true, trim: true },
        authorId: {
            type: String,
            required: true,
            validate: {
                validator: (id: string) => mongoose.isValidObjectId(id),
                message: 'authorId deve ser um ID válido',
            },
        },
        contentPath: {
            type: String,
            required: true,
            validate: {
                validator: (path: string) => path.endsWith('.pdf'),
                message: 'contentPath deve ser um arquivo PDF',
            },
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

tccSchema.methods.toEntity = function (): TCC {
    return new TCC(
        this._id.toString(),
        this.title,
        this.authorId,
        this.contentPath,
        this.createdAt,
        this.updatedAt
    );
};

export const TCCModel = mongoose.model<ITCCDocument>('TCC', tccSchema);
