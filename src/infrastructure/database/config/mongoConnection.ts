import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});

const mongoURI = process.env.MONGO_URI as string;
if (!mongoURI) {
    throw new Error('A variável de ambiente MONGO_URI não foi definida.');
}

export const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

export const disconnectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected...');
    } catch (err) {
        console.error('Failed to disconnect to MongoDB', err);
        process.exit(1);
    }
};
