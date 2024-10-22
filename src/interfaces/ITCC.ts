import { Document } from 'mongoose';

export interface ITCC extends Document {
    title: string;
    student: string;
    advisor: string;
    submissionDate: Date;
}
