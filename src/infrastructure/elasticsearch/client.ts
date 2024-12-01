import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const node = process.env.ELASTICSEARCH_NODE;
if (!node) {
    throw new Error(
        'Missing elasticsearch node from required environment variables'
    );
}

const username = process.env.ELASTICSEARCH_USER;
if (!username) {
    throw new Error(
        'Missing elasticsearch username from required environment variables'
    );
}

const password = process.env.ELASTICSEARCH_PASSWORD;
if (!password) {
    throw new Error(
        'Missing elasticsearch password from required environment variables'
    );
}

export const client = new Client({
    node,
    auth: {
        username,
        password,
    },
});

export const checkElasticSearchConnection = async (): Promise<void> => {
    try {
        const health = await client.cluster.health({});
        console.log('Elasticsearch cluster health:', health);
    } catch (err) {
        console.error('Elasticsearch connection failed:', err);
    }
};
