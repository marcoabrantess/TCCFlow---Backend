import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ node: process.env.ELASTICSEARCH_NODE as string });

const checkConnection = async (): Promise<void> => {
    try {
        const health = await client.cluster.health({});
        console.log('Elasticsearch cluster health:', health);
    } catch (err) {
        console.error('Elasticsearch connection failed:', err);
    }
};

export { client, checkConnection };
