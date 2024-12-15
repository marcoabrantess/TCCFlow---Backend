import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../../domain/entities/User';

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    userGroups: string[];
    isActive: boolean;
    toEntity(): User;
}

const userSchema = new Schema<IUserDocument>(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: (email: string) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: 'Email inválido',
            },
        },
        password: { type: String, required: true },
        userGroups: {
            type: [String],
            default: [],
            validate: {
                validator: (groups: string[]) =>
                    Array.isArray(groups) &&
                    groups.every((g) => typeof g === 'string'),
                message: 'userGroups deve ser um array de strings',
            },
        },
        isActive: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.toEntity = function (): User {
    return new User(
        this._id.toString(),
        this.name,
        this.email,
        this.password,
        this.createdAt,
        this.updatedAt,
        this.userGroups,
        this.isActive
    );
};

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
