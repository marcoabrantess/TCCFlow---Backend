import express, { Request, Response } from 'express';
import connectDB from './infrastructure/database/mongoose';
import { checkConnection } from './infrastructure/elasticsearch/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Conectando ao MongoDB
connectDB();

// Verificando a conexão com ElasticSearch
checkConnection();

// Middlewares
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('TCCFlow API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
