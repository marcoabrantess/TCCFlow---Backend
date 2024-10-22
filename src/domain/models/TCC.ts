import mongoose, { Schema } from 'mongoose';
import { ITCC } from '../../interfaces/ITCC';

const TCCSchema: Schema = new Schema({
    title: { type: String, required: true },
    student: { type: String, required: true },
    advisor: { type: String, required: true },
    submissionDate: { type: Date, required: true },
});

const TCC = mongoose.model<ITCC>('TCC', TCCSchema);
export default TCC;
