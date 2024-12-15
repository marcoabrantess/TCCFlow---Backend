import express from 'express';
import { connectMongoDB } from './infrastructure/database/config/mongoConnection';
import { checkElasticSearchConnection } from './infrastructure/elasticsearch/client';
import { routes } from './infrastructure/routes';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173', // URL do frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

app.use(express.json());

app.use('', routes);

const startServer = async (): Promise<void> => {
    try {
        console.log('Trying to connect with MongoDB...');
        await connectMongoDB();

        console.log('Trying to connect with Elasticsearch...');
        await checkElasticSearchConnection();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to init server ', err);
        process.exit(1);
    }
};

startServer();
