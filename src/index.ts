import express, { Request, Response } from 'express';
import { connectMongoDB } from './infrastructure/database/config/mongoConnection';
import { checkElasticSearchConnection } from './infrastructure/elasticsearch/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('TCCFlow API is running');
});

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
