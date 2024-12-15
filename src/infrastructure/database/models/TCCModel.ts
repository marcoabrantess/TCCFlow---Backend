import mongoose, { Schema, Document } from 'mongoose';
import { TCC } from '../../../domain/entities/TCC';

export interface ITCCDocument extends Document {
    title: string;
    authorName: string;
    advisorName: string;
    coadvisorName: string;
    contentPath: string;
    createdAt: Date;
    updatedAt: Date;
    toEntity(): TCC;
}

const tccSchema = new Schema<ITCCDocument>(
    {
        _id: { type: String, required: true },
        title: { type: String, unique: true, required: true, trim: true },
        authorName: {
            type: String,
            required: true,
            trim: true,
        },
        advisorName: {
            type: String,
            required: true,
            trim: true,
        },
        coadvisorName: {
            type: String,
            trim: true,
        },
        contentPath: {
            type: String,
            required: true,
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
        this.authorName,
        this.advisorName,
        this.coadvisorName,
        this.contentPath,
        this.createdAt,
        this.updatedAt
    );
};

export const TCCModel = mongoose.model<ITCCDocument>('TCC', tccSchema);
